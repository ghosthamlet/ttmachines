var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.evalWorksForGlobals_ = null;
goog.provide = function(a) {
  if(!COMPILED) {
    if(goog.getObjectByName(a) && !goog.implicitNamespaces_[a]) {
      throw Error('Namespace "' + a + '" already declared.');
    }
    for(var b = a;b = b.substring(0, b.lastIndexOf("."));) {
      goog.implicitNamespaces_[b] = !0
    }
  }
  goog.exportPath_(a)
};
goog.setTestOnly = function(a) {
  if(COMPILED && !goog.DEBUG) {
    throw a = a || "", Error("Importing test-only code into non-debug environment" + a ? ": " + a : ".");
  }
};
if(!COMPILED) {
  goog.implicitNamespaces_ = {}
}
goog.exportPath_ = function(a, b, c) {
  a = a.split(".");
  c = c || goog.global;
  !(a[0] in c) && c.execScript && c.execScript("var " + a[0]);
  for(var d;a.length && (d = a.shift());) {
    !a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {}
  }
};
goog.getObjectByName = function(a, b) {
  for(var c = a.split("."), d = b || goog.global, e;e = c.shift();) {
    if(goog.isDefAndNotNull(d[e])) {
      d = d[e]
    }else {
      return null
    }
  }
  return d
};
goog.globalize = function(a, b) {
  var c = b || goog.global, d;
  for(d in a) {
    c[d] = a[d]
  }
};
goog.addDependency = function(a, b, c) {
  if(!COMPILED) {
    for(var d, a = a.replace(/\\/g, "/"), e = goog.dependencies_, f = 0;d = b[f];f++) {
      e.nameToPath[d] = a, a in e.pathToNames || (e.pathToNames[a] = {}), e.pathToNames[a][d] = !0
    }
    for(d = 0;b = c[d];d++) {
      a in e.requires || (e.requires[a] = {}), e.requires[a][b] = !0
    }
  }
};
goog.require = function(a) {
  if(!COMPILED && !goog.getObjectByName(a)) {
    var b = goog.getPathFromDeps_(a);
    if(b) {
      goog.included_[b] = !0, goog.writeScripts_()
    }else {
      throw a = "goog.require could not find: " + a, goog.global.console && goog.global.console.error(a), Error(a);
    }
  }
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.identityFunction = function(a) {
  return a
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
  a.getInstance = function() {
    return a.instance_ || (a.instance_ = new a)
  }
};
if(!COMPILED) {
  goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function() {
    var a = goog.global.document;
    return"undefined" != typeof a && "write" in a
  }, goog.findBasePath_ = function() {
    if(goog.global.CLOSURE_BASE_PATH) {
      goog.basePath = goog.global.CLOSURE_BASE_PATH
    }else {
      if(goog.inHtmlDocument_()) {
        for(var a = goog.global.document.getElementsByTagName("script"), b = a.length - 1;0 <= b;--b) {
          var c = a[b].src, d = c.lastIndexOf("?"), d = -1 == d ? c.length : d;
          if("base.js" == c.substr(d - 7, 7)) {
            goog.basePath = c.substr(0, d - 7);
            break
          }
        }
      }
    }
  }, goog.importScript_ = function(a) {
    var b = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
    !goog.dependencies_.written[a] && b(a) && (goog.dependencies_.written[a] = !0)
  }, goog.writeScriptTag_ = function(a) {
    return goog.inHtmlDocument_() ? (goog.global.document.write('<script type="text/javascript" src="' + a + '"><\/script>'), !0) : !1
  }, goog.writeScripts_ = function() {
    function a(e) {
      if(!(e in d.written)) {
        if(!(e in d.visited) && (d.visited[e] = !0, e in d.requires)) {
          for(var g in d.requires[e]) {
            if(g in d.nameToPath) {
              a(d.nameToPath[g])
            }else {
              if(!goog.getObjectByName(g)) {
                throw Error("Undefined nameToPath for " + g);
              }
            }
          }
        }
        e in c || (c[e] = !0, b.push(e))
      }
    }
    var b = [], c = {}, d = goog.dependencies_, e;
    for(e in goog.included_) {
      d.written[e] || a(e)
    }
    for(e = 0;e < b.length;e++) {
      if(b[e]) {
        goog.importScript_(goog.basePath + b[e])
      }else {
        throw Error("Undefined script input");
      }
    }
  }, goog.getPathFromDeps_ = function(a) {
    return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null
  }, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js")
}
goog.typeOf = function(a) {
  var b = typeof a;
  if("object" == b) {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }
      if(a instanceof Object) {
        return b
      }
      var c = Object.prototype.toString.call(a);
      if("[object Window]" == c) {
        return"object"
      }
      if("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == b && "undefined" == typeof a.call) {
      return"object"
    }
  }
  return b
};
goog.propertyIsEnumerableCustom_ = function(a, b) {
  if(b in a) {
    for(var c in a) {
      if(c == b && Object.prototype.hasOwnProperty.call(a, b)) {
        return!0
      }
    }
  }
  return!1
};
goog.propertyIsEnumerable_ = function(a, b) {
  return a instanceof Object ? Object.prototype.propertyIsEnumerable.call(a, b) : goog.propertyIsEnumerableCustom_(a, b)
};
goog.isDef = function(a) {
  return void 0 !== a
};
goog.isNull = function(a) {
  return null === a
};
goog.isDefAndNotNull = function(a) {
  return null != a
};
goog.isArray = function(a) {
  return"array" == goog.typeOf(a)
};
goog.isArrayLike = function(a) {
  var b = goog.typeOf(a);
  return"array" == b || "object" == b && "number" == typeof a.length
};
goog.isDateLike = function(a) {
  return goog.isObject(a) && "function" == typeof a.getFullYear
};
goog.isString = function(a) {
  return"string" == typeof a
};
goog.isBoolean = function(a) {
  return"boolean" == typeof a
};
goog.isNumber = function(a) {
  return"number" == typeof a
};
goog.isFunction = function(a) {
  return"function" == goog.typeOf(a)
};
goog.isObject = function(a) {
  a = goog.typeOf(a);
  return"object" == a || "array" == a || "function" == a
};
goog.getUid = function(a) {
  return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function(a) {
  "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete a[goog.UID_PROPERTY_]
  }catch(b) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
  var b = goog.typeOf(a);
  if("object" == b || "array" == b) {
    if(a.clone) {
      return a.clone()
    }
    var b = "array" == b ? [] : {}, c;
    for(c in a) {
      b[c] = goog.cloneObject(a[c])
    }
    return b
  }
  return a
};
goog.bindNative_ = function(a, b, c) {
  return a.call.apply(a.bind, arguments)
};
goog.bindJs_ = function(a, b, c) {
  var d = b || goog.global;
  if(2 < arguments.length) {
    var e = Array.prototype.slice.call(arguments, 2);
    return function() {
      var b = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(b, e);
      return a.apply(d, b)
    }
  }
  return function() {
    return a.apply(d, arguments)
  }
};
goog.bind = function(a, b, c) {
  goog.bind = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bindNative_ : goog.bindJs_;
  return goog.bind.apply(null, arguments)
};
goog.partial = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = Array.prototype.slice.call(arguments);
    b.unshift.apply(b, c);
    return a.apply(this, b)
  }
};
goog.mixin = function(a, b) {
  for(var c in b) {
    a[c] = b[c]
  }
};
goog.now = Date.now || function() {
  return+new Date
};
goog.globalEval = function(a) {
  if(goog.global.execScript) {
    goog.global.execScript(a, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(null == goog.evalWorksForGlobals_) {
        goog.global.eval("var _et_ = 1;"), "undefined" != typeof goog.global._et_ ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1
      }
      if(goog.evalWorksForGlobals_) {
        goog.global.eval(a)
      }else {
        var b = goog.global.document, c = b.createElement("script");
        c.type = "text/javascript";
        c.defer = !1;
        c.appendChild(b.createTextNode(a));
        b.body.appendChild(c);
        b.body.removeChild(c)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.getCssName = function(a, b) {
  var c = function(a) {
    return goog.cssNameMapping_[a] || a
  }, d;
  d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : function(a) {
    for(var a = a.split("-"), b = [], d = 0;d < a.length;d++) {
      b.push(c(a[d]))
    }
    return b.join("-")
  } : function(a) {
    return a
  };
  return b ? a + "-" + d(b) : d(a)
};
goog.setCssNameMapping = function(a, b) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = b
};
goog.getMsg = function(a, b) {
  var c = b || {}, d;
  for(d in c) {
    var e = ("" + c[d]).replace(/\$/g, "$$$$"), a = a.replace(RegExp("\\{\\$" + d + "\\}", "gi"), e)
  }
  return a
};
goog.exportSymbol = function(a, b, c) {
  goog.exportPath_(a, b, c)
};
goog.exportProperty = function(a, b, c) {
  a[b] = c
};
goog.inherits = function(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a
};
goog.base = function(a, b, c) {
  var d = arguments.callee.caller;
  if(d.superClass_) {
    return d.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1))
  }
  for(var e = Array.prototype.slice.call(arguments, 2), f = !1, g = a.constructor;g;g = g.superClass_ && g.superClass_.constructor) {
    if(g.prototype[b] === d) {
      f = !0
    }else {
      if(f) {
        return g.prototype[b].apply(a, e)
      }
    }
  }
  if(a[b] === d) {
    return a.constructor.prototype[b].apply(a, e)
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
  a.call(goog.global)
};
goog.debug = {};
goog.debug.Error = function(a) {
  this.stack = Error().stack || "";
  if(a) {
    this.message = "" + a
  }
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.string = {};
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(a, b) {
  return 0 == a.lastIndexOf(b, 0)
};
goog.string.endsWith = function(a, b) {
  var c = a.length - b.length;
  return 0 <= c && a.indexOf(b, c) == c
};
goog.string.caseInsensitiveStartsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length))
};
goog.string.caseInsensitiveEndsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length))
};
goog.string.subs = function(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = ("" + arguments[c]).replace(/\$/g, "$$$$"), a = a.replace(/\%s/, d)
  }
  return a
};
goog.string.collapseWhitespace = function(a) {
  return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function(a) {
  return/^[\s\xa0]*$/.test(a)
};
goog.string.isEmptySafe = function(a) {
  return goog.string.isEmpty(goog.string.makeSafe(a))
};
goog.string.isBreakingWhitespace = function(a) {
  return!/[^\t\n\r ]/.test(a)
};
goog.string.isAlpha = function(a) {
  return!/[^a-zA-Z]/.test(a)
};
goog.string.isNumeric = function(a) {
  return!/[^0-9]/.test(a)
};
goog.string.isAlphaNumeric = function(a) {
  return!/[^a-zA-Z0-9]/.test(a)
};
goog.string.isSpace = function(a) {
  return" " == a
};
goog.string.isUnicodeChar = function(a) {
  return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a
};
goog.string.stripNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(a) {
  return a.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(a) {
  return a.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.trim = function(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(a) {
  return a.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(a) {
  return a.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(a, b) {
  var c = ("" + a).toLowerCase(), d = ("" + b).toLowerCase();
  return c < d ? -1 : c == d ? 0 : 1
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(a, b) {
  if(a == b) {
    return 0
  }
  if(!a) {
    return-1
  }
  if(!b) {
    return 1
  }
  for(var c = a.toLowerCase().match(goog.string.numerateCompareRegExp_), d = b.toLowerCase().match(goog.string.numerateCompareRegExp_), e = Math.min(c.length, d.length), f = 0;f < e;f++) {
    var g = c[f], h = d[f];
    if(g != h) {
      c = parseInt(g, 10);
      return!isNaN(c) && (d = parseInt(h, 10), !isNaN(d) && c - d) ? c - d : g < h ? -1 : 1
    }
  }
  return c.length != d.length ? c.length - d.length : a < b ? -1 : 1
};
goog.string.encodeUriRegExp_ = /^[a-zA-Z0-9\-_.!~*'()]*$/;
goog.string.urlEncode = function(a) {
  a = "" + a;
  return!goog.string.encodeUriRegExp_.test(a) ? encodeURIComponent(a) : a
};
goog.string.urlDecode = function(a) {
  return decodeURIComponent(a.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(a, b) {
  return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(a, b) {
  if(b) {
    return a.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;")
  }
  if(!goog.string.allRe_.test(a)) {
    return a
  }
  -1 != a.indexOf("&") && (a = a.replace(goog.string.amperRe_, "&amp;"));
  -1 != a.indexOf("<") && (a = a.replace(goog.string.ltRe_, "&lt;"));
  -1 != a.indexOf(">") && (a = a.replace(goog.string.gtRe_, "&gt;"));
  -1 != a.indexOf('"') && (a = a.replace(goog.string.quotRe_, "&quot;"));
  return a
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function(a) {
  return goog.string.contains(a, "&") ? "document" in goog.global && !goog.string.contains(a, "<") ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a
};
goog.string.unescapeEntitiesUsingDom_ = function(a) {
  var b = goog.global.document.createElement("div");
  b.innerHTML = "<pre>x" + a + "</pre>";
  if(b.firstChild[goog.string.NORMALIZE_FN_]) {
    b.firstChild[goog.string.NORMALIZE_FN_]()
  }
  a = b.firstChild.firstChild.nodeValue.slice(1);
  b.innerHTML = "";
  return goog.string.canonicalizeNewlines(a)
};
goog.string.unescapePureXmlEntities_ = function(a) {
  return a.replace(/&([^;]+);/g, function(a, c) {
    switch(c) {
      case "amp":
        return"&";
      case "lt":
        return"<";
      case "gt":
        return">";
      case "quot":
        return'"';
      default:
        if("#" == c.charAt(0)) {
          var d = Number("0" + c.substr(1));
          if(!isNaN(d)) {
            return String.fromCharCode(d)
          }
        }
        return a
    }
  })
};
goog.string.NORMALIZE_FN_ = "normalize";
goog.string.whitespaceEscape = function(a, b) {
  return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b)
};
goog.string.stripQuotes = function(a, b) {
  for(var c = b.length, d = 0;d < c;d++) {
    var e = 1 == c ? b : b.charAt(d);
    if(a.charAt(0) == e && a.charAt(a.length - 1) == e) {
      return a.substring(1, a.length - 1)
    }
  }
  return a
};
goog.string.truncate = function(a, b, c) {
  c && (a = goog.string.unescapeEntities(a));
  a.length > b && (a = a.substring(0, b - 3) + "...");
  c && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.truncateMiddle = function(a, b, c, d) {
  c && (a = goog.string.unescapeEntities(a));
  if(d) {
    d > b && (d = b);
    var e = a.length - d, a = a.substring(0, b - d) + "..." + a.substring(e)
  }else {
    a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e))
  }
  c && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\u0008":"\\b", "\u000c":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\u000b":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(a) {
  a = "" + a;
  if(a.quote) {
    return a.quote()
  }
  for(var b = ['"'], c = 0;c < a.length;c++) {
    var d = a.charAt(c), e = d.charCodeAt(0);
    b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d))
  }
  b.push('"');
  return b.join("")
};
goog.string.escapeString = function(a) {
  for(var b = [], c = 0;c < a.length;c++) {
    b[c] = goog.string.escapeChar(a.charAt(c))
  }
  return b.join("")
};
goog.string.escapeChar = function(a) {
  if(a in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[a]
  }
  if(a in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a]
  }
  var b = a, c = a.charCodeAt(0);
  if(31 < c && 127 > c) {
    b = a
  }else {
    if(256 > c) {
      if(b = "\\x", 16 > c || 256 < c) {
        b += "0"
      }
    }else {
      b = "\\u", 4096 > c && (b += "0")
    }
    b += c.toString(16).toUpperCase()
  }
  return goog.string.jsEscapeCache_[a] = b
};
goog.string.toMap = function(a) {
  for(var b = {}, c = 0;c < a.length;c++) {
    b[a.charAt(c)] = !0
  }
  return b
};
goog.string.contains = function(a, b) {
  return-1 != a.indexOf(b)
};
goog.string.removeAt = function(a, b, c) {
  var d = a;
  0 <= b && b < a.length && 0 < c && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
  return d
};
goog.string.remove = function(a, b) {
  var c = RegExp(goog.string.regExpEscape(b), "");
  return a.replace(c, "")
};
goog.string.removeAll = function(a, b) {
  var c = RegExp(goog.string.regExpEscape(b), "g");
  return a.replace(c, "")
};
goog.string.regExpEscape = function(a) {
  return("" + a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function(a, b) {
  return Array(b + 1).join(a)
};
goog.string.padNumber = function(a, b, c) {
  a = goog.isDef(c) ? a.toFixed(c) : "" + a;
  c = a.indexOf(".");
  if(-1 == c) {
    c = a.length
  }
  return goog.string.repeat("0", Math.max(0, b - c)) + a
};
goog.string.makeSafe = function(a) {
  return null == a ? "" : "" + a
};
goog.string.buildString = function(a) {
  return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function(a, b) {
  for(var c = 0, d = goog.string.trim("" + a).split("."), e = goog.string.trim("" + b).split("."), f = Math.max(d.length, e.length), g = 0;0 == c && g < f;g++) {
    var h = d[g] || "", i = e[g] || "", j = RegExp("(\\d*)(\\D*)", "g"), k = RegExp("(\\d*)(\\D*)", "g");
    do {
      var l = j.exec(h) || ["", "", ""], m = k.exec(i) || ["", "", ""];
      if(0 == l[0].length && 0 == m[0].length) {
        break
      }
      var c = 0 == l[1].length ? 0 : parseInt(l[1], 10), p = 0 == m[1].length ? 0 : parseInt(m[1], 10), c = goog.string.compareElements_(c, p) || goog.string.compareElements_(0 == l[2].length, 0 == m[2].length) || goog.string.compareElements_(l[2], m[2])
    }while(0 == c)
  }
  return c
};
goog.string.compareElements_ = function(a, b) {
  return a < b ? -1 : a > b ? 1 : 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(a) {
  for(var b = 0, c = 0;c < a.length;++c) {
    b = 31 * b + a.charCodeAt(c), b %= goog.string.HASHCODE_MAX_
  }
  return b
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
  return"goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(a) {
  var b = Number(a);
  return 0 == b && goog.string.isEmpty(a) ? NaN : b
};
goog.string.toCamelCaseCache_ = {};
goog.string.toCamelCase = function(a) {
  return goog.string.toCamelCaseCache_[a] || (goog.string.toCamelCaseCache_[a] = ("" + a).replace(/\-([a-z])/g, function(a, c) {
    return c.toUpperCase()
  }))
};
goog.string.toSelectorCaseCache_ = {};
goog.string.toSelectorCase = function(a) {
  return goog.string.toSelectorCaseCache_[a] || (goog.string.toSelectorCaseCache_[a] = ("" + a).replace(/([A-Z])/g, "-$1").toLowerCase())
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
  b.unshift(a);
  goog.debug.Error.call(this, goog.string.subs.apply(null, b));
  b.shift();
  this.messagePattern = a
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function(a, b, c, d) {
  var e = "Assertion failed";
  if(c) {
    var e = e + (": " + c), f = d
  }else {
    a && (e += ": " + a, f = b)
  }
  throw new goog.asserts.AssertionError("" + e, f || []);
};
goog.asserts.assert = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.fail = function(a, b) {
  if(goog.asserts.ENABLE_ASSERTS) {
    throw new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
  }
};
goog.asserts.assertNumber = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertString = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertFunction = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertObject = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertArray = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertBoolean = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertInstanceof = function(a, b, c, d) {
  goog.asserts.ENABLE_ASSERTS && !(a instanceof b) && goog.asserts.doAssertFailure_("instanceof check failed.", null, c, Array.prototype.slice.call(arguments, 3))
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = !0;
goog.array.peek = function(a) {
  return a[a.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.indexOf ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(a, b, c)
} : function(a, b, c) {
  c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if(goog.isString(a)) {
    return!goog.isString(b) || 1 != b.length ? -1 : a.indexOf(b, c)
  }
  for(;c < a.length;c++) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(a, b, null == c ? a.length - 1 : c)
} : function(a, b, c) {
  c = null == c ? a.length - 1 : c;
  0 > c && (c = Math.max(0, a.length + c));
  if(goog.isString(a)) {
    return!goog.isString(b) || 1 != b.length ? -1 : a.lastIndexOf(b, c)
  }
  for(;0 <= c;c--) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.forEach ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    f in e && b.call(c, e[f], f, a)
  }
};
goog.array.forEachRight = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;--d) {
    d in e && b.call(c, e[d], d, a)
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.filter ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0;h < d;h++) {
    if(h in g) {
      var i = g[h];
      b.call(c, i, h, a) && (e[f++] = i)
    }
  }
  return e
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.map ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.map.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0;g < d;g++) {
    g in f && (e[g] = b.call(c, f[g], g, a))
  }
  return e
};
goog.array.reduce = function(a, b, c, d) {
  if(a.reduce) {
    return d ? a.reduce(goog.bind(b, d), c) : a.reduce(b, c)
  }
  var e = c;
  goog.array.forEach(a, function(c, g) {
    e = b.call(d, e, c, g, a)
  });
  return e
};
goog.array.reduceRight = function(a, b, c, d) {
  if(a.reduceRight) {
    return d ? a.reduceRight(goog.bind(b, d), c) : a.reduceRight(b, c)
  }
  var e = c;
  goog.array.forEachRight(a, function(c, g) {
    e = b.call(d, e, c, g, a)
  });
  return e
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.some ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.some.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && b.call(c, e[f], f, a)) {
      return!0
    }
  }
  return!1
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.every ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.every.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && !b.call(c, e[f], f, a)) {
      return!1
    }
  }
  return!0
};
goog.array.find = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndex = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && b.call(c, e[f], f, a)) {
      return f
    }
  }
  return-1
};
goog.array.findRight = function(a, b, c) {
  b = goog.array.findIndexRight(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndexRight = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;d--) {
    if(d in e && b.call(c, e[d], d, a)) {
      return d
    }
  }
  return-1
};
goog.array.contains = function(a, b) {
  return 0 <= goog.array.indexOf(a, b)
};
goog.array.isEmpty = function(a) {
  return 0 == a.length
};
goog.array.clear = function(a) {
  if(!goog.isArray(a)) {
    for(var b = a.length - 1;0 <= b;b--) {
      delete a[b]
    }
  }
  a.length = 0
};
goog.array.insert = function(a, b) {
  goog.array.contains(a, b) || a.push(b)
};
goog.array.insertAt = function(a, b, c) {
  goog.array.splice(a, c, 0, b)
};
goog.array.insertArrayAt = function(a, b, c) {
  goog.partial(goog.array.splice, a, c, 0).apply(null, b)
};
goog.array.insertBefore = function(a, b, c) {
  var d;
  2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d)
};
goog.array.remove = function(a, b) {
  var c = goog.array.indexOf(a, b), d;
  (d = 0 <= c) && goog.array.removeAt(a, c);
  return d
};
goog.array.removeAt = function(a, b) {
  goog.asserts.assert(null != a.length);
  return 1 == goog.array.ARRAY_PROTOTYPE_.splice.call(a, b, 1).length
};
goog.array.removeIf = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1
};
goog.array.concat = function(a) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
};
goog.array.clone = function(a) {
  if(goog.isArray(a)) {
    return goog.array.concat(a)
  }
  for(var b = [], c = 0, d = a.length;c < d;c++) {
    b[c] = a[c]
  }
  return b
};
goog.array.toArray = function(a) {
  return goog.isArray(a) ? goog.array.concat(a) : goog.array.clone(a)
};
goog.array.extend = function(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = arguments[c], e;
    if(goog.isArray(d) || (e = goog.isArrayLike(d)) && d.hasOwnProperty("callee")) {
      a.push.apply(a, d)
    }else {
      if(e) {
        for(var f = a.length, g = d.length, h = 0;h < g;h++) {
          a[f + h] = d[h]
        }
      }else {
        a.push(d)
      }
    }
  }
};
goog.array.splice = function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(a, goog.array.slice(arguments, 1))
};
goog.array.slice = function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return 2 >= arguments.length ? goog.array.ARRAY_PROTOTYPE_.slice.call(a, b) : goog.array.ARRAY_PROTOTYPE_.slice.call(a, b, c)
};
goog.array.removeDuplicates = function(a, b) {
  for(var c = b || a, d = {}, e = 0, f = 0;f < a.length;) {
    var g = a[f++], h = goog.isObject(g) ? "o" + goog.getUid(g) : (typeof g).charAt(0) + g;
    Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, c[e++] = g)
  }
  c.length = e
};
goog.array.binarySearch = function(a, b, c) {
  return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b)
};
goog.array.binarySelect = function(a, b, c) {
  return goog.array.binarySearch_(a, b, !0, void 0, c)
};
goog.array.binarySearch_ = function(a, b, c, d, e) {
  for(var f = 0, g = a.length, h;f < g;) {
    var i = f + g >> 1, j;
    j = c ? b.call(e, a[i], i, a) : b(d, a[i]);
    0 < j ? f = i + 1 : (g = i, h = !j)
  }
  return h ? f : ~f
};
goog.array.sort = function(a, b) {
  goog.asserts.assert(null != a.length);
  goog.array.ARRAY_PROTOTYPE_.sort.call(a, b || goog.array.defaultCompare)
};
goog.array.stableSort = function(a, b) {
  for(var c = 0;c < a.length;c++) {
    a[c] = {index:c, value:a[c]}
  }
  var d = b || goog.array.defaultCompare;
  goog.array.sort(a, function(a, b) {
    return d(a.value, b.value) || a.index - b.index
  });
  for(c = 0;c < a.length;c++) {
    a[c] = a[c].value
  }
};
goog.array.sortObjectsByKey = function(a, b, c) {
  var d = c || goog.array.defaultCompare;
  goog.array.sort(a, function(a, c) {
    return d(a[b], c[b])
  })
};
goog.array.isSorted = function(a, b, c) {
  for(var b = b || goog.array.defaultCompare, d = 1;d < a.length;d++) {
    var e = b(a[d - 1], a[d]);
    if(0 < e || 0 == e && c) {
      return!1
    }
  }
  return!0
};
goog.array.equals = function(a, b, c) {
  if(!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) {
    return!1
  }
  for(var d = a.length, c = c || goog.array.defaultCompareEquality, e = 0;e < d;e++) {
    if(!c(a[e], b[e])) {
      return!1
    }
  }
  return!0
};
goog.array.compare = function(a, b, c) {
  return goog.array.equals(a, b, c)
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b
};
goog.array.binaryInsert = function(a, b, c) {
  c = goog.array.binarySearch(a, b, c);
  return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1
};
goog.array.binaryRemove = function(a, b, c) {
  b = goog.array.binarySearch(a, b, c);
  return 0 <= b ? goog.array.removeAt(a, b) : !1
};
goog.array.bucket = function(a, b) {
  for(var c = {}, d = 0;d < a.length;d++) {
    var e = a[d], f = b(e, d, a);
    goog.isDef(f) && (c[f] || (c[f] = [])).push(e)
  }
  return c
};
goog.array.repeat = function(a, b) {
  for(var c = [], d = 0;d < b;d++) {
    c[d] = a
  }
  return c
};
goog.array.flatten = function(a) {
  for(var b = [], c = 0;c < arguments.length;c++) {
    var d = arguments[c];
    goog.isArray(d) ? b.push.apply(b, goog.array.flatten.apply(null, d)) : b.push(d)
  }
  return b
};
goog.array.rotate = function(a, b) {
  goog.asserts.assert(null != a.length);
  a.length && (b %= a.length, 0 < b ? goog.array.ARRAY_PROTOTYPE_.unshift.apply(a, a.splice(-b, b)) : 0 > b && goog.array.ARRAY_PROTOTYPE_.push.apply(a, a.splice(0, -b)));
  return a
};
goog.array.zip = function(a) {
  if(!arguments.length) {
    return[]
  }
  for(var b = [], c = 0;;c++) {
    for(var d = [], e = 0;e < arguments.length;e++) {
      var f = arguments[e];
      if(c >= f.length) {
        return b
      }
      d.push(f[c])
    }
    b.push(d)
  }
};
goog.array.shuffle = function(a, b) {
  for(var c = b || Math.random, d = a.length - 1;0 < d;d--) {
    var e = Math.floor(c() * (d + 1)), f = a[d];
    a[d] = a[e];
    a[e] = f
  }
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !1;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
  return goog.global.navigator ? goog.global.navigator.userAgent : null
};
goog.userAgent.getNavigator = function() {
  return goog.global.navigator
};
goog.userAgent.init_ = function() {
  goog.userAgent.detectedOpera_ = !1;
  goog.userAgent.detectedIe_ = !1;
  goog.userAgent.detectedWebkit_ = !1;
  goog.userAgent.detectedMobile_ = !1;
  goog.userAgent.detectedGecko_ = !1;
  var a;
  if(!goog.userAgent.BROWSER_KNOWN_ && (a = goog.userAgent.getUserAgentString())) {
    var b = goog.userAgent.getNavigator();
    goog.userAgent.detectedOpera_ = 0 == a.indexOf("Opera");
    goog.userAgent.detectedIe_ = !goog.userAgent.detectedOpera_ && -1 != a.indexOf("MSIE");
    goog.userAgent.detectedWebkit_ = !goog.userAgent.detectedOpera_ && -1 != a.indexOf("WebKit");
    goog.userAgent.detectedMobile_ = goog.userAgent.detectedWebkit_ && -1 != a.indexOf("Mobile");
    goog.userAgent.detectedGecko_ = !goog.userAgent.detectedOpera_ && !goog.userAgent.detectedWebkit_ && "Gecko" == b.product
  }
};
goog.userAgent.BROWSER_KNOWN_ || goog.userAgent.init_();
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.userAgent.detectedOpera_;
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.userAgent.detectedIe_;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.userAgent.detectedGecko_;
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.userAgent.detectedWebkit_;
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.detectedMobile_;
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
  var a = goog.userAgent.getNavigator();
  return a && a.platform || ""
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11;
goog.userAgent.initPlatform_ = function() {
  goog.userAgent.detectedMac_ = goog.string.contains(goog.userAgent.PLATFORM, "Mac");
  goog.userAgent.detectedWindows_ = goog.string.contains(goog.userAgent.PLATFORM, "Win");
  goog.userAgent.detectedLinux_ = goog.string.contains(goog.userAgent.PLATFORM, "Linux");
  goog.userAgent.detectedX11_ = !!goog.userAgent.getNavigator() && goog.string.contains(goog.userAgent.getNavigator().appVersion || "", "X11")
};
goog.userAgent.PLATFORM_KNOWN_ || goog.userAgent.initPlatform_();
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.userAgent.detectedMac_;
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.userAgent.detectedWindows_;
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.detectedLinux_;
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.detectedX11_;
goog.userAgent.determineVersion_ = function() {
  var a = "", b;
  goog.userAgent.OPERA && goog.global.opera ? (a = goog.global.opera.version, a = "function" == typeof a ? a() : a) : (goog.userAgent.GECKO ? b = /rv\:([^\);]+)(\)|;)/ : goog.userAgent.IE ? b = /MSIE\s+([^\);]+)(\)|;)/ : goog.userAgent.WEBKIT && (b = /WebKit\/(\S+)/), b && (a = (a = b.exec(goog.userAgent.getUserAgentString())) ? a[1] : ""));
  return goog.userAgent.IE && (b = goog.userAgent.getDocumentMode_(), b > parseFloat(a)) ? "" + b : a
};
goog.userAgent.getDocumentMode_ = function() {
  var a = goog.global.document;
  return a ? a.documentMode : void 0
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(a, b) {
  return goog.string.compareVersions(a, b)
};
goog.userAgent.isVersionCache_ = {};
goog.userAgent.isVersion = function(a) {
  return goog.userAgent.isVersionCache_[a] || (goog.userAgent.isVersionCache_[a] = 0 <= goog.string.compareVersions(goog.userAgent.VERSION, a))
};
goog.dom = {};
goog.dom.BrowserFeature = {CAN_ADD_NAME_OR_TYPE_ATTRIBUTES:!goog.userAgent.IE || goog.userAgent.isVersion("9"), CAN_USE_CHILDREN_ATTRIBUTE:!goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isVersion("9") || goog.userAgent.GECKO && goog.userAgent.isVersion("1.9.1"), CAN_USE_INNER_TEXT:goog.userAgent.IE && !goog.userAgent.isVersion("9"), INNER_HTML_NEEDS_SCOPED_ELEMENT:goog.userAgent.IE};
goog.dom.TagName = {A:"A", ABBR:"ABBR", ACRONYM:"ACRONYM", ADDRESS:"ADDRESS", APPLET:"APPLET", AREA:"AREA", B:"B", BASE:"BASE", BASEFONT:"BASEFONT", BDO:"BDO", BIG:"BIG", BLOCKQUOTE:"BLOCKQUOTE", BODY:"BODY", BR:"BR", BUTTON:"BUTTON", CANVAS:"CANVAS", CAPTION:"CAPTION", CENTER:"CENTER", CITE:"CITE", CODE:"CODE", COL:"COL", COLGROUP:"COLGROUP", DD:"DD", DEL:"DEL", DFN:"DFN", DIR:"DIR", DIV:"DIV", DL:"DL", DT:"DT", EM:"EM", FIELDSET:"FIELDSET", FONT:"FONT", FORM:"FORM", FRAME:"FRAME", FRAMESET:"FRAMESET", 
H1:"H1", H2:"H2", H3:"H3", H4:"H4", H5:"H5", H6:"H6", HEAD:"HEAD", HR:"HR", HTML:"HTML", I:"I", IFRAME:"IFRAME", IMG:"IMG", INPUT:"INPUT", INS:"INS", ISINDEX:"ISINDEX", KBD:"KBD", LABEL:"LABEL", LEGEND:"LEGEND", LI:"LI", LINK:"LINK", MAP:"MAP", MENU:"MENU", META:"META", NOFRAMES:"NOFRAMES", NOSCRIPT:"NOSCRIPT", OBJECT:"OBJECT", OL:"OL", OPTGROUP:"OPTGROUP", OPTION:"OPTION", P:"P", PARAM:"PARAM", PRE:"PRE", Q:"Q", S:"S", SAMP:"SAMP", SCRIPT:"SCRIPT", SELECT:"SELECT", SMALL:"SMALL", SPAN:"SPAN", STRIKE:"STRIKE", 
STRONG:"STRONG", STYLE:"STYLE", SUB:"SUB", SUP:"SUP", TABLE:"TABLE", TBODY:"TBODY", TD:"TD", TEXTAREA:"TEXTAREA", TFOOT:"TFOOT", TH:"TH", THEAD:"THEAD", TITLE:"TITLE", TR:"TR", TT:"TT", U:"U", UL:"UL", VAR:"VAR"};
goog.dom.classes = {};
goog.dom.classes.set = function(a, b) {
  a.className = b
};
goog.dom.classes.get = function(a) {
  return(a = a.className) && "function" == typeof a.split ? a.split(/\s+/) : []
};
goog.dom.classes.add = function(a, b) {
  var c = goog.dom.classes.get(a), d = goog.array.slice(arguments, 1), d = goog.dom.classes.add_(c, d);
  a.className = c.join(" ");
  return d
};
goog.dom.classes.remove = function(a, b) {
  var c = goog.dom.classes.get(a), d = goog.array.slice(arguments, 1), d = goog.dom.classes.remove_(c, d);
  a.className = c.join(" ");
  return d
};
goog.dom.classes.add_ = function(a, b) {
  for(var c = 0, d = 0;d < b.length;d++) {
    goog.array.contains(a, b[d]) || (a.push(b[d]), c++)
  }
  return c == b.length
};
goog.dom.classes.remove_ = function(a, b) {
  for(var c = 0, d = 0;d < a.length;d++) {
    goog.array.contains(b, a[d]) && (goog.array.splice(a, d--, 1), c++)
  }
  return c == b.length
};
goog.dom.classes.swap = function(a, b, c) {
  for(var d = goog.dom.classes.get(a), e = !1, f = 0;f < d.length;f++) {
    d[f] == b && (goog.array.splice(d, f--, 1), e = !0)
  }
  if(e) {
    d.push(c), a.className = d.join(" ")
  }
  return e
};
goog.dom.classes.addRemove = function(a, b, c) {
  var d = goog.dom.classes.get(a);
  goog.isString(b) ? goog.array.remove(d, b) : goog.isArray(b) && goog.dom.classes.remove_(d, b);
  goog.isString(c) && !goog.array.contains(d, c) ? d.push(c) : goog.isArray(c) && goog.dom.classes.add_(d, c);
  a.className = d.join(" ")
};
goog.dom.classes.has = function(a, b) {
  return goog.array.contains(goog.dom.classes.get(a), b)
};
goog.dom.classes.enable = function(a, b, c) {
  c ? goog.dom.classes.add(a, b) : goog.dom.classes.remove(a, b)
};
goog.dom.classes.toggle = function(a, b) {
  var c = !goog.dom.classes.has(a, b);
  goog.dom.classes.enable(a, b, c);
  return c
};
goog.math = {};
goog.math.Coordinate = function(a, b) {
  this.x = goog.isDef(a) ? a : 0;
  this.y = goog.isDef(b) ? b : 0
};
goog.math.Coordinate.prototype.clone = function() {
  return new goog.math.Coordinate(this.x, this.y)
};
if(goog.DEBUG) {
  goog.math.Coordinate.prototype.toString = function() {
    return"(" + this.x + ", " + this.y + ")"
  }
}
goog.math.Coordinate.equals = function(a, b) {
  return a == b ? !0 : !a || !b ? !1 : a.x == b.x && a.y == b.y
};
goog.math.Coordinate.distance = function(a, b) {
  var c = a.x - b.x, d = a.y - b.y;
  return Math.sqrt(c * c + d * d)
};
goog.math.Coordinate.squaredDistance = function(a, b) {
  var c = a.x - b.x, d = a.y - b.y;
  return c * c + d * d
};
goog.math.Coordinate.difference = function(a, b) {
  return new goog.math.Coordinate(a.x - b.x, a.y - b.y)
};
goog.math.Coordinate.sum = function(a, b) {
  return new goog.math.Coordinate(a.x + b.x, a.y + b.y)
};
goog.math.Size = function(a, b) {
  this.width = a;
  this.height = b
};
goog.math.Size.equals = function(a, b) {
  return a == b ? !0 : !a || !b ? !1 : a.width == b.width && a.height == b.height
};
goog.math.Size.prototype.clone = function() {
  return new goog.math.Size(this.width, this.height)
};
if(goog.DEBUG) {
  goog.math.Size.prototype.toString = function() {
    return"(" + this.width + " x " + this.height + ")"
  }
}
goog.math.Size.prototype.getLongest = function() {
  return Math.max(this.width, this.height)
};
goog.math.Size.prototype.getShortest = function() {
  return Math.min(this.width, this.height)
};
goog.math.Size.prototype.area = function() {
  return this.width * this.height
};
goog.math.Size.prototype.perimeter = function() {
  return 2 * (this.width + this.height)
};
goog.math.Size.prototype.aspectRatio = function() {
  return this.width / this.height
};
goog.math.Size.prototype.isEmpty = function() {
  return!this.area()
};
goog.math.Size.prototype.ceil = function() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this
};
goog.math.Size.prototype.fitsInside = function(a) {
  return this.width <= a.width && this.height <= a.height
};
goog.math.Size.prototype.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
goog.math.Size.prototype.round = function() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
goog.math.Size.prototype.scale = function(a) {
  this.width *= a;
  this.height *= a;
  return this
};
goog.math.Size.prototype.scaleToFit = function(a) {
  return this.scale(this.aspectRatio() > a.aspectRatio() ? a.width / this.width : a.height / this.height)
};
goog.object = {};
goog.object.forEach = function(a, b, c) {
  for(var d in a) {
    b.call(c, a[d], d, a)
  }
};
goog.object.filter = function(a, b, c) {
  var d = {}, e;
  for(e in a) {
    b.call(c, a[e], e, a) && (d[e] = a[e])
  }
  return d
};
goog.object.map = function(a, b, c) {
  var d = {}, e;
  for(e in a) {
    d[e] = b.call(c, a[e], e, a)
  }
  return d
};
goog.object.some = function(a, b, c) {
  for(var d in a) {
    if(b.call(c, a[d], d, a)) {
      return!0
    }
  }
  return!1
};
goog.object.every = function(a, b, c) {
  for(var d in a) {
    if(!b.call(c, a[d], d, a)) {
      return!1
    }
  }
  return!0
};
goog.object.getCount = function(a) {
  var b = 0, c;
  for(c in a) {
    b++
  }
  return b
};
goog.object.getAnyKey = function(a) {
  for(var b in a) {
    return b
  }
};
goog.object.getAnyValue = function(a) {
  for(var b in a) {
    return a[b]
  }
};
goog.object.contains = function(a, b) {
  return goog.object.containsValue(a, b)
};
goog.object.getValues = function(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = a[d]
  }
  return b
};
goog.object.getKeys = function(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = d
  }
  return b
};
goog.object.getValueByKeys = function(a, b) {
  for(var c = goog.isArrayLike(b), d = c ? b : arguments, c = c ? 0 : 1;c < d.length && !(a = a[d[c]], !goog.isDef(a));c++) {
  }
  return a
};
goog.object.containsKey = function(a, b) {
  return b in a
};
goog.object.containsValue = function(a, b) {
  for(var c in a) {
    if(a[c] == b) {
      return!0
    }
  }
  return!1
};
goog.object.findKey = function(a, b, c) {
  for(var d in a) {
    if(b.call(c, a[d], d, a)) {
      return d
    }
  }
};
goog.object.findValue = function(a, b, c) {
  return(b = goog.object.findKey(a, b, c)) && a[b]
};
goog.object.isEmpty = function(a) {
  for(var b in a) {
    return!1
  }
  return!0
};
goog.object.clear = function(a) {
  for(var b in a) {
    delete a[b]
  }
};
goog.object.remove = function(a, b) {
  var c;
  (c = b in a) && delete a[b];
  return c
};
goog.object.add = function(a, b, c) {
  if(b in a) {
    throw Error('The object already contains the key "' + b + '"');
  }
  goog.object.set(a, b, c)
};
goog.object.get = function(a, b, c) {
  return b in a ? a[b] : c
};
goog.object.set = function(a, b, c) {
  a[b] = c
};
goog.object.setIfUndefined = function(a, b, c) {
  return b in a ? a[b] : a[b] = c
};
goog.object.clone = function(a) {
  var b = {}, c;
  for(c in a) {
    b[c] = a[c]
  }
  return b
};
goog.object.unsafeClone = function(a) {
  var b = goog.typeOf(a);
  if("object" == b || "array" == b) {
    if(a.clone) {
      return a.clone()
    }
    var b = "array" == b ? [] : {}, c;
    for(c in a) {
      b[c] = goog.object.unsafeClone(a[c])
    }
    return b
  }
  return a
};
goog.object.transpose = function(a) {
  var b = {}, c;
  for(c in a) {
    b[a[c]] = c
  }
  return b
};
goog.object.PROTOTYPE_FIELDS_ = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
goog.object.extend = function(a, b) {
  for(var c, d, e = 1;e < arguments.length;e++) {
    d = arguments[e];
    for(c in d) {
      a[c] = d[c]
    }
    for(var f = 0;f < goog.object.PROTOTYPE_FIELDS_.length;f++) {
      c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }
};
goog.object.create = function(a) {
  var b = arguments.length;
  if(1 == b && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0])
  }
  if(b % 2) {
    throw Error("Uneven number of arguments");
  }
  for(var c = {}, d = 0;d < b;d += 2) {
    c[arguments[d]] = arguments[d + 1]
  }
  return c
};
goog.object.createSet = function(a) {
  var b = arguments.length;
  if(1 == b && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0])
  }
  for(var c = {}, d = 0;d < b;d++) {
    c[arguments[d]] = !0
  }
  return c
};
goog.dom.ASSUME_QUIRKS_MODE = !1;
goog.dom.ASSUME_STANDARDS_MODE = !1;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.dom.getDomHelper = function(a) {
  return a ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(a)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
};
goog.dom.getDocument = function() {
  return document
};
goog.dom.getElement = function(a) {
  return goog.isString(a) ? document.getElementById(a) : a
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagNameAndClass = function(a, b, c) {
  return goog.dom.getElementsByTagNameAndClass_(document, a, b, c)
};
goog.dom.getElementsByClass = function(a, b) {
  var c = b || document;
  return goog.dom.canUseQuerySelector_(c) ? c.querySelectorAll("." + a) : c.getElementsByClassName ? c.getElementsByClassName(a) : goog.dom.getElementsByTagNameAndClass_(document, "*", a, b)
};
goog.dom.getElementByClass = function(a, b) {
  var c = b || document, d = null;
  return(d = goog.dom.canUseQuerySelector_(c) ? c.querySelector("." + a) : goog.dom.getElementsByClass(a, b)[0]) || null
};
goog.dom.canUseQuerySelector_ = function(a) {
  return a.querySelectorAll && a.querySelector && (!goog.userAgent.WEBKIT || goog.dom.isCss1CompatMode_(document) || goog.userAgent.isVersion("528"))
};
goog.dom.getElementsByTagNameAndClass_ = function(a, b, c, d) {
  a = d || a;
  b = b && "*" != b ? b.toUpperCase() : "";
  if(goog.dom.canUseQuerySelector_(a) && (b || c)) {
    return a.querySelectorAll(b + (c ? "." + c : ""))
  }
  if(c && a.getElementsByClassName) {
    a = a.getElementsByClassName(c);
    if(b) {
      for(var d = {}, e = 0, f = 0, g;g = a[f];f++) {
        b == g.nodeName && (d[e++] = g)
      }
      d.length = e;
      return d
    }
    return a
  }
  a = a.getElementsByTagName(b || "*");
  if(c) {
    d = {};
    for(f = e = 0;g = a[f];f++) {
      b = g.className, "function" == typeof b.split && goog.array.contains(b.split(/\s+/), c) && (d[e++] = g)
    }
    d.length = e;
    return d
  }
  return a
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function(a, b) {
  goog.object.forEach(b, function(b, d) {
    "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : d in goog.dom.DIRECT_ATTRIBUTE_MAP_ ? a.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[d], b) : a[d] = b
  })
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", rowspan:"rowSpan", valign:"vAlign", height:"height", width:"width", usemap:"useMap", frameborder:"frameBorder", maxlength:"maxLength", type:"type"};
goog.dom.getViewportSize = function(a) {
  return goog.dom.getViewportSize_(a || window)
};
goog.dom.getViewportSize_ = function(a) {
  var b = a.document;
  if(goog.userAgent.WEBKIT && !goog.userAgent.isVersion("500") && !goog.userAgent.MOBILE) {
    "undefined" == typeof a.innerHeight && (a = window);
    var b = a.innerHeight, c = a.document.documentElement.scrollHeight;
    a == a.top && c < b && (b -= 15);
    return new goog.math.Size(a.innerWidth, b)
  }
  a = goog.dom.isCss1CompatMode_(b) ? b.documentElement : b.body;
  return new goog.math.Size(a.clientWidth, a.clientHeight)
};
goog.dom.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(window)
};
goog.dom.getDocumentHeight_ = function(a) {
  var b = a.document, c = 0;
  if(b) {
    var a = goog.dom.getViewportSize_(a).height, c = b.body, d = b.documentElement;
    if(goog.dom.isCss1CompatMode_(b) && d.scrollHeight) {
      c = d.scrollHeight != a ? d.scrollHeight : d.offsetHeight
    }else {
      var b = d.scrollHeight, e = d.offsetHeight;
      if(d.clientHeight != e) {
        b = c.scrollHeight, e = c.offsetHeight
      }
      c = b > a ? b > e ? b : e : b < e ? b : e
    }
  }
  return c
};
goog.dom.getPageScroll = function(a) {
  return goog.dom.getDomHelper((a || goog.global || window).document).getDocumentScroll()
};
goog.dom.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(document)
};
goog.dom.getDocumentScroll_ = function(a) {
  var b = goog.dom.getDocumentScrollElement_(a), a = goog.dom.getWindow_(a);
  return new goog.math.Coordinate(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
};
goog.dom.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(document)
};
goog.dom.getDocumentScrollElement_ = function(a) {
  return!goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body
};
goog.dom.getWindow = function(a) {
  return a ? goog.dom.getWindow_(a) : window
};
goog.dom.getWindow_ = function(a) {
  return a.parentWindow || a.defaultView
};
goog.dom.createDom = function(a, b, c) {
  return goog.dom.createDom_(document, arguments)
};
goog.dom.createDom_ = function(a, b) {
  var c = b[0], d = b[1];
  if(!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && d && (d.name || d.type)) {
    c = ["<", c];
    d.name && c.push(' name="', goog.string.htmlEscape(d.name), '"');
    if(d.type) {
      c.push(' type="', goog.string.htmlEscape(d.type), '"');
      var e = {};
      goog.object.extend(e, d);
      d = e;
      delete d.type
    }
    c.push(">");
    c = c.join("")
  }
  c = a.createElement(c);
  if(d) {
    goog.isString(d) ? c.className = d : goog.isArray(d) ? goog.dom.classes.add.apply(null, [c].concat(d)) : goog.dom.setProperties(c, d)
  }
  2 < b.length && goog.dom.append_(a, c, b, 2);
  return c
};
goog.dom.append_ = function(a, b, c, d) {
  function e(c) {
    c && b.appendChild(goog.isString(c) ? a.createTextNode(c) : c)
  }
  for(;d < c.length;d++) {
    var f = c[d];
    goog.isArrayLike(f) && !goog.dom.isNodeLike(f) ? goog.array.forEach(goog.dom.isNodeList(f) ? goog.array.clone(f) : f, e) : e(f)
  }
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function(a) {
  return document.createElement(a)
};
goog.dom.createTextNode = function(a) {
  return document.createTextNode(a)
};
goog.dom.createTable = function(a, b, c) {
  return goog.dom.createTable_(document, a, b, !!c)
};
goog.dom.createTable_ = function(a, b, c, d) {
  for(var e = ["<tr>"], f = 0;f < c;f++) {
    e.push(d ? "<td>&nbsp;</td>" : "<td></td>")
  }
  e.push("</tr>");
  e = e.join("");
  c = ["<table>"];
  for(f = 0;f < b;f++) {
    c.push(e)
  }
  c.push("</table>");
  a = a.createElement(goog.dom.TagName.DIV);
  a.innerHTML = c.join("");
  return a.removeChild(a.firstChild)
};
goog.dom.htmlToDocumentFragment = function(a) {
  return goog.dom.htmlToDocumentFragment_(document, a)
};
goog.dom.htmlToDocumentFragment_ = function(a, b) {
  var c = a.createElement("div");
  goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (c.innerHTML = "<br>" + b, c.removeChild(c.firstChild)) : c.innerHTML = b;
  if(1 == c.childNodes.length) {
    return c.removeChild(c.firstChild)
  }
  for(var d = a.createDocumentFragment();c.firstChild;) {
    d.appendChild(c.firstChild)
  }
  return d
};
goog.dom.getCompatMode = function() {
  return goog.dom.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(document)
};
goog.dom.isCss1CompatMode_ = function(a) {
  return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : "CSS1Compat" == a.compatMode
};
goog.dom.canHaveChildren = function(a) {
  if(a.nodeType != goog.dom.NodeType.ELEMENT) {
    return!1
  }
  switch(a.tagName) {
    case goog.dom.TagName.APPLET:
    ;
    case goog.dom.TagName.AREA:
    ;
    case goog.dom.TagName.BASE:
    ;
    case goog.dom.TagName.BR:
    ;
    case goog.dom.TagName.COL:
    ;
    case goog.dom.TagName.FRAME:
    ;
    case goog.dom.TagName.HR:
    ;
    case goog.dom.TagName.IMG:
    ;
    case goog.dom.TagName.INPUT:
    ;
    case goog.dom.TagName.IFRAME:
    ;
    case goog.dom.TagName.ISINDEX:
    ;
    case goog.dom.TagName.LINK:
    ;
    case goog.dom.TagName.NOFRAMES:
    ;
    case goog.dom.TagName.NOSCRIPT:
    ;
    case goog.dom.TagName.META:
    ;
    case goog.dom.TagName.OBJECT:
    ;
    case goog.dom.TagName.PARAM:
    ;
    case goog.dom.TagName.SCRIPT:
    ;
    case goog.dom.TagName.STYLE:
      return!1
  }
  return!0
};
goog.dom.appendChild = function(a, b) {
  a.appendChild(b)
};
goog.dom.append = function(a, b) {
  goog.dom.append_(goog.dom.getOwnerDocument(a), a, arguments, 1)
};
goog.dom.removeChildren = function(a) {
  for(var b;b = a.firstChild;) {
    a.removeChild(b)
  }
};
goog.dom.insertSiblingBefore = function(a, b) {
  b.parentNode && b.parentNode.insertBefore(a, b)
};
goog.dom.insertSiblingAfter = function(a, b) {
  b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
};
goog.dom.insertChildAt = function(a, b, c) {
  a.insertBefore(b, a.childNodes[c] || null)
};
goog.dom.removeNode = function(a) {
  return a && a.parentNode ? a.parentNode.removeChild(a) : null
};
goog.dom.replaceNode = function(a, b) {
  var c = b.parentNode;
  c && c.replaceChild(a, b)
};
goog.dom.flattenElement = function(a) {
  var b, c = a.parentNode;
  if(c && c.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
    if(a.removeNode) {
      return a.removeNode(!1)
    }
    for(;b = a.firstChild;) {
      c.insertBefore(b, a)
    }
    return goog.dom.removeNode(a)
  }
};
goog.dom.getChildren = function(a) {
  return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && void 0 != a.children ? a.children : goog.array.filter(a.childNodes, function(a) {
    return a.nodeType == goog.dom.NodeType.ELEMENT
  })
};
goog.dom.getFirstElementChild = function(a) {
  return void 0 != a.firstElementChild ? a.firstElementChild : goog.dom.getNextElementNode_(a.firstChild, !0)
};
goog.dom.getLastElementChild = function(a) {
  return void 0 != a.lastElementChild ? a.lastElementChild : goog.dom.getNextElementNode_(a.lastChild, !1)
};
goog.dom.getNextElementSibling = function(a) {
  return void 0 != a.nextElementSibling ? a.nextElementSibling : goog.dom.getNextElementNode_(a.nextSibling, !0)
};
goog.dom.getPreviousElementSibling = function(a) {
  return void 0 != a.previousElementSibling ? a.previousElementSibling : goog.dom.getNextElementNode_(a.previousSibling, !1)
};
goog.dom.getNextElementNode_ = function(a, b) {
  for(;a && a.nodeType != goog.dom.NodeType.ELEMENT;) {
    a = b ? a.nextSibling : a.previousSibling
  }
  return a
};
goog.dom.getNextNode = function(a) {
  if(!a) {
    return null
  }
  if(a.firstChild) {
    return a.firstChild
  }
  for(;a && !a.nextSibling;) {
    a = a.parentNode
  }
  return a ? a.nextSibling : null
};
goog.dom.getPreviousNode = function(a) {
  if(!a) {
    return null
  }
  if(!a.previousSibling) {
    return a.parentNode
  }
  for(a = a.previousSibling;a && a.lastChild;) {
    a = a.lastChild
  }
  return a
};
goog.dom.isNodeLike = function(a) {
  return goog.isObject(a) && 0 < a.nodeType
};
goog.dom.isWindow = function(a) {
  return goog.isObject(a) && a.window == a
};
goog.dom.contains = function(a, b) {
  if(a.contains && b.nodeType == goog.dom.NodeType.ELEMENT) {
    return a == b || a.contains(b)
  }
  if("undefined" != typeof a.compareDocumentPosition) {
    return a == b || Boolean(a.compareDocumentPosition(b) & 16)
  }
  for(;b && a != b;) {
    b = b.parentNode
  }
  return b == a
};
goog.dom.compareNodeOrder = function(a, b) {
  if(a == b) {
    return 0
  }
  if(a.compareDocumentPosition) {
    return a.compareDocumentPosition(b) & 2 ? 1 : -1
  }
  if("sourceIndex" in a || a.parentNode && "sourceIndex" in a.parentNode) {
    var c = a.nodeType == goog.dom.NodeType.ELEMENT, d = b.nodeType == goog.dom.NodeType.ELEMENT;
    if(c && d) {
      return a.sourceIndex - b.sourceIndex
    }
    var e = a.parentNode, f = b.parentNode;
    return e == f ? goog.dom.compareSiblingOrder_(a, b) : !c && goog.dom.contains(e, b) ? -1 * goog.dom.compareParentsDescendantNodeIe_(a, b) : !d && goog.dom.contains(f, a) ? goog.dom.compareParentsDescendantNodeIe_(b, a) : (c ? a.sourceIndex : e.sourceIndex) - (d ? b.sourceIndex : f.sourceIndex)
  }
  d = goog.dom.getOwnerDocument(a);
  c = d.createRange();
  c.selectNode(a);
  c.collapse(!0);
  d = d.createRange();
  d.selectNode(b);
  d.collapse(!0);
  return c.compareBoundaryPoints(goog.global.Range.START_TO_END, d)
};
goog.dom.compareParentsDescendantNodeIe_ = function(a, b) {
  var c = a.parentNode;
  if(c == b) {
    return-1
  }
  for(var d = b;d.parentNode != c;) {
    d = d.parentNode
  }
  return goog.dom.compareSiblingOrder_(d, a)
};
goog.dom.compareSiblingOrder_ = function(a, b) {
  for(var c = b;c = c.previousSibling;) {
    if(c == a) {
      return-1
    }
  }
  return 1
};
goog.dom.findCommonAncestor = function(a) {
  var b, c = arguments.length;
  if(c) {
    if(1 == c) {
      return arguments[0]
    }
  }else {
    return null
  }
  var d = [], e = Infinity;
  for(b = 0;b < c;b++) {
    for(var f = [], g = arguments[b];g;) {
      f.unshift(g), g = g.parentNode
    }
    d.push(f);
    e = Math.min(e, f.length)
  }
  f = null;
  for(b = 0;b < e;b++) {
    for(var g = d[0][b], h = 1;h < c;h++) {
      if(g != d[h][b]) {
        return f
      }
    }
    f = g
  }
  return f
};
goog.dom.getOwnerDocument = function(a) {
  return a.nodeType == goog.dom.NodeType.DOCUMENT ? a : a.ownerDocument || a.document
};
goog.dom.getFrameContentDocument = function(a) {
  return goog.userAgent.WEBKIT ? a.document || a.contentWindow.document : a.contentDocument || a.contentWindow.document
};
goog.dom.getFrameContentWindow = function(a) {
  return a.contentWindow || goog.dom.getWindow_(goog.dom.getFrameContentDocument(a))
};
goog.dom.setTextContent = function(a, b) {
  if("textContent" in a) {
    a.textContent = b
  }else {
    if(a.firstChild && a.firstChild.nodeType == goog.dom.NodeType.TEXT) {
      for(;a.lastChild != a.firstChild;) {
        a.removeChild(a.lastChild)
      }
      a.firstChild.data = b
    }else {
      goog.dom.removeChildren(a);
      var c = goog.dom.getOwnerDocument(a);
      a.appendChild(c.createTextNode(b))
    }
  }
};
goog.dom.getOuterHtml = function(a) {
  if("outerHTML" in a) {
    return a.outerHTML
  }
  var b = goog.dom.getOwnerDocument(a).createElement("div");
  b.appendChild(a.cloneNode(!0));
  return b.innerHTML
};
goog.dom.findNode = function(a, b) {
  var c = [];
  return goog.dom.findNodes_(a, b, c, !0) ? c[0] : void 0
};
goog.dom.findNodes = function(a, b) {
  var c = [];
  goog.dom.findNodes_(a, b, c, !1);
  return c
};
goog.dom.findNodes_ = function(a, b, c, d) {
  if(null != a) {
    for(var e = 0, f;f = a.childNodes[e];e++) {
      if(b(f) && (c.push(f), d) || goog.dom.findNodes_(f, b, c, d)) {
        return!0
      }
    }
  }
  return!1
};
goog.dom.TAGS_TO_IGNORE_ = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1};
goog.dom.PREDEFINED_TAG_VALUES_ = {IMG:" ", BR:"\n"};
goog.dom.isFocusableTabIndex = function(a) {
  var b = a.getAttributeNode("tabindex");
  return b && b.specified ? (a = a.tabIndex, goog.isNumber(a) && 0 <= a) : !1
};
goog.dom.setFocusableTabIndex = function(a, b) {
  b ? a.tabIndex = 0 : a.removeAttribute("tabIndex")
};
goog.dom.getTextContent = function(a) {
  if(goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && "innerText" in a) {
    a = goog.string.canonicalizeNewlines(a.innerText)
  }else {
    var b = [];
    goog.dom.getTextContent_(a, b, !0);
    a = b.join("")
  }
  a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
  a = a.replace(/\u200B/g, "");
  goog.userAgent.IE || (a = a.replace(/ +/g, " "));
  " " != a && (a = a.replace(/^\s*/, ""));
  return a
};
goog.dom.getRawTextContent = function(a) {
  var b = [];
  goog.dom.getTextContent_(a, b, !1);
  return b.join("")
};
goog.dom.getTextContent_ = function(a, b, c) {
  if(!(a.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
    if(a.nodeType == goog.dom.NodeType.TEXT) {
      c ? b.push(("" + a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue)
    }else {
      if(a.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
        b.push(goog.dom.PREDEFINED_TAG_VALUES_[a.nodeName])
      }else {
        for(a = a.firstChild;a;) {
          goog.dom.getTextContent_(a, b, c), a = a.nextSibling
        }
      }
    }
  }
};
goog.dom.getNodeTextLength = function(a) {
  return goog.dom.getTextContent(a).length
};
goog.dom.getNodeTextOffset = function(a, b) {
  for(var c = b || goog.dom.getOwnerDocument(a).body, d = [];a && a != c;) {
    for(var e = a;e = e.previousSibling;) {
      d.unshift(goog.dom.getTextContent(e))
    }
    a = a.parentNode
  }
  return goog.string.trimLeft(d.join("")).replace(/ +/g, " ").length
};
goog.dom.getNodeAtOffset = function(a, b, c) {
  for(var a = [a], d = 0, e;0 < a.length && d < b;) {
    if(e = a.pop(), !(e.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
      if(e.nodeType == goog.dom.NodeType.TEXT) {
        var f = e.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " "), d = d + f.length
      }else {
        if(e.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
          d += goog.dom.PREDEFINED_TAG_VALUES_[e.nodeName].length
        }else {
          for(f = e.childNodes.length - 1;0 <= f;f--) {
            a.push(e.childNodes[f])
          }
        }
      }
    }
  }
  if(goog.isObject(c)) {
    c.remainder = e ? e.nodeValue.length + b - d - 1 : 0, c.node = e
  }
  return e
};
goog.dom.isNodeList = function(a) {
  if(a && "number" == typeof a.length) {
    if(goog.isObject(a)) {
      return"function" == typeof a.item || "string" == typeof a.item
    }
    if(goog.isFunction(a)) {
      return"function" == typeof a.item
    }
  }
  return!1
};
goog.dom.getAncestorByTagNameAndClass = function(a, b, c) {
  var d = b ? b.toUpperCase() : null;
  return goog.dom.getAncestor(a, function(a) {
    return(!d || a.nodeName == d) && (!c || goog.dom.classes.has(a, c))
  }, !0)
};
goog.dom.getAncestorByClass = function(a, b) {
  return goog.dom.getAncestorByTagNameAndClass(a, null, b)
};
goog.dom.getAncestor = function(a, b, c, d) {
  if(!c) {
    a = a.parentNode
  }
  for(var c = null == d, e = 0;a && (c || e <= d);) {
    if(b(a)) {
      return a
    }
    a = a.parentNode;
    e++
  }
  return null
};
goog.dom.DomHelper = function(a) {
  this.document_ = a || goog.global.document || document
};
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.setDocument = function(a) {
  this.document_ = a
};
goog.dom.DomHelper.prototype.getDocument = function() {
  return this.document_
};
goog.dom.DomHelper.prototype.getElement = function(a) {
  return goog.isString(a) ? this.document_.getElementById(a) : a
};
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function(a, b, c) {
  return goog.dom.getElementsByTagNameAndClass_(this.document_, a, b, c)
};
goog.dom.DomHelper.prototype.getElementsByClass = function(a, b) {
  return goog.dom.getElementsByClass(a, b || this.document_)
};
goog.dom.DomHelper.prototype.getElementByClass = function(a, b) {
  return goog.dom.getElementByClass(a, b || this.document_)
};
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function(a) {
  return goog.dom.getViewportSize(a || this.getWindow())
};
goog.dom.DomHelper.prototype.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(this.getWindow())
};
goog.dom.DomHelper.prototype.createDom = function(a, b, c) {
  return goog.dom.createDom_(this.document_, arguments)
};
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function(a) {
  return this.document_.createElement(a)
};
goog.dom.DomHelper.prototype.createTextNode = function(a) {
  return this.document_.createTextNode(a)
};
goog.dom.DomHelper.prototype.createTable = function(a, b, c) {
  return goog.dom.createTable_(this.document_, a, b, !!c)
};
goog.dom.DomHelper.prototype.htmlToDocumentFragment = function(a) {
  return goog.dom.htmlToDocumentFragment_(this.document_, a)
};
goog.dom.DomHelper.prototype.getCompatMode = function() {
  return this.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.DomHelper.prototype.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(this.document_)
};
goog.dom.DomHelper.prototype.getWindow = function() {
  return goog.dom.getWindow_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(this.document_)
};
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.append = goog.dom.append;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.functions = {};
goog.functions.constant = function(a) {
  return function() {
    return a
  }
};
goog.functions.FALSE = goog.functions.constant(!1);
goog.functions.TRUE = goog.functions.constant(!0);
goog.functions.NULL = goog.functions.constant(null);
goog.functions.identity = function(a) {
  return a
};
goog.functions.error = function(a) {
  return function() {
    throw Error(a);
  }
};
goog.functions.lock = function(a) {
  return function() {
    return a.call(this)
  }
};
goog.functions.withReturnValue = function(a, b) {
  return goog.functions.sequence(a, goog.functions.constant(b))
};
goog.functions.compose = function(a) {
  var b = arguments, c = b.length;
  return function() {
    var a;
    c && (a = b[c - 1].apply(this, arguments));
    for(var e = c - 2;0 <= e;e--) {
      a = b[e].call(this, a)
    }
    return a
  }
};
goog.functions.sequence = function(a) {
  var b = arguments, c = b.length;
  return function() {
    for(var a, e = 0;e < c;e++) {
      a = b[e].apply(this, arguments)
    }
    return a
  }
};
goog.functions.and = function(a) {
  var b = arguments, c = b.length;
  return function() {
    for(var a = 0;a < c;a++) {
      if(!b[a].apply(this, arguments)) {
        return!1
      }
    }
    return!0
  }
};
goog.functions.or = function(a) {
  var b = arguments, c = b.length;
  return function() {
    for(var a = 0;a < c;a++) {
      if(b[a].apply(this, arguments)) {
        return!0
      }
    }
    return!1
  }
};
goog.functions.not = function(a) {
  return function() {
    return!a.apply(this, arguments)
  }
};
goog.functions.create = function(a, b) {
  var c = function() {
  };
  c.prototype = a.prototype;
  c = new c;
  a.apply(c, Array.prototype.slice.call(arguments, 1));
  return c
};
/*
 Portions of this code are from the Dojo Toolkit, received by
 The Closure Library Authors under the BSD license. All other code is
 Copyright 2005-2009 The Closure Library Authors. All Rights Reserved.

 The "New" BSD License:

 Copyright (c) 2005-2009, The Dojo Foundation
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above copyright notice, this
 list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.
 Neither the name of the Dojo Foundation nor the names of its contributors
 may be used to endorse or promote products derived from this software
 without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
 FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
goog.dom.query = function() {
  function a(a, b) {
    var c = b || [];
    a && c.push(a);
    return c
  }
  var b = goog.userAgent.WEBKIT && "BackCompat" == goog.dom.getDocument().compatMode, c = goog.dom.getDocument().firstChild.children ? "children" : "childNodes", d = !1, e = function(a) {
    for(var a = 0 <= ">~+".indexOf(a.slice(-1)) ? a + " * " : a + " ", b = function(b, c) {
      return goog.string.trim(a.slice(b, c))
    }, c = [], e = -1, f = -1, g = -1, h = -1, i = -1, j = -1, m = -1, k = "", l = "", p, n = 0, q = a.length, o = null, r = null, t = function() {
      if(0 <= j) {
        o.id = b(j, n).replace(/\\/g, ""), j = -1
      }
      if(0 <= m) {
        var a = m == n ? null : b(m, n);
        0 > ">~+".indexOf(a) ? o.tag = a : o.oper = a;
        m = -1
      }
      0 <= i && (o.classes.push(b(i + 1, n).replace(/\\/g, "")), i = -1)
    };k = l, l = a.charAt(n), n < q;n++) {
      if("\\" != k) {
        if(o || (p = n, o = {query:null, pseudos:[], attrs:[], classes:[], tag:null, oper:null, id:null, getTag:function() {
          return d ? this.otag : this.tag
        }}, m = n), 0 <= e) {
          if("]" == l) {
            r.attr ? r.matchFor = b(g || e + 1, n) : r.attr = b(e + 1, n);
            if((e = r.matchFor) && ('"' == e.charAt(0) || "'" == e.charAt(0))) {
              r.matchFor = e.slice(1, -1)
            }
            o.attrs.push(r);
            r = null;
            e = g = -1
          }else {
            if("=" == l) {
              g = 0 <= "|~^$*".indexOf(k) ? k : "", r.type = g + l, r.attr = b(e + 1, n - g.length), g = n + 1
            }
          }
        }else {
          if(0 <= f) {
            if(")" == l) {
              if(0 <= h) {
                r.value = b(f + 1, n)
              }
              h = f = -1
            }
          }else {
            if("#" == l) {
              t(), j = n + 1
            }else {
              if("." == l) {
                t(), i = n
              }else {
                if(":" == l) {
                  t(), h = n
                }else {
                  if("[" == l) {
                    t(), e = n, r = {}
                  }else {
                    if("(" == l) {
                      0 <= h && (r = {name:b(h + 1, n), value:null}, o.pseudos.push(r)), f = n
                    }else {
                      if(" " == l && k != l) {
                        t();
                        0 <= h && o.pseudos.push({name:b(h + 1, n)});
                        o.loops = o.pseudos.length || o.attrs.length || o.classes.length;
                        o.oquery = o.query = b(p, n);
                        o.otag = o.tag = o.oper ? null : o.tag || "*";
                        if(o.tag) {
                          o.tag = o.tag.toUpperCase()
                        }
                        if(c.length && c[c.length - 1].oper) {
                          o.infixOper = c.pop(), o.query = o.infixOper.query + " " + o.query
                        }
                        c.push(o);
                        o = null
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return c
  }, f = function(a, b) {
    return!a ? b : !b ? a : function() {
      return a.apply(window, arguments) && b.apply(window, arguments)
    }
  }, g = function(a) {
    return 1 == a.nodeType
  }, h = function(a, b) {
    return!a ? "" : "class" == b ? a.className || "" : "for" == b ? a.htmlFor || "" : "style" == b ? a.style.cssText || "" : (d ? a.getAttribute(b) : a.getAttribute(b, 2)) || ""
  }, i = {"*=":function(a, b) {
    return function(c) {
      return 0 <= h(c, a).indexOf(b)
    }
  }, "^=":function(a, b) {
    return function(c) {
      return 0 == h(c, a).indexOf(b)
    }
  }, "$=":function(a, b) {
    return function(c) {
      c = " " + h(c, a);
      return c.lastIndexOf(b) == c.length - b.length
    }
  }, "~=":function(a, b) {
    var c = " " + b + " ";
    return function(b) {
      return 0 <= (" " + h(b, a) + " ").indexOf(c)
    }
  }, "|=":function(a, b) {
    b = " " + b;
    return function(c) {
      c = " " + h(c, a);
      return c == b || 0 == c.indexOf(b + "-")
    }
  }, "=":function(a, b) {
    return function(c) {
      return h(c, a) == b
    }
  }}, j = "undefined" == typeof goog.dom.getDocument().firstChild.nextElementSibling, k = !j ? "nextElementSibling" : "nextSibling", l = !j ? "previousElementSibling" : "previousSibling", m = j ? g : goog.functions.TRUE, p = function(a) {
    for(;a = a[l];) {
      if(m(a)) {
        return!1
      }
    }
    return!0
  }, n = function(a) {
    for(;a = a[k];) {
      if(m(a)) {
        return!1
      }
    }
    return!0
  }, q = function(a) {
    var b = a.parentNode, d = 0, e = b[c], f = a._i || -1, g = b._l || -1;
    if(!e) {
      return-1
    }
    e = e.length;
    if(g == e && 0 <= f && 0 <= g) {
      return f
    }
    b._l = e;
    f = -1;
    for(b = b.firstElementChild || b.firstChild;b;b = b[k]) {
      if(m(b)) {
        b._i = ++d, a === b && (f = d)
      }
    }
    return f
  }, o = function(a) {
    return!(q(a) % 2)
  }, s = function(a) {
    return q(a) % 2
  }, t = {checked:function() {
    return function(a) {
      return a.checked || a.attributes.checked
    }
  }, "first-child":function() {
    return p
  }, "last-child":function() {
    return n
  }, "only-child":function() {
    return function(a) {
      return!p(a) || !n(a) ? !1 : !0
    }
  }, empty:function() {
    return function(a) {
      for(var b = a.childNodes, a = a.childNodes.length - 1;0 <= a;a--) {
        var c = b[a].nodeType;
        if(1 === c || 3 == c) {
          return!1
        }
      }
      return!0
    }
  }, contains:function(a, b) {
    var c = b.charAt(0);
    if('"' == c || "'" == c) {
      b = b.slice(1, -1)
    }
    return function(a) {
      return 0 <= a.innerHTML.indexOf(b)
    }
  }, not:function(a, b) {
    var c = e(b)[0], d = {el:1};
    if("*" != c.tag) {
      d.tag = 1
    }
    if(!c.classes.length) {
      d.classes = 1
    }
    var f = v(c, d);
    return function(a) {
      return!f(a)
    }
  }, "nth-child":function(a, b) {
    if("odd" == b) {
      return s
    }
    if("even" == b) {
      return o
    }
    if(-1 != b.indexOf("n")) {
      var c = b.split("n", 2), d = c[0] ? "-" == c[0] ? -1 : parseInt(c[0], 10) : 1, e = c[1] ? parseInt(c[1], 10) : 0, f = 0, g = -1;
      0 < d ? 0 > e ? e = e % d && d + e % d : 0 < e && (e >= d && (f = e - e % d), e %= d) : 0 > d && (d *= -1, 0 < e && (g = e, e %= d));
      if(0 < d) {
        return function(a) {
          a = q(a);
          return a >= f && (0 > g || a <= g) && a % d == e
        }
      }
      b = e
    }
    var h = parseInt(b, 10);
    return function(a) {
      return q(a) == h
    }
  }}, r = goog.userAgent.IE ? function(a) {
    var b = a.toLowerCase();
    "class" == b && (a = "className");
    return function(c) {
      return d ? c.getAttribute(a) : c[a] || c[b]
    }
  } : function(a) {
    return function(b) {
      return b && b.getAttribute && b.hasAttribute(a)
    }
  }, v = function(a, b) {
    if(!a) {
      return goog.functions.TRUE
    }
    var b = b || {}, c = null;
    b.el || (c = f(c, g));
    b.tag || "*" != a.tag && (c = f(c, function(b) {
      return b && b.tagName == a.getTag()
    }));
    b.classes || goog.array.forEach(a.classes, function(a, b) {
      var d = RegExp("(?:^|\\s)" + a + "(?:\\s|$)");
      c = f(c, function(a) {
        return d.test(a.className)
      });
      c.count = b
    });
    b.pseudos || goog.array.forEach(a.pseudos, function(a) {
      var b = a.name;
      t[b] && (c = f(c, t[b](b, a.value)))
    });
    b.attrs || goog.array.forEach(a.attrs, function(a) {
      var b, d = a.attr;
      a.type && i[a.type] ? b = i[a.type](d, a.matchFor) : d.length && (b = r(d));
      b && (c = f(c, b))
    });
    b.id || a.id && (c = f(c, function(b) {
      return!!b && b.id == a.id
    }));
    if(!c && !("default" in b)) {
      c = goog.functions.TRUE
    }
    return c
  }, I = function(a) {
    return function(b, c, d) {
      for(;b = b[k];) {
        if(!j || g(b)) {
          (!d || w(b, d)) && a(b) && c.push(b);
          break
        }
      }
      return c
    }
  }, B = function(a) {
    return function(b, c, d) {
      for(b = b[k];b;) {
        if(m(b)) {
          if(d && !w(b, d)) {
            break
          }
          a(b) && c.push(b)
        }
        b = b[k]
      }
      return c
    }
  }, C = function(a) {
    a = a || goog.functions.TRUE;
    return function(b, d, e) {
      for(var f = 0, g = b[c];b = g[f++];) {
        m(b) && (!e || w(b, e)) && a(b, f) && d.push(b)
      }
      return d
    }
  }, D = {}, E = function(c) {
    var d = D[c.query];
    if(d) {
      return d
    }
    var e = c.infixOper, e = e ? e.oper : "", f = v(c, {el:1}), g = "*" == c.tag, h = goog.dom.getDocument().getElementsByClassName;
    if(e) {
      h = {el:1};
      if(g) {
        h.tag = 1
      }
      f = v(c, h);
      "+" == e ? d = I(f) : "~" == e ? d = B(f) : ">" == e && (d = C(f))
    }else {
      if(c.id) {
        f = !c.loops && g ? goog.functions.TRUE : v(c, {el:1, id:1}), d = function(b, d) {
          var e = goog.dom.getDomHelper(b).getElement(c.id);
          if(e && f(e)) {
            if(9 == b.nodeType) {
              return a(e, d)
            }
            for(var g = e.parentNode;g && !(g == b);) {
              g = g.parentNode
            }
            if(g) {
              return a(e, d)
            }
          }
        }
      }else {
        if(h && /\{\s*\[native code\]\s*\}/.test("" + h) && c.classes.length && !b) {
          var f = v(c, {el:1, classes:1, id:1}), i = c.classes.join(" "), d = function(b, c) {
            for(var d = a(0, c), e, g = 0, h = b.getElementsByClassName(i);e = h[g++];) {
              f(e, b) && d.push(e)
            }
            return d
          }
        }else {
          !g && !c.loops ? d = function(b, d) {
            for(var e = a(0, d), f, g = 0, h = b.getElementsByTagName(c.getTag());f = h[g++];) {
              e.push(f)
            }
            return e
          } : (f = v(c, {el:1, tag:1, id:1}), d = function(b, d) {
            for(var e = a(0, d), g, h = 0, i = b.getElementsByTagName(c.getTag());g = i[h++];) {
              f(g, b) && e.push(g)
            }
            return e
          })
        }
      }
    }
    return D[c.query] = d
  }, x = {}, y = {}, F = function(b) {
    var c = e(goog.string.trim(b));
    if(1 == c.length) {
      var d = E(c[0]);
      return function(a) {
        if(a = d(a, [])) {
          a.nozip = !0
        }
        return a
      }
    }
    return function(b) {
      for(var b = a(b), d, e, f = c.length, g, h, i = 0;i < f;i++) {
        h = [];
        d = c[i];
        e = b.length - 1;
        if(0 < e) {
          g = {}, h.nozip = !0
        }
        e = E(d);
        for(var j = 0;d = b[j];j++) {
          e(d, h, g)
        }
        if(!h.length) {
          break
        }
        b = h
      }
      return h
    }
  }, G = !!goog.dom.getDocument().querySelectorAll && (!goog.userAgent.WEBKIT || goog.userAgent.isVersion("526")), z = function(a, c) {
    if(G) {
      var d = y[a];
      if(d && !c) {
        return d
      }
    }
    if(d = x[a]) {
      return d
    }
    var d = a.charAt(0), e = -1 == a.indexOf(" ");
    0 <= a.indexOf("#") && e && (c = !0);
    if(G && !c && -1 == ">~+".indexOf(d) && (!goog.userAgent.IE || -1 == a.indexOf(":")) && !(b && 0 <= a.indexOf(".")) && -1 == a.indexOf(":contains") && -1 == a.indexOf("|=")) {
      var f = 0 <= ">~+".indexOf(a.charAt(a.length - 1)) ? a + " *" : a;
      return y[a] = function(b) {
        try {
          if(!(9 == b.nodeType || e)) {
            throw"";
          }
          var c = b.querySelectorAll(f);
          goog.userAgent.IE ? c.commentStrip = !0 : c.nozip = !0;
          return c
        }catch(d) {
          return z(a, !0)(b)
        }
      }
    }
    var g = a.split(/\s*,\s*/);
    return x[a] = 2 > g.length ? F(a) : function(a) {
      for(var b = 0, c = [], d;d = g[b++];) {
        c = c.concat(F(d)(a))
      }
      return c
    }
  }, u = 0, J = goog.userAgent.IE ? function(a) {
    return d ? a.getAttribute("_uid") || a.setAttribute("_uid", ++u) || u : a.uniqueID
  } : function(a) {
    return a._uid || (a._uid = ++u)
  }, w = function(a, b) {
    if(!b) {
      return 1
    }
    var c = J(a);
    return!b[c] ? b[c] = 1 : 0
  }, H = function(a) {
    if(a && a.nozip) {
      return a
    }
    var b = [];
    if(!a || !a.length) {
      return b
    }
    a[0] && b.push(a[0]);
    if(2 > a.length) {
      return b
    }
    u++;
    if(goog.userAgent.IE && d) {
      var c = u + "";
      a[0].setAttribute("_zipIdx", c);
      for(var e = 1, f;f = a[e];e++) {
        a[e].getAttribute("_zipIdx") != c && b.push(f), f.setAttribute("_zipIdx", c)
      }
    }else {
      if(goog.userAgent.IE && a.commentStrip) {
        try {
          for(e = 1;f = a[e];e++) {
            g(f) && b.push(f)
          }
        }catch(h) {
        }
      }else {
        a[0] && (a[0]._zipIdx = u);
        for(e = 1;f = a[e];e++) {
          a[e]._zipIdx != u && b.push(f), f._zipIdx = u
        }
      }
    }
    return b
  }, A = function(a, b) {
    if(!a) {
      return[]
    }
    if(a.constructor == Array) {
      return a
    }
    if(!goog.isString(a)) {
      return[a]
    }
    if(goog.isString(b) && (b = goog.dom.getElement(b), !b)) {
      return[]
    }
    var b = b || goog.dom.getDocument(), c = b.ownerDocument || b.documentElement;
    d = b.contentType && "application/xml" == b.contentType || goog.userAgent.OPERA && (b.doctype || "[object XMLDocument]" == c.toString()) || !!c && (goog.userAgent.IE ? c.xml : b.xmlVersion || c.xmlVersion);
    return(c = z(a)(b)) && c.nozip ? c : H(c)
  };
  A.pseudos = t;
  return A
}();
goog.exportSymbol("goog.dom.query", goog.dom.query);
goog.exportSymbol("goog.dom.query.pseudos", goog.dom.query.pseudos);
goog.disposable = {};
goog.disposable.IDisposable = function() {
};
goog.Disposable = function() {
  goog.Disposable.ENABLE_MONITORING && (goog.Disposable.instances_[goog.getUid(this)] = this)
};
goog.Disposable.ENABLE_MONITORING = !1;
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function() {
  var a = [], b;
  for(b in goog.Disposable.instances_) {
    goog.Disposable.instances_.hasOwnProperty(b) && a.push(goog.Disposable.instances_[Number(b)])
  }
  return a
};
goog.Disposable.clearUndisposedObjects = function() {
  goog.Disposable.instances_ = {}
};
goog.Disposable.prototype.disposed_ = !1;
goog.Disposable.prototype.isDisposed = function() {
  return this.disposed_
};
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose = function() {
  if(!this.disposed_ && (this.disposed_ = !0, this.disposeInternal(), goog.Disposable.ENABLE_MONITORING)) {
    var a = goog.getUid(this);
    if(!goog.Disposable.instances_.hasOwnProperty(a)) {
      throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
    }
    delete goog.Disposable.instances_[a]
  }
};
goog.Disposable.prototype.disposeInternal = function() {
};
goog.dispose = function(a) {
  a && "function" == typeof a.dispose && a.dispose()
};
goog.debug.entryPointRegistry = {};
goog.debug.EntryPointMonitor = function() {
};
goog.debug.entryPointRegistry.refList_ = [];
goog.debug.entryPointRegistry.register = function(a) {
  goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = a
};
goog.debug.entryPointRegistry.monitorAll = function(a) {
  for(var a = goog.bind(a.wrap, a), b = 0;b < goog.debug.entryPointRegistry.refList_.length;b++) {
    goog.debug.entryPointRegistry.refList_[b](a)
  }
};
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(a) {
  for(var a = goog.bind(a.unwrap, a), b = 0;b < goog.debug.entryPointRegistry.refList_.length;b++) {
    goog.debug.entryPointRegistry.refList_[b](a)
  }
};
goog.debug.errorHandlerWeakDep = {protectEntryPoint:function(a) {
  return a
}};
goog.events = {};
goog.events.BrowserFeature = {HAS_W3C_BUTTON:!goog.userAgent.IE || goog.userAgent.isVersion("9"), SET_KEY_CODE_TO_PREVENT_DEFAULT:goog.userAgent.IE && !goog.userAgent.isVersion("8")};
goog.events.Event = function(a, b) {
  goog.Disposable.call(this);
  this.type = a;
  this.currentTarget = this.target = b
};
goog.inherits(goog.events.Event, goog.Disposable);
goog.events.Event.prototype.disposeInternal = function() {
  delete this.type;
  delete this.target;
  delete this.currentTarget
};
goog.events.Event.prototype.propagationStopped_ = !1;
goog.events.Event.prototype.returnValue_ = !0;
goog.events.Event.prototype.stopPropagation = function() {
  this.propagationStopped_ = !0
};
goog.events.Event.prototype.preventDefault = function() {
  this.returnValue_ = !1
};
goog.events.Event.stopPropagation = function(a) {
  a.stopPropagation()
};
goog.events.Event.preventDefault = function(a) {
  a.preventDefault()
};
goog.events.EventType = {CLICK:"click", DBLCLICK:"dblclick", MOUSEDOWN:"mousedown", MOUSEUP:"mouseup", MOUSEOVER:"mouseover", MOUSEOUT:"mouseout", MOUSEMOVE:"mousemove", SELECTSTART:"selectstart", KEYPRESS:"keypress", KEYDOWN:"keydown", KEYUP:"keyup", BLUR:"blur", FOCUS:"focus", DEACTIVATE:"deactivate", FOCUSIN:goog.userAgent.IE ? "focusin" : "DOMFocusIn", FOCUSOUT:goog.userAgent.IE ? "focusout" : "DOMFocusOut", CHANGE:"change", SELECT:"select", SUBMIT:"submit", INPUT:"input", PROPERTYCHANGE:"propertychange", 
DRAGSTART:"dragstart", DRAGENTER:"dragenter", DRAGOVER:"dragover", DRAGLEAVE:"dragleave", DROP:"drop", TOUCHSTART:"touchstart", TOUCHMOVE:"touchmove", TOUCHEND:"touchend", TOUCHCANCEL:"touchcancel", CONTEXTMENU:"contextmenu", ERROR:"error", HELP:"help", LOAD:"load", LOSECAPTURE:"losecapture", READYSTATECHANGE:"readystatechange", RESIZE:"resize", SCROLL:"scroll", UNLOAD:"unload", HASHCHANGE:"hashchange", PAGEHIDE:"pagehide", PAGESHOW:"pageshow", POPSTATE:"popstate", COPY:"copy", PASTE:"paste", CUT:"cut", 
MESSAGE:"message", CONNECT:"connect"};
goog.reflect = {};
goog.reflect.object = function(a, b) {
  return b
};
goog.reflect.sinkValue = new Function("a", "return a");
goog.events.BrowserEvent = function(a, b) {
  a && this.init(a, b)
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {LEFT:0, MIDDLE:1, RIGHT:2};
goog.events.BrowserEvent.IEButtonMap = [1, 4, 2];
goog.events.BrowserEvent.prototype.target = null;
goog.events.BrowserEvent.prototype.relatedTarget = null;
goog.events.BrowserEvent.prototype.offsetX = 0;
goog.events.BrowserEvent.prototype.offsetY = 0;
goog.events.BrowserEvent.prototype.clientX = 0;
goog.events.BrowserEvent.prototype.clientY = 0;
goog.events.BrowserEvent.prototype.screenX = 0;
goog.events.BrowserEvent.prototype.screenY = 0;
goog.events.BrowserEvent.prototype.button = 0;
goog.events.BrowserEvent.prototype.keyCode = 0;
goog.events.BrowserEvent.prototype.charCode = 0;
goog.events.BrowserEvent.prototype.ctrlKey = !1;
goog.events.BrowserEvent.prototype.altKey = !1;
goog.events.BrowserEvent.prototype.shiftKey = !1;
goog.events.BrowserEvent.prototype.metaKey = !1;
goog.events.BrowserEvent.prototype.platformModifierKey = !1;
goog.events.BrowserEvent.prototype.event_ = null;
goog.events.BrowserEvent.prototype.init = function(a, b) {
  var c = this.type = a.type;
  goog.events.Event.call(this, c);
  this.target = a.target || a.srcElement;
  this.currentTarget = b;
  var d = a.relatedTarget;
  if(d) {
    if(goog.userAgent.GECKO) {
      try {
        goog.reflect.sinkValue(d.nodeName)
      }catch(e) {
        d = null
      }
    }
  }else {
    if(c == goog.events.EventType.MOUSEOVER) {
      d = a.fromElement
    }else {
      if(c == goog.events.EventType.MOUSEOUT) {
        d = a.toElement
      }
    }
  }
  this.relatedTarget = d;
  this.offsetX = void 0 !== a.offsetX ? a.offsetX : a.layerX;
  this.offsetY = void 0 !== a.offsetY ? a.offsetY : a.layerY;
  this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX;
  this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY;
  this.screenX = a.screenX || 0;
  this.screenY = a.screenY || 0;
  this.button = a.button;
  this.keyCode = a.keyCode || 0;
  this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
  this.ctrlKey = a.ctrlKey;
  this.altKey = a.altKey;
  this.shiftKey = a.shiftKey;
  this.metaKey = a.metaKey;
  this.platformModifierKey = goog.userAgent.MAC ? a.metaKey : a.ctrlKey;
  this.state = a.state;
  this.event_ = a;
  delete this.returnValue_;
  delete this.propagationStopped_
};
goog.events.BrowserEvent.prototype.isButton = function(a) {
  return goog.events.BrowserFeature.HAS_W3C_BUTTON ? this.event_.button == a : "click" == this.type ? a == goog.events.BrowserEvent.MouseButton.LEFT : !!(this.event_.button & goog.events.BrowserEvent.IEButtonMap[a])
};
goog.events.BrowserEvent.prototype.isMouseActionButton = function() {
  return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey)
};
goog.events.BrowserEvent.prototype.stopPropagation = function() {
  goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
  this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0
};
goog.events.BrowserEvent.prototype.preventDefault = function() {
  goog.events.BrowserEvent.superClass_.preventDefault.call(this);
  var a = this.event_;
  if(a.preventDefault) {
    a.preventDefault()
  }else {
    if(a.returnValue = !1, goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT) {
      try {
        if(a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) {
          a.keyCode = -1
        }
      }catch(b) {
      }
    }
  }
};
goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
  return this.event_
};
goog.events.BrowserEvent.prototype.disposeInternal = function() {
  goog.events.BrowserEvent.superClass_.disposeInternal.call(this);
  this.relatedTarget = this.currentTarget = this.target = this.event_ = null
};
goog.events.EventWrapper = function() {
};
goog.events.EventWrapper.prototype.listen = function() {
};
goog.events.EventWrapper.prototype.unlisten = function() {
};
goog.events.Listener = function() {
};
goog.events.Listener.counter_ = 0;
goog.events.Listener.prototype.key = 0;
goog.events.Listener.prototype.removed = !1;
goog.events.Listener.prototype.callOnce = !1;
goog.events.Listener.prototype.init = function(a, b, c, d, e, f) {
  if(goog.isFunction(a)) {
    this.isFunctionListener_ = !0
  }else {
    if(a && a.handleEvent && goog.isFunction(a.handleEvent)) {
      this.isFunctionListener_ = !1
    }else {
      throw Error("Invalid listener argument");
    }
  }
  this.listener = a;
  this.proxy = b;
  this.src = c;
  this.type = d;
  this.capture = !!e;
  this.handler = f;
  this.callOnce = !1;
  this.key = ++goog.events.Listener.counter_;
  this.removed = !1
};
goog.events.Listener.prototype.handleEvent = function(a) {
  return this.isFunctionListener_ ? this.listener.call(this.handler || this.src, a) : this.listener.handleEvent.call(this.listener, a)
};
goog.structs = {};
goog.structs.SimplePool = function(a, b) {
  goog.Disposable.call(this);
  this.maxCount_ = b;
  this.freeQueue_ = [];
  this.createInitial_(a)
};
goog.inherits(goog.structs.SimplePool, goog.Disposable);
goog.structs.SimplePool.prototype.createObjectFn_ = null;
goog.structs.SimplePool.prototype.disposeObjectFn_ = null;
goog.structs.SimplePool.prototype.setCreateObjectFn = function(a) {
  this.createObjectFn_ = a
};
goog.structs.SimplePool.prototype.setDisposeObjectFn = function(a) {
  this.disposeObjectFn_ = a
};
goog.structs.SimplePool.prototype.getObject = function() {
  return this.freeQueue_.length ? this.freeQueue_.pop() : this.createObject()
};
goog.structs.SimplePool.prototype.releaseObject = function(a) {
  this.freeQueue_.length < this.maxCount_ ? this.freeQueue_.push(a) : this.disposeObject(a)
};
goog.structs.SimplePool.prototype.createInitial_ = function(a) {
  if(a > this.maxCount_) {
    throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");
  }
  for(var b = 0;b < a;b++) {
    this.freeQueue_.push(this.createObject())
  }
};
goog.structs.SimplePool.prototype.createObject = function() {
  return this.createObjectFn_ ? this.createObjectFn_() : {}
};
goog.structs.SimplePool.prototype.disposeObject = function(a) {
  if(this.disposeObjectFn_) {
    this.disposeObjectFn_(a)
  }else {
    if(goog.isObject(a)) {
      if(goog.isFunction(a.dispose)) {
        a.dispose()
      }else {
        for(var b in a) {
          delete a[b]
        }
      }
    }
  }
};
goog.structs.SimplePool.prototype.disposeInternal = function() {
  goog.structs.SimplePool.superClass_.disposeInternal.call(this);
  for(var a = this.freeQueue_;a.length;) {
    this.disposeObject(a.pop())
  }
  delete this.freeQueue_
};
goog.userAgent.jscript = {};
goog.userAgent.jscript.ASSUME_NO_JSCRIPT = !1;
goog.userAgent.jscript.init_ = function() {
  goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ = "ScriptEngine" in goog.global && "JScript" == goog.global.ScriptEngine();
  goog.userAgent.jscript.DETECTED_VERSION_ = goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ ? goog.global.ScriptEngineMajorVersion() + "." + goog.global.ScriptEngineMinorVersion() + "." + goog.global.ScriptEngineBuildVersion() : "0"
};
goog.userAgent.jscript.ASSUME_NO_JSCRIPT || goog.userAgent.jscript.init_();
goog.userAgent.jscript.HAS_JSCRIPT = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? !1 : goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_;
goog.userAgent.jscript.VERSION = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? "0" : goog.userAgent.jscript.DETECTED_VERSION_;
goog.userAgent.jscript.isVersion = function(a) {
  return 0 <= goog.string.compareVersions(goog.userAgent.jscript.VERSION, a)
};
goog.events.pools = {};
goog.events.ASSUME_GOOD_GC = !1;
(function() {
  function a() {
    return{count_:0, remaining_:0}
  }
  function b() {
    return[]
  }
  function c() {
    var a = function(b) {
      return g.call(a.src, a.key, b)
    };
    return a
  }
  function d() {
    return new goog.events.Listener
  }
  function e() {
    return new goog.events.BrowserEvent
  }
  var f = !goog.events.ASSUME_GOOD_GC && goog.userAgent.jscript.HAS_JSCRIPT && !goog.userAgent.jscript.isVersion("5.7"), g;
  goog.events.pools.setProxyCallbackFunction = function(a) {
    g = a
  };
  if(f) {
    goog.events.pools.getObject = function() {
      return h.getObject()
    };
    goog.events.pools.releaseObject = function(a) {
      h.releaseObject(a)
    };
    goog.events.pools.getArray = function() {
      return i.getObject()
    };
    goog.events.pools.releaseArray = function(a) {
      i.releaseObject(a)
    };
    goog.events.pools.getProxy = function() {
      return j.getObject()
    };
    goog.events.pools.releaseProxy = function() {
      j.releaseObject(c())
    };
    goog.events.pools.getListener = function() {
      return k.getObject()
    };
    goog.events.pools.releaseListener = function(a) {
      k.releaseObject(a)
    };
    goog.events.pools.getEvent = function() {
      return l.getObject()
    };
    goog.events.pools.releaseEvent = function(a) {
      l.releaseObject(a)
    };
    var h = new goog.structs.SimplePool(0, 600);
    h.setCreateObjectFn(a);
    var i = new goog.structs.SimplePool(0, 600);
    i.setCreateObjectFn(b);
    var j = new goog.structs.SimplePool(0, 600);
    j.setCreateObjectFn(c);
    var k = new goog.structs.SimplePool(0, 600);
    k.setCreateObjectFn(d);
    var l = new goog.structs.SimplePool(0, 600);
    l.setCreateObjectFn(e)
  }else {
    goog.events.pools.getObject = a, goog.events.pools.releaseObject = goog.nullFunction, goog.events.pools.getArray = b, goog.events.pools.releaseArray = goog.nullFunction, goog.events.pools.getProxy = c, goog.events.pools.releaseProxy = goog.nullFunction, goog.events.pools.getListener = d, goog.events.pools.releaseListener = goog.nullFunction, goog.events.pools.getEvent = e, goog.events.pools.releaseEvent = goog.nullFunction
  }
})();
goog.events.listeners_ = {};
goog.events.listenerTree_ = {};
goog.events.sources_ = {};
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.keySeparator_ = "_";
goog.events.listen = function(a, b, c, d, e) {
  if(b) {
    if(goog.isArray(b)) {
      for(var f = 0;f < b.length;f++) {
        goog.events.listen(a, b[f], c, d, e)
      }
      return null
    }
    var d = !!d, g = goog.events.listenerTree_;
    b in g || (g[b] = goog.events.pools.getObject());
    g = g[b];
    d in g || (g[d] = goog.events.pools.getObject(), g.count_++);
    var g = g[d], h = goog.getUid(a), i;
    g.remaining_++;
    if(g[h]) {
      i = g[h];
      for(f = 0;f < i.length;f++) {
        if(g = i[f], g.listener == c && g.handler == e) {
          if(g.removed) {
            break
          }
          return i[f].key
        }
      }
    }else {
      i = g[h] = goog.events.pools.getArray(), g.count_++
    }
    f = goog.events.pools.getProxy();
    f.src = a;
    g = goog.events.pools.getListener();
    g.init(c, f, a, b, d, e);
    c = g.key;
    f.key = c;
    i.push(g);
    goog.events.listeners_[c] = g;
    goog.events.sources_[h] || (goog.events.sources_[h] = goog.events.pools.getArray());
    goog.events.sources_[h].push(g);
    a.addEventListener ? (a == goog.global || !a.customEvent_) && a.addEventListener(b, f, d) : a.attachEvent(goog.events.getOnString_(b), f);
    return c
  }
  throw Error("Invalid event type");
};
goog.events.listenOnce = function(a, b, c, d, e) {
  if(goog.isArray(b)) {
    for(var f = 0;f < b.length;f++) {
      goog.events.listenOnce(a, b[f], c, d, e)
    }
    return null
  }
  a = goog.events.listen(a, b, c, d, e);
  goog.events.listeners_[a].callOnce = !0;
  return a
};
goog.events.listenWithWrapper = function(a, b, c, d, e) {
  b.listen(a, c, d, e)
};
goog.events.unlisten = function(a, b, c, d, e) {
  if(goog.isArray(b)) {
    for(var f = 0;f < b.length;f++) {
      goog.events.unlisten(a, b[f], c, d, e)
    }
    return null
  }
  d = !!d;
  a = goog.events.getListeners_(a, b, d);
  if(!a) {
    return!1
  }
  for(f = 0;f < a.length;f++) {
    if(a[f].listener == c && a[f].capture == d && a[f].handler == e) {
      return goog.events.unlistenByKey(a[f].key)
    }
  }
  return!1
};
goog.events.unlistenByKey = function(a) {
  if(!goog.events.listeners_[a]) {
    return!1
  }
  var b = goog.events.listeners_[a];
  if(b.removed) {
    return!1
  }
  var c = b.src, d = b.type, e = b.proxy, f = b.capture;
  c.removeEventListener ? (c == goog.global || !c.customEvent_) && c.removeEventListener(d, e, f) : c.detachEvent && c.detachEvent(goog.events.getOnString_(d), e);
  c = goog.getUid(c);
  e = goog.events.listenerTree_[d][f][c];
  if(goog.events.sources_[c]) {
    var g = goog.events.sources_[c];
    goog.array.remove(g, b);
    0 == g.length && delete goog.events.sources_[c]
  }
  b.removed = !0;
  e.needsCleanup_ = !0;
  goog.events.cleanUp_(d, f, c, e);
  delete goog.events.listeners_[a];
  return!0
};
goog.events.unlistenWithWrapper = function(a, b, c, d, e) {
  b.unlisten(a, c, d, e)
};
goog.events.cleanUp_ = function(a, b, c, d) {
  if(!d.locked_ && d.needsCleanup_) {
    for(var e = 0, f = 0;e < d.length;e++) {
      if(d[e].removed) {
        var g = d[e].proxy;
        g.src = null;
        goog.events.pools.releaseProxy(g);
        goog.events.pools.releaseListener(d[e])
      }else {
        e != f && (d[f] = d[e]), f++
      }
    }
    d.length = f;
    d.needsCleanup_ = !1;
    0 == f && (goog.events.pools.releaseArray(d), delete goog.events.listenerTree_[a][b][c], goog.events.listenerTree_[a][b].count_--, 0 == goog.events.listenerTree_[a][b].count_ && (goog.events.pools.releaseObject(goog.events.listenerTree_[a][b]), delete goog.events.listenerTree_[a][b], goog.events.listenerTree_[a].count_--), 0 == goog.events.listenerTree_[a].count_ && (goog.events.pools.releaseObject(goog.events.listenerTree_[a]), delete goog.events.listenerTree_[a]))
  }
};
goog.events.removeAll = function(a, b, c) {
  var d = 0, e = null == b, f = null == c, c = !!c;
  if(null == a) {
    goog.object.forEach(goog.events.sources_, function(a) {
      for(var g = a.length - 1;0 <= g;g--) {
        var h = a[g];
        if((e || b == h.type) && (f || c == h.capture)) {
          goog.events.unlistenByKey(h.key), d++
        }
      }
    })
  }else {
    if(a = goog.getUid(a), goog.events.sources_[a]) {
      for(var a = goog.events.sources_[a], g = a.length - 1;0 <= g;g--) {
        var h = a[g];
        if((e || b == h.type) && (f || c == h.capture)) {
          goog.events.unlistenByKey(h.key), d++
        }
      }
    }
  }
  return d
};
goog.events.getListeners = function(a, b, c) {
  return goog.events.getListeners_(a, b, c) || []
};
goog.events.getListeners_ = function(a, b, c) {
  var d = goog.events.listenerTree_;
  return b in d && (d = d[b], c in d && (d = d[c], a = goog.getUid(a), d[a])) ? d[a] : null
};
goog.events.getListener = function(a, b, c, d, e) {
  d = !!d;
  if(a = goog.events.getListeners_(a, b, d)) {
    for(b = 0;b < a.length;b++) {
      if(a[b].listener == c && a[b].capture == d && a[b].handler == e) {
        return a[b]
      }
    }
  }
  return null
};
goog.events.hasListener = function(a, b, c) {
  var a = goog.getUid(a), d = goog.events.sources_[a];
  if(d) {
    var e = goog.isDef(b), f = goog.isDef(c);
    return e && f ? (d = goog.events.listenerTree_[b], !!d && !!d[c] && a in d[c]) : !e && !f ? !0 : goog.array.some(d, function(a) {
      return e && a.type == b || f && a.capture == c
    })
  }
  return!1
};
goog.events.expose = function(a) {
  var b = [], c;
  for(c in a) {
    a[c] && a[c].id ? b.push(c + " = " + a[c] + " (" + a[c].id + ")") : b.push(c + " = " + a[c])
  }
  return b.join("\n")
};
goog.events.getOnString_ = function(a) {
  return a in goog.events.onStringMap_ ? goog.events.onStringMap_[a] : goog.events.onStringMap_[a] = goog.events.onString_ + a
};
goog.events.fireListeners = function(a, b, c, d) {
  var e = goog.events.listenerTree_;
  return b in e && (e = e[b], c in e) ? goog.events.fireListeners_(e[c], a, b, c, d) : !0
};
goog.events.fireListeners_ = function(a, b, c, d, e) {
  var f = 1, b = goog.getUid(b);
  if(a[b]) {
    a.remaining_--;
    a = a[b];
    a.locked_ ? a.locked_++ : a.locked_ = 1;
    try {
      for(var g = a.length, h = 0;h < g;h++) {
        var i = a[h];
        i && !i.removed && (f &= !1 !== goog.events.fireListener(i, e))
      }
    }finally {
      a.locked_--, goog.events.cleanUp_(c, d, b, a)
    }
  }
  return Boolean(f)
};
goog.events.fireListener = function(a, b) {
  var c = a.handleEvent(b);
  a.callOnce && goog.events.unlistenByKey(a.key);
  return c
};
goog.events.getTotalListenerCount = function() {
  return goog.object.getCount(goog.events.listeners_)
};
goog.events.dispatchEvent = function(a, b) {
  var c = b.type || b, d = goog.events.listenerTree_;
  if(!(c in d)) {
    return!0
  }
  if(goog.isString(b)) {
    b = new goog.events.Event(b, a)
  }else {
    if(b instanceof goog.events.Event) {
      b.target = b.target || a
    }else {
      var e = b, b = new goog.events.Event(c, a);
      goog.object.extend(b, e)
    }
  }
  var e = 1, f, d = d[c], c = !0 in d, g;
  if(c) {
    f = [];
    for(g = a;g;g = g.getParentEventTarget()) {
      f.push(g)
    }
    g = d[!0];
    g.remaining_ = g.count_;
    for(var h = f.length - 1;!b.propagationStopped_ && 0 <= h && g.remaining_;h--) {
      b.currentTarget = f[h], e &= goog.events.fireListeners_(g, f[h], b.type, !0, b) && !1 != b.returnValue_
    }
  }
  if(!1 in d) {
    if(g = d[!1], g.remaining_ = g.count_, c) {
      for(h = 0;!b.propagationStopped_ && h < f.length && g.remaining_;h++) {
        b.currentTarget = f[h], e &= goog.events.fireListeners_(g, f[h], b.type, !1, b) && !1 != b.returnValue_
      }
    }else {
      for(d = a;!b.propagationStopped_ && d && g.remaining_;d = d.getParentEventTarget()) {
        b.currentTarget = d, e &= goog.events.fireListeners_(g, d, b.type, !1, b) && !1 != b.returnValue_
      }
    }
  }
  return Boolean(e)
};
goog.events.protectBrowserEventEntryPoint = function(a) {
  goog.events.handleBrowserEvent_ = a.protectEntryPoint(goog.events.handleBrowserEvent_);
  goog.events.pools.setProxyCallbackFunction(goog.events.handleBrowserEvent_)
};
goog.events.handleBrowserEvent_ = function(a, b) {
  if(!goog.events.listeners_[a]) {
    return!0
  }
  var c = goog.events.listeners_[a], d = c.type, e = goog.events.listenerTree_;
  if(!(d in e)) {
    return!0
  }
  var e = e[d], f, g;
  if(goog.events.synthesizeEventPropagation_()) {
    f = b || goog.getObjectByName("window.event");
    var h = !0 in e, i = !1 in e;
    if(h) {
      if(goog.events.isMarkedIeEvent_(f)) {
        return!0
      }
      goog.events.markIeEvent_(f)
    }
    var j = goog.events.pools.getEvent();
    j.init(f, this);
    f = !0;
    try {
      if(h) {
        for(var k = goog.events.pools.getArray(), l = j.currentTarget;l;l = l.parentNode) {
          k.push(l)
        }
        g = e[!0];
        g.remaining_ = g.count_;
        for(var m = k.length - 1;!j.propagationStopped_ && 0 <= m && g.remaining_;m--) {
          j.currentTarget = k[m], f &= goog.events.fireListeners_(g, k[m], d, !0, j)
        }
        if(i) {
          g = e[!1];
          g.remaining_ = g.count_;
          for(m = 0;!j.propagationStopped_ && m < k.length && g.remaining_;m++) {
            j.currentTarget = k[m], f &= goog.events.fireListeners_(g, k[m], d, !1, j)
          }
        }
      }else {
        f = goog.events.fireListener(c, j)
      }
    }finally {
      if(k) {
        k.length = 0, goog.events.pools.releaseArray(k)
      }
      j.dispose();
      goog.events.pools.releaseEvent(j)
    }
    return f
  }
  d = new goog.events.BrowserEvent(b, this);
  try {
    f = goog.events.fireListener(c, d)
  }finally {
    d.dispose()
  }
  return f
};
goog.events.pools.setProxyCallbackFunction(goog.events.handleBrowserEvent_);
goog.events.markIeEvent_ = function(a) {
  var b = !1;
  if(0 == a.keyCode) {
    try {
      a.keyCode = -1;
      return
    }catch(c) {
      b = !0
    }
  }
  if(b || void 0 == a.returnValue) {
    a.returnValue = !0
  }
};
goog.events.isMarkedIeEvent_ = function(a) {
  return 0 > a.keyCode || void 0 != a.returnValue
};
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function(a) {
  return a + "_" + goog.events.uniqueIdCounter_++
};
goog.events.synthesizeEventPropagation_ = function() {
  if(void 0 === goog.events.requiresSyntheticEventPropagation_) {
    goog.events.requiresSyntheticEventPropagation_ = goog.userAgent.IE && !goog.global.addEventListener
  }
  return goog.events.requiresSyntheticEventPropagation_
};
goog.debug.entryPointRegistry.register(function(a) {
  goog.events.handleBrowserEvent_ = a(goog.events.handleBrowserEvent_);
  goog.events.pools.setProxyCallbackFunction(goog.events.handleBrowserEvent_)
});
goog.events.EventTarget = function() {
  goog.Disposable.call(this)
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
goog.events.EventTarget.prototype.customEvent_ = !0;
goog.events.EventTarget.prototype.parentEventTarget_ = null;
goog.events.EventTarget.prototype.getParentEventTarget = function() {
  return this.parentEventTarget_
};
goog.events.EventTarget.prototype.setParentEventTarget = function(a) {
  this.parentEventTarget_ = a
};
goog.events.EventTarget.prototype.addEventListener = function(a, b, c, d) {
  goog.events.listen(this, a, b, c, d)
};
goog.events.EventTarget.prototype.removeEventListener = function(a, b, c, d) {
  goog.events.unlisten(this, a, b, c, d)
};
goog.events.EventTarget.prototype.dispatchEvent = function(a) {
  return goog.events.dispatchEvent(this, a)
};
goog.events.EventTarget.prototype.disposeInternal = function() {
  goog.events.EventTarget.superClass_.disposeInternal.call(this);
  goog.events.removeAll(this);
  this.parentEventTarget_ = null
};
goog.Timer = function(a, b) {
  goog.events.EventTarget.call(this);
  this.interval_ = a || 1;
  this.timerObject_ = b || goog.Timer.defaultTimerObject;
  this.boundTick_ = goog.bind(this.tick_, this);
  this.last_ = goog.now()
};
goog.inherits(goog.Timer, goog.events.EventTarget);
goog.Timer.MAX_TIMEOUT_ = 2147483647;
goog.Timer.prototype.enabled = !1;
goog.Timer.defaultTimerObject = goog.global.window;
goog.Timer.intervalScale = 0.8;
goog.Timer.prototype.timer_ = null;
goog.Timer.prototype.getInterval = function() {
  return this.interval_
};
goog.Timer.prototype.setInterval = function(a) {
  this.interval_ = a;
  this.timer_ && this.enabled ? (this.stop(), this.start()) : this.timer_ && this.stop()
};
goog.Timer.prototype.tick_ = function() {
  if(this.enabled) {
    var a = goog.now() - this.last_;
    if(0 < a && a < this.interval_ * goog.Timer.intervalScale) {
      this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_ - a)
    }else {
      if(this.dispatchTick(), this.enabled) {
        this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now()
      }
    }
  }
};
goog.Timer.prototype.dispatchTick = function() {
  this.dispatchEvent(goog.Timer.TICK)
};
goog.Timer.prototype.start = function() {
  this.enabled = !0;
  if(!this.timer_) {
    this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now()
  }
};
goog.Timer.prototype.stop = function() {
  this.enabled = !1;
  if(this.timer_) {
    this.timerObject_.clearTimeout(this.timer_), this.timer_ = null
  }
};
goog.Timer.prototype.disposeInternal = function() {
  goog.Timer.superClass_.disposeInternal.call(this);
  this.stop();
  delete this.timerObject_
};
goog.Timer.TICK = "tick";
goog.Timer.callOnce = function(a, b, c) {
  if(goog.isFunction(a)) {
    c && (a = goog.bind(a, c))
  }else {
    if(a && "function" == typeof a.handleEvent) {
      a = goog.bind(a.handleEvent, a)
    }else {
      throw Error("Invalid listener argument");
    }
  }
  return b > goog.Timer.MAX_TIMEOUT_ ? -1 : goog.Timer.defaultTimerObject.setTimeout(a, b || 0)
};
goog.Timer.clear = function(a) {
  goog.Timer.defaultTimerObject.clearTimeout(a)
};
goog.structs.getCount = function(a) {
  return"function" == typeof a.getCount ? a.getCount() : goog.isArrayLike(a) || goog.isString(a) ? a.length : goog.object.getCount(a)
};
goog.structs.getValues = function(a) {
  if("function" == typeof a.getValues) {
    return a.getValues()
  }
  if(goog.isString(a)) {
    return a.split("")
  }
  if(goog.isArrayLike(a)) {
    for(var b = [], c = a.length, d = 0;d < c;d++) {
      b.push(a[d])
    }
    return b
  }
  return goog.object.getValues(a)
};
goog.structs.getKeys = function(a) {
  if("function" == typeof a.getKeys) {
    return a.getKeys()
  }
  if("function" != typeof a.getValues) {
    if(goog.isArrayLike(a) || goog.isString(a)) {
      for(var b = [], a = a.length, c = 0;c < a;c++) {
        b.push(c)
      }
      return b
    }
    return goog.object.getKeys(a)
  }
};
goog.structs.contains = function(a, b) {
  return"function" == typeof a.contains ? a.contains(b) : "function" == typeof a.containsValue ? a.containsValue(b) : goog.isArrayLike(a) || goog.isString(a) ? goog.array.contains(a, b) : goog.object.containsValue(a, b)
};
goog.structs.isEmpty = function(a) {
  return"function" == typeof a.isEmpty ? a.isEmpty() : goog.isArrayLike(a) || goog.isString(a) ? goog.array.isEmpty(a) : goog.object.isEmpty(a)
};
goog.structs.clear = function(a) {
  "function" == typeof a.clear ? a.clear() : goog.isArrayLike(a) ? goog.array.clear(a) : goog.object.clear(a)
};
goog.structs.forEach = function(a, b, c) {
  if("function" == typeof a.forEach) {
    a.forEach(b, c)
  }else {
    if(goog.isArrayLike(a) || goog.isString(a)) {
      goog.array.forEach(a, b, c)
    }else {
      for(var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0;g < f;g++) {
        b.call(c, e[g], d && d[g], a)
      }
    }
  }
};
goog.structs.filter = function(a, b, c) {
  if("function" == typeof a.filter) {
    return a.filter(b, c)
  }
  if(goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.filter(a, b, c)
  }
  var d, e = goog.structs.getKeys(a), f = goog.structs.getValues(a), g = f.length;
  if(e) {
    d = {};
    for(var h = 0;h < g;h++) {
      b.call(c, f[h], e[h], a) && (d[e[h]] = f[h])
    }
  }else {
    d = [];
    for(h = 0;h < g;h++) {
      b.call(c, f[h], void 0, a) && d.push(f[h])
    }
  }
  return d
};
goog.structs.map = function(a, b, c) {
  if("function" == typeof a.map) {
    return a.map(b, c)
  }
  if(goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.map(a, b, c)
  }
  var d, e = goog.structs.getKeys(a), f = goog.structs.getValues(a), g = f.length;
  if(e) {
    d = {};
    for(var h = 0;h < g;h++) {
      d[e[h]] = b.call(c, f[h], e[h], a)
    }
  }else {
    d = [];
    for(h = 0;h < g;h++) {
      d[h] = b.call(c, f[h], void 0, a)
    }
  }
  return d
};
goog.structs.some = function(a, b, c) {
  if("function" == typeof a.some) {
    return a.some(b, c)
  }
  if(goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.some(a, b, c)
  }
  for(var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0;g < f;g++) {
    if(b.call(c, e[g], d && d[g], a)) {
      return!0
    }
  }
  return!1
};
goog.structs.every = function(a, b, c) {
  if("function" == typeof a.every) {
    return a.every(b, c)
  }
  if(goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.every(a, b, c)
  }
  for(var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0;g < f;g++) {
    if(!b.call(c, e[g], d && d[g], a)) {
      return!1
    }
  }
  return!0
};
goog.iter = {};
goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : Error("StopIteration");
goog.iter.Iterator = function() {
};
goog.iter.Iterator.prototype.next = function() {
  throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function() {
  return this
};
goog.iter.toIterator = function(a) {
  if(a instanceof goog.iter.Iterator) {
    return a
  }
  if("function" == typeof a.__iterator__) {
    return a.__iterator__(!1)
  }
  if(goog.isArrayLike(a)) {
    var b = 0, c = new goog.iter.Iterator;
    c.next = function() {
      for(;;) {
        if(b >= a.length) {
          throw goog.iter.StopIteration;
        }
        if(b in a) {
          return a[b++]
        }
        b++
      }
    };
    return c
  }
  throw Error("Not implemented");
};
goog.iter.forEach = function(a, b, c) {
  if(goog.isArrayLike(a)) {
    try {
      goog.array.forEach(a, b, c)
    }catch(d) {
      if(d !== goog.iter.StopIteration) {
        throw d;
      }
    }
  }else {
    a = goog.iter.toIterator(a);
    try {
      for(;;) {
        b.call(c, a.next(), void 0, a)
      }
    }catch(e) {
      if(e !== goog.iter.StopIteration) {
        throw e;
      }
    }
  }
};
goog.iter.filter = function(a, b, c) {
  var a = goog.iter.toIterator(a), d = new goog.iter.Iterator;
  d.next = function() {
    for(;;) {
      var d = a.next();
      if(b.call(c, d, void 0, a)) {
        return d
      }
    }
  };
  return d
};
goog.iter.range = function(a, b, c) {
  var d = 0, e = a, f = c || 1;
  1 < arguments.length && (d = a, e = b);
  if(0 == f) {
    throw Error("Range step argument must not be zero");
  }
  var g = new goog.iter.Iterator;
  g.next = function() {
    if(0 < f && d >= e || 0 > f && d <= e) {
      throw goog.iter.StopIteration;
    }
    var a = d;
    d += f;
    return a
  };
  return g
};
goog.iter.join = function(a, b) {
  return goog.iter.toArray(a).join(b)
};
goog.iter.map = function(a, b, c) {
  var a = goog.iter.toIterator(a), d = new goog.iter.Iterator;
  d.next = function() {
    for(;;) {
      var d = a.next();
      return b.call(c, d, void 0, a)
    }
  };
  return d
};
goog.iter.reduce = function(a, b, c, d) {
  var e = c;
  goog.iter.forEach(a, function(a) {
    e = b.call(d, e, a)
  });
  return e
};
goog.iter.some = function(a, b, c) {
  a = goog.iter.toIterator(a);
  try {
    for(;;) {
      if(b.call(c, a.next(), void 0, a)) {
        return!0
      }
    }
  }catch(d) {
    if(d !== goog.iter.StopIteration) {
      throw d;
    }
  }
  return!1
};
goog.iter.every = function(a, b, c) {
  a = goog.iter.toIterator(a);
  try {
    for(;;) {
      if(!b.call(c, a.next(), void 0, a)) {
        return!1
      }
    }
  }catch(d) {
    if(d !== goog.iter.StopIteration) {
      throw d;
    }
  }
  return!0
};
goog.iter.chain = function(a) {
  var b = arguments, c = b.length, d = 0, e = new goog.iter.Iterator;
  e.next = function() {
    try {
      if(d >= c) {
        throw goog.iter.StopIteration;
      }
      return goog.iter.toIterator(b[d]).next()
    }catch(a) {
      if(a !== goog.iter.StopIteration || d >= c) {
        throw a;
      }
      d++;
      return this.next()
    }
  };
  return e
};
goog.iter.dropWhile = function(a, b, c) {
  var a = goog.iter.toIterator(a), d = new goog.iter.Iterator, e = !0;
  d.next = function() {
    for(;;) {
      var d = a.next();
      if(!e || !b.call(c, d, void 0, a)) {
        return e = !1, d
      }
    }
  };
  return d
};
goog.iter.takeWhile = function(a, b, c) {
  var a = goog.iter.toIterator(a), d = new goog.iter.Iterator, e = !0;
  d.next = function() {
    for(;;) {
      if(e) {
        var d = a.next();
        if(b.call(c, d, void 0, a)) {
          return d
        }
        e = !1
      }else {
        throw goog.iter.StopIteration;
      }
    }
  };
  return d
};
goog.iter.toArray = function(a) {
  if(goog.isArrayLike(a)) {
    return goog.array.toArray(a)
  }
  var a = goog.iter.toIterator(a), b = [];
  goog.iter.forEach(a, function(a) {
    b.push(a)
  });
  return b
};
goog.iter.equals = function(a, b) {
  var a = goog.iter.toIterator(a), b = goog.iter.toIterator(b), c, d;
  try {
    for(;;) {
      c = d = !1;
      var e = a.next();
      c = !0;
      var f = b.next();
      d = !0;
      if(e != f) {
        break
      }
    }
  }catch(g) {
    if(g !== goog.iter.StopIteration) {
      throw g;
    }
    if(c && !d) {
      return!1
    }
    if(!d) {
      try {
        b.next()
      }catch(h) {
        if(h !== goog.iter.StopIteration) {
          throw h;
        }
        return!0
      }
    }
  }
  return!1
};
goog.iter.nextOrValue = function(a, b) {
  try {
    return goog.iter.toIterator(a).next()
  }catch(c) {
    if(c != goog.iter.StopIteration) {
      throw c;
    }
    return b
  }
};
goog.iter.product = function(a) {
  if(goog.array.some(arguments, function(a) {
    return!a.length
  }) || !arguments.length) {
    return new goog.iter.Iterator
  }
  var b = new goog.iter.Iterator, c = arguments, d = goog.array.repeat(0, c.length);
  b.next = function() {
    if(d) {
      for(var a = goog.array.map(d, function(a, b) {
        return c[b][a]
      }), b = d.length - 1;0 <= b;b--) {
        goog.asserts.assert(d);
        if(d[b] < c[b].length - 1) {
          d[b]++;
          break
        }
        if(0 == b) {
          d = null;
          break
        }
        d[b] = 0
      }
      return a
    }
    throw goog.iter.StopIteration;
  };
  return b
};
goog.structs.Map = function(a, b) {
  this.map_ = {};
  this.keys_ = [];
  var c = arguments.length;
  if(1 < c) {
    if(c % 2) {
      throw Error("Uneven number of arguments");
    }
    for(var d = 0;d < c;d += 2) {
      this.set(arguments[d], arguments[d + 1])
    }
  }else {
    a && this.addAll(a)
  }
};
goog.structs.Map.prototype.count_ = 0;
goog.structs.Map.prototype.version_ = 0;
goog.structs.Map.prototype.getCount = function() {
  return this.count_
};
goog.structs.Map.prototype.getValues = function() {
  this.cleanupKeysArray_();
  for(var a = [], b = 0;b < this.keys_.length;b++) {
    a.push(this.map_[this.keys_[b]])
  }
  return a
};
goog.structs.Map.prototype.getKeys = function() {
  this.cleanupKeysArray_();
  return this.keys_.concat()
};
goog.structs.Map.prototype.containsKey = function(a) {
  return goog.structs.Map.hasKey_(this.map_, a)
};
goog.structs.Map.prototype.containsValue = function(a) {
  for(var b = 0;b < this.keys_.length;b++) {
    var c = this.keys_[b];
    if(goog.structs.Map.hasKey_(this.map_, c) && this.map_[c] == a) {
      return!0
    }
  }
  return!1
};
goog.structs.Map.prototype.equals = function(a, b) {
  if(this === a) {
    return!0
  }
  if(this.count_ != a.getCount()) {
    return!1
  }
  var c = b || goog.structs.Map.defaultEquals;
  this.cleanupKeysArray_();
  for(var d, e = 0;d = this.keys_[e];e++) {
    if(!c(this.get(d), a.get(d))) {
      return!1
    }
  }
  return!0
};
goog.structs.Map.defaultEquals = function(a, b) {
  return a === b
};
goog.structs.Map.prototype.isEmpty = function() {
  return 0 == this.count_
};
goog.structs.Map.prototype.clear = function() {
  this.map_ = {};
  this.version_ = this.count_ = this.keys_.length = 0
};
goog.structs.Map.prototype.remove = function(a) {
  return goog.structs.Map.hasKey_(this.map_, a) ? (delete this.map_[a], this.count_--, this.version_++, this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(), !0) : !1
};
goog.structs.Map.prototype.cleanupKeysArray_ = function() {
  if(this.count_ != this.keys_.length) {
    for(var a = 0, b = 0;a < this.keys_.length;) {
      var c = this.keys_[a];
      goog.structs.Map.hasKey_(this.map_, c) && (this.keys_[b++] = c);
      a++
    }
    this.keys_.length = b
  }
  if(this.count_ != this.keys_.length) {
    for(var d = {}, b = a = 0;a < this.keys_.length;) {
      c = this.keys_[a], goog.structs.Map.hasKey_(d, c) || (this.keys_[b++] = c, d[c] = 1), a++
    }
    this.keys_.length = b
  }
};
goog.structs.Map.prototype.get = function(a, b) {
  return goog.structs.Map.hasKey_(this.map_, a) ? this.map_[a] : b
};
goog.structs.Map.prototype.set = function(a, b) {
  goog.structs.Map.hasKey_(this.map_, a) || (this.count_++, this.keys_.push(a), this.version_++);
  this.map_[a] = b
};
goog.structs.Map.prototype.addAll = function(a) {
  var b;
  a instanceof goog.structs.Map ? (b = a.getKeys(), a = a.getValues()) : (b = goog.object.getKeys(a), a = goog.object.getValues(a));
  for(var c = 0;c < b.length;c++) {
    this.set(b[c], a[c])
  }
};
goog.structs.Map.prototype.clone = function() {
  return new goog.structs.Map(this)
};
goog.structs.Map.prototype.transpose = function() {
  for(var a = new goog.structs.Map, b = 0;b < this.keys_.length;b++) {
    var c = this.keys_[b];
    a.set(this.map_[c], c)
  }
  return a
};
goog.structs.Map.prototype.toObject = function() {
  this.cleanupKeysArray_();
  for(var a = {}, b = 0;b < this.keys_.length;b++) {
    var c = this.keys_[b];
    a[c] = this.map_[c]
  }
  return a
};
goog.structs.Map.prototype.getKeyIterator = function() {
  return this.__iterator__(!0)
};
goog.structs.Map.prototype.getValueIterator = function() {
  return this.__iterator__(!1)
};
goog.structs.Map.prototype.__iterator__ = function(a) {
  this.cleanupKeysArray_();
  var b = 0, c = this.keys_, d = this.map_, e = this.version_, f = this, g = new goog.iter.Iterator;
  g.next = function() {
    for(;;) {
      if(e != f.version_) {
        throw Error("The map has changed since the iterator was created");
      }
      if(b >= c.length) {
        throw goog.iter.StopIteration;
      }
      var g = c[b++];
      return a ? g : d[g]
    }
  };
  return g
};
goog.structs.Map.hasKey_ = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b)
};
goog.structs.Set = function(a) {
  this.map_ = new goog.structs.Map;
  a && this.addAll(a)
};
goog.structs.Set.getKey_ = function(a) {
  var b = typeof a;
  return"object" == b && a || "function" == b ? "o" + goog.getUid(a) : b.substr(0, 1) + a
};
goog.structs.Set.prototype.getCount = function() {
  return this.map_.getCount()
};
goog.structs.Set.prototype.add = function(a) {
  this.map_.set(goog.structs.Set.getKey_(a), a)
};
goog.structs.Set.prototype.addAll = function(a) {
  for(var a = goog.structs.getValues(a), b = a.length, c = 0;c < b;c++) {
    this.add(a[c])
  }
};
goog.structs.Set.prototype.removeAll = function(a) {
  for(var a = goog.structs.getValues(a), b = a.length, c = 0;c < b;c++) {
    this.remove(a[c])
  }
};
goog.structs.Set.prototype.remove = function(a) {
  return this.map_.remove(goog.structs.Set.getKey_(a))
};
goog.structs.Set.prototype.clear = function() {
  this.map_.clear()
};
goog.structs.Set.prototype.isEmpty = function() {
  return this.map_.isEmpty()
};
goog.structs.Set.prototype.contains = function(a) {
  return this.map_.containsKey(goog.structs.Set.getKey_(a))
};
goog.structs.Set.prototype.containsAll = function(a) {
  return goog.structs.every(a, this.contains, this)
};
goog.structs.Set.prototype.intersection = function(a) {
  for(var b = new goog.structs.Set, a = goog.structs.getValues(a), c = 0;c < a.length;c++) {
    var d = a[c];
    this.contains(d) && b.add(d)
  }
  return b
};
goog.structs.Set.prototype.getValues = function() {
  return this.map_.getValues()
};
goog.structs.Set.prototype.clone = function() {
  return new goog.structs.Set(this)
};
goog.structs.Set.prototype.equals = function(a) {
  return this.getCount() == goog.structs.getCount(a) && this.isSubsetOf(a)
};
goog.structs.Set.prototype.isSubsetOf = function(a) {
  var b = goog.structs.getCount(a);
  if(this.getCount() > b) {
    return!1
  }
  !(a instanceof goog.structs.Set) && 5 < b && (a = new goog.structs.Set(a));
  return goog.structs.every(this, function(b) {
    return goog.structs.contains(a, b)
  })
};
goog.structs.Set.prototype.__iterator__ = function() {
  return this.map_.__iterator__(!1)
};
goog.debug.catchErrors = function(a, b, c) {
  var c = c || goog.global, d = c.onerror;
  c.onerror = function(c, f, g) {
    d && d(c, f, g);
    a({message:c, fileName:f, line:g});
    return Boolean(b)
  }
};
goog.debug.expose = function(a, b) {
  if("undefined" == typeof a) {
    return"undefined"
  }
  if(null == a) {
    return"NULL"
  }
  var c = [], d;
  for(d in a) {
    if(b || !goog.isFunction(a[d])) {
      var e = d + " = ";
      try {
        e += a[d]
      }catch(f) {
        e += "*** " + f + " ***"
      }
      c.push(e)
    }
  }
  return c.join("\n")
};
goog.debug.deepExpose = function(a, b) {
  var c = new goog.structs.Set, d = [], e = function(a, g) {
    var h = g + "  ";
    try {
      if(goog.isDef(a)) {
        if(goog.isNull(a)) {
          d.push("NULL")
        }else {
          if(goog.isString(a)) {
            d.push('"' + a.replace(/\n/g, "\n" + g) + '"')
          }else {
            if(goog.isFunction(a)) {
              d.push(("" + a).replace(/\n/g, "\n" + g))
            }else {
              if(goog.isObject(a)) {
                if(c.contains(a)) {
                  d.push("*** reference loop detected ***")
                }else {
                  c.add(a);
                  d.push("{");
                  for(var i in a) {
                    if(b || !goog.isFunction(a[i])) {
                      d.push("\n"), d.push(h), d.push(i + " = "), e(a[i], h)
                    }
                  }
                  d.push("\n" + g + "}")
                }
              }else {
                d.push(a)
              }
            }
          }
        }
      }else {
        d.push("undefined")
      }
    }catch(j) {
      d.push("*** " + j + " ***")
    }
  };
  e(a, "");
  return d.join("")
};
goog.debug.exposeArray = function(a) {
  for(var b = [], c = 0;c < a.length;c++) {
    goog.isArray(a[c]) ? b.push(goog.debug.exposeArray(a[c])) : b.push(a[c])
  }
  return"[ " + b.join(", ") + " ]"
};
goog.debug.exposeException = function(a, b) {
  try {
    var c = goog.debug.normalizeErrorObject(a);
    return"Message: " + goog.string.htmlEscape(c.message) + '\nUrl: <a href="view-source:' + c.fileName + '" target="_new">' + c.fileName + "</a>\nLine: " + c.lineNumber + "\n\nBrowser stack:\n" + goog.string.htmlEscape(c.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + goog.string.htmlEscape(goog.debug.getStacktrace(b) + "-> ")
  }catch(d) {
    return"Exception trying to expose exception! You win, we lose. " + d
  }
};
goog.debug.normalizeErrorObject = function(a) {
  var b = goog.getObjectByName("window.location.href");
  if(goog.isString(a)) {
    return{message:a, name:"Unknown error", lineNumber:"Not available", fileName:b, stack:"Not available"}
  }
  var c, d, e = !1;
  try {
    c = a.lineNumber || a.line || "Not available"
  }catch(f) {
    c = "Not available", e = !0
  }
  try {
    d = a.fileName || a.filename || a.sourceURL || b
  }catch(g) {
    d = "Not available", e = !0
  }
  return e || !a.lineNumber || !a.fileName || !a.stack ? {message:a.message, name:a.name, lineNumber:c, fileName:d, stack:a.stack || "Not available"} : a
};
goog.debug.enhanceError = function(a, b) {
  var c = "string" == typeof a ? Error(a) : a;
  if(!c.stack) {
    c.stack = goog.debug.getStacktrace(arguments.callee.caller)
  }
  if(b) {
    for(var d = 0;c["message" + d];) {
      ++d
    }
    c["message" + d] = "" + b
  }
  return c
};
goog.debug.getStacktraceSimple = function(a) {
  for(var b = [], c = arguments.callee.caller, d = 0;c && (!a || d < a);) {
    b.push(goog.debug.getFunctionName(c));
    b.push("()\n");
    try {
      c = c.caller
    }catch(e) {
      b.push("[exception trying to get caller]\n");
      break
    }
    d++;
    if(d >= goog.debug.MAX_STACK_DEPTH) {
      b.push("[...long stack...]");
      break
    }
  }
  a && d >= a ? b.push("[...reached max depth limit...]") : b.push("[end]");
  return b.join("")
};
goog.debug.MAX_STACK_DEPTH = 50;
goog.debug.getStacktrace = function(a) {
  return goog.debug.getStacktraceHelper_(a || arguments.callee.caller, [])
};
goog.debug.getStacktraceHelper_ = function(a, b) {
  var c = [];
  if(goog.array.contains(b, a)) {
    c.push("[...circular reference...]")
  }else {
    if(a && b.length < goog.debug.MAX_STACK_DEPTH) {
      c.push(goog.debug.getFunctionName(a) + "(");
      for(var d = a.arguments, e = 0;e < d.length;e++) {
        0 < e && c.push(", ");
        var f;
        f = d[e];
        switch(typeof f) {
          case "object":
            f = f ? "object" : "null";
            break;
          case "string":
            break;
          case "number":
            f = "" + f;
            break;
          case "boolean":
            f = f ? "true" : "false";
            break;
          case "function":
            f = (f = goog.debug.getFunctionName(f)) ? f : "[fn]";
            break;
          default:
            f = typeof f
        }
        40 < f.length && (f = f.substr(0, 40) + "...");
        c.push(f)
      }
      b.push(a);
      c.push(")\n");
      try {
        c.push(goog.debug.getStacktraceHelper_(a.caller, b))
      }catch(g) {
        c.push("[exception trying to get caller]\n")
      }
    }else {
      a ? c.push("[...long stack...]") : c.push("[end]")
    }
  }
  return c.join("")
};
goog.debug.getFunctionName = function(a) {
  a = "" + a;
  if(!goog.debug.fnNameCache_[a]) {
    var b = /function ([^\(]+)/.exec(a);
    goog.debug.fnNameCache_[a] = b ? b[1] : "[Anonymous]"
  }
  return goog.debug.fnNameCache_[a]
};
goog.debug.makeWhitespaceVisible = function(a) {
  return a.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]")
};
goog.debug.fnNameCache_ = {};
goog.debug.LogRecord = function(a, b, c, d, e) {
  this.reset(a, b, c, d, e)
};
goog.debug.LogRecord.prototype.sequenceNumber_ = 0;
goog.debug.LogRecord.prototype.exception_ = null;
goog.debug.LogRecord.prototype.exceptionText_ = null;
goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS = !0;
goog.debug.LogRecord.nextSequenceNumber_ = 0;
goog.debug.LogRecord.prototype.reset = function(a, b, c, d, e) {
  if(goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS) {
    this.sequenceNumber_ = "number" == typeof e ? e : goog.debug.LogRecord.nextSequenceNumber_++
  }
  this.time_ = d || goog.now();
  this.level_ = a;
  this.msg_ = b;
  this.loggerName_ = c;
  delete this.exception_;
  delete this.exceptionText_
};
goog.debug.LogRecord.prototype.getLoggerName = function() {
  return this.loggerName_
};
goog.debug.LogRecord.prototype.getException = function() {
  return this.exception_
};
goog.debug.LogRecord.prototype.setException = function(a) {
  this.exception_ = a
};
goog.debug.LogRecord.prototype.getExceptionText = function() {
  return this.exceptionText_
};
goog.debug.LogRecord.prototype.setExceptionText = function(a) {
  this.exceptionText_ = a
};
goog.debug.LogRecord.prototype.setLoggerName = function(a) {
  this.loggerName_ = a
};
goog.debug.LogRecord.prototype.getLevel = function() {
  return this.level_
};
goog.debug.LogRecord.prototype.setLevel = function(a) {
  this.level_ = a
};
goog.debug.LogRecord.prototype.getMessage = function() {
  return this.msg_
};
goog.debug.LogRecord.prototype.setMessage = function(a) {
  this.msg_ = a
};
goog.debug.LogRecord.prototype.getMillis = function() {
  return this.time_
};
goog.debug.LogRecord.prototype.setMillis = function(a) {
  this.time_ = a
};
goog.debug.LogRecord.prototype.getSequenceNumber = function() {
  return this.sequenceNumber_
};
goog.debug.LogBuffer = function() {
  goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(), "Cannot use goog.debug.LogBuffer without defining goog.debug.LogBuffer.CAPACITY.");
  this.clear()
};
goog.debug.LogBuffer.getInstance = function() {
  if(!goog.debug.LogBuffer.instance_) {
    goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer
  }
  return goog.debug.LogBuffer.instance_
};
goog.debug.LogBuffer.CAPACITY = 0;
goog.debug.LogBuffer.prototype.addRecord = function(a, b, c) {
  var d = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;
  this.curIndex_ = d;
  if(this.isFull_) {
    return d = this.buffer_[d], d.reset(a, b, c), d
  }
  this.isFull_ = d == goog.debug.LogBuffer.CAPACITY - 1;
  return this.buffer_[d] = new goog.debug.LogRecord(a, b, c)
};
goog.debug.LogBuffer.isBufferingEnabled = function() {
  return 0 < goog.debug.LogBuffer.CAPACITY
};
goog.debug.LogBuffer.prototype.clear = function() {
  this.buffer_ = Array(goog.debug.LogBuffer.CAPACITY);
  this.curIndex_ = -1;
  this.isFull_ = !1
};
goog.debug.LogBuffer.prototype.forEachRecord = function(a) {
  var b = this.buffer_;
  if(b[0]) {
    var c = this.curIndex_, d = this.isFull_ ? c : -1;
    do {
      d = (d + 1) % goog.debug.LogBuffer.CAPACITY, a(b[d])
    }while(d != c)
  }
};
goog.debug.Logger = function(a) {
  this.name_ = a
};
goog.debug.Logger.prototype.parent_ = null;
goog.debug.Logger.prototype.level_ = null;
goog.debug.Logger.prototype.children_ = null;
goog.debug.Logger.prototype.handlers_ = null;
goog.debug.Logger.ENABLE_HIERARCHY = !0;
if(!goog.debug.Logger.ENABLE_HIERARCHY) {
  goog.debug.Logger.rootHandlers_ = []
}
goog.debug.Logger.Level = function(a, b) {
  this.name = a;
  this.value = b
};
goog.debug.Logger.Level.prototype.toString = function() {
  return this.name
};
goog.debug.Logger.Level.OFF = new goog.debug.Logger.Level("OFF", Infinity);
goog.debug.Logger.Level.SHOUT = new goog.debug.Logger.Level("SHOUT", 1200);
goog.debug.Logger.Level.SEVERE = new goog.debug.Logger.Level("SEVERE", 1E3);
goog.debug.Logger.Level.WARNING = new goog.debug.Logger.Level("WARNING", 900);
goog.debug.Logger.Level.INFO = new goog.debug.Logger.Level("INFO", 800);
goog.debug.Logger.Level.CONFIG = new goog.debug.Logger.Level("CONFIG", 700);
goog.debug.Logger.Level.FINE = new goog.debug.Logger.Level("FINE", 500);
goog.debug.Logger.Level.FINER = new goog.debug.Logger.Level("FINER", 400);
goog.debug.Logger.Level.FINEST = new goog.debug.Logger.Level("FINEST", 300);
goog.debug.Logger.Level.ALL = new goog.debug.Logger.Level("ALL", 0);
goog.debug.Logger.Level.PREDEFINED_LEVELS = [goog.debug.Logger.Level.OFF, goog.debug.Logger.Level.SHOUT, goog.debug.Logger.Level.SEVERE, goog.debug.Logger.Level.WARNING, goog.debug.Logger.Level.INFO, goog.debug.Logger.Level.CONFIG, goog.debug.Logger.Level.FINE, goog.debug.Logger.Level.FINER, goog.debug.Logger.Level.FINEST, goog.debug.Logger.Level.ALL];
goog.debug.Logger.Level.predefinedLevelsCache_ = null;
goog.debug.Logger.Level.createPredefinedLevelsCache_ = function() {
  goog.debug.Logger.Level.predefinedLevelsCache_ = {};
  for(var a = 0, b;b = goog.debug.Logger.Level.PREDEFINED_LEVELS[a];a++) {
    goog.debug.Logger.Level.predefinedLevelsCache_[b.value] = b, goog.debug.Logger.Level.predefinedLevelsCache_[b.name] = b
  }
};
goog.debug.Logger.Level.getPredefinedLevel = function(a) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  return goog.debug.Logger.Level.predefinedLevelsCache_[a] || null
};
goog.debug.Logger.Level.getPredefinedLevelByValue = function(a) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  if(a in goog.debug.Logger.Level.predefinedLevelsCache_) {
    return goog.debug.Logger.Level.predefinedLevelsCache_[a]
  }
  for(var b = 0;b < goog.debug.Logger.Level.PREDEFINED_LEVELS.length;++b) {
    var c = goog.debug.Logger.Level.PREDEFINED_LEVELS[b];
    if(c.value <= a) {
      return c
    }
  }
  return null
};
goog.debug.Logger.getLogger = function(a) {
  return goog.debug.LogManager.getLogger(a)
};
goog.debug.Logger.prototype.getName = function() {
  return this.name_
};
goog.debug.Logger.prototype.addHandler = function(a) {
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    if(!this.handlers_) {
      this.handlers_ = []
    }
    this.handlers_.push(a)
  }else {
    goog.asserts.assert(!this.name_, "Cannot call addHandler on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootHandlers_.push(a)
  }
};
goog.debug.Logger.prototype.removeHandler = function(a) {
  var b = goog.debug.Logger.ENABLE_HIERARCHY ? this.handlers_ : goog.debug.Logger.rootHandlers_;
  return!!b && goog.array.remove(b, a)
};
goog.debug.Logger.prototype.getParent = function() {
  return this.parent_
};
goog.debug.Logger.prototype.getChildren = function() {
  if(!this.children_) {
    this.children_ = {}
  }
  return this.children_
};
goog.debug.Logger.prototype.setLevel = function(a) {
  goog.debug.Logger.ENABLE_HIERARCHY ? this.level_ = a : (goog.asserts.assert(!this.name_, "Cannot call setLevel() on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootLevel_ = a)
};
goog.debug.Logger.prototype.getLevel = function() {
  return this.level_
};
goog.debug.Logger.prototype.getEffectiveLevel = function() {
  if(!goog.debug.Logger.ENABLE_HIERARCHY) {
    return goog.debug.Logger.rootLevel_
  }
  if(this.level_) {
    return this.level_
  }
  if(this.parent_) {
    return this.parent_.getEffectiveLevel()
  }
  goog.asserts.fail("Root logger has no level set.");
  return null
};
goog.debug.Logger.prototype.isLoggable = function(a) {
  return a.value >= this.getEffectiveLevel().value
};
goog.debug.Logger.prototype.log = function(a, b, c) {
  this.isLoggable(a) && this.doLogRecord_(this.getLogRecord(a, b, c))
};
goog.debug.Logger.prototype.getLogRecord = function(a, b, c) {
  var d = goog.debug.LogBuffer.isBufferingEnabled() ? goog.debug.LogBuffer.getInstance().addRecord(a, b, this.name_) : new goog.debug.LogRecord(a, "" + b, this.name_);
  c && (d.setException(c), d.setExceptionText(goog.debug.exposeException(c, arguments.callee.caller)));
  return d
};
goog.debug.Logger.prototype.shout = function(a, b) {
  this.log(goog.debug.Logger.Level.SHOUT, a, b)
};
goog.debug.Logger.prototype.severe = function(a, b) {
  this.log(goog.debug.Logger.Level.SEVERE, a, b)
};
goog.debug.Logger.prototype.warning = function(a, b) {
  this.log(goog.debug.Logger.Level.WARNING, a, b)
};
goog.debug.Logger.prototype.info = function(a, b) {
  this.log(goog.debug.Logger.Level.INFO, a, b)
};
goog.debug.Logger.prototype.config = function(a, b) {
  this.log(goog.debug.Logger.Level.CONFIG, a, b)
};
goog.debug.Logger.prototype.fine = function(a, b) {
  this.log(goog.debug.Logger.Level.FINE, a, b)
};
goog.debug.Logger.prototype.finer = function(a, b) {
  this.log(goog.debug.Logger.Level.FINER, a, b)
};
goog.debug.Logger.prototype.finest = function(a, b) {
  this.log(goog.debug.Logger.Level.FINEST, a, b)
};
goog.debug.Logger.prototype.logRecord = function(a) {
  this.isLoggable(a.getLevel()) && this.doLogRecord_(a)
};
goog.debug.Logger.prototype.logToSpeedTracer_ = function(a) {
  goog.global.console && goog.global.console.markTimeline && goog.global.console.markTimeline(a)
};
goog.debug.Logger.prototype.doLogRecord_ = function(a) {
  this.logToSpeedTracer_("log:" + a.getMessage());
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    for(var b = this;b;) {
      b.callPublish_(a), b = b.getParent()
    }
  }else {
    for(var b = 0, c;c = goog.debug.Logger.rootHandlers_[b++];) {
      c(a)
    }
  }
};
goog.debug.Logger.prototype.callPublish_ = function(a) {
  if(this.handlers_) {
    for(var b = 0, c;c = this.handlers_[b];b++) {
      c(a)
    }
  }
};
goog.debug.Logger.prototype.setParent_ = function(a) {
  this.parent_ = a
};
goog.debug.Logger.prototype.addChild_ = function(a, b) {
  this.getChildren()[a] = b
};
goog.debug.LogManager = {};
goog.debug.LogManager.loggers_ = {};
goog.debug.LogManager.rootLogger_ = null;
goog.debug.LogManager.initialize = function() {
  if(!goog.debug.LogManager.rootLogger_) {
    goog.debug.LogManager.rootLogger_ = new goog.debug.Logger(""), goog.debug.LogManager.loggers_[""] = goog.debug.LogManager.rootLogger_, goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG)
  }
};
goog.debug.LogManager.getLoggers = function() {
  return goog.debug.LogManager.loggers_
};
goog.debug.LogManager.getRoot = function() {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.rootLogger_
};
goog.debug.LogManager.getLogger = function(a) {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.loggers_[a] || goog.debug.LogManager.createLogger_(a)
};
goog.debug.LogManager.createFunctionForCatchErrors = function(a) {
  return function(b) {
    (a || goog.debug.LogManager.getRoot()).severe("Error: " + b.message + " (" + b.fileName + " @ Line: " + b.line + ")")
  }
};
goog.debug.LogManager.createLogger_ = function(a) {
  var b = new goog.debug.Logger(a);
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    var c = a.lastIndexOf("."), d = a.substr(0, c), c = a.substr(c + 1), d = goog.debug.LogManager.getLogger(d);
    d.addChild_(c, b);
    b.setParent_(d)
  }
  return goog.debug.LogManager.loggers_[a] = b
};
goog.json = {};
goog.json.isValid_ = function(a) {
  return/^\s*$/.test(a) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))
};
goog.json.parse = function(a) {
  a = "" + a;
  if(goog.json.isValid_(a)) {
    try {
      return eval("(" + a + ")")
    }catch(b) {
    }
  }
  throw Error("Invalid JSON string: " + a);
};
goog.json.unsafeParse = function(a) {
  return eval("(" + a + ")")
};
goog.json.serialize = function(a) {
  return(new goog.json.Serializer).serialize(a)
};
goog.json.Serializer = function() {
};
goog.json.Serializer.prototype.serialize = function(a) {
  var b = [];
  this.serialize_(a, b);
  return b.join("")
};
goog.json.Serializer.prototype.serialize_ = function(a, b) {
  switch(typeof a) {
    case "string":
      this.serializeString_(a, b);
      break;
    case "number":
      this.serializeNumber_(a, b);
      break;
    case "boolean":
      b.push(a);
      break;
    case "undefined":
      b.push("null");
      break;
    case "object":
      if(null == a) {
        b.push("null");
        break
      }
      if(goog.isArray(a)) {
        this.serializeArray_(a, b);
        break
      }
      this.serializeObject_(a, b);
      break;
    case "function":
      break;
    default:
      throw Error("Unknown type: " + typeof a);
  }
};
goog.json.Serializer.charToJsonCharCache_ = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\u0008":"\\b", "\u000c":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\u000b":"\\u000b"};
goog.json.Serializer.charsToReplace_ = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
goog.json.Serializer.prototype.serializeString_ = function(a, b) {
  b.push('"', a.replace(goog.json.Serializer.charsToReplace_, function(a) {
    if(a in goog.json.Serializer.charToJsonCharCache_) {
      return goog.json.Serializer.charToJsonCharCache_[a]
    }
    var b = a.charCodeAt(0), e = "\\u";
    16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
    return goog.json.Serializer.charToJsonCharCache_[a] = e + b.toString(16)
  }), '"')
};
goog.json.Serializer.prototype.serializeNumber_ = function(a, b) {
  b.push(isFinite(a) && !isNaN(a) ? a : "null")
};
goog.json.Serializer.prototype.serializeArray_ = function(a, b) {
  var c = a.length;
  b.push("[");
  for(var d = "", e = 0;e < c;e++) {
    b.push(d), this.serialize_(a[e], b), d = ","
  }
  b.push("]")
};
goog.json.Serializer.prototype.serializeObject_ = function(a, b) {
  b.push("{");
  var c = "", d;
  for(d in a) {
    if(Object.prototype.hasOwnProperty.call(a, d)) {
      var e = a[d];
      "function" != typeof e && (b.push(c), this.serializeString_(d, b), b.push(":"), this.serialize_(e, b), c = ",")
    }
  }
  b.push("}")
};
goog.net = {};
goog.net.ErrorCode = {NO_ERROR:0, ACCESS_DENIED:1, FILE_NOT_FOUND:2, FF_SILENT_ERROR:3, CUSTOM_ERROR:4, EXCEPTION:5, HTTP_ERROR:6, ABORT:7, TIMEOUT:8, OFFLINE:9};
goog.net.ErrorCode.getDebugMessage = function(a) {
  switch(a) {
    case goog.net.ErrorCode.NO_ERROR:
      return"No Error";
    case goog.net.ErrorCode.ACCESS_DENIED:
      return"Access denied to content document";
    case goog.net.ErrorCode.FILE_NOT_FOUND:
      return"File not found";
    case goog.net.ErrorCode.FF_SILENT_ERROR:
      return"Firefox silently errored";
    case goog.net.ErrorCode.CUSTOM_ERROR:
      return"Application custom error";
    case goog.net.ErrorCode.EXCEPTION:
      return"An exception occurred";
    case goog.net.ErrorCode.HTTP_ERROR:
      return"Http response at 400 or 500 level";
    case goog.net.ErrorCode.ABORT:
      return"Request was aborted";
    case goog.net.ErrorCode.TIMEOUT:
      return"Request timed out";
    case goog.net.ErrorCode.OFFLINE:
      return"The resource is not available offline";
    default:
      return"Unrecognized error code"
  }
};
goog.net.EventType = {COMPLETE:"complete", SUCCESS:"success", ERROR:"error", ABORT:"abort", READY:"ready", READY_STATE_CHANGE:"readystatechange", TIMEOUT:"timeout", INCREMENTAL_DATA:"incrementaldata", PROGRESS:"progress"};
goog.net.HttpStatus = {CONTINUE:100, SWITCHING_PROTOCOLS:101, OK:200, CREATED:201, ACCEPTED:202, NON_AUTHORITATIVE_INFORMATION:203, NO_CONTENT:204, RESET_CONTENT:205, PARTIAL_CONTENT:206, MULTIPLE_CHOICES:300, MOVED_PERMANENTLY:301, FOUND:302, SEE_OTHER:303, NOT_MODIFIED:304, USE_PROXY:305, TEMPORARY_REDIRECT:307, BAD_REQUEST:400, UNAUTHORIZED:401, PAYMENT_REQUIRED:402, FORBIDDEN:403, NOT_FOUND:404, METHOD_NOT_ALLOWED:405, NOT_ACCEPTABLE:406, PROXY_AUTHENTICATION_REQUIRED:407, REQUEST_TIMEOUT:408, 
CONFLICT:409, GONE:410, LENGTH_REQUIRED:411, PRECONDITION_FAILED:412, REQUEST_ENTITY_TOO_LARGE:413, REQUEST_URI_TOO_LONG:414, UNSUPPORTED_MEDIA_TYPE:415, REQUEST_RANGE_NOT_SATISFIABLE:416, EXPECTATION_FAILED:417, INTERNAL_SERVER_ERROR:500, NOT_IMPLEMENTED:501, BAD_GATEWAY:502, SERVICE_UNAVAILABLE:503, GATEWAY_TIMEOUT:504, HTTP_VERSION_NOT_SUPPORTED:505};
goog.net.XmlHttpFactory = function() {
};
goog.net.XmlHttpFactory.prototype.cachedOptions_ = null;
goog.net.XmlHttpFactory.prototype.getOptions = function() {
  return this.cachedOptions_ || (this.cachedOptions_ = this.internalGetOptions())
};
goog.net.WrapperXmlHttpFactory = function(a, b) {
  goog.net.XmlHttpFactory.call(this);
  this.xhrFactory_ = a;
  this.optionsFactory_ = b
};
goog.inherits(goog.net.WrapperXmlHttpFactory, goog.net.XmlHttpFactory);
goog.net.WrapperXmlHttpFactory.prototype.createInstance = function() {
  return this.xhrFactory_()
};
goog.net.WrapperXmlHttpFactory.prototype.getOptions = function() {
  return this.optionsFactory_()
};
goog.net.XmlHttp = function() {
  return goog.net.XmlHttp.factory_.createInstance()
};
goog.net.XmlHttp.getOptions = function() {
  return goog.net.XmlHttp.factory_.getOptions()
};
goog.net.XmlHttp.OptionType = {USE_NULL_FUNCTION:0, LOCAL_REQUEST_ERROR:1};
goog.net.XmlHttp.ReadyState = {UNINITIALIZED:0, LOADING:1, LOADED:2, INTERACTIVE:3, COMPLETE:4};
goog.net.XmlHttp.setFactory = function(a, b) {
  goog.net.XmlHttp.setGlobalFactory(new goog.net.WrapperXmlHttpFactory(a, b))
};
goog.net.XmlHttp.setGlobalFactory = function(a) {
  goog.net.XmlHttp.factory_ = a
};
goog.net.DefaultXmlHttpFactory = function() {
  goog.net.XmlHttpFactory.call(this)
};
goog.inherits(goog.net.DefaultXmlHttpFactory, goog.net.XmlHttpFactory);
goog.net.DefaultXmlHttpFactory.prototype.createInstance = function() {
  var a = this.getProgId_();
  return a ? new ActiveXObject(a) : new XMLHttpRequest
};
goog.net.DefaultXmlHttpFactory.prototype.internalGetOptions = function() {
  var a = {};
  this.getProgId_() && (a[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] = !0, a[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] = !0);
  return a
};
goog.net.DefaultXmlHttpFactory.prototype.ieProgId_ = null;
goog.net.DefaultXmlHttpFactory.prototype.getProgId_ = function() {
  if(!this.ieProgId_ && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
    for(var a = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], b = 0;b < a.length;b++) {
      var c = a[b];
      try {
        return new ActiveXObject(c), this.ieProgId_ = c
      }catch(d) {
      }
    }
    throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
  }
  return this.ieProgId_
};
goog.net.XmlHttp.setGlobalFactory(new goog.net.DefaultXmlHttpFactory);
goog.net.XhrMonitor_ = function() {
  if(goog.userAgent.GECKO) {
    this.contextsToXhr_ = {}, this.xhrToContexts_ = {}, this.stack_ = []
  }
};
goog.net.XhrMonitor_.getKey = function(a) {
  return goog.isString(a) ? a : goog.isObject(a) ? goog.getUid(a) : ""
};
goog.net.XhrMonitor_.prototype.logger_ = goog.debug.Logger.getLogger("goog.net.xhrMonitor");
goog.net.XhrMonitor_.prototype.enabled_ = goog.userAgent.GECKO;
goog.net.XhrMonitor_.prototype.setEnabled = function(a) {
  this.enabled_ = goog.userAgent.GECKO && a
};
goog.net.XhrMonitor_.prototype.pushContext = function(a) {
  if(this.enabled_) {
    var b = goog.net.XhrMonitor_.getKey(a);
    this.logger_.finest("Pushing context: " + a + " (" + b + ")");
    this.stack_.push(b)
  }
};
goog.net.XhrMonitor_.prototype.popContext = function() {
  if(this.enabled_) {
    var a = this.stack_.pop();
    this.logger_.finest("Popping context: " + a);
    this.updateDependentContexts_(a)
  }
};
goog.net.XhrMonitor_.prototype.isContextSafe = function(a) {
  if(!this.enabled_) {
    return!0
  }
  var b = this.contextsToXhr_[goog.net.XhrMonitor_.getKey(a)];
  this.logger_.fine("Context is safe : " + a + " - " + b);
  return!b
};
goog.net.XhrMonitor_.prototype.markXhrOpen = function(a) {
  if(this.enabled_) {
    a = goog.getUid(a);
    this.logger_.fine("Opening XHR : " + a);
    for(var b = 0;b < this.stack_.length;b++) {
      var c = this.stack_[b];
      this.addToMap_(this.contextsToXhr_, c, a);
      this.addToMap_(this.xhrToContexts_, a, c)
    }
  }
};
goog.net.XhrMonitor_.prototype.markXhrClosed = function(a) {
  if(this.enabled_) {
    a = goog.getUid(a);
    this.logger_.fine("Closing XHR : " + a);
    delete this.xhrToContexts_[a];
    for(var b in this.contextsToXhr_) {
      goog.array.remove(this.contextsToXhr_[b], a), 0 == this.contextsToXhr_[b].length && delete this.contextsToXhr_[b]
    }
  }
};
goog.net.XhrMonitor_.prototype.updateDependentContexts_ = function(a) {
  var b = this.xhrToContexts_[a], c = this.contextsToXhr_[a];
  b && c && (this.logger_.finest("Updating dependent contexts"), goog.array.forEach(b, function(a) {
    goog.array.forEach(c, function(b) {
      this.addToMap_(this.contextsToXhr_, a, b);
      this.addToMap_(this.xhrToContexts_, b, a)
    }, this)
  }, this))
};
goog.net.XhrMonitor_.prototype.addToMap_ = function(a, b, c) {
  a[b] || (a[b] = []);
  goog.array.contains(a[b], c) || a[b].push(c)
};
goog.net.xhrMonitor = new goog.net.XhrMonitor_;
goog.uri = {};
goog.uri.utils = {};
goog.uri.utils.CharCode_ = {AMPERSAND:38, EQUAL:61, HASH:35, QUESTION:63};
goog.uri.utils.buildFromEncodedParts = function(a, b, c, d, e, f, g) {
  var h = [];
  a && h.push(a, ":");
  c && (h.push("//"), b && h.push(b, "@"), h.push(c), d && h.push(":", d));
  e && h.push(e);
  f && h.push("?", f);
  g && h.push("#", g);
  return h.join("")
};
goog.uri.utils.splitRe_ = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");
goog.uri.utils.ComponentIndex = {SCHEME:1, USER_INFO:2, DOMAIN:3, PORT:4, PATH:5, QUERY_DATA:6, FRAGMENT:7};
goog.uri.utils.split = function(a) {
  return a.match(goog.uri.utils.splitRe_)
};
goog.uri.utils.decodeIfPossible_ = function(a) {
  return a && decodeURIComponent(a)
};
goog.uri.utils.getComponentByIndex_ = function(a, b) {
  return goog.uri.utils.split(b)[a] || null
};
goog.uri.utils.getScheme = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, a)
};
goog.uri.utils.getUserInfoEncoded = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, a)
};
goog.uri.utils.getUserInfo = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded(a))
};
goog.uri.utils.getDomainEncoded = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, a)
};
goog.uri.utils.getDomain = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded(a))
};
goog.uri.utils.getPort = function(a) {
  return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, a)) || null
};
goog.uri.utils.getPathEncoded = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, a)
};
goog.uri.utils.getPath = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded(a))
};
goog.uri.utils.getQueryData = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, a)
};
goog.uri.utils.getFragmentEncoded = function(a) {
  var b = a.indexOf("#");
  return 0 > b ? null : a.substr(b + 1)
};
goog.uri.utils.setFragmentEncoded = function(a, b) {
  return goog.uri.utils.removeFragment(a) + (b ? "#" + b : "")
};
goog.uri.utils.getFragment = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded(a))
};
goog.uri.utils.getHost = function(a) {
  a = goog.uri.utils.split(a);
  return goog.uri.utils.buildFromEncodedParts(a[goog.uri.utils.ComponentIndex.SCHEME], a[goog.uri.utils.ComponentIndex.USER_INFO], a[goog.uri.utils.ComponentIndex.DOMAIN], a[goog.uri.utils.ComponentIndex.PORT])
};
goog.uri.utils.getPathAndAfter = function(a) {
  a = goog.uri.utils.split(a);
  return goog.uri.utils.buildFromEncodedParts(null, null, null, null, a[goog.uri.utils.ComponentIndex.PATH], a[goog.uri.utils.ComponentIndex.QUERY_DATA], a[goog.uri.utils.ComponentIndex.FRAGMENT])
};
goog.uri.utils.removeFragment = function(a) {
  var b = a.indexOf("#");
  return 0 > b ? a : a.substr(0, b)
};
goog.uri.utils.haveSameDomain = function(a, b) {
  var c = goog.uri.utils.split(a), d = goog.uri.utils.split(b);
  return c[goog.uri.utils.ComponentIndex.DOMAIN] == d[goog.uri.utils.ComponentIndex.DOMAIN] && c[goog.uri.utils.ComponentIndex.SCHEME] == d[goog.uri.utils.ComponentIndex.SCHEME] && c[goog.uri.utils.ComponentIndex.PORT] == d[goog.uri.utils.ComponentIndex.PORT]
};
goog.uri.utils.assertNoFragmentsOrQueries_ = function(a) {
  if(goog.DEBUG && (0 <= a.indexOf("#") || 0 <= a.indexOf("?"))) {
    throw Error("goog.uri.utils: Fragment or query identifiers are not supported: [" + a + "]");
  }
};
goog.uri.utils.appendQueryData_ = function(a) {
  if(a[1]) {
    var b = a[0], c = b.indexOf("#");
    0 <= c && (a.push(b.substr(c)), a[0] = b = b.substr(0, c));
    c = b.indexOf("?");
    0 > c ? a[1] = "?" : c == b.length - 1 && (a[1] = void 0)
  }
  return a.join("")
};
goog.uri.utils.appendKeyValuePairs_ = function(a, b, c) {
  if(goog.isArray(b)) {
    for(var d = 0;d < b.length;d++) {
      c.push("&", a), "" !== b[d] && c.push("=", goog.string.urlEncode(b[d]))
    }
  }else {
    null != b && (c.push("&", a), "" !== b && c.push("=", goog.string.urlEncode(b)))
  }
};
goog.uri.utils.buildQueryDataBuffer_ = function(a, b, c) {
  goog.asserts.assert(0 == Math.max(b.length - (c || 0), 0) % 2, "goog.uri.utils: Key/value lists must be even in length.");
  for(c = c || 0;c < b.length;c += 2) {
    goog.uri.utils.appendKeyValuePairs_(b[c], b[c + 1], a)
  }
  return a
};
goog.uri.utils.buildQueryData = function(a, b) {
  var c = goog.uri.utils.buildQueryDataBuffer_([], a, b);
  c[0] = "";
  return c.join("")
};
goog.uri.utils.buildQueryDataBufferFromMap_ = function(a, b) {
  for(var c in b) {
    goog.uri.utils.appendKeyValuePairs_(c, b[c], a)
  }
  return a
};
goog.uri.utils.buildQueryDataFromMap = function(a) {
  a = goog.uri.utils.buildQueryDataBufferFromMap_([], a);
  a[0] = "";
  return a.join("")
};
goog.uri.utils.appendParams = function(a, b) {
  return goog.uri.utils.appendQueryData_(2 == arguments.length ? goog.uri.utils.buildQueryDataBuffer_([a], arguments[1], 0) : goog.uri.utils.buildQueryDataBuffer_([a], arguments, 1))
};
goog.uri.utils.appendParamsFromMap = function(a, b) {
  return goog.uri.utils.appendQueryData_(goog.uri.utils.buildQueryDataBufferFromMap_([a], b))
};
goog.uri.utils.appendParam = function(a, b, c) {
  return goog.uri.utils.appendQueryData_([a, "&", b, "=", goog.string.urlEncode(c)])
};
goog.uri.utils.findParam_ = function(a, b, c, d) {
  for(var e = c.length;0 <= (b = a.indexOf(c, b)) && b < d;) {
    var f = a.charCodeAt(b - 1);
    if(f == goog.uri.utils.CharCode_.AMPERSAND || f == goog.uri.utils.CharCode_.QUESTION) {
      if(f = a.charCodeAt(b + e), !f || f == goog.uri.utils.CharCode_.EQUAL || f == goog.uri.utils.CharCode_.AMPERSAND || f == goog.uri.utils.CharCode_.HASH) {
        return b
      }
    }
    b += e + 1
  }
  return-1
};
goog.uri.utils.hashOrEndRe_ = /#|$/;
goog.uri.utils.hasParam = function(a, b) {
  return 0 <= goog.uri.utils.findParam_(a, 0, b, a.search(goog.uri.utils.hashOrEndRe_))
};
goog.uri.utils.getParamValue = function(a, b) {
  var c = a.search(goog.uri.utils.hashOrEndRe_), d = goog.uri.utils.findParam_(a, 0, b, c);
  if(0 > d) {
    return null
  }
  var e = a.indexOf("&", d);
  if(0 > e || e > c) {
    e = c
  }
  d += b.length + 1;
  return goog.string.urlDecode(a.substr(d, e - d))
};
goog.uri.utils.getParamValues = function(a, b) {
  for(var c = a.search(goog.uri.utils.hashOrEndRe_), d = 0, e, f = [];0 <= (e = goog.uri.utils.findParam_(a, d, b, c));) {
    d = a.indexOf("&", e);
    if(0 > d || d > c) {
      d = c
    }
    e += b.length + 1;
    f.push(goog.string.urlDecode(a.substr(e, d - e)))
  }
  return f
};
goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/;
goog.uri.utils.removeParam = function(a, b) {
  for(var c = a.search(goog.uri.utils.hashOrEndRe_), d = 0, e, f = [];0 <= (e = goog.uri.utils.findParam_(a, d, b, c));) {
    f.push(a.substring(d, e)), d = Math.min(a.indexOf("&", e) + 1 || c, c)
  }
  f.push(a.substr(d));
  return f.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1")
};
goog.uri.utils.setParam = function(a, b, c) {
  return goog.uri.utils.appendParam(goog.uri.utils.removeParam(a, b), b, c)
};
goog.uri.utils.appendPath = function(a, b) {
  goog.uri.utils.assertNoFragmentsOrQueries_(a);
  goog.string.endsWith(a, "/") && (a = a.substr(0, a.length - 1));
  goog.string.startsWith(b, "/") && (b = b.substr(1));
  return goog.string.buildString(a, "/", b)
};
goog.uri.utils.StandardQueryParam = {RANDOM:"zx"};
goog.uri.utils.makeUnique = function(a) {
  return goog.uri.utils.setParam(a, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString())
};
goog.net.XhrIo = function(a) {
  goog.events.EventTarget.call(this);
  this.headers = new goog.structs.Map;
  this.xmlHttpFactory_ = a || null
};
goog.inherits(goog.net.XhrIo, goog.events.EventTarget);
goog.net.XhrIo.ResponseType = {DEFAULT:"", TEXT:"text", DOCUMENT:"document", BLOB:"blob", ARRAY_BUFFER:"arraybuffer"};
goog.net.XhrIo.prototype.logger_ = goog.debug.Logger.getLogger("goog.net.XhrIo");
goog.net.XhrIo.CONTENT_TYPE_HEADER = "Content-Type";
goog.net.XhrIo.HTTP_SCHEME_PATTERN = /^https?:?$/i;
goog.net.XhrIo.FORM_CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";
goog.net.XhrIo.sendInstances_ = [];
goog.net.XhrIo.send = function(a, b, c, d, e, f) {
  var g = new goog.net.XhrIo;
  goog.net.XhrIo.sendInstances_.push(g);
  b && goog.events.listen(g, goog.net.EventType.COMPLETE, b);
  goog.events.listen(g, goog.net.EventType.READY, goog.partial(goog.net.XhrIo.cleanupSend_, g));
  f && g.setTimeoutInterval(f);
  g.send(a, c, d, e)
};
goog.net.XhrIo.cleanup = function() {
  for(var a = goog.net.XhrIo.sendInstances_;a.length;) {
    a.pop().dispose()
  }
};
goog.net.XhrIo.protectEntryPoints = function(a) {
  goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = a.protectEntryPoint(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_)
};
goog.net.XhrIo.cleanupSend_ = function(a) {
  a.dispose();
  goog.array.remove(goog.net.XhrIo.sendInstances_, a)
};
goog.net.XhrIo.prototype.active_ = !1;
goog.net.XhrIo.prototype.xhr_ = null;
goog.net.XhrIo.prototype.xhrOptions_ = null;
goog.net.XhrIo.prototype.lastUri_ = "";
goog.net.XhrIo.prototype.lastMethod_ = "";
goog.net.XhrIo.prototype.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR;
goog.net.XhrIo.prototype.lastError_ = "";
goog.net.XhrIo.prototype.errorDispatched_ = !1;
goog.net.XhrIo.prototype.inSend_ = !1;
goog.net.XhrIo.prototype.inOpen_ = !1;
goog.net.XhrIo.prototype.inAbort_ = !1;
goog.net.XhrIo.prototype.timeoutInterval_ = 0;
goog.net.XhrIo.prototype.timeoutId_ = null;
goog.net.XhrIo.prototype.responseType_ = goog.net.XhrIo.ResponseType.DEFAULT;
goog.net.XhrIo.prototype.withCredentials_ = !1;
goog.net.XhrIo.prototype.getTimeoutInterval = function() {
  return this.timeoutInterval_
};
goog.net.XhrIo.prototype.setTimeoutInterval = function(a) {
  this.timeoutInterval_ = Math.max(0, a)
};
goog.net.XhrIo.prototype.setResponseType = function(a) {
  this.responseType_ = a
};
goog.net.XhrIo.prototype.getResponseType = function() {
  return this.responseType_
};
goog.net.XhrIo.prototype.setWithCredentials = function(a) {
  this.withCredentials_ = a
};
goog.net.XhrIo.prototype.getWithCredentials = function() {
  return this.withCredentials_
};
goog.net.XhrIo.prototype.send = function(a, b, c, d) {
  if(this.xhr_) {
    throw Error("[goog.net.XhrIo] Object is active with another request");
  }
  b = b || "GET";
  this.lastUri_ = a;
  this.lastError_ = "";
  this.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR;
  this.lastMethod_ = b;
  this.errorDispatched_ = !1;
  this.active_ = !0;
  this.xhr_ = this.createXhr();
  this.xhrOptions_ = this.xmlHttpFactory_ ? this.xmlHttpFactory_.getOptions() : goog.net.XmlHttp.getOptions();
  goog.net.xhrMonitor.markXhrOpen(this.xhr_);
  this.xhr_.onreadystatechange = goog.bind(this.onReadyStateChange_, this);
  try {
    this.logger_.fine(this.formatMsg_("Opening Xhr")), this.inOpen_ = !0, this.xhr_.open(b, a, !0), this.inOpen_ = !1
  }catch(e) {
    this.logger_.fine(this.formatMsg_("Error opening Xhr: " + e.message));
    this.error_(goog.net.ErrorCode.EXCEPTION, e);
    return
  }
  var a = c || "", f = this.headers.clone();
  d && goog.structs.forEach(d, function(a, b) {
    f.set(b, a)
  });
  "POST" == b && !f.containsKey(goog.net.XhrIo.CONTENT_TYPE_HEADER) && f.set(goog.net.XhrIo.CONTENT_TYPE_HEADER, goog.net.XhrIo.FORM_CONTENT_TYPE);
  goog.structs.forEach(f, function(a, b) {
    this.xhr_.setRequestHeader(b, a)
  }, this);
  if(this.responseType_) {
    this.xhr_.responseType = this.responseType_
  }
  if(goog.object.containsKey(this.xhr_, "withCredentials")) {
    this.xhr_.withCredentials = this.withCredentials_
  }
  try {
    if(this.timeoutId_) {
      goog.Timer.defaultTimerObject.clearTimeout(this.timeoutId_), this.timeoutId_ = null
    }
    if(0 < this.timeoutInterval_) {
      this.logger_.fine(this.formatMsg_("Will abort after " + this.timeoutInterval_ + "ms if incomplete")), this.timeoutId_ = goog.Timer.defaultTimerObject.setTimeout(goog.bind(this.timeout_, this), this.timeoutInterval_)
    }
    this.logger_.fine(this.formatMsg_("Sending request"));
    this.inSend_ = !0;
    this.xhr_.send(a);
    this.inSend_ = !1
  }catch(g) {
    this.logger_.fine(this.formatMsg_("Send error: " + g.message)), this.error_(goog.net.ErrorCode.EXCEPTION, g)
  }
};
goog.net.XhrIo.prototype.createXhr = function() {
  return this.xmlHttpFactory_ ? this.xmlHttpFactory_.createInstance() : new goog.net.XmlHttp
};
goog.net.XhrIo.prototype.dispatchEvent = function(a) {
  if(this.xhr_) {
    goog.net.xhrMonitor.pushContext(this.xhr_);
    try {
      return goog.net.XhrIo.superClass_.dispatchEvent.call(this, a)
    }finally {
      goog.net.xhrMonitor.popContext()
    }
  }else {
    return goog.net.XhrIo.superClass_.dispatchEvent.call(this, a)
  }
};
goog.net.XhrIo.prototype.timeout_ = function() {
  if("undefined" != typeof goog && this.xhr_) {
    this.lastError_ = "Timed out after " + this.timeoutInterval_ + "ms, aborting", this.lastErrorCode_ = goog.net.ErrorCode.TIMEOUT, this.logger_.fine(this.formatMsg_(this.lastError_)), this.dispatchEvent(goog.net.EventType.TIMEOUT), this.abort(goog.net.ErrorCode.TIMEOUT)
  }
};
goog.net.XhrIo.prototype.error_ = function(a, b) {
  this.active_ = !1;
  if(this.xhr_) {
    this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1
  }
  this.lastError_ = b;
  this.lastErrorCode_ = a;
  this.dispatchErrors_();
  this.cleanUpXhr_()
};
goog.net.XhrIo.prototype.dispatchErrors_ = function() {
  if(!this.errorDispatched_) {
    this.errorDispatched_ = !0, this.dispatchEvent(goog.net.EventType.COMPLETE), this.dispatchEvent(goog.net.EventType.ERROR)
  }
};
goog.net.XhrIo.prototype.abort = function(a) {
  if(this.xhr_ && this.active_) {
    this.logger_.fine(this.formatMsg_("Aborting")), this.active_ = !1, this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1, this.lastErrorCode_ = a || goog.net.ErrorCode.ABORT, this.dispatchEvent(goog.net.EventType.COMPLETE), this.dispatchEvent(goog.net.EventType.ABORT), this.cleanUpXhr_()
  }
};
goog.net.XhrIo.prototype.disposeInternal = function() {
  if(this.xhr_) {
    if(this.active_) {
      this.active_ = !1, this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1
    }
    this.cleanUpXhr_(!0)
  }
  goog.net.XhrIo.superClass_.disposeInternal.call(this)
};
goog.net.XhrIo.prototype.onReadyStateChange_ = function() {
  if(!this.inOpen_ && !this.inSend_ && !this.inAbort_) {
    this.onReadyStateChangeEntryPoint_()
  }else {
    this.onReadyStateChangeHelper_()
  }
};
goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = function() {
  this.onReadyStateChangeHelper_()
};
goog.net.XhrIo.prototype.onReadyStateChangeHelper_ = function() {
  if(this.active_ && "undefined" != typeof goog) {
    if(this.xhrOptions_[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE && 2 == this.getStatus()) {
      this.logger_.fine(this.formatMsg_("Local request error detected and ignored"))
    }else {
      if(this.inSend_ && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE) {
        goog.Timer.defaultTimerObject.setTimeout(goog.bind(this.onReadyStateChange_, this), 0)
      }else {
        if(this.dispatchEvent(goog.net.EventType.READY_STATE_CHANGE), this.isComplete()) {
          this.logger_.fine(this.formatMsg_("Request complete")), this.active_ = !1, this.isSuccess() ? (this.dispatchEvent(goog.net.EventType.COMPLETE), this.dispatchEvent(goog.net.EventType.SUCCESS)) : (this.lastErrorCode_ = goog.net.ErrorCode.HTTP_ERROR, this.lastError_ = this.getStatusText() + " [" + this.getStatus() + "]", this.dispatchErrors_()), this.cleanUpXhr_()
        }
      }
    }
  }
};
goog.net.XhrIo.prototype.cleanUpXhr_ = function(a) {
  if(this.xhr_) {
    var b = this.xhr_, c = this.xhrOptions_[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] ? goog.nullFunction : null;
    this.xhrOptions_ = this.xhr_ = null;
    if(this.timeoutId_) {
      goog.Timer.defaultTimerObject.clearTimeout(this.timeoutId_), this.timeoutId_ = null
    }
    a || (goog.net.xhrMonitor.pushContext(b), this.dispatchEvent(goog.net.EventType.READY), goog.net.xhrMonitor.popContext());
    goog.net.xhrMonitor.markXhrClosed(b);
    try {
      b.onreadystatechange = c
    }catch(d) {
      this.logger_.severe("Problem encountered resetting onreadystatechange: " + d.message)
    }
  }
};
goog.net.XhrIo.prototype.isActive = function() {
  return!!this.xhr_
};
goog.net.XhrIo.prototype.isComplete = function() {
  return this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE
};
goog.net.XhrIo.prototype.isSuccess = function() {
  switch(this.getStatus()) {
    case 0:
      return!this.isLastUriEffectiveSchemeHttp_();
    case goog.net.HttpStatus.OK:
    ;
    case goog.net.HttpStatus.NO_CONTENT:
    ;
    case goog.net.HttpStatus.NOT_MODIFIED:
      return!0;
    default:
      return!1
  }
};
goog.net.XhrIo.prototype.isLastUriEffectiveSchemeHttp_ = function() {
  var a = goog.isString(this.lastUri_) ? goog.uri.utils.getScheme(this.lastUri_) : this.lastUri_.getScheme();
  return a ? goog.net.XhrIo.HTTP_SCHEME_PATTERN.test(a) : self.location ? goog.net.XhrIo.HTTP_SCHEME_PATTERN.test(self.location.protocol) : !0
};
goog.net.XhrIo.prototype.getReadyState = function() {
  return this.xhr_ ? this.xhr_.readyState : goog.net.XmlHttp.ReadyState.UNINITIALIZED
};
goog.net.XhrIo.prototype.getStatus = function() {
  try {
    return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.status : -1
  }catch(a) {
    return this.logger_.warning("Can not get status: " + a.message), -1
  }
};
goog.net.XhrIo.prototype.getStatusText = function() {
  try {
    return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.statusText : ""
  }catch(a) {
    return this.logger_.fine("Can not get status: " + a.message), ""
  }
};
goog.net.XhrIo.prototype.getLastUri = function() {
  return"" + this.lastUri_
};
goog.net.XhrIo.prototype.getResponseText = function() {
  try {
    return this.xhr_ ? this.xhr_.responseText : ""
  }catch(a) {
    return this.logger_.fine("Can not get responseText: " + a.message), ""
  }
};
goog.net.XhrIo.prototype.getResponseXml = function() {
  try {
    return this.xhr_ ? this.xhr_.responseXML : null
  }catch(a) {
    return this.logger_.fine("Can not get responseXML: " + a.message), null
  }
};
goog.net.XhrIo.prototype.getResponseJson = function(a) {
  if(this.xhr_) {
    var b = this.xhr_.responseText;
    a && 0 == b.indexOf(a) && (b = b.substring(a.length));
    return goog.json.parse(b)
  }
};
goog.net.XhrIo.prototype.getResponse = function() {
  try {
    return this.xhr_ && this.xhr_.response
  }catch(a) {
    return this.logger_.fine("Can not get response: " + a.message), null
  }
};
goog.net.XhrIo.prototype.getResponseHeader = function(a) {
  return this.xhr_ && this.isComplete() ? this.xhr_.getResponseHeader(a) : void 0
};
goog.net.XhrIo.prototype.getAllResponseHeaders = function() {
  return this.xhr_ && this.isComplete() ? this.xhr_.getAllResponseHeaders() : ""
};
goog.net.XhrIo.prototype.getLastErrorCode = function() {
  return this.lastErrorCode_
};
goog.net.XhrIo.prototype.getLastError = function() {
  return goog.isString(this.lastError_) ? this.lastError_ : "" + this.lastError_
};
goog.net.XhrIo.prototype.formatMsg_ = function(a) {
  return a + " [" + this.lastMethod_ + " " + this.lastUri_ + " " + this.getStatus() + "]"
};
goog.debug.entryPointRegistry.register(function(a) {
  goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = a(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_)
});
goog.string.StringBuffer = function(a, b) {
  this.buffer_ = goog.userAgent.jscript.HAS_JSCRIPT ? [] : "";
  null != a && this.append.apply(this, arguments)
};
goog.string.StringBuffer.prototype.set = function(a) {
  this.clear();
  this.append(a)
};
goog.userAgent.jscript.HAS_JSCRIPT ? (goog.string.StringBuffer.prototype.bufferLength_ = 0, goog.string.StringBuffer.prototype.append = function(a, b, c) {
  null == b ? this.buffer_[this.bufferLength_++] = a : (this.buffer_.push.apply(this.buffer_, arguments), this.bufferLength_ = this.buffer_.length);
  return this
}) : goog.string.StringBuffer.prototype.append = function(a, b, c) {
  this.buffer_ += a;
  if(null != b) {
    for(var d = 1;d < arguments.length;d++) {
      this.buffer_ += arguments[d]
    }
  }
  return this
};
goog.string.StringBuffer.prototype.clear = function() {
  goog.userAgent.jscript.HAS_JSCRIPT ? this.bufferLength_ = this.buffer_.length = 0 : this.buffer_ = ""
};
goog.string.StringBuffer.prototype.getLength = function() {
  return this.toString().length
};
goog.string.StringBuffer.prototype.toString = function() {
  if(goog.userAgent.jscript.HAS_JSCRIPT) {
    var a = this.buffer_.join("");
    this.clear();
    a && this.append(a);
    return a
  }
  return this.buffer_
};
goog.structs.Node = function(a, b) {
  this.key_ = a;
  this.value_ = b
};
goog.structs.Node.prototype.getKey = function() {
  return this.key_
};
goog.structs.Node.prototype.getValue = function() {
  return this.value_
};
goog.structs.Node.prototype.clone = function() {
  return new goog.structs.Node(this.key_, this.value_)
};
goog.events.EventHandler = function(a) {
  goog.Disposable.call(this);
  this.handler_ = a
};
goog.inherits(goog.events.EventHandler, goog.Disposable);
goog.events.EventHandler.KEY_POOL_INITIAL_COUNT = 0;
goog.events.EventHandler.KEY_POOL_MAX_COUNT = 100;
goog.events.EventHandler.keyPool_ = new goog.structs.SimplePool(goog.events.EventHandler.KEY_POOL_INITIAL_COUNT, goog.events.EventHandler.KEY_POOL_MAX_COUNT);
goog.events.EventHandler.keys_ = null;
goog.events.EventHandler.key_ = null;
goog.events.EventHandler.typeArray_ = [];
goog.events.EventHandler.prototype.listen = function(a, b, c, d, e) {
  if(!goog.isArray(b)) {
    goog.events.EventHandler.typeArray_[0] = b, b = goog.events.EventHandler.typeArray_
  }
  for(var f = 0;f < b.length;f++) {
    this.recordListenerKey_(goog.events.listen(a, b[f], c || this, d || !1, e || this.handler_ || this))
  }
  return this
};
goog.events.EventHandler.prototype.listenOnce = function(a, b, c, d, e) {
  if(goog.isArray(b)) {
    for(var f = 0;f < b.length;f++) {
      this.listenOnce(a, b[f], c, d, e)
    }
  }else {
    this.recordListenerKey_(goog.events.listenOnce(a, b, c || this, d || !1, e || this.handler_ || this))
  }
  return this
};
goog.events.EventHandler.prototype.listenWithWrapper = function(a, b, c, d, e) {
  b.listen(a, c, d, e || this.handler_, this);
  return this
};
goog.events.EventHandler.prototype.recordListenerKey_ = function(a) {
  this.keys_ ? this.keys_[a] = !0 : this.key_ ? (this.keys_ = goog.events.EventHandler.keyPool_.getObject(), this.keys_[this.key_] = !0, this.key_ = null, this.keys_[a] = !0) : this.key_ = a
};
goog.events.EventHandler.prototype.unlisten = function(a, b, c, d, e) {
  if(this.key_ || this.keys_) {
    if(goog.isArray(b)) {
      for(var f = 0;f < b.length;f++) {
        this.unlisten(a, b[f], c, d, e)
      }
    }else {
      if(a = goog.events.getListener(a, b, c || this, d || !1, e || this.handler_ || this)) {
        if(a = a.key, goog.events.unlistenByKey(a), this.keys_) {
          goog.object.remove(this.keys_, a)
        }else {
          if(this.key_ == a) {
            this.key_ = null
          }
        }
      }
    }
  }
  return this
};
goog.events.EventHandler.prototype.unlistenWithWrapper = function(a, b, c, d, e) {
  b.unlisten(a, c, d, e || this.handler_, this);
  return this
};
goog.events.EventHandler.prototype.removeAll = function() {
  if(this.keys_) {
    for(var a in this.keys_) {
      goog.events.unlistenByKey(a), delete this.keys_[a]
    }
    goog.events.EventHandler.keyPool_.releaseObject(this.keys_);
    this.keys_ = null
  }else {
    this.key_ && goog.events.unlistenByKey(this.key_)
  }
};
goog.events.EventHandler.prototype.disposeInternal = function() {
  goog.events.EventHandler.superClass_.disposeInternal.call(this);
  this.removeAll()
};
goog.events.EventHandler.prototype.handleEvent = function() {
  throw Error("EventHandler.handleEvent not implemented");
};
goog.debug.RelativeTimeProvider = function() {
  this.relativeTimeStart_ = goog.now()
};
goog.debug.RelativeTimeProvider.defaultInstance_ = new goog.debug.RelativeTimeProvider;
goog.debug.RelativeTimeProvider.prototype.set = function(a) {
  this.relativeTimeStart_ = a
};
goog.debug.RelativeTimeProvider.prototype.reset = function() {
  this.set(goog.now())
};
goog.debug.RelativeTimeProvider.prototype.get = function() {
  return this.relativeTimeStart_
};
goog.debug.RelativeTimeProvider.getDefaultInstance = function() {
  return goog.debug.RelativeTimeProvider.defaultInstance_
};
goog.debug.Formatter = function(a) {
  this.prefix_ = a || "";
  this.startTimeProvider_ = goog.debug.RelativeTimeProvider.getDefaultInstance()
};
goog.debug.Formatter.prototype.showAbsoluteTime = !0;
goog.debug.Formatter.prototype.showRelativeTime = !0;
goog.debug.Formatter.prototype.showLoggerName = !0;
goog.debug.Formatter.prototype.showExceptionText = !1;
goog.debug.Formatter.prototype.showSeverityLevel = !1;
goog.debug.Formatter.prototype.setStartTimeProvider = function(a) {
  this.startTimeProvider_ = a
};
goog.debug.Formatter.prototype.getStartTimeProvider = function() {
  return this.startTimeProvider_
};
goog.debug.Formatter.prototype.resetRelativeTimeStart = function() {
  this.startTimeProvider_.reset()
};
goog.debug.Formatter.getDateTimeStamp_ = function(a) {
  a = new Date(a.getMillis());
  return goog.debug.Formatter.getTwoDigitString_(a.getFullYear() - 2E3) + goog.debug.Formatter.getTwoDigitString_(a.getMonth() + 1) + goog.debug.Formatter.getTwoDigitString_(a.getDate()) + " " + goog.debug.Formatter.getTwoDigitString_(a.getHours()) + ":" + goog.debug.Formatter.getTwoDigitString_(a.getMinutes()) + ":" + goog.debug.Formatter.getTwoDigitString_(a.getSeconds()) + "." + goog.debug.Formatter.getTwoDigitString_(Math.floor(a.getMilliseconds() / 10))
};
goog.debug.Formatter.getTwoDigitString_ = function(a) {
  return 10 > a ? "0" + a : "" + a
};
goog.debug.Formatter.getRelativeTime_ = function(a, b) {
  var c = (a.getMillis() - b) / 1E3, d = c.toFixed(3), e = 0;
  if(1 > c) {
    e = 2
  }else {
    for(;100 > c;) {
      e++, c *= 10
    }
  }
  for(;0 < e--;) {
    d = " " + d
  }
  return d
};
goog.debug.HtmlFormatter = function(a) {
  goog.debug.Formatter.call(this, a)
};
goog.inherits(goog.debug.HtmlFormatter, goog.debug.Formatter);
goog.debug.HtmlFormatter.prototype.showExceptionText = !0;
goog.debug.HtmlFormatter.prototype.formatRecord = function(a) {
  var b;
  switch(a.getLevel().value) {
    case goog.debug.Logger.Level.SHOUT.value:
      b = "dbg-sh";
      break;
    case goog.debug.Logger.Level.SEVERE.value:
      b = "dbg-sev";
      break;
    case goog.debug.Logger.Level.WARNING.value:
      b = "dbg-w";
      break;
    case goog.debug.Logger.Level.INFO.value:
      b = "dbg-i";
      break;
    default:
      b = "dbg-f"
  }
  var c = [];
  c.push(this.prefix_, " ");
  this.showAbsoluteTime && c.push("[", goog.debug.Formatter.getDateTimeStamp_(a), "] ");
  this.showRelativeTime && c.push("[", goog.string.whitespaceEscape(goog.debug.Formatter.getRelativeTime_(a, this.startTimeProvider_.get())), "s] ");
  this.showLoggerName && c.push("[", goog.string.htmlEscape(a.getLoggerName()), "] ");
  c.push('<span class="', b, '">', goog.string.newLineToBr(goog.string.whitespaceEscape(goog.string.htmlEscape(a.getMessage()))));
  this.showExceptionText && a.getException() && c.push("<br>", goog.string.newLineToBr(goog.string.whitespaceEscape(a.getExceptionText() || "")));
  c.push("</span><br>");
  return c.join("")
};
goog.debug.TextFormatter = function(a) {
  goog.debug.Formatter.call(this, a)
};
goog.inherits(goog.debug.TextFormatter, goog.debug.Formatter);
goog.debug.TextFormatter.prototype.formatRecord = function(a) {
  var b = [];
  b.push(this.prefix_, " ");
  this.showAbsoluteTime && b.push("[", goog.debug.Formatter.getDateTimeStamp_(a), "] ");
  this.showRelativeTime && b.push("[", goog.debug.Formatter.getRelativeTime_(a, this.startTimeProvider_.get()), "s] ");
  this.showLoggerName && b.push("[", a.getLoggerName(), "] ");
  this.showSeverityLevel && b.push("[", a.getLevel().name, "] ");
  b.push(a.getMessage(), "\n");
  this.showExceptionText && a.getException() && b.push(a.getExceptionText(), "\n");
  return b.join("")
};
goog.messaging = {};
goog.messaging.MessageChannel = function() {
};
goog.messaging.MessageChannel.prototype.connect = function() {
};
goog.messaging.MessageChannel.prototype.isConnected = function() {
};
goog.messaging.MessageChannel.prototype.registerService = function() {
};
goog.messaging.MessageChannel.prototype.registerDefaultService = function() {
};
goog.messaging.MessageChannel.prototype.send = function() {
};
goog.net.xpc = {};
goog.net.xpc.TransportTypes = {NATIVE_MESSAGING:1, FRAME_ELEMENT_METHOD:2, IFRAME_RELAY:3, IFRAME_POLLING:4, FLASH:5, NIX:6};
goog.net.xpc.TransportNames = {1:"NativeMessagingTransport", 2:"FrameElementMethodTransport", 3:"IframeRelayTransport", 4:"IframePollingTransport", 5:"FlashTransport", 6:"NixTransport"};
goog.net.xpc.CfgFields = {CHANNEL_NAME:"cn", AUTH_TOKEN:"at", REMOTE_AUTH_TOKEN:"rat", PEER_URI:"pu", IFRAME_ID:"ifrid", TRANSPORT:"tp", LOCAL_RELAY_URI:"lru", PEER_RELAY_URI:"pru", LOCAL_POLL_URI:"lpu", PEER_POLL_URI:"ppu", PEER_HOSTNAME:"ph"};
goog.net.xpc.UriCfgFields = [goog.net.xpc.CfgFields.PEER_URI, goog.net.xpc.CfgFields.LOCAL_RELAY_URI, goog.net.xpc.CfgFields.PEER_RELAY_URI, goog.net.xpc.CfgFields.LOCAL_POLL_URI, goog.net.xpc.CfgFields.PEER_POLL_URI];
goog.net.xpc.ChannelStates = {NOT_CONNECTED:1, CONNECTED:2, CLOSED:3};
goog.net.xpc.TRANSPORT_SERVICE_ = "tp";
goog.net.xpc.SETUP = "SETUP";
goog.net.xpc.SETUP_ACK_ = "SETUP_ACK";
goog.net.xpc.channels_ = {};
goog.net.xpc.getRandomString = function(a, b) {
  for(var c = b || goog.net.xpc.randomStringCharacters_, d = c.length, e = "";0 < a--;) {
    e += c.charAt(Math.floor(Math.random() * d))
  }
  return e
};
goog.net.xpc.randomStringCharacters_ = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
goog.net.xpc.logger = goog.debug.Logger.getLogger("goog.net.xpc");
goog.Uri = function(a, b) {
  var c;
  a instanceof goog.Uri ? (this.setIgnoreCase(null == b ? a.getIgnoreCase() : b), this.setScheme(a.getScheme()), this.setUserInfo(a.getUserInfo()), this.setDomain(a.getDomain()), this.setPort(a.getPort()), this.setPath(a.getPath()), this.setQueryData(a.getQueryData().clone()), this.setFragment(a.getFragment())) : a && (c = goog.uri.utils.split("" + a)) ? (this.setIgnoreCase(!!b), this.setScheme(c[goog.uri.utils.ComponentIndex.SCHEME] || "", !0), this.setUserInfo(c[goog.uri.utils.ComponentIndex.USER_INFO] || 
  "", !0), this.setDomain(c[goog.uri.utils.ComponentIndex.DOMAIN] || "", !0), this.setPort(c[goog.uri.utils.ComponentIndex.PORT]), this.setPath(c[goog.uri.utils.ComponentIndex.PATH] || "", !0), this.setQuery(c[goog.uri.utils.ComponentIndex.QUERY_DATA] || "", !0), this.setFragment(c[goog.uri.utils.ComponentIndex.FRAGMENT] || "", !0)) : (this.setIgnoreCase(!!b), this.queryData_ = new goog.Uri.QueryData(null, this, this.ignoreCase_))
};
goog.Uri.RANDOM_PARAM = goog.uri.utils.StandardQueryParam.RANDOM;
goog.Uri.prototype.scheme_ = "";
goog.Uri.prototype.userInfo_ = "";
goog.Uri.prototype.domain_ = "";
goog.Uri.prototype.port_ = null;
goog.Uri.prototype.path_ = "";
goog.Uri.prototype.fragment_ = "";
goog.Uri.prototype.isReadOnly_ = !1;
goog.Uri.prototype.ignoreCase_ = !1;
goog.Uri.prototype.toString = function() {
  if(this.cachedToString_) {
    return this.cachedToString_
  }
  var a = [];
  this.scheme_ && a.push(goog.Uri.encodeSpecialChars_(this.scheme_, goog.Uri.reDisallowedInSchemeOrUserInfo_), ":");
  this.domain_ && (a.push("//"), this.userInfo_ && a.push(goog.Uri.encodeSpecialChars_(this.userInfo_, goog.Uri.reDisallowedInSchemeOrUserInfo_), "@"), a.push(goog.Uri.encodeString_(this.domain_)), null != this.port_ && a.push(":", "" + this.getPort()));
  this.path_ && (this.hasDomain() && "/" != this.path_.charAt(0) && a.push("/"), a.push(goog.Uri.encodeSpecialChars_(this.path_, goog.Uri.reDisallowedInPath_)));
  var b = "" + this.queryData_;
  b && a.push("?", b);
  this.fragment_ && a.push("#", goog.Uri.encodeSpecialChars_(this.fragment_, goog.Uri.reDisallowedInFragment_));
  return this.cachedToString_ = a.join("")
};
goog.Uri.prototype.resolve = function(a) {
  var b = this.clone(), c = a.hasScheme();
  c ? b.setScheme(a.getScheme()) : c = a.hasUserInfo();
  c ? b.setUserInfo(a.getUserInfo()) : c = a.hasDomain();
  c ? b.setDomain(a.getDomain()) : c = a.hasPort();
  var d = a.getPath();
  if(c) {
    b.setPort(a.getPort())
  }else {
    if(c = a.hasPath()) {
      if("/" != d.charAt(0)) {
        if(this.hasDomain() && !this.hasPath()) {
          d = "/" + d
        }else {
          var e = b.getPath().lastIndexOf("/");
          -1 != e && (d = b.getPath().substr(0, e + 1) + d)
        }
      }
      d = goog.Uri.removeDotSegments(d)
    }
  }
  c ? b.setPath(d) : c = a.hasQuery();
  c ? b.setQuery(a.getDecodedQuery()) : c = a.hasFragment();
  c && b.setFragment(a.getFragment());
  return b
};
goog.Uri.prototype.clone = function() {
  return goog.Uri.create(this.scheme_, this.userInfo_, this.domain_, this.port_, this.path_, this.queryData_.clone(), this.fragment_, this.ignoreCase_)
};
goog.Uri.prototype.getScheme = function() {
  return this.scheme_
};
goog.Uri.prototype.setScheme = function(a, b) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  if(this.scheme_ = b ? goog.Uri.decodeOrEmpty_(a) : a) {
    this.scheme_ = this.scheme_.replace(/:$/, "")
  }
  return this
};
goog.Uri.prototype.hasScheme = function() {
  return!!this.scheme_
};
goog.Uri.prototype.getUserInfo = function() {
  return this.userInfo_
};
goog.Uri.prototype.setUserInfo = function(a, b) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.userInfo_ = b ? goog.Uri.decodeOrEmpty_(a) : a;
  return this
};
goog.Uri.prototype.hasUserInfo = function() {
  return!!this.userInfo_
};
goog.Uri.prototype.getDomain = function() {
  return this.domain_
};
goog.Uri.prototype.setDomain = function(a, b) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.domain_ = b ? goog.Uri.decodeOrEmpty_(a) : a;
  return this
};
goog.Uri.prototype.hasDomain = function() {
  return!!this.domain_
};
goog.Uri.prototype.getPort = function() {
  return this.port_
};
goog.Uri.prototype.setPort = function(a) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  if(a) {
    a = Number(a);
    if(isNaN(a) || 0 > a) {
      throw Error("Bad port number " + a);
    }
    this.port_ = a
  }else {
    this.port_ = null
  }
  return this
};
goog.Uri.prototype.hasPort = function() {
  return null != this.port_
};
goog.Uri.prototype.getPath = function() {
  return this.path_
};
goog.Uri.prototype.setPath = function(a, b) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.path_ = b ? goog.Uri.decodeOrEmpty_(a) : a;
  return this
};
goog.Uri.prototype.hasPath = function() {
  return!!this.path_
};
goog.Uri.prototype.hasQuery = function() {
  return"" !== this.queryData_.toString()
};
goog.Uri.prototype.setQueryData = function(a, b) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  a instanceof goog.Uri.QueryData ? (this.queryData_ = a, this.queryData_.uri_ = this, this.queryData_.setIgnoreCase(this.ignoreCase_)) : (b || (a = goog.Uri.encodeSpecialChars_(a, goog.Uri.reDisallowedInQuery_)), this.queryData_ = new goog.Uri.QueryData(a, this, this.ignoreCase_));
  return this
};
goog.Uri.prototype.setQuery = function(a, b) {
  return this.setQueryData(a, b)
};
goog.Uri.prototype.getEncodedQuery = function() {
  return this.queryData_.toString()
};
goog.Uri.prototype.getDecodedQuery = function() {
  return this.queryData_.toDecodedString()
};
goog.Uri.prototype.getQueryData = function() {
  return this.queryData_
};
goog.Uri.prototype.getQuery = function() {
  return this.getEncodedQuery()
};
goog.Uri.prototype.setParameterValue = function(a, b) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.queryData_.set(a, b);
  return this
};
goog.Uri.prototype.setParameterValues = function(a, b) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  goog.isArray(b) || (b = ["" + b]);
  this.queryData_.setValues(a, b);
  return this
};
goog.Uri.prototype.getParameterValues = function(a) {
  return this.queryData_.getValues(a)
};
goog.Uri.prototype.getParameterValue = function(a) {
  return this.queryData_.get(a)
};
goog.Uri.prototype.getFragment = function() {
  return this.fragment_
};
goog.Uri.prototype.setFragment = function(a, b) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.fragment_ = b ? goog.Uri.decodeOrEmpty_(a) : a;
  return this
};
goog.Uri.prototype.hasFragment = function() {
  return!!this.fragment_
};
goog.Uri.prototype.hasSameDomainAs = function(a) {
  return(!this.hasDomain() && !a.hasDomain() || this.getDomain() == a.getDomain()) && (!this.hasPort() && !a.hasPort() || this.getPort() == a.getPort())
};
goog.Uri.prototype.makeUnique = function() {
  this.enforceReadOnly();
  this.setParameterValue(goog.Uri.RANDOM_PARAM, goog.string.getRandomString());
  return this
};
goog.Uri.prototype.removeParameter = function(a) {
  this.enforceReadOnly();
  this.queryData_.remove(a);
  return this
};
goog.Uri.prototype.setReadOnly = function(a) {
  this.isReadOnly_ = a;
  return this
};
goog.Uri.prototype.isReadOnly = function() {
  return this.isReadOnly_
};
goog.Uri.prototype.enforceReadOnly = function() {
  if(this.isReadOnly_) {
    throw Error("Tried to modify a read-only Uri");
  }
};
goog.Uri.prototype.setIgnoreCase = function(a) {
  this.ignoreCase_ = a;
  this.queryData_ && this.queryData_.setIgnoreCase(a);
  return this
};
goog.Uri.prototype.getIgnoreCase = function() {
  return this.ignoreCase_
};
goog.Uri.parse = function(a, b) {
  return a instanceof goog.Uri ? a.clone() : new goog.Uri(a, b)
};
goog.Uri.create = function(a, b, c, d, e, f, g, h) {
  h = new goog.Uri(null, h);
  a && h.setScheme(a);
  b && h.setUserInfo(b);
  c && h.setDomain(c);
  d && h.setPort(d);
  e && h.setPath(e);
  f && h.setQueryData(f);
  g && h.setFragment(g);
  return h
};
goog.Uri.resolve = function(a, b) {
  a instanceof goog.Uri || (a = goog.Uri.parse(a));
  b instanceof goog.Uri || (b = goog.Uri.parse(b));
  return a.resolve(b)
};
goog.Uri.removeDotSegments = function(a) {
  if(".." == a || "." == a) {
    return""
  }
  if(!goog.string.contains(a, "./") && !goog.string.contains(a, "/.")) {
    return a
  }
  for(var b = goog.string.startsWith(a, "/"), a = a.split("/"), c = [], d = 0;d < a.length;) {
    var e = a[d++];
    "." == e ? b && d == a.length && c.push("") : ".." == e ? ((1 < c.length || 1 == c.length && "" != c[0]) && c.pop(), b && d == a.length && c.push("")) : (c.push(e), b = !0)
  }
  return c.join("/")
};
goog.Uri.decodeOrEmpty_ = function(a) {
  return a ? decodeURIComponent(a) : ""
};
goog.Uri.encodeString_ = function(a) {
  return goog.isString(a) ? encodeURIComponent(a) : null
};
goog.Uri.encodeSpecialRegExp_ = /^[a-zA-Z0-9\-_.!~*'():\/;?]*$/;
goog.Uri.encodeSpecialChars_ = function(a, b) {
  var c = null;
  goog.isString(a) && (c = a, goog.Uri.encodeSpecialRegExp_.test(c) || (c = encodeURI(a)), 0 <= c.search(b) && (c = c.replace(b, goog.Uri.encodeChar_)));
  return c
};
goog.Uri.encodeChar_ = function(a) {
  a = a.charCodeAt(0);
  return"%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
};
goog.Uri.reDisallowedInSchemeOrUserInfo_ = /[#\/\?@]/g;
goog.Uri.reDisallowedInPath_ = /[\#\?]/g;
goog.Uri.reDisallowedInQuery_ = /[\#\?@]/g;
goog.Uri.reDisallowedInFragment_ = /#/g;
goog.Uri.haveSameDomain = function(a, b) {
  var c = goog.uri.utils.split(a), d = goog.uri.utils.split(b);
  return c[goog.uri.utils.ComponentIndex.DOMAIN] == d[goog.uri.utils.ComponentIndex.DOMAIN] && c[goog.uri.utils.ComponentIndex.PORT] == d[goog.uri.utils.ComponentIndex.PORT]
};
goog.Uri.QueryData = function(a, b, c) {
  this.encodedQuery_ = a || null;
  this.uri_ = b || null;
  this.ignoreCase_ = !!c
};
goog.Uri.QueryData.prototype.ensureKeyMapInitialized_ = function() {
  if(!this.keyMap_ && (this.keyMap_ = new goog.structs.Map, this.encodedQuery_)) {
    for(var a = this.encodedQuery_.split("&"), b = 0;b < a.length;b++) {
      var c = a[b].indexOf("="), d = null, e = null;
      0 <= c ? (d = a[b].substring(0, c), e = a[b].substring(c + 1)) : d = a[b];
      d = goog.string.urlDecode(d);
      d = this.getKeyName_(d);
      this.add(d, e ? goog.string.urlDecode(e) : "")
    }
  }
};
goog.Uri.QueryData.createFromMap = function(a, b, c) {
  var d = goog.structs.getKeys(a);
  if("undefined" == typeof d) {
    throw Error("Keys are undefined");
  }
  return goog.Uri.QueryData.createFromKeysValues(d, goog.structs.getValues(a), b, c)
};
goog.Uri.QueryData.createFromKeysValues = function(a, b, c, d) {
  if(a.length != b.length) {
    throw Error("Mismatched lengths for keys/values");
  }
  c = new goog.Uri.QueryData(null, c, d);
  for(d = 0;d < a.length;d++) {
    c.add(a[d], b[d])
  }
  return c
};
goog.Uri.QueryData.prototype.keyMap_ = null;
goog.Uri.QueryData.prototype.count_ = null;
goog.Uri.QueryData.decodedQuery_ = null;
goog.Uri.QueryData.prototype.getCount = function() {
  this.ensureKeyMapInitialized_();
  return this.count_
};
goog.Uri.QueryData.prototype.add = function(a, b) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  a = this.getKeyName_(a);
  if(this.containsKey(a)) {
    var c = this.keyMap_.get(a);
    goog.isArray(c) ? c.push(b) : this.keyMap_.set(a, [c, b])
  }else {
    this.keyMap_.set(a, b)
  }
  this.count_++;
  return this
};
goog.Uri.QueryData.prototype.remove = function(a) {
  this.ensureKeyMapInitialized_();
  a = this.getKeyName_(a);
  if(this.keyMap_.containsKey(a)) {
    this.invalidateCache_();
    var b = this.keyMap_.get(a);
    goog.isArray(b) ? this.count_ -= b.length : this.count_--;
    return this.keyMap_.remove(a)
  }
  return!1
};
goog.Uri.QueryData.prototype.clear = function() {
  this.invalidateCache_();
  this.keyMap_ && this.keyMap_.clear();
  this.count_ = 0
};
goog.Uri.QueryData.prototype.isEmpty = function() {
  this.ensureKeyMapInitialized_();
  return 0 == this.count_
};
goog.Uri.QueryData.prototype.containsKey = function(a) {
  this.ensureKeyMapInitialized_();
  a = this.getKeyName_(a);
  return this.keyMap_.containsKey(a)
};
goog.Uri.QueryData.prototype.containsValue = function(a) {
  var b = this.getValues();
  return goog.array.contains(b, a)
};
goog.Uri.QueryData.prototype.getKeys = function() {
  this.ensureKeyMapInitialized_();
  for(var a = this.keyMap_.getValues(), b = this.keyMap_.getKeys(), c = [], d = 0;d < b.length;d++) {
    var e = a[d];
    if(goog.isArray(e)) {
      for(var f = 0;f < e.length;f++) {
        c.push(b[d])
      }
    }else {
      c.push(b[d])
    }
  }
  return c
};
goog.Uri.QueryData.prototype.getValues = function(a) {
  this.ensureKeyMapInitialized_();
  if(a) {
    if(a = this.getKeyName_(a), this.containsKey(a)) {
      var b = this.keyMap_.get(a);
      if(goog.isArray(b)) {
        return b
      }
      a = [];
      a.push(b)
    }else {
      a = []
    }
  }else {
    for(var b = this.keyMap_.getValues(), a = [], c = 0;c < b.length;c++) {
      var d = b[c];
      goog.isArray(d) ? goog.array.extend(a, d) : a.push(d)
    }
  }
  return a
};
goog.Uri.QueryData.prototype.set = function(a, b) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  a = this.getKeyName_(a);
  if(this.containsKey(a)) {
    var c = this.keyMap_.get(a);
    goog.isArray(c) ? this.count_ -= c.length : this.count_--
  }
  this.keyMap_.set(a, b);
  this.count_++;
  return this
};
goog.Uri.QueryData.prototype.get = function(a, b) {
  this.ensureKeyMapInitialized_();
  a = this.getKeyName_(a);
  if(this.containsKey(a)) {
    var c = this.keyMap_.get(a);
    return goog.isArray(c) ? c[0] : c
  }
  return b
};
goog.Uri.QueryData.prototype.setValues = function(a, b) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  a = this.getKeyName_(a);
  if(this.containsKey(a)) {
    var c = this.keyMap_.get(a);
    goog.isArray(c) ? this.count_ -= c.length : this.count_--
  }
  0 < b.length && (this.keyMap_.set(a, b), this.count_ += b.length)
};
goog.Uri.QueryData.prototype.toString = function() {
  if(this.encodedQuery_) {
    return this.encodedQuery_
  }
  if(!this.keyMap_) {
    return""
  }
  for(var a = [], b = 0, c = this.keyMap_.getKeys(), d = 0;d < c.length;d++) {
    var e = c[d], f = goog.string.urlEncode(e), e = this.keyMap_.get(e);
    if(goog.isArray(e)) {
      for(var g = 0;g < e.length;g++) {
        0 < b && a.push("&"), a.push(f), "" !== e[g] && a.push("=", goog.string.urlEncode(e[g])), b++
      }
    }else {
      0 < b && a.push("&"), a.push(f), "" !== e && a.push("=", goog.string.urlEncode(e)), b++
    }
  }
  return this.encodedQuery_ = a.join("")
};
goog.Uri.QueryData.prototype.toDecodedString = function() {
  if(!this.decodedQuery_) {
    this.decodedQuery_ = goog.Uri.decodeOrEmpty_(this.toString())
  }
  return this.decodedQuery_
};
goog.Uri.QueryData.prototype.invalidateCache_ = function() {
  delete this.decodedQuery_;
  delete this.encodedQuery_;
  this.uri_ && delete this.uri_.cachedToString_
};
goog.Uri.QueryData.prototype.filterKeys = function(a) {
  this.ensureKeyMapInitialized_();
  goog.structs.forEach(this.keyMap_, function(b, c) {
    goog.array.contains(a, c) || this.remove(c)
  }, this);
  return this
};
goog.Uri.QueryData.prototype.clone = function() {
  var a = new goog.Uri.QueryData;
  if(this.decodedQuery_) {
    a.decodedQuery_ = this.decodedQuery_
  }
  if(this.encodedQuery_) {
    a.encodedQuery_ = this.encodedQuery_
  }
  if(this.keyMap_) {
    a.keyMap_ = this.keyMap_.clone()
  }
  return a
};
goog.Uri.QueryData.prototype.getKeyName_ = function(a) {
  a = "" + a;
  this.ignoreCase_ && (a = a.toLowerCase());
  return a
};
goog.Uri.QueryData.prototype.setIgnoreCase = function(a) {
  a && !this.ignoreCase_ && (this.ensureKeyMapInitialized_(), this.invalidateCache_(), goog.structs.forEach(this.keyMap_, function(a, c) {
    var d = c.toLowerCase();
    c != d && (this.remove(c), this.add(d, a))
  }, this));
  this.ignoreCase_ = a
};
goog.Uri.QueryData.prototype.extend = function(a) {
  for(var b = 0;b < arguments.length;b++) {
    goog.structs.forEach(arguments[b], function(a, b) {
      this.add(b, a)
    }, this)
  }
};
goog.net.xpc.Transport = function(a) {
  goog.Disposable.call(this);
  this.domHelper_ = a || goog.dom.getDomHelper()
};
goog.inherits(goog.net.xpc.Transport, goog.Disposable);
goog.net.xpc.Transport.prototype.transportType = 0;
goog.net.xpc.Transport.prototype.getType = function() {
  return this.transportType
};
goog.net.xpc.Transport.prototype.getWindow = function() {
  return this.domHelper_.getWindow()
};
goog.net.xpc.Transport.prototype.getName = function() {
  return goog.net.xpc.TransportNames[this.transportType] || ""
};
goog.net.xpc.FrameElementMethodTransport = function(a, b) {
  goog.net.xpc.Transport.call(this, b);
  this.channel_ = a;
  this.queue_ = [];
  this.deliverQueuedCb_ = goog.bind(this.deliverQueued_, this)
};
goog.inherits(goog.net.xpc.FrameElementMethodTransport, goog.net.xpc.Transport);
goog.net.xpc.FrameElementMethodTransport.prototype.transportType = goog.net.xpc.TransportTypes.FRAME_ELEMENT_METHOD;
goog.net.xpc.FrameElementMethodTransport.prototype.recursive_ = !1;
goog.net.xpc.FrameElementMethodTransport.prototype.timer_ = 0;
goog.net.xpc.FrameElementMethodTransport.outgoing_ = null;
goog.net.xpc.FrameElementMethodTransport.prototype.connect = function() {
  this.channel_.getRole() == goog.net.xpc.CrossPageChannel.Role.OUTER ? (this.iframeElm_ = this.channel_.iframeElement_, this.iframeElm_.XPC_toOuter = goog.bind(this.incoming_, this)) : this.attemptSetup_()
};
goog.net.xpc.FrameElementMethodTransport.prototype.attemptSetup_ = function() {
  var a = !0;
  try {
    if(!this.iframeElm_) {
      this.iframeElm_ = this.getWindow().frameElement
    }
    if(this.iframeElm_ && this.iframeElm_.XPC_toOuter) {
      this.outgoing_ = this.iframeElm_.XPC_toOuter, this.iframeElm_.XPC_toOuter.XPC_toInner = goog.bind(this.incoming_, this), a = !1, this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP_ACK_), this.channel_.notifyConnected_()
    }
  }catch(b) {
    goog.net.xpc.logger.severe("exception caught while attempting setup: " + b)
  }
  if(a) {
    if(!this.attemptSetupCb_) {
      this.attemptSetupCb_ = goog.bind(this.attemptSetup_, this)
    }
    this.getWindow().setTimeout(this.attemptSetupCb_, 100)
  }
};
goog.net.xpc.FrameElementMethodTransport.prototype.transportServiceHandler = function(a) {
  if(this.channel_.getRole() == goog.net.xpc.CrossPageChannel.Role.OUTER && !this.channel_.isConnected() && a == goog.net.xpc.SETUP_ACK_) {
    this.outgoing_ = this.iframeElm_.XPC_toOuter.XPC_toInner, this.channel_.notifyConnected_()
  }else {
    throw Error("Got unexpected transport message.");
  }
};
goog.net.xpc.FrameElementMethodTransport.prototype.incoming_ = function(a, b) {
  if(!this.recursive_ && 0 == this.queue_.length) {
    this.channel_.deliver_(a, b)
  }else {
    if(this.queue_.push({serviceName:a, payload:b}), 1 == this.queue_.length) {
      this.timer_ = this.getWindow().setTimeout(this.deliverQueuedCb_, 1)
    }
  }
};
goog.net.xpc.FrameElementMethodTransport.prototype.deliverQueued_ = function() {
  for(;this.queue_.length;) {
    var a = this.queue_.shift();
    this.channel_.deliver_(a.serviceName, a.payload)
  }
};
goog.net.xpc.FrameElementMethodTransport.prototype.send = function(a, b) {
  this.recursive_ = !0;
  this.outgoing_(a, b);
  this.recursive_ = !1
};
goog.net.xpc.FrameElementMethodTransport.prototype.disposeInternal = function() {
  goog.net.xpc.FrameElementMethodTransport.superClass_.disposeInternal.call(this);
  this.iframeElm_ = this.outgoing_ = null
};
goog.math.Box = function(a, b, c, d) {
  this.top = a;
  this.right = b;
  this.bottom = c;
  this.left = d
};
goog.math.Box.boundingBox = function(a) {
  for(var b = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x), c = 1;c < arguments.length;c++) {
    var d = arguments[c];
    b.top = Math.min(b.top, d.y);
    b.right = Math.max(b.right, d.x);
    b.bottom = Math.max(b.bottom, d.y);
    b.left = Math.min(b.left, d.x)
  }
  return b
};
goog.math.Box.prototype.clone = function() {
  return new goog.math.Box(this.top, this.right, this.bottom, this.left)
};
if(goog.DEBUG) {
  goog.math.Box.prototype.toString = function() {
    return"(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
  }
}
goog.math.Box.prototype.contains = function(a) {
  return goog.math.Box.contains(this, a)
};
goog.math.Box.prototype.expand = function(a, b, c, d) {
  goog.isObject(a) ? (this.top -= a.top, this.right += a.right, this.bottom += a.bottom, this.left -= a.left) : (this.top -= a, this.right += b, this.bottom += c, this.left -= d);
  return this
};
goog.math.Box.prototype.expandToInclude = function(a) {
  this.left = Math.min(this.left, a.left);
  this.top = Math.min(this.top, a.top);
  this.right = Math.max(this.right, a.right);
  this.bottom = Math.max(this.bottom, a.bottom)
};
goog.math.Box.equals = function(a, b) {
  return a == b ? !0 : !a || !b ? !1 : a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left
};
goog.math.Box.contains = function(a, b) {
  return!a || !b ? !1 : b instanceof goog.math.Box ? b.left >= a.left && b.right <= a.right && b.top >= a.top && b.bottom <= a.bottom : b.x >= a.left && b.x <= a.right && b.y >= a.top && b.y <= a.bottom
};
goog.math.Box.distance = function(a, b) {
  return b.x >= a.left && b.x <= a.right ? b.y >= a.top && b.y <= a.bottom ? 0 : b.y < a.top ? a.top - b.y : b.y - a.bottom : b.y >= a.top && b.y <= a.bottom ? b.x < a.left ? a.left - b.x : b.x - a.right : goog.math.Coordinate.distance(b, new goog.math.Coordinate(b.x < a.left ? a.left : a.right, b.y < a.top ? a.top : a.bottom))
};
goog.math.Box.intersects = function(a, b) {
  return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom
};
goog.math.Box.intersectsWithPadding = function(a, b, c) {
  return a.left <= b.right + c && b.left <= a.right + c && a.top <= b.bottom + c && b.top <= a.bottom + c
};
goog.math.Rect = function(a, b, c, d) {
  this.left = a;
  this.top = b;
  this.width = c;
  this.height = d
};
goog.math.Rect.prototype.clone = function() {
  return new goog.math.Rect(this.left, this.top, this.width, this.height)
};
goog.math.Rect.prototype.toBox = function() {
  return new goog.math.Box(this.top, this.left + this.width, this.top + this.height, this.left)
};
goog.math.Rect.createFromBox = function(a) {
  return new goog.math.Rect(a.left, a.top, a.right - a.left, a.bottom - a.top)
};
if(goog.DEBUG) {
  goog.math.Rect.prototype.toString = function() {
    return"(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
  }
}
goog.math.Rect.equals = function(a, b) {
  return a == b ? !0 : !a || !b ? !1 : a.left == b.left && a.width == b.width && a.top == b.top && a.height == b.height
};
goog.math.Rect.prototype.intersection = function(a) {
  var b = Math.max(this.left, a.left), c = Math.min(this.left + this.width, a.left + a.width);
  if(b <= c) {
    var d = Math.max(this.top, a.top), a = Math.min(this.top + this.height, a.top + a.height);
    if(d <= a) {
      return this.left = b, this.top = d, this.width = c - b, this.height = a - d, !0
    }
  }
  return!1
};
goog.math.Rect.intersection = function(a, b) {
  var c = Math.max(a.left, b.left), d = Math.min(a.left + a.width, b.left + b.width);
  if(c <= d) {
    var e = Math.max(a.top, b.top), f = Math.min(a.top + a.height, b.top + b.height);
    if(e <= f) {
      return new goog.math.Rect(c, e, d - c, f - e)
    }
  }
  return null
};
goog.math.Rect.intersects = function(a, b) {
  return a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height
};
goog.math.Rect.prototype.intersects = function(a) {
  return goog.math.Rect.intersects(this, a)
};
goog.math.Rect.difference = function(a, b) {
  var c = goog.math.Rect.intersection(a, b);
  if(!c || !c.height || !c.width) {
    return[a.clone()]
  }
  var c = [], d = a.top, e = a.height, f = a.left + a.width, g = a.top + a.height, h = b.left + b.width, i = b.top + b.height;
  if(b.top > a.top) {
    c.push(new goog.math.Rect(a.left, a.top, a.width, b.top - a.top)), d = b.top, e -= b.top - a.top
  }
  i < g && (c.push(new goog.math.Rect(a.left, i, a.width, g - i)), e = i - d);
  b.left > a.left && c.push(new goog.math.Rect(a.left, d, b.left - a.left, e));
  h < f && c.push(new goog.math.Rect(h, d, f - h, e));
  return c
};
goog.math.Rect.prototype.difference = function(a) {
  return goog.math.Rect.difference(this, a)
};
goog.math.Rect.prototype.boundingRect = function(a) {
  var b = Math.max(this.left + this.width, a.left + a.width), c = Math.max(this.top + this.height, a.top + a.height);
  this.left = Math.min(this.left, a.left);
  this.top = Math.min(this.top, a.top);
  this.width = b - this.left;
  this.height = c - this.top
};
goog.math.Rect.boundingRect = function(a, b) {
  if(!a || !b) {
    return null
  }
  var c = a.clone();
  c.boundingRect(b);
  return c
};
goog.math.Rect.prototype.contains = function(a) {
  return a instanceof goog.math.Rect ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height
};
goog.math.Rect.prototype.getSize = function() {
  return new goog.math.Size(this.width, this.height)
};
goog.style = {};
goog.style.setStyle = function(a, b, c) {
  goog.isString(b) ? goog.style.setStyle_(a, c, b) : goog.object.forEach(b, goog.partial(goog.style.setStyle_, a))
};
goog.style.setStyle_ = function(a, b, c) {
  a.style[goog.string.toCamelCase(c)] = b
};
goog.style.getStyle = function(a, b) {
  return a.style[goog.string.toCamelCase(b)] || ""
};
goog.style.getComputedStyle = function(a, b) {
  var c = goog.dom.getOwnerDocument(a);
  return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null)) ? c[b] || c.getPropertyValue(b) : ""
};
goog.style.getCascadedStyle = function(a, b) {
  return a.currentStyle ? a.currentStyle[b] : null
};
goog.style.getStyle_ = function(a, b) {
  return goog.style.getComputedStyle(a, b) || goog.style.getCascadedStyle(a, b) || a.style[b]
};
goog.style.getComputedPosition = function(a) {
  return goog.style.getStyle_(a, "position")
};
goog.style.getBackgroundColor = function(a) {
  return goog.style.getStyle_(a, "backgroundColor")
};
goog.style.getComputedOverflowX = function(a) {
  return goog.style.getStyle_(a, "overflowX")
};
goog.style.getComputedOverflowY = function(a) {
  return goog.style.getStyle_(a, "overflowY")
};
goog.style.getComputedZIndex = function(a) {
  return goog.style.getStyle_(a, "zIndex")
};
goog.style.getComputedTextAlign = function(a) {
  return goog.style.getStyle_(a, "textAlign")
};
goog.style.getComputedCursor = function(a) {
  return goog.style.getStyle_(a, "cursor")
};
goog.style.setPosition = function(a, b, c) {
  var d, e = goog.userAgent.GECKO && (goog.userAgent.MAC || goog.userAgent.X11) && goog.userAgent.isVersion("1.9");
  b instanceof goog.math.Coordinate ? (d = b.x, b = b.y) : (d = b, b = c);
  a.style.left = goog.style.getPixelStyleValue_(d, e);
  a.style.top = goog.style.getPixelStyleValue_(b, e)
};
goog.style.getPosition = function(a) {
  return new goog.math.Coordinate(a.offsetLeft, a.offsetTop)
};
goog.style.getClientViewportElement = function(a) {
  a = a ? a.nodeType == goog.dom.NodeType.DOCUMENT ? a : goog.dom.getOwnerDocument(a) : goog.dom.getDocument();
  return goog.userAgent.IE && !goog.userAgent.isVersion(9) && !goog.dom.getDomHelper(a).isCss1CompatMode() ? a.body : a.documentElement
};
goog.style.getBoundingClientRect_ = function(a) {
  var b = a.getBoundingClientRect();
  if(goog.userAgent.IE) {
    a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop
  }
  return b
};
goog.style.getOffsetParent = function(a) {
  if(goog.userAgent.IE) {
    return a.offsetParent
  }
  for(var b = goog.dom.getOwnerDocument(a), c = goog.style.getStyle_(a, "position"), d = "fixed" == c || "absolute" == c, a = a.parentNode;a && a != b;a = a.parentNode) {
    if(c = goog.style.getStyle_(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c)) {
      return a
    }
  }
  return null
};
goog.style.getVisibleRectForElement = function(a) {
  for(var b = new goog.math.Box(0, Infinity, Infinity, 0), c = goog.dom.getDomHelper(a), d = c.getDocument().body, e = c.getDocumentScrollElement(), f;a = goog.style.getOffsetParent(a);) {
    if((!goog.userAgent.IE || 0 != a.clientWidth) && (!goog.userAgent.WEBKIT || 0 != a.clientHeight || a != d) && (a.scrollWidth != a.clientWidth || a.scrollHeight != a.clientHeight) && "visible" != goog.style.getStyle_(a, "overflow")) {
      var g = goog.style.getPageOffset(a), h = goog.style.getClientLeftTop(a);
      g.x += h.x;
      g.y += h.y;
      b.top = Math.max(b.top, g.y);
      b.right = Math.min(b.right, g.x + a.clientWidth);
      b.bottom = Math.min(b.bottom, g.y + a.clientHeight);
      b.left = Math.max(b.left, g.x);
      f = f || a != e
    }
  }
  d = e.scrollLeft;
  e = e.scrollTop;
  goog.userAgent.WEBKIT ? (b.left += d, b.top += e) : (b.left = Math.max(b.left, d), b.top = Math.max(b.top, e));
  if(!f || goog.userAgent.WEBKIT) {
    b.right += d, b.bottom += e
  }
  c = c.getViewportSize();
  b.right = Math.min(b.right, d + c.width);
  b.bottom = Math.min(b.bottom, e + c.height);
  return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null
};
goog.style.scrollIntoContainerView = function(a, b, c) {
  var d = goog.style.getPageOffset(a), e = goog.style.getPageOffset(b), f = goog.style.getBorderBox(b), g = d.x - e.x - f.left, d = d.y - e.y - f.top, e = b.clientWidth - a.offsetWidth, a = b.clientHeight - a.offsetHeight;
  c ? (b.scrollLeft += g - e / 2, b.scrollTop += d - a / 2) : (b.scrollLeft += Math.min(g, Math.max(g - e, 0)), b.scrollTop += Math.min(d, Math.max(d - a, 0)))
};
goog.style.getClientLeftTop = function(a) {
  if(goog.userAgent.GECKO && !goog.userAgent.isVersion("1.9")) {
    var b = parseFloat(goog.style.getComputedStyle(a, "borderLeftWidth"));
    if(goog.style.isRightToLeft(a)) {
      var c = a.offsetWidth - a.clientWidth - b - parseFloat(goog.style.getComputedStyle(a, "borderRightWidth")), b = b + c
    }
    return new goog.math.Coordinate(b, parseFloat(goog.style.getComputedStyle(a, "borderTopWidth")))
  }
  return new goog.math.Coordinate(a.clientLeft, a.clientTop)
};
goog.style.getPageOffset = function(a) {
  var b, c = goog.dom.getOwnerDocument(a), d = goog.style.getStyle_(a, "position"), e = goog.userAgent.GECKO && c.getBoxObjectFor && !a.getBoundingClientRect && "absolute" == d && (b = c.getBoxObjectFor(a)) && (0 > b.screenX || 0 > b.screenY), f = new goog.math.Coordinate(0, 0), g = goog.style.getClientViewportElement(c);
  if(a == g) {
    return f
  }
  if(a.getBoundingClientRect) {
    b = goog.style.getBoundingClientRect_(a), a = goog.dom.getDomHelper(c).getDocumentScroll(), f.x = b.left + a.x, f.y = b.top + a.y
  }else {
    if(c.getBoxObjectFor && !e) {
      b = c.getBoxObjectFor(a), a = c.getBoxObjectFor(g), f.x = b.screenX - a.screenX, f.y = b.screenY - a.screenY
    }else {
      b = a;
      do {
        f.x += b.offsetLeft;
        f.y += b.offsetTop;
        b != a && (f.x += b.clientLeft || 0, f.y += b.clientTop || 0);
        if(goog.userAgent.WEBKIT && "fixed" == goog.style.getComputedPosition(b)) {
          f.x += c.body.scrollLeft;
          f.y += c.body.scrollTop;
          break
        }
        b = b.offsetParent
      }while(b && b != a);
      if(goog.userAgent.OPERA || goog.userAgent.WEBKIT && "absolute" == d) {
        f.y -= c.body.offsetTop
      }
      for(b = a;(b = goog.style.getOffsetParent(b)) && b != c.body && b != g;) {
        if(f.x -= b.scrollLeft, !goog.userAgent.OPERA || "TR" != b.tagName) {
          f.y -= b.scrollTop
        }
      }
    }
  }
  return f
};
goog.style.getPageOffsetLeft = function(a) {
  return goog.style.getPageOffset(a).x
};
goog.style.getPageOffsetTop = function(a) {
  return goog.style.getPageOffset(a).y
};
goog.style.getFramedPageOffset = function(a, b) {
  var c = new goog.math.Coordinate(0, 0), d = goog.dom.getWindow(goog.dom.getOwnerDocument(a)), e = a;
  do {
    var f = d == b ? goog.style.getPageOffset(e) : goog.style.getClientPosition(e);
    c.x += f.x;
    c.y += f.y
  }while(d && d != b && (e = d.frameElement) && (d = d.parent));
  return c
};
goog.style.translateRectForAnotherFrame = function(a, b, c) {
  if(b.getDocument() != c.getDocument()) {
    var d = b.getDocument().body, c = goog.style.getFramedPageOffset(d, c.getWindow()), c = goog.math.Coordinate.difference(c, goog.style.getPageOffset(d));
    goog.userAgent.IE && !b.isCss1CompatMode() && (c = goog.math.Coordinate.difference(c, b.getDocumentScroll()));
    a.left += c.x;
    a.top += c.y
  }
};
goog.style.getRelativePosition = function(a, b) {
  var c = goog.style.getClientPosition(a), d = goog.style.getClientPosition(b);
  return new goog.math.Coordinate(c.x - d.x, c.y - d.y)
};
goog.style.getClientPosition = function(a) {
  var b = new goog.math.Coordinate;
  if(a.nodeType == goog.dom.NodeType.ELEMENT) {
    if(a.getBoundingClientRect) {
      a = goog.style.getBoundingClientRect_(a), b.x = a.left, b.y = a.top
    }else {
      var c = goog.dom.getDomHelper(a).getDocumentScroll(), a = goog.style.getPageOffset(a);
      b.x = a.x - c.x;
      b.y = a.y - c.y
    }
  }else {
    var c = goog.isFunction(a.getBrowserEvent), d = a;
    a.targetTouches ? d = a.targetTouches[0] : c && a.getBrowserEvent().targetTouches && (d = a.getBrowserEvent().targetTouches[0]);
    b.x = d.clientX;
    b.y = d.clientY
  }
  return b
};
goog.style.setPageOffset = function(a, b, c) {
  var d = goog.style.getPageOffset(a);
  if(b instanceof goog.math.Coordinate) {
    c = b.y, b = b.x
  }
  goog.style.setPosition(a, a.offsetLeft + (b - d.x), a.offsetTop + (c - d.y))
};
goog.style.setSize = function(a, b, c) {
  if(b instanceof goog.math.Size) {
    c = b.height, b = b.width
  }else {
    if(void 0 == c) {
      throw Error("missing height argument");
    }
  }
  goog.style.setWidth(a, b);
  goog.style.setHeight(a, c)
};
goog.style.getPixelStyleValue_ = function(a, b) {
  "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
  return a
};
goog.style.setHeight = function(a, b) {
  a.style.height = goog.style.getPixelStyleValue_(b, !0)
};
goog.style.setWidth = function(a, b) {
  a.style.width = goog.style.getPixelStyleValue_(b, !0)
};
goog.style.getSize = function(a) {
  if("none" != goog.style.getStyle_(a, "display")) {
    return new goog.math.Size(a.offsetWidth, a.offsetHeight)
  }
  var b = a.style, c = b.display, d = b.visibility, e = b.position;
  b.visibility = "hidden";
  b.position = "absolute";
  b.display = "inline";
  var f = a.offsetWidth, a = a.offsetHeight;
  b.display = c;
  b.position = e;
  b.visibility = d;
  return new goog.math.Size(f, a)
};
goog.style.getBounds = function(a) {
  var b = goog.style.getPageOffset(a), a = goog.style.getSize(a);
  return new goog.math.Rect(b.x, b.y, a.width, a.height)
};
goog.style.toCamelCase = function(a) {
  return goog.string.toCamelCase("" + a)
};
goog.style.toSelectorCase = function(a) {
  return goog.string.toSelectorCase(a)
};
goog.style.getOpacity = function(a) {
  var b = a.style, a = "";
  "opacity" in b ? a = b.opacity : "MozOpacity" in b ? a = b.MozOpacity : "filter" in b && (b = b.filter.match(/alpha\(opacity=([\d.]+)\)/)) && (a = "" + b[1] / 100);
  return"" == a ? a : Number(a)
};
goog.style.setOpacity = function(a, b) {
  var c = a.style;
  if("opacity" in c) {
    c.opacity = b
  }else {
    if("MozOpacity" in c) {
      c.MozOpacity = b
    }else {
      if("filter" in c) {
        c.filter = "" === b ? "" : "alpha(opacity=" + 100 * b + ")"
      }
    }
  }
};
goog.style.setTransparentBackgroundImage = function(a, b) {
  var c = a.style;
  goog.userAgent.IE && !goog.userAgent.isVersion("8") ? c.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + b + '", sizingMethod="crop")' : (c.backgroundImage = "url(" + b + ")", c.backgroundPosition = "top left", c.backgroundRepeat = "no-repeat")
};
goog.style.clearTransparentBackgroundImage = function(a) {
  a = a.style;
  "filter" in a ? a.filter = "" : a.backgroundImage = "none"
};
goog.style.showElement = function(a, b) {
  a.style.display = b ? "" : "none"
};
goog.style.isElementShown = function(a) {
  return"none" != a.style.display
};
goog.style.installStyles = function(a, b) {
  var c = goog.dom.getDomHelper(b), d = null;
  if(goog.userAgent.IE) {
    d = c.getDocument().createStyleSheet(), goog.style.setStyles(d, a)
  }else {
    var e = c.getElementsByTagNameAndClass("head")[0];
    e || (d = c.getElementsByTagNameAndClass("body")[0], e = c.createDom("head"), d.parentNode.insertBefore(e, d));
    d = c.createDom("style");
    goog.style.setStyles(d, a);
    c.appendChild(e, d)
  }
  return d
};
goog.style.uninstallStyles = function(a) {
  goog.dom.removeNode(a.ownerNode || a.owningElement || a)
};
goog.style.setStyles = function(a, b) {
  goog.userAgent.IE ? a.cssText = b : a[goog.userAgent.WEBKIT ? "innerText" : "innerHTML"] = b
};
goog.style.setPreWrap = function(a) {
  a = a.style;
  goog.userAgent.IE && !goog.userAgent.isVersion("8") ? (a.whiteSpace = "pre", a.wordWrap = "break-word") : a.whiteSpace = goog.userAgent.GECKO ? "-moz-pre-wrap" : "pre-wrap"
};
goog.style.setInlineBlock = function(a) {
  a = a.style;
  a.position = "relative";
  goog.userAgent.IE && !goog.userAgent.isVersion("8") ? (a.zoom = "1", a.display = "inline") : a.display = goog.userAgent.GECKO ? goog.userAgent.isVersion("1.9a") ? "inline-block" : "-moz-inline-box" : "inline-block"
};
goog.style.isRightToLeft = function(a) {
  return"rtl" == goog.style.getStyle_(a, "direction")
};
goog.style.unselectableStyle_ = goog.userAgent.GECKO ? "MozUserSelect" : goog.userAgent.WEBKIT ? "WebkitUserSelect" : null;
goog.style.isUnselectable = function(a) {
  return goog.style.unselectableStyle_ ? "none" == a.style[goog.style.unselectableStyle_].toLowerCase() : goog.userAgent.IE || goog.userAgent.OPERA ? "on" == a.getAttribute("unselectable") : !1
};
goog.style.setUnselectable = function(a, b, c) {
  var c = !c ? a.getElementsByTagName("*") : null, d = goog.style.unselectableStyle_;
  if(d) {
    if(b = b ? "none" : "", a.style[d] = b, c) {
      for(var a = 0, e;e = c[a];a++) {
        e.style[d] = b
      }
    }
  }else {
    if(goog.userAgent.IE || goog.userAgent.OPERA) {
      if(b = b ? "on" : "", a.setAttribute("unselectable", b), c) {
        for(a = 0;e = c[a];a++) {
          e.setAttribute("unselectable", b)
        }
      }
    }
  }
};
goog.style.getBorderBoxSize = function(a) {
  return new goog.math.Size(a.offsetWidth, a.offsetHeight)
};
goog.style.setBorderBoxSize = function(a, b) {
  var c = goog.dom.getOwnerDocument(a), d = goog.dom.getDomHelper(c).isCss1CompatMode();
  if(goog.userAgent.IE && (!d || !goog.userAgent.isVersion("8"))) {
    if(c = a.style, d) {
      var d = goog.style.getPaddingBox(a), e = goog.style.getBorderBox(a);
      c.pixelWidth = b.width - e.left - d.left - d.right - e.right;
      c.pixelHeight = b.height - e.top - d.top - d.bottom - e.bottom
    }else {
      c.pixelWidth = b.width, c.pixelHeight = b.height
    }
  }else {
    goog.style.setBoxSizingSize_(a, b, "border-box")
  }
};
goog.style.getContentBoxSize = function(a) {
  var b = goog.dom.getOwnerDocument(a), c = goog.userAgent.IE && a.currentStyle;
  if(c && goog.dom.getDomHelper(b).isCss1CompatMode() && "auto" != c.width && "auto" != c.height && !c.boxSizing) {
    return b = goog.style.getIePixelValue_(a, c.width, "width", "pixelWidth"), a = goog.style.getIePixelValue_(a, c.height, "height", "pixelHeight"), new goog.math.Size(b, a)
  }
  c = goog.style.getBorderBoxSize(a);
  b = goog.style.getPaddingBox(a);
  a = goog.style.getBorderBox(a);
  return new goog.math.Size(c.width - a.left - b.left - b.right - a.right, c.height - a.top - b.top - b.bottom - a.bottom)
};
goog.style.setContentBoxSize = function(a, b) {
  var c = goog.dom.getOwnerDocument(a), d = goog.dom.getDomHelper(c).isCss1CompatMode();
  if(goog.userAgent.IE && (!d || !goog.userAgent.isVersion("8"))) {
    if(c = a.style, d) {
      c.pixelWidth = b.width, c.pixelHeight = b.height
    }else {
      var d = goog.style.getPaddingBox(a), e = goog.style.getBorderBox(a);
      c.pixelWidth = b.width + e.left + d.left + d.right + e.right;
      c.pixelHeight = b.height + e.top + d.top + d.bottom + e.bottom
    }
  }else {
    goog.style.setBoxSizingSize_(a, b, "content-box")
  }
};
goog.style.setBoxSizingSize_ = function(a, b, c) {
  a = a.style;
  goog.userAgent.GECKO ? a.MozBoxSizing = c : goog.userAgent.WEBKIT ? a.WebkitBoxSizing = c : a.boxSizing = c;
  a.width = b.width + "px";
  a.height = b.height + "px"
};
goog.style.getIePixelValue_ = function(a, b, c, d) {
  if(/^\d+px?$/.test(b)) {
    return parseInt(b, 10)
  }
  var e = a.style[c], f = a.runtimeStyle[c];
  a.runtimeStyle[c] = a.currentStyle[c];
  a.style[c] = b;
  b = a.style[d];
  a.style[c] = e;
  a.runtimeStyle[c] = f;
  return b
};
goog.style.getIePixelDistance_ = function(a, b) {
  return goog.style.getIePixelValue_(a, goog.style.getCascadedStyle(a, b), "left", "pixelLeft")
};
goog.style.getBox_ = function(a, b) {
  if(goog.userAgent.IE) {
    var c = goog.style.getIePixelDistance_(a, b + "Left"), d = goog.style.getIePixelDistance_(a, b + "Right"), e = goog.style.getIePixelDistance_(a, b + "Top"), f = goog.style.getIePixelDistance_(a, b + "Bottom");
    return new goog.math.Box(e, d, f, c)
  }
  c = goog.style.getComputedStyle(a, b + "Left");
  d = goog.style.getComputedStyle(a, b + "Right");
  e = goog.style.getComputedStyle(a, b + "Top");
  f = goog.style.getComputedStyle(a, b + "Bottom");
  return new goog.math.Box(parseFloat(e), parseFloat(d), parseFloat(f), parseFloat(c))
};
goog.style.getPaddingBox = function(a) {
  return goog.style.getBox_(a, "padding")
};
goog.style.getMarginBox = function(a) {
  return goog.style.getBox_(a, "margin")
};
goog.style.ieBorderWidthKeywords_ = {thin:2, medium:4, thick:6};
goog.style.getIePixelBorder_ = function(a, b) {
  if("none" == goog.style.getCascadedStyle(a, b + "Style")) {
    return 0
  }
  var c = goog.style.getCascadedStyle(a, b + "Width");
  return c in goog.style.ieBorderWidthKeywords_ ? goog.style.ieBorderWidthKeywords_[c] : goog.style.getIePixelValue_(a, c, "left", "pixelLeft")
};
goog.style.getBorderBox = function(a) {
  if(goog.userAgent.IE) {
    var b = goog.style.getIePixelBorder_(a, "borderLeft"), c = goog.style.getIePixelBorder_(a, "borderRight"), d = goog.style.getIePixelBorder_(a, "borderTop"), a = goog.style.getIePixelBorder_(a, "borderBottom");
    return new goog.math.Box(d, c, a, b)
  }
  b = goog.style.getComputedStyle(a, "borderLeftWidth");
  c = goog.style.getComputedStyle(a, "borderRightWidth");
  d = goog.style.getComputedStyle(a, "borderTopWidth");
  a = goog.style.getComputedStyle(a, "borderBottomWidth");
  return new goog.math.Box(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b))
};
goog.style.getFontFamily = function(a) {
  var b = goog.dom.getOwnerDocument(a), c = "";
  if(b.body.createTextRange) {
    b = b.body.createTextRange();
    b.moveToElementText(a);
    try {
      c = b.queryCommandValue("FontName")
    }catch(d) {
      c = ""
    }
  }
  c || (c = goog.style.getStyle_(a, "fontFamily"));
  a = c.split(",");
  1 < a.length && (c = a[0]);
  return goog.string.stripQuotes(c, "\"'")
};
goog.style.lengthUnitRegex_ = /[^\d]+$/;
goog.style.getLengthUnits = function(a) {
  return(a = a.match(goog.style.lengthUnitRegex_)) && a[0] || null
};
goog.style.ABSOLUTE_CSS_LENGTH_UNITS_ = {cm:1, "in":1, mm:1, pc:1, pt:1};
goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_ = {em:1, ex:1};
goog.style.getFontSize = function(a) {
  var b = goog.style.getStyle_(a, "fontSize"), c = goog.style.getLengthUnits(b);
  if(b && "px" == c) {
    return parseInt(b, 10)
  }
  if(goog.userAgent.IE) {
    if(c in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_) {
      return goog.style.getIePixelValue_(a, b, "left", "pixelLeft")
    }
    if(a.parentNode && a.parentNode.nodeType == goog.dom.NodeType.ELEMENT && c in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_) {
      return a = a.parentNode, c = goog.style.getStyle_(a, "fontSize"), goog.style.getIePixelValue_(a, b == c ? "1em" : b, "left", "pixelLeft")
    }
  }
  c = goog.dom.createDom("span", {style:"visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"});
  goog.dom.appendChild(a, c);
  b = c.offsetHeight;
  goog.dom.removeNode(c);
  return b
};
goog.style.parseStyleAttribute = function(a) {
  var b = {};
  goog.array.forEach(a.split(/\s*;\s*/), function(a) {
    a = a.split(/\s*:\s*/);
    2 == a.length && (b[goog.string.toCamelCase(a[0].toLowerCase())] = a[1])
  });
  return b
};
goog.style.toStyleAttribute = function(a) {
  var b = [];
  goog.object.forEach(a, function(a, d) {
    b.push(goog.string.toSelectorCase(d), ":", a, ";")
  });
  return b.join("")
};
goog.style.setFloat = function(a, b) {
  a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] = b
};
goog.style.getFloat = function(a) {
  return a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] || ""
};
goog.style.getScrollbarWidth = function() {
  var a = goog.dom.createElement("div");
  a.style.cssText = "visibility:hidden;overflow:scroll;position:absolute;top:0;width:100px;height:100px";
  goog.dom.appendChild(goog.dom.getDocument().body, a);
  var b = a.offsetWidth - a.clientWidth;
  goog.dom.removeNode(a);
  return b
};
goog.dom.forms = {};
goog.dom.forms.getFormDataMap = function(a) {
  var b = new goog.structs.Map;
  goog.dom.forms.getFormDataHelper_(a, b, goog.dom.forms.addFormDataToMap_);
  return b
};
goog.dom.forms.getFormDataString = function(a) {
  var b = [];
  goog.dom.forms.getFormDataHelper_(a, b, goog.dom.forms.addFormDataToStringBuffer_);
  return b.join("&")
};
goog.dom.forms.getFormDataHelper_ = function(a, b, c) {
  for(var d = a.elements, e, f = 0;e = d[f];f++) {
    if(!(e.disabled || "fieldset" == e.tagName.toLowerCase())) {
      var g = e.name;
      switch(e.type.toLowerCase()) {
        case "file":
        ;
        case "submit":
        ;
        case "reset":
        ;
        case "button":
          break;
        case "select-multiple":
          e = goog.dom.forms.getValue(e);
          if(null != e) {
            for(var h, i = 0;h = e[i];i++) {
              c(b, g, h)
            }
          }
          break;
        default:
          h = goog.dom.forms.getValue(e), null != h && c(b, g, h)
      }
    }
  }
  d = a.getElementsByTagName("input");
  for(f = 0;e = d[f];f++) {
    if(e.form == a && "image" == e.type.toLowerCase()) {
      g = e.name, c(b, g, e.value), c(b, g + ".x", "0"), c(b, g + ".y", "0")
    }
  }
};
goog.dom.forms.addFormDataToMap_ = function(a, b, c) {
  var d = a.get(b);
  d || (d = [], a.set(b, d));
  d.push(c)
};
goog.dom.forms.addFormDataToStringBuffer_ = function(a, b, c) {
  a.push(encodeURIComponent(b) + "=" + encodeURIComponent(c))
};
goog.dom.forms.hasFileInput = function(a) {
  for(var a = a.elements, b, c = 0;b = a[c];c++) {
    if(!b.disabled && b.type && "file" == b.type.toLowerCase()) {
      return!0
    }
  }
  return!1
};
goog.dom.forms.setDisabled = function(a, b) {
  if("FORM" == a.tagName) {
    for(var c = a.elements, d = 0;a = c[d];d++) {
      goog.dom.forms.setDisabled(a, b)
    }
  }else {
    !0 == b && a.blur(), a.disabled = b
  }
};
goog.dom.forms.focusAndSelect = function(a) {
  a.focus();
  a.select && a.select()
};
goog.dom.forms.hasValue = function(a) {
  return!!goog.dom.forms.getValue(a)
};
goog.dom.forms.hasValueByName = function(a, b) {
  return!!goog.dom.forms.getValueByName(a, b)
};
goog.dom.forms.getValue = function(a) {
  var b = a.type;
  if(!goog.isDef(b)) {
    return null
  }
  switch(b.toLowerCase()) {
    case "checkbox":
    ;
    case "radio":
      return goog.dom.forms.getInputChecked_(a);
    case "select-one":
      return goog.dom.forms.getSelectSingle_(a);
    case "select-multiple":
      return goog.dom.forms.getSelectMultiple_(a);
    default:
      return goog.isDef(a.value) ? a.value : null
  }
};
goog.dom.$F = goog.dom.forms.getValue;
goog.dom.forms.getValueByName = function(a, b) {
  var c = a.elements[b];
  if(c.type) {
    return goog.dom.forms.getValue(c)
  }
  for(var d = 0;d < c.length;d++) {
    var e = goog.dom.forms.getValue(c[d]);
    if(e) {
      return e
    }
  }
  return null
};
goog.dom.forms.getInputChecked_ = function(a) {
  return a.checked ? a.value : null
};
goog.dom.forms.getSelectSingle_ = function(a) {
  var b = a.selectedIndex;
  return 0 <= b ? a.options[b].value : null
};
goog.dom.forms.getSelectMultiple_ = function(a) {
  for(var b = [], c, d = 0;c = a.options[d];d++) {
    c.selected && b.push(c.value)
  }
  return b.length ? b : null
};
goog.dom.forms.setValue = function(a, b) {
  var c = a.type;
  if(goog.isDef(c)) {
    switch(c.toLowerCase()) {
      case "checkbox":
      ;
      case "radio":
        goog.dom.forms.setInputChecked_(a, b);
        break;
      case "select-one":
        goog.dom.forms.setSelectSingle_(a, b);
        break;
      case "select-multiple":
        goog.dom.forms.setSelectMultiple_(a, b);
        break;
      default:
        a.value = goog.isDefAndNotNull(b) ? b : ""
    }
  }
};
goog.dom.forms.setInputChecked_ = function(a, b) {
  a.checked = b ? "checked" : null
};
goog.dom.forms.setSelectSingle_ = function(a, b) {
  a.selectedIndex = -1;
  if(goog.isString(b)) {
    for(var c, d = 0;c = a.options[d];d++) {
      if(c.value == b) {
        c.selected = !0;
        break
      }
    }
  }
};
goog.dom.forms.setSelectMultiple_ = function(a, b) {
  goog.isString(b) && (b = [b]);
  for(var c, d = 0;c = a.options[d];d++) {
    if(c.selected = !1, b) {
      for(var e, f = 0;e = b[f];f++) {
        if(c.value == e) {
          c.selected = !0
        }
      }
    }
  }
};
goog.structs.Queue = function() {
  this.elements_ = []
};
goog.structs.Queue.prototype.head_ = 0;
goog.structs.Queue.prototype.tail_ = 0;
goog.structs.Queue.prototype.enqueue = function(a) {
  this.elements_[this.tail_++] = a
};
goog.structs.Queue.prototype.dequeue = function() {
  if(this.head_ != this.tail_) {
    var a = this.elements_[this.head_];
    delete this.elements_[this.head_];
    this.head_++;
    return a
  }
};
goog.structs.Queue.prototype.peek = function() {
  return this.head_ == this.tail_ ? void 0 : this.elements_[this.head_]
};
goog.structs.Queue.prototype.getCount = function() {
  return this.tail_ - this.head_
};
goog.structs.Queue.prototype.isEmpty = function() {
  return 0 == this.tail_ - this.head_
};
goog.structs.Queue.prototype.clear = function() {
  this.tail_ = this.head_ = this.elements_.length = 0
};
goog.structs.Queue.prototype.contains = function(a) {
  return goog.array.contains(this.elements_, a)
};
goog.structs.Queue.prototype.remove = function(a) {
  a = goog.array.indexOf(this.elements_, a);
  if(0 > a) {
    return!1
  }
  a == this.head_ ? this.dequeue() : (goog.array.removeAt(this.elements_, a), this.tail_--);
  return!0
};
goog.structs.Queue.prototype.getValues = function() {
  return this.elements_.slice(this.head_, this.tail_)
};
goog.structs.Pool = function(a, b) {
  goog.Disposable.call(this);
  this.minCount_ = a || 0;
  this.maxCount_ = b || 10;
  if(this.minCount_ > this.maxCount_) {
    throw Error(goog.structs.Pool.ERROR_MIN_MAX_);
  }
  this.freeQueue_ = new goog.structs.Queue;
  this.inUseSet_ = new goog.structs.Set;
  this.adjustForMinMax()
};
goog.inherits(goog.structs.Pool, goog.Disposable);
goog.structs.Pool.ERROR_MIN_MAX_ = "[goog.structs.Pool] Min can not be greater than max";
goog.structs.Pool.ERROR_DISPOSE_UNRELEASED_OBJS_ = "[goog.structs.Pool] Objects not released";
goog.structs.Pool.prototype.setMinimumCount = function(a) {
  if(a > this.maxCount_) {
    throw Error(goog.structs.Pool.ERROR_MIN_MAX_);
  }
  this.minCount_ = a;
  this.adjustForMinMax()
};
goog.structs.Pool.prototype.setMaximumCount = function(a) {
  if(a < this.minCount_) {
    throw Error(goog.structs.Pool.ERROR_MIN_MAX_);
  }
  this.maxCount_ = a;
  this.adjustForMinMax()
};
goog.structs.Pool.prototype.getObject = function() {
  var a = this.removeFreeObject_();
  a && this.inUseSet_.add(a);
  return a
};
goog.structs.Pool.prototype.releaseObject = function(a) {
  return this.inUseSet_.remove(a) ? (this.addFreeObject(a), !0) : !1
};
goog.structs.Pool.prototype.removeFreeObject_ = function() {
  for(var a;0 < this.getFreeCount() && !(a = this.freeQueue_.dequeue(), this.objectCanBeReused(a));) {
    this.adjustForMinMax()
  }
  !a && this.getCount() < this.maxCount_ && (a = this.createObject());
  return a
};
goog.structs.Pool.prototype.addFreeObject = function(a) {
  this.inUseSet_.remove(a);
  this.objectCanBeReused(a) && this.getCount() < this.maxCount_ ? this.freeQueue_.enqueue(a) : this.disposeObject(a)
};
goog.structs.Pool.prototype.adjustForMinMax = function() {
  for(var a = this.freeQueue_;this.getCount() < this.minCount_;) {
    a.enqueue(this.createObject())
  }
  for(;this.getCount() > this.maxCount_ && 0 < this.getFreeCount();) {
    this.disposeObject(a.dequeue())
  }
};
goog.structs.Pool.prototype.createObject = function() {
  return{}
};
goog.structs.Pool.prototype.disposeObject = function(a) {
  if("function" == typeof a.dispose) {
    a.dispose()
  }else {
    for(var b in a) {
      a[b] = null
    }
  }
};
goog.structs.Pool.prototype.objectCanBeReused = function(a) {
  return"function" == typeof a.canBeReused ? a.canBeReused() : !0
};
goog.structs.Pool.prototype.contains = function(a) {
  return this.freeQueue_.contains(a) || this.inUseSet_.contains(a)
};
goog.structs.Pool.prototype.getCount = function() {
  return this.freeQueue_.getCount() + this.inUseSet_.getCount()
};
goog.structs.Pool.prototype.getInUseCount = function() {
  return this.inUseSet_.getCount()
};
goog.structs.Pool.prototype.getFreeCount = function() {
  return this.freeQueue_.getCount()
};
goog.structs.Pool.prototype.isEmpty = function() {
  return this.freeQueue_.isEmpty() && this.inUseSet_.isEmpty()
};
goog.structs.Pool.prototype.disposeInternal = function() {
  goog.structs.Pool.superClass_.disposeInternal.call(this);
  if(0 < this.getInUseCount()) {
    throw Error(goog.structs.Pool.ERROR_DISPOSE_UNRELEASED_OBJS_);
  }
  delete this.inUseSet_;
  for(var a = this.freeQueue_;!a.isEmpty();) {
    this.disposeObject(a.dequeue())
  }
  delete this.freeQueue_
};
goog.structs.Heap = function(a) {
  this.nodes_ = [];
  a && this.insertAll(a)
};
goog.structs.Heap.prototype.insert = function(a, b) {
  var c = new goog.structs.Node(a, b), d = this.nodes_;
  d.push(c);
  this.moveUp_(d.length - 1)
};
goog.structs.Heap.prototype.insertAll = function(a) {
  var b, c;
  if(a instanceof goog.structs.Heap) {
    if(b = a.getKeys(), c = a.getValues(), 0 >= a.getCount()) {
      for(var a = this.nodes_, d = 0;d < b.length;d++) {
        a.push(new goog.structs.Node(b[d], c[d]))
      }
      return
    }
  }else {
    b = goog.object.getKeys(a), c = goog.object.getValues(a)
  }
  for(d = 0;d < b.length;d++) {
    this.insert(b[d], c[d])
  }
};
goog.structs.Heap.prototype.remove = function() {
  var a = this.nodes_, b = a.length, c = a[0];
  if(!(0 >= b)) {
    return 1 == b ? goog.array.clear(a) : (a[0] = a.pop(), this.moveDown_(0)), c.getValue()
  }
};
goog.structs.Heap.prototype.peek = function() {
  var a = this.nodes_;
  return 0 == a.length ? void 0 : a[0].getValue()
};
goog.structs.Heap.prototype.peekKey = function() {
  return this.nodes_[0] && this.nodes_[0].getKey()
};
goog.structs.Heap.prototype.moveDown_ = function(a) {
  for(var b = this.nodes_, c = b.length, d = b[a];a < Math.floor(c / 2);) {
    var e = this.getLeftChildIndex_(a), f = this.getRightChildIndex_(a), e = f < c && b[f].getKey() < b[e].getKey() ? f : e;
    if(b[e].getKey() > d.getKey()) {
      break
    }
    b[a] = b[e];
    a = e
  }
  b[a] = d
};
goog.structs.Heap.prototype.moveUp_ = function(a) {
  for(var b = this.nodes_, c = b[a];0 < a;) {
    var d = this.getParentIndex_(a);
    if(b[d].getKey() > c.getKey()) {
      b[a] = b[d], a = d
    }else {
      break
    }
  }
  b[a] = c
};
goog.structs.Heap.prototype.getLeftChildIndex_ = function(a) {
  return 2 * a + 1
};
goog.structs.Heap.prototype.getRightChildIndex_ = function(a) {
  return 2 * a + 2
};
goog.structs.Heap.prototype.getParentIndex_ = function(a) {
  return Math.floor((a - 1) / 2)
};
goog.structs.Heap.prototype.getValues = function() {
  for(var a = this.nodes_, b = [], c = a.length, d = 0;d < c;d++) {
    b.push(a[d].getValue())
  }
  return b
};
goog.structs.Heap.prototype.getKeys = function() {
  for(var a = this.nodes_, b = [], c = a.length, d = 0;d < c;d++) {
    b.push(a[d].getKey())
  }
  return b
};
goog.structs.Heap.prototype.containsValue = function(a) {
  return goog.array.some(this.nodes_, function(b) {
    return b.getValue() == a
  })
};
goog.structs.Heap.prototype.containsKey = function(a) {
  return goog.array.some(this.nodes_, function(b) {
    return b.getKey() == a
  })
};
goog.structs.Heap.prototype.clone = function() {
  return new goog.structs.Heap(this)
};
goog.structs.Heap.prototype.getCount = function() {
  return this.nodes_.length
};
goog.structs.Heap.prototype.isEmpty = function() {
  return goog.array.isEmpty(this.nodes_)
};
goog.structs.Heap.prototype.clear = function() {
  goog.array.clear(this.nodes_)
};
goog.structs.PriorityQueue = function() {
  goog.structs.Heap.call(this)
};
goog.inherits(goog.structs.PriorityQueue, goog.structs.Heap);
goog.structs.PriorityQueue.prototype.enqueue = function(a, b) {
  this.insert(a, b)
};
goog.structs.PriorityQueue.prototype.dequeue = function() {
  return this.remove()
};
goog.structs.PriorityPool = function(a, b) {
  this.requestQueue_ = new goog.structs.PriorityQueue;
  goog.structs.Pool.call(this, a, b)
};
goog.inherits(goog.structs.PriorityPool, goog.structs.Pool);
goog.structs.PriorityPool.DEFAULT_PRIORITY_ = 100;
goog.structs.PriorityPool.prototype.getObject = function(a, b) {
  if(!a) {
    return goog.structs.PriorityPool.superClass_.getObject.call(this)
  }
  this.requestQueue_.enqueue(b || goog.structs.PriorityPool.DEFAULT_PRIORITY_, a);
  this.handleQueueRequests_()
};
goog.structs.PriorityPool.prototype.handleQueueRequests_ = function() {
  for(var a = this.requestQueue_;0 < a.getCount();) {
    var b = this.getObject();
    if(b) {
      a.dequeue().apply(this, [b])
    }else {
      break
    }
  }
};
goog.structs.PriorityPool.prototype.addFreeObject = function(a) {
  goog.structs.PriorityPool.superClass_.addFreeObject.call(this, a);
  this.handleQueueRequests_()
};
goog.structs.PriorityPool.prototype.adjustForMinMax = function() {
  goog.structs.PriorityPool.superClass_.adjustForMinMax.call(this);
  this.handleQueueRequests_()
};
goog.structs.PriorityPool.prototype.disposeInternal = function() {
  goog.structs.PriorityPool.superClass_.disposeInternal.call(this);
  this.requestQueue_.clear();
  this.requestQueue_ = null
};
goog.net.XhrIoPool = function(a, b, c) {
  goog.structs.PriorityPool.call(this, b, c);
  this.headers_ = a
};
goog.inherits(goog.net.XhrIoPool, goog.structs.PriorityPool);
goog.net.XhrIoPool.prototype.createObject = function() {
  var a = new goog.net.XhrIo, b = this.headers_;
  b && goog.structs.forEach(b, function(b, d) {
    a.headers.set(d, b)
  });
  return a
};
goog.net.XhrIoPool.prototype.disposeObject = function(a) {
  a.dispose()
};
goog.net.XhrIoPool.prototype.objectCanBeReused = function(a) {
  return!a.isDisposed() && !a.isActive()
};
goog.color = {};
goog.color.names = {aliceblue:"#f0f8ff", antiquewhite:"#faebd7", aqua:"#00ffff", aquamarine:"#7fffd4", azure:"#f0ffff", beige:"#f5f5dc", bisque:"#ffe4c4", black:"#000000", blanchedalmond:"#ffebcd", blue:"#0000ff", blueviolet:"#8a2be2", brown:"#a52a2a", burlywood:"#deb887", cadetblue:"#5f9ea0", chartreuse:"#7fff00", chocolate:"#d2691e", coral:"#ff7f50", cornflowerblue:"#6495ed", cornsilk:"#fff8dc", crimson:"#dc143c", cyan:"#00ffff", darkblue:"#00008b", darkcyan:"#008b8b", darkgoldenrod:"#b8860b", 
darkgray:"#a9a9a9", darkgreen:"#006400", darkgrey:"#a9a9a9", darkkhaki:"#bdb76b", darkmagenta:"#8b008b", darkolivegreen:"#556b2f", darkorange:"#ff8c00", darkorchid:"#9932cc", darkred:"#8b0000", darksalmon:"#e9967a", darkseagreen:"#8fbc8f", darkslateblue:"#483d8b", darkslategray:"#2f4f4f", darkslategrey:"#2f4f4f", darkturquoise:"#00ced1", darkviolet:"#9400d3", deeppink:"#ff1493", deepskyblue:"#00bfff", dimgray:"#696969", dimgrey:"#696969", dodgerblue:"#1e90ff", firebrick:"#b22222", floralwhite:"#fffaf0", 
forestgreen:"#228b22", fuchsia:"#ff00ff", gainsboro:"#dcdcdc", ghostwhite:"#f8f8ff", gold:"#ffd700", goldenrod:"#daa520", gray:"#808080", green:"#008000", greenyellow:"#adff2f", grey:"#808080", honeydew:"#f0fff0", hotpink:"#ff69b4", indianred:"#cd5c5c", indigo:"#4b0082", ivory:"#fffff0", khaki:"#f0e68c", lavender:"#e6e6fa", lavenderblush:"#fff0f5", lawngreen:"#7cfc00", lemonchiffon:"#fffacd", lightblue:"#add8e6", lightcoral:"#f08080", lightcyan:"#e0ffff", lightgoldenrodyellow:"#fafad2", lightgray:"#d3d3d3", 
lightgreen:"#90ee90", lightgrey:"#d3d3d3", lightpink:"#ffb6c1", lightsalmon:"#ffa07a", lightseagreen:"#20b2aa", lightskyblue:"#87cefa", lightslategray:"#778899", lightslategrey:"#778899", lightsteelblue:"#b0c4de", lightyellow:"#ffffe0", lime:"#00ff00", limegreen:"#32cd32", linen:"#faf0e6", magenta:"#ff00ff", maroon:"#800000", mediumaquamarine:"#66cdaa", mediumblue:"#0000cd", mediumorchid:"#ba55d3", mediumpurple:"#9370d8", mediumseagreen:"#3cb371", mediumslateblue:"#7b68ee", mediumspringgreen:"#00fa9a", 
mediumturquoise:"#48d1cc", mediumvioletred:"#c71585", midnightblue:"#191970", mintcream:"#f5fffa", mistyrose:"#ffe4e1", moccasin:"#ffe4b5", navajowhite:"#ffdead", navy:"#000080", oldlace:"#fdf5e6", olive:"#808000", olivedrab:"#6b8e23", orange:"#ffa500", orangered:"#ff4500", orchid:"#da70d6", palegoldenrod:"#eee8aa", palegreen:"#98fb98", paleturquoise:"#afeeee", palevioletred:"#d87093", papayawhip:"#ffefd5", peachpuff:"#ffdab9", peru:"#cd853f", pink:"#ffc0cb", plum:"#dda0dd", powderblue:"#b0e0e6", 
purple:"#800080", red:"#ff0000", rosybrown:"#bc8f8f", royalblue:"#4169e1", saddlebrown:"#8b4513", salmon:"#fa8072", sandybrown:"#f4a460", seagreen:"#2e8b57", seashell:"#fff5ee", sienna:"#a0522d", silver:"#c0c0c0", skyblue:"#87ceeb", slateblue:"#6a5acd", slategray:"#708090", slategrey:"#708090", snow:"#fffafa", springgreen:"#00ff7f", steelblue:"#4682b4", tan:"#d2b48c", teal:"#008080", thistle:"#d8bfd8", tomato:"#ff6347", turquoise:"#40e0d0", violet:"#ee82ee", wheat:"#f5deb3", white:"#ffffff", whitesmoke:"#f5f5f5", 
yellow:"#ffff00", yellowgreen:"#9acd32"};
goog.math.randomInt = function(a) {
  return Math.floor(Math.random() * a)
};
goog.math.uniformRandom = function(a, b) {
  return a + Math.random() * (b - a)
};
goog.math.clamp = function(a, b, c) {
  return Math.min(Math.max(a, b), c)
};
goog.math.modulo = function(a, b) {
  var c = a % b;
  return 0 > c * b ? c + b : c
};
goog.math.lerp = function(a, b, c) {
  return a + c * (b - a)
};
goog.math.nearlyEquals = function(a, b, c) {
  return Math.abs(a - b) <= (c || 1.0E-6)
};
goog.math.standardAngle = function(a) {
  return goog.math.modulo(a, 360)
};
goog.math.toRadians = function(a) {
  return a * Math.PI / 180
};
goog.math.toDegrees = function(a) {
  return 180 * a / Math.PI
};
goog.math.angleDx = function(a, b) {
  return b * Math.cos(goog.math.toRadians(a))
};
goog.math.angleDy = function(a, b) {
  return b * Math.sin(goog.math.toRadians(a))
};
goog.math.angle = function(a, b, c, d) {
  return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(d - b, c - a)))
};
goog.math.angleDifference = function(a, b) {
  var c = goog.math.standardAngle(b) - goog.math.standardAngle(a);
  180 < c ? c -= 360 : -180 >= c && (c = 360 + c);
  return c
};
goog.math.sign = function(a) {
  return 0 == a ? 0 : 0 > a ? -1 : 1
};
goog.math.longestCommonSubsequence = function(a, b, c, d) {
  for(var c = c || function(a, b) {
    return a == b
  }, d = d || function(b) {
    return a[b]
  }, e = a.length, f = b.length, g = [], h = 0;h < e + 1;h++) {
    g[h] = [], g[h][0] = 0
  }
  for(var i = 0;i < f + 1;i++) {
    g[0][i] = 0
  }
  for(h = 1;h <= e;h++) {
    for(i = 1;i <= e;i++) {
      g[h][i] = c(a[h - 1], b[i - 1]) ? g[h - 1][i - 1] + 1 : Math.max(g[h - 1][i], g[h][i - 1])
    }
  }
  for(var j = [], h = e, i = f;0 < h && 0 < i;) {
    c(a[h - 1], b[i - 1]) ? (j.unshift(d(h - 1, i - 1)), h--, i--) : g[h - 1][i] > g[h][i - 1] ? h-- : i--
  }
  return j
};
goog.math.sum = function(a) {
  return goog.array.reduce(arguments, function(a, c) {
    return a + c
  }, 0)
};
goog.math.average = function(a) {
  return goog.math.sum.apply(null, arguments) / arguments.length
};
goog.math.standardDeviation = function(a) {
  var b = arguments.length;
  if(2 > b) {
    return 0
  }
  var c = goog.math.average.apply(null, arguments), b = goog.math.sum.apply(null, goog.array.map(arguments, function(a) {
    return Math.pow(a - c, 2)
  })) / (b - 1);
  return Math.sqrt(b)
};
goog.math.isInt = function(a) {
  return isFinite(a) && 0 == a % 1
};
goog.math.isFiniteNumber = function(a) {
  return isFinite(a) && !isNaN(a)
};
goog.color.parse = function(a) {
  var b = {}, a = "" + a, c = goog.color.prependPoundIfNecessary_(a);
  if(goog.color.isValidHexColor_(c)) {
    return b.hex = goog.color.normalizeHex(c), b.type = "hex", b
  }
  c = goog.color.isValidRgbColor_(a);
  if(c.length) {
    return b.hex = goog.color.rgbArrayToHex(c), b.type = "rgb", b
  }
  if(goog.color.names && (c = goog.color.names[a.toLowerCase()])) {
    return b.hex = c, b.type = "named", b
  }
  throw Error(a + " is not a valid color string");
};
goog.color.parseRgb = function(a) {
  var b = goog.color.isValidRgbColor_(a);
  if(!b.length) {
    throw Error(a + " is not a valid RGB color");
  }
  return b
};
goog.color.hexToRgbStyle = function(a) {
  return goog.color.rgbStyle_(goog.color.hexToRgb(a))
};
goog.color.hexTripletRe_ = /#(.)(.)(.)/;
goog.color.normalizeHex = function(a) {
  if(!goog.color.isValidHexColor_(a)) {
    throw Error("'" + a + "' is not a valid hex color");
  }
  4 == a.length && (a = a.replace(goog.color.hexTripletRe_, "#$1$1$2$2$3$3"));
  return a.toLowerCase()
};
goog.color.hexToRgb = function(a) {
  var a = goog.color.normalizeHex(a), b = parseInt(a.substr(1, 2), 16), c = parseInt(a.substr(3, 2), 16), a = parseInt(a.substr(5, 2), 16);
  return[b, c, a]
};
goog.color.rgbToHex = function(a, b, c) {
  a = Number(a);
  b = Number(b);
  c = Number(c);
  if(isNaN(a) || 0 > a || 255 < a || isNaN(b) || 0 > b || 255 < b || isNaN(c) || 0 > c || 255 < c) {
    throw Error('"(' + a + "," + b + "," + c + '") is not a valid RGB color');
  }
  a = goog.color.prependZeroIfNecessary_(a.toString(16));
  b = goog.color.prependZeroIfNecessary_(b.toString(16));
  c = goog.color.prependZeroIfNecessary_(c.toString(16));
  return"#" + a + b + c
};
goog.color.rgbArrayToHex = function(a) {
  return goog.color.rgbToHex(a[0], a[1], a[2])
};
goog.color.rgbToHsl = function(a, b, c) {
  var a = a / 255, b = b / 255, c = c / 255, d = Math.max(a, b, c), e = Math.min(a, b, c), f = 0, g = 0, h = 0.5 * (d + e);
  d != e && (d == a ? f = 60 * (b - c) / (d - e) : d == b ? f = 60 * (c - a) / (d - e) + 120 : d == c && (f = 60 * (a - b) / (d - e) + 240), g = 0 < h && 0.5 >= h ? (d - e) / (2 * h) : (d - e) / (2 - 2 * h));
  return[Math.round(f + 360) % 360, g, h]
};
goog.color.rgbArrayToHsl = function(a) {
  return goog.color.rgbToHsl(a[0], a[1], a[2])
};
goog.color.hueToRgb_ = function(a, b, c) {
  0 > c ? c += 1 : 1 < c && (c -= 1);
  return 1 > 6 * c ? a + 6 * (b - a) * c : 1 > 2 * c ? b : 2 > 3 * c ? a + 6 * (b - a) * (2 / 3 - c) : a
};
goog.color.hslToRgb = function(a, b, c) {
  var d = 0, e = 0, f = 0, a = a / 360;
  if(0 == b) {
    d = e = f = 255 * c
  }else {
    var g = f = 0, g = 0.5 > c ? c * (1 + b) : c + b - b * c, f = 2 * c - g, d = 255 * goog.color.hueToRgb_(f, g, a + 1 / 3), e = 255 * goog.color.hueToRgb_(f, g, a), f = 255 * goog.color.hueToRgb_(f, g, a - 1 / 3)
  }
  return[Math.round(d), Math.round(e), Math.round(f)]
};
goog.color.hslArrayToRgb = function(a) {
  return goog.color.hslToRgb(a[0], a[1], a[2])
};
goog.color.validHexColorRe_ = /^#(?:[0-9a-f]{3}){1,2}$/i;
goog.color.isValidHexColor_ = function(a) {
  return goog.color.validHexColorRe_.test(a)
};
goog.color.normalizedHexColorRe_ = /^#[0-9a-f]{6}$/;
goog.color.isNormalizedHexColor_ = function(a) {
  return goog.color.normalizedHexColorRe_.test(a)
};
goog.color.rgbColorRe_ = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
goog.color.isValidRgbColor_ = function(a) {
  var b = a.match(goog.color.rgbColorRe_);
  if(b) {
    var a = Number(b[1]), c = Number(b[2]), b = Number(b[3]);
    if(0 <= a && 255 >= a && 0 <= c && 255 >= c && 0 <= b && 255 >= b) {
      return[a, c, b]
    }
  }
  return[]
};
goog.color.prependZeroIfNecessary_ = function(a) {
  return 1 == a.length ? "0" + a : a
};
goog.color.prependPoundIfNecessary_ = function(a) {
  return"#" == a.charAt(0) ? a : "#" + a
};
goog.color.rgbStyle_ = function(a) {
  return"rgb(" + a.join(",") + ")"
};
goog.color.hsvToRgb = function(a, b, c) {
  var d = 0, e = 0, f = 0;
  if(0 == b) {
    f = e = d = c
  }else {
    var g = Math.floor(a / 60), h = a / 60 - g, a = c * (1 - b), i = c * (1 - b * h), b = c * (1 - b * (1 - h));
    switch(g) {
      case 1:
        d = i;
        e = c;
        f = a;
        break;
      case 2:
        d = a;
        e = c;
        f = b;
        break;
      case 3:
        d = a;
        e = i;
        f = c;
        break;
      case 4:
        d = b;
        e = a;
        f = c;
        break;
      case 5:
        d = c;
        e = a;
        f = i;
        break;
      case 6:
      ;
      case 0:
        d = c, e = b, f = a
    }
  }
  return[Math.floor(d), Math.floor(e), Math.floor(f)]
};
goog.color.rgbToHsv = function(a, b, c) {
  var d = Math.max(Math.max(a, b), c), e = Math.min(Math.min(a, b), c);
  if(e == d) {
    e = a = 0
  }else {
    var f = d - e, e = f / d, a = 60 * (a == d ? (b - c) / f : b == d ? 2 + (c - a) / f : 4 + (a - b) / f);
    0 > a && (a += 360);
    360 < a && (a -= 360)
  }
  return[a, e, d]
};
goog.color.rgbArrayToHsv = function(a) {
  return goog.color.rgbToHsv(a[0], a[1], a[2])
};
goog.color.hsvArrayToRgb = function(a) {
  return goog.color.hsvToRgb(a[0], a[1], a[2])
};
goog.color.hexToHsl = function(a) {
  a = goog.color.hexToRgb(a);
  return goog.color.rgbToHsl(a[0], a[1], a[2])
};
goog.color.hslToHex = function(a, b, c) {
  return goog.color.rgbArrayToHex(goog.color.hslToRgb(a, b, c))
};
goog.color.hslArrayToHex = function(a) {
  return goog.color.rgbArrayToHex(goog.color.hslToRgb(a[0], a[1], a[2]))
};
goog.color.hexToHsv = function(a) {
  return goog.color.rgbArrayToHsv(goog.color.hexToRgb(a))
};
goog.color.hsvToHex = function(a, b, c) {
  return goog.color.rgbArrayToHex(goog.color.hsvToRgb(a, b, c))
};
goog.color.hsvArrayToHex = function(a) {
  return goog.color.hsvToHex(a[0], a[1], a[2])
};
goog.color.hslDistance = function(a, b) {
  var c, d;
  c = 0.5 >= a[2] ? a[1] * a[2] : a[1] * (1 - a[2]);
  d = 0.5 >= b[2] ? b[1] * b[2] : b[1] * (1 - b[2]);
  return(a[2] - b[2]) * (a[2] - b[2]) + c * c + d * d - 2 * c * d * Math.cos(2 * (a[0] / 360 - b[0] / 360) * Math.PI)
};
goog.color.blend = function(a, b, c) {
  c = goog.math.clamp(c, 0, 1);
  return[Math.round(c * a[0] + (1 - c) * b[0]), Math.round(c * a[1] + (1 - c) * b[1]), Math.round(c * a[2] + (1 - c) * b[2])]
};
goog.color.darken = function(a, b) {
  return goog.color.blend([0, 0, 0], a, b)
};
goog.color.lighten = function(a, b) {
  return goog.color.blend([255, 255, 255], a, b)
};
goog.color.highContrast = function(a, b) {
  for(var c = [], d = 0;d < b.length;d++) {
    c.push({color:b[d], diff:goog.color.yiqBrightnessDiff_(b[d], a) + goog.color.colorDiff_(b[d], a)})
  }
  c.sort(function(a, b) {
    return b.diff - a.diff
  });
  return c[0].color
};
goog.color.yiqBrightness_ = function(a) {
  return Math.round((299 * a[0] + 587 * a[1] + 114 * a[2]) / 1E3)
};
goog.color.yiqBrightnessDiff_ = function(a, b) {
  return Math.abs(goog.color.yiqBrightness_(a) - goog.color.yiqBrightness_(b))
};
goog.color.colorDiff_ = function(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2])
};
goog.color.alpha = {};
goog.color.alpha.parse = function(a) {
  var b = {}, a = "" + a, c = goog.color.prependPoundIfNecessary_(a);
  if(goog.color.alpha.isValidAlphaHexColor_(c)) {
    return b.hex = goog.color.alpha.normalizeAlphaHex_(c), b.type = "hex", b
  }
  c = goog.color.alpha.isValidRgbaColor_(a);
  if(c.length) {
    return b.hex = goog.color.alpha.rgbaArrayToHex(c), b.type = "rgba", b
  }
  c = goog.color.alpha.isValidHslaColor_(a);
  if(c.length) {
    return b.hex = goog.color.alpha.hslaArrayToHex(c), b.type = "hsla", b
  }
  throw Error(a + " is not a valid color string");
};
goog.color.alpha.hexToRgbaStyle = function(a) {
  return goog.color.alpha.rgbaStyle_(goog.color.alpha.hexToRgba(a))
};
goog.color.alpha.extractHexColor = function(a) {
  if(goog.color.alpha.isValidAlphaHexColor_(a)) {
    return a = goog.color.prependPoundIfNecessary_(a), goog.color.alpha.normalizeAlphaHex_(a).substring(0, 7)
  }
  throw Error(a + " is not a valid 8-hex color string");
};
goog.color.alpha.extractAlpha = function(a) {
  if(goog.color.alpha.isValidAlphaHexColor_(a)) {
    return a = goog.color.prependPoundIfNecessary_(a), goog.color.alpha.normalizeAlphaHex_(a).substring(7, 9)
  }
  throw Error(a + " is not a valid 8-hex color string");
};
goog.color.alpha.hexQuadrupletRe_ = /#(.)(.)(.)(.)/;
goog.color.alpha.normalizeAlphaHex_ = function(a) {
  if(!goog.color.alpha.isValidAlphaHexColor_(a)) {
    throw Error("'" + a + "' is not a valid alpha hex color");
  }
  5 == a.length && (a = a.replace(goog.color.alpha.hexQuadrupletRe_, "#$1$1$2$2$3$3$4$4"));
  return a.toLowerCase()
};
goog.color.alpha.hexToRgba = function(a) {
  var a = goog.color.alpha.normalizeAlphaHex_(a), b = parseInt(a.substr(1, 2), 16), c = parseInt(a.substr(3, 2), 16), d = parseInt(a.substr(5, 2), 16), a = parseInt(a.substr(7, 2), 16);
  return[b, c, d, a / 255]
};
goog.color.alpha.rgbaToHex = function(a, b, c, d) {
  var e = Math.floor(255 * d);
  if(isNaN(e) || 0 > e || 255 < e) {
    throw Error('"(' + a + "," + b + "," + c + "," + d + '") is not a valid RGBA color');
  }
  d = goog.color.prependZeroIfNecessary_(e.toString(16));
  return goog.color.rgbToHex(a, b, c) + d
};
goog.color.alpha.hslaToHex = function(a, b, c, d) {
  var e = Math.floor(255 * d);
  if(isNaN(e) || 0 > e || 255 < e) {
    throw Error('"(' + a + "," + b + "," + c + "," + d + '") is not a valid HSLA color');
  }
  d = goog.color.prependZeroIfNecessary_(e.toString(16));
  return goog.color.hslToHex(a, b / 100, c / 100) + d
};
goog.color.alpha.rgbaArrayToHex = function(a) {
  return goog.color.alpha.rgbaToHex(a[0], a[1], a[2], a[3])
};
goog.color.alpha.hslaArrayToHex = function(a) {
  return goog.color.alpha.hslaToHex(a[0], a[1], a[2], a[3])
};
goog.color.alpha.hslaArrayToRgbaStyle = function(a) {
  return goog.color.alpha.hslaToRgbaStyle(a[0], a[1], a[2], a[3])
};
goog.color.alpha.hslaToRgbaStyle = function(a, b, c, d) {
  return goog.color.alpha.rgbaStyle_(goog.color.alpha.hslaToRgba(a, b, c, d))
};
goog.color.alpha.hslaToRgba = function(a, b, c, d) {
  return goog.color.hslToRgb(a, b / 100, c / 100).concat(d)
};
goog.color.alpha.rgbaToHsla = function(a, b, c, d) {
  return goog.color.rgbToHsl(a, b, c).concat(d)
};
goog.color.alpha.rgbaArrayToHsla = function(a) {
  return goog.color.alpha.rgbaToHsla(a[0], a[1], a[2], a[3])
};
goog.color.alpha.validAlphaHexColorRe_ = /^#(?:[0-9a-f]{4}){1,2}$/i;
goog.color.alpha.isValidAlphaHexColor_ = function(a) {
  return goog.color.alpha.validAlphaHexColorRe_.test(a)
};
goog.color.alpha.normalizedAlphaHexColorRe_ = /^#[0-9a-f]{8}$/;
goog.color.alpha.isNormalizedAlphaHexColor_ = function(a) {
  return goog.color.alpha.normalizedAlphaHexColorRe_.test(a)
};
goog.color.alpha.rgbaColorRe_ = /^(?:rgba)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|1|0\.\d{0,10})\)$/i;
goog.color.alpha.hslaColorRe_ = /^(?:hsla)\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\%,\s?(0|[1-9]\d{0,2})\%,\s?(0|1|0\.\d{0,10})\)$/i;
goog.color.alpha.isValidRgbaColor_ = function(a) {
  var b = a.match(goog.color.alpha.rgbaColorRe_);
  if(b) {
    var a = Number(b[1]), c = Number(b[2]), d = Number(b[3]), b = Number(b[4]);
    if(0 <= a && 255 >= a && 0 <= c && 255 >= c && 0 <= d && 255 >= d && 0 <= b && 1 >= b) {
      return[a, c, d, b]
    }
  }
  return[]
};
goog.color.alpha.isValidHslaColor_ = function(a) {
  var b = a.match(goog.color.alpha.hslaColorRe_);
  if(b) {
    var a = Number(b[1]), c = Number(b[2]), d = Number(b[3]), b = Number(b[4]);
    if(0 <= a && 360 >= a && 0 <= c && 100 >= c && 0 <= d && 100 >= d && 0 <= b && 1 >= b) {
      return[a, c, d, b]
    }
  }
  return[]
};
goog.color.alpha.rgbaStyle_ = function(a) {
  return"rgba(" + a.join(",") + ")"
};
goog.color.alpha.hsvaToHex = function(a, b, c, d) {
  d = Math.floor(255 * d);
  return goog.color.hsvArrayToHex([a, b, c]) + goog.color.prependZeroIfNecessary_(d.toString(16))
};
goog.color.alpha.hsvaArrayToHex = function(a) {
  return goog.color.alpha.hsvaToHex(a[0], a[1], a[2], a[3])
};
goog.net.xpc.NixTransport = function(a, b) {
  goog.net.xpc.Transport.call(this, b);
  this.channel_ = a;
  this.authToken_ = a[goog.net.xpc.CfgFields.AUTH_TOKEN] || "";
  this.remoteAuthToken_ = a[goog.net.xpc.CfgFields.REMOTE_AUTH_TOKEN] || "";
  goog.net.xpc.NixTransport.conductGlobalSetup_(this.getWindow());
  this[goog.net.xpc.NixTransport.NIX_HANDLE_MESSAGE] = this.handleMessage_;
  this[goog.net.xpc.NixTransport.NIX_CREATE_CHANNEL] = this.createChannel_
};
goog.inherits(goog.net.xpc.NixTransport, goog.net.xpc.Transport);
goog.net.xpc.NixTransport.NIX_WRAPPER = "GCXPC____NIXVBS_wrapper";
goog.net.xpc.NixTransport.NIX_GET_WRAPPER = "GCXPC____NIXVBS_get_wrapper";
goog.net.xpc.NixTransport.NIX_HANDLE_MESSAGE = "GCXPC____NIXJS_handle_message";
goog.net.xpc.NixTransport.NIX_CREATE_CHANNEL = "GCXPC____NIXJS_create_channel";
goog.net.xpc.NixTransport.NIX_ID_FIELD = "GCXPC____NIXVBS_container";
goog.net.xpc.NixTransport.conductGlobalSetup_ = function(a) {
  if(!a.nix_setup_complete) {
    var b = "Class " + goog.net.xpc.NixTransport.NIX_WRAPPER + "\n Private m_Transport\nPrivate m_Auth\nPublic Sub SetTransport(transport)\nIf isEmpty(m_Transport) Then\nSet m_Transport = transport\nEnd If\nEnd Sub\nPublic Sub SetAuth(auth)\nIf isEmpty(m_Auth) Then\nm_Auth = auth\nEnd If\nEnd Sub\nPublic Function GetAuthToken()\n GetAuthToken = m_Auth\nEnd Function\nPublic Sub SendMessage(service, payload)\n Call m_Transport." + goog.net.xpc.NixTransport.NIX_HANDLE_MESSAGE + "(service, payload)\nEnd Sub\nPublic Sub CreateChannel(channel)\n Call m_Transport." + 
    goog.net.xpc.NixTransport.NIX_CREATE_CHANNEL + "(channel)\nEnd Sub\nPublic Sub " + goog.net.xpc.NixTransport.NIX_ID_FIELD + "()\n End Sub\nEnd Class\n Function " + goog.net.xpc.NixTransport.NIX_GET_WRAPPER + "(transport, auth)\nDim wrap\nSet wrap = New " + goog.net.xpc.NixTransport.NIX_WRAPPER + "\nwrap.SetTransport transport\nwrap.SetAuth auth\nSet " + goog.net.xpc.NixTransport.NIX_GET_WRAPPER + " = wrap\nEnd Function";
    try {
      a.execScript(b, "vbscript"), a.nix_setup_complete = !0
    }catch(c) {
      goog.net.xpc.logger.severe("exception caught while attempting global setup: " + c)
    }
  }
};
goog.net.xpc.NixTransport.prototype.transportType = goog.net.xpc.TransportTypes.NIX;
goog.net.xpc.NixTransport.prototype.localSetupCompleted_ = !1;
goog.net.xpc.NixTransport.prototype.nixChannel_ = null;
goog.net.xpc.NixTransport.prototype.connect = function() {
  this.channel_.getRole() == goog.net.xpc.CrossPageChannel.Role.OUTER ? this.attemptOuterSetup_() : this.attemptInnerSetup_()
};
goog.net.xpc.NixTransport.prototype.attemptOuterSetup_ = function() {
  if(!this.localSetupCompleted_) {
    var a = this.channel_.iframeElement_;
    try {
      a.contentWindow.opener = this.getWindow()[goog.net.xpc.NixTransport.NIX_GET_WRAPPER](this, this.authToken_), this.localSetupCompleted_ = !0
    }catch(b) {
      goog.net.xpc.logger.severe("exception caught while attempting setup: " + b)
    }
    this.localSetupCompleted_ || this.getWindow().setTimeout(goog.bind(this.attemptOuterSetup_, this), 100)
  }
};
goog.net.xpc.NixTransport.prototype.attemptInnerSetup_ = function() {
  if(!this.localSetupCompleted_) {
    try {
      var a = this.getWindow().opener;
      if(a && goog.net.xpc.NixTransport.NIX_ID_FIELD in a) {
        this.nixChannel_ = a;
        if(this.nixChannel_.GetAuthToken() != this.remoteAuthToken_) {
          goog.net.xpc.logger.severe("Invalid auth token from other party");
          return
        }
        this.nixChannel_.CreateChannel(this.getWindow()[goog.net.xpc.NixTransport.NIX_GET_WRAPPER](this, this.authToken_));
        this.localSetupCompleted_ = !0;
        this.channel_.notifyConnected_()
      }
    }catch(b) {
      goog.net.xpc.logger.severe("exception caught while attempting setup: " + b);
      return
    }
    this.localSetupCompleted_ || this.getWindow().setTimeout(goog.bind(this.attemptInnerSetup_, this), 100)
  }
};
goog.net.xpc.NixTransport.prototype.createChannel_ = function(a) {
  ("unknown" != typeof a || !(goog.net.xpc.NixTransport.NIX_ID_FIELD in a)) && goog.net.xpc.logger.severe("Invalid NIX channel given to createChannel_");
  this.nixChannel_ = a;
  this.nixChannel_.GetAuthToken() != this.remoteAuthToken_ ? goog.net.xpc.logger.severe("Invalid auth token from other party") : this.channel_.notifyConnected_()
};
goog.net.xpc.NixTransport.prototype.handleMessage_ = function(a, b) {
  this.getWindow().setTimeout(goog.bind(function() {
    this.channel_.deliver_(a, b)
  }, this), 1)
};
goog.net.xpc.NixTransport.prototype.send = function(a, b) {
  "unknown" !== typeof this.nixChannel_ && goog.net.xpc.logger.severe("NIX channel not connected");
  this.nixChannel_.SendMessage(a, b)
};
goog.net.xpc.NixTransport.prototype.disposeInternal = function() {
  goog.net.xpc.NixTransport.superClass_.disposeInternal.call(this);
  this.nixChannel_ = null
};
goog.net.xpc.IframePollingTransport = function(a, b) {
  goog.net.xpc.Transport.call(this, b);
  this.channel_ = a;
  this.sendUri_ = this.channel_.cfg_[goog.net.xpc.CfgFields.PEER_POLL_URI];
  this.rcvUri_ = this.channel_.cfg_[goog.net.xpc.CfgFields.LOCAL_POLL_URI];
  this.sendQueue_ = []
};
goog.inherits(goog.net.xpc.IframePollingTransport, goog.net.xpc.Transport);
goog.net.xpc.IframePollingTransport.prototype.transportType = goog.net.xpc.TransportTypes.IFRAME_POLLING;
goog.net.xpc.IframePollingTransport.prototype.sequence_ = 0;
goog.net.xpc.IframePollingTransport.prototype.waitForAck_ = !1;
goog.net.xpc.IframePollingTransport.prototype.initialized_ = !1;
goog.net.xpc.IframePollingTransport.IFRAME_PREFIX = "googlexpc";
goog.net.xpc.IframePollingTransport.prototype.getMsgFrameName_ = function() {
  return goog.net.xpc.IframePollingTransport.IFRAME_PREFIX + "_" + this.channel_.name + "_msg"
};
goog.net.xpc.IframePollingTransport.prototype.getAckFrameName_ = function() {
  return goog.net.xpc.IframePollingTransport.IFRAME_PREFIX + "_" + this.channel_.name + "_ack"
};
goog.net.xpc.IframePollingTransport.prototype.connect = function() {
  goog.net.xpc.logger.fine("transport connect called");
  if(!this.initialized_) {
    goog.net.xpc.logger.fine("initializing..."), this.constructSenderFrames_(), this.initialized_ = !0
  }
  this.checkForeignFramesReady_()
};
goog.net.xpc.IframePollingTransport.prototype.constructSenderFrames_ = function() {
  var a = this.getMsgFrameName_();
  this.msgIframeElm_ = this.constructSenderFrame_(a);
  this.msgWinObj_ = this.getWindow().frames[a];
  a = this.getAckFrameName_();
  this.ackIframeElm_ = this.constructSenderFrame_(a);
  this.ackWinObj_ = this.getWindow().frames[a]
};
goog.net.xpc.IframePollingTransport.prototype.constructSenderFrame_ = function(a) {
  goog.net.xpc.logger.finest("constructing sender frame: " + a);
  var b = goog.dom.createElement("iframe"), c = b.style;
  c.position = "absolute";
  c.top = "-10px";
  c.left = "10px";
  c.width = "1px";
  c.height = "1px";
  b.id = b.name = a;
  b.src = this.sendUri_ + "#INITIAL";
  this.getWindow().document.body.appendChild(b);
  return b
};
goog.net.xpc.IframePollingTransport.prototype.innerPeerReconnect_ = function() {
  goog.net.xpc.logger.finest("innerPeerReconnect called");
  this.channel_.name = goog.net.xpc.getRandomString(10);
  goog.net.xpc.logger.finest("switching channels: " + this.channel_.name);
  this.deconstructSenderFrames_();
  this.initialized_ = !1;
  this.reconnectFrame_ = this.constructSenderFrame_(goog.net.xpc.IframePollingTransport.IFRAME_PREFIX + "_reconnect_" + this.channel_.name)
};
goog.net.xpc.IframePollingTransport.prototype.outerPeerReconnect_ = function() {
  goog.net.xpc.logger.finest("outerPeerReconnect called");
  for(var a = this.channel_.peerWindowObject_.frames, b = a.length, c = 0;c < b;c++) {
    var d;
    try {
      if(a[c] && a[c].name) {
        d = a[c].name
      }
    }catch(e) {
    }
    if(d) {
      var f = d.split("_");
      if(3 == f.length && f[0] == goog.net.xpc.IframePollingTransport.IFRAME_PREFIX && "reconnect" == f[1]) {
        this.channel_.name = f[2];
        this.deconstructSenderFrames_();
        this.initialized_ = !1;
        break
      }
    }
  }
};
goog.net.xpc.IframePollingTransport.prototype.deconstructSenderFrames_ = function() {
  goog.net.xpc.logger.finest("deconstructSenderFrames called");
  if(this.msgIframeElm_) {
    this.msgIframeElm_.parentNode.removeChild(this.msgIframeElm_), this.msgWinObj_ = this.msgIframeElm_ = null
  }
  if(this.ackIframeElm_) {
    this.ackIframeElm_.parentNode.removeChild(this.ackIframeElm_), this.ackWinObj_ = this.ackIframeElm_ = null
  }
};
goog.net.xpc.IframePollingTransport.prototype.checkForeignFramesReady_ = function() {
  !this.isRcvFrameReady_(this.getMsgFrameName_()) || !this.isRcvFrameReady_(this.getAckFrameName_()) ? (goog.net.xpc.logger.finest("foreign frames not (yet) present"), this.channel_.getRole() == goog.net.xpc.CrossPageChannel.Role.INNER && !this.reconnectFrame_ ? this.innerPeerReconnect_() : this.channel_.getRole() == goog.net.xpc.CrossPageChannel.Role.OUTER && this.outerPeerReconnect_(), this.getWindow().setTimeout(goog.bind(this.connect, this), 100)) : (goog.net.xpc.logger.fine("foreign frames present"), 
  this.msgReceiver_ = new goog.net.xpc.IframePollingTransport.Receiver(this, this.channel_.peerWindowObject_.frames[this.getMsgFrameName_()], goog.bind(this.processIncomingMsg, this)), this.ackReceiver_ = new goog.net.xpc.IframePollingTransport.Receiver(this, this.channel_.peerWindowObject_.frames[this.getAckFrameName_()], goog.bind(this.processIncomingAck, this)), this.checkLocalFramesPresent_())
};
goog.net.xpc.IframePollingTransport.prototype.isRcvFrameReady_ = function(a) {
  goog.net.xpc.logger.finest("checking for receive frame: " + a);
  try {
    var b = this.channel_.peerWindowObject_.frames[a];
    if(!b || 0 != b.location.href.indexOf(this.rcvUri_)) {
      return!1
    }
  }catch(c) {
    return!1
  }
  return!0
};
goog.net.xpc.IframePollingTransport.prototype.checkLocalFramesPresent_ = function() {
  var a = this.channel_.peerWindowObject_.frames;
  if(!a[this.getAckFrameName_()] || !a[this.getMsgFrameName_()]) {
    if(!this.checkLocalFramesPresentCb_) {
      this.checkLocalFramesPresentCb_ = goog.bind(this.checkLocalFramesPresent_, this)
    }
    this.getWindow().setTimeout(this.checkLocalFramesPresentCb_, 100);
    goog.net.xpc.logger.fine("local frames not (yet) present")
  }else {
    this.msgSender_ = new goog.net.xpc.IframePollingTransport.Sender(this.sendUri_, this.msgWinObj_), this.ackSender_ = new goog.net.xpc.IframePollingTransport.Sender(this.sendUri_, this.ackWinObj_), goog.net.xpc.logger.fine("local frames ready"), this.getWindow().setTimeout(goog.bind(function() {
      this.msgSender_.send(goog.net.xpc.SETUP);
      this.waitForAck_ = this.sentConnectionSetup_ = !0;
      goog.net.xpc.logger.fine("SETUP sent")
    }, this), 100)
  }
};
goog.net.xpc.IframePollingTransport.prototype.checkIfConnected_ = function() {
  if(this.sentConnectionSetupAck_ && this.rcvdConnectionSetupAck_) {
    if(this.channel_.notifyConnected_(), this.deliveryQueue_) {
      goog.net.xpc.logger.fine("delivering queued messages (" + this.deliveryQueue_.length + ")");
      for(var a = 0, b;a < this.deliveryQueue_.length;a++) {
        b = this.deliveryQueue_[a], this.channel_.deliver_(b.service, b.payload)
      }
      delete this.deliveryQueue_
    }
  }else {
    goog.net.xpc.logger.finest("checking if connected: ack sent:" + this.sentConnectionSetupAck_ + ", ack rcvd: " + this.rcvdConnectionSetupAck_)
  }
};
goog.net.xpc.IframePollingTransport.prototype.processIncomingMsg = function(a) {
  goog.net.xpc.logger.finest("msg received: " + a);
  if(a == goog.net.xpc.SETUP) {
    if(this.ackSender_) {
      this.ackSender_.send(goog.net.xpc.SETUP_ACK_), goog.net.xpc.logger.finest("SETUP_ACK sent"), this.sentConnectionSetupAck_ = !0, this.checkIfConnected_()
    }
  }else {
    if(this.channel_.isConnected() || this.sentConnectionSetupAck_) {
      var b = a.indexOf("|"), c = a.substring(0, b), a = a.substring(b + 1), b = c.indexOf(",");
      if(-1 == b) {
        var d;
        this.ackSender_.send("ACK:" + c);
        this.deliverPayload_(a)
      }else {
        d = c.substring(0, b);
        this.ackSender_.send("ACK:" + d);
        c = c.substring(b + 1).split("/");
        b = parseInt(c[0], 10);
        c = parseInt(c[1], 10);
        if(1 == b) {
          this.parts_ = []
        }
        this.parts_.push(a);
        b == c && (this.deliverPayload_(this.parts_.join("")), delete this.parts_)
      }
    }else {
      goog.net.xpc.logger.warning("received msg, but channel is not connected")
    }
  }
};
goog.net.xpc.IframePollingTransport.prototype.processIncomingAck = function(a) {
  goog.net.xpc.logger.finest("ack received: " + a);
  a == goog.net.xpc.SETUP_ACK_ ? (this.waitForAck_ = !1, this.rcvdConnectionSetupAck_ = !0, this.checkIfConnected_()) : this.channel_.isConnected() ? this.waitForAck_ ? parseInt(a.split(":")[1], 10) == this.sequence_ ? (this.waitForAck_ = !1, this.sendNextFrame_()) : goog.net.xpc.logger.warning("got ack with wrong sequence") : goog.net.xpc.logger.warning("got unexpected ack") : goog.net.xpc.logger.warning("received ack, but channel not connected")
};
goog.net.xpc.IframePollingTransport.prototype.sendNextFrame_ = function() {
  if(!this.waitForAck_ && this.sendQueue_.length) {
    var a = this.sendQueue_.shift();
    ++this.sequence_;
    this.msgSender_.send(this.sequence_ + a);
    goog.net.xpc.logger.finest("msg sent: " + this.sequence_ + a);
    this.waitForAck_ = !0
  }
};
goog.net.xpc.IframePollingTransport.prototype.deliverPayload_ = function(a) {
  var b = a.indexOf(":"), c = a.substr(0, b), a = a.substring(b + 1);
  this.channel_.isConnected() ? this.channel_.deliver_(c, a) : ((this.deliveryQueue_ || (this.deliveryQueue_ = [])).push({service:c, payload:a}), goog.net.xpc.logger.finest("queued delivery"))
};
goog.net.xpc.IframePollingTransport.prototype.MAX_FRAME_LENGTH_ = 3800;
goog.net.xpc.IframePollingTransport.prototype.send = function(a, b) {
  var c = a + ":" + b;
  if(!goog.userAgent.IE || b.length <= this.MAX_FRAME_LENGTH_) {
    this.sendQueue_.push("|" + c)
  }else {
    for(var d = b.length, e = Math.ceil(d / this.MAX_FRAME_LENGTH_), f = 0, g = 1;f < d;) {
      this.sendQueue_.push("," + g + "/" + e + "|" + c.substr(f, this.MAX_FRAME_LENGTH_)), g++, f += this.MAX_FRAME_LENGTH_
    }
  }
  this.sendNextFrame_()
};
goog.net.xpc.IframePollingTransport.prototype.disposeInternal = function() {
  goog.net.xpc.IframePollingTransport.superClass_.disposeInternal.call(this);
  var a = goog.net.xpc.IframePollingTransport.receivers_;
  goog.array.remove(a, this.msgReceiver_);
  goog.array.remove(a, this.ackReceiver_);
  this.msgReceiver_ = this.ackReceiver_ = null;
  goog.dom.removeNode(this.msgIframeElm_);
  goog.dom.removeNode(this.ackIframeElm_);
  this.msgWinObj_ = this.ackWinObj_ = this.msgIframeElm_ = this.ackIframeElm_ = null
};
goog.net.xpc.IframePollingTransport.receivers_ = [];
goog.net.xpc.IframePollingTransport.TIME_POLL_SHORT_ = 10;
goog.net.xpc.IframePollingTransport.TIME_POLL_LONG_ = 100;
goog.net.xpc.IframePollingTransport.TIME_SHORT_POLL_AFTER_ACTIVITY_ = 1E3;
goog.net.xpc.IframePollingTransport.receive_ = function() {
  var a = !1;
  try {
    for(var b = 0, c = goog.net.xpc.IframePollingTransport.receivers_.length;b < c;b++) {
      a = a || goog.net.xpc.IframePollingTransport.receivers_[b].receive()
    }
  }catch(d) {
    if(goog.net.xpc.logger.info("receive_() failed: " + d), goog.net.xpc.IframePollingTransport.receivers_[b].transport_.channel_.notifyTransportError_(), !goog.net.xpc.IframePollingTransport.receivers_.length) {
      return
    }
  }
  b = goog.now();
  if(a) {
    goog.net.xpc.IframePollingTransport.lastActivity_ = b
  }
  goog.net.xpc.IframePollingTransport.rcvTimer_ = window.setTimeout(goog.net.xpc.IframePollingTransport.receiveCb_, b - goog.net.xpc.IframePollingTransport.lastActivity_ < goog.net.xpc.IframePollingTransport.TIME_SHORT_POLL_AFTER_ACTIVITY_ ? goog.net.xpc.IframePollingTransport.TIME_POLL_SHORT_ : goog.net.xpc.IframePollingTransport.TIME_POLL_LONG_)
};
goog.net.xpc.IframePollingTransport.receiveCb_ = goog.bind(goog.net.xpc.IframePollingTransport.receive_, goog.net.xpc.IframePollingTransport);
goog.net.xpc.IframePollingTransport.startRcvTimer_ = function() {
  goog.net.xpc.logger.fine("starting receive-timer");
  goog.net.xpc.IframePollingTransport.lastActivity_ = goog.now();
  goog.net.xpc.IframePollingTransport.rcvTimer_ && window.clearTimeout(goog.net.xpc.IframePollingTransport.rcvTimer_);
  goog.net.xpc.IframePollingTransport.rcvTimer_ = window.setTimeout(goog.net.xpc.IframePollingTransport.receiveCb_, goog.net.xpc.IframePollingTransport.TIME_POLL_SHORT_)
};
goog.net.xpc.IframePollingTransport.Sender = function(a, b) {
  this.sendUri_ = a;
  this.sendFrame_ = b;
  this.cycle_ = 0
};
goog.net.xpc.IframePollingTransport.Sender.prototype.send = function(a) {
  this.cycle_ = ++this.cycle_ % 2;
  a = this.sendUri_ + "#" + this.cycle_ + encodeURIComponent(a);
  try {
    goog.userAgent.WEBKIT ? this.sendFrame_.location.href = a : this.sendFrame_.location.replace(a)
  }catch(b) {
    goog.net.xpc.logger.severe("sending failed", b)
  }
  goog.net.xpc.IframePollingTransport.startRcvTimer_()
};
goog.net.xpc.IframePollingTransport.Receiver = function(a, b, c) {
  this.transport_ = a;
  this.rcvFrame_ = b;
  this.cb_ = c;
  this.currentLoc_ = this.rcvFrame_.location.href.split("#")[0] + "#INITIAL";
  goog.net.xpc.IframePollingTransport.receivers_.push(this);
  goog.net.xpc.IframePollingTransport.startRcvTimer_()
};
goog.net.xpc.IframePollingTransport.Receiver.prototype.receive = function() {
  var a = this.rcvFrame_.location.href;
  if(a != this.currentLoc_) {
    this.currentLoc_ = a;
    if(a = a.split("#")[1]) {
      a = a.substr(1), this.cb_(decodeURIComponent(a))
    }
    return!0
  }
  return!1
};
goog.structs.CircularBuffer = function(a) {
  this.maxSize_ = a || 100;
  this.buff_ = []
};
goog.structs.CircularBuffer.prototype.nextPtr_ = 0;
goog.structs.CircularBuffer.prototype.add = function(a) {
  this.buff_[this.nextPtr_] = a;
  this.nextPtr_ = (this.nextPtr_ + 1) % this.maxSize_
};
goog.structs.CircularBuffer.prototype.get = function(a) {
  a = this.normalizeIndex_(a);
  return this.buff_[a]
};
goog.structs.CircularBuffer.prototype.set = function(a, b) {
  a = this.normalizeIndex_(a);
  this.buff_[a] = b
};
goog.structs.CircularBuffer.prototype.getCount = function() {
  return this.buff_.length
};
goog.structs.CircularBuffer.prototype.isEmpty = function() {
  return 0 == this.buff_.length
};
goog.structs.CircularBuffer.prototype.clear = function() {
  this.nextPtr_ = this.buff_.length = 0
};
goog.structs.CircularBuffer.prototype.getValues = function() {
  return this.getNewestValues(this.getCount())
};
goog.structs.CircularBuffer.prototype.getNewestValues = function(a) {
  for(var b = this.getCount(), c = [], a = this.getCount() - a;a < b;a++) {
    c[a] = this.get(a)
  }
  return c
};
goog.structs.CircularBuffer.prototype.getKeys = function() {
  for(var a = [], b = this.getCount(), c = 0;c < b;c++) {
    a[c] = c
  }
  return a
};
goog.structs.CircularBuffer.prototype.containsKey = function(a) {
  return a < this.getCount()
};
goog.structs.CircularBuffer.prototype.containsValue = function(a) {
  for(var b = this.getCount(), c = 0;c < b;c++) {
    if(this.get(c) == a) {
      return!0
    }
  }
  return!1
};
goog.structs.CircularBuffer.prototype.getLast = function() {
  return 0 == this.getCount() ? null : this.get(this.getCount() - 1)
};
goog.structs.CircularBuffer.prototype.normalizeIndex_ = function(a) {
  if(a >= this.buff_.length) {
    throw Error("Out of bounds exception");
  }
  return this.buff_.length < this.maxSize_ ? a : (this.nextPtr_ + Number(a)) % this.maxSize_
};
goog.debug.DebugWindow = function(a, b) {
  this.identifier_ = a || "";
  this.prefix_ = b || "";
  this.outputBuffer_ = [];
  this.savedMessages_ = new goog.structs.CircularBuffer(goog.debug.DebugWindow.MAX_SAVED);
  this.publishHandler_ = goog.bind(this.addLogRecord, this);
  this.formatter_ = new goog.debug.HtmlFormatter(this.prefix_);
  this.filteredLoggers_ = {};
  this.setCapturing(!0);
  this.enabled_ = goog.debug.DebugWindow.isEnabled(this.identifier_);
  goog.global.setInterval(goog.bind(this.saveWindowPositionSize_, this), 7500)
};
goog.debug.DebugWindow.MAX_SAVED = 500;
goog.debug.DebugWindow.COOKIE_TIME = 2592E6;
goog.debug.DebugWindow.prototype.welcomeMessage = "LOGGING";
goog.debug.DebugWindow.prototype.enableOnSevere_ = !1;
goog.debug.DebugWindow.prototype.win_ = null;
goog.debug.DebugWindow.prototype.winOpening_ = !1;
goog.debug.DebugWindow.prototype.isCapturing_ = !1;
goog.debug.DebugWindow.showedBlockedAlert_ = !1;
goog.debug.DebugWindow.prototype.bufferTimeout_ = null;
goog.debug.DebugWindow.prototype.lastCall_ = goog.now();
goog.debug.DebugWindow.prototype.setWelcomeMessage = function(a) {
  this.welcomeMessage = a
};
goog.debug.DebugWindow.prototype.init = function() {
  this.enabled_ && this.openWindow_()
};
goog.debug.DebugWindow.prototype.isEnabled = function() {
  return this.enabled_
};
goog.debug.DebugWindow.prototype.setEnabled = function(a) {
  if(this.enabled_ = a) {
    this.openWindow_(), this.win_ && this.writeInitialDocument_()
  }
  this.setCookie_("enabled", a ? "1" : "0")
};
goog.debug.DebugWindow.prototype.setForceEnableOnSevere = function(a) {
  this.enableOnSevere_ = a
};
goog.debug.DebugWindow.prototype.isCapturing = function() {
  return this.isCapturing_
};
goog.debug.DebugWindow.prototype.setCapturing = function(a) {
  if(a != this.isCapturing_) {
    this.isCapturing_ = a;
    var b = goog.debug.LogManager.getRoot();
    a ? b.addHandler(this.publishHandler_) : b.removeHandler(this.publishHandler_)
  }
};
goog.debug.DebugWindow.prototype.getFormatter = function() {
  return this.formatter_
};
goog.debug.DebugWindow.prototype.setFormatter = function(a) {
  this.formatter_ = a
};
goog.debug.DebugWindow.prototype.addSeparator = function() {
  this.write_("<hr>")
};
goog.debug.DebugWindow.prototype.hasActiveWindow = function() {
  return!!this.win_ && !this.win_.closed
};
goog.debug.DebugWindow.prototype.clear_ = function() {
  this.savedMessages_.clear();
  this.hasActiveWindow() && this.writeInitialDocument_()
};
goog.debug.DebugWindow.prototype.addLogRecord = function(a) {
  this.filteredLoggers_[a.getLoggerName()] || (this.enableOnSevere_ && a.getLevel() >= goog.debug.Logger.Level.SEVERE && this.setEnabled(!0), this.write_(this.formatter_.formatRecord(a)))
};
goog.debug.DebugWindow.prototype.write_ = function(a) {
  this.enabled_ ? (this.openWindow_(), this.savedMessages_.add(a), this.writeToLog_(a)) : this.savedMessages_.add(a)
};
goog.debug.DebugWindow.prototype.writeToLog_ = function(a) {
  this.outputBuffer_.push(a);
  goog.global.clearTimeout(this.bufferTimeout_);
  750 < goog.now() - this.lastCall_ ? this.writeBufferToLog_() : this.bufferTimeout_ = goog.global.setTimeout(goog.bind(this.writeBufferToLog_, this), 250)
};
goog.debug.DebugWindow.prototype.writeBufferToLog_ = function() {
  this.lastCall_ = goog.now();
  if(this.hasActiveWindow()) {
    var a = this.win_.document.body, a = a && 100 >= a.scrollHeight - (a.scrollTop + a.clientHeight);
    this.win_.document.write(this.outputBuffer_.join(""));
    this.outputBuffer_.length = 0;
    a && this.win_.scrollTo(0, 1E6)
  }
};
goog.debug.DebugWindow.prototype.writeSavedMessages_ = function() {
  for(var a = this.savedMessages_.getValues(), b = 0;b < a.length;b++) {
    this.writeToLog_(a[b])
  }
};
goog.debug.DebugWindow.prototype.openWindow_ = function() {
  if(!this.hasActiveWindow() && !this.winOpening_) {
    var a = this.getCookie_("dbg", "0,0,800,500").split(","), b = Number(a[0]), c = Number(a[1]), d = Number(a[2]), a = Number(a[3]);
    this.winOpening_ = !0;
    this.win_ = window.open("", this.getWindowName_(), "width=" + d + ",height=" + a + ",toolbar=no,resizable=yes,scrollbars=yes,left=" + b + ",top=" + c + ",status=no,screenx=" + b + ",screeny=" + c);
    if(!this.win_ && !this.showedBlockedAlert_) {
      alert("Logger popup was blocked"), this.showedBlockedAlert_ = !0
    }
    this.winOpening_ = !1;
    this.win_ && this.writeInitialDocument_()
  }
};
goog.debug.DebugWindow.prototype.getWindowName_ = function() {
  return goog.userAgent.IE ? this.identifier_.replace(/[\s\-\.\,]/g, "_") : this.identifier_
};
goog.debug.DebugWindow.prototype.getStyleRules = function() {
  return"*{font:normal 14px monospace;}.dbg-sev{color:#F00}.dbg-w{color:#E92}.dbg-sh{background-color:#fd4;font-weight:bold;color:#000}.dbg-i{color:#666}.dbg-f{color:#999}.dbg-ev{color:#0A0}.dbg-m{color:#990}"
};
goog.debug.DebugWindow.prototype.writeInitialDocument_ = function() {
  this.hasActiveWindow() || (this.win_.document.open(), this.writeToLog_("<style>" + this.getStyleRules() + '</style><hr><div class="dbg-ev" style="text-align:center">' + this.welcomeMessage + "<br><small>Logger: " + this.identifier_ + "</small></div><hr>"), this.writeSavedMessages_())
};
goog.debug.DebugWindow.prototype.setCookie_ = function(a, b) {
  a += this.identifier_;
  document.cookie = a + "=" + encodeURIComponent(b) + ";path=/;expires=" + (new Date(goog.now() + goog.debug.DebugWindow.COOKIE_TIME)).toUTCString()
};
goog.debug.DebugWindow.prototype.getCookie_ = function(a, b) {
  return goog.debug.DebugWindow.getCookieValue_(this.identifier_, a, b)
};
goog.debug.DebugWindow.getCookieValue_ = function(a, b, c) {
  var a = b + a, b = "" + document.cookie, d = b.indexOf(a + "=");
  return-1 != d ? (c = b.indexOf(";", d), decodeURIComponent(b.substring(d + a.length + 1, -1 == c ? b.length : c))) : c || ""
};
goog.debug.DebugWindow.isEnabled = function(a) {
  return"1" == goog.debug.DebugWindow.getCookieValue_(a, "enabled")
};
goog.debug.DebugWindow.prototype.saveWindowPositionSize_ = function() {
  this.hasActiveWindow() && this.setCookie_("dbg", (this.win_.screenX || this.win_.screenLeft || 0) + "," + (this.win_.screenY || this.win_.screenTop || 0) + "," + (this.win_.outerWidth || 800) + "," + (this.win_.outerHeight || 500))
};
goog.debug.DebugWindow.prototype.addFilter = function(a) {
  this.filteredLoggers_[a] = 1
};
goog.debug.DebugWindow.prototype.removeFilter = function(a) {
  delete this.filteredLoggers_[a]
};
goog.debug.FancyWindow = function(a, b) {
  goog.debug.DebugWindow.call(this, a, b)
};
goog.inherits(goog.debug.FancyWindow, goog.debug.DebugWindow);
goog.debug.FancyWindow.prototype.writeBufferToLog_ = function() {
  this.lastCall_ = goog.now();
  if(this.hasActiveWindow()) {
    for(var a = this.dh_.getElement("log"), b = 100 >= a.scrollHeight - (a.scrollTop + a.offsetHeight), c = 0;c < this.outputBuffer_.length;c++) {
      var d = this.dh_.createDom("div", "logmsg");
      d.innerHTML = this.outputBuffer_[c];
      a.appendChild(d)
    }
    this.outputBuffer_.length = 0;
    this.resizeStuff_();
    if(b) {
      a.scrollTop = a.scrollHeight
    }
  }
};
goog.debug.FancyWindow.prototype.writeInitialDocument_ = function() {
  if(this.hasActiveWindow()) {
    var a = this.win_.document;
    a.open();
    a.write(this.getHtml_());
    a.close();
    (goog.userAgent.IE ? a.body : this.win_).onresize = goog.bind(this.resizeStuff_, this);
    this.dh_ = new goog.dom.DomHelper(a);
    this.dh_.getElement("openbutton").onclick = goog.bind(this.openOptions_, this);
    this.dh_.getElement("closebutton").onclick = goog.bind(this.closeOptions_, this);
    this.dh_.getElement("clearbutton").onclick = goog.bind(this.clear_, this);
    this.writeSavedMessages_()
  }
};
goog.debug.FancyWindow.prototype.openOptions_ = function() {
  var a = this.dh_.getElement("optionsarea");
  a.innerHTML = "";
  for(var b = goog.debug.FancyWindow.getLoggers_(), c = this.dh_, d = 0;d < b.length;d++) {
    var e = goog.debug.Logger.getLogger(b[d]), e = e.getLevel() ? e.getLevel().name : "INHERIT", e = c.createDom("div", {}, this.getDropDown_("sel" + b[d], e), c.createDom("span", {}, b[d] || "(root)"));
    a.appendChild(e)
  }
  this.dh_.getElement("options").style.display = "block";
  return!1
};
goog.debug.FancyWindow.prototype.getDropDown_ = function(a, b) {
  for(var c = this.dh_, d = c.createDom("select", {id:a}), e = goog.debug.Logger.Level.PREDEFINED_LEVELS, f = 0;f < e.length;f++) {
    var g = e[f], h = c.createDom("option", {}, g.name);
    if(b == g.name) {
      h.selected = !0
    }
    d.appendChild(h)
  }
  d.appendChild(c.createDom("option", {selected:"INHERIT" == b}, "INHERIT"));
  return d
};
goog.debug.FancyWindow.prototype.closeOptions_ = function() {
  this.dh_.getElement("options").style.display = "none";
  for(var a = goog.debug.FancyWindow.getLoggers_(), b = this.dh_, c = 0;c < a.length;c++) {
    var d = goog.debug.Logger.getLogger(a[c]), e = b.getElement("sel" + a[c]), e = e.options[e.selectedIndex].text;
    "INHERIT" == e ? d.setLevel(null) : d.setLevel(goog.debug.Logger.Level.getPredefinedLevel(e))
  }
  return!1
};
goog.debug.FancyWindow.prototype.resizeStuff_ = function() {
  var a = this.dh_, b = a.getElement("log"), c = a.getElement("head");
  b.style.top = c.offsetHeight + "px";
  b.style.height = a.getDocument().body.offsetHeight - c.offsetHeight - (goog.userAgent.IE ? 4 : 0) + "px"
};
goog.debug.FancyWindow.getLoggers_ = function() {
  var a = goog.object.getKeys(goog.debug.LogManager.getLoggers());
  a.sort();
  return a
};
goog.debug.FancyWindow.prototype.getStyleRules = function() {
  return goog.debug.FancyWindow.superClass_.getStyleRules.call(this) + "html,body{height:100%;width:100%;margin:0px;padding:0px;background-color:#FFF;overflow:hidden}*{}.logmsg{border-bottom:1px solid #CCC;padding:2px;font:medium monospace;}#head{position:absolute;width:100%;font:x-small arial;border-bottom:2px solid #999;background-color:#EEE;}#head p{margin:0px 5px;}#log{position:absolute;width:100%;background-color:#FFF;}#options{position:absolute;right:0px;width:50%;height:100%;border-left:1px solid #999;background-color:#DDD;display:none;padding-left: 5px;font:normal small arial;overflow:auto;}#openbutton,#closebutton{text-decoration:underline;color:#00F;cursor:pointer;position:absolute;top:0px;right:5px;font:x-small arial;}#clearbutton{text-decoration:underline;color:#00F;cursor:pointer;position:absolute;top:0px;right:50px;font:x-small arial;}select{font:x-small arial;margin-right:10px;}hr{border:0;height:5px;background-color:#8c8;color:#8c8;}"
};
goog.debug.FancyWindow.prototype.getHtml_ = function() {
  return'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3.org/TR/html4/loose.dtd"><html><head><title>Logging: ' + this.identifier_ + "</title><style>" + this.getStyleRules() + '</style></head><body><div id="log" style="overflow:auto"></div><div id="head"><p><b>Logging: ' + this.identifier_ + "</b></p><p>" + this.welcomeMessage + '</p><span id="clearbutton">clear</span><span id="openbutton">options</span></div><div id="options"><big><b>Options:</b></big><div id="optionsarea"></div><span id="closebutton">save and close</span></div></body></html>'
};
goog.messaging.AbstractChannel = function() {
  goog.Disposable.call(this);
  this.services_ = {}
};
goog.inherits(goog.messaging.AbstractChannel, goog.Disposable);
goog.messaging.AbstractChannel.prototype.logger = goog.debug.Logger.getLogger("goog.messaging.AbstractChannel");
goog.messaging.AbstractChannel.prototype.connect = function(a) {
  a && a()
};
goog.messaging.AbstractChannel.prototype.isConnected = function() {
  return!0
};
goog.messaging.AbstractChannel.prototype.registerService = function(a, b, c) {
  this.services_[a] = {callback:b, objectPayload:!!c}
};
goog.messaging.AbstractChannel.prototype.registerDefaultService = function(a) {
  this.defaultService_ = a
};
goog.messaging.AbstractChannel.prototype.deliver = function(a, b) {
  var c = this.getService(a, b);
  c && (b = this.decodePayload(a, b, c.objectPayload), goog.isDefAndNotNull(b) && c.callback(b))
};
goog.messaging.AbstractChannel.prototype.getService = function(a, b) {
  var c = this.services_[a];
  if(c) {
    return c
  }
  if(this.defaultService_) {
    var c = goog.partial(this.defaultService_, a), d = goog.isObject(b);
    return{callback:c, objectPayload:d}
  }
  this.logger.warning('Unknown service name "' + a + '"');
  return null
};
goog.messaging.AbstractChannel.prototype.decodePayload = function(a, b, c) {
  if(c && goog.isString(b)) {
    try {
      return goog.json.parse(b)
    }catch(d) {
      return this.logger.warning("Expected JSON payload for " + a + ', was "' + b + '"'), null
    }
  }else {
    if(!c && !goog.isString(b)) {
      return goog.json.serialize(b)
    }
  }
  return b
};
goog.messaging.AbstractChannel.prototype.disposeInternal = function() {
  goog.messaging.AbstractChannel.superClass_.disposeInternal.call(this);
  goog.dispose(this.logger);
  delete this.logger;
  delete this.services_;
  delete this.defaultService_
};
goog.net.XhrManager = function(a, b, c, d, e) {
  this.maxRetries_ = goog.isDef(a) ? a : 1;
  this.timeoutInterval_ = goog.isDef(e) ? Math.max(0, e) : 0;
  this.xhrPool_ = new goog.net.XhrIoPool(b, c, d);
  this.requests_ = new goog.structs.Map;
  this.eventHandler_ = new goog.events.EventHandler(this)
};
goog.inherits(goog.net.XhrManager, goog.events.EventTarget);
goog.net.XhrManager.ERROR_ID_IN_USE_ = "[goog.net.XhrManager] ID in use";
goog.net.XhrManager.XHR_EVENT_TYPES_ = [goog.net.EventType.READY, goog.net.EventType.COMPLETE, goog.net.EventType.SUCCESS, goog.net.EventType.ERROR, goog.net.EventType.ABORT, goog.net.EventType.TIMEOUT];
goog.net.XhrManager.prototype.setTimeoutInterval = function(a) {
  this.timeoutInterval_ = Math.max(0, a)
};
goog.net.XhrManager.prototype.getOutstandingCount = function() {
  return this.requests_.getCount()
};
goog.net.XhrManager.prototype.send = function(a, b, c, d, e, f, g, h) {
  if(this.requests_.get(a)) {
    throw Error(goog.net.XhrManager.ERROR_ID_IN_USE_);
  }
  b = new goog.net.XhrManager.Request(b, goog.bind(this.handleEvent_, this, a), c, d, e, g, goog.isDef(h) ? h : this.maxRetries_);
  this.requests_.set(a, b);
  this.xhrPool_.getObject(goog.bind(this.handleAvailableXhr_, this, a), f);
  return b
};
goog.net.XhrManager.prototype.abort = function(a, b) {
  var c = this.requests_.get(a);
  if(c) {
    var d = c.xhrIo;
    c.setAborted(!0);
    b && (this.removeXhrListener_(d, c.getXhrEventCallback()), goog.events.listenOnce(d, goog.net.EventType.READY, function() {
      this.xhrPool_.releaseObject(d)
    }, !1, this), this.requests_.remove(a));
    d && d.abort()
  }
};
goog.net.XhrManager.prototype.handleAvailableXhr_ = function(a, b) {
  var c = this.requests_.get(a);
  c && !c.xhrIo ? (this.addXhrListener_(b, c.getXhrEventCallback()), b.setTimeoutInterval(this.timeoutInterval_), c.xhrIo = c.xhrLite = b, this.dispatchEvent(new goog.net.XhrManager.Event(goog.net.EventType.READY, this, a, b)), this.retry_(a, b), c.getAborted() && b.abort()) : this.xhrPool_.releaseObject(b)
};
goog.net.XhrManager.prototype.handleEvent_ = function(a, b) {
  var c = b.target;
  switch(b.type) {
    case goog.net.EventType.READY:
      this.retry_(a, c);
      break;
    case goog.net.EventType.COMPLETE:
      return this.handleComplete_(a, c, b);
    case goog.net.EventType.SUCCESS:
      this.handleSuccess_(a, c);
      break;
    case goog.net.EventType.TIMEOUT:
    ;
    case goog.net.EventType.ERROR:
      this.handleError_(a, c);
      break;
    case goog.net.EventType.ABORT:
      this.handleAbort_(a, c)
  }
  return null
};
goog.net.XhrManager.prototype.retry_ = function(a, b) {
  var c = this.requests_.get(a);
  c && !c.getCompleted() && !c.hasReachedMaxRetries() ? (c.increaseAttemptCount(), b.send(c.getUrl(), c.getMethod(), c.getContent(), c.getHeaders())) : (c && (this.removeXhrListener_(b, c.getXhrEventCallback()), this.requests_.remove(a)), this.xhrPool_.releaseObject(b))
};
goog.net.XhrManager.prototype.handleComplete_ = function(a, b, c) {
  var d = this.requests_.get(a);
  if(b.getLastErrorCode() == goog.net.ErrorCode.ABORT || b.isSuccess() || d.hasReachedMaxRetries()) {
    if(this.dispatchEvent(new goog.net.XhrManager.Event(goog.net.EventType.COMPLETE, this, a, b)), d && (d.setCompleted(!0), d.getCompleteCallback())) {
      return d.getCompleteCallback().call(b, c)
    }
  }
  return null
};
goog.net.XhrManager.prototype.handleAbort_ = function(a, b) {
  this.dispatchEvent(new goog.net.XhrManager.Event(goog.net.EventType.ABORT, this, a, b))
};
goog.net.XhrManager.prototype.handleSuccess_ = function(a, b) {
  this.dispatchEvent(new goog.net.XhrManager.Event(goog.net.EventType.SUCCESS, this, a, b))
};
goog.net.XhrManager.prototype.handleError_ = function(a, b) {
  this.requests_.get(a).hasReachedMaxRetries() && this.dispatchEvent(new goog.net.XhrManager.Event(goog.net.EventType.ERROR, this, a, b))
};
goog.net.XhrManager.prototype.removeXhrListener_ = function(a, b, c) {
  this.eventHandler_.unlisten(a, c || goog.net.XhrManager.XHR_EVENT_TYPES_, b)
};
goog.net.XhrManager.prototype.addXhrListener_ = function(a, b, c) {
  this.eventHandler_.listen(a, c || goog.net.XhrManager.XHR_EVENT_TYPES_, b)
};
goog.net.XhrManager.prototype.disposeInternal = function() {
  goog.net.XhrManager.superClass_.disposeInternal.call(this);
  this.xhrPool_.dispose();
  this.xhrPool_ = null;
  this.eventHandler_.dispose();
  this.eventHandler_ = null;
  var a = this.requests_;
  goog.structs.forEach(a, function(a) {
    a.dispose()
  });
  a.clear();
  this.requests_ = null
};
goog.net.XhrManager.Event = function(a, b, c, d) {
  goog.events.Event.call(this, a, b);
  this.id = c;
  this.xhrLite = this.xhrIo = d
};
goog.inherits(goog.net.XhrManager.Event, goog.events.Event);
goog.net.XhrManager.Event.prototype.disposeInternal = function() {
  goog.net.XhrManager.Event.superClass_.disposeInternal.call(this);
  delete this.id;
  this.xhrLite = this.xhrIo = null
};
goog.net.XhrManager.Request = function(a, b, c, d, e, f, g) {
  goog.Disposable.call(this);
  this.url_ = a;
  this.method_ = c || "GET";
  this.content_ = d;
  this.headers_ = e || null;
  this.maxRetries_ = goog.isDef(g) ? g : 1;
  this.attemptCount_ = 0;
  this.aborted_ = this.completed_ = !1;
  this.xhrEventCallback_ = b;
  this.completeCallback_ = f;
  this.xhrIo = null
};
goog.inherits(goog.net.XhrManager.Request, goog.Disposable);
goog.net.XhrManager.Request.prototype.getUrl = function() {
  return this.url_
};
goog.net.XhrManager.Request.prototype.getMethod = function() {
  return this.method_
};
goog.net.XhrManager.Request.prototype.getContent = function() {
  return this.content_
};
goog.net.XhrManager.Request.prototype.getHeaders = function() {
  return this.headers_
};
goog.net.XhrManager.Request.prototype.getMaxRetries = function() {
  return this.maxRetries_
};
goog.net.XhrManager.Request.prototype.getAttemptCount = function() {
  return this.attemptCount_
};
goog.net.XhrManager.Request.prototype.increaseAttemptCount = function() {
  this.attemptCount_++
};
goog.net.XhrManager.Request.prototype.hasReachedMaxRetries = function() {
  return this.attemptCount_ > this.maxRetries_
};
goog.net.XhrManager.Request.prototype.setCompleted = function(a) {
  this.completed_ = a
};
goog.net.XhrManager.Request.prototype.getCompleted = function() {
  return this.completed_
};
goog.net.XhrManager.Request.prototype.setAborted = function(a) {
  this.aborted_ = a
};
goog.net.XhrManager.Request.prototype.getAborted = function() {
  return this.aborted_
};
goog.net.XhrManager.Request.prototype.getXhrEventCallback = function() {
  return this.xhrEventCallback_
};
goog.net.XhrManager.Request.prototype.getCompleteCallback = function() {
  return this.completeCallback_
};
goog.net.XhrManager.Request.prototype.disposeInternal = function() {
  goog.net.XhrManager.Request.superClass_.disposeInternal.call(this);
  delete this.xhrEventCallback_;
  delete this.completeCallback_
};
goog.debug.Console = function() {
  this.publishHandler_ = goog.bind(this.addLogRecord, this);
  this.formatter_ = new goog.debug.TextFormatter;
  this.formatter_.showAbsoluteTime = !1;
  this.isCapturing_ = this.formatter_.showExceptionText = !1;
  this.logBuffer_ = ""
};
goog.debug.Console.prototype.getFormatter = function() {
  return this.formatter_
};
goog.debug.Console.prototype.setCapturing = function(a) {
  if(a != this.isCapturing_) {
    var b = goog.debug.LogManager.getRoot();
    a ? b.addHandler(this.publishHandler_) : (b.removeHandler(this.publishHandler_), this.logBuffer = "");
    this.isCapturing_ = a
  }
};
goog.debug.Console.prototype.addLogRecord = function(a) {
  var b = this.formatter_.formatRecord(a);
  if(window.console && window.console.firebug) {
    switch(a.getLevel()) {
      case goog.debug.Logger.Level.SHOUT:
        window.console.info(b);
        break;
      case goog.debug.Logger.Level.SEVERE:
        window.console.error(b);
        break;
      case goog.debug.Logger.Level.WARNING:
        window.console.warn(b);
        break;
      default:
        window.console.debug(b)
    }
  }else {
    window.console ? window.console.log(b) : window.opera ? window.opera.postError(b) : this.logBuffer_ += b
  }
};
goog.debug.Console.instance = null;
goog.debug.Console.autoInstall = function() {
  if(!goog.debug.Console.instance) {
    goog.debug.Console.instance = new goog.debug.Console
  }
  -1 != window.location.href.indexOf("Debug=true") && goog.debug.Console.instance.setCapturing(!0)
};
goog.debug.Console.show = function() {
  alert(goog.debug.Console.instance.logBuffer_)
};
goog.net.xpc.IframeRelayTransport = function(a, b) {
  goog.net.xpc.Transport.call(this, b);
  this.channel_ = a;
  this.peerRelayUri_ = this.channel_.cfg_[goog.net.xpc.CfgFields.PEER_RELAY_URI];
  this.peerIframeId_ = this.channel_.cfg_[goog.net.xpc.CfgFields.IFRAME_ID];
  goog.userAgent.WEBKIT && goog.net.xpc.IframeRelayTransport.startCleanupTimer_()
};
goog.inherits(goog.net.xpc.IframeRelayTransport, goog.net.xpc.Transport);
if(goog.userAgent.WEBKIT) {
  goog.net.xpc.IframeRelayTransport.iframeRefs_ = [], goog.net.xpc.IframeRelayTransport.CLEANUP_INTERVAL_ = 1E3, goog.net.xpc.IframeRelayTransport.IFRAME_MAX_AGE_ = 3E3, goog.net.xpc.IframeRelayTransport.cleanupTimer_ = 0, goog.net.xpc.IframeRelayTransport.startCleanupTimer_ = function() {
    if(!goog.net.xpc.IframeRelayTransport.cleanupTimer_) {
      goog.net.xpc.IframeRelayTransport.cleanupTimer_ = window.setTimeout(function() {
        goog.net.xpc.IframeRelayTransport.cleanup_()
      }, goog.net.xpc.IframeRelayTransport.CLEANUP_INTERVAL_)
    }
  }, goog.net.xpc.IframeRelayTransport.cleanup_ = function(a) {
    for(var b = goog.now(), a = a || goog.net.xpc.IframeRelayTransport.IFRAME_MAX_AGE_;goog.net.xpc.IframeRelayTransport.iframeRefs_.length && b - goog.net.xpc.IframeRelayTransport.iframeRefs_[0].timestamp >= a;) {
      var c = goog.net.xpc.IframeRelayTransport.iframeRefs_.shift().iframeElement;
      goog.dom.removeNode(c);
      goog.net.xpc.logger.finest("iframe removed")
    }
    goog.net.xpc.IframeRelayTransport.cleanupTimer_ = window.setTimeout(goog.net.xpc.IframeRelayTransport.cleanupCb_, goog.net.xpc.IframeRelayTransport.CLEANUP_INTERVAL_)
  }, goog.net.xpc.IframeRelayTransport.cleanupCb_ = function() {
    goog.net.xpc.IframeRelayTransport.cleanup_()
  }
}
goog.net.xpc.IframeRelayTransport.IE_PAYLOAD_MAX_SIZE_ = 1800;
goog.net.xpc.IframeRelayTransport.fragmentMap_ = {};
goog.net.xpc.IframeRelayTransport.prototype.transportType = goog.net.xpc.TransportTypes.IFRAME_RELAY;
goog.net.xpc.IframeRelayTransport.prototype.connect = function() {
  if(!this.getWindow().xpcRelay) {
    this.getWindow().xpcRelay = goog.net.xpc.IframeRelayTransport.receiveMessage_
  }
  this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP)
};
goog.net.xpc.IframeRelayTransport.receiveMessage_ = function(a, b) {
  var c = b.indexOf(":"), d = b.substr(0, c), e = b.substr(c + 1);
  if(!goog.userAgent.IE || -1 == (c = d.indexOf("|"))) {
    var f = d
  }else {
    var f = d.substr(0, c), d = d.substr(c + 1), c = d.indexOf("+"), g = d.substr(0, c), c = parseInt(d.substr(c + 1), 10), h = goog.net.xpc.IframeRelayTransport.fragmentMap_[g];
    h || (h = goog.net.xpc.IframeRelayTransport.fragmentMap_[g] = {fragments:[], received:0, expected:0});
    if(goog.string.contains(d, "++")) {
      h.expected = c + 1
    }
    h.fragments[c] = e;
    h.received++;
    if(h.received != h.expected) {
      return
    }
    e = h.fragments.join("");
    delete goog.net.xpc.IframeRelayTransport.fragmentMap_[g]
  }
  goog.net.xpc.channels_[a].deliver_(f, decodeURIComponent(e))
};
goog.net.xpc.IframeRelayTransport.prototype.transportServiceHandler = function(a) {
  a == goog.net.xpc.SETUP ? (this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP_ACK_), this.channel_.notifyConnected_()) : a == goog.net.xpc.SETUP_ACK_ && this.channel_.notifyConnected_()
};
goog.net.xpc.IframeRelayTransport.prototype.send = function(a, b) {
  var c = encodeURIComponent(b), d = c.length, e = goog.net.xpc.IframeRelayTransport.IE_PAYLOAD_MAX_SIZE_;
  if(goog.userAgent.IE && d > e) {
    for(var f = goog.string.getRandomString(), g = 0, h = 0;g < d;h++) {
      var i = c.substr(g, e), g = g + e;
      this.send_(a, i, f + (g >= d ? "++" : "+") + h)
    }
  }else {
    this.send_(a, c)
  }
};
goog.net.xpc.IframeRelayTransport.prototype.send_ = function(a, b, c) {
  if(goog.userAgent.IE) {
    var d = this.getWindow().document.createElement("div");
    d.innerHTML = '<iframe onload="this.xpcOnload()"></iframe>';
    d = d.childNodes[0];
    d.xpcOnload = goog.net.xpc.IframeRelayTransport.iframeLoadHandler_
  }else {
    d = this.getWindow().document.createElement("iframe"), goog.userAgent.WEBKIT ? goog.net.xpc.IframeRelayTransport.iframeRefs_.push({timestamp:goog.now(), iframeElement:d}) : goog.events.listen(d, "load", goog.net.xpc.IframeRelayTransport.iframeLoadHandler_)
  }
  var e = d.style;
  e.visibility = "hidden";
  e.width = d.style.height = "0px";
  e.position = "absolute";
  e = this.peerRelayUri_;
  e += "#" + this.channel_.name;
  this.peerIframeId_ && (e += "," + this.peerIframeId_);
  e += "|" + a;
  c && (e += "|" + c);
  e += ":" + b;
  d.src = e;
  this.getWindow().document.body.appendChild(d);
  goog.net.xpc.logger.finest("msg sent: " + e)
};
goog.net.xpc.IframeRelayTransport.iframeLoadHandler_ = function() {
  goog.net.xpc.logger.finest("iframe-load");
  goog.dom.removeNode(this);
  this.xpcOnload = null
};
goog.net.xpc.IframeRelayTransport.prototype.disposeInternal = function() {
  goog.net.xpc.IframeRelayTransport.superClass_.disposeInternal.call(this);
  goog.userAgent.WEBKIT && goog.net.xpc.IframeRelayTransport.cleanup_(0)
};
goog.net.xpc.NativeMessagingTransport = function(a, b, c) {
  goog.net.xpc.Transport.call(this, c);
  this.channel_ = a;
  this.peerHostname_ = b || "*"
};
goog.inherits(goog.net.xpc.NativeMessagingTransport, goog.net.xpc.Transport);
goog.net.xpc.NativeMessagingTransport.prototype.initialized_ = !1;
goog.net.xpc.NativeMessagingTransport.prototype.transportType = goog.net.xpc.TransportTypes.NATIVE_MESSAGING;
goog.net.xpc.NativeMessagingTransport.activeCount_ = {};
goog.net.xpc.NativeMessagingTransport.initialize_ = function(a) {
  var b = goog.getUid(a), c = goog.net.xpc.NativeMessagingTransport.activeCount_[b];
  goog.isNumber(c) || (c = 0);
  0 == c && goog.events.listen(a.postMessage ? a : a.document, "message", goog.net.xpc.NativeMessagingTransport.messageReceived_, !1, goog.net.xpc.NativeMessagingTransport);
  goog.net.xpc.NativeMessagingTransport.activeCount_[b] = c + 1
};
goog.net.xpc.NativeMessagingTransport.messageReceived_ = function(a) {
  var b = a.getBrowserEvent().data, c = b.indexOf("|"), d = b.indexOf(":");
  if(-1 == c || -1 == d) {
    return!1
  }
  var e = b.substring(0, c), c = b.substring(c + 1, d), b = b.substring(d + 1);
  goog.net.xpc.logger.fine("messageReceived: channel=" + e + ", service=" + c + ", payload=" + b);
  if(d = goog.net.xpc.channels_[e]) {
    return d.deliver_(c, b, a.getBrowserEvent().origin), !0
  }
  for(var f in goog.net.xpc.channels_) {
    if(a = goog.net.xpc.channels_[f], a.getRole() == goog.net.xpc.CrossPageChannel.Role.INNER && !a.isConnected() && c == goog.net.xpc.TRANSPORT_SERVICE_ && b == goog.net.xpc.SETUP) {
      return goog.net.xpc.logger.fine("changing channel name to " + e), a.name = e, delete goog.net.xpc.channels_[f], goog.net.xpc.channels_[e] = a, a.deliver_(c, b), !0
    }
  }
  goog.net.xpc.logger.info('channel name mismatch; message ignored"');
  return!1
};
goog.net.xpc.NativeMessagingTransport.prototype.transportServiceHandler = function(a) {
  switch(a) {
    case goog.net.xpc.SETUP:
      this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP_ACK_);
      break;
    case goog.net.xpc.SETUP_ACK_:
      this.channel_.notifyConnected_()
  }
};
goog.net.xpc.NativeMessagingTransport.prototype.connect = function() {
  goog.net.xpc.NativeMessagingTransport.initialize_(this.getWindow());
  this.initialized_ = !0;
  this.connectWithRetries_()
};
goog.net.xpc.NativeMessagingTransport.prototype.connectWithRetries_ = function() {
  !this.channel_.isConnected() && !this.isDisposed() && (this.send(goog.net.xpc.TRANSPORT_SERVICE_, goog.net.xpc.SETUP), this.getWindow().setTimeout(goog.bind(this.connectWithRetries_, this), 100))
};
goog.net.xpc.NativeMessagingTransport.prototype.send = function(a, b) {
  var c = this.channel_.peerWindowObject_;
  if(c) {
    var d = c.postMessage ? c : c.document;
    this.send = function(a, b) {
      goog.net.xpc.logger.fine("send(): payload=" + b + " to hostname=" + this.peerHostname_);
      d.postMessage(this.channel_.name + "|" + a + ":" + b, this.peerHostname_)
    };
    this.send(a, b)
  }else {
    goog.net.xpc.logger.fine("send(): window not ready")
  }
};
goog.net.xpc.NativeMessagingTransport.prototype.disposeInternal = function() {
  goog.net.xpc.NativeMessagingTransport.superClass_.disposeInternal.call(this);
  if(this.initialized_) {
    var a = this.getWindow(), b = goog.getUid(a), c = goog.net.xpc.NativeMessagingTransport.activeCount_[b];
    goog.net.xpc.NativeMessagingTransport.activeCount_[b] = c - 1;
    1 == c && goog.events.unlisten(a.postMessage ? a : a.document, "message", goog.net.xpc.NativeMessagingTransport.messageReceived_, !1, goog.net.xpc.NativeMessagingTransport)
  }
};
goog.net.xpc.CrossPageChannel = function(a, b) {
  goog.messaging.AbstractChannel.call(this);
  for(var c = 0, d;d = goog.net.xpc.UriCfgFields[c];c++) {
    if(d in a && !/^https?:\/\//.test(a[d])) {
      throw Error("URI " + a[d] + " is invalid for field " + d);
    }
  }
  this.cfg_ = a;
  this.name = this.cfg_[goog.net.xpc.CfgFields.CHANNEL_NAME] || goog.net.xpc.getRandomString(10);
  this.domHelper_ = b || goog.dom.getDomHelper();
  goog.net.xpc.channels_[this.name] = this;
  goog.events.listen(window, "unload", goog.net.xpc.CrossPageChannel.disposeAll_);
  goog.net.xpc.logger.info("CrossPageChannel created: " + this.name)
};
goog.inherits(goog.net.xpc.CrossPageChannel, goog.messaging.AbstractChannel);
goog.net.xpc.CrossPageChannel.TRANSPORT_SERVICE_ESCAPE_RE_ = RegExp("^%*" + goog.net.xpc.TRANSPORT_SERVICE_ + "$");
goog.net.xpc.CrossPageChannel.TRANSPORT_SERVICE_UNESCAPE_RE_ = RegExp("^%+" + goog.net.xpc.TRANSPORT_SERVICE_ + "$");
goog.net.xpc.CrossPageChannel.prototype.transport_ = null;
goog.net.xpc.CrossPageChannel.prototype.state_ = goog.net.xpc.ChannelStates.NOT_CONNECTED;
goog.net.xpc.CrossPageChannel.prototype.isConnected = function() {
  return this.state_ == goog.net.xpc.ChannelStates.CONNECTED
};
goog.net.xpc.CrossPageChannel.prototype.peerWindowObject_ = null;
goog.net.xpc.CrossPageChannel.prototype.iframeElement_ = null;
goog.net.xpc.CrossPageChannel.prototype.setPeerWindowObject = function(a) {
  this.peerWindowObject_ = a
};
goog.net.xpc.CrossPageChannel.prototype.determineTransportType_ = function() {
  var a;
  if(goog.isFunction(document.postMessage) || goog.isFunction(window.postMessage) || goog.userAgent.IE && window.postMessage) {
    a = goog.net.xpc.TransportTypes.NATIVE_MESSAGING
  }else {
    if(goog.userAgent.GECKO) {
      a = goog.net.xpc.TransportTypes.FRAME_ELEMENT_METHOD
    }else {
      if(goog.userAgent.IE && this.cfg_[goog.net.xpc.CfgFields.PEER_RELAY_URI]) {
        a = goog.net.xpc.TransportTypes.IFRAME_RELAY
      }else {
        if(goog.userAgent.IE) {
          a = goog.net.xpc.TransportTypes.NIX
        }else {
          if(this.cfg_[goog.net.xpc.CfgFields.LOCAL_POLL_URI] && this.cfg_[goog.net.xpc.CfgFields.PEER_POLL_URI]) {
            a = goog.net.xpc.TransportTypes.IFRAME_POLLING
          }
        }
      }
    }
  }
  return a
};
goog.net.xpc.CrossPageChannel.prototype.createTransport_ = function() {
  if(!this.transport_) {
    this.cfg_[goog.net.xpc.CfgFields.TRANSPORT] || (this.cfg_[goog.net.xpc.CfgFields.TRANSPORT] = this.determineTransportType_());
    switch(this.cfg_[goog.net.xpc.CfgFields.TRANSPORT]) {
      case goog.net.xpc.TransportTypes.NATIVE_MESSAGING:
        this.transport_ = new goog.net.xpc.NativeMessagingTransport(this, this.cfg_[goog.net.xpc.CfgFields.PEER_HOSTNAME], this.domHelper_);
        break;
      case goog.net.xpc.TransportTypes.NIX:
        this.transport_ = new goog.net.xpc.NixTransport(this, this.domHelper_);
        break;
      case goog.net.xpc.TransportTypes.FRAME_ELEMENT_METHOD:
        this.transport_ = new goog.net.xpc.FrameElementMethodTransport(this, this.domHelper_);
        break;
      case goog.net.xpc.TransportTypes.IFRAME_RELAY:
        this.transport_ = new goog.net.xpc.IframeRelayTransport(this, this.domHelper_);
        break;
      case goog.net.xpc.TransportTypes.IFRAME_POLLING:
        this.transport_ = new goog.net.xpc.IframePollingTransport(this, this.domHelper_)
    }
    if(this.transport_) {
      goog.net.xpc.logger.info("Transport created: " + this.transport_.getName())
    }else {
      throw Error("CrossPageChannel: No suitable transport found!");
    }
  }
};
goog.net.xpc.CrossPageChannel.prototype.getTransportType = function() {
  return this.transport_.getType()
};
goog.net.xpc.CrossPageChannel.prototype.getTransportName = function() {
  return this.transport_.getName()
};
goog.net.xpc.CrossPageChannel.prototype.getPeerConfiguration = function() {
  var a = {};
  a[goog.net.xpc.CfgFields.CHANNEL_NAME] = this.name;
  a[goog.net.xpc.CfgFields.TRANSPORT] = this.cfg_[goog.net.xpc.CfgFields.TRANSPORT];
  this.cfg_[goog.net.xpc.CfgFields.LOCAL_RELAY_URI] && (a[goog.net.xpc.CfgFields.PEER_RELAY_URI] = this.cfg_[goog.net.xpc.CfgFields.LOCAL_RELAY_URI]);
  this.cfg_[goog.net.xpc.CfgFields.LOCAL_POLL_URI] && (a[goog.net.xpc.CfgFields.PEER_POLL_URI] = this.cfg_[goog.net.xpc.CfgFields.LOCAL_POLL_URI]);
  this.cfg_[goog.net.xpc.CfgFields.PEER_POLL_URI] && (a[goog.net.xpc.CfgFields.LOCAL_POLL_URI] = this.cfg_[goog.net.xpc.CfgFields.PEER_POLL_URI]);
  return a
};
goog.net.xpc.CrossPageChannel.prototype.createPeerIframe = function(a, b, c) {
  var d = this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID];
  d || (d = this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID] = "xpcpeer" + goog.net.xpc.getRandomString(4));
  var e = goog.dom.createElement("IFRAME");
  e.id = e.name = d;
  b ? b(e) : e.style.width = e.style.height = "100%";
  var f = this.cfg_[goog.net.xpc.CfgFields.PEER_URI];
  goog.isString(f) && (f = this.cfg_[goog.net.xpc.CfgFields.PEER_URI] = new goog.Uri(f));
  !1 !== c && f.setParameterValue("xpc", goog.json.serialize(this.getPeerConfiguration()));
  goog.userAgent.GECKO || goog.userAgent.WEBKIT ? (this.deferConnect_ = !0, window.setTimeout(goog.bind(function() {
    this.deferConnect_ = !1;
    a.appendChild(e);
    e.src = f.toString();
    goog.net.xpc.logger.info("peer iframe created (" + d + ")");
    this.connectDeferred_ && this.connect(this.connectCb_)
  }, this), 1)) : (e.src = f.toString(), a.appendChild(e), goog.net.xpc.logger.info("peer iframe created (" + d + ")"));
  return e
};
goog.net.xpc.CrossPageChannel.prototype.deferConnect_ = !1;
goog.net.xpc.CrossPageChannel.prototype.connectDeferred_ = !1;
goog.net.xpc.CrossPageChannel.prototype.connect = function(a) {
  this.connectCb_ = a || goog.nullFunction;
  if(this.deferConnect_) {
    goog.net.xpc.logger.info("connect() deferred"), this.connectDeferred_ = !0
  }else {
    goog.net.xpc.logger.info("connect()");
    if(this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID]) {
      this.iframeElement_ = this.domHelper_.getElement(this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID])
    }
    if(this.iframeElement_) {
      (a = this.iframeElement_.contentWindow) || (a = window.frames[this.cfg_[goog.net.xpc.CfgFields.IFRAME_ID]]), this.setPeerWindowObject(a)
    }
    if(!this.peerWindowObject_) {
      if(window == top) {
        throw Error("CrossPageChannel: Can't connect, peer window-object not set.");
      }
      this.setPeerWindowObject(window.parent)
    }
    this.createTransport_();
    this.transport_.connect()
  }
};
goog.net.xpc.CrossPageChannel.prototype.close = function() {
  if(this.isConnected()) {
    this.state_ = goog.net.xpc.ChannelStates.CLOSED, this.transport_.dispose(), this.transport_ = null, goog.net.xpc.logger.info('Channel "' + this.name + '" closed')
  }
};
goog.net.xpc.CrossPageChannel.prototype.notifyConnected_ = function() {
  if(!this.isConnected()) {
    this.state_ = goog.net.xpc.ChannelStates.CONNECTED, goog.net.xpc.logger.info('Channel "' + this.name + '" connected'), this.connectCb_()
  }
};
goog.net.xpc.CrossPageChannel.prototype.notifyTransportError_ = function() {
  goog.net.xpc.logger.info("Transport Error");
  this.close()
};
goog.net.xpc.CrossPageChannel.prototype.send = function(a, b) {
  this.isConnected() ? this.peerWindowObject_.closed ? (goog.net.xpc.logger.severe("Peer has disappeared."), this.close()) : (goog.isObject(b) && (b = goog.json.serialize(b)), this.transport_.send(this.escapeServiceName_(a), b)) : goog.net.xpc.logger.severe("Can't send. Channel not connected.")
};
goog.net.xpc.CrossPageChannel.prototype.deliver_ = function(a, b, c) {
  this.isMessageOriginAcceptable_(c) ? this.isDisposed() ? goog.net.xpc.logger.warning("CrossPageChannel::deliver_(): Disposed.") : !a || a == goog.net.xpc.TRANSPORT_SERVICE_ ? this.transport_.transportServiceHandler(b) : this.isConnected() ? this.deliver(this.unescapeServiceName_(a), b) : goog.net.xpc.logger.info("CrossPageChannel::deliver_(): Not connected.") : goog.net.xpc.logger.warning('Message received from unapproved origin "' + c + '" - rejected.')
};
goog.net.xpc.CrossPageChannel.prototype.escapeServiceName_ = function(a) {
  goog.net.xpc.CrossPageChannel.TRANSPORT_SERVICE_ESCAPE_RE_.test(a) && (a = "%" + a);
  return a.replace(/[%:|]/g, encodeURIComponent)
};
goog.net.xpc.CrossPageChannel.prototype.unescapeServiceName_ = function(a) {
  a = a.replace(/%[0-9a-f]{2}/gi, decodeURIComponent);
  return goog.net.xpc.CrossPageChannel.TRANSPORT_SERVICE_UNESCAPE_RE_.test(a) ? a.substring(1) : a
};
goog.net.xpc.CrossPageChannel.Role = {OUTER:0, INNER:1};
goog.net.xpc.CrossPageChannel.prototype.getRole = function() {
  return window.parent == this.peerWindowObject_ ? goog.net.xpc.CrossPageChannel.Role.INNER : goog.net.xpc.CrossPageChannel.Role.OUTER
};
goog.net.xpc.CrossPageChannel.prototype.isMessageOriginAcceptable_ = function(a) {
  var b = this.cfg_[goog.net.xpc.CfgFields.PEER_HOSTNAME];
  return goog.string.isEmptySafe(a) || goog.string.isEmptySafe(b) || a == this.cfg_[goog.net.xpc.CfgFields.PEER_HOSTNAME]
};
goog.net.xpc.CrossPageChannel.prototype.disposeInternal = function() {
  goog.net.xpc.CrossPageChannel.superClass_.disposeInternal.call(this);
  this.close();
  this.iframeElement_ = this.peerWindowObject_ = null;
  delete goog.net.xpc.channels_[this.name]
};
goog.net.xpc.CrossPageChannel.disposeAll_ = function() {
  for(var a in goog.net.xpc.channels_) {
    var b = goog.net.xpc.channels_[a];
    b && b.dispose()
  }
};
goog.dom.xml = {};
goog.dom.xml.MAX_XML_SIZE_KB = 2048;
goog.dom.xml.MAX_ELEMENT_DEPTH = 256;
goog.dom.xml.createDocument = function(a, b) {
  if(b && !a) {
    throw Error("Can't create document with namespace and no root tag");
  }
  if(document.implementation && document.implementation.createDocument) {
    return document.implementation.createDocument(b || "", a || "", null)
  }
  if("undefined" != typeof ActiveXObject) {
    var c = goog.dom.xml.createMsXmlDocument_();
    if(c) {
      return a && c.appendChild(c.createNode(goog.dom.NodeType.ELEMENT, a, b || "")), c
    }
  }
  throw Error("Your browser does not support creating new documents");
};
goog.dom.xml.loadXml = function(a) {
  if("undefined" != typeof DOMParser) {
    return(new DOMParser).parseFromString(a, "application/xml")
  }
  if("undefined" != typeof ActiveXObject) {
    var b = goog.dom.xml.createMsXmlDocument_();
    b.loadXML(a);
    return b
  }
  throw Error("Your browser does not support loading xml documents");
};
goog.dom.xml.serialize = function(a) {
  if("undefined" != typeof XMLSerializer) {
    return(new XMLSerializer).serializeToString(a)
  }
  if(a = a.xml) {
    return a
  }
  throw Error("Your browser does not support serializing XML documents");
};
goog.dom.xml.selectSingleNode = function(a, b) {
  if("undefined" != typeof a.selectSingleNode) {
    var c = goog.dom.getOwnerDocument(a);
    "undefined" != typeof c.setProperty && c.setProperty("SelectionLanguage", "XPath");
    return a.selectSingleNode(b)
  }
  if(document.implementation.hasFeature("XPath", "3.0")) {
    var c = goog.dom.getOwnerDocument(a), d = c.createNSResolver(c.documentElement);
    return c.evaluate(b, a, d, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  }
  return null
};
goog.dom.xml.selectNodes = function(a, b) {
  if("undefined" != typeof a.selectNodes) {
    var c = goog.dom.getOwnerDocument(a);
    "undefined" != typeof c.setProperty && c.setProperty("SelectionLanguage", "XPath");
    return a.selectNodes(b)
  }
  if(document.implementation.hasFeature("XPath", "3.0")) {
    for(var c = goog.dom.getOwnerDocument(a), d = c.createNSResolver(c.documentElement), c = c.evaluate(b, a, d, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null), d = [], e = c.snapshotLength, f = 0;f < e;f++) {
      d.push(c.snapshotItem(f))
    }
    return d
  }
  return[]
};
goog.dom.xml.createMsXmlDocument_ = function() {
  var a = new ActiveXObject("MSXML2.DOMDocument");
  if(a) {
    a.resolveExternals = !1;
    a.validateOnParse = !1;
    try {
      a.setProperty("ProhibitDTD", !0), a.setProperty("MaxXMLSize", goog.dom.xml.MAX_XML_SIZE_KB), a.setProperty("MaxElementDepth", goog.dom.xml.MAX_ELEMENT_DEPTH)
    }catch(b) {
    }
  }
  return a
};
var cljs = {core:{}};
cljs.core._STAR_print_fn_STAR_ = function() {
  throw Error("No *print-fn* fn set for evaluation environment");
};
cljs.core.truth_ = function(a) {
  return null != a && !1 !== a
};
cljs.core.type_satisfies_ = function(a, b) {
  var c = a[goog.typeOf.call(null, b)];
  if(cljs.core.truth_(c)) {
    return c
  }
  c = a._;
  return cljs.core.truth_(c) ? c : !1
};
cljs.core.is_proto_ = function(a) {
  return a.constructor.prototype === a
};
cljs.core._STAR_main_cli_fn_STAR_ = null;
cljs.core.missing_protocol = function(a, b) {
  return Error.call(null, "No protocol method " + a + " defined for type " + goog.typeOf.call(null, b) + ": " + b)
};
cljs.core.aclone = function(a) {
  return Array.prototype.slice.call(a)
};
cljs.core.array = function(a) {
  return Array.prototype.slice.call(arguments)
};
cljs.core.aget = function(a, b) {
  return a[b]
};
cljs.core.aset = function(a, b, c) {
  return a[b] = c
};
cljs.core.alength = function(a) {
  return a.length
};
cljs.core.IFn = {};
cljs.core._invoke = function() {
  var a = null;
  return function(a, c, d, e, f, g, h, i, j, k, l, m, p, n, q, o, s, t, r, v, I) {
    switch(arguments.length) {
      case 1:
        var B;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke : a)) {
          B = a.cljs$core$IFn$_invoke(a)
        }else {
          var C;
          var D = cljs.core._invoke[goog.typeOf.call(null, a)];
          if(cljs.core.truth_(D)) {
            C = D
          }else {
            var E = cljs.core._invoke._;
            if(cljs.core.truth_(E)) {
              C = E
            }else {
              throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
            }
          }
          B = C.call(null, a)
        }
        return B;
      case 2:
        var x;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke : a)) {
          x = a.cljs$core$IFn$_invoke(a, c)
        }else {
          var y;
          var F = cljs.core._invoke[goog.typeOf.call(null, a)];
          if(cljs.core.truth_(F)) {
            y = F
          }else {
            var G = cljs.core._invoke._;
            if(cljs.core.truth_(G)) {
              y = G
            }else {
              throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
            }
          }
          x = y.call(null, a, c)
        }
        return x;
      case 3:
        var z;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke : a)) {
          z = a.cljs$core$IFn$_invoke(a, c, d)
        }else {
          var u;
          var J = cljs.core._invoke[goog.typeOf.call(null, a)];
          if(cljs.core.truth_(J)) {
            u = J
          }else {
            var w = cljs.core._invoke._;
            if(cljs.core.truth_(w)) {
              u = w
            }else {
              throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
            }
          }
          z = u.call(null, a, c, d)
        }
        return z;
      case 4:
        var H;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke : a)) {
          H = a.cljs$core$IFn$_invoke(a, c, d, e)
        }else {
          var A;
          var ra = cljs.core._invoke[goog.typeOf.call(null, a)];
          if(cljs.core.truth_(ra)) {
            A = ra
          }else {
            var sa = cljs.core._invoke._;
            if(cljs.core.truth_(sa)) {
              A = sa
            }else {
              throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
            }
          }
          H = A.call(null, a, c, d, e)
        }
        return H;
      case 5:
        var K;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke : a)) {
          K = a.cljs$core$IFn$_invoke(a, c, d, e, f)
        }else {
          var N;
          var ta = cljs.core._invoke[goog.typeOf.call(null, a)];
          if(cljs.core.truth_(ta)) {
            N = ta
          }else {
            var ua = cljs.core._invoke._;
            if(cljs.core.truth_(ua)) {
              N = ua
            }else {
              throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
            }
          }
          K = N.call(null, a, c, d, e, f)
        }
        return K;
      case 6:
        var O;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke : a)) {
          O = a.cljs$core$IFn$_invoke(a, c, d, e, f, g)
        }else {
          var P;
          var va = cljs.core._invoke[goog.typeOf.call(null, a)];
          if(cljs.core.truth_(va)) {
            P = va
          }else {
            var wa = cljs.core._invoke._;
            if(cljs.core.truth_(wa)) {
              P = wa
            }else {
              throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
            }
          }
          O = P.call(null, a, c, d, e, f, g)
        }
        return O;
      case 7:
        var Q;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke : a)) {
          Q = a.cljs$core$IFn$_invoke(a, c, d, e, f, g, h)
        }else {
          var R;
          var xa = cljs.core._invoke[goog.typeOf.call(null, a)];
          if(cljs.core.truth_(xa)) {
            R = xa
          }else {
            var ya = cljs.core._invoke._;
            if(cljs.core.truth_(ya)) {
              R = ya
            }else {
              throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
            }
          }
          Q = R.call(null, a, c, d, e, f, g, h)
        }
        return Q;
      case 8:
        var S;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke : a)) {
          S = a.cljs$core$IFn$_invoke(a, c, d, e, f, g, h, i)
        }else {
          var T;
          var za = cljs.core._invoke[goog.typeOf.call(null, a)];
          if(cljs.core.truth_(za)) {
            T = za
          }else {
            var Aa = cljs.core._invoke._;
            if(cljs.core.truth_(Aa)) {
              T = Aa
            }else {
              throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
            }
          }
          S = T.call(null, a, c, d, e, f, g, h, i)
        }
        return S;
      case 9:
        var L;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke : a)) {
          L = a.cljs$core$IFn$_invoke(a, c, d, e, f, g, h, i, j)
        }else {
          var M;
          var Ba = cljs.core._invoke[goog.typeOf.call(null, a)];
          if(cljs.core.truth_(Ba)) {
            M = Ba
          }else {
            var Ca = cljs.core._invoke._;
            if(cljs.core.truth_(Ca)) {
              M = Ca
            }else {
              throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
            }
          }
          L = M.call(null, a, c, d, e, f, g, h, i, j)
        }
        return L;
      case 10:
        var U;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke : a)) {
          U = a.cljs$core$IFn$_invoke(a, c, d, e, f, g, h, i, j, k)
        }else {
          var V;
          var Da = cljs.core._invoke[goog.typeOf.call(null, a)];
          if(cljs.core.truth_(Da)) {
            V = Da
          }else {
            var Ea = cljs.core._invoke._;
            if(cljs.core.truth_(Ea)) {
              V = Ea
            }else {
              throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
            }
          }
          U = V.call(null, a, c, d, e, f, g, h, i, j, k)
        }
        return U;
      case 11:
        var W;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke : a)) {
          W = a.cljs$core$IFn$_invoke(a, c, d, e, f, g, h, i, j, k, l)
        }else {
          var X;
          var Fa = cljs.core._invoke[goog.typeOf.call(null, a)];
          if(cljs.core.truth_(Fa)) {
            X = Fa
          }else {
            var Ga = cljs.core._invoke._;
            if(cljs.core.truth_(Ga)) {
              X = Ga
            }else {
              throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
            }
          }
          W = X.call(null, a, c, d, e, f, g, h, i, j, k, l)
        }
        return W;
      case 12:
        var Y;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke : a)) {
          Y = a.cljs$core$IFn$_invoke(a, c, d, e, f, g, h, i, j, k, l, m)
        }else {
          var Z;
          var Ha = cljs.core._invoke[goog.typeOf.call(null, a)];
          if(cljs.core.truth_(Ha)) {
            Z = Ha
          }else {
            var Ia = cljs.core._invoke._;
            if(cljs.core.truth_(Ia)) {
              Z = Ia
            }else {
              throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
            }
          }
          Y = Z.call(null, a, c, d, e, f, g, h, i, j, k, l, m)
        }
        return Y;
      case 13:
        var $;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke : a)) {
          $ = a.cljs$core$IFn$_invoke(a, c, d, e, f, g, h, i, j, k, l, m, p)
        }else {
          var aa;
          var Ja = cljs.core._invoke[goog.typeOf.call(null, a)];
          if(cljs.core.truth_(Ja)) {
            aa = Ja
          }else {
            var Ka = cljs.core._invoke._;
            if(cljs.core.truth_(Ka)) {
              aa = Ka
            }else {
              throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
            }
          }
          $ = aa.call(null, a, c, d, e, f, g, h, i, j, k, l, m, p)
        }
        return $;
      case 14:
        var ba;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke : a)) {
          ba = a.cljs$core$IFn$_invoke(a, c, d, e, f, g, h, i, j, k, l, m, p, n)
        }else {
          var ca;
          var La = cljs.core._invoke[goog.typeOf.call(null, a)];
          if(cljs.core.truth_(La)) {
            ca = La
          }else {
            var Ma = cljs.core._invoke._;
            if(cljs.core.truth_(Ma)) {
              ca = Ma
            }else {
              throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
            }
          }
          ba = ca.call(null, a, c, d, e, f, g, h, i, j, k, l, m, p, n)
        }
        return ba;
      case 15:
        var da;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke : a)) {
          da = a.cljs$core$IFn$_invoke(a, c, d, e, f, g, h, i, j, k, l, m, p, n, q)
        }else {
          var ea;
          var Na = cljs.core._invoke[goog.typeOf.call(null, a)];
          if(cljs.core.truth_(Na)) {
            ea = Na
          }else {
            var Oa = cljs.core._invoke._;
            if(cljs.core.truth_(Oa)) {
              ea = Oa
            }else {
              throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
            }
          }
          da = ea.call(null, a, c, d, e, f, g, h, i, j, k, l, m, p, n, q)
        }
        return da;
      case 16:
        var fa;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke : a)) {
          fa = a.cljs$core$IFn$_invoke(a, c, d, e, f, g, h, i, j, k, l, m, p, n, q, o)
        }else {
          var ga;
          var Pa = cljs.core._invoke[goog.typeOf.call(null, a)];
          if(cljs.core.truth_(Pa)) {
            ga = Pa
          }else {
            var Qa = cljs.core._invoke._;
            if(cljs.core.truth_(Qa)) {
              ga = Qa
            }else {
              throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
            }
          }
          fa = ga.call(null, a, c, d, e, f, g, h, i, j, k, l, m, p, n, q, o)
        }
        return fa;
      case 17:
        var ha;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke : a)) {
          ha = a.cljs$core$IFn$_invoke(a, c, d, e, f, g, h, i, j, k, l, m, p, n, q, o, s)
        }else {
          var ia;
          var Ra = cljs.core._invoke[goog.typeOf.call(null, a)];
          if(cljs.core.truth_(Ra)) {
            ia = Ra
          }else {
            var Sa = cljs.core._invoke._;
            if(cljs.core.truth_(Sa)) {
              ia = Sa
            }else {
              throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
            }
          }
          ha = ia.call(null, a, c, d, e, f, g, h, i, j, k, l, m, p, n, q, o, s)
        }
        return ha;
      case 18:
        var ja;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke : a)) {
          ja = a.cljs$core$IFn$_invoke(a, c, d, e, f, g, h, i, j, k, l, m, p, n, q, o, s, t)
        }else {
          var ka;
          var Ta = cljs.core._invoke[goog.typeOf.call(null, a)];
          if(cljs.core.truth_(Ta)) {
            ka = Ta
          }else {
            var Ua = cljs.core._invoke._;
            if(cljs.core.truth_(Ua)) {
              ka = Ua
            }else {
              throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
            }
          }
          ja = ka.call(null, a, c, d, e, f, g, h, i, j, k, l, m, p, n, q, o, s, t)
        }
        return ja;
      case 19:
        var la;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke : a)) {
          la = a.cljs$core$IFn$_invoke(a, c, d, e, f, g, h, i, j, k, l, m, p, n, q, o, s, t, r)
        }else {
          var ma;
          var Va = cljs.core._invoke[goog.typeOf.call(null, a)];
          if(cljs.core.truth_(Va)) {
            ma = Va
          }else {
            var Wa = cljs.core._invoke._;
            if(cljs.core.truth_(Wa)) {
              ma = Wa
            }else {
              throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
            }
          }
          la = ma.call(null, a, c, d, e, f, g, h, i, j, k, l, m, p, n, q, o, s, t, r)
        }
        return la;
      case 20:
        var na;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke : a)) {
          na = a.cljs$core$IFn$_invoke(a, c, d, e, f, g, h, i, j, k, l, m, p, n, q, o, s, t, r, v)
        }else {
          var oa;
          var Xa = cljs.core._invoke[goog.typeOf.call(null, a)];
          if(cljs.core.truth_(Xa)) {
            oa = Xa
          }else {
            var Ya = cljs.core._invoke._;
            if(cljs.core.truth_(Ya)) {
              oa = Ya
            }else {
              throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
            }
          }
          na = oa.call(null, a, c, d, e, f, g, h, i, j, k, l, m, p, n, q, o, s, t, r, v)
        }
        return na;
      case 21:
        var pa;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke : a)) {
          pa = a.cljs$core$IFn$_invoke(a, c, d, e, f, g, h, i, j, k, l, m, p, n, q, o, s, t, r, v, I)
        }else {
          var qa;
          var Za = cljs.core._invoke[goog.typeOf.call(null, a)];
          if(cljs.core.truth_(Za)) {
            qa = Za
          }else {
            var $a = cljs.core._invoke._;
            if(cljs.core.truth_($a)) {
              qa = $a
            }else {
              throw cljs.core.missing_protocol.call(null, "IFn.-invoke", a);
            }
          }
          pa = qa.call(null, a, c, d, e, f, g, h, i, j, k, l, m, p, n, q, o, s, t, r, v, I)
        }
        return pa
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ICounted = {};
cljs.core._count = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ICounted$_count : a)) {
    a = a.cljs$core$ICounted$_count(a)
  }else {
    var b;
    b = cljs.core._count[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._count._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "ICounted.-count", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.IEmptyableCollection = {};
cljs.core._empty = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IEmptyableCollection$_empty : a)) {
    a = a.cljs$core$IEmptyableCollection$_empty(a)
  }else {
    var b;
    b = cljs.core._empty[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._empty._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IEmptyableCollection.-empty", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.ICollection = {};
cljs.core._conj = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ICollection$_conj : a)) {
    c = a.cljs$core$ICollection$_conj(a, b)
  }else {
    c = cljs.core._conj[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._conj._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "ICollection.-conj", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core.IIndexed = {};
cljs.core._nth = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IIndexed$_nth : a)) {
          e = a.cljs$core$IIndexed$_nth(a, c)
        }else {
          e = cljs.core._nth[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(e) && (e = cljs.core._nth._, !cljs.core.truth_(e))) {
            throw cljs.core.missing_protocol.call(null, "IIndexed.-nth", a);
          }
          e = e.call(null, a, c)
        }
        return e;
      case 3:
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IIndexed$_nth : a)) {
          e = a.cljs$core$IIndexed$_nth(a, c, d)
        }else {
          e = cljs.core._nth[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(e) && (e = cljs.core._nth._, !cljs.core.truth_(e))) {
            throw cljs.core.missing_protocol.call(null, "IIndexed.-nth", a);
          }
          e = e.call(null, a, c, d)
        }
        return e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ISeq = {};
cljs.core._first = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ISeq$_first : a)) {
    a = a.cljs$core$ISeq$_first(a)
  }else {
    var b;
    b = cljs.core._first[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._first._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "ISeq.-first", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core._rest = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ISeq$_rest : a)) {
    a = a.cljs$core$ISeq$_rest(a)
  }else {
    var b;
    b = cljs.core._rest[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._rest._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "ISeq.-rest", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.ILookup = {};
cljs.core._lookup = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ILookup$_lookup : a)) {
          e = a.cljs$core$ILookup$_lookup(a, c)
        }else {
          e = cljs.core._lookup[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(e) && (e = cljs.core._lookup._, !cljs.core.truth_(e))) {
            throw cljs.core.missing_protocol.call(null, "ILookup.-lookup", a);
          }
          e = e.call(null, a, c)
        }
        return e;
      case 3:
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ILookup$_lookup : a)) {
          e = a.cljs$core$ILookup$_lookup(a, c, d)
        }else {
          e = cljs.core._lookup[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(e) && (e = cljs.core._lookup._, !cljs.core.truth_(e))) {
            throw cljs.core.missing_protocol.call(null, "ILookup.-lookup", a);
          }
          e = e.call(null, a, c, d)
        }
        return e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IAssociative = {};
cljs.core._contains_key_QMARK_ = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IAssociative$_contains_key_QMARK_ : a)) {
    c = a.cljs$core$IAssociative$_contains_key_QMARK_(a, b)
  }else {
    c = cljs.core._contains_key_QMARK_[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._contains_key_QMARK_._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "IAssociative.-contains-key?", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core._assoc = function(a, b, c) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IAssociative$_assoc : a)) {
    a = a.cljs$core$IAssociative$_assoc(a, b, c)
  }else {
    var d;
    d = cljs.core._assoc[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._assoc._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IAssociative.-assoc", a);
    }
    a = d.call(null, a, b, c)
  }
  return a
};
cljs.core.IMap = {};
cljs.core._dissoc = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMap$_dissoc : a)) {
    c = a.cljs$core$IMap$_dissoc(a, b)
  }else {
    c = cljs.core._dissoc[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._dissoc._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "IMap.-dissoc", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core.ISet = {};
cljs.core._disjoin = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ISet$_disjoin : a)) {
    c = a.cljs$core$ISet$_disjoin(a, b)
  }else {
    c = cljs.core._disjoin[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._disjoin._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "ISet.-disjoin", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core.IStack = {};
cljs.core._peek = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IStack$_peek : a)) {
    a = a.cljs$core$IStack$_peek(a)
  }else {
    var b;
    b = cljs.core._peek[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._peek._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IStack.-peek", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core._pop = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IStack$_pop : a)) {
    a = a.cljs$core$IStack$_pop(a)
  }else {
    var b;
    b = cljs.core._pop[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._pop._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IStack.-pop", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.IVector = {};
cljs.core._assoc_n = function(a, b, c) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IVector$_assoc_n : a)) {
    a = a.cljs$core$IVector$_assoc_n(a, b, c)
  }else {
    var d;
    d = cljs.core._assoc_n[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._assoc_n._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IVector.-assoc-n", a);
    }
    a = d.call(null, a, b, c)
  }
  return a
};
cljs.core.IDeref = {};
cljs.core._deref = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IDeref$_deref : a)) {
    a = a.cljs$core$IDeref$_deref(a)
  }else {
    var b;
    b = cljs.core._deref[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._deref._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IDeref.-deref", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.IDerefWithTimeout = {};
cljs.core._deref_with_timeout = function(a, b, c) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IDerefWithTimeout$_deref_with_timeout : a)) {
    a = a.cljs$core$IDerefWithTimeout$_deref_with_timeout(a, b, c)
  }else {
    var d;
    d = cljs.core._deref_with_timeout[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._deref_with_timeout._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IDerefWithTimeout.-deref-with-timeout", a);
    }
    a = d.call(null, a, b, c)
  }
  return a
};
cljs.core.IMeta = {};
cljs.core._meta = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMeta$_meta : a)) {
    a = a.cljs$core$IMeta$_meta(a)
  }else {
    var b;
    b = cljs.core._meta[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._meta._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IMeta.-meta", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.IWithMeta = {};
cljs.core._with_meta = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IWithMeta$_with_meta : a)) {
    c = a.cljs$core$IWithMeta$_with_meta(a, b)
  }else {
    c = cljs.core._with_meta[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._with_meta._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "IWithMeta.-with-meta", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core.IReduce = {};
cljs.core._reduce = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IReduce$_reduce : a)) {
          e = a.cljs$core$IReduce$_reduce(a, c)
        }else {
          e = cljs.core._reduce[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(e) && (e = cljs.core._reduce._, !cljs.core.truth_(e))) {
            throw cljs.core.missing_protocol.call(null, "IReduce.-reduce", a);
          }
          e = e.call(null, a, c)
        }
        return e;
      case 3:
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IReduce$_reduce : a)) {
          e = a.cljs$core$IReduce$_reduce(a, c, d)
        }else {
          e = cljs.core._reduce[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(e) && (e = cljs.core._reduce._, !cljs.core.truth_(e))) {
            throw cljs.core.missing_protocol.call(null, "IReduce.-reduce", a);
          }
          e = e.call(null, a, c, d)
        }
        return e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IEquiv = {};
cljs.core._equiv = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IEquiv$_equiv : a)) {
    c = a.cljs$core$IEquiv$_equiv(a, b)
  }else {
    c = cljs.core._equiv[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._equiv._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "IEquiv.-equiv", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core.IHash = {};
cljs.core._hash = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IHash$_hash : a)) {
    a = a.cljs$core$IHash$_hash(a)
  }else {
    var b;
    b = cljs.core._hash[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._hash._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IHash.-hash", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.ISeqable = {};
cljs.core._seq = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ISeqable$_seq : a)) {
    a = a.cljs$core$ISeqable$_seq(a)
  }else {
    var b;
    b = cljs.core._seq[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._seq._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "ISeqable.-seq", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.ISequential = {};
cljs.core.IRecord = {};
cljs.core.IPrintable = {};
cljs.core._pr_seq = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IPrintable$_pr_seq : a)) {
    c = a.cljs$core$IPrintable$_pr_seq(a, b)
  }else {
    c = cljs.core._pr_seq[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._pr_seq._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "IPrintable.-pr-seq", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core.IPending = {};
cljs.core._realized_QMARK_ = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IPending$_realized_QMARK_ : a)) {
    a = a.cljs$core$IPending$_realized_QMARK_(a)
  }else {
    var b;
    b = cljs.core._realized_QMARK_[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._realized_QMARK_._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IPending.-realized?", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.IWatchable = {};
cljs.core._notify_watches = function(a, b, c) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IWatchable$_notify_watches : a)) {
    a = a.cljs$core$IWatchable$_notify_watches(a, b, c)
  }else {
    var d;
    d = cljs.core._notify_watches[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._notify_watches._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IWatchable.-notify-watches", a);
    }
    a = d.call(null, a, b, c)
  }
  return a
};
cljs.core._add_watch = function(a, b, c) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IWatchable$_add_watch : a)) {
    a = a.cljs$core$IWatchable$_add_watch(a, b, c)
  }else {
    var d;
    d = cljs.core._add_watch[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._add_watch._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IWatchable.-add-watch", a);
    }
    a = d.call(null, a, b, c)
  }
  return a
};
cljs.core._remove_watch = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IWatchable$_remove_watch : a)) {
    c = a.cljs$core$IWatchable$_remove_watch(a, b)
  }else {
    c = cljs.core._remove_watch[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._remove_watch._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "IWatchable.-remove-watch", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core.identical_QMARK_ = function(a, b) {
  return a === b
};
cljs.core._EQ_ = function(a, b) {
  return cljs.core._equiv.call(null, a, b)
};
cljs.core.nil_QMARK_ = function(a) {
  return null === a
};
cljs.core.type = function(a) {
  return a.constructor
};
Function.prototype.cljs$core$IPrintable$ = !0;
Function.prototype.cljs$core$IPrintable$_pr_seq = function(a) {
  return cljs.core.list.call(null, "#<", cljs.core.str.call(null, a), ">")
};
cljs.core.IHash["null"] = !0;
cljs.core._hash["null"] = function() {
  return 0
};
cljs.core.ILookup["null"] = !0;
cljs.core._lookup["null"] = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return null;
      case 3:
        return d
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IAssociative["null"] = !0;
cljs.core._assoc["null"] = function(a, b, c) {
  return cljs.core.hash_map.call(null, b, c)
};
cljs.core.ICollection["null"] = !0;
cljs.core._conj["null"] = function(a, b) {
  return cljs.core.list.call(null, b)
};
cljs.core.IReduce["null"] = !0;
cljs.core._reduce["null"] = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return c.call(null);
      case 3:
        return d
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IPrintable["null"] = !0;
cljs.core._pr_seq["null"] = function() {
  return cljs.core.list.call(null, "nil")
};
cljs.core.ISet["null"] = !0;
cljs.core._disjoin["null"] = function() {
  return null
};
cljs.core.ICounted["null"] = !0;
cljs.core._count["null"] = function() {
  return 0
};
cljs.core.IStack["null"] = !0;
cljs.core._peek["null"] = function() {
  return null
};
cljs.core._pop["null"] = function() {
  return null
};
cljs.core.ISeq["null"] = !0;
cljs.core._first["null"] = function() {
  return null
};
cljs.core._rest["null"] = function() {
  return cljs.core.list.call(null)
};
cljs.core.IEquiv["null"] = !0;
cljs.core._equiv["null"] = function(a, b) {
  return cljs.core.nil_QMARK_.call(null, b)
};
cljs.core.IWithMeta["null"] = !0;
cljs.core._with_meta["null"] = function() {
  return null
};
cljs.core.IMeta["null"] = !0;
cljs.core._meta["null"] = function() {
  return null
};
cljs.core.IIndexed["null"] = !0;
cljs.core._nth["null"] = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return null;
      case 3:
        return d
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IEmptyableCollection["null"] = !0;
cljs.core._empty["null"] = function() {
  return null
};
cljs.core.IMap["null"] = !0;
cljs.core._dissoc["null"] = function() {
  return null
};
Date.prototype.cljs$core$IEquiv$ = !0;
Date.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return a.toString() === b.toString()
};
cljs.core.IHash.number = !0;
cljs.core._hash.number = function(a) {
  return a
};
cljs.core.IEquiv.number = !0;
cljs.core._equiv.number = function(a, b) {
  return a === b
};
cljs.core.IHash["boolean"] = !0;
cljs.core._hash["boolean"] = function(a) {
  return!0 === a ? 1 : 0
};
cljs.core.IHash["function"] = !0;
cljs.core._hash["function"] = function(a) {
  return goog.getUid.call(null, a)
};
cljs.core.inc = function(a) {
  return a + 1
};
cljs.core.ci_reduce = function() {
  var a = null;
  return function(a, c, d, e) {
    switch(arguments.length) {
      case 2:
        var f;
        a: {
          if(cljs.core.truth_(cljs.core._EQ_.call(null, 0, cljs.core._count.call(null, a)))) {
            f = c.call(null)
          }else {
            for(var g = cljs.core._nth.call(null, a, 0), h = 1;;) {
              if(cljs.core.truth_(h < cljs.core._count.call(null, a))) {
                g = c.call(null, g, cljs.core._nth.call(null, a, h)), h += 1
              }else {
                f = g;
                break a
              }
            }
          }
        }
        return f;
      case 3:
        a: {
          f = d;
          for(h = 0;;) {
            if(cljs.core.truth_(h < cljs.core._count.call(null, a))) {
              f = c.call(null, f, cljs.core._nth.call(null, a, h)), h += 1
            }else {
              g = f;
              break a
            }
          }
        }
        return g;
      case 4:
        a: {
          f = d;
          for(g = e;;) {
            if(cljs.core.truth_(g < cljs.core._count.call(null, a))) {
              f = c.call(null, f, cljs.core._nth.call(null, a, g)), g += 1
            }else {
              h = f;
              break a
            }
          }
        }
        return h
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IndexedSeq = function(a, b) {
  this.a = a;
  this.i = b
};
cljs.core.IndexedSeq.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "cljs.core.IndexedSeq")
};
cljs.core.IndexedSeq.prototype.cljs$core$IHash$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.ci_reduce.call(null, this.a, c, this.a[this.i], this.i + 1);
      case 3:
        return cljs.core.ci_reduce.call(null, this.a, c, d, this.i)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return cljs.core.cons.call(null, b, a)
};
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.IndexedSeq.prototype.cljs$core$ISequential$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e = c + this.i;
        return cljs.core.truth_(e < this.a.length) ? this.a[e] : null;
      case 3:
        return e = c + this.i, cljs.core.truth_(e < this.a.length) ? this.a[e] : d
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$_count = function() {
  return this.a.length - this.i
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_first = function() {
  return this.a[this.i]
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_rest = function() {
  return cljs.core.truth_(this.i + 1 < this.a.length) ? new cljs.core.IndexedSeq(this.a, this.i + 1) : cljs.core.list.call(null)
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$_seq = function(a) {
  return a
};
cljs.core.prim_seq = function(a, b) {
  return cljs.core.truth_(cljs.core._EQ_.call(null, 0, a.length)) ? null : new cljs.core.IndexedSeq(a, b)
};
cljs.core.array_seq = function(a, b) {
  return cljs.core.prim_seq.call(null, a, b)
};
cljs.core.IReduce.array = !0;
cljs.core._reduce.array = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.ci_reduce.call(null, a, c);
      case 3:
        return cljs.core.ci_reduce.call(null, a, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ILookup.array = !0;
cljs.core._lookup.array = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return a[c];
      case 3:
        return cljs.core._nth.call(null, a, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IIndexed.array = !0;
cljs.core._nth.array = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.truth_(c < a.length) ? a[c] : null;
      case 3:
        return cljs.core.truth_(c < a.length) ? a[c] : d
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ICounted.array = !0;
cljs.core._count.array = function(a) {
  return a.length
};
cljs.core.ISeqable.array = !0;
cljs.core._seq.array = function(a) {
  return cljs.core.array_seq.call(null, a, 0)
};
cljs.core.seq = function(a) {
  return cljs.core.truth_(a) ? cljs.core._seq.call(null, a) : null
};
cljs.core.first = function(a) {
  a = cljs.core.seq.call(null, a);
  return cljs.core.truth_(a) ? cljs.core._first.call(null, a) : null
};
cljs.core.rest = function(a) {
  return cljs.core._rest.call(null, cljs.core.seq.call(null, a))
};
cljs.core.next = function(a) {
  return cljs.core.truth_(a) ? cljs.core.seq.call(null, cljs.core.rest.call(null, a)) : null
};
cljs.core.second = function(a) {
  return cljs.core.first.call(null, cljs.core.next.call(null, a))
};
cljs.core.ffirst = function(a) {
  return cljs.core.first.call(null, cljs.core.first.call(null, a))
};
cljs.core.nfirst = function(a) {
  return cljs.core.next.call(null, cljs.core.first.call(null, a))
};
cljs.core.fnext = function(a) {
  return cljs.core.first.call(null, cljs.core.next.call(null, a))
};
cljs.core.nnext = function(a) {
  return cljs.core.next.call(null, cljs.core.next.call(null, a))
};
cljs.core.last = function(a) {
  for(;;) {
    if(cljs.core.truth_(cljs.core.next.call(null, a))) {
      a = cljs.core.next.call(null, a)
    }else {
      return cljs.core.first.call(null, a)
    }
  }
};
cljs.core.ICounted._ = !0;
cljs.core._count._ = function(a) {
  for(var a = cljs.core.seq.call(null, a), b = 0;;) {
    if(cljs.core.truth_(a)) {
      a = cljs.core.next.call(null, a), b += 1
    }else {
      return b
    }
  }
};
cljs.core.IEquiv._ = !0;
cljs.core._equiv._ = function(a, b) {
  return a === b
};
cljs.core.not = function(a) {
  return cljs.core.truth_(a) ? !1 : !0
};
cljs.core.conj = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      for(;;) {
        if(cljs.core.truth_(d)) {
          b = a.call(null, b, c), c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
        }else {
          return a.call(null, b, c)
        }
      }
    }, d = function(a, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), g = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, d, g, a)
    };
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core._conj.call(null, a, d);
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.empty = function(a) {
  return cljs.core._empty.call(null, a)
};
cljs.core.count = function(a) {
  return cljs.core._count.call(null, a)
};
cljs.core.nth = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._nth.call(null, a, Math.floor(c));
      case 3:
        return cljs.core._nth.call(null, a, Math.floor(c), d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.get = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, a, c);
      case 3:
        return cljs.core._lookup.call(null, a, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.assoc = function() {
  var a = null, b = function() {
    var b = function(b, c, d, h) {
      for(;;) {
        if(b = a.call(null, b, c, d), cljs.core.truth_(h)) {
          c = cljs.core.first.call(null, h), d = cljs.core.second.call(null, h), h = cljs.core.nnext.call(null, h)
        }else {
          return b
        }
      }
    }, d = function(a, d, g, h) {
      var i = null;
      goog.isDef(h) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return b.call(this, a, d, g, i)
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), g = cljs.core.first(cljs.core.next(a)), h = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return b.call(this, d, g, h, a)
    };
    return d
  }(), a = function(a, d, e, f) {
    switch(arguments.length) {
      case 3:
        return cljs.core._assoc.call(null, a, d, e);
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.dissoc = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      for(;;) {
        if(b = a.call(null, b, c), cljs.core.truth_(d)) {
          c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
        }else {
          return b
        }
      }
    }, d = function(a, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), g = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, d, g, a)
    };
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return cljs.core._dissoc.call(null, a, d);
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.with_meta = function(a, b) {
  return cljs.core._with_meta.call(null, a, b)
};
cljs.core.meta = function(a) {
  return cljs.core.truth_(function() {
    return cljs.core.truth_(function() {
      if(cljs.core.truth_(a)) {
        var b = a.cljs$core$IMeta$;
        return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$IMeta$")) : b
      }
      return a
    }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.IMeta, a)
  }()) ? cljs.core._meta.call(null, a) : null
};
cljs.core.peek = function(a) {
  return cljs.core._peek.call(null, a)
};
cljs.core.pop = function(a) {
  return cljs.core._pop.call(null, a)
};
cljs.core.disj = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      for(;;) {
        if(b = a.call(null, b, c), cljs.core.truth_(d)) {
          c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
        }else {
          return b
        }
      }
    }, d = function(a, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), g = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, d, g, a)
    };
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return cljs.core._disjoin.call(null, a, d);
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.hash = function(a) {
  return cljs.core._hash.call(null, a)
};
cljs.core.empty_QMARK_ = function(a) {
  return cljs.core.not.call(null, cljs.core.seq.call(null, a))
};
cljs.core.coll_QMARK_ = function(a) {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? !1 : cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$ICollection$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$ICollection$")) : b
    }
    return a
  }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.ICollection, a)
};
cljs.core.set_QMARK_ = function(a) {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? !1 : cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$ISet$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$ISet$")) : b
    }
    return a
  }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.ISet, a)
};
cljs.core.associative_QMARK_ = function(a) {
  return cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$IAssociative$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$IAssociative$")) : b
    }
    return a
  }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.IAssociative, a)
};
cljs.core.sequential_QMARK_ = function(a) {
  return cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$ISequential$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$ISequential$")) : b
    }
    return a
  }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.ISequential, a)
};
cljs.core.counted_QMARK_ = function(a) {
  return cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$ICounted$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$ICounted$")) : b
    }
    return a
  }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.ICounted, a)
};
cljs.core.map_QMARK_ = function(a) {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? !1 : cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$IMap$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$IMap$")) : b
    }
    return a
  }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.IMap, a)
};
cljs.core.vector_QMARK_ = function(a) {
  return cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$IVector$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$IVector$")) : b
    }
    return a
  }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.IVector, a)
};
cljs.core.js_obj = function() {
  return{}
};
cljs.core.js_keys = function(a) {
  var b = cljs.core.array.call(null);
  goog.object.forEach.call(null, a, function(a, d) {
    return b.push(d)
  });
  return b
};
cljs.core.js_delete = function(a, b) {
  return delete a[b]
};
cljs.core.lookup_sentinel = cljs.core.js_obj.call(null);
cljs.core.false_QMARK_ = function(a) {
  return!1 === a
};
cljs.core.true_QMARK_ = function(a) {
  return!0 === a
};
cljs.core.undefined_QMARK_ = function(a) {
  return void 0 === a
};
cljs.core.instance_QMARK_ = function(a, b) {
  return null != b && (b instanceof a || b.constructor === a || a === Object)
};
cljs.core.seq_QMARK_ = function(a) {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? !1 : cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$ISeq$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$ISeq$")) : b
    }
    return a
  }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.ISeq, a)
};
cljs.core.boolean$ = function(a) {
  return cljs.core.truth_(a) ? !0 : !1
};
cljs.core.string_QMARK_ = function(a) {
  var b = goog.isString.call(null, a);
  return cljs.core.truth_(b) ? cljs.core.not.call(null, function() {
    var b = cljs.core._EQ_.call(null, a.charAt(0), "\ufdd0");
    return cljs.core.truth_(b) ? b : cljs.core._EQ_.call(null, a.charAt(0), "\ufdd1")
  }()) : b
};
cljs.core.keyword_QMARK_ = function(a) {
  var b = goog.isString.call(null, a);
  return cljs.core.truth_(b) ? cljs.core._EQ_.call(null, a.charAt(0), "\ufdd0") : b
};
cljs.core.symbol_QMARK_ = function(a) {
  var b = goog.isString.call(null, a);
  return cljs.core.truth_(b) ? cljs.core._EQ_.call(null, a.charAt(0), "\ufdd1") : b
};
cljs.core.number_QMARK_ = function(a) {
  return goog.isNumber.call(null, a)
};
cljs.core.fn_QMARK_ = function(a) {
  return goog.isFunction.call(null, a)
};
cljs.core.integer_QMARK_ = function(a) {
  var b = cljs.core.number_QMARK_.call(null, a);
  return cljs.core.truth_(b) ? a == a.toFixed() : b
};
cljs.core.contains_QMARK_ = function(a, b) {
  return cljs.core.truth_(cljs.core._lookup.call(null, a, b, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel) ? !1 : !0
};
cljs.core.find = function(a, b) {
  return cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var c = cljs.core.associative_QMARK_.call(null, a);
      return cljs.core.truth_(c) ? cljs.core.contains_QMARK_.call(null, a, b) : c
    }
    return a
  }()) ? cljs.core.Vector.fromArray([b, cljs.core._lookup.call(null, a, b)]) : null
};
cljs.core.distinct_QMARK_ = function() {
  var a = null, b = function() {
    var a = function(a, b, c) {
      if(cljs.core.truth_(cljs.core.not.call(null, cljs.core._EQ_.call(null, a, b)))) {
        a = cljs.core.set([b, a]);
        for(b = c;;) {
          var d = cljs.core.first.call(null, b), c = cljs.core.next.call(null, b);
          if(cljs.core.truth_(b)) {
            if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, a, d))) {
              return!1
            }
            a = cljs.core.conj.call(null, a, d);
            b = c
          }else {
            return!0
          }
        }
      }else {
        return!1
      }
    }, b = function(b, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return a.call(this, b, d, h)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), g = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return a.call(this, d, g, b)
    };
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return cljs.core.not.call(null, cljs.core._EQ_.call(null, a, d));
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.compare = function(a, b) {
  return goog.array.defaultCompare.call(null, a, b)
};
cljs.core.fn__GT_comparator = function(a) {
  return cljs.core.truth_(cljs.core._EQ_.call(null, a, cljs.core.compare)) ? cljs.core.compare : function(b, c) {
    var d = a.call(null, b, c);
    return cljs.core.truth_(cljs.core.number_QMARK_.call(null, d)) ? d : cljs.core.truth_(d) ? -1 : cljs.core.truth_(a.call(null, c, b)) ? 1 : 0
  }
};
cljs.core.sort = function() {
  var a = null;
  return a = function(b, c) {
    switch(arguments.length) {
      case 1:
        return a.call(null, cljs.core.compare, b);
      case 2:
        var d;
        cljs.core.truth_(cljs.core.seq.call(null, c)) ? (d = cljs.core.to_array.call(null, c), goog.array.stableSort.call(null, d, cljs.core.fn__GT_comparator.call(null, b)), d = cljs.core.seq.call(null, d)) : d = cljs.core.List.EMPTY;
        return d
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.sort_by = function() {
  var a = null, b = function(a, b, e) {
    return cljs.core.sort.call(null, function(e, g) {
      return cljs.core.fn__GT_comparator.call(null, b).call(null, a.call(null, e), a.call(null, g))
    }, e)
  };
  return a = function(c, d, e) {
    switch(arguments.length) {
      case 2:
        return a.call(null, c, cljs.core.compare, d);
      case 3:
        return b.call(this, c, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.reduce = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._reduce.call(null, c, a);
      case 3:
        return cljs.core._reduce.call(null, d, a, c)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.seq_reduce = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e;
        e = cljs.core.seq.call(null, c);
        e = cljs.core.truth_(e) ? cljs.core.reduce.call(null, a, cljs.core.first.call(null, e), cljs.core.next.call(null, e)) : a.call(null);
        return e;
      case 3:
        a: {
          for(var f = c, g = cljs.core.seq.call(null, d);;) {
            if(cljs.core.truth_(g)) {
              f = a.call(null, f, cljs.core.first.call(null, g)), g = cljs.core.next.call(null, g)
            }else {
              e = f;
              break a
            }
          }
        }
        return e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IReduce._ = !0;
cljs.core._reduce._ = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.seq_reduce.call(null, c, a);
      case 3:
        return cljs.core.seq_reduce.call(null, c, d, a)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core._PLUS_ = function() {
  var a = null, b = function() {
    var b = function(b, c, f) {
      var g = null;
      goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.reduce.call(null, a, b + c, g)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), f = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return cljs.core.reduce.call(null, a, c + f, b)
    };
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 0:
        return 0;
      case 1:
        return a;
      case 2:
        return a + d;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core._ = function() {
  var a = null, b = function() {
    var b = function(b, c, f) {
      var g = null;
      goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.reduce.call(null, a, b - c, g)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), f = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return cljs.core.reduce.call(null, a, c - f, b)
    };
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return-a;
      case 2:
        return a - d;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core._STAR_ = function() {
  var a = null, b = function() {
    var b = function(b, c, f) {
      var g = null;
      goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.reduce.call(null, a, b * c, g)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), f = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return cljs.core.reduce.call(null, a, c * f, b)
    };
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 0:
        return 1;
      case 1:
        return a;
      case 2:
        return a * d;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core._SLASH_ = function() {
  var a = null, b = function() {
    var b = function(b, c, f) {
      var g = null;
      goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.reduce.call(null, a, a.call(null, b, c), g)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), f = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return cljs.core.reduce.call(null, a, a.call(null, c, f), b)
    };
    return b
  }(), a = function(c, d, e) {
    switch(arguments.length) {
      case 1:
        return a.call(null, 1, c);
      case 2:
        return a.call(null, c, d);
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core._LT_ = function() {
  var a = null, b = function() {
    var a = function(a, b, c) {
      for(;;) {
        if(cljs.core.truth_(a < b)) {
          if(cljs.core.truth_(cljs.core.next.call(null, c))) {
            a = b, b = cljs.core.first.call(null, c), c = cljs.core.next.call(null, c)
          }else {
            return b < cljs.core.first.call(null, c)
          }
        }else {
          return!1
        }
      }
    }, b = function(b, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return a.call(this, b, d, h)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), g = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return a.call(this, d, g, b)
    };
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a < d;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core._LT__EQ_ = function() {
  var a = null, b = function() {
    var a = function(a, b, c) {
      for(;;) {
        if(cljs.core.truth_(a <= b)) {
          if(cljs.core.truth_(cljs.core.next.call(null, c))) {
            a = b, b = cljs.core.first.call(null, c), c = cljs.core.next.call(null, c)
          }else {
            return b <= cljs.core.first.call(null, c)
          }
        }else {
          return!1
        }
      }
    }, b = function(b, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return a.call(this, b, d, h)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), g = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return a.call(this, d, g, b)
    };
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a <= d;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core._GT_ = function() {
  var a = null, b = function() {
    var a = function(a, b, c) {
      for(;;) {
        if(cljs.core.truth_(a > b)) {
          if(cljs.core.truth_(cljs.core.next.call(null, c))) {
            a = b, b = cljs.core.first.call(null, c), c = cljs.core.next.call(null, c)
          }else {
            return b > cljs.core.first.call(null, c)
          }
        }else {
          return!1
        }
      }
    }, b = function(b, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return a.call(this, b, d, h)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), g = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return a.call(this, d, g, b)
    };
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a > d;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core._GT__EQ_ = function() {
  var a = null, b = function() {
    var a = function(a, b, c) {
      for(;;) {
        if(cljs.core.truth_(a >= b)) {
          if(cljs.core.truth_(cljs.core.next.call(null, c))) {
            a = b, b = cljs.core.first.call(null, c), c = cljs.core.next.call(null, c)
          }else {
            return b >= cljs.core.first.call(null, c)
          }
        }else {
          return!1
        }
      }
    }, b = function(b, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return a.call(this, b, d, h)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), g = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return a.call(this, d, g, b)
    };
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a >= d;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.dec = function(a) {
  return a - 1
};
cljs.core.max = function() {
  var a = null, b = function() {
    var b = function(b, c, f) {
      var g = null;
      goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.reduce.call(null, a, b > c ? b : c, g)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), f = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return cljs.core.reduce.call(null, a, c > f ? c : f, b)
    };
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return a > d ? a : d;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.min = function() {
  var a = null, b = function() {
    var b = function(b, c, f) {
      var g = null;
      goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.reduce.call(null, a, b < c ? b : c, g)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), f = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return cljs.core.reduce.call(null, a, c < f ? c : f, b)
    };
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return a < d ? a : d;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.fix = function(a) {
  return cljs.core.truth_(0 <= a) ? Math.floor.call(null, a) : Math.ceil.call(null, a)
};
cljs.core.mod = function(a, b) {
  return a % b
};
cljs.core.quot = function(a, b) {
  return cljs.core.fix.call(null, (a - a % b) / b)
};
cljs.core.rem = function(a, b) {
  var c = cljs.core.quot.call(null, a, b);
  return a - b * c
};
cljs.core.rand = function() {
  var a = null;
  return a = function(b) {
    switch(arguments.length) {
      case 0:
        return Math.random.call(null);
      case 1:
        return b * a.call(null)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.rand_int = function(a) {
  return cljs.core.fix.call(null, cljs.core.rand.call(null, a))
};
cljs.core.bit_xor = function(a, b) {
  return a ^ b
};
cljs.core.bit_and = function(a, b) {
  return a & b
};
cljs.core.bit_or = function(a, b) {
  return a | b
};
cljs.core.bit_and_not = function(a, b) {
  return a & ~b
};
cljs.core.bit_clear = function(a, b) {
  return a & ~(1 << b)
};
cljs.core.bit_flip = function(a, b) {
  return a ^ 1 << b
};
cljs.core.bit_not = function(a) {
  return~a
};
cljs.core.bit_set = function(a, b) {
  return a | 1 << b
};
cljs.core.bit_test = function(a, b) {
  return 0 != (a & 1 << b)
};
cljs.core.bit_shift_left = function(a, b) {
  return a << b
};
cljs.core.bit_shift_right = function(a, b) {
  return a >> b
};
cljs.core._EQ__EQ_ = function() {
  var a = null, b = function() {
    var b = function(b, c, d) {
      for(;;) {
        if(cljs.core.truth_(a.call(null, b, c))) {
          if(cljs.core.truth_(cljs.core.next.call(null, d))) {
            b = c, c = cljs.core.first.call(null, d), d = cljs.core.next.call(null, d)
          }else {
            return a.call(null, c, cljs.core.first.call(null, d))
          }
        }else {
          return!1
        }
      }
    }, d = function(a, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, h)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), g = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, d, g, a)
    };
    return d
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return cljs.core._equiv.call(null, a, d);
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.pos_QMARK_ = function(a) {
  return 0 < a
};
cljs.core.zero_QMARK_ = function(a) {
  return 0 === a
};
cljs.core.neg_QMARK_ = function(a) {
  return 0 > a
};
cljs.core.nthnext = function(a, b) {
  for(var c = b, d = cljs.core.seq.call(null, a);;) {
    if(cljs.core.truth_(function() {
      var a = d;
      return cljs.core.truth_(a) ? 0 < c : a
    }())) {
      var e = c - 1, f = cljs.core.next.call(null, d), c = e, d = f
    }else {
      return d
    }
  }
};
cljs.core.IIndexed._ = !0;
cljs.core._nth._ = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e;
        e = cljs.core.nthnext.call(null, a, c);
        if(cljs.core.truth_(e)) {
          e = cljs.core.first.call(null, e)
        }else {
          throw Error("Index out of bounds");
        }
        return e;
      case 3:
        return e = cljs.core.nthnext.call(null, a, c), e = cljs.core.truth_(e) ? cljs.core.first.call(null, e) : d, e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.str_STAR_ = function() {
  var a = null, b = function() {
    var b = function(b, c) {
      return function(b, c) {
        for(;;) {
          if(cljs.core.truth_(c)) {
            var d = b.append(a.call(null, cljs.core.first.call(null, c))), e = cljs.core.next.call(null, c), b = d, c = e
          }else {
            return a.call(null, b)
          }
        }
      }.call(null, new goog.string.StringBuffer(a.call(null, b)), c)
    }, d = function(a, d) {
      var g = null;
      goog.isDef(d) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
      return b.call(this, a, g)
    };
    d.cljs$lang$maxFixedArity = 1;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), a = cljs.core.rest(a);
      return b.call(this, d, a)
    };
    return d
  }(), a = function(a, d) {
    switch(arguments.length) {
      case 0:
        return"";
      case 1:
        return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? "" : cljs.core.truth_("\ufdd0'else") ? a.toString() : null;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.str = function() {
  var a = null, b = function() {
    var a = function(a, b) {
      var c = null;
      goog.isDef(b) && (c = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
      return cljs.core.apply.call(null, cljs.core.str_STAR_, a, c)
    };
    a.cljs$lang$maxFixedArity = 1;
    a.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.rest(a);
      return cljs.core.apply.call(null, cljs.core.str_STAR_, b, a)
    };
    return a
  }(), a = function(a, d) {
    switch(arguments.length) {
      case 0:
        return"";
      case 1:
        return cljs.core.truth_(cljs.core.symbol_QMARK_.call(null, a)) ? a.substring(2, a.length) : cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, a)) ? cljs.core.str_STAR_.call(null, ":", a.substring(2, a.length)) : cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? "" : cljs.core.truth_("\ufdd0'else") ? a.toString() : null;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.subs = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return a.substring(c);
      case 3:
        return a.substring(c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.symbol = function() {
  var a = null;
  return a = function(b, c) {
    switch(arguments.length) {
      case 1:
        return cljs.core.truth_(cljs.core.symbol_QMARK_.call(null, b)) || cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, b)) && cljs.core.str_STAR_.call(null, "\ufdd1", "'", cljs.core.subs.call(null, b, 2)), cljs.core.str_STAR_.call(null, "\ufdd1", "'", b);
      case 2:
        return a.call(null, cljs.core.str_STAR_.call(null, b, "/", c))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.keyword = function() {
  var a = null;
  return a = function(b, c) {
    switch(arguments.length) {
      case 1:
        return cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, b)) ? b : cljs.core.truth_(cljs.core.symbol_QMARK_.call(null, b)) ? cljs.core.str_STAR_.call(null, "\ufdd0", "'", cljs.core.subs.call(null, b, 2)) : cljs.core.truth_("\ufdd0'else") ? cljs.core.str_STAR_.call(null, "\ufdd0", "'", b) : null;
      case 2:
        return a.call(null, cljs.core.str_STAR_.call(null, b, "/", c))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.equiv_sequential = function(a, b) {
  return cljs.core.boolean$.call(null, cljs.core.truth_(cljs.core.sequential_QMARK_.call(null, b)) ? function() {
    for(var c = cljs.core.seq.call(null, a), d = cljs.core.seq.call(null, b);;) {
      if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, c))) {
        return cljs.core.nil_QMARK_.call(null, d)
      }
      if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, d))) {
        return!1
      }
      if(cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.first.call(null, c), cljs.core.first.call(null, d)))) {
        c = cljs.core.next.call(null, c), d = cljs.core.next.call(null, d)
      }else {
        return cljs.core.truth_("\ufdd0'else") ? !1 : null
      }
    }
  }() : null)
};
cljs.core.hash_combine = function(a, b) {
  return a ^ b + 2654435769 + (a << 6) + (a >> 2)
};
cljs.core.hash_coll = function(a) {
  return cljs.core.reduce.call(null, function(a, c) {
    return cljs.core.hash_combine.call(null, a, cljs.core.hash.call(null, c))
  }, cljs.core.hash.call(null, cljs.core.first.call(null, a)), cljs.core.next.call(null, a))
};
cljs.core.extend_object_BANG_ = function(a, b) {
  var c = cljs.core.seq.call(null, b);
  if(cljs.core.truth_(c)) {
    var d = cljs.core.first.call(null, c);
    cljs.core.nth.call(null, d, 0, null);
    for(cljs.core.nth.call(null, d, 1, null);;) {
      var e = d, d = cljs.core.nth.call(null, e, 0, null), e = cljs.core.nth.call(null, e, 1, null), d = cljs.core.name.call(null, d);
      a[d] = e;
      c = cljs.core.next.call(null, c);
      if(cljs.core.truth_(c)) {
        d = c, c = cljs.core.first.call(null, d), e = d, d = c, c = e
      }else {
        break
      }
    }
  }
  return a
};
cljs.core.List = function(a, b, c, d) {
  this.meta = a;
  this.first = b;
  this.rest = c;
  this.count = d
};
cljs.core.List.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "cljs.core.List")
};
cljs.core.List.prototype.cljs$core$IHash$ = !0;
cljs.core.List.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.List.prototype.cljs$core$ISequential$ = !0;
cljs.core.List.prototype.cljs$core$ICollection$ = !0;
cljs.core.List.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return new cljs.core.List(this.meta, b, a, this.count + 1)
};
cljs.core.List.prototype.cljs$core$ISeqable$ = !0;
cljs.core.List.prototype.cljs$core$ISeqable$_seq = function(a) {
  return a
};
cljs.core.List.prototype.cljs$core$ICounted$ = !0;
cljs.core.List.prototype.cljs$core$ICounted$_count = function() {
  return this.count
};
cljs.core.List.prototype.cljs$core$IStack$ = !0;
cljs.core.List.prototype.cljs$core$IStack$_peek = function() {
  return this.first
};
cljs.core.List.prototype.cljs$core$IStack$_pop = function(a) {
  return cljs.core._rest.call(null, a)
};
cljs.core.List.prototype.cljs$core$ISeq$ = !0;
cljs.core.List.prototype.cljs$core$ISeq$_first = function() {
  return this.first
};
cljs.core.List.prototype.cljs$core$ISeq$_rest = function() {
  return this.rest
};
cljs.core.List.prototype.cljs$core$IEquiv$ = !0;
cljs.core.List.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.List.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.List.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.List(b, this.first, this.rest, this.count)
};
cljs.core.List.prototype.cljs$core$IMeta$ = !0;
cljs.core.List.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.List.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.List.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.List.EMPTY
};
cljs.core.EmptyList = function(a) {
  this.meta = a
};
cljs.core.EmptyList.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "cljs.core.EmptyList")
};
cljs.core.EmptyList.prototype.cljs$core$IHash$ = !0;
cljs.core.EmptyList.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.EmptyList.prototype.cljs$core$ISequential$ = !0;
cljs.core.EmptyList.prototype.cljs$core$ICollection$ = !0;
cljs.core.EmptyList.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return new cljs.core.List(this.meta, b, null, 1)
};
cljs.core.EmptyList.prototype.cljs$core$ISeqable$ = !0;
cljs.core.EmptyList.prototype.cljs$core$ISeqable$_seq = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ICounted$ = !0;
cljs.core.EmptyList.prototype.cljs$core$ICounted$_count = function() {
  return 0
};
cljs.core.EmptyList.prototype.cljs$core$IStack$ = !0;
cljs.core.EmptyList.prototype.cljs$core$IStack$_peek = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$IStack$_pop = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$ = !0;
cljs.core.EmptyList.prototype.cljs$core$ISeq$_first = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$_rest = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$IEquiv$ = !0;
cljs.core.EmptyList.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.EmptyList(b)
};
cljs.core.EmptyList.prototype.cljs$core$IMeta$ = !0;
cljs.core.EmptyList.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$_empty = function(a) {
  return a
};
cljs.core.List.EMPTY = new cljs.core.EmptyList(null);
cljs.core.reverse = function(a) {
  return cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, a)
};
cljs.core.list = function() {
  var a = function(a) {
    return cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, cljs.core.reverse.call(null, a))
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.Cons = function(a, b, c) {
  this.meta = a;
  this.first = b;
  this.rest = c
};
cljs.core.Cons.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "cljs.core.Cons")
};
cljs.core.Cons.prototype.cljs$core$ISeqable$ = !0;
cljs.core.Cons.prototype.cljs$core$ISeqable$_seq = function(a) {
  return a
};
cljs.core.Cons.prototype.cljs$core$IHash$ = !0;
cljs.core.Cons.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.Cons.prototype.cljs$core$IEquiv$ = !0;
cljs.core.Cons.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.Cons.prototype.cljs$core$ISequential$ = !0;
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.Cons.prototype.cljs$core$ICollection$ = !0;
cljs.core.Cons.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return new cljs.core.Cons(null, b, a)
};
cljs.core.Cons.prototype.cljs$core$ISeq$ = !0;
cljs.core.Cons.prototype.cljs$core$ISeq$_first = function() {
  return this.first
};
cljs.core.Cons.prototype.cljs$core$ISeq$_rest = function() {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, this.rest)) ? cljs.core.List.EMPTY : this.rest
};
cljs.core.Cons.prototype.cljs$core$IMeta$ = !0;
cljs.core.Cons.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.Cons.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.Cons.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.Cons(b, this.first, this.rest)
};
cljs.core.cons = function(a, b) {
  return new cljs.core.Cons(null, a, b)
};
cljs.core.IReduce.string = !0;
cljs.core._reduce.string = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.ci_reduce.call(null, a, c);
      case 3:
        return cljs.core.ci_reduce.call(null, a, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ILookup.string = !0;
cljs.core._lookup.string = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._nth.call(null, a, c);
      case 3:
        return cljs.core._nth.call(null, a, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IIndexed.string = !0;
cljs.core._nth.string = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.truth_(c < cljs.core._count.call(null, a)) ? a.charAt(c) : null;
      case 3:
        return cljs.core.truth_(c < cljs.core._count.call(null, a)) ? a.charAt(c) : d
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ICounted.string = !0;
cljs.core._count.string = function(a) {
  return a.length
};
cljs.core.ISeqable.string = !0;
cljs.core._seq.string = function(a) {
  return cljs.core.prim_seq.call(null, a, 0)
};
cljs.core.IHash.string = !0;
cljs.core._hash.string = function(a) {
  return goog.string.hashCode.call(null, a)
};
String.prototype.cljs$core$IFn$ = !0;
String.prototype.call = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e = a;
        return cljs.core.get.call(null, c, this.toString());
      case 3:
        return e = a, cljs.core.get.call(null, c, this.toString(), d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
String.prototype.apply = function(a, b) {
  return cljs.core.truth_(2 > cljs.core.count.call(null, b)) ? cljs.core.get.call(null, b[0], a) : cljs.core.get.call(null, b[0], a, b[1])
};
cljs.core.lazy_seq_value = function(a) {
  var b = a.x;
  if(cljs.core.truth_(a.realized)) {
    return b
  }
  a.x = b.call(null);
  a.realized = !0;
  return a.x
};
cljs.core.LazySeq = function(a, b, c) {
  this.meta = a;
  this.realized = b;
  this.x = c
};
cljs.core.LazySeq.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "cljs.core.LazySeq")
};
cljs.core.LazySeq.prototype.cljs$core$ISeqable$ = !0;
cljs.core.LazySeq.prototype.cljs$core$ISeqable$_seq = function(a) {
  return cljs.core.seq.call(null, cljs.core.lazy_seq_value.call(null, a))
};
cljs.core.LazySeq.prototype.cljs$core$IHash$ = !0;
cljs.core.LazySeq.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.LazySeq.prototype.cljs$core$IEquiv$ = !0;
cljs.core.LazySeq.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.LazySeq.prototype.cljs$core$ISequential$ = !0;
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.LazySeq.prototype.cljs$core$ICollection$ = !0;
cljs.core.LazySeq.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return cljs.core.cons.call(null, b, a)
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$ = !0;
cljs.core.LazySeq.prototype.cljs$core$ISeq$_first = function(a) {
  return cljs.core.first.call(null, cljs.core.lazy_seq_value.call(null, a))
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$_rest = function(a) {
  return cljs.core.rest.call(null, cljs.core.lazy_seq_value.call(null, a))
};
cljs.core.LazySeq.prototype.cljs$core$IMeta$ = !0;
cljs.core.LazySeq.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.LazySeq(b, this.realized, this.x)
};
cljs.core.to_array = function(a) {
  for(var b = cljs.core.array.call(null);;) {
    if(cljs.core.truth_(cljs.core.seq.call(null, a))) {
      b.push(cljs.core.first.call(null, a)), a = cljs.core.next.call(null, a)
    }else {
      return b
    }
  }
};
cljs.core.bounded_count = function(a, b) {
  for(var c = a, d = b, e = 0;;) {
    if(cljs.core.truth_(function() {
      var a = 0 < d;
      return cljs.core.truth_(a) ? cljs.core.seq.call(null, c) : a
    }())) {
      var f = cljs.core.next.call(null, c), g = d - 1, e = e + 1, c = f, d = g
    }else {
      return e
    }
  }
};
cljs.core.spread = function spread(b) {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, b)) ? null : cljs.core.truth_(cljs.core.nil_QMARK_.call(null, cljs.core.next.call(null, b))) ? cljs.core.seq.call(null, cljs.core.first.call(null, b)) : cljs.core.truth_("\ufdd0'else") ? cljs.core.cons.call(null, cljs.core.first.call(null, b), spread.call(null, cljs.core.next.call(null, b))) : null
};
cljs.core.concat = function() {
  var a = null, b = function() {
    return new cljs.core.LazySeq(null, !1, function() {
      return null
    })
  }, c = function(a) {
    return new cljs.core.LazySeq(null, !1, function() {
      return a
    })
  }, d = function(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var d = cljs.core.seq.call(null, b);
      return cljs.core.truth_(d) ? cljs.core.cons.call(null, cljs.core.first.call(null, d), a.call(null, cljs.core.rest.call(null, d), c)) : c
    })
  }, e = function() {
    var b = function(b, c, d) {
      return function l(a, b) {
        return new cljs.core.LazySeq(null, !1, function() {
          var c = cljs.core.seq.call(null, a);
          return cljs.core.truth_(c) ? cljs.core.cons.call(null, cljs.core.first.call(null, c), l.call(null, cljs.core.rest.call(null, c), b)) : cljs.core.truth_(b) ? l.call(null, cljs.core.first.call(null, b), cljs.core.next.call(null, b)) : null
        })
      }.call(null, a.call(null, b, c), d)
    }, c = function(a, c, d) {
      var e = null;
      goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, c, e)
    };
    c.cljs$lang$maxFixedArity = 2;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, c, d, a)
    };
    return c
  }(), a = function(a, g, h) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a);
      case 2:
        return d.call(this, a, g);
      default:
        return e.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  return a
}();
cljs.core.list_STAR_ = function() {
  var a = null, b = function() {
    var a = function(a, b, c, d, i) {
      return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, cljs.core.cons.call(null, d, cljs.core.spread.call(null, i)))))
    }, b = function(b, d, g, h, i) {
      var j = null;
      goog.isDef(i) && (j = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
      return a.call(this, b, d, g, h, j)
    };
    b.cljs$lang$maxFixedArity = 4;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), g = cljs.core.first(cljs.core.next(b)), h = cljs.core.first(cljs.core.next(cljs.core.next(b))), i = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(b)))), b = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(b))));
      return a.call(this, d, g, h, i, b)
    };
    return b
  }(), a = function(a, d, e, f, g) {
    switch(arguments.length) {
      case 1:
        return cljs.core.seq.call(null, a);
      case 2:
        return cljs.core.cons.call(null, a, d);
      case 3:
        return cljs.core.cons.call(null, a, cljs.core.cons.call(null, d, e));
      case 4:
        return cljs.core.cons.call(null, a, cljs.core.cons.call(null, d, cljs.core.cons.call(null, e, f)));
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.apply = function() {
  var a = null, b = function() {
    var a = function(a, b, c, d, i, j) {
      b = cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, cljs.core.cons.call(null, d, cljs.core.cons.call(null, i, cljs.core.spread.call(null, j)))));
      c = a.cljs$lang$maxFixedArity;
      return cljs.core.truth_(a.cljs$lang$applyTo) ? cljs.core.truth_(cljs.core.bounded_count.call(null, b, c) <= c) ? a.apply(a, cljs.core.to_array.call(null, b)) : a.cljs$lang$applyTo(b) : a.apply(a, cljs.core.to_array.call(null, b))
    }, b = function(b, d, g, h, i, j) {
      var k = null;
      goog.isDef(j) && (k = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0));
      return a.call(this, b, d, g, h, i, k)
    };
    b.cljs$lang$maxFixedArity = 5;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), g = cljs.core.first(cljs.core.next(b)), h = cljs.core.first(cljs.core.next(cljs.core.next(b))), i = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(b)))), j = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(b))))), b = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(b)))));
      return a.call(this, d, g, h, i, j, b)
    };
    return b
  }(), a = function(a, d, e, f, g, h) {
    switch(arguments.length) {
      case 2:
        var i = a, j = d, k = i.cljs$lang$maxFixedArity;
        return cljs.core.truth_(i.cljs$lang$applyTo) ? cljs.core.truth_(cljs.core.bounded_count.call(null, j, k + 1) <= k) ? i.apply(i, cljs.core.to_array.call(null, j)) : i.cljs$lang$applyTo(j) : i.apply(i, cljs.core.to_array.call(null, j));
      case 3:
        return i = a, j = cljs.core.list_STAR_.call(null, d, e), k = i.cljs$lang$maxFixedArity, cljs.core.truth_(i.cljs$lang$applyTo) ? cljs.core.truth_(cljs.core.bounded_count.call(null, j, k) <= k) ? i.apply(i, cljs.core.to_array.call(null, j)) : i.cljs$lang$applyTo(j) : i.apply(i, cljs.core.to_array.call(null, j));
      case 4:
        return i = a, j = cljs.core.list_STAR_.call(null, d, e, f), k = i.cljs$lang$maxFixedArity, cljs.core.truth_(i.cljs$lang$applyTo) ? cljs.core.truth_(cljs.core.bounded_count.call(null, j, k) <= k) ? i.apply(i, cljs.core.to_array.call(null, j)) : i.cljs$lang$applyTo(j) : i.apply(i, cljs.core.to_array.call(null, j));
      case 5:
        return i = a, j = cljs.core.list_STAR_.call(null, d, e, f, g), k = i.cljs$lang$maxFixedArity, cljs.core.truth_(i.cljs$lang$applyTo) ? cljs.core.truth_(cljs.core.bounded_count.call(null, j, k) <= k) ? i.apply(i, cljs.core.to_array.call(null, j)) : i.cljs$lang$applyTo(j) : i.apply(i, cljs.core.to_array.call(null, j));
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 5;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.vary_meta = function() {
  var a = function(a, b, e) {
    return cljs.core.with_meta.call(null, a, cljs.core.apply.call(null, b, cljs.core.meta.call(null, a), e))
  }, b = function(b, d, e) {
    var f = null;
    goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
    return a.call(this, d, e, b)
  };
  return b
}();
cljs.core.not_EQ_ = function() {
  var a = null, b = function() {
    var a = function(a, b, c) {
      var g = null;
      goog.isDef(c) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.not.call(null, cljs.core.apply.call(null, cljs.core._EQ_, a, b, g))
    };
    a.cljs$lang$maxFixedArity = 2;
    a.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return cljs.core.not.call(null, cljs.core.apply.call(null, cljs.core._EQ_, b, c, a))
    };
    return a
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return!1;
      case 2:
        return cljs.core.not.call(null, cljs.core._EQ_.call(null, a, d));
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.not_empty = function(a) {
  return cljs.core.truth_(cljs.core.seq.call(null, a)) ? a : null
};
cljs.core.every_QMARK_ = function(a, b) {
  for(;;) {
    if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, cljs.core.seq.call(null, b)))) {
      return!0
    }
    if(cljs.core.truth_(a.call(null, cljs.core.first.call(null, b)))) {
      var c = a, d = cljs.core.next.call(null, b), a = c, b = d
    }else {
      return cljs.core.truth_("\ufdd0'else") ? !1 : null
    }
  }
};
cljs.core.not_every_QMARK_ = function(a, b) {
  return cljs.core.not.call(null, cljs.core.every_QMARK_.call(null, a, b))
};
cljs.core.some = function(a, b) {
  for(;;) {
    if(cljs.core.truth_(cljs.core.seq.call(null, b))) {
      var c = a.call(null, cljs.core.first.call(null, b));
      if(cljs.core.truth_(c)) {
        return c
      }
      var c = a, d = cljs.core.next.call(null, b), a = c, b = d
    }else {
      return null
    }
  }
};
cljs.core.not_any_QMARK_ = function(a, b) {
  return cljs.core.not.call(null, cljs.core.some.call(null, a, b))
};
cljs.core.even_QMARK_ = function(a) {
  if(cljs.core.truth_(cljs.core.integer_QMARK_.call(null, a))) {
    return 0 === (a & 1)
  }
  throw Error(cljs.core.str.call(null, "Argument must be an integer: ", a));
};
cljs.core.odd_QMARK_ = function(a) {
  return cljs.core.not.call(null, cljs.core.even_QMARK_.call(null, a))
};
cljs.core.identity = function(a) {
  return a
};
cljs.core.complement = function(a) {
  return function() {
    var b = null, c = function() {
      var b = function(b, c, d) {
        var h = null;
        goog.isDef(d) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
        return cljs.core.not.call(null, cljs.core.apply.call(null, a, b, c, h))
      };
      b.cljs$lang$maxFixedArity = 2;
      b.cljs$lang$applyTo = function(b) {
        var c = cljs.core.first(b), d = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
        return cljs.core.not.call(null, cljs.core.apply.call(null, a, c, d, b))
      };
      return b
    }(), b = function(b, e, f) {
      switch(arguments.length) {
        case 0:
          return cljs.core.not.call(null, a.call(null));
        case 1:
          return cljs.core.not.call(null, a.call(null, b));
        case 2:
          return cljs.core.not.call(null, a.call(null, b, e));
        default:
          return c.apply(this, arguments)
      }
      throw"Invalid arity: " + arguments.length;
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = c.cljs$lang$applyTo;
    return b
  }()
};
cljs.core.constantly = function(a) {
  return function() {
    var b = function(b) {
      goog.isDef(b) && cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0);
      return a
    };
    b.cljs$lang$maxFixedArity = 0;
    b.cljs$lang$applyTo = function(b) {
      cljs.core.seq(b);
      return a
    };
    return b
  }()
};
cljs.core.comp = function() {
  var a = null, b = function(a, b) {
    return function() {
      var c = null, d = function() {
        var c = function(c, d, g, h) {
          var i = null;
          goog.isDef(h) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return a.call(null, cljs.core.apply.call(null, b, c, d, g, i))
        };
        c.cljs$lang$maxFixedArity = 3;
        c.cljs$lang$applyTo = function(c) {
          var d = cljs.core.first(c), g = cljs.core.first(cljs.core.next(c)), h = cljs.core.first(cljs.core.next(cljs.core.next(c))), c = cljs.core.rest(cljs.core.next(cljs.core.next(c)));
          return a.call(null, cljs.core.apply.call(null, b, d, g, h, c))
        };
        return c
      }(), c = function(c, g, k, l) {
        switch(arguments.length) {
          case 0:
            return a.call(null, b.call(null));
          case 1:
            return a.call(null, b.call(null, c));
          case 2:
            return a.call(null, b.call(null, c, g));
          case 3:
            return a.call(null, b.call(null, c, g, k));
          default:
            return d.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      c.cljs$lang$maxFixedArity = 3;
      c.cljs$lang$applyTo = d.cljs$lang$applyTo;
      return c
    }()
  }, c = function(a, b, c) {
    return function() {
      var d = null, i = function() {
        var d = function(d, h, i, j) {
          var n = null;
          goog.isDef(j) && (n = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return a.call(null, b.call(null, cljs.core.apply.call(null, c, d, h, i, n)))
        };
        d.cljs$lang$maxFixedArity = 3;
        d.cljs$lang$applyTo = function(d) {
          var h = cljs.core.first(d), i = cljs.core.first(cljs.core.next(d)), j = cljs.core.first(cljs.core.next(cljs.core.next(d))), d = cljs.core.rest(cljs.core.next(cljs.core.next(d)));
          return a.call(null, b.call(null, cljs.core.apply.call(null, c, h, i, j, d)))
        };
        return d
      }(), d = function(d, h, l, m) {
        switch(arguments.length) {
          case 0:
            return a.call(null, b.call(null, c.call(null)));
          case 1:
            return a.call(null, b.call(null, c.call(null, d)));
          case 2:
            return a.call(null, b.call(null, c.call(null, d, h)));
          case 3:
            return a.call(null, b.call(null, c.call(null, d, h, l)));
          default:
            return i.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      d.cljs$lang$maxFixedArity = 3;
      d.cljs$lang$applyTo = i.cljs$lang$applyTo;
      return d
    }()
  }, d = function() {
    var a = function(a, b, c, d) {
      var e = cljs.core.reverse.call(null, cljs.core.list_STAR_.call(null, a, b, c, d));
      return function() {
        var a = function(a) {
          for(var a = cljs.core.apply.call(null, cljs.core.first.call(null, e), a), b = cljs.core.next.call(null, e);;) {
            if(cljs.core.truth_(b)) {
              a = cljs.core.first.call(null, b).call(null, a), b = cljs.core.next.call(null, b)
            }else {
              return a
            }
          }
        }, b = function(b) {
          var c = null;
          goog.isDef(b) && (c = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
          return a.call(this, c)
        };
        b.cljs$lang$maxFixedArity = 0;
        b.cljs$lang$applyTo = function(b) {
          b = cljs.core.seq(b);
          return a.call(this, b)
        };
        return b
      }()
    }, b = function(b, c, d, f) {
      var k = null;
      goog.isDef(f) && (k = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return a.call(this, b, c, d, k)
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), d = cljs.core.first(cljs.core.next(b)), f = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
      return a.call(this, c, d, f, b)
    };
    return b
  }(), a = function(a, f, g, h) {
    switch(arguments.length) {
      case 0:
        return cljs.core.identity;
      case 1:
        return a;
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      default:
        return d.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  return a
}();
cljs.core.partial = function() {
  var a = null, b = function(a, b) {
    return function() {
      var c = function(c) {
        var d = null;
        goog.isDef(c) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
        return cljs.core.apply.call(null, a, b, d)
      };
      c.cljs$lang$maxFixedArity = 0;
      c.cljs$lang$applyTo = function(c) {
        c = cljs.core.seq(c);
        return cljs.core.apply.call(null, a, b, c)
      };
      return c
    }()
  }, c = function(a, b, c) {
    return function() {
      var d = function(d) {
        var e = null;
        goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
        return cljs.core.apply.call(null, a, b, c, e)
      };
      d.cljs$lang$maxFixedArity = 0;
      d.cljs$lang$applyTo = function(d) {
        d = cljs.core.seq(d);
        return cljs.core.apply.call(null, a, b, c, d)
      };
      return d
    }()
  }, d = function(a, b, c, d) {
    return function() {
      var e = function(e) {
        var j = null;
        goog.isDef(e) && (j = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
        return cljs.core.apply.call(null, a, b, c, d, j)
      };
      e.cljs$lang$maxFixedArity = 0;
      e.cljs$lang$applyTo = function(e) {
        e = cljs.core.seq(e);
        return cljs.core.apply.call(null, a, b, c, d, e)
      };
      return e
    }()
  }, e = function() {
    var a = function(a, b, c, d, e) {
      return function() {
        var f = function(f) {
          return cljs.core.apply.call(null, a, b, c, d, cljs.core.concat.call(null, e, f))
        }, g = function(a) {
          var b = null;
          goog.isDef(a) && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
          return f.call(this, b)
        };
        g.cljs$lang$maxFixedArity = 0;
        g.cljs$lang$applyTo = function(a) {
          a = cljs.core.seq(a);
          return f.call(this, a)
        };
        return g
      }()
    }, b = function(b, c, d, e, g) {
      var m = null;
      goog.isDef(g) && (m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
      return a.call(this, b, c, d, e, m)
    };
    b.cljs$lang$maxFixedArity = 4;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), d = cljs.core.first(cljs.core.next(b)), e = cljs.core.first(cljs.core.next(cljs.core.next(b))), g = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(b)))), b = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(b))));
      return a.call(this, c, d, e, g, b)
    };
    return b
  }(), a = function(a, g, h, i, j) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, g);
      case 3:
        return c.call(this, a, g, h);
      case 4:
        return d.call(this, a, g, h, i);
      default:
        return e.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  return a
}();
cljs.core.fnil = function() {
  var a = null, b = function(a, b) {
    return function() {
      var c = null, d = function() {
        var c = function(c, d, g, h) {
          return cljs.core.apply.call(null, a, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, c)) ? b : c, d, g, h)
        }, d = function(a, b, d, e) {
          var f = null;
          goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return c.call(this, a, b, d, f)
        };
        d.cljs$lang$maxFixedArity = 3;
        d.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return c.call(this, b, d, e, a)
        };
        return d
      }(), c = function(c, g, k, l) {
        switch(arguments.length) {
          case 1:
            return a.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, c)) ? b : c);
          case 2:
            return a.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, c)) ? b : c, g);
          case 3:
            return a.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, c)) ? b : c, g, k);
          default:
            return d.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      c.cljs$lang$maxFixedArity = 3;
      c.cljs$lang$applyTo = d.cljs$lang$applyTo;
      return c
    }()
  }, c = function(a, b, c) {
    return function() {
      var d = null, i = function() {
        var d = function(d, h, i, j) {
          return cljs.core.apply.call(null, a, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, d)) ? b : d, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, h)) ? c : h, i, j)
        }, h = function(a, b, c, e) {
          var f = null;
          goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return d.call(this, a, b, c, f)
        };
        h.cljs$lang$maxFixedArity = 3;
        h.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return d.call(this, b, c, e, a)
        };
        return h
      }(), d = function(d, h, l, m) {
        switch(arguments.length) {
          case 2:
            return a.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, d)) ? b : d, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, h)) ? c : h);
          case 3:
            return a.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, d)) ? b : d, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, h)) ? c : h, l);
          default:
            return i.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      d.cljs$lang$maxFixedArity = 3;
      d.cljs$lang$applyTo = i.cljs$lang$applyTo;
      return d
    }()
  }, d = function(a, b, c, d) {
    return function() {
      var i = null, j = function() {
        var i = function(i, j, k, l) {
          return cljs.core.apply.call(null, a, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, i)) ? b : i, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, j)) ? c : j, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, k)) ? d : k, l)
        }, j = function(a, b, c, d) {
          var e = null;
          goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return i.call(this, a, b, c, e)
        };
        j.cljs$lang$maxFixedArity = 3;
        j.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return i.call(this, b, c, d, a)
        };
        return j
      }(), i = function(i, l, m, p) {
        switch(arguments.length) {
          case 2:
            return a.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, i)) ? b : i, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, l)) ? c : l);
          case 3:
            return a.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, i)) ? b : i, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, l)) ? c : l, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, m)) ? d : m);
          default:
            return j.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      i.cljs$lang$maxFixedArity = 3;
      i.cljs$lang$applyTo = j.cljs$lang$applyTo;
      return i
    }()
  };
  return function(a, f, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.map_indexed = function(a, b) {
  return function d(b, f) {
    return new cljs.core.LazySeq(null, !1, function() {
      var g = cljs.core.seq.call(null, f);
      return cljs.core.truth_(g) ? cljs.core.cons.call(null, a.call(null, b, cljs.core.first.call(null, g)), d.call(null, b + 1, cljs.core.rest.call(null, g))) : null
    })
  }.call(null, 0, b)
};
cljs.core.keep = function keep(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    var d = cljs.core.seq.call(null, c);
    if(cljs.core.truth_(d)) {
      var e = b.call(null, cljs.core.first.call(null, d));
      return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, e)) ? keep.call(null, b, cljs.core.rest.call(null, d)) : cljs.core.cons.call(null, e, keep.call(null, b, cljs.core.rest.call(null, d)))
    }
    return null
  })
};
cljs.core.keep_indexed = function(a, b) {
  return function d(b, f) {
    return new cljs.core.LazySeq(null, !1, function() {
      var g = cljs.core.seq.call(null, f);
      if(cljs.core.truth_(g)) {
        var h = a.call(null, b, cljs.core.first.call(null, g));
        return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, h)) ? d.call(null, b + 1, cljs.core.rest.call(null, g)) : cljs.core.cons.call(null, h, d.call(null, b + 1, cljs.core.rest.call(null, g)))
      }
      return null
    })
  }.call(null, 0, b)
};
cljs.core.every_pred = function() {
  var a = null, b = function(a) {
    return function() {
      var b = null, c = function(b, c) {
        return cljs.core.boolean$.call(null, function() {
          var d = a.call(null, b);
          return cljs.core.truth_(d) ? a.call(null, c) : d
        }())
      }, d = function(b, c, d) {
        return cljs.core.boolean$.call(null, function() {
          var e = a.call(null, b);
          return cljs.core.truth_(e) ? (e = a.call(null, c), cljs.core.truth_(e) ? a.call(null, d) : e) : e
        }())
      }, e = function() {
        var c = function(c, d, e, h) {
          return cljs.core.boolean$.call(null, function() {
            var i = b.call(null, c, d, e);
            return cljs.core.truth_(i) ? cljs.core.every_QMARK_.call(null, a, h) : i
          }())
        }, d = function(a, b, d, e) {
          var f = null;
          goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return c.call(this, a, b, d, f)
        };
        d.cljs$lang$maxFixedArity = 3;
        d.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return c.call(this, b, d, e, a)
        };
        return d
      }(), b = function(b, g, m, p) {
        switch(arguments.length) {
          case 0:
            return!0;
          case 1:
            return cljs.core.boolean$.call(null, a.call(null, b));
          case 2:
            return c.call(this, b, g);
          case 3:
            return d.call(this, b, g, m);
          default:
            return e.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      b.cljs$lang$maxFixedArity = 3;
      b.cljs$lang$applyTo = e.cljs$lang$applyTo;
      return b
    }()
  }, c = function(a, b) {
    return function() {
      var c = null, d = function(c) {
        return cljs.core.boolean$.call(null, function() {
          var d = a.call(null, c);
          return cljs.core.truth_(d) ? b.call(null, c) : d
        }())
      }, e = function(c, d) {
        return cljs.core.boolean$.call(null, function() {
          var e = a.call(null, c);
          return cljs.core.truth_(e) && (e = a.call(null, d), cljs.core.truth_(e)) ? (e = b.call(null, c), cljs.core.truth_(e) ? b.call(null, d) : e) : e
        }())
      }, k = function(c, d, e) {
        return cljs.core.boolean$.call(null, function() {
          var h = a.call(null, c);
          return cljs.core.truth_(h) && (h = a.call(null, d), cljs.core.truth_(h) && (h = a.call(null, e), cljs.core.truth_(h) && (h = b.call(null, c), cljs.core.truth_(h)))) ? (h = b.call(null, d), cljs.core.truth_(h) ? b.call(null, e) : h) : h
        }())
      }, l = function() {
        var d = function(d, e, i, j) {
          return cljs.core.boolean$.call(null, function() {
            var m = c.call(null, d, e, i);
            return cljs.core.truth_(m) ? cljs.core.every_QMARK_.call(null, function(c) {
              var d = a.call(null, c);
              return cljs.core.truth_(d) ? b.call(null, c) : d
            }, j) : m
          }())
        }, e = function(a, b, c, e) {
          var f = null;
          goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return d.call(this, a, b, c, f)
        };
        e.cljs$lang$maxFixedArity = 3;
        e.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return d.call(this, b, c, e, a)
        };
        return e
      }(), c = function(a, b, c, f) {
        switch(arguments.length) {
          case 0:
            return!0;
          case 1:
            return d.call(this, a);
          case 2:
            return e.call(this, a, b);
          case 3:
            return k.call(this, a, b, c);
          default:
            return l.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      c.cljs$lang$maxFixedArity = 3;
      c.cljs$lang$applyTo = l.cljs$lang$applyTo;
      return c
    }()
  }, d = function(a, b, c) {
    return function() {
      var d = null, e = function(d) {
        return cljs.core.boolean$.call(null, function() {
          var e = a.call(null, d);
          return cljs.core.truth_(e) ? (e = b.call(null, d), cljs.core.truth_(e) ? c.call(null, d) : e) : e
        }())
      }, k = function(d, e) {
        return cljs.core.boolean$.call(null, function() {
          var i = a.call(null, d);
          return cljs.core.truth_(i) && (i = b.call(null, d), cljs.core.truth_(i) && (i = c.call(null, d), cljs.core.truth_(i) && (i = a.call(null, e), cljs.core.truth_(i)))) ? (i = b.call(null, e), cljs.core.truth_(i) ? c.call(null, e) : i) : i
        }())
      }, l = function(d, e, i) {
        return cljs.core.boolean$.call(null, function() {
          var j = a.call(null, d);
          return cljs.core.truth_(j) && (j = b.call(null, d), cljs.core.truth_(j) && (j = c.call(null, d), cljs.core.truth_(j) && (j = a.call(null, e), cljs.core.truth_(j) && (j = b.call(null, e), cljs.core.truth_(j) && (j = c.call(null, e), cljs.core.truth_(j) && (j = a.call(null, i), cljs.core.truth_(j))))))) ? (j = b.call(null, i), cljs.core.truth_(j) ? c.call(null, i) : j) : j
        }())
      }, m = function() {
        var e = function(e, j, m, k) {
          return cljs.core.boolean$.call(null, function() {
            var l = d.call(null, e, j, m);
            return cljs.core.truth_(l) ? cljs.core.every_QMARK_.call(null, function(d) {
              var e = a.call(null, d);
              return cljs.core.truth_(e) ? (e = b.call(null, d), cljs.core.truth_(e) ? c.call(null, d) : e) : e
            }, k) : l
          }())
        }, j = function(a, b, c, d) {
          var f = null;
          goog.isDef(d) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return e.call(this, a, b, c, f)
        };
        j.cljs$lang$maxFixedArity = 3;
        j.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return e.call(this, b, c, d, a)
        };
        return j
      }(), d = function(a, b, c, d) {
        switch(arguments.length) {
          case 0:
            return!0;
          case 1:
            return e.call(this, a);
          case 2:
            return k.call(this, a, b);
          case 3:
            return l.call(this, a, b, c);
          default:
            return m.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      d.cljs$lang$maxFixedArity = 3;
      d.cljs$lang$applyTo = m.cljs$lang$applyTo;
      return d
    }()
  }, e = function() {
    var a = function(a, b, c, d) {
      var e = cljs.core.list_STAR_.call(null, a, b, c, d);
      return function() {
        var a = null, b = function(a) {
          return cljs.core.every_QMARK_.call(null, function(b) {
            return b.call(null, a)
          }, e)
        }, c = function(a, b) {
          return cljs.core.every_QMARK_.call(null, function(c) {
            var d = c.call(null, a);
            return cljs.core.truth_(d) ? c.call(null, b) : d
          }, e)
        }, d = function(a, b, c) {
          return cljs.core.every_QMARK_.call(null, function(d) {
            var e = d.call(null, a);
            return cljs.core.truth_(e) ? (e = d.call(null, b), cljs.core.truth_(e) ? d.call(null, c) : e) : e
          }, e)
        }, f = function() {
          var b = function(b, c, d, f) {
            return cljs.core.boolean$.call(null, function() {
              var g = a.call(null, b, c, d);
              return cljs.core.truth_(g) ? cljs.core.every_QMARK_.call(null, function(a) {
                return cljs.core.every_QMARK_.call(null, a, f)
              }, e) : g
            }())
          }, c = function(a, c, d, e) {
            var f = null;
            goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
            return b.call(this, a, c, d, f)
          };
          c.cljs$lang$maxFixedArity = 3;
          c.cljs$lang$applyTo = function(a) {
            var c = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
            return b.call(this, c, d, e, a)
          };
          return c
        }(), a = function(a, e, g, h) {
          switch(arguments.length) {
            case 0:
              return!0;
            case 1:
              return b.call(this, a);
            case 2:
              return c.call(this, a, e);
            case 3:
              return d.call(this, a, e, g);
            default:
              return f.apply(this, arguments)
          }
          throw"Invalid arity: " + arguments.length;
        };
        a.cljs$lang$maxFixedArity = 3;
        a.cljs$lang$applyTo = f.cljs$lang$applyTo;
        return a
      }()
    }, b = function(b, c, d, e) {
      var g = null;
      goog.isDef(e) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return a.call(this, b, c, d, g)
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), d = cljs.core.first(cljs.core.next(b)), e = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
      return a.call(this, c, d, e, b)
    };
    return b
  }(), a = function(a, g, h, i) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      default:
        return e.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  return a
}();
cljs.core.some_fn = function() {
  var a = null, b = function(a) {
    return function() {
      var b = null, c = function() {
        var c = function(c, d, e, h) {
          c = b.call(null, c, d, e);
          return cljs.core.truth_(c) ? c : cljs.core.some.call(null, a, h)
        }, d = function(a, b, d, e) {
          var f = null;
          goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return c.call(this, a, b, d, f)
        };
        d.cljs$lang$maxFixedArity = 3;
        d.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return c.call(this, b, d, e, a)
        };
        return d
      }(), b = function(b, d, e, g) {
        switch(arguments.length) {
          case 0:
            return null;
          case 1:
            return a.call(null, b);
          case 2:
            var m = d, p = a.call(null, b);
            return cljs.core.truth_(p) ? p : a.call(null, m);
          case 3:
            var p = d, m = e, n = a.call(null, b);
            cljs.core.truth_(n) ? m = n : (p = a.call(null, p), m = cljs.core.truth_(p) ? p : a.call(null, m));
            return m;
          default:
            return c.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      b.cljs$lang$maxFixedArity = 3;
      b.cljs$lang$applyTo = c.cljs$lang$applyTo;
      return b
    }()
  }, c = function(a, b) {
    return function() {
      var c = null, d = function(c, d, e) {
        var h = a.call(null, c);
        if(cljs.core.truth_(h)) {
          return h
        }
        h = a.call(null, d);
        if(cljs.core.truth_(h)) {
          return h
        }
        h = a.call(null, e);
        if(cljs.core.truth_(h)) {
          return h
        }
        c = b.call(null, c);
        if(cljs.core.truth_(c)) {
          return c
        }
        d = b.call(null, d);
        return cljs.core.truth_(d) ? d : b.call(null, e)
      }, e = function() {
        var d = function(d, e, i, j) {
          d = c.call(null, d, e, i);
          return cljs.core.truth_(d) ? d : cljs.core.some.call(null, function(c) {
            var d = a.call(null, c);
            return cljs.core.truth_(d) ? d : b.call(null, c)
          }, j)
        }, e = function(a, b, c, e) {
          var f = null;
          goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return d.call(this, a, b, c, f)
        };
        e.cljs$lang$maxFixedArity = 3;
        e.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return d.call(this, b, c, e, a)
        };
        return e
      }(), c = function(c, h, m, p) {
        switch(arguments.length) {
          case 0:
            return null;
          case 1:
            var n = c, q = a.call(null, n);
            return cljs.core.truth_(q) ? q : b.call(null, n);
          case 2:
            var q = c, n = h, o = a.call(null, q);
            cljs.core.truth_(o) ? n = o : (o = a.call(null, n), cljs.core.truth_(o) ? n = o : (q = b.call(null, q), n = cljs.core.truth_(q) ? q : b.call(null, n)));
            return n;
          case 3:
            return d.call(this, c, h, m);
          default:
            return e.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      c.cljs$lang$maxFixedArity = 3;
      c.cljs$lang$applyTo = e.cljs$lang$applyTo;
      return c
    }()
  }, d = function(a, b, c) {
    return function() {
      var d = null, e = function(d, e) {
        var i = a.call(null, d);
        if(cljs.core.truth_(i)) {
          return i
        }
        i = b.call(null, d);
        if(cljs.core.truth_(i)) {
          return i
        }
        i = c.call(null, d);
        if(cljs.core.truth_(i)) {
          return i
        }
        i = a.call(null, e);
        if(cljs.core.truth_(i)) {
          return i
        }
        i = b.call(null, e);
        return cljs.core.truth_(i) ? i : c.call(null, e)
      }, k = function(d, e, i) {
        var j = a.call(null, d);
        if(cljs.core.truth_(j)) {
          return j
        }
        j = b.call(null, d);
        if(cljs.core.truth_(j)) {
          return j
        }
        d = c.call(null, d);
        if(cljs.core.truth_(d)) {
          return d
        }
        d = a.call(null, e);
        if(cljs.core.truth_(d)) {
          return d
        }
        d = b.call(null, e);
        if(cljs.core.truth_(d)) {
          return d
        }
        e = c.call(null, e);
        if(cljs.core.truth_(e)) {
          return e
        }
        e = a.call(null, i);
        if(cljs.core.truth_(e)) {
          return e
        }
        e = b.call(null, i);
        return cljs.core.truth_(e) ? e : c.call(null, i)
      }, l = function() {
        var e = function(e, j, l, k) {
          e = d.call(null, e, j, l);
          return cljs.core.truth_(e) ? e : cljs.core.some.call(null, function(d) {
            var e = a.call(null, d);
            if(cljs.core.truth_(e)) {
              return e
            }
            e = b.call(null, d);
            return cljs.core.truth_(e) ? e : c.call(null, d)
          }, k)
        }, j = function(a, b, c, d) {
          var f = null;
          goog.isDef(d) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return e.call(this, a, b, c, f)
        };
        j.cljs$lang$maxFixedArity = 3;
        j.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return e.call(this, b, c, d, a)
        };
        return j
      }(), d = function(d, i, n, q) {
        switch(arguments.length) {
          case 0:
            return null;
          case 1:
            var o;
            o = d;
            var s = a.call(null, o);
            cljs.core.truth_(s) ? o = s : (s = b.call(null, o), o = cljs.core.truth_(s) ? s : c.call(null, o));
            return o;
          case 2:
            return e.call(this, d, i);
          case 3:
            return k.call(this, d, i, n);
          default:
            return l.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      d.cljs$lang$maxFixedArity = 3;
      d.cljs$lang$applyTo = l.cljs$lang$applyTo;
      return d
    }()
  }, e = function() {
    var a = function(a, b, c, d) {
      var e = cljs.core.list_STAR_.call(null, a, b, c, d);
      return function() {
        var a = null, b = function(a) {
          return cljs.core.some.call(null, function(b) {
            return b.call(null, a)
          }, e)
        }, c = function(a, b) {
          return cljs.core.some.call(null, function(c) {
            var d = c.call(null, a);
            return cljs.core.truth_(d) ? d : c.call(null, b)
          }, e)
        }, d = function(a, b, c) {
          return cljs.core.some.call(null, function(d) {
            var e = d.call(null, a);
            if(cljs.core.truth_(e)) {
              return e
            }
            e = d.call(null, b);
            return cljs.core.truth_(e) ? e : d.call(null, c)
          }, e)
        }, f = function() {
          var b = function(b, c, d, f) {
            b = a.call(null, b, c, d);
            return cljs.core.truth_(b) ? b : cljs.core.some.call(null, function(a) {
              return cljs.core.some.call(null, a, f)
            }, e)
          }, c = function(a, c, d, e) {
            var f = null;
            goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
            return b.call(this, a, c, d, f)
          };
          c.cljs$lang$maxFixedArity = 3;
          c.cljs$lang$applyTo = function(a) {
            var c = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
            return b.call(this, c, d, e, a)
          };
          return c
        }(), a = function(a, e, g, h) {
          switch(arguments.length) {
            case 0:
              return null;
            case 1:
              return b.call(this, a);
            case 2:
              return c.call(this, a, e);
            case 3:
              return d.call(this, a, e, g);
            default:
              return f.apply(this, arguments)
          }
          throw"Invalid arity: " + arguments.length;
        };
        a.cljs$lang$maxFixedArity = 3;
        a.cljs$lang$applyTo = f.cljs$lang$applyTo;
        return a
      }()
    }, b = function(b, c, d, e) {
      var g = null;
      goog.isDef(e) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return a.call(this, b, c, d, g)
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), d = cljs.core.first(cljs.core.next(b)), e = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
      return a.call(this, c, d, e, b)
    };
    return b
  }(), a = function(a, g, h, i) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      default:
        return e.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  return a
}();
cljs.core.map = function() {
  var a = null, b = function(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var d = cljs.core.seq.call(null, c);
      return cljs.core.truth_(d) ? cljs.core.cons.call(null, b.call(null, cljs.core.first.call(null, d)), a.call(null, b, cljs.core.rest.call(null, d))) : null
    })
  }, c = function(b, c, d) {
    return new cljs.core.LazySeq(null, !1, function() {
      var e = cljs.core.seq.call(null, c), j = cljs.core.seq.call(null, d);
      return cljs.core.truth_(cljs.core.truth_(e) ? j : e) ? cljs.core.cons.call(null, b.call(null, cljs.core.first.call(null, e), cljs.core.first.call(null, j)), a.call(null, b, cljs.core.rest.call(null, e), cljs.core.rest.call(null, j))) : null
    })
  }, d = function(b, c, d, e) {
    return new cljs.core.LazySeq(null, !1, function() {
      var j = cljs.core.seq.call(null, c), k = cljs.core.seq.call(null, d), l = cljs.core.seq.call(null, e);
      return cljs.core.truth_(cljs.core.truth_(j) ? cljs.core.truth_(k) ? l : k : j) ? cljs.core.cons.call(null, b.call(null, cljs.core.first.call(null, j), cljs.core.first.call(null, k), cljs.core.first.call(null, l)), a.call(null, b, cljs.core.rest.call(null, j), cljs.core.rest.call(null, k), cljs.core.rest.call(null, l))) : null
    })
  }, e = function() {
    var b = function(b, c, d, e, f) {
      return a.call(null, function(a) {
        return cljs.core.apply.call(null, b, a)
      }, function p(b) {
        return new cljs.core.LazySeq(null, !1, function() {
          var c = a.call(null, cljs.core.seq, b);
          return cljs.core.truth_(cljs.core.every_QMARK_.call(null, cljs.core.identity, c)) ? cljs.core.cons.call(null, a.call(null, cljs.core.first, c), p.call(null, a.call(null, cljs.core.rest, c))) : null
        })
      }.call(null, cljs.core.conj.call(null, f, e, d, c)))
    }, c = function(a, c, d, e, g) {
      var m = null;
      goog.isDef(g) && (m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
      return b.call(this, a, c, d, e, m)
    };
    c.cljs$lang$maxFixedArity = 4;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), g = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(a)))), a = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(a))));
      return b.call(this, c, d, e, g, a)
    };
    return c
  }(), a = function(a, g, h, i, j) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, g);
      case 3:
        return c.call(this, a, g, h);
      case 4:
        return d.call(this, a, g, h, i);
      default:
        return e.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  return a
}();
cljs.core.take = function take(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    if(cljs.core.truth_(0 < b)) {
      var d = cljs.core.seq.call(null, c);
      return cljs.core.truth_(d) ? cljs.core.cons.call(null, cljs.core.first.call(null, d), take.call(null, b - 1, cljs.core.rest.call(null, d))) : null
    }
    return null
  })
};
cljs.core.drop = function(a, b) {
  var c = function(a, b) {
    for(;;) {
      var c = cljs.core.seq.call(null, b);
      if(cljs.core.truth_(function() {
        var b = 0 < a;
        return cljs.core.truth_(b) ? c : b
      }())) {
        var g = a - 1, h = cljs.core.rest.call(null, c), a = g, b = h
      }else {
        return c
      }
    }
  };
  return new cljs.core.LazySeq(null, !1, function() {
    return c.call(null, a, b)
  })
};
cljs.core.drop_last = function() {
  var a = null, b = function(a, b) {
    return cljs.core.map.call(null, function(a) {
      return a
    }, b, cljs.core.drop.call(null, a, b))
  };
  return a = function(c, d) {
    switch(arguments.length) {
      case 1:
        return a.call(null, 1, c);
      case 2:
        return b.call(this, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.take_last = function(a, b) {
  for(var c = cljs.core.seq.call(null, b), d = cljs.core.seq.call(null, cljs.core.drop.call(null, a, b));;) {
    if(cljs.core.truth_(d)) {
      c = cljs.core.next.call(null, c), d = cljs.core.next.call(null, d)
    }else {
      return c
    }
  }
};
cljs.core.drop_while = function(a, b) {
  var c = function(a, b) {
    for(;;) {
      var c = cljs.core.seq.call(null, b);
      if(cljs.core.truth_(function() {
        var b = c;
        return cljs.core.truth_(b) ? a.call(null, cljs.core.first.call(null, c)) : b
      }())) {
        var g = a, h = cljs.core.rest.call(null, c), a = g, b = h
      }else {
        return c
      }
    }
  };
  return new cljs.core.LazySeq(null, !1, function() {
    return c.call(null, a, b)
  })
};
cljs.core.cycle = function cycle(b) {
  return new cljs.core.LazySeq(null, !1, function() {
    var c = cljs.core.seq.call(null, b);
    return cljs.core.truth_(c) ? cljs.core.concat.call(null, c, cycle.call(null, c)) : null
  })
};
cljs.core.split_at = function(a, b) {
  return cljs.core.Vector.fromArray([cljs.core.take.call(null, a, b), cljs.core.drop.call(null, a, b)])
};
cljs.core.repeat = function() {
  var a = null, b = function(b) {
    return new cljs.core.LazySeq(null, !1, function() {
      return cljs.core.cons.call(null, b, a.call(null, b))
    })
  };
  return a = function(c, d) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return cljs.core.take.call(null, c, a.call(null, d))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.replicate = function(a, b) {
  return cljs.core.take.call(null, a, cljs.core.repeat.call(null, b))
};
cljs.core.repeatedly = function() {
  var a = null, b = function(b) {
    return new cljs.core.LazySeq(null, !1, function() {
      return cljs.core.cons.call(null, b.call(null), a.call(null, b))
    })
  };
  return a = function(c, d) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return cljs.core.take.call(null, c, a.call(null, d))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.iterate = function iterate(b, c) {
  return cljs.core.cons.call(null, c, new cljs.core.LazySeq(null, !1, function() {
    return iterate.call(null, b, b.call(null, c))
  }))
};
cljs.core.interleave = function() {
  var a = null, b = function(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var f = cljs.core.seq.call(null, b), g = cljs.core.seq.call(null, c);
      return cljs.core.truth_(cljs.core.truth_(f) ? g : f) ? cljs.core.cons.call(null, cljs.core.first.call(null, f), cljs.core.cons.call(null, cljs.core.first.call(null, g), a.call(null, cljs.core.rest.call(null, f), cljs.core.rest.call(null, g)))) : null
    })
  }, c = function() {
    var b = function(b, c, d) {
      return new cljs.core.LazySeq(null, !1, function() {
        var e = cljs.core.map.call(null, cljs.core.seq, cljs.core.conj.call(null, d, c, b));
        return cljs.core.truth_(cljs.core.every_QMARK_.call(null, cljs.core.identity, e)) ? cljs.core.concat.call(null, cljs.core.map.call(null, cljs.core.first, e), cljs.core.apply.call(null, a, cljs.core.map.call(null, cljs.core.rest, e))) : null
      })
    }, c = function(a, c, e) {
      var i = null;
      goog.isDef(e) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, c, i)
    };
    c.cljs$lang$maxFixedArity = 2;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a), e = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, c, e, a)
    };
    return c
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      default:
        return c.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  return a
}();
cljs.core.interpose = function(a, b) {
  return cljs.core.drop.call(null, 1, cljs.core.interleave.call(null, cljs.core.repeat.call(null, a), b))
};
cljs.core.flatten1 = function(a) {
  return function c(a, e) {
    return new cljs.core.LazySeq(null, !1, function() {
      var f = cljs.core.seq.call(null, a);
      return cljs.core.truth_(f) ? cljs.core.cons.call(null, cljs.core.first.call(null, f), c.call(null, cljs.core.rest.call(null, f), e)) : cljs.core.truth_(cljs.core.seq.call(null, e)) ? c.call(null, cljs.core.first.call(null, e), cljs.core.rest.call(null, e)) : null
    })
  }.call(null, null, a)
};
cljs.core.mapcat = function() {
  var a = null, b = function() {
    var a = function(a, b, c) {
      var g = null;
      goog.isDef(c) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.flatten1.call(null, cljs.core.apply.call(null, cljs.core.map, a, b, g))
    };
    a.cljs$lang$maxFixedArity = 2;
    a.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return cljs.core.flatten1.call(null, cljs.core.apply.call(null, cljs.core.map, b, c, a))
    };
    return a
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core.flatten1.call(null, cljs.core.map.call(null, a, d));
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.filter = function filter(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    var d = cljs.core.seq.call(null, c);
    if(cljs.core.truth_(d)) {
      var e = cljs.core.first.call(null, d), d = cljs.core.rest.call(null, d);
      return cljs.core.truth_(b.call(null, e)) ? cljs.core.cons.call(null, e, filter.call(null, b, d)) : filter.call(null, b, d)
    }
    return null
  })
};
cljs.core.remove = function(a, b) {
  return cljs.core.filter.call(null, cljs.core.complement.call(null, a), b)
};
cljs.core.tree_seq = function(a, b, c) {
  return function e(c) {
    return new cljs.core.LazySeq(null, !1, function() {
      return cljs.core.cons.call(null, c, cljs.core.truth_(a.call(null, c)) ? cljs.core.mapcat.call(null, e, b.call(null, c)) : null)
    })
  }.call(null, c)
};
cljs.core.flatten = function(a) {
  return cljs.core.filter.call(null, function(a) {
    return cljs.core.not.call(null, cljs.core.sequential_QMARK_.call(null, a))
  }, cljs.core.rest.call(null, cljs.core.tree_seq.call(null, cljs.core.sequential_QMARK_, cljs.core.seq, a)))
};
cljs.core.into = function(a, b) {
  return cljs.core.reduce.call(null, cljs.core._conj, a, b)
};
cljs.core.partition = function() {
  var a = null, b = function(b, c, f) {
    return new cljs.core.LazySeq(null, !1, function() {
      var g = cljs.core.seq.call(null, f);
      if(cljs.core.truth_(g)) {
        var h = cljs.core.take.call(null, b, g);
        return cljs.core.truth_(cljs.core._EQ_.call(null, b, cljs.core.count.call(null, h))) ? cljs.core.cons.call(null, h, a.call(null, b, c, cljs.core.drop.call(null, c, g))) : null
      }
      return null
    })
  }, c = function(b, c, f, g) {
    return new cljs.core.LazySeq(null, !1, function() {
      var h = cljs.core.seq.call(null, g);
      if(cljs.core.truth_(h)) {
        var i = cljs.core.take.call(null, b, h);
        return cljs.core.truth_(cljs.core._EQ_.call(null, b, cljs.core.count.call(null, i))) ? cljs.core.cons.call(null, i, a.call(null, b, c, f, cljs.core.drop.call(null, c, h))) : cljs.core.list.call(null, cljs.core.take.call(null, b, cljs.core.concat.call(null, i, f)))
      }
      return null
    })
  };
  return a = function(d, e, f, g) {
    switch(arguments.length) {
      case 2:
        return a.call(null, d, d, e);
      case 3:
        return b.call(this, d, e, f);
      case 4:
        return c.call(this, d, e, f, g)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.get_in = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.reduce.call(null, cljs.core.get, a, c);
      case 3:
        var e;
        a: {
          for(var f = cljs.core.lookup_sentinel, g = a, h = cljs.core.seq.call(null, c);;) {
            if(cljs.core.truth_(h)) {
              g = cljs.core.get.call(null, g, cljs.core.first.call(null, h), f);
              if(cljs.core.truth_(f === g)) {
                e = d;
                break a
              }
              h = cljs.core.next.call(null, h)
            }else {
              e = g;
              break a
            }
          }
        }
        return e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.assoc_in = function assoc_in(b, c, d) {
  var e = cljs.core.nth.call(null, c, 0, null), c = cljs.core.nthnext.call(null, c, 1);
  return cljs.core.truth_(c) ? cljs.core.assoc.call(null, b, e, assoc_in.call(null, cljs.core.get.call(null, b, e), c, d)) : cljs.core.assoc.call(null, b, e, d)
};
cljs.core.update_in = function() {
  var a = function(a, d, e, f) {
    var g = cljs.core.nth.call(null, d, 0, null), d = cljs.core.nthnext.call(null, d, 1);
    return cljs.core.truth_(d) ? cljs.core.assoc.call(null, a, g, cljs.core.apply.call(null, b, cljs.core.get.call(null, a, g), d, e, f)) : cljs.core.assoc.call(null, a, g, cljs.core.apply.call(null, e, cljs.core.get.call(null, a, g), f))
  }, b = function(b, d, e, f) {
    var g = null;
    goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return a.call(this, b, d, e, g)
  };
  b.cljs$lang$maxFixedArity = 3;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), f = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
    return a.call(this, d, e, f, b)
  };
  return b
}();
cljs.core.Vector = function(a, b) {
  this.meta = a;
  this.array = b
};
cljs.core.Vector.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "cljs.core.Vector")
};
cljs.core.Vector.prototype.cljs$core$IHash$ = !0;
cljs.core.Vector.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.Vector.prototype.cljs$core$ILookup$ = !0;
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._nth.call(null, a, c, null);
      case 3:
        return cljs.core._nth.call(null, a, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Vector.prototype.cljs$core$IAssociative$ = !0;
cljs.core.Vector.prototype.cljs$core$IAssociative$_assoc = function(a, b, c) {
  a = cljs.core.aclone.call(null, this.array);
  a[b] = c;
  return new cljs.core.Vector(this.meta, a)
};
cljs.core.Vector.prototype.cljs$core$IFn$ = !0;
cljs.core.Vector.prototype.call = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e = a;
        return cljs.core._lookup.call(null, this, c);
      case 3:
        return e = a, cljs.core._lookup.call(null, this, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Vector.prototype.cljs$core$ISequential$ = !0;
cljs.core.Vector.prototype.cljs$core$ICollection$ = !0;
cljs.core.Vector.prototype.cljs$core$ICollection$_conj = function(a, b) {
  var c = cljs.core.aclone.call(null, this.array);
  c.push(b);
  return new cljs.core.Vector(this.meta, c)
};
cljs.core.Vector.prototype.cljs$core$IReduce$ = !0;
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.ci_reduce.call(null, this.array, c);
      case 3:
        return cljs.core.ci_reduce.call(null, this.array, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Vector.prototype.cljs$core$ISeqable$ = !0;
cljs.core.Vector.prototype.cljs$core$ISeqable$_seq = function() {
  var a = this;
  return cljs.core.truth_(0 < a.array.length) ? function c(d) {
    return new cljs.core.LazySeq(null, !1, function() {
      return cljs.core.truth_(d < a.array.length) ? cljs.core.cons.call(null, a.array[d], c.call(null, d + 1)) : null
    })
  }.call(null, 0) : null
};
cljs.core.Vector.prototype.cljs$core$ICounted$ = !0;
cljs.core.Vector.prototype.cljs$core$ICounted$_count = function() {
  return this.array.length
};
cljs.core.Vector.prototype.cljs$core$IStack$ = !0;
cljs.core.Vector.prototype.cljs$core$IStack$_peek = function() {
  var a = this.array.length;
  return cljs.core.truth_(0 < a) ? this.array[a - 1] : null
};
cljs.core.Vector.prototype.cljs$core$IStack$_pop = function() {
  if(cljs.core.truth_(0 < this.array.length)) {
    var a = cljs.core.aclone.call(null, this.array);
    a.pop();
    return new cljs.core.Vector(this.meta, a)
  }
  throw Error("Can't pop empty vector");
};
cljs.core.Vector.prototype.cljs$core$IVector$ = !0;
cljs.core.Vector.prototype.cljs$core$IVector$_assoc_n = function(a, b, c) {
  return cljs.core._assoc.call(null, a, b, c)
};
cljs.core.Vector.prototype.cljs$core$IEquiv$ = !0;
cljs.core.Vector.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.Vector.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.Vector.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.Vector(b, this.array)
};
cljs.core.Vector.prototype.cljs$core$IMeta$ = !0;
cljs.core.Vector.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.Vector.prototype.cljs$core$IIndexed$ = !0;
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth = function() {
  var a = null, b = function(a, b) {
    var c = this;
    return cljs.core.truth_(function() {
      var a = 0 <= b;
      return cljs.core.truth_(a) ? b < c.array.length : a
    }()) ? c.array[b] : null
  }, c = function(a, b, c) {
    var g = this;
    return cljs.core.truth_(function() {
      var a = 0 <= b;
      return cljs.core.truth_(a) ? b < g.array.length : a
    }()) ? g.array[b] : c
  };
  return function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.Vector.EMPTY, this.meta)
};
cljs.core.Vector.EMPTY = new cljs.core.Vector(null, cljs.core.array.call(null));
cljs.core.Vector.fromArray = function(a) {
  return new cljs.core.Vector(null, a)
};
cljs.core.vec = function(a) {
  return cljs.core.reduce.call(null, cljs.core.conj, cljs.core.Vector.EMPTY, a)
};
cljs.core.vector = function() {
  var a = function(a) {
    var c = null;
    goog.isDef(a) && (c = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return cljs.core.vec.call(null, c)
  };
  a.cljs$lang$maxFixedArity = 0;
  a.cljs$lang$applyTo = function(a) {
    a = cljs.core.seq(a);
    return cljs.core.vec.call(null, a)
  };
  return a
}();
cljs.core.Subvec = function(a, b, c, d) {
  this.meta = a;
  this.v = b;
  this.start = c;
  this.end = d
};
cljs.core.Subvec.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "cljs.core.Subvec")
};
cljs.core.Subvec.prototype.cljs$core$IHash$ = !0;
cljs.core.Subvec.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.Subvec.prototype.cljs$core$ILookup$ = !0;
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._nth.call(null, a, c, null);
      case 3:
        return cljs.core._nth.call(null, a, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Subvec.prototype.cljs$core$IAssociative$ = !0;
cljs.core.Subvec.prototype.cljs$core$IAssociative$_assoc = function(a, b, c) {
  a = this.start + b;
  return new cljs.core.Subvec(this.meta, cljs.core._assoc.call(null, this.v, a, c), this.start, this.end > a + 1 ? this.end : a + 1)
};
cljs.core.Subvec.prototype.cljs$core$IFn$ = !0;
cljs.core.Subvec.prototype.call = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e = a;
        return cljs.core._lookup.call(null, this, c);
      case 3:
        return e = a, cljs.core._lookup.call(null, this, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Subvec.prototype.cljs$core$ISequential$ = !0;
cljs.core.Subvec.prototype.cljs$core$ICollection$ = !0;
cljs.core.Subvec.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return new cljs.core.Subvec(this.meta, cljs.core._assoc_n.call(null, this.v, this.end, b), this.start, this.end + 1)
};
cljs.core.Subvec.prototype.cljs$core$IReduce$ = !0;
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.ci_reduce.call(null, a, c);
      case 3:
        return cljs.core.ci_reduce.call(null, a, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Subvec.prototype.cljs$core$ISeqable$ = !0;
cljs.core.Subvec.prototype.cljs$core$ISeqable$_seq = function() {
  var a = this;
  return function c(d) {
    return cljs.core.truth_(cljs.core._EQ_.call(null, d, a.end)) ? null : cljs.core.cons.call(null, cljs.core._nth.call(null, a.v, d), new cljs.core.LazySeq(null, !1, function() {
      return c.call(null, d + 1)
    }))
  }.call(null, a.start)
};
cljs.core.Subvec.prototype.cljs$core$ICounted$ = !0;
cljs.core.Subvec.prototype.cljs$core$ICounted$_count = function() {
  return this.end - this.start
};
cljs.core.Subvec.prototype.cljs$core$IStack$ = !0;
cljs.core.Subvec.prototype.cljs$core$IStack$_peek = function() {
  return cljs.core._nth.call(null, this.v, this.end - 1)
};
cljs.core.Subvec.prototype.cljs$core$IStack$_pop = function() {
  if(cljs.core.truth_(cljs.core._EQ_.call(null, this.start, this.end))) {
    throw Error("Can't pop empty vector");
  }
  return new cljs.core.Subvec(this.meta, this.v, this.start, this.end - 1)
};
cljs.core.Subvec.prototype.cljs$core$IVector$ = !0;
cljs.core.Subvec.prototype.cljs$core$IVector$_assoc_n = function(a, b, c) {
  return cljs.core._assoc.call(null, a, b, c)
};
cljs.core.Subvec.prototype.cljs$core$IEquiv$ = !0;
cljs.core.Subvec.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.Subvec.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.Subvec.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.Subvec(b, this.v, this.start, this.end)
};
cljs.core.Subvec.prototype.cljs$core$IMeta$ = !0;
cljs.core.Subvec.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.Subvec.prototype.cljs$core$IIndexed$ = !0;
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._nth.call(null, this.v, this.start + c);
      case 3:
        return cljs.core._nth.call(null, this.v, this.start + c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.Vector.EMPTY, this.meta)
};
cljs.core.subvec = function() {
  var a = null;
  return a = function(b, c, d) {
    switch(arguments.length) {
      case 2:
        return a.call(null, b, c, cljs.core.count.call(null, b));
      case 3:
        return new cljs.core.Subvec(null, b, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.PersistentQueueSeq = function(a, b, c) {
  this.meta = a;
  this.front = b;
  this.rear = c
};
cljs.core.PersistentQueueSeq.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "cljs.core.PersistentQueueSeq")
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$ = !0;
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$_seq = function(a) {
  return a
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$ = !0;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$ = !0;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISequential$ = !0;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$ = !0;
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return cljs.core.cons.call(null, b, a)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$ = !0;
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_first = function() {
  return cljs.core._first.call(null, this.front)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_rest = function(a) {
  var b = cljs.core.next.call(null, this.front);
  return cljs.core.truth_(b) ? new cljs.core.PersistentQueueSeq(this.meta, b, this.rear) : cljs.core.truth_(cljs.core.nil_QMARK_.call(null, this.rear)) ? cljs.core._empty.call(null, a) : new cljs.core.PersistentQueueSeq(this.meta, this.rear, null)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$ = !0;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.PersistentQueueSeq(b, this.front, this.rear)
};
cljs.core.PersistentQueue = function(a, b, c, d) {
  this.meta = a;
  this.count = b;
  this.front = c;
  this.rear = d
};
cljs.core.PersistentQueue.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "cljs.core.PersistentQueue")
};
cljs.core.PersistentQueue.prototype.cljs$core$IHash$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISequential$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$_conj = function(a, b) {
  var c = this;
  return cljs.core.truth_(c.front) ? new cljs.core.PersistentQueue(c.meta, c.count + 1, c.front, cljs.core.conj.call(null, function() {
    var a = c.rear;
    return cljs.core.truth_(a) ? a : cljs.core.Vector.fromArray([])
  }(), b)) : new cljs.core.PersistentQueue(c.meta, c.count + 1, cljs.core.conj.call(null, c.front, b), cljs.core.Vector.fromArray([]))
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$_seq = function() {
  var a = this, b = cljs.core.seq.call(null, a.rear);
  return cljs.core.truth_(function() {
    var c = a.front;
    return cljs.core.truth_(c) ? c : b
  }()) ? new cljs.core.PersistentQueueSeq(null, a.front, cljs.core.seq.call(null, b)) : cljs.core.List.EMPTY
};
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$_count = function() {
  return this.count
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_peek = function() {
  return cljs.core._first.call(null, this.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_pop = function(a) {
  return cljs.core.truth_(this.front) ? (a = cljs.core.next.call(null, this.front), cljs.core.truth_(a) ? new cljs.core.PersistentQueue(this.meta, this.count - 1, a, this.rear) : new cljs.core.PersistentQueue(this.meta, this.count - 1, cljs.core.seq.call(null, this.rear), cljs.core.Vector.fromArray([]))) : a
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_first = function() {
  return cljs.core.first.call(null, this.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_rest = function(a) {
  return cljs.core.rest.call(null, cljs.core.seq.call(null, a))
};
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.PersistentQueue(b, this.count, this.front, this.rear)
};
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.PersistentQueue.EMPTY
};
cljs.core.PersistentQueue.EMPTY = new cljs.core.PersistentQueue(null, 0, null, cljs.core.Vector.fromArray([]));
cljs.core.NeverEquiv = function() {
};
cljs.core.NeverEquiv.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "cljs.core.NeverEquiv")
};
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$ = !0;
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$_equiv = function() {
  return!1
};
cljs.core.never_equiv = new cljs.core.NeverEquiv;
cljs.core.equiv_map = function(a, b) {
  return cljs.core.boolean$.call(null, cljs.core.truth_(cljs.core.map_QMARK_.call(null, b)) ? cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.count.call(null, a), cljs.core.count.call(null, b))) ? cljs.core.every_QMARK_.call(null, cljs.core.identity, cljs.core.map.call(null, function(a) {
    return cljs.core._EQ_.call(null, cljs.core.get.call(null, b, cljs.core.first.call(null, a), cljs.core.never_equiv), cljs.core.second.call(null, a))
  }, a)) : null : null)
};
cljs.core.scan_array = function(a, b, c) {
  for(var d = c.length, e = 0;;) {
    if(cljs.core.truth_(e < d)) {
      if(cljs.core.truth_(cljs.core._EQ_.call(null, b, c[e]))) {
        return e
      }
      e += a
    }else {
      return null
    }
  }
};
cljs.core.obj_map_contains_key_QMARK_ = function() {
  var a = null, b = function(a, b, e, f) {
    return cljs.core.truth_(function() {
      var e = goog.isString.call(null, a);
      return cljs.core.truth_(e) ? b.hasOwnProperty(a) : e
    }()) ? e : f
  };
  return a = function(c, d, e, f) {
    switch(arguments.length) {
      case 2:
        return a.call(null, c, d, !0, !1);
      case 4:
        return b.call(this, c, d, e, f)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ObjMap = function(a, b, c) {
  this.meta = a;
  this.keys = b;
  this.strobj = c
};
cljs.core.ObjMap.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "cljs.core.ObjMap")
};
cljs.core.ObjMap.prototype.cljs$core$IHash$ = !0;
cljs.core.ObjMap.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.ObjMap.prototype.cljs$core$ILookup$ = !0;
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, a, c, null);
      case 3:
        return cljs.core.obj_map_contains_key_QMARK_.call(null, c, this.strobj, this.strobj[c], d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ObjMap.prototype.cljs$core$IAssociative$ = !0;
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_assoc = function(a, b, c) {
  if(cljs.core.truth_(goog.isString.call(null, b))) {
    var a = goog.object.clone.call(null, this.strobj), d = a.hasOwnProperty(b);
    a[b] = c;
    if(cljs.core.truth_(d)) {
      return new cljs.core.ObjMap(this.meta, this.keys, a)
    }
    c = cljs.core.aclone.call(null, this.keys);
    c.push(b);
    return new cljs.core.ObjMap(this.meta, c, a)
  }
  return cljs.core.with_meta.call(null, cljs.core.into.call(null, cljs.core.hash_map.call(null, b, c), cljs.core.seq.call(null, a)), this.meta)
};
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_ = function(a, b) {
  return cljs.core.obj_map_contains_key_QMARK_.call(null, b, this.strobj)
};
cljs.core.ObjMap.prototype.cljs$core$IFn$ = !0;
cljs.core.ObjMap.prototype.call = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e = a;
        return cljs.core._lookup.call(null, this, c);
      case 3:
        return e = a, cljs.core._lookup.call(null, this, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ObjMap.prototype.cljs$core$ICollection$ = !0;
cljs.core.ObjMap.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return cljs.core.truth_(cljs.core.vector_QMARK_.call(null, b)) ? cljs.core._assoc.call(null, a, cljs.core._nth.call(null, b, 0), cljs.core._nth.call(null, b, 1)) : cljs.core.reduce.call(null, cljs.core._conj, a, b)
};
cljs.core.ObjMap.prototype.cljs$core$ISeqable$ = !0;
cljs.core.ObjMap.prototype.cljs$core$ISeqable$_seq = function() {
  var a = this;
  return cljs.core.truth_(0 < a.keys.length) ? cljs.core.map.call(null, function(b) {
    return cljs.core.vector.call(null, b, a.strobj[b])
  }, a.keys) : null
};
cljs.core.ObjMap.prototype.cljs$core$ICounted$ = !0;
cljs.core.ObjMap.prototype.cljs$core$ICounted$_count = function() {
  return this.keys.length
};
cljs.core.ObjMap.prototype.cljs$core$IEquiv$ = !0;
cljs.core.ObjMap.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_map.call(null, a, b)
};
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.ObjMap(b, this.keys, this.strobj)
};
cljs.core.ObjMap.prototype.cljs$core$IMeta$ = !0;
cljs.core.ObjMap.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.ObjMap.EMPTY, this.meta)
};
cljs.core.ObjMap.prototype.cljs$core$IMap$ = !0;
cljs.core.ObjMap.prototype.cljs$core$IMap$_dissoc = function(a, b) {
  var c = this;
  if(cljs.core.truth_(function() {
    var a = goog.isString.call(null, b);
    return cljs.core.truth_(a) ? c.strobj.hasOwnProperty(b) : a
  }())) {
    var d = cljs.core.aclone.call(null, c.keys), e = goog.object.clone.call(null, c.strobj);
    d.splice(cljs.core.scan_array.call(null, 1, b, d), 1);
    cljs.core.js_delete.call(null, e, b);
    return new cljs.core.ObjMap(c.meta, d, e)
  }
  return a
};
cljs.core.ObjMap.EMPTY = new cljs.core.ObjMap(null, cljs.core.array.call(null), cljs.core.js_obj.call(null));
cljs.core.ObjMap.fromObject = function(a, b) {
  return new cljs.core.ObjMap(null, a, b)
};
cljs.core.HashMap = function(a, b, c) {
  this.meta = a;
  this.count = b;
  this.hashobj = c
};
cljs.core.HashMap.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "cljs.core.HashMap")
};
cljs.core.HashMap.prototype.cljs$core$IHash$ = !0;
cljs.core.HashMap.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.HashMap.prototype.cljs$core$ILookup$ = !0;
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, a, c, null);
      case 3:
        var e = this.hashobj[cljs.core.hash.call(null, c)], f = cljs.core.truth_(e) ? cljs.core.scan_array.call(null, 2, c, e) : null;
        return cljs.core.truth_(f) ? e[f + 1] : d
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.HashMap.prototype.cljs$core$IAssociative$ = !0;
cljs.core.HashMap.prototype.cljs$core$IAssociative$_assoc = function(a, b, c) {
  var a = cljs.core.hash.call(null, b), d = this.hashobj[a];
  if(cljs.core.truth_(d)) {
    var d = cljs.core.aclone.call(null, d), e = goog.object.clone.call(null, this.hashobj);
    e[a] = d;
    a = cljs.core.scan_array.call(null, 2, b, d);
    if(cljs.core.truth_(a)) {
      return d[a + 1] = c, new cljs.core.HashMap(this.meta, this.count, e)
    }
    d.push(b, c);
    return new cljs.core.HashMap(this.meta, this.count + 1, e)
  }
  d = goog.object.clone.call(null, this.hashobj);
  d[a] = cljs.core.array.call(null, b, c);
  return new cljs.core.HashMap(this.meta, this.count + 1, d)
};
cljs.core.HashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_ = function(a, b) {
  var c = this.hashobj[cljs.core.hash.call(null, b)], c = cljs.core.truth_(c) ? cljs.core.scan_array.call(null, 2, b, c) : null;
  return cljs.core.truth_(c) ? !0 : !1
};
cljs.core.HashMap.prototype.cljs$core$IFn$ = !0;
cljs.core.HashMap.prototype.call = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e = a;
        return cljs.core._lookup.call(null, this, c);
      case 3:
        return e = a, cljs.core._lookup.call(null, this, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.HashMap.prototype.cljs$core$ICollection$ = !0;
cljs.core.HashMap.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return cljs.core.truth_(cljs.core.vector_QMARK_.call(null, b)) ? cljs.core._assoc.call(null, a, cljs.core._nth.call(null, b, 0), cljs.core._nth.call(null, b, 1)) : cljs.core.reduce.call(null, cljs.core._conj, a, b)
};
cljs.core.HashMap.prototype.cljs$core$ISeqable$ = !0;
cljs.core.HashMap.prototype.cljs$core$ISeqable$_seq = function() {
  var a = this;
  if(cljs.core.truth_(0 < a.count)) {
    var b = cljs.core.js_keys.call(null, a.hashobj).sort();
    return cljs.core.mapcat.call(null, function(b) {
      return cljs.core.map.call(null, cljs.core.vec, cljs.core.partition.call(null, 2, a.hashobj[b]))
    }, b)
  }
  return null
};
cljs.core.HashMap.prototype.cljs$core$ICounted$ = !0;
cljs.core.HashMap.prototype.cljs$core$ICounted$_count = function() {
  return this.count
};
cljs.core.HashMap.prototype.cljs$core$IEquiv$ = !0;
cljs.core.HashMap.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_map.call(null, a, b)
};
cljs.core.HashMap.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.HashMap.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.HashMap(b, this.count, this.hashobj)
};
cljs.core.HashMap.prototype.cljs$core$IMeta$ = !0;
cljs.core.HashMap.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.HashMap.EMPTY, this.meta)
};
cljs.core.HashMap.prototype.cljs$core$IMap$ = !0;
cljs.core.HashMap.prototype.cljs$core$IMap$_dissoc = function(a, b) {
  var c = cljs.core.hash.call(null, b), d = this.hashobj[c], e = cljs.core.truth_(d) ? cljs.core.scan_array.call(null, 2, b, d) : null;
  if(cljs.core.truth_(cljs.core.not.call(null, e))) {
    return a
  }
  var f = goog.object.clone.call(null, this.hashobj);
  cljs.core.truth_(3 > d.length) ? cljs.core.js_delete.call(null, f, c) : (d = cljs.core.aclone.call(null, d), d.splice(e, 2), f[c] = d);
  return new cljs.core.HashMap(this.meta, this.count - 1, f)
};
cljs.core.HashMap.EMPTY = new cljs.core.HashMap(null, 0, cljs.core.js_obj.call(null));
cljs.core.HashMap.fromArrays = function(a, b) {
  for(var c = a.length, d = 0, e = cljs.core.HashMap.EMPTY;;) {
    if(cljs.core.truth_(d < c)) {
      var f = d + 1, e = cljs.core.assoc.call(null, e, a[d], b[d]), d = f
    }else {
      return e
    }
  }
};
cljs.core.hash_map = function() {
  var a = function(a) {
    for(var a = cljs.core.seq.call(null, a), b = cljs.core.HashMap.EMPTY;;) {
      if(cljs.core.truth_(a)) {
        var e = cljs.core.nnext.call(null, a), b = cljs.core.assoc.call(null, b, cljs.core.first.call(null, a), cljs.core.second.call(null, a)), a = e
      }else {
        return b
      }
    }
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.keys = function(a) {
  return cljs.core.seq.call(null, cljs.core.map.call(null, cljs.core.first, a))
};
cljs.core.vals = function(a) {
  return cljs.core.seq.call(null, cljs.core.map.call(null, cljs.core.second, a))
};
cljs.core.merge = function() {
  var a = function(a) {
    return cljs.core.truth_(cljs.core.some.call(null, cljs.core.identity, a)) ? cljs.core.reduce.call(null, function(a, b) {
      return cljs.core.conj.call(null, cljs.core.truth_(a) ? a : cljs.core.ObjMap.fromObject([], {}), b)
    }, a) : null
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.merge_with = function() {
  var a = function(a, b) {
    if(cljs.core.truth_(cljs.core.some.call(null, cljs.core.identity, b))) {
      var e = function(b, d) {
        var e = cljs.core.first.call(null, d), i = cljs.core.second.call(null, d);
        return cljs.core.truth_(cljs.core.contains_QMARK_.call(null, b, e)) ? cljs.core.assoc.call(null, b, e, a.call(null, cljs.core.get.call(null, b, e), i)) : cljs.core.assoc.call(null, b, e, i)
      };
      return cljs.core.reduce.call(null, function(a, b) {
        return cljs.core.reduce.call(null, e, cljs.core.truth_(a) ? a : cljs.core.ObjMap.fromObject([], {}), cljs.core.seq.call(null, b))
      }, b)
    }
    return null
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a.call(this, d, b)
  };
  return b
}();
cljs.core.select_keys = function(a, b) {
  for(var c = cljs.core.ObjMap.fromObject([], {}), d = cljs.core.seq.call(null, b);;) {
    if(cljs.core.truth_(d)) {
      var e = cljs.core.first.call(null, d), f = cljs.core.get.call(null, a, e, "\ufdd0'user/not-found"), c = cljs.core.truth_(cljs.core.not_EQ_.call(null, f, "\ufdd0'user/not-found")) ? cljs.core.assoc.call(null, c, e, f) : c, d = cljs.core.next.call(null, d)
    }else {
      return c
    }
  }
};
cljs.core.Set = function(a, b) {
  this.meta = a;
  this.hash_map = b
};
cljs.core.Set.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "cljs.core.Set")
};
cljs.core.Set.prototype.cljs$core$IHash$ = !0;
cljs.core.Set.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.Set.prototype.cljs$core$ILookup$ = !0;
cljs.core.Set.prototype.cljs$core$ILookup$_lookup = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, a, c, null);
      case 3:
        return cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null, this.hash_map, c)) ? c : d
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Set.prototype.cljs$core$IFn$ = !0;
cljs.core.Set.prototype.call = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e = a;
        return cljs.core._lookup.call(null, this, c);
      case 3:
        return e = a, cljs.core._lookup.call(null, this, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Set.prototype.cljs$core$ICollection$ = !0;
cljs.core.Set.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return new cljs.core.Set(this.meta, cljs.core.assoc.call(null, this.hash_map, b, null))
};
cljs.core.Set.prototype.cljs$core$ISeqable$ = !0;
cljs.core.Set.prototype.cljs$core$ISeqable$_seq = function() {
  return cljs.core.keys.call(null, this.hash_map)
};
cljs.core.Set.prototype.cljs$core$ISet$ = !0;
cljs.core.Set.prototype.cljs$core$ISet$_disjoin = function(a, b) {
  return new cljs.core.Set(this.meta, cljs.core.dissoc.call(null, this.hash_map, b))
};
cljs.core.Set.prototype.cljs$core$ICounted$ = !0;
cljs.core.Set.prototype.cljs$core$ICounted$_count = function(a) {
  return cljs.core.count.call(null, cljs.core.seq.call(null, a))
};
cljs.core.Set.prototype.cljs$core$IEquiv$ = !0;
cljs.core.Set.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  var c = cljs.core.set_QMARK_.call(null, b);
  return cljs.core.truth_(c) ? (c = cljs.core._EQ_.call(null, cljs.core.count.call(null, a), cljs.core.count.call(null, b)), cljs.core.truth_(c) ? cljs.core.every_QMARK_.call(null, function(b) {
    return cljs.core.contains_QMARK_.call(null, a, b)
  }, b) : c) : c
};
cljs.core.Set.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.Set.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.Set(b, this.hash_map)
};
cljs.core.Set.prototype.cljs$core$IMeta$ = !0;
cljs.core.Set.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.Set.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.Set.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.Set.EMPTY, this.meta)
};
cljs.core.Set.EMPTY = new cljs.core.Set(null, cljs.core.hash_map.call(null));
cljs.core.set = function(a) {
  for(var a = cljs.core.seq.call(null, a), b = cljs.core.Set.EMPTY;;) {
    if(cljs.core.truth_(cljs.core.not.call(null, cljs.core.empty_QMARK_.call(null, a)))) {
      var c = cljs.core.rest.call(null, a), b = cljs.core.conj.call(null, b, cljs.core.first.call(null, a)), a = c
    }else {
      return b
    }
  }
};
cljs.core.replace = function(a, b) {
  if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null, b))) {
    var c = cljs.core.count.call(null, b);
    return cljs.core.reduce.call(null, function(b, c) {
      var f = cljs.core.find.call(null, a, cljs.core.nth.call(null, b, c));
      return cljs.core.truth_(f) ? cljs.core.assoc.call(null, b, c, cljs.core.second.call(null, f)) : b
    }, b, cljs.core.take.call(null, c, cljs.core.iterate.call(null, cljs.core.inc, 0)))
  }
  return cljs.core.map.call(null, function(b) {
    var c = cljs.core.find.call(null, a, b);
    return cljs.core.truth_(c) ? cljs.core.second.call(null, c) : b
  }, b)
};
cljs.core.distinct = function(a) {
  return function c(a, e) {
    return new cljs.core.LazySeq(null, !1, function() {
      return function(a, d) {
        for(;;) {
          var e = a, i = cljs.core.nth.call(null, e, 0, null), e = cljs.core.seq.call(null, e);
          if(cljs.core.truth_(e)) {
            if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, d, i))) {
              i = cljs.core.rest.call(null, e), e = d, a = i, d = e
            }else {
              return cljs.core.cons.call(null, i, c.call(null, cljs.core.rest.call(null, e), cljs.core.conj.call(null, d, i)))
            }
          }else {
            return null
          }
        }
      }.call(null, a, e)
    })
  }.call(null, a, cljs.core.set([]))
};
cljs.core.butlast = function(a) {
  for(var b = cljs.core.Vector.fromArray([]);;) {
    if(cljs.core.truth_(cljs.core.next.call(null, a))) {
      b = cljs.core.conj.call(null, b, cljs.core.first.call(null, a)), a = cljs.core.next.call(null, a)
    }else {
      return cljs.core.seq.call(null, b)
    }
  }
};
cljs.core.name = function(a) {
  if(cljs.core.truth_(cljs.core.string_QMARK_.call(null, a))) {
    return a
  }
  if(cljs.core.truth_(function() {
    var b = cljs.core.keyword_QMARK_.call(null, a);
    return cljs.core.truth_(b) ? b : cljs.core.symbol_QMARK_.call(null, a)
  }())) {
    var b = a.lastIndexOf("/");
    return cljs.core.truth_(0 > b) ? cljs.core.subs.call(null, a, 2) : cljs.core.subs.call(null, a, b + 1)
  }
  if(cljs.core.truth_("\ufdd0'else")) {
    throw Error(cljs.core.str.call(null, "Doesn't support name: ", a));
  }
  return null
};
cljs.core.namespace = function(a) {
  if(cljs.core.truth_(function() {
    var b = cljs.core.keyword_QMARK_.call(null, a);
    return cljs.core.truth_(b) ? b : cljs.core.symbol_QMARK_.call(null, a)
  }())) {
    var b = a.lastIndexOf("/");
    return cljs.core.truth_(-1 < b) ? cljs.core.subs.call(null, a, 2, b) : null
  }
  throw Error(cljs.core.str.call(null, "Doesn't support namespace: ", a));
};
cljs.core.zipmap = function(a, b) {
  for(var c = cljs.core.ObjMap.fromObject([], {}), d = cljs.core.seq.call(null, a), e = cljs.core.seq.call(null, b);;) {
    if(cljs.core.truth_(function() {
      var a = d;
      return cljs.core.truth_(a) ? e : a
    }())) {
      var c = cljs.core.assoc.call(null, c, cljs.core.first.call(null, d), cljs.core.first.call(null, e)), f = cljs.core.next.call(null, d), g = cljs.core.next.call(null, e), d = f, e = g
    }else {
      return c
    }
  }
};
cljs.core.max_key = function() {
  var a = null, b = function() {
    var b = function(b, c, d, h) {
      return cljs.core.reduce.call(null, function(c, d) {
        return a.call(null, b, c, d)
      }, a.call(null, b, c, d), h)
    }, d = function(a, d, g, h) {
      var i = null;
      goog.isDef(h) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return b.call(this, a, d, g, i)
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), g = cljs.core.first(cljs.core.next(a)), h = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return b.call(this, d, g, h, a)
    };
    return d
  }(), a = function(a, d, e, f) {
    switch(arguments.length) {
      case 2:
        return d;
      case 3:
        return cljs.core.truth_(a.call(null, d) > a.call(null, e)) ? d : e;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.min_key = function() {
  var a = null, b = function() {
    var b = function(b, c, d, h) {
      return cljs.core.reduce.call(null, function(c, d) {
        return a.call(null, b, c, d)
      }, a.call(null, b, c, d), h)
    }, d = function(a, d, g, h) {
      var i = null;
      goog.isDef(h) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return b.call(this, a, d, g, i)
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), g = cljs.core.first(cljs.core.next(a)), h = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return b.call(this, d, g, h, a)
    };
    return d
  }(), a = function(a, d, e, f) {
    switch(arguments.length) {
      case 2:
        return d;
      case 3:
        return cljs.core.truth_(a.call(null, d) < a.call(null, e)) ? d : e;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.partition_all = function() {
  var a = null, b = function(b, d, e) {
    return new cljs.core.LazySeq(null, !1, function() {
      var f = cljs.core.seq.call(null, e);
      return cljs.core.truth_(f) ? cljs.core.cons.call(null, cljs.core.take.call(null, b, f), a.call(null, b, d, cljs.core.drop.call(null, d, f))) : null
    })
  };
  return a = function(c, d, e) {
    switch(arguments.length) {
      case 2:
        return a.call(null, c, c, d);
      case 3:
        return b.call(this, c, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.take_while = function take_while(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    var d = cljs.core.seq.call(null, c);
    return cljs.core.truth_(d) ? cljs.core.truth_(b.call(null, cljs.core.first.call(null, d))) ? cljs.core.cons.call(null, cljs.core.first.call(null, d), take_while.call(null, b, cljs.core.rest.call(null, d))) : null : null
  })
};
cljs.core.Range = function(a, b, c, d) {
  this.meta = a;
  this.start = b;
  this.end = c;
  this.step = d
};
cljs.core.Range.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "cljs.core.Range")
};
cljs.core.Range.prototype.cljs$core$IHash$ = !0;
cljs.core.Range.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.Range.prototype.cljs$core$ISequential$ = !0;
cljs.core.Range.prototype.cljs$core$ICollection$ = !0;
cljs.core.Range.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return cljs.core.cons.call(null, b, a)
};
cljs.core.Range.prototype.cljs$core$IReduce$ = !0;
cljs.core.Range.prototype.cljs$core$IReduce$_reduce = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.ci_reduce.call(null, a, c);
      case 3:
        return cljs.core.ci_reduce.call(null, a, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Range.prototype.cljs$core$ISeqable$ = !0;
cljs.core.Range.prototype.cljs$core$ISeqable$_seq = function(a) {
  var b = cljs.core.truth_(0 < this.step) ? cljs.core._LT_ : cljs.core._GT_;
  return cljs.core.truth_(b.call(null, this.start, this.end)) ? a : null
};
cljs.core.Range.prototype.cljs$core$ICounted$ = !0;
cljs.core.Range.prototype.cljs$core$ICounted$_count = function(a) {
  return cljs.core.truth_(cljs.core.not.call(null, cljs.core._seq.call(null, a))) ? 0 : Math.ceil.call(null, (this.end - this.start) / this.step)
};
cljs.core.Range.prototype.cljs$core$ISeq$ = !0;
cljs.core.Range.prototype.cljs$core$ISeq$_first = function() {
  return this.start
};
cljs.core.Range.prototype.cljs$core$ISeq$_rest = function(a) {
  return cljs.core.truth_(cljs.core._seq.call(null, a)) ? new cljs.core.Range(this.meta, this.start + this.step, this.end, this.step) : cljs.core.list.call(null)
};
cljs.core.Range.prototype.cljs$core$IEquiv$ = !0;
cljs.core.Range.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.Range.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.Range.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.Range(b, this.start, this.end, this.step)
};
cljs.core.Range.prototype.cljs$core$IMeta$ = !0;
cljs.core.Range.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.Range.prototype.cljs$core$IIndexed$ = !0;
cljs.core.Range.prototype.cljs$core$IIndexed$_nth = function() {
  var a = null, b = function(a, b) {
    var c = this;
    if(cljs.core.truth_(b < cljs.core._count.call(null, a))) {
      return c.start + b * c.step
    }
    if(cljs.core.truth_(function() {
      var a = c.start > c.end;
      return cljs.core.truth_(a) ? cljs.core._EQ_.call(null, c.step, 0) : a
    }())) {
      return c.start
    }
    throw Error("Index out of bounds");
  }, c = function(a, b, c) {
    var g = this;
    return cljs.core.truth_(b < cljs.core._count.call(null, a)) ? g.start + b * g.step : cljs.core.truth_(function() {
      var a = g.start > g.end;
      return cljs.core.truth_(a) ? cljs.core._EQ_.call(null, g.step, 0) : a
    }()) ? g.start : c
  };
  return function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.range = function() {
  var a = null;
  return a = function(b, c, d) {
    switch(arguments.length) {
      case 0:
        return a.call(null, 0, Number.MAX_VALUE, 1);
      case 1:
        return a.call(null, 0, b, 1);
      case 2:
        return a.call(null, b, c, 1);
      case 3:
        return new cljs.core.Range(null, b, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.take_nth = function take_nth(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    var d = cljs.core.seq.call(null, c);
    return cljs.core.truth_(d) ? cljs.core.cons.call(null, cljs.core.first.call(null, d), take_nth.call(null, b, cljs.core.drop.call(null, b, d))) : null
  })
};
cljs.core.split_with = function(a, b) {
  return cljs.core.Vector.fromArray([cljs.core.take_while.call(null, a, b), cljs.core.drop_while.call(null, a, b)])
};
cljs.core.partition_by = function partition_by(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    var d = cljs.core.seq.call(null, c);
    if(cljs.core.truth_(d)) {
      var e = cljs.core.first.call(null, d), f = b.call(null, e), e = cljs.core.cons.call(null, e, cljs.core.take_while.call(null, function(c) {
        return cljs.core._EQ_.call(null, f, b.call(null, c))
      }, cljs.core.next.call(null, d)));
      return cljs.core.cons.call(null, e, partition_by.call(null, b, cljs.core.seq.call(null, cljs.core.drop.call(null, cljs.core.count.call(null, e), d))))
    }
    return null
  })
};
cljs.core.frequencies = function(a) {
  return cljs.core.reduce.call(null, function(a, c) {
    return cljs.core.assoc.call(null, a, c, cljs.core.get.call(null, a, c, 0) + 1)
  }, cljs.core.ObjMap.fromObject([], {}), a)
};
cljs.core.reductions = function() {
  var a = null, b = function(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var f = cljs.core.seq.call(null, c);
      return cljs.core.truth_(f) ? a.call(null, b, cljs.core.first.call(null, f), cljs.core.rest.call(null, f)) : cljs.core.list.call(null, b.call(null))
    })
  }, c = function(b, c, f) {
    return cljs.core.cons.call(null, c, new cljs.core.LazySeq(null, !1, function() {
      var g = cljs.core.seq.call(null, f);
      return cljs.core.truth_(g) ? a.call(null, b, b.call(null, c, cljs.core.first.call(null, g)), cljs.core.rest.call(null, g)) : null
    }))
  };
  return a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.juxt = function() {
  var a = null, b = function(a) {
    return function() {
      var b = null, c = function() {
        var b = function(b, c, d, e) {
          var g = null;
          goog.isDef(e) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return cljs.core.vector.call(null, cljs.core.apply.call(null, a, b, c, d, g))
        };
        b.cljs$lang$maxFixedArity = 3;
        b.cljs$lang$applyTo = function(b) {
          var c = cljs.core.first(b), d = cljs.core.first(cljs.core.next(b)), e = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
          return cljs.core.vector.call(null, cljs.core.apply.call(null, a, c, d, e, b))
        };
        return b
      }(), b = function(b, d, e, g) {
        switch(arguments.length) {
          case 0:
            return cljs.core.vector.call(null, a.call(null));
          case 1:
            return cljs.core.vector.call(null, a.call(null, b));
          case 2:
            return cljs.core.vector.call(null, a.call(null, b, d));
          case 3:
            return cljs.core.vector.call(null, a.call(null, b, d, e));
          default:
            return c.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      b.cljs$lang$maxFixedArity = 3;
      b.cljs$lang$applyTo = c.cljs$lang$applyTo;
      return b
    }()
  }, c = function(a, b) {
    return function() {
      var c = null, d = function() {
        var c = function(c, d, e, h) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, a, c, d, e, h), cljs.core.apply.call(null, b, c, d, e, h))
        }, d = function(a, b, d, e) {
          var f = null;
          goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return c.call(this, a, b, d, f)
        };
        d.cljs$lang$maxFixedArity = 3;
        d.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return c.call(this, b, d, e, a)
        };
        return d
      }(), c = function(c, e, h, m) {
        switch(arguments.length) {
          case 0:
            return cljs.core.vector.call(null, a.call(null), b.call(null));
          case 1:
            return cljs.core.vector.call(null, a.call(null, c), b.call(null, c));
          case 2:
            return cljs.core.vector.call(null, a.call(null, c, e), b.call(null, c, e));
          case 3:
            return cljs.core.vector.call(null, a.call(null, c, e, h), b.call(null, c, e, h));
          default:
            return d.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      c.cljs$lang$maxFixedArity = 3;
      c.cljs$lang$applyTo = d.cljs$lang$applyTo;
      return c
    }()
  }, d = function(a, b, c) {
    return function() {
      var d = null, e = function() {
        var d = function(d, e, i, j) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, a, d, e, i, j), cljs.core.apply.call(null, b, d, e, i, j), cljs.core.apply.call(null, c, d, e, i, j))
        }, e = function(a, b, c, e) {
          var f = null;
          goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return d.call(this, a, b, c, f)
        };
        e.cljs$lang$maxFixedArity = 3;
        e.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return d.call(this, b, c, e, a)
        };
        return e
      }(), d = function(d, i, m, p) {
        switch(arguments.length) {
          case 0:
            return cljs.core.vector.call(null, a.call(null), b.call(null), c.call(null));
          case 1:
            return cljs.core.vector.call(null, a.call(null, d), b.call(null, d), c.call(null, d));
          case 2:
            return cljs.core.vector.call(null, a.call(null, d, i), b.call(null, d, i), c.call(null, d, i));
          case 3:
            return cljs.core.vector.call(null, a.call(null, d, i, m), b.call(null, d, i, m), c.call(null, d, i, m));
          default:
            return e.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      d.cljs$lang$maxFixedArity = 3;
      d.cljs$lang$applyTo = e.cljs$lang$applyTo;
      return d
    }()
  }, e = function() {
    var a = function(a, b, c, d) {
      var e = cljs.core.list_STAR_.call(null, a, b, c, d);
      return function() {
        var a = null, b = function() {
          return cljs.core.reduce.call(null, function(a, b) {
            return cljs.core.conj.call(null, a, b.call(null))
          }, cljs.core.Vector.fromArray([]), e)
        }, c = function(a) {
          return cljs.core.reduce.call(null, function(b, c) {
            return cljs.core.conj.call(null, b, c.call(null, a))
          }, cljs.core.Vector.fromArray([]), e)
        }, d = function(a, b) {
          return cljs.core.reduce.call(null, function(c, d) {
            return cljs.core.conj.call(null, c, d.call(null, a, b))
          }, cljs.core.Vector.fromArray([]), e)
        }, f = function(a, b, c) {
          return cljs.core.reduce.call(null, function(d, e) {
            return cljs.core.conj.call(null, d, e.call(null, a, b, c))
          }, cljs.core.Vector.fromArray([]), e)
        }, g = function() {
          var a = function(a, b, c, d) {
            return cljs.core.reduce.call(null, function(e, f) {
              return cljs.core.conj.call(null, e, cljs.core.apply.call(null, f, a, b, c, d))
            }, cljs.core.Vector.fromArray([]), e)
          }, b = function(b, c, d, e) {
            var f = null;
            goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
            return a.call(this, b, c, d, f)
          };
          b.cljs$lang$maxFixedArity = 3;
          b.cljs$lang$applyTo = function(b) {
            var c = cljs.core.first(b), d = cljs.core.first(cljs.core.next(b)), e = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
            return a.call(this, c, d, e, b)
          };
          return b
        }(), a = function(a, e, h, i) {
          switch(arguments.length) {
            case 0:
              return b.call(this);
            case 1:
              return c.call(this, a);
            case 2:
              return d.call(this, a, e);
            case 3:
              return f.call(this, a, e, h);
            default:
              return g.apply(this, arguments)
          }
          throw"Invalid arity: " + arguments.length;
        };
        a.cljs$lang$maxFixedArity = 3;
        a.cljs$lang$applyTo = g.cljs$lang$applyTo;
        return a
      }()
    }, b = function(b, c, d, e) {
      var g = null;
      goog.isDef(e) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return a.call(this, b, c, d, g)
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), d = cljs.core.first(cljs.core.next(b)), e = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
      return a.call(this, c, d, e, b)
    };
    return b
  }(), a = function(a, g, h, i) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      default:
        return e.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  return a
}();
cljs.core.dorun = function() {
  var a = null, b = function(a, b) {
    for(;;) {
      if(cljs.core.truth_(function() {
        var e = cljs.core.seq.call(null, b);
        return cljs.core.truth_(e) ? 0 < a : e
      }())) {
        var e = a - 1, f = cljs.core.next.call(null, b), a = e, b = f
      }else {
        return null
      }
    }
  };
  return function(a, d) {
    switch(arguments.length) {
      case 1:
        var e;
        a: {
          for(var f = a;;) {
            if(cljs.core.truth_(cljs.core.seq.call(null, f))) {
              f = cljs.core.next.call(null, f)
            }else {
              e = null;
              break a
            }
          }
        }
        return e;
      case 2:
        return b.call(this, a, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.doall = function() {
  var a = null;
  return function(a, c) {
    switch(arguments.length) {
      case 1:
        return cljs.core.dorun.call(null, a), a;
      case 2:
        return cljs.core.dorun.call(null, a, c), c
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.re_matches = function(a, b) {
  var c = a.exec(b);
  return cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.first.call(null, c), b)) ? cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.count.call(null, c), 1)) ? cljs.core.first.call(null, c) : cljs.core.vec.call(null, c) : null
};
cljs.core.re_find = function(a, b) {
  var c = a.exec(b);
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, c)) ? null : cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.count.call(null, c), 1)) ? cljs.core.first.call(null, c) : cljs.core.vec.call(null, c)
};
cljs.core.re_seq = function re_seq(b, c) {
  var d = cljs.core.re_find.call(null, b, c), e = c.search(b), f = cljs.core.truth_(cljs.core.coll_QMARK_.call(null, d)) ? cljs.core.first.call(null, d) : d, g = cljs.core.subs.call(null, c, e + cljs.core.count.call(null, f));
  return cljs.core.truth_(d) ? new cljs.core.LazySeq(null, !1, function() {
    return cljs.core.cons.call(null, d, re_seq.call(null, b, g))
  }) : null
};
cljs.core.re_pattern = function(a) {
  return RegExp(a)
};
cljs.core.pr_sequential = function(a, b, c, d, e, f) {
  return cljs.core.concat.call(null, cljs.core.Vector.fromArray([b]), cljs.core.flatten1.call(null, cljs.core.interpose.call(null, cljs.core.Vector.fromArray([c]), cljs.core.map.call(null, function(b) {
    return a.call(null, b, e)
  }, f))), cljs.core.Vector.fromArray([d]))
};
cljs.core.string_print = function(a) {
  cljs.core._STAR_print_fn_STAR_.call(null, a);
  return null
};
cljs.core.flush = function() {
  return null
};
cljs.core.pr_seq = function pr_seq(b, c) {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, b)) ? cljs.core.list.call(null, "nil") : cljs.core.truth_(void 0 === b) ? cljs.core.list.call(null, "#<undefined>") : cljs.core.truth_("\ufdd0'else") ? cljs.core.concat.call(null, cljs.core.truth_(function() {
    var d = cljs.core.get.call(null, c, "\ufdd0'meta");
    return cljs.core.truth_(d) ? (d = function() {
      return cljs.core.truth_(function() {
        if(cljs.core.truth_(b)) {
          var c = b.cljs$core$IMeta$;
          return cljs.core.truth_(c) ? cljs.core.not.call(null, b.hasOwnProperty("cljs$core$IMeta$")) : c
        }
        return b
      }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.IMeta, b)
    }(), cljs.core.truth_(d) ? cljs.core.meta.call(null, b) : d) : d
  }()) ? cljs.core.concat.call(null, cljs.core.Vector.fromArray(["^"]), pr_seq.call(null, cljs.core.meta.call(null, b), c), cljs.core.Vector.fromArray([" "])) : null, cljs.core.truth_(function() {
    return cljs.core.truth_(function() {
      if(cljs.core.truth_(b)) {
        var c = b.cljs$core$IPrintable$;
        return cljs.core.truth_(c) ? cljs.core.not.call(null, b.hasOwnProperty("cljs$core$IPrintable$")) : c
      }
      return b
    }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.IPrintable, b)
  }()) ? cljs.core._pr_seq.call(null, b, c) : cljs.core.list.call(null, "#<", cljs.core.str.call(null, b), ">")) : null
};
cljs.core.pr_str_with_opts = function(a, b) {
  var c = cljs.core.first.call(null, a), d = new goog.string.StringBuffer, e = cljs.core.seq.call(null, a);
  if(cljs.core.truth_(e)) {
    for(var f = cljs.core.first.call(null, e);;) {
      cljs.core.truth_(f === c) || d.append(" ");
      var g = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, f, b));
      if(cljs.core.truth_(g)) {
        for(f = cljs.core.first.call(null, g);;) {
          if(d.append(f), f = cljs.core.next.call(null, g), cljs.core.truth_(f)) {
            g = f, f = cljs.core.first.call(null, g)
          }else {
            break
          }
        }
      }
      e = cljs.core.next.call(null, e);
      if(cljs.core.truth_(e)) {
        f = e, e = cljs.core.first.call(null, f), g = f, f = e, e = g
      }else {
        break
      }
    }
  }
  return cljs.core.str.call(null, d)
};
cljs.core.pr_with_opts = function(a, b) {
  var c = cljs.core.first.call(null, a), d = cljs.core.seq.call(null, a);
  if(cljs.core.truth_(d)) {
    for(var e = cljs.core.first.call(null, d);;) {
      cljs.core.truth_(e === c) || cljs.core.string_print.call(null, " ");
      var f = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, e, b));
      if(cljs.core.truth_(f)) {
        for(e = cljs.core.first.call(null, f);;) {
          if(cljs.core.string_print.call(null, e), e = cljs.core.next.call(null, f), cljs.core.truth_(e)) {
            f = e, e = cljs.core.first.call(null, f)
          }else {
            break
          }
        }
      }
      d = cljs.core.next.call(null, d);
      if(cljs.core.truth_(d)) {
        e = d, d = cljs.core.first.call(null, e), f = e, e = d, d = f
      }else {
        return null
      }
    }
  }else {
    return null
  }
};
cljs.core.newline = function(a) {
  cljs.core.string_print.call(null, "\n");
  return cljs.core.truth_(cljs.core.get.call(null, a, "\ufdd0'flush-on-newline")) ? cljs.core.flush.call(null) : null
};
cljs.core._STAR_flush_on_newline_STAR_ = !0;
cljs.core._STAR_print_readably_STAR_ = !0;
cljs.core._STAR_print_meta_STAR_ = !1;
cljs.core._STAR_print_dup_STAR_ = !1;
cljs.core.pr_opts = function() {
  return cljs.core.ObjMap.fromObject(["\ufdd0'flush-on-newline", "\ufdd0'readably", "\ufdd0'meta", "\ufdd0'dup"], {"\ufdd0'flush-on-newline":cljs.core._STAR_flush_on_newline_STAR_, "\ufdd0'readably":cljs.core._STAR_print_readably_STAR_, "\ufdd0'meta":cljs.core._STAR_print_meta_STAR_, "\ufdd0'dup":cljs.core._STAR_print_dup_STAR_})
};
cljs.core.pr_str = function() {
  var a = function(a) {
    return cljs.core.pr_str_with_opts.call(null, a, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.pr = function() {
  var a = function(a) {
    return cljs.core.pr_with_opts.call(null, a, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.print = function() {
  var a = function(a) {
    return cljs.core.pr_with_opts.call(null, a, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", !1))
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.println = function() {
  var a = function(a) {
    cljs.core.pr_with_opts.call(null, a, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", !1));
    return cljs.core.newline.call(null, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.prn = function() {
  var a = function(a) {
    cljs.core.pr_with_opts.call(null, a, cljs.core.pr_opts.call(null));
    return cljs.core.newline.call(null, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.HashMap.prototype.cljs$core$IPrintable$ = !0;
cljs.core.HashMap.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, function(a) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", b, a)
  }, "{", ", ", "}", b, a)
};
cljs.core.IPrintable.number = !0;
cljs.core._pr_seq.number = function(a) {
  return cljs.core.list.call(null, cljs.core.str.call(null, a))
};
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.Subvec.prototype.cljs$core$IPrintable$ = !0;
cljs.core.Subvec.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", b, a)
};
cljs.core.LazySeq.prototype.cljs$core$IPrintable$ = !0;
cljs.core.LazySeq.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.IPrintable["boolean"] = !0;
cljs.core._pr_seq["boolean"] = function(a) {
  return cljs.core.list.call(null, cljs.core.str.call(null, a))
};
cljs.core.Set.prototype.cljs$core$IPrintable$ = !0;
cljs.core.Set.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#{", " ", "}", b, a)
};
cljs.core.IPrintable.string = !0;
cljs.core._pr_seq.string = function(a, b) {
  return cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, a)) ? cljs.core.list.call(null, cljs.core.str.call(null, ":", function() {
    var b = cljs.core.namespace.call(null, a);
    return cljs.core.truth_(b) ? cljs.core.str.call(null, b, "/") : null
  }(), cljs.core.name.call(null, a))) : cljs.core.truth_(cljs.core.symbol_QMARK_.call(null, a)) ? cljs.core.list.call(null, cljs.core.str.call(null, function() {
    var b = cljs.core.namespace.call(null, a);
    return cljs.core.truth_(b) ? cljs.core.str.call(null, b, "/") : null
  }(), cljs.core.name.call(null, a))) : cljs.core.truth_("\ufdd0'else") ? cljs.core.list.call(null, cljs.core.truth_("\ufdd0'readably".call(null, b)) ? goog.string.quote.call(null, a) : a) : null
};
cljs.core.Vector.prototype.cljs$core$IPrintable$ = !0;
cljs.core.Vector.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", b, a)
};
cljs.core.List.prototype.cljs$core$IPrintable$ = !0;
cljs.core.List.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.IPrintable.array = !0;
cljs.core._pr_seq.array = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#<Array [", ", ", "]>", b, a)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IPrintable$ = !0;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.EmptyList.prototype.cljs$core$IPrintable$ = !0;
cljs.core.EmptyList.prototype.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "()")
};
cljs.core.Cons.prototype.cljs$core$IPrintable$ = !0;
cljs.core.Cons.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.Range.prototype.cljs$core$IPrintable$ = !0;
cljs.core.Range.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.ObjMap.prototype.cljs$core$IPrintable$ = !0;
cljs.core.ObjMap.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, function(a) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", b, a)
  }, "{", ", ", "}", b, a)
};
cljs.core.Atom = function(a, b, c, d) {
  this.state = a;
  this.meta = b;
  this.validator = c;
  this.watches = d
};
cljs.core.Atom.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "cljs.core.Atom")
};
cljs.core.Atom.prototype.cljs$core$IHash$ = !0;
cljs.core.Atom.prototype.cljs$core$IHash$_hash = function(a) {
  return goog.getUid.call(null, a)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$ = !0;
cljs.core.Atom.prototype.cljs$core$IWatchable$_notify_watches = function(a, b, c) {
  var d = cljs.core.seq.call(null, this.watches);
  if(cljs.core.truth_(d)) {
    var e = cljs.core.first.call(null, d);
    cljs.core.nth.call(null, e, 0, null);
    for(cljs.core.nth.call(null, e, 1, null);;) {
      var f = e, e = cljs.core.nth.call(null, f, 0, null), f = cljs.core.nth.call(null, f, 1, null);
      f.call(null, e, a, b, c);
      d = cljs.core.next.call(null, d);
      if(cljs.core.truth_(d)) {
        e = d, d = cljs.core.first.call(null, e), f = e, e = d, d = f
      }else {
        return null
      }
    }
  }else {
    return null
  }
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_add_watch = function(a, b, c) {
  return a.watches = cljs.core.assoc.call(null, this.watches, b, c)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_remove_watch = function(a, b) {
  return a.watches = cljs.core.dissoc.call(null, this.watches, b)
};
cljs.core.Atom.prototype.cljs$core$IPrintable$ = !0;
cljs.core.Atom.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.concat.call(null, cljs.core.Vector.fromArray(["#<Atom: "]), cljs.core._pr_seq.call(null, this.state, b), ">")
};
cljs.core.Atom.prototype.cljs$core$IMeta$ = !0;
cljs.core.Atom.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.Atom.prototype.cljs$core$IDeref$ = !0;
cljs.core.Atom.prototype.cljs$core$IDeref$_deref = function() {
  return this.state
};
cljs.core.Atom.prototype.cljs$core$IEquiv$ = !0;
cljs.core.Atom.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return a === b
};
cljs.core.atom = function() {
  var a = null, b = function() {
    var a = function(a, b) {
      var c = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, b)) ? cljs.core.apply.call(null, cljs.core.hash_map, b) : b, d = cljs.core.get.call(null, c, "\ufdd0'validator"), c = cljs.core.get.call(null, c, "\ufdd0'meta");
      return new cljs.core.Atom(a, c, d, null)
    }, b = function(b, d) {
      var g = null;
      goog.isDef(d) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
      return a.call(this, b, g)
    };
    b.cljs$lang$maxFixedArity = 1;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), b = cljs.core.rest(b);
      return a.call(this, d, b)
    };
    return b
  }(), a = function(a, d) {
    switch(arguments.length) {
      case 1:
        return new cljs.core.Atom(a, null, null, null);
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.reset_BANG_ = function(a, b) {
  var c = a.validator;
  if(cljs.core.truth_(c) && !cljs.core.truth_(c.call(null, b))) {
    throw Error(cljs.core.str.call(null, "Assert failed: ", "Validator rejected reference state", "\n", cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'validate", "\ufdd1'new-value"), cljs.core.hash_map("\ufdd0'line", 3061)))));
  }
  c = a.state;
  a.state = b;
  cljs.core._notify_watches.call(null, a, c, b);
  return b
};
cljs.core.swap_BANG_ = function() {
  var a = null, b = function() {
    var a = function(a, b, c, g, h, i) {
      var j = null;
      goog.isDef(i) && (j = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0));
      return cljs.core.reset_BANG_.call(null, a, cljs.core.apply.call(null, b, a.state, c, g, h, j))
    };
    a.cljs$lang$maxFixedArity = 5;
    a.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), g = cljs.core.first(cljs.core.next(cljs.core.next(a))), h = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(a)))), i = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(a))))), a = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(a)))));
      return cljs.core.reset_BANG_.call(null, b, cljs.core.apply.call(null, c, b.state, g, h, i, a))
    };
    return a
  }(), a = function(a, d, e, f, g, h) {
    switch(arguments.length) {
      case 2:
        return cljs.core.reset_BANG_.call(null, a, d.call(null, a.state));
      case 3:
        return cljs.core.reset_BANG_.call(null, a, d.call(null, a.state, e));
      case 4:
        return cljs.core.reset_BANG_.call(null, a, d.call(null, a.state, e, f));
      case 5:
        return cljs.core.reset_BANG_.call(null, a, d.call(null, a.state, e, f, g));
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 5;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.compare_and_set_BANG_ = function(a, b, c) {
  return cljs.core.truth_(cljs.core._EQ_.call(null, a.state, b)) ? (cljs.core.reset_BANG_.call(null, a, c), !0) : !1
};
cljs.core.deref = function(a) {
  return cljs.core._deref.call(null, a)
};
cljs.core.set_validator_BANG_ = function(a, b) {
  return a.validator = b
};
cljs.core.get_validator = function(a) {
  return a.validator
};
cljs.core.alter_meta_BANG_ = function() {
  var a = function(a, c, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.meta = cljs.core.apply.call(null, c, a.meta, e)
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return c.meta = cljs.core.apply.call(null, d, c.meta, a)
  };
  return a
}();
cljs.core.reset_meta_BANG_ = function(a, b) {
  return a.meta = b
};
cljs.core.add_watch = function(a, b, c) {
  return cljs.core._add_watch.call(null, a, b, c)
};
cljs.core.remove_watch = function(a, b) {
  return cljs.core._remove_watch.call(null, a, b)
};
cljs.core.gensym_counter = null;
cljs.core.gensym = function() {
  var a = null;
  return a = function(b) {
    switch(arguments.length) {
      case 0:
        return a.call(null, "G__");
      case 1:
        if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, cljs.core.gensym_counter))) {
          cljs.core.gensym_counter = cljs.core.atom.call(null, 0)
        }
        return cljs.core.symbol.call(null, cljs.core.str.call(null, b, cljs.core.swap_BANG_.call(null, cljs.core.gensym_counter, cljs.core.inc)))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.fixture1 = 1;
cljs.core.fixture2 = 2;
cljs.core.Delay = function(a, b) {
  this.f = a;
  this.state = b
};
cljs.core.Delay.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "cljs.core.Delay")
};
cljs.core.Delay.prototype.cljs$core$IPending$ = !0;
cljs.core.Delay.prototype.cljs$core$IPending$_realized_QMARK_ = function() {
  return cljs.core.not.call(null, cljs.core.nil_QMARK_.call(null, cljs.core.deref.call(null, this.state)))
};
cljs.core.Delay.prototype.cljs$core$IDeref$ = !0;
cljs.core.Delay.prototype.cljs$core$IDeref$_deref = function() {
  cljs.core.truth_(cljs.core.deref.call(null, this.state)) || cljs.core.swap_BANG_.call(null, this.state, this.f);
  return cljs.core.deref.call(null, this.state)
};
cljs.core.delay = function() {
  var a = function(a) {
    return new cljs.core.Delay(function() {
      return cljs.core.apply.call(null, cljs.core.identity, a)
    }, cljs.core.atom.call(null, null))
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.delay_QMARK_ = function(a) {
  return cljs.core.instance_QMARK_.call(null, cljs.core.Delay, a)
};
cljs.core.force = function(a) {
  return cljs.core.truth_(cljs.core.delay_QMARK_.call(null, a)) ? cljs.core.deref.call(null, a) : a
};
cljs.core.realized_QMARK_ = function(a) {
  return cljs.core._realized_QMARK_.call(null, a)
};
cljs.core.js__GT_clj = function() {
  var a = function(a, b) {
    var e = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, b)) ? cljs.core.apply.call(null, cljs.core.hash_map, b) : b, e = cljs.core.get.call(null, e, "\ufdd0'keywordize-keys"), f = cljs.core.truth_(e) ? cljs.core.keyword : cljs.core.str;
    return function h(a) {
      return cljs.core.truth_(cljs.core.seq_QMARK_.call(null, a)) ? cljs.core.doall.call(null, cljs.core.map.call(null, h, a)) : cljs.core.truth_(cljs.core.coll_QMARK_.call(null, a)) ? cljs.core.into.call(null, cljs.core.empty.call(null, a), cljs.core.map.call(null, h, a)) : cljs.core.truth_(goog.isArray.call(null, a)) ? cljs.core.vec.call(null, cljs.core.map.call(null, h, a)) : cljs.core.truth_(goog.isObject.call(null, a)) ? cljs.core.into.call(null, cljs.core.ObjMap.fromObject([], {}), function() {
        return function k(b) {
          return new cljs.core.LazySeq(null, !1, function() {
            for(;;) {
              if(cljs.core.truth_(cljs.core.seq.call(null, b))) {
                var c = cljs.core.first.call(null, b);
                return cljs.core.cons.call(null, cljs.core.Vector.fromArray([f.call(null, c), h.call(null, a[c])]), k.call(null, cljs.core.rest.call(null, b)))
              }
              return null
            }
          })
        }.call(null, cljs.core.js_keys.call(null, a))
      }()) : cljs.core.truth_("\ufdd0'else") ? a : null
    }.call(null, a)
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a.call(this, d, b)
  };
  return b
}();
cljs.core.memoize = function(a) {
  var b = cljs.core.atom.call(null, cljs.core.ObjMap.fromObject([], {}));
  return function() {
    var c = function(c) {
      var d = cljs.core.get.call(null, cljs.core.deref.call(null, b), c);
      if(cljs.core.truth_(d)) {
        return d
      }
      d = cljs.core.apply.call(null, a, c);
      cljs.core.swap_BANG_.call(null, b, cljs.core.assoc, c, d);
      return d
    }, d = function(a) {
      var b = null;
      goog.isDef(a) && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
      return c.call(this, b)
    };
    d.cljs$lang$maxFixedArity = 0;
    d.cljs$lang$applyTo = function(a) {
      a = cljs.core.seq(a);
      return c.call(this, a)
    };
    return d
  }()
};
cljs.core.trampoline = function() {
  var a = null, b = function() {
    var b = function(b, c) {
      return a.call(null, function() {
        return cljs.core.apply.call(null, b, c)
      })
    }, d = function(a, d) {
      var g = null;
      goog.isDef(d) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
      return b.call(this, a, g)
    };
    d.cljs$lang$maxFixedArity = 1;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), a = cljs.core.rest(a);
      return b.call(this, d, a)
    };
    return d
  }(), a = function(a, d) {
    switch(arguments.length) {
      case 1:
        var e;
        a: {
          for(var f = a;;) {
            if(f = f.call(null), !cljs.core.truth_(cljs.core.fn_QMARK_.call(null, f))) {
              e = f;
              break a
            }
          }
        }
        return e;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.rand = function() {
  var a = null;
  return a = function(b) {
    switch(arguments.length) {
      case 0:
        return a.call(null, 1);
      case 1:
        return Math.random() * b
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.rand_int = function(a) {
  return Math.floor(Math.random() * a)
};
cljs.core.rand_nth = function(a) {
  return cljs.core.nth.call(null, a, cljs.core.rand_int.call(null, cljs.core.count.call(null, a)))
};
cljs.core.group_by = function(a, b) {
  return cljs.core.reduce.call(null, function(b, d) {
    var e = a.call(null, d);
    return cljs.core.assoc.call(null, b, e, cljs.core.conj.call(null, cljs.core.get.call(null, b, e, cljs.core.Vector.fromArray([])), d))
  }, cljs.core.ObjMap.fromObject([], {}), b)
};
cljs.core.make_hierarchy = function() {
  return cljs.core.ObjMap.fromObject(["\ufdd0'parents", "\ufdd0'descendants", "\ufdd0'ancestors"], {"\ufdd0'parents":cljs.core.ObjMap.fromObject([], {}), "\ufdd0'descendants":cljs.core.ObjMap.fromObject([], {}), "\ufdd0'ancestors":cljs.core.ObjMap.fromObject([], {})})
};
cljs.core.global_hierarchy = cljs.core.atom.call(null, cljs.core.make_hierarchy.call(null));
cljs.core.isa_QMARK_ = function() {
  var a = null, b = function(b, d, e) {
    var f = cljs.core._EQ_.call(null, d, e);
    if(cljs.core.truth_(f)) {
      return f
    }
    f = cljs.core.contains_QMARK_.call(null, "\ufdd0'ancestors".call(null, b).call(null, d), e);
    if(cljs.core.truth_(f)) {
      return f
    }
    f = cljs.core.vector_QMARK_.call(null, e);
    if(cljs.core.truth_(f)) {
      if(f = cljs.core.vector_QMARK_.call(null, d), cljs.core.truth_(f)) {
        if(f = cljs.core._EQ_.call(null, cljs.core.count.call(null, e), cljs.core.count.call(null, d)), cljs.core.truth_(f)) {
          for(var g = !0, h = 0;;) {
            if(cljs.core.truth_(function() {
              var a = cljs.core.not.call(null, g);
              return cljs.core.truth_(a) ? a : cljs.core._EQ_.call(null, h, cljs.core.count.call(null, e))
            }())) {
              return g
            }
            var f = a.call(null, b, d.call(null, h), e.call(null, h)), i = h + 1, g = f, h = i
          }
        }else {
          return f
        }
      }else {
        return f
      }
    }else {
      return f
    }
  };
  return a = function(c, d, e) {
    switch(arguments.length) {
      case 2:
        return a.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), c, d);
      case 3:
        return b.call(this, c, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.parents = function() {
  var a = null;
  return a = function(b, c) {
    switch(arguments.length) {
      case 1:
        return a.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), b);
      case 2:
        return cljs.core.not_empty.call(null, cljs.core.get.call(null, "\ufdd0'parents".call(null, b), c))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ancestors = function() {
  var a = null;
  return a = function(b, c) {
    switch(arguments.length) {
      case 1:
        return a.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), b);
      case 2:
        return cljs.core.not_empty.call(null, cljs.core.get.call(null, "\ufdd0'ancestors".call(null, b), c))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.descendants = function() {
  var a = null;
  return a = function(b, c) {
    switch(arguments.length) {
      case 1:
        return a.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), b);
      case 2:
        return cljs.core.not_empty.call(null, cljs.core.get.call(null, "\ufdd0'descendants".call(null, b), c))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.derive = function() {
  var a = null, b = function(a, b, e) {
    if(!cljs.core.truth_(cljs.core.not_EQ_.call(null, b, e))) {
      throw Error(cljs.core.str.call(null, "Assert failed: ", cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'not=", "\ufdd1'tag", "\ufdd1'parent"), cljs.core.hash_map("\ufdd0'line", 3357)))));
    }
    var f = "\ufdd0'parents".call(null, a), g = "\ufdd0'descendants".call(null, a), h = "\ufdd0'ancestors".call(null, a), i = function(a, b, c, d, e) {
      return cljs.core.reduce.call(null, function(a, b) {
        return cljs.core.assoc.call(null, a, b, cljs.core.reduce.call(null, cljs.core.conj, cljs.core.get.call(null, e, b, cljs.core.set([])), cljs.core.cons.call(null, d, e.call(null, d))))
      }, a, cljs.core.cons.call(null, b, c.call(null, b)))
    };
    if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, f.call(null, b), e))) {
      b = null
    }else {
      if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, h.call(null, b), e))) {
        throw Error(cljs.core.str.call(null, b, "already has", e, "as ancestor"));
      }
      if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, h.call(null, e), b))) {
        throw Error(cljs.core.str.call(null, "Cyclic derivation:", e, "has", b, "as ancestor"));
      }
      b = cljs.core.ObjMap.fromObject(["\ufdd0'parents", "\ufdd0'ancestors", "\ufdd0'descendants"], {"\ufdd0'parents":cljs.core.assoc.call(null, "\ufdd0'parents".call(null, a), b, cljs.core.conj.call(null, cljs.core.get.call(null, f, b, cljs.core.set([])), e)), "\ufdd0'ancestors":i.call(null, "\ufdd0'ancestors".call(null, a), b, g, e, h), "\ufdd0'descendants":i.call(null, "\ufdd0'descendants".call(null, a), e, h, b, g)})
    }
    return cljs.core.truth_(b) ? b : a
  };
  return a = function(c, d, e) {
    switch(arguments.length) {
      case 2:
        if(!cljs.core.truth_(cljs.core.namespace.call(null, d))) {
          throw Error(cljs.core.str.call(null, "Assert failed: ", cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'namespace", "\ufdd1'parent"), cljs.core.hash_map("\ufdd0'line", 3353)))));
        }
        cljs.core.swap_BANG_.call(null, cljs.core.global_hierarchy, a, c, d);
        return null;
      case 3:
        return b.call(this, c, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.underive = function() {
  var a = null, b = function(a, b, e) {
    var f = "\ufdd0'parents".call(null, a), g = cljs.core.truth_(f.call(null, b)) ? cljs.core.disj.call(null, f.call(null, b), e) : cljs.core.set([]), g = cljs.core.truth_(cljs.core.not_empty.call(null, g)) ? cljs.core.assoc.call(null, f, b, g) : cljs.core.dissoc.call(null, f, b), g = cljs.core.flatten.call(null, cljs.core.map.call(null, function(a) {
      return cljs.core.cons.call(null, cljs.core.first.call(null, a), cljs.core.interpose.call(null, cljs.core.first.call(null, a), cljs.core.second.call(null, a)))
    }, cljs.core.seq.call(null, g)));
    return cljs.core.truth_(cljs.core.contains_QMARK_.call(null, f.call(null, b), e)) ? cljs.core.reduce.call(null, function(a, b) {
      return cljs.core.apply.call(null, cljs.core.derive, a, b)
    }, cljs.core.make_hierarchy.call(null), cljs.core.partition.call(null, 2, g)) : a
  };
  return a = function(c, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core.swap_BANG_.call(null, cljs.core.global_hierarchy, a, c, d), null;
      case 3:
        return b.call(this, c, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.reset_cache = function(a, b, c, d) {
  cljs.core.swap_BANG_.call(null, a, function() {
    return cljs.core.deref.call(null, b)
  });
  return cljs.core.swap_BANG_.call(null, c, function() {
    return cljs.core.deref.call(null, d)
  })
};
cljs.core.prefers_STAR_ = function prefers_STAR_(b, c, d) {
  var e = cljs.core.deref.call(null, d).call(null, b), e = cljs.core.truth_(cljs.core.truth_(e) ? e.call(null, c) : e) ? !0 : null;
  if(cljs.core.truth_(e)) {
    return e
  }
  e = function() {
    for(var e = cljs.core.parents.call(null, c);;) {
      if(cljs.core.truth_(0 < cljs.core.count.call(null, e))) {
        cljs.core.truth_(prefers_STAR_.call(null, b, cljs.core.first.call(null, e), d)), e = cljs.core.rest.call(null, e)
      }else {
        return null
      }
    }
  }();
  if(cljs.core.truth_(e)) {
    return e
  }
  e = function() {
    for(var e = cljs.core.parents.call(null, b);;) {
      if(cljs.core.truth_(0 < cljs.core.count.call(null, e))) {
        cljs.core.truth_(prefers_STAR_.call(null, cljs.core.first.call(null, e), c, d)), e = cljs.core.rest.call(null, e)
      }else {
        return null
      }
    }
  }();
  return cljs.core.truth_(e) ? e : !1
};
cljs.core.dominates = function(a, b, c) {
  c = cljs.core.prefers_STAR_.call(null, a, b, c);
  return cljs.core.truth_(c) ? c : cljs.core.isa_QMARK_.call(null, a, b)
};
cljs.core.find_and_cache_best_method = function find_and_cache_best_method(b, c, d, e, f, g, h) {
  var i = cljs.core.reduce.call(null, function(d, e) {
    var g = cljs.core.nth.call(null, e, 0, null);
    cljs.core.nth.call(null, e, 1, null);
    if(cljs.core.truth_(cljs.core.isa_QMARK_.call(null, c, g))) {
      var h = cljs.core.truth_(function() {
        var b = cljs.core.nil_QMARK_.call(null, d);
        return cljs.core.truth_(b) ? b : cljs.core.dominates.call(null, g, cljs.core.first.call(null, d), f)
      }()) ? e : d;
      if(!cljs.core.truth_(cljs.core.dominates.call(null, cljs.core.first.call(null, h), g, f))) {
        throw Error(cljs.core.str.call(null, "Multiple methods in multimethod '", b, "' match dispatch value: ", c, " -> ", g, " and ", cljs.core.first.call(null, h), ", and neither is preferred"));
      }
      return h
    }
    return d
  }, null, cljs.core.deref.call(null, e));
  if(cljs.core.truth_(i)) {
    if(cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.deref.call(null, h), cljs.core.deref.call(null, d)))) {
      return cljs.core.swap_BANG_.call(null, g, cljs.core.assoc, c, cljs.core.second.call(null, i)), cljs.core.second.call(null, i)
    }
    cljs.core.reset_cache.call(null, g, e, h, d);
    return find_and_cache_best_method.call(null, b, c, d, e, f, g, h)
  }
  return null
};
cljs.core.IMultiFn = {};
cljs.core._reset = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_reset : a)) {
    a = a.cljs$core$IMultiFn$_reset(a)
  }else {
    var b;
    b = cljs.core._reset[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._reset._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-reset", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core._add_method = function(a, b, c) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_add_method : a)) {
    a = a.cljs$core$IMultiFn$_add_method(a, b, c)
  }else {
    var d;
    d = cljs.core._add_method[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._add_method._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-add-method", a);
    }
    a = d.call(null, a, b, c)
  }
  return a
};
cljs.core._remove_method = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_remove_method : a)) {
    c = a.cljs$core$IMultiFn$_remove_method(a, b)
  }else {
    c = cljs.core._remove_method[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._remove_method._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-remove-method", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core._prefer_method = function(a, b, c) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_prefer_method : a)) {
    a = a.cljs$core$IMultiFn$_prefer_method(a, b, c)
  }else {
    var d;
    d = cljs.core._prefer_method[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._prefer_method._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefer-method", a);
    }
    a = d.call(null, a, b, c)
  }
  return a
};
cljs.core._get_method = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_get_method : a)) {
    c = a.cljs$core$IMultiFn$_get_method(a, b)
  }else {
    c = cljs.core._get_method[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._get_method._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-get-method", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core._methods = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_methods : a)) {
    a = a.cljs$core$IMultiFn$_methods(a)
  }else {
    var b;
    b = cljs.core._methods[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._methods._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-methods", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core._prefers = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_prefers : a)) {
    a = a.cljs$core$IMultiFn$_prefers(a)
  }else {
    var b;
    b = cljs.core._prefers[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._prefers._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefers", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core._dispatch = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_dispatch : a)) {
    c = a.cljs$core$IMultiFn$_dispatch(a, b)
  }else {
    c = cljs.core._dispatch[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.core._dispatch._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-dispatch", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.core.do_dispatch = function(a, b, c) {
  b = cljs.core.apply.call(null, b, c);
  a = cljs.core._get_method.call(null, a, b);
  if(!cljs.core.truth_(a)) {
    throw Error(cljs.core.str.call(null, "No method in multimethod '", cljs.core.name, "' for dispatch value: ", b));
  }
  return cljs.core.apply.call(null, a, c)
};
cljs.core.MultiFn = function(a, b, c, d, e, f, g, h) {
  this.name = a;
  this.dispatch_fn = b;
  this.default_dispatch_val = c;
  this.hierarchy = d;
  this.method_table = e;
  this.prefer_table = f;
  this.method_cache = g;
  this.cached_hierarchy = h
};
cljs.core.MultiFn.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "cljs.core.MultiFn")
};
cljs.core.MultiFn.prototype.cljs$core$IHash$ = !0;
cljs.core.MultiFn.prototype.cljs$core$IHash$_hash = function(a) {
  return goog.getUid.call(null, a)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$ = !0;
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_reset = function(a) {
  cljs.core.swap_BANG_.call(null, this.method_table, function() {
    return cljs.core.ObjMap.fromObject([], {})
  });
  cljs.core.swap_BANG_.call(null, this.method_cache, function() {
    return cljs.core.ObjMap.fromObject([], {})
  });
  cljs.core.swap_BANG_.call(null, this.prefer_table, function() {
    return cljs.core.ObjMap.fromObject([], {})
  });
  cljs.core.swap_BANG_.call(null, this.cached_hierarchy, function() {
    return null
  });
  return a
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_add_method = function(a, b, c) {
  cljs.core.swap_BANG_.call(null, this.method_table, cljs.core.assoc, b, c);
  cljs.core.reset_cache.call(null, this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy);
  return a
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_remove_method = function(a, b) {
  cljs.core.swap_BANG_.call(null, this.method_table, cljs.core.dissoc, b);
  cljs.core.reset_cache.call(null, this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy);
  return a
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_get_method = function(a, b) {
  cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.deref.call(null, this.cached_hierarchy), cljs.core.deref.call(null, this.hierarchy))) || cljs.core.reset_cache.call(null, this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy);
  var c = cljs.core.deref.call(null, this.method_cache).call(null, b);
  if(cljs.core.truth_(c)) {
    return c
  }
  c = cljs.core.find_and_cache_best_method.call(null, this.name, b, this.hierarchy, this.method_table, this.prefer_table, this.method_cache, this.cached_hierarchy);
  return cljs.core.truth_(c) ? c : cljs.core.deref.call(null, this.method_table).call(null, this.default_dispatch_val)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefer_method = function(a, b, c) {
  if(cljs.core.truth_(cljs.core.prefers_STAR_.call(null, b, c, this.prefer_table))) {
    throw Error(cljs.core.str.call(null, "Preference conflict in multimethod '", this.name, "': ", c, " is already preferred to ", b));
  }
  cljs.core.swap_BANG_.call(null, this.prefer_table, function(a) {
    return cljs.core.assoc.call(null, a, b, cljs.core.conj.call(null, cljs.core.get.call(null, a, b, cljs.core.set([])), c))
  });
  return cljs.core.reset_cache.call(null, this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_methods = function() {
  return cljs.core.deref.call(null, this.method_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefers = function() {
  return cljs.core.deref.call(null, this.prefer_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_dispatch = function(a, b) {
  return cljs.core.do_dispatch.call(null, a, this.dispatch_fn, b)
};
cljs.core.MultiFn.prototype.call = function() {
  var a = function(a, c) {
    var d = null;
    goog.isDef(c) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return cljs.core._dispatch.call(null, this, d)
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = function(a) {
    cljs.core.first(a);
    a = cljs.core.rest(a);
    return cljs.core._dispatch.call(null, this, a)
  };
  return a
}();
cljs.core.MultiFn.prototype.apply = function(a, b) {
  return cljs.core._dispatch.call(null, this, b)
};
cljs.core.remove_all_methods = function(a) {
  return cljs.core._reset.call(null, a)
};
cljs.core.remove_method = function(a, b) {
  return cljs.core._remove_method.call(null, a, b)
};
cljs.core.prefer_method = function(a, b, c) {
  return cljs.core._prefer_method.call(null, a, b, c)
};
cljs.core.methods$ = function(a) {
  return cljs.core._methods.call(null, a)
};
cljs.core.get_method = function(a, b) {
  return cljs.core._get_method.call(null, a, b)
};
cljs.core.prefers = function(a) {
  return cljs.core._prefers.call(null, a)
};
var domina = {domina:{}};
domina.domina.support = {};
var div__3115 = document.createElement("div"), test_html__3116 = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
div__3115.innerHTML = test_html__3116;
domina.domina.support.leading_whitespace_QMARK_ = cljs.core._EQ_.call(null, div__3115.firstChild.nodeType, 3);
domina.domina.support.extraneous_tbody_QMARK_ = cljs.core._EQ_.call(null, div__3115.getElementsByTagName("tbody").length, 0);
domina.domina.support.unscoped_html_elements_QMARK_ = cljs.core._EQ_.call(null, div__3115.getElementsByTagName("link").length, 0);
var clojure = {string:{}};
clojure.string.seq_reverse = function(a) {
  return cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, a)
};
clojure.string.reverse = function(a) {
  return a.split("").reverse().join("")
};
clojure.string.replace = function(a, b, c) {
  if(cljs.core.truth_(cljs.core.string_QMARK_.call(null, b))) {
    return a.replace(RegExp(goog.string.regExpEscape.call(null, b), "g"), c)
  }
  if(cljs.core.truth_(b.hasOwnProperty("source"))) {
    return a.replace(RegExp(b.source, "g"), c)
  }
  if(cljs.core.truth_("\ufdd0'else")) {
    throw cljs.core.str.call(null, "Invalid match arg: ", b);
  }
  return null
};
clojure.string.replace_first = function(a, b, c) {
  return a.replace(b, c)
};
clojure.string.join = function() {
  var a = null;
  return function(a, c) {
    switch(arguments.length) {
      case 1:
        return cljs.core.apply.call(null, cljs.core.str, a);
      case 2:
        return cljs.core.apply.call(null, cljs.core.str, cljs.core.interpose.call(null, a, c))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
clojure.string.upper_case = function(a) {
  return a.toUpperCase()
};
clojure.string.lower_case = function(a) {
  return a.toLowerCase()
};
clojure.string.capitalize = function(a) {
  return cljs.core.truth_(2 > cljs.core.count.call(null, a)) ? clojure.string.upper_case.call(null, a) : cljs.core.str.call(null, clojure.string.upper_case.call(null, cljs.core.subs.call(null, a, 0, 1)), clojure.string.lower_case.call(null, cljs.core.subs.call(null, a, 1)))
};
clojure.string.split = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.vec.call(null, cljs.core.str.call(null, a).split(c));
      case 3:
        var e;
        a: {
          if(cljs.core.truth_(1 > d)) {
            e = cljs.core.vec.call(null, cljs.core.str.call(null, a).split(c))
          }else {
            for(var f = a, g = d, h = cljs.core.Vector.fromArray([]);;) {
              if(cljs.core.truth_(cljs.core._EQ_.call(null, g, 1))) {
                e = cljs.core.conj.call(null, h, f);
                break a
              }
              var i = cljs.core.re_find.call(null, c, f);
              if(cljs.core.truth_(i)) {
                var j = i, i = f.indexOf(j), j = f.substring(i + cljs.core.count.call(null, j)), g = g - 1, h = cljs.core.conj.call(null, h, f.substring(0, i)), f = j
              }else {
                e = cljs.core.conj.call(null, h, f);
                break a
              }
            }
          }
        }
        return e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
clojure.string.split_lines = function(a) {
  return clojure.string.split.call(null, a, /\n|\r\n/)
};
clojure.string.trim = function(a) {
  return goog.string.trim.call(null, a)
};
clojure.string.triml = function(a) {
  return goog.string.trimLeft.call(null, a)
};
clojure.string.trimr = function(a) {
  return goog.string.trimRight.call(null, a)
};
clojure.string.trim_newline = function(a) {
  for(var b = a.length;;) {
    if(cljs.core.truth_(0 === b)) {
      return""
    }
    var c = cljs.core.get.call(null, a, b - 1);
    if(cljs.core.truth_(function() {
      var a = cljs.core._EQ_.call(null, c, "\n");
      return cljs.core.truth_(a) ? a : cljs.core._EQ_.call(null, c, "\r")
    }())) {
      b -= 1
    }else {
      return a.substring(0, b)
    }
  }
};
clojure.string.blank_QMARK_ = function(a) {
  var b = cljs.core.str.call(null, a);
  return cljs.core.truth_(function() {
    var a = cljs.core.not.call(null, b);
    if(cljs.core.truth_(a)) {
      return a
    }
    a = cljs.core._EQ_.call(null, "", b);
    return cljs.core.truth_(a) ? a : cljs.core.re_matches.call(null, /\s+/, b)
  }()) ? !0 : !1
};
clojure.string.escape = function(a, b) {
  for(var c = new goog.string.StringBuffer, d = a.length, e = 0;;) {
    if(cljs.core.truth_(cljs.core._EQ_.call(null, d, e))) {
      return c.toString()
    }
    var f = a.charAt(e), g = cljs.core.get.call(null, b, f);
    cljs.core.truth_(g) ? c.append(cljs.core.str.call(null, g)) : c.append(f);
    e += 1
  }
};
domina.domina.re_html = /<|&#?\w+;/;
domina.domina.re_leading_whitespace = /^\s+/;
domina.domina.re_xhtml_tag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/i;
domina.domina.re_tag_name = /<([\w:]+)/;
domina.domina.re_no_inner_html = /<(?:script|style)/i;
domina.domina.re_tbody = /<tbody/i;
var opt_wrapper__3152 = cljs.core.Vector.fromArray([1, "<select multiple='multiple'>", "</select>"]), table_section_wrapper__3153 = cljs.core.Vector.fromArray([1, "<table>", "</table>"]), cell_wrapper__3154 = cljs.core.Vector.fromArray([3, "<table><tbody><tr>", "</tr></tbody></table>"]);
domina.domina.wrap_map = cljs.core.ObjMap.fromObject("col,\ufdd0'default,tfoot,caption,optgroup,legend,area,td,thead,th,option,tbody,tr,colgroup".split(","), {col:cljs.core.Vector.fromArray([2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"]), "\ufdd0'default":cljs.core.Vector.fromArray([0, "", ""]), tfoot:table_section_wrapper__3153, caption:table_section_wrapper__3153, optgroup:opt_wrapper__3152, legend:cljs.core.Vector.fromArray([1, "<fieldset>", "</fieldset>"]), area:cljs.core.Vector.fromArray([1, 
"<map>", "</map>"]), td:cell_wrapper__3154, thead:table_section_wrapper__3153, th:cell_wrapper__3154, option:opt_wrapper__3152, tbody:table_section_wrapper__3153, tr:cljs.core.Vector.fromArray([2, "<table><tbody>", "</tbody></table>"]), colgroup:table_section_wrapper__3153});
domina.domina.remove_extraneous_tbody_BANG_ = function(a, b) {
  var c = cljs.core.not.call(null, cljs.core.re_find.call(null, domina.domina.re_tbody, b)), d = cljs.core.truth_(function() {
    var a = cljs.core._EQ_.call(null, domina.domina.tag_name, "table");
    return cljs.core.truth_(a) ? c : a
  }()) ? function() {
    var b = a.firstChild;
    return cljs.core.truth_(b) ? a.firstChild.childNodes : b
  }() : cljs.core.truth_(function() {
    var a = cljs.core._EQ_.call(null, domina.domina.start_wrap, "<table>");
    return cljs.core.truth_(a) ? c : a
  }()) ? a.childNodes : cljs.core.Vector.fromArray([]), d = cljs.core.seq.call(null, d);
  if(cljs.core.truth_(d)) {
    for(var e = cljs.core.first.call(null, d);;) {
      if(cljs.core.truth_(function() {
        var a = cljs.core._EQ_.call(null, e.nodeName, "tbody");
        return cljs.core.truth_(a) ? cljs.core._EQ_.call(null, e.childNodes.length, 0) : a
      }()) && e.parentNode.removeChild(e), d = cljs.core.next.call(null, d), cljs.core.truth_(d)) {
        var f = d, e = d = cljs.core.first.call(null, f), d = f
      }else {
        return null
      }
    }
  }else {
    return null
  }
};
domina.domina.restore_leading_whitespace_BANG_ = function(a, b) {
  return a.insertBefore(document.createTextNode(cljs.core.first.call(null, cljs.core.re_find.call(null, domina.domina.re_leading_whitespace, b))), a.firstChild)
};
domina.domina.html_to_dom = function(a) {
  var b = clojure.string.replace.call(null, a, domina.domina.re_xhtml_tag, "<$1></$2>"), a = cljs.core.str.call(null, cljs.core.second.call(null, cljs.core.re_find.call(null, domina.domina.re_tag_name, b))).toLowerCase(), a = cljs.core.get.call(null, domina.domina.wrap_map, a, "\ufdd0'default".call(null, domina.domina.wrap_map)), c = cljs.core.nth.call(null, a, 0, null), d = cljs.core.nth.call(null, a, 1, null), e = cljs.core.nth.call(null, a, 2, null), a = function() {
    var a;
    a = document.createElement("div");
    a.innerHTML = cljs.core.str.call(null, d, b, e);
    for(var g = c;;) {
      if(cljs.core.truth_(0 < g)) {
        g -= 1, a = a.lastChild
      }else {
        return a
      }
    }
  }();
  cljs.core.truth_(domina.domina.support.extraneous_tbody_QMARK_) && domina.domina.remove_extraneous_tbody_BANG_.call(null, a, b);
  cljs.core.truth_(function() {
    var a = cljs.core.not.call(null, domina.domina.support.leading_whitespace_QMARK_);
    return cljs.core.truth_(a) ? cljs.core.re_find.call(null, domina.domina.re_leading_whitespace, b) : a
  }()) && domina.domina.restore_leading_whitespace_BANG_.call(null, a, b);
  return a.childNodes
};
domina.domina.string_to_dom = function(a) {
  return cljs.core.truth_(cljs.core.re_find.call(null, domina.domina.re_html, a)) ? domina.domina.html_to_dom.call(null, a) : document.createTextNode(a)
};
domina.domina.DomContent = {};
domina.domina.nodes = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.domina$domina$DomContent$nodes : a)) {
    a = a.domina$domina$DomContent$nodes(a)
  }else {
    var b;
    b = domina.domina.nodes[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = domina.domina.nodes._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "DomContent.nodes", a);
    }
    a = b.call(null, a)
  }
  return a
};
domina.domina.single_node = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.domina$domina$DomContent$single_node : a)) {
    a = a.domina$domina$DomContent$single_node(a)
  }else {
    var b;
    b = domina.domina.single_node[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = domina.domina.single_node._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "DomContent.single-node", a);
    }
    a = b.call(null, a)
  }
  return a
};
domina.domina._STAR_debug_STAR_ = !0;
domina.domina.log_debug = function(a) {
  return cljs.core.truth_(function() {
    var a = domina.domina._STAR_debug_STAR_;
    return cljs.core.truth_(a) ? cljs.core.not.call(null, cljs.core._EQ_.call(null, window.console, void 0)) : a
  }()) ? console.log(a) : null
};
domina.domina.log = function(a) {
  return cljs.core.truth_(window.console) ? console.log(a) : null
};
domina.domina.by_id = function(a) {
  return goog.dom.getElement.call(null, cljs.core.name.call(null, a))
};
domina.domina.by_class = function by_class(b) {
  if(cljs.core.truth_(void 0 === domina.domina.t3190)) {
    domina.domina.t3190 = function(b, d, e) {
      this.class_name = b;
      this.by_class = d;
      this.__meta = e
    }, domina.domina.t3190.cljs$core$IPrintable$_pr_seq = function() {
      return cljs.core.list.call(null, "domina.domina.t3190")
    }, domina.domina.t3190.prototype.domina$domina$DomContent$ = !0, domina.domina.t3190.prototype.domina$domina$DomContent$nodes = function() {
      return domina.domina.normalize_seq.call(null, goog.dom.getElementsByClass.call(null, cljs.core.name.call(null, this.class_name)))
    }, domina.domina.t3190.prototype.domina$domina$DomContent$single_node = function() {
      return domina.domina.normalize_seq.call(null, goog.dom.getElementByClass.call(null, cljs.core.name.call(null, this.class_name)))
    }, domina.domina.t3190.prototype.cljs$core$IMeta$ = !0, domina.domina.t3190.prototype.cljs$core$IMeta$_meta = function() {
      return this.__meta
    }, domina.domina.t3190.prototype.cljs$core$IWithMeta$ = !0, domina.domina.t3190.prototype.cljs$core$IWithMeta$_with_meta = function(b, d) {
      return new domina.domina.t3190(this.class_name, this.by_class, d)
    }
  }
  return new domina.domina.t3190(b, by_class, null)
};
domina.domina.children = function(a) {
  return cljs.core.mapcat.call(null, goog.dom.getChildren, domina.domina.nodes.call(null, a))
};
domina.domina.clone = function(a) {
  return cljs.core.map.call(null, function(a) {
    return a.cloneNode(!0)
  }, domina.domina.nodes.call(null, a))
};
domina.domina.append_BANG_ = function(a, b) {
  domina.domina.apply_with_cloning.call(null, goog.dom.appendChild, a, b);
  return a
};
domina.domina.insert_BANG_ = function(a, b, c) {
  domina.domina.apply_with_cloning.call(null, function(a, b) {
    return goog.dom.insertChildAt.call(null, a, b, c)
  }, a, b);
  return a
};
domina.domina.prepend_BANG_ = function(a, b) {
  domina.domina.insert_BANG_.call(null, a, b, 0);
  return a
};
domina.domina.insert_before_BANG_ = function(a, b) {
  domina.domina.apply_with_cloning.call(null, function(a, b) {
    return goog.dom.insertSiblingBefore.call(null, b, a)
  }, a, b);
  return a
};
domina.domina.insert_after_BANG_ = function(a, b) {
  domina.domina.apply_with_cloning.call(null, function(a, b) {
    return goog.dom.insertSiblingAfter.call(null, b, a)
  }, a, b);
  return a
};
domina.domina.swap_content_BANG_ = function(a, b) {
  domina.domina.apply_with_cloning.call(null, function(a, b) {
    return goog.dom.replaceNode.call(null, b, a)
  }, a, b);
  return a
};
domina.domina.detach_BANG_ = function(a) {
  return cljs.core.doall.call(null, cljs.core.map.call(null, goog.dom.removeNode, domina.domina.nodes.call(null, a)))
};
domina.domina.destroy_BANG_ = function(a) {
  return cljs.core.dorun.call(null, cljs.core.map.call(null, goog.dom.removeNode, domina.domina.nodes.call(null, a)))
};
domina.domina.destroy_children_BANG_ = function(a) {
  cljs.core.dorun.call(null, cljs.core.map.call(null, goog.dom.removeChildren, domina.domina.nodes.call(null, a)));
  return a
};
domina.domina.style = function(a, b) {
  var c = goog.style.getStyle.call(null, domina.domina.single_node.call(null, a), cljs.core.name.call(null, b));
  return cljs.core.truth_(clojure.string.blank_QMARK_.call(null, c)) ? null : c
};
domina.domina.attr = function(a, b) {
  return domina.domina.single_node.call(null, a).getAttribute(cljs.core.name.call(null, b))
};
domina.domina.set_style_BANG_ = function() {
  var a = function(a, b, e) {
    var f = cljs.core.seq.call(null, domina.domina.nodes.call(null, a));
    if(cljs.core.truth_(f)) {
      for(var g = cljs.core.first.call(null, f);;) {
        if(goog.style.setStyle.call(null, g, cljs.core.name.call(null, b), cljs.core.apply.call(null, cljs.core.str, e)), g = cljs.core.next.call(null, f), cljs.core.truth_(g)) {
          f = g, g = cljs.core.first.call(null, f)
        }else {
          break
        }
      }
    }
    return a
  }, b = function(b, d, e) {
    var f = null;
    goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
    return a.call(this, d, e, b)
  };
  return b
}();
domina.domina.set_attr_BANG_ = function() {
  var a = function(a, b, e) {
    var f = cljs.core.seq.call(null, domina.domina.nodes.call(null, a));
    if(cljs.core.truth_(f)) {
      for(var g = cljs.core.first.call(null, f);;) {
        if(g.setAttribute(cljs.core.name.call(null, b), cljs.core.apply.call(null, cljs.core.str, e)), g = cljs.core.next.call(null, f), cljs.core.truth_(g)) {
          f = g, g = cljs.core.first.call(null, f)
        }else {
          break
        }
      }
    }
    return a
  }, b = function(b, d, e) {
    var f = null;
    goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
    return a.call(this, d, e, b)
  };
  return b
}();
domina.domina.remove_attr_BANG_ = function(a, b) {
  var c = cljs.core.seq.call(null, domina.domina.nodes.call(null, a));
  if(cljs.core.truth_(c)) {
    for(var d = cljs.core.first.call(null, c);;) {
      if(d.removeAttribute(cljs.core.name.call(null, b)), d = cljs.core.next.call(null, c), cljs.core.truth_(d)) {
        c = d, d = cljs.core.first.call(null, c)
      }else {
        break
      }
    }
  }
  return a
};
domina.domina.parse_style_attributes = function(a) {
  return cljs.core.reduce.call(null, function(a, c) {
    var d = c.split(/\s*:\s*/), e = cljs.core.nth.call(null, d, 0, null), d = cljs.core.nth.call(null, d, 1, null);
    return cljs.core.truth_(cljs.core.truth_(e) ? d : e) ? cljs.core.assoc.call(null, a, cljs.core.keyword.call(null, e.toLowerCase()), d) : a
  }, cljs.core.ObjMap.fromObject([], {}), a.split(/\s*;\s*/))
};
domina.domina.styles = function(a) {
  a = domina.domina.attr.call(null, a, "style");
  return cljs.core.truth_(cljs.core.string_QMARK_.call(null, a)) ? domina.domina.parse_style_attributes.call(null, a) : cljs.core.truth_(a.cssText) ? domina.domina.parse_style_attributes.call(null, a.cssText) : null
};
domina.domina.attrs = function(a) {
  var b = domina.domina.single_node.call(null, a).attributes;
  return cljs.core.reduce.call(null, cljs.core.conj, cljs.core.filter.call(null, cljs.core.complement.call(null, cljs.core.nil_QMARK_), cljs.core.map.call(null, function(a) {
    var a = b.item(a), d = a.nodeValue;
    return cljs.core.truth_(function() {
      var a = cljs.core.not_EQ_.call(null, null, d);
      return cljs.core.truth_(a) ? cljs.core.not_EQ_.call(null, "", d) : a
    }()) ? cljs.core.HashMap.fromArrays([cljs.core.keyword.call(null, a.nodeName.toLowerCase())], [a.nodeValue]) : null
  }, cljs.core.range.call(null, b.length))))
};
domina.domina.set_styles_BANG_ = function(a, b) {
  var c = cljs.core.seq.call(null, b);
  if(cljs.core.truth_(c)) {
    var d = cljs.core.first.call(null, c);
    cljs.core.nth.call(null, d, 0, null);
    for(cljs.core.nth.call(null, d, 1, null);;) {
      var e = d, d = cljs.core.nth.call(null, e, 0, null), e = cljs.core.nth.call(null, e, 1, null);
      domina.domina.set_style_BANG_.call(null, a, d, e);
      c = cljs.core.next.call(null, c);
      if(cljs.core.truth_(c)) {
        d = c, c = cljs.core.first.call(null, d), e = d, d = c, c = e
      }else {
        break
      }
    }
  }
  return a
};
domina.domina.set_attrs_BANG_ = function(a, b) {
  var c = cljs.core.seq.call(null, b);
  if(cljs.core.truth_(c)) {
    var d = cljs.core.first.call(null, c);
    cljs.core.nth.call(null, d, 0, null);
    for(cljs.core.nth.call(null, d, 1, null);;) {
      var e = d, d = cljs.core.nth.call(null, e, 0, null), e = cljs.core.nth.call(null, e, 1, null);
      domina.domina.set_attr_BANG_.call(null, a, d, e);
      c = cljs.core.next.call(null, c);
      if(cljs.core.truth_(c)) {
        d = c, c = cljs.core.first.call(null, d), e = d, d = c, c = e
      }else {
        break
      }
    }
  }
  return a
};
domina.domina.has_class_QMARK_ = function(a, b) {
  return goog.dom.classes.has.call(null, domina.domina.single_node.call(null, a), b)
};
domina.domina.add_class_BANG_ = function(a, b) {
  var c = cljs.core.seq.call(null, domina.domina.nodes.call(null, a));
  if(cljs.core.truth_(c)) {
    for(var d = cljs.core.first.call(null, c);;) {
      if(goog.dom.classes.add.call(null, d, b), d = cljs.core.next.call(null, c), cljs.core.truth_(d)) {
        c = d, d = cljs.core.first.call(null, c)
      }else {
        break
      }
    }
  }
  return a
};
domina.domina.remove_class_BANG_ = function(a, b) {
  var c = cljs.core.seq.call(null, domina.domina.nodes.call(null, a));
  if(cljs.core.truth_(c)) {
    for(var d = cljs.core.first.call(null, c);;) {
      if(goog.dom.classes.remove.call(null, d, b), d = cljs.core.next.call(null, c), cljs.core.truth_(d)) {
        c = d, d = cljs.core.first.call(null, c)
      }else {
        break
      }
    }
  }
  return a
};
domina.domina.classes = function(a) {
  return cljs.core.seq.call(null, goog.dom.classes.get.call(null, domina.domina.single_node.call(null, a)))
};
domina.domina.text = function() {
  var a = null;
  return a = function(b, c) {
    switch(arguments.length) {
      case 1:
        return a.call(null, b, !0);
      case 2:
        return cljs.core.truth_(c) ? goog.string.trim.call(null, goog.dom.getTextContent.call(null, domina.domina.single_node.call(null, b))) : goog.dom.getRawTextContent.call(null, domina.domina.single_node.call(null, b))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
domina.domina.set_text_BANG_ = function(a, b) {
  var c = cljs.core.seq.call(null, domina.domina.nodes.call(null, a));
  if(cljs.core.truth_(c)) {
    for(var d = cljs.core.first.call(null, c);;) {
      if(goog.dom.setTextContent.call(null, d, b), d = cljs.core.next.call(null, c), cljs.core.truth_(d)) {
        c = d, d = cljs.core.first.call(null, c)
      }else {
        break
      }
    }
  }
  return a
};
domina.domina.value = function(a) {
  return goog.dom.forms.getValue.call(null, domina.domina.single_node.call(null, a))
};
domina.domina.set_value_BANG_ = function(a, b) {
  var c = cljs.core.seq.call(null, domina.domina.nodes.call(null, a));
  if(cljs.core.truth_(c)) {
    for(var d = cljs.core.first.call(null, c);;) {
      if(goog.dom.forms.setValue.call(null, d, b), d = cljs.core.next.call(null, c), cljs.core.truth_(d)) {
        c = d, d = cljs.core.first.call(null, c)
      }else {
        break
      }
    }
  }
  return a
};
domina.domina.html = function(a) {
  return domina.domina.single_node.call(null, a).innerHTML
};
domina.domina.replace_children_BANG_ = function(a, b) {
  return domina.domina.append_BANG_.call(null, domina.domina.destroy_children_BANG_.call(null, a), b)
};
domina.domina.set_inner_html_BANG_ = function(a, b) {
  var c = cljs.core.not.call(null, cljs.core.re_find.call(null, domina.domina.re_no_inner_html, b)), d = cljs.core.re_find.call(null, domina.domina.re_leading_whitespace, b), e = cljs.core.str.call(null, cljs.core.second.call(null, cljs.core.re_find.call(null, domina.domina.re_tag_name, b))).toLowerCase(), f = cljs.core.contains_QMARK_.call(null, domina.domina.wrap_map, e);
  if(cljs.core.truth_(function() {
    if(cljs.core.truth_(c)) {
      var a;
      a = domina.domina.support.leading_whitespace_QMARK_;
      a = cljs.core.truth_(a) ? a : cljs.core.not.call(null, d);
      return cljs.core.truth_(a) ? cljs.core.not.call(null, f) : a
    }
    return c
  }())) {
    e = clojure.string.replace.call(null, b, domina.domina.re_xhtml_tag, "<$1></$2>");
    try {
      var g = cljs.core.seq.call(null, domina.domina.nodes.call(null, a));
      if(cljs.core.truth_(g)) {
        for(var h = cljs.core.first.call(null, g);;) {
          goog.events.removeAll.call(null, h);
          h.innerHTML = e;
          var i = cljs.core.next.call(null, g);
          if(cljs.core.truth_(i)) {
            var j = i, k = cljs.core.first.call(null, j), h = k, g = j
          }else {
            break
          }
        }
      }
    }catch(l) {
      if(cljs.core.truth_(cljs.core.instance_QMARK_.call(null, domina.domina.Exception, l))) {
        domina.domina.replace_children_BANG_.call(null, a, e)
      }else {
        if(cljs.core.truth_("\ufdd0'else")) {
          throw l;
        }
      }
    }
  }else {
    domina.domina.replace_children_BANG_.call(null, a, b)
  }
  return a
};
domina.domina.set_html_BANG_ = function(a, b) {
  return cljs.core.truth_(cljs.core.string_QMARK_.call(null, b)) ? domina.domina.set_inner_html_BANG_.call(null, a, b) : domina.domina.replace_children_BANG_.call(null, a, b)
};
domina.domina.get_data = function() {
  var a = null;
  return a = function(b, c, d) {
    switch(arguments.length) {
      case 2:
        return a.call(null, b, c, !1);
      case 3:
        var e;
        e = domina.domina.single_node.call(null, b).__domina_data;
        e = cljs.core.truth_(e) ? cljs.core.get.call(null, e, c) : null;
        if(cljs.core.truth_(cljs.core.truth_(d) ? cljs.core.nil_QMARK_.call(null, e) : d)) {
          e = domina.domina.single_node.call(null, b).parentNode, e = cljs.core.truth_(e) ? a.call(null, e, c, !0) : null
        }
        return e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
domina.domina.set_data_BANG_ = function(a, b, c) {
  var d;
  d = domina.domina.single_node.call(null, a).__domina_data;
  d = cljs.core.truth_(d) ? d : cljs.core.ObjMap.fromObject([], {});
  return domina.domina.single_node.call(null, a).__domina_data = cljs.core.assoc.call(null, d, b, c)
};
domina.domina.apply_with_cloning = function(a, b, c) {
  var b = domina.domina.nodes.call(null, b), d = domina.domina.nodes.call(null, c), e = function() {
    var a = document.createDocumentFragment(), b = cljs.core.seq.call(null, d);
    if(cljs.core.truth_(b)) {
      for(var c = cljs.core.first.call(null, b);;) {
        if(a.appendChild(c), c = cljs.core.next.call(null, b), cljs.core.truth_(c)) {
          b = c, c = cljs.core.first.call(null, b)
        }else {
          break
        }
      }
    }
    return a
  }(), c = cljs.core.doall.call(null, cljs.core.repeatedly.call(null, cljs.core.count.call(null, b) - 1, function() {
    return e.cloneNode(!0)
  }));
  return cljs.core.truth_(cljs.core.seq.call(null, b)) ? (a.call(null, cljs.core.first.call(null, b), e), cljs.core.doall.call(null, cljs.core.map.call(null, function(b, c) {
    return a.call(null, b, c)
  }, cljs.core.rest.call(null, b), c))) : null
};
domina.domina.lazy_nl_via_item = function() {
  var a = null, b = function(b, d) {
    return cljs.core.truth_(d < b.length) ? new cljs.core.LazySeq(null, !1, function() {
      return cljs.core.cons.call(null, b.item(d), a.call(null, b, d + 1))
    }) : null
  };
  return a = function(c, d) {
    switch(arguments.length) {
      case 1:
        return a.call(null, c, 0);
      case 2:
        return b.call(this, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
domina.domina.lazy_nl_via_array_ref = function() {
  var a = null, b = function(b, d) {
    return cljs.core.truth_(d < b.length) ? new cljs.core.LazySeq(null, !1, function() {
      return cljs.core.cons.call(null, b[d], a.call(null, b, d + 1))
    }) : null
  };
  return a = function(c, d) {
    switch(arguments.length) {
      case 1:
        return a.call(null, c, 0);
      case 2:
        return b.call(this, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
domina.domina.lazy_nodelist = function(a) {
  return cljs.core.truth_(a.item) ? domina.domina.lazy_nl_via_item.call(null, a) : domina.domina.lazy_nl_via_array_ref.call(null, a)
};
domina.domina.array_like_QMARK_ = function(a) {
  if(cljs.core.truth_(a)) {
    var b = a.length;
    return cljs.core.truth_(b) ? (b = a.indexOf, cljs.core.truth_(b) ? b : a.item) : b
  }
  return a
};
domina.domina.normalize_seq = function(a) {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? cljs.core.List.EMPTY : cljs.core.truth_(function() {
    return cljs.core.truth_(function() {
      if(cljs.core.truth_(a)) {
        var b = a.cljs$core$ISeqable$;
        return cljs.core.truth_(b) ? (b = a.hasOwnProperty, cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$ISeqable$")) : b) : b
      }
      return a
    }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.ISeqable, a)
  }()) ? cljs.core.seq.call(null, a) : cljs.core.truth_(domina.domina.array_like_QMARK_.call(null, a)) ? domina.domina.lazy_nodelist.call(null, a) : cljs.core.truth_("\ufdd0'default") ? cljs.core.cons.call(null, a) : null
};
domina.domina.DomContent._ = !0;
domina.domina.nodes._ = function(a) {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? cljs.core.List.EMPTY : cljs.core.truth_(function() {
    return cljs.core.truth_(function() {
      if(cljs.core.truth_(a)) {
        var b = a.cljs$core$ISeqable$;
        return cljs.core.truth_(b) ? (b = a.hasOwnProperty, cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$ISeqable$")) : b) : b
      }
      return a
    }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.ISeqable, a)
  }()) ? cljs.core.seq.call(null, a) : cljs.core.truth_(domina.domina.array_like_QMARK_.call(null, a)) ? domina.domina.lazy_nodelist.call(null, a) : cljs.core.truth_("\ufdd0'default") ? cljs.core.cons.call(null, a) : null
};
domina.domina.single_node._ = function(a) {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? null : cljs.core.truth_(function() {
    return cljs.core.truth_(function() {
      if(cljs.core.truth_(a)) {
        var b = a.cljs$core$ISeqable$;
        return cljs.core.truth_(b) ? (b = a.hasOwnProperty, cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$ISeqable$")) : b) : b
      }
      return a
    }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.ISeqable, a)
  }()) ? cljs.core.first.call(null, a) : cljs.core.truth_(domina.domina.array_like_QMARK_.call(null, a)) ? a.item(0) : cljs.core.truth_("\ufdd0'default") ? a : null
};
domina.domina.DomContent.string = !0;
domina.domina.nodes.string = function(a) {
  return cljs.core.doall.call(null, domina.domina.nodes.call(null, domina.domina.string_to_dom.call(null, a)))
};
domina.domina.single_node.string = function(a) {
  return domina.domina.single_node.call(null, domina.domina.string_to_dom.call(null, a))
};
if(cljs.core.truth_("undefined" != typeof NodeList)) {
  NodeList.prototype.cljs$core$ISeqable$ = !0, NodeList.prototype.cljs$core$ISeqable$_seq = function(a) {
    return domina.domina.lazy_nodelist.call(null, a)
  }, NodeList.prototype.cljs$core$IIndexed$ = !0, NodeList.prototype.cljs$core$IIndexed$_nth = function() {
    var a = null;
    return function(a, c, d) {
      switch(arguments.length) {
        case 2:
          return a.item(c);
        case 3:
          return cljs.core.truth_(a.length <= c) ? d : cljs.core.nth.call(null, a, c)
      }
      throw"Invalid arity: " + arguments.length;
    }
  }(), NodeList.prototype.cljs$core$ICounted$ = !0, NodeList.prototype.cljs$core$ICounted$_count = function(a) {
    return a.length
  }
}
if(cljs.core.truth_("undefined" != typeof StaticNodeList)) {
  StaticNodeList.prototype.cljs$core$ISeqable$ = !0, StaticNodeList.prototype.cljs$core$ISeqable$_seq = function(a) {
    return domina.domina.lazy_nodelist.call(null, a)
  }, StaticNodeList.prototype.cljs$core$IIndexed$ = !0, StaticNodeList.prototype.cljs$core$IIndexed$_nth = function() {
    var a = null;
    return function(a, c, d) {
      switch(arguments.length) {
        case 2:
          return a.item(c);
        case 3:
          return cljs.core.truth_(a.length <= c) ? d : cljs.core.nth.call(null, a, c)
      }
      throw"Invalid arity: " + arguments.length;
    }
  }(), StaticNodeList.prototype.cljs$core$ICounted$ = !0, StaticNodeList.prototype.cljs$core$ICounted$_count = function(a) {
    return a.length
  }
}
if(cljs.core.truth_("undefined" != typeof HTMLCollection)) {
  HTMLCollection.prototype.cljs$core$ISeqable$ = !0, HTMLCollection.prototype.cljs$core$ISeqable$_seq = function(a) {
    return domina.domina.lazy_nodelist.call(null, a)
  }, HTMLCollection.prototype.cljs$core$IIndexed$ = !0, HTMLCollection.prototype.cljs$core$IIndexed$_nth = function() {
    var a = null;
    return function(a, c, d) {
      switch(arguments.length) {
        case 2:
          return a.item(c);
        case 3:
          return cljs.core.truth_(a.length <= c) ? d : cljs.core.nth.call(null, a, c)
      }
      throw"Invalid arity: " + arguments.length;
    }
  }(), HTMLCollection.prototype.cljs$core$ICounted$ = !0, HTMLCollection.prototype.cljs$core$ICounted$_count = function(a) {
    return a.length
  }
}
;domina.domina.css = {};
domina.domina.css.root_element = function() {
  return goog.dom.getElementsByTagNameAndClass.call(null, "html")[0]
};
domina.domina.css.sel = function() {
  var a = null, b = function(b, d) {
    if(cljs.core.truth_(void 0 === domina.domina.css.t2987)) {
      domina.domina.css.t2987 = function(a, b, c, d) {
        this.expr = a;
        this.base = b;
        this.sel = c;
        this.__meta = d
      }, domina.domina.css.t2987.cljs$core$IPrintable$_pr_seq = function() {
        return cljs.core.list.call(null, "domina.domina.css.t2987")
      }, domina.domina.css.t2987.prototype.domina$domina$DomContent$ = !0, domina.domina.css.t2987.prototype.domina$domina$DomContent$nodes = function() {
        var a = this;
        return cljs.core.mapcat.call(null, function(b) {
          return domina.domina.normalize_seq.call(null, goog.dom.query.call(null, a.expr, b))
        }, domina.domina.nodes.call(null, a.base))
      }, domina.domina.css.t2987.prototype.domina$domina$DomContent$single_node = function() {
        var a = this;
        return cljs.core.first.call(null, cljs.core.filter.call(null, cljs.core.complement.call(null, cljs.core.nil_QMARK_), cljs.core.mapcat.call(null, function(b) {
          return domina.domina.normalize_seq.call(null, goog.dom.query.call(null, a.expr, b))
        }, domina.domina.nodes.call(null, a.base))))
      }, domina.domina.css.t2987.prototype.cljs$core$IMeta$ = !0, domina.domina.css.t2987.prototype.cljs$core$IMeta$_meta = function() {
        return this.__meta
      }, domina.domina.css.t2987.prototype.cljs$core$IWithMeta$ = !0, domina.domina.css.t2987.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
        return new domina.domina.css.t2987(this.expr, this.base, this.sel, b)
      }
    }
    return new domina.domina.css.t2987(d, b, a, null)
  };
  return a = function(c, d) {
    switch(arguments.length) {
      case 1:
        return a.call(null, domina.domina.css.root_element.call(null), c);
      case 2:
        return b.call(this, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
var one = {dispatch:{}};
one.dispatch.reactions = cljs.core.atom.call(null, cljs.core.ObjMap.fromObject([], {}));
one.dispatch.react_to = function(a, b, c) {
  var d = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, b)) ? cljs.core.apply.call(null, cljs.core.hash_map, b) : b, b = cljs.core.get.call(null, d, "\ufdd0'max-count", null), d = cljs.core.get.call(null, d, "\ufdd0'priority", 0), a = cljs.core.ObjMap.fromObject(["\ufdd0'max-count", "\ufdd0'event-pred", "\ufdd0'reactor", "\ufdd0'priority"], {"\ufdd0'max-count":b, "\ufdd0'event-pred":a, "\ufdd0'reactor":c, "\ufdd0'priority":d});
  cljs.core.swap_BANG_.call(null, one.dispatch.reactions, cljs.core.assoc, a, 0);
  return a
};
one.dispatch.delete_reaction = function(a) {
  return cljs.core.swap_BANG_.call(null, one.dispatch.reactions, cljs.core.dissoc, a)
};
one.dispatch.fire = function() {
  var a = null, b = function(a, b) {
    var e = cljs.core.filter.call(null, function(b) {
      var d = cljs.core.nth.call(null, b, 0, null), d = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, d)) ? cljs.core.apply.call(null, cljs.core.hash_map, d) : d, d = cljs.core.get.call(null, d, "\ufdd0'event-pred");
      cljs.core.nth.call(null, b, 1, null);
      return d.call(null, a)
    }, cljs.core.deref.call(null, one.dispatch.reactions)), e = cljs.core.sort_by.call(null, cljs.core.comp.call(null, "\ufdd0'priority", cljs.core.first), e), f = cljs.core.seq.call(null, e);
    if(cljs.core.truth_(f)) {
      e = cljs.core.first.call(null, f);
      cljs.core.nth.call(null, e, 0, null);
      cljs.core.nth.call(null, e, 1, null);
      for(var g = f;;) {
        var f = e, e = cljs.core.nth.call(null, f, 0, null), f = cljs.core.nth.call(null, f, 1, null), h = e, h = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, h)) ? cljs.core.apply.call(null, cljs.core.hash_map, h) : h, i = cljs.core.get.call(null, h, "\ufdd0'reactor"), j = cljs.core.get.call(null, h, "\ufdd0'max-count"), k = f + 1;
        i.call(null, a, b);
        cljs.core.truth_(function() {
          var a = j;
          return cljs.core.truth_(a) ? j <= k : a
        }()) ? one.dispatch.delete_reaction.call(null, e) : cljs.core.swap_BANG_.call(null, one.dispatch.reactions, cljs.core.assoc, e, k);
        e = cljs.core.next.call(null, g);
        if(cljs.core.truth_(e)) {
          f = e, e = cljs.core.first.call(null, f), g = f
        }else {
          return null
        }
      }
    }else {
      return null
    }
  };
  return a = function(c, d) {
    switch(arguments.length) {
      case 1:
        return a.call(null, c, null);
      case 2:
        return b.call(this, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
var ttmachines = {client:{}};
ttmachines.client.util = {};
ttmachines.client.util.dissoc_in = function dissoc_in(b, c) {
  var d = cljs.core.nth.call(null, c, 0, null), e = cljs.core.nthnext.call(null, c, 1);
  if(cljs.core.truth_(e)) {
    var f = cljs.core.get.call(null, b, d);
    return cljs.core.truth_(f) ? (e = dissoc_in.call(null, f, e), cljs.core.truth_(cljs.core.seq.call(null, e)) ? cljs.core.assoc.call(null, b, d, e) : cljs.core.dissoc.call(null, b, d)) : b
  }
  return cljs.core.dissoc.call(null, b, d)
};
ttmachines.client.util.map__GT_js = function(a) {
  var b = cljs.core.js_obj.call(null), a = cljs.core.seq.call(null, a);
  if(cljs.core.truth_(a)) {
    var c = cljs.core.first.call(null, a);
    cljs.core.nth.call(null, c, 0, null);
    for(cljs.core.nth.call(null, c, 1, null);;) {
      var d = c, c = cljs.core.nth.call(null, d, 0, null), d = cljs.core.nth.call(null, d, 1, null);
      b[cljs.core.name.call(null, c)] = d;
      a = cljs.core.next.call(null, a);
      if(cljs.core.truth_(a)) {
        c = a, a = cljs.core.first.call(null, c), d = c, c = a, a = d
      }else {
        break
      }
    }
  }
  return b
};
ttmachines.client.util.path_name = function() {
  return window.location.pathname
};
ttmachines.client.util.after = function(a, b) {
  return setTimeout.call(null, b, a)
};
ttmachines.client.util.code_highlight = function(a, b) {
  var c = document.getElementById(b);
  return cljs.core.truth_(c) ? CodeMirror.runMode(a, "clojure", c) : null
};
ttmachines.client.util.highlight_code_nodes = function() {
  var a = cljs.core.seq.call(null, domina.domina.nodes.call(null, domina.domina.css.sel.call(null, ".clojure-code")));
  if(cljs.core.truth_(a)) {
    for(var b = cljs.core.first.call(null, a);;) {
      if(domina.domina.set_attr_BANG_.call(null, b, "\ufdd0'id", "_clojure_code_"), ttmachines.client.util.code_highlight.call(null, domina.domina.text.call(null, b), "_clojure_code_"), domina.domina.remove_attr_BANG_.call(null, b, "\ufdd0'id"), b = cljs.core.next.call(null, a), cljs.core.truth_(b)) {
        a = b, b = cljs.core.first.call(null, a)
      }else {
        return null
      }
    }
  }else {
    return null
  }
};
one.dispatch.react_to.call(null, cljs.core.set(["\ufdd0'switch-page"]), cljs.core.ObjMap.fromObject(["\ufdd0'priority"], {"\ufdd0'priority":5}), function() {
  return ttmachines.client.util.highlight_code_nodes.call(null)
});
ttmachines.client.util.LAZY_SEQ_LIMIT = 100;
ttmachines.client.util.append_and_more = function(a) {
  a = cljs.core.subs.call(null, a, 0, cljs.core.count.call(null, a) - 1);
  return cljs.core.str.call(null, a, "... & more)")
};
ttmachines.client.util.finite_pr_str = function(a) {
  return cljs.core.truth_(function() {
    var b = cljs.core.not.call(null, cljs.core.nil_QMARK_.call(null, a));
    return cljs.core.truth_(b) ? (b = function() {
      return cljs.core.truth_(function() {
        if(cljs.core.truth_(a)) {
          var b = a.cljs$core$ISeq$;
          return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$ISeq$")) : b
        }
        return a
      }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.ISeq, a)
    }(), cljs.core.truth_(b) ? cljs.core.count.call(null, a) > ttmachines.client.util.LAZY_SEQ_LIMIT : b) : b
  }()) ? ttmachines.client.util.append_and_more.call(null, cljs.core.pr_str.call(null, cljs.core.take.call(null, ttmachines.client.util.LAZY_SEQ_LIMIT, a))) : cljs.core.pr_str.call(null, a)
};
ttmachines.client.history = {};
ttmachines.client.history.History = window.History;
ttmachines.client.history.History.Adapter.bind(window, "statechange", function() {
  var a = ttmachines.client.history.History.getState(), a = cljs.core.ObjMap.fromObject(["\ufdd0'data", "\ufdd0'title", "\ufdd0'url"], {"\ufdd0'data":cljs.core.js__GT_clj.call(null, a.data), "\ufdd0'title":a.title, "\ufdd0'url":a.url});
  return one.dispatch.fire.call(null, "\ufdd0'history-state-change", a)
});
ttmachines.client.history.push_state_BANG_ = function() {
  var a = function(a) {
    var b = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, a)) ? cljs.core.apply.call(null, cljs.core.hash_map, a) : a, a = cljs.core.get.call(null, b, "\ufdd0'url"), e = cljs.core.get.call(null, b, "\ufdd0'title"), b = cljs.core.get.call(null, b, "\ufdd0'data");
    return ttmachines.client.history.History.pushState(ttmachines.client.util.map__GT_js.call(null, b), e, a)
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
ttmachines.client.chapter = {};
ttmachines.client.chapter.one = {};
ttmachines.client.chapter.one.my_name = cljs.core.atom.call(null, "User");
ttmachines.client.chapter.one.greeting = function() {
  return cljs.core.str.call(null, "It's nice to finally meet you, ", cljs.core.deref.call(null, ttmachines.client.chapter.one.my_name), "!")
};
one.dispatch.react_to.call(null, cljs.core.set(["\ufdd0'switch-page"]), cljs.core.ObjMap.fromObject(["\ufdd0'priority"], {"\ufdd0'priority":3}), function() {
  var a = domina.domina.by_id.call(null, "hello-user");
  return cljs.core.truth_(a) ? domina.domina.set_text_BANG_.call(null, a, ttmachines.client.chapter.one.greeting.call(null)) : null
});
one.dispatch.react_to.call(null, cljs.core.set(["\ufdd0'switch-page"]), cljs.core.ObjMap.fromObject(["\ufdd0'priority"], {"\ufdd0'priority":3}), function() {
  var a = domina.domina.by_id.call(null, "def-my-name-again");
  return cljs.core.truth_(a) ? ttmachines.client.util.code_highlight.call(null, cljs.core.str.call(null, '(def my-name "', cljs.core.deref.call(null, ttmachines.client.chapter.one.my_name), '")'), "def-my-name-again") : null
});
one.dispatch.react_to.call(null, cljs.core.set(["\ufdd0'switch-page"]), cljs.core.ObjMap.fromObject(["\ufdd0'priority"], {"\ufdd0'priority":3}), function() {
  var a = domina.domina.by_id.call(null, "insert-name");
  return cljs.core.truth_(a) ? domina.domina.set_text_BANG_.call(null, a, cljs.core.str.call(null, '"', cljs.core.deref.call(null, ttmachines.client.chapter.one.my_name), '"')) : null
});
one.core = {};
one.core.Startable = {};
one.core.start = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.one$core$Startable$start : a)) {
    a = a.one$core$Startable$start(a)
  }else {
    var b;
    b = one.core.start[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = one.core.start._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "Startable.start", a);
    }
    a = b.call(null, a)
  }
  return a
};
one.core.Disposable = {};
one.core.dispose = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.one$core$Disposable$dispose : a)) {
    a = a.one$core$Disposable$dispose(a)
  }else {
    var b;
    b = one.core.dispose[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = one.core.dispose._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "Disposable.dispose", a);
    }
    a = b.call(null, a)
  }
  return a
};
one.core.get_style = function(a, b) {
  return cljs.core.some.call(null, function(a) {
    a = a.call(null);
    return cljs.core.truth_(cljs.core.not_EQ_.call(null, "", a)) ? a : null
  }, cljs.core.Vector.fromArray([function() {
    return goog.style.getComputedStyle.call(null, a, b)
  }, function() {
    return goog.style.getStyle.call(null, a, b)
  }, function() {
    return a.currentStyle[b]
  }, function() {
    throw Error(cljs.core.str.call(null, "Could not retrieve value for style ", b));
  }]))
};
clojure.browser = {};
clojure.browser.event = {};
clojure.browser.event.EventType = {};
clojure.browser.event.event_types = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.clojure$browser$event$EventType$event_types : a)) {
    a = a.clojure$browser$event$EventType$event_types(a)
  }else {
    var b;
    b = clojure.browser.event.event_types[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = clojure.browser.event.event_types._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "EventType.event-types", a);
    }
    a = b.call(null, a)
  }
  return a
};
Element.prototype.clojure$browser$event$EventType$ = !0;
Element.prototype.clojure$browser$event$EventType$event_types = function() {
  return cljs.core.into.call(null, cljs.core.ObjMap.fromObject([], {}), cljs.core.map.call(null, function(a) {
    var b = cljs.core.nth.call(null, a, 0, null), a = cljs.core.nth.call(null, a, 1, null);
    return cljs.core.Vector.fromArray([cljs.core.keyword.call(null, b.toLowerCase()), a])
  }, cljs.core.merge.call(null, cljs.core.js__GT_clj.call(null, goog.events.EventType))))
};
goog.events.EventTarget.prototype.clojure$browser$event$EventType$ = !0;
goog.events.EventTarget.prototype.clojure$browser$event$EventType$event_types = function() {
  return cljs.core.into.call(null, cljs.core.ObjMap.fromObject([], {}), cljs.core.map.call(null, function(a) {
    var b = cljs.core.nth.call(null, a, 0, null), a = cljs.core.nth.call(null, a, 1, null);
    return cljs.core.Vector.fromArray([cljs.core.keyword.call(null, b.toLowerCase()), a])
  }, cljs.core.merge.call(null, cljs.core.js__GT_clj.call(null, goog.events.EventType))))
};
clojure.browser.event.listen = function() {
  var a = null;
  return a = function(b, c, d, e) {
    switch(arguments.length) {
      case 3:
        return a.call(null, b, c, d, !1);
      case 4:
        return goog.events.listen.call(null, b, cljs.core.get.call(null, clojure.browser.event.event_types.call(null, b), c, c), d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
clojure.browser.event.listen_once = function() {
  var a = null;
  return a = function(b, c, d, e) {
    switch(arguments.length) {
      case 3:
        return a.call(null, b, c, d, !1);
      case 4:
        return goog.events.listenOnce.call(null, b, cljs.core.get.call(null, clojure.browser.event.event_types.call(null, b), c, c), d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
clojure.browser.event.unlisten = function() {
  var a = null;
  return a = function(b, c, d, e) {
    switch(arguments.length) {
      case 3:
        return a.call(null, b, c, d, !1);
      case 4:
        return goog.events.unlisten.call(null, b, cljs.core.get.call(null, clojure.browser.event.event_types.call(null, b), c, c), d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
clojure.browser.event.unlisten_by_key = function(a) {
  return goog.events.unlistenByKey.call(null, a)
};
clojure.browser.event.dispatch_event = function(a, b) {
  return goog.events.dispatchEvent.call(null, a, b)
};
clojure.browser.event.expose = function(a) {
  return goog.events.expose.call(null, a)
};
clojure.browser.event.fire_listeners = function() {
  return null
};
clojure.browser.event.total_listener_count = function() {
  return goog.events.getTotalListenerCount.call(null)
};
clojure.browser.event.get_listener = function() {
  return null
};
clojure.browser.event.all_listeners = function() {
  return null
};
clojure.browser.event.unique_event_id = function() {
  return null
};
clojure.browser.event.has_listener = function() {
  return null
};
clojure.browser.event.remove_all = function() {
  return null
};
domina.domina.events = {};
domina.domina.events.Event = {};
domina.domina.events.prevent_default = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.domina$domina$events$Event$prevent_default : a)) {
    a = a.domina$domina$events$Event$prevent_default(a)
  }else {
    var b;
    b = domina.domina.events.prevent_default[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = domina.domina.events.prevent_default._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "Event.prevent-default", a);
    }
    a = b.call(null, a)
  }
  return a
};
domina.domina.events.stop_propagation = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.domina$domina$events$Event$stop_propagation : a)) {
    a = a.domina$domina$events$Event$stop_propagation(a)
  }else {
    var b;
    b = domina.domina.events.stop_propagation[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = domina.domina.events.stop_propagation._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "Event.stop-propagation", a);
    }
    a = b.call(null, a)
  }
  return a
};
domina.domina.events.target = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.domina$domina$events$Event$target : a)) {
    a = a.domina$domina$events$Event$target(a)
  }else {
    var b;
    b = domina.domina.events.target[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = domina.domina.events.target._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "Event.target", a);
    }
    a = b.call(null, a)
  }
  return a
};
domina.domina.events.current_target = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.domina$domina$events$Event$current_target : a)) {
    a = a.domina$domina$events$Event$current_target(a)
  }else {
    var b;
    b = domina.domina.events.current_target[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = domina.domina.events.current_target._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "Event.current-target", a);
    }
    a = b.call(null, a)
  }
  return a
};
domina.domina.events.event_type = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.domina$domina$events$Event$event_type : a)) {
    a = a.domina$domina$events$Event$event_type(a)
  }else {
    var b;
    b = domina.domina.events.event_type[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = domina.domina.events.event_type._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "Event.event-type", a);
    }
    a = b.call(null, a)
  }
  return a
};
domina.domina.events.raw_event = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.domina$domina$events$Event$raw_event : a)) {
    a = a.domina$domina$events$Event$raw_event(a)
  }else {
    var b;
    b = domina.domina.events.raw_event[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = domina.domina.events.raw_event._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "Event.raw-event", a);
    }
    a = b.call(null, a)
  }
  return a
};
domina.domina.events.builtin_events = cljs.core.set.call(null, cljs.core.map.call(null, cljs.core.keyword, goog.object.getValues.call(null, goog.events.EventType)));
domina.domina.events.root_element = window.document.documentElement;
domina.domina.events.find_builtin_type = function(a) {
  return cljs.core.truth_(cljs.core.contains_QMARK_.call(null, domina.domina.events.builtin_events, a)) ? cljs.core.name.call(null, a) : a
};
domina.domina.events.create_listener_function = function create_listener_function(b) {
  return function(c) {
    b.call(null, function() {
      if(cljs.core.truth_(void 0 === domina.domina.events.t3013)) {
        domina.domina.events.t3013 = function(b, c, f, g) {
          this.evt = b;
          this.f = c;
          this.create_listener_function = f;
          this.__meta = g
        }, domina.domina.events.t3013.cljs$core$IPrintable$_pr_seq = function() {
          return cljs.core.list.call(null, "domina.domina.events.t3013")
        }, domina.domina.events.t3013.prototype.cljs$core$ILookup$ = !0, domina.domina.events.t3013.prototype.cljs$core$ILookup$_lookup = function() {
          var b = null;
          return function(b, c, d) {
            switch(arguments.length) {
              case 2:
                var h;
                h = this.evt[c];
                h = cljs.core.truth_(h) ? h : this.evt[cljs.core.name.call(null, c)];
                return h;
              case 3:
                return h = cljs.core._lookup.call(null, b, c), cljs.core.truth_(h) ? h : d
            }
            throw"Invalid arity: " + arguments.length;
          }
        }(), domina.domina.events.t3013.prototype.domina$domina$events$Event$ = !0, domina.domina.events.t3013.prototype.domina$domina$events$Event$prevent_default = function() {
          return this.evt.preventDefault()
        }, domina.domina.events.t3013.prototype.domina$domina$events$Event$stop_propagation = function() {
          return this.evt.stopPropagation()
        }, domina.domina.events.t3013.prototype.domina$domina$events$Event$target = function() {
          return this.evt.target
        }, domina.domina.events.t3013.prototype.domina$domina$events$Event$current_target = function() {
          return this.evt.currentTarget
        }, domina.domina.events.t3013.prototype.domina$domina$events$Event$event_type = function() {
          return this.evt.type
        }, domina.domina.events.t3013.prototype.domina$domina$events$Event$raw_event = function() {
          return this.evt
        }, domina.domina.events.t3013.prototype.cljs$core$IMeta$ = !0, domina.domina.events.t3013.prototype.cljs$core$IMeta$_meta = function() {
          return this.__meta
        }, domina.domina.events.t3013.prototype.cljs$core$IWithMeta$ = !0, domina.domina.events.t3013.prototype.cljs$core$IWithMeta$_with_meta = function(b, c) {
          return new domina.domina.events.t3013(this.evt, this.f, this.create_listener_function, c)
        }
      }
      return new domina.domina.events.t3013(c, b, create_listener_function, null)
    }());
    return!0
  }
};
domina.domina.events.listen_internal_BANG_ = function(a, b, c, d, e) {
  var f = domina.domina.events.create_listener_function.call(null, c), g = domina.domina.events.find_builtin_type.call(null, b);
  return cljs.core.doall.call(null, function() {
    return function i(a) {
      return new cljs.core.LazySeq(null, !1, function() {
        for(;;) {
          if(cljs.core.truth_(cljs.core.seq.call(null, a))) {
            var b = cljs.core.first.call(null, a);
            return cljs.core.cons.call(null, cljs.core.truth_(e) ? goog.events.listenOnce.call(null, b, g, f, d) : goog.events.listen.call(null, b, g, f, d), i.call(null, cljs.core.rest.call(null, a)))
          }
          return null
        }
      })
    }.call(null, domina.domina.nodes.call(null, a))
  }())
};
domina.domina.events.listen_BANG_ = function() {
  var a = null;
  return a = function(b, c, d) {
    switch(arguments.length) {
      case 2:
        return a.call(null, domina.domina.events.root_element, b, c);
      case 3:
        return domina.domina.events.listen_internal_BANG_.call(null, b, c, d, !1, !1)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
domina.domina.events.capture_BANG_ = function() {
  var a = null;
  return a = function(b, c, d) {
    switch(arguments.length) {
      case 2:
        return a.call(null, domina.domina.events.root_element, b, c);
      case 3:
        return domina.domina.events.listen_internal_BANG_.call(null, b, c, d, !0, !1)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
domina.domina.events.listen_once_BANG_ = function() {
  var a = null;
  return a = function(b, c, d) {
    switch(arguments.length) {
      case 2:
        return a.call(null, domina.domina.events.root_element, b, c);
      case 3:
        return domina.domina.events.listen_internal_BANG_.call(null, b, c, d, !1, !0)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
domina.domina.events.capture_once_BANG_ = function() {
  var a = null;
  return a = function(b, c, d) {
    switch(arguments.length) {
      case 2:
        return a.call(null, domina.domina.events.root_element, b, c);
      case 3:
        return domina.domina.events.listen_internal_BANG_.call(null, b, c, d, !0, !0)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
domina.domina.events.unlisten_BANG_ = function() {
  var a = null;
  return a = function(b, c) {
    switch(arguments.length) {
      case 0:
        return a.call(null, domina.domina.events.root_element);
      case 1:
        var d;
        a: {
          var e = cljs.core.seq.call(null, domina.domina.nodes.call(null, b));
          if(cljs.core.truth_(e)) {
            for(var f = cljs.core.first.call(null, e);;) {
              if(goog.events.removeAll.call(null, f), f = cljs.core.next.call(null, e), cljs.core.truth_(f)) {
                e = f, f = cljs.core.first.call(null, e)
              }else {
                d = null;
                break a
              }
            }
          }else {
            d = null
          }
        }
        return d;
      case 2:
        return d = domina.domina.events.find_builtin_type.call(null, c), goog.events.removeAll.call(null, domina.domina.events.node, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
domina.domina.events.ancestor_nodes = function() {
  var a = null;
  return a = function(b, c) {
    switch(arguments.length) {
      case 1:
        return a.call(null, b, cljs.core.cons.call(null, b));
      case 2:
        var d;
        a: {
          for(var e = b, f = c;;) {
            if(e = e.parentNode, cljs.core.truth_(e)) {
              var g = e, e = g, f = cljs.core.cons.call(null, g, f)
            }else {
              d = f;
              break a
            }
          }
        }
        return d
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
domina.domina.events.dispatch_browser_BANG_ = function(a, b) {
  var c = domina.domina.events.ancestor_nodes.call(null, domina.domina.single_node.call(null, a)), d = cljs.core.seq.call(null, c);
  if(cljs.core.truth_(d)) {
    for(var e = cljs.core.first.call(null, d);;) {
      if(!cljs.core.truth_(e.propagationStopped)) {
        b.currentTarget = e, goog.events.fireListeners.call(null, e, b.type, !0, b)
      }
      e = cljs.core.next.call(null, d);
      if(cljs.core.truth_(e)) {
        d = e, e = cljs.core.first.call(null, d)
      }else {
        break
      }
    }
  }
  e = cljs.core.seq.call(null, cljs.core.reverse.call(null, c));
  if(cljs.core.truth_(e)) {
    for(c = cljs.core.first.call(null, e);;) {
      if(!cljs.core.truth_(c.propagationStopped)) {
        b.currentTarget = c, goog.events.fireListeners.call(null, c, b.type, !1, b)
      }
      c = cljs.core.next.call(null, e);
      if(cljs.core.truth_(c)) {
        e = c, c = cljs.core.first.call(null, e)
      }else {
        break
      }
    }
  }
  return b.returnValue_
};
domina.domina.events.dispatch_event_target_BANG_ = function(a, b) {
  return goog.events.dispatchEvent.call(null, a, b)
};
domina.domina.events.is_event_target_QMARK_ = function(a) {
  var b = a.getParentEventTarget;
  return cljs.core.truth_(b) ? a.dispatchEvent : b
};
domina.domina.events.dispatch_BANG_ = function() {
  var a = null;
  return a = function(b, c, d) {
    switch(arguments.length) {
      case 2:
        return a.call(null, domina.domina.events.root_element, b, c);
      case 3:
        var e = new goog.events.Event(domina.domina.events.find_builtin_type.call(null, c)), f = cljs.core.seq.call(null, d);
        if(cljs.core.truth_(f)) {
          var g = cljs.core.first.call(null, f);
          cljs.core.nth.call(null, g, 0, null);
          for(cljs.core.nth.call(null, g, 1, null);;) {
            var h = g, g = cljs.core.nth.call(null, h, 0, null), h = cljs.core.nth.call(null, h, 1, null);
            e[g] = h;
            f = cljs.core.next.call(null, f);
            if(cljs.core.truth_(f)) {
              g = f, f = cljs.core.first.call(null, g), h = g, g = f, f = h
            }else {
              break
            }
          }
        }
        return cljs.core.truth_(domina.domina.events.is_event_target_QMARK_.call(null, b)) ? domina.domina.events.dispatch_event_target_BANG_.call(null, b, e) : domina.domina.events.dispatch_browser_BANG_.call(null, b, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
domina.domina.events.unlisten_by_key_BANG_ = function(a) {
  return goog.events.unlistenByKey.call(null, a)
};
domina.domina.events.get_listeners = function(a, b) {
  var c = domina.domina.events.find_builtin_type.call(null, b);
  return cljs.core.mapcat.call(null, function(a) {
    return goog.events.getListeners.call(null, a, c, !1)
  }, domina.domina.nodes.call(null, a))
};
cljs.reader = {};
cljs.reader.PushbackReader = {};
cljs.reader.read_char = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$reader$PushbackReader$read_char : a)) {
    a = a.cljs$reader$PushbackReader$read_char(a)
  }else {
    var b;
    b = cljs.reader.read_char[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.reader.read_char._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "PushbackReader.read-char", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.reader.unread = function(a, b) {
  var c;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$reader$PushbackReader$unread : a)) {
    c = a.cljs$reader$PushbackReader$unread(a, b)
  }else {
    c = cljs.reader.unread[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(c) && (c = cljs.reader.unread._, !cljs.core.truth_(c))) {
      throw cljs.core.missing_protocol.call(null, "PushbackReader.unread", a);
    }
    c = c.call(null, a, b)
  }
  return c
};
cljs.reader.StringPushbackReader = function(a, b, c) {
  this.s = a;
  this.index_atom = b;
  this.buffer_atom = c
};
cljs.reader.StringPushbackReader.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "cljs.reader.StringPushbackReader")
};
cljs.reader.StringPushbackReader.prototype.cljs$reader$PushbackReader$ = !0;
cljs.reader.StringPushbackReader.prototype.cljs$reader$PushbackReader$read_char = function() {
  if(cljs.core.truth_(cljs.core.empty_QMARK_.call(null, cljs.core.deref.call(null, this.buffer_atom)))) {
    var a = cljs.core.deref.call(null, this.index_atom);
    cljs.core.swap_BANG_.call(null, this.index_atom, cljs.core.inc);
    return cljs.core.nth.call(null, this.s, a)
  }
  a = cljs.core.deref.call(null, this.buffer_atom);
  cljs.core.swap_BANG_.call(null, this.buffer_atom, cljs.core.rest);
  return cljs.core.first.call(null, a)
};
cljs.reader.StringPushbackReader.prototype.cljs$reader$PushbackReader$unread = function(a, b) {
  return cljs.core.swap_BANG_.call(null, this.buffer_atom, function(a) {
    return cljs.core.cons.call(null, b, a)
  })
};
cljs.reader.push_back_reader = function(a) {
  return new cljs.reader.StringPushbackReader(a, cljs.core.atom.call(null, 0), cljs.core.atom.call(null, null))
};
cljs.reader.whitespace_QMARK_ = function(a) {
  var b = goog.string.isBreakingWhitespace.call(null, a);
  return cljs.core.truth_(b) ? b : cljs.core._EQ_.call(null, ",", a)
};
cljs.reader.numeric_QMARK_ = function(a) {
  return goog.string.isNumeric.call(null, a)
};
cljs.reader.comment_prefix_QMARK_ = function(a) {
  return cljs.core._EQ_.call(null, ";", a)
};
cljs.reader.number_literal_QMARK_ = function(a, b) {
  var c = cljs.reader.numeric_QMARK_.call(null, b);
  if(cljs.core.truth_(c)) {
    return c
  }
  c = function() {
    var a = cljs.core._EQ_.call(null, "+", b);
    return cljs.core.truth_(a) ? a : cljs.core._EQ_.call(null, "-", b)
  }();
  return cljs.core.truth_(c) ? cljs.reader.numeric_QMARK_.call(null, function() {
    var b = cljs.reader.read_char.call(null, a);
    cljs.reader.unread.call(null, a, b);
    return b
  }()) : c
};
cljs.reader.reader_error = function() {
  var a = function(a, c) {
    var d = null;
    goog.isDef(c) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    throw cljs.core.apply.call(null, cljs.core.str, d);
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = function(a) {
    cljs.core.first(a);
    a = cljs.core.rest(a);
    throw cljs.core.apply.call(null, cljs.core.str, a);
  };
  return a
}();
cljs.reader.macro_terminating_QMARK_ = function(a) {
  var b = cljs.core.not_EQ_.call(null, a, "#");
  return cljs.core.truth_(b) && (b = cljs.core.not_EQ_.call(null, a, "'"), cljs.core.truth_(b)) ? (b = cljs.core.not_EQ_.call(null, a, ":"), cljs.core.truth_(b) ? cljs.core.contains_QMARK_.call(null, cljs.reader.macros, a) : b) : b
};
cljs.reader.read_token = function(a, b) {
  for(var c = new goog.string.StringBuffer(b), d = cljs.reader.read_char.call(null, a);;) {
    if(cljs.core.truth_(function() {
      var a = cljs.core.nil_QMARK_.call(null, d);
      if(cljs.core.truth_(a)) {
        return a
      }
      a = cljs.reader.whitespace_QMARK_.call(null, d);
      return cljs.core.truth_(a) ? a : cljs.reader.macro_terminating_QMARK_.call(null, d)
    }())) {
      return cljs.reader.unread.call(null, a, d), c.toString()
    }
    c.append(d);
    var e = cljs.reader.read_char.call(null, a), d = e
  }
};
cljs.reader.skip_line = function(a) {
  for(;;) {
    var b = cljs.reader.read_char.call(null, a);
    if(cljs.core.truth_(function() {
      var a = cljs.core._EQ_.call(null, b, "n");
      if(cljs.core.truth_(a)) {
        return a
      }
      a = cljs.core._EQ_.call(null, b, "r");
      return cljs.core.truth_(a) ? a : cljs.core.nil_QMARK_.call(null, b)
    }())) {
      return a
    }
  }
};
cljs.reader.int_pattern = cljs.core.re_pattern.call(null, "([-+]?)(?:(0)|([1-9][0-9]*)|0[xX]([0-9A-Fa-f]+)|0([0-7]+)|([1-9][0-9]?)[rR]([0-9A-Za-z]+)|0[0-9]+)(N)?");
cljs.reader.ratio_pattern = cljs.core.re_pattern.call(null, "([-+]?[0-9]+)/([0-9]+)");
cljs.reader.float_pattern = cljs.core.re_pattern.call(null, "([-+]?[0-9]+(\\.[0-9]*)?([eE][-+]?[0-9]+)?)(M)?");
cljs.reader.symbol_pattern = cljs.core.re_pattern.call(null, "[:]?([^0-9/].*/)?([^0-9/][^/]*)");
cljs.reader.match_int = function(a) {
  var b = cljs.core.re_find.call(null, cljs.reader.int_pattern, a), c = cljs.core.nth.call(null, b, 2);
  if(cljs.core.truth_(cljs.core.not.call(null, function() {
    var a = void 0 === c;
    return cljs.core.truth_(a) ? a : 1 > c.length
  }()))) {
    return 0
  }
  var a = cljs.core.truth_(cljs.core._EQ_.call(null, "-", cljs.core.nth.call(null, b, 1))) ? -1 : 1, d = cljs.core.truth_(cljs.core.nth.call(null, b, 3)) ? cljs.core.Vector.fromArray([cljs.core.nth.call(null, b, 3), 10]) : cljs.core.truth_(cljs.core.nth.call(null, b, 4)) ? cljs.core.Vector.fromArray([cljs.core.nth.call(null, b, 4), 16]) : cljs.core.truth_(cljs.core.nth.call(null, b, 5)) ? cljs.core.Vector.fromArray([cljs.core.nth.call(null, b, 5), 8]) : cljs.core.truth_(cljs.core.nth.call(null, b, 
  7)) ? cljs.core.Vector.fromArray([cljs.core.nth.call(null, b, 7), parseInt.call(null, cljs.core.nth.call(null, b, 7))]) : cljs.core.truth_("\ufdd0'default") ? cljs.core.Vector.fromArray([null, null]) : null, b = cljs.core.nth.call(null, d, 0, null), d = cljs.core.nth.call(null, d, 1, null);
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, b)) ? null : a * parseInt.call(null, b, d)
};
cljs.reader.match_ratio = function(a) {
  var b = cljs.core.re_find.call(null, cljs.reader.ratio_pattern, a), a = cljs.core.nth.call(null, b, 1), b = cljs.core.nth.call(null, b, 2);
  return parseInt.call(null, a) / parseInt.call(null, b)
};
cljs.reader.match_float = function(a) {
  return parseFloat.call(null, a)
};
cljs.reader.match_number = function(a) {
  return cljs.core.truth_(cljs.core.re_matches.call(null, cljs.reader.int_pattern, a)) ? cljs.reader.match_int.call(null, a) : cljs.core.truth_(cljs.core.re_matches.call(null, cljs.reader.ratio_pattern, a)) ? cljs.reader.match_ratio.call(null, a) : cljs.core.truth_(cljs.core.re_matches.call(null, cljs.reader.float_pattern, a)) ? cljs.reader.match_float.call(null, a) : null
};
cljs.reader.escape_char_map = cljs.core.HashMap.fromArrays('t,r,n,\\,",b,f'.split(","), '\t,\r,\n,\\,",\u0008,\u000c'.split(","));
cljs.reader.read_unicode_char = function(a) {
  return cljs.reader.reader_error.call(null, a, "Unicode characters not supported by reader (yet)")
};
cljs.reader.escape_char = function(a, b) {
  var c = cljs.reader.read_char.call(null, b), d = cljs.core.get.call(null, cljs.reader.escape_char_map, c);
  return cljs.core.truth_(d) ? d : cljs.core.truth_(function() {
    var a = cljs.core._EQ_.call(null, "u", c);
    return cljs.core.truth_(a) ? a : cljs.reader.numeric_QMARK_.call(null, c)
  }()) ? cljs.reader.read_unicode_char.call(null, b, c) : cljs.reader.reader_error.call(null, b, "Unsupported escape charater: \\", c)
};
cljs.reader.read_past = function(a, b) {
  for(var c = cljs.reader.read_char.call(null, b);;) {
    if(cljs.core.truth_(a.call(null, c))) {
      c = cljs.reader.read_char.call(null, b)
    }else {
      return c
    }
  }
};
cljs.reader.read_delimited_list = function(a, b, c) {
  for(var d = cljs.core.Vector.fromArray([]);;) {
    var e = cljs.reader.read_past.call(null, cljs.reader.whitespace_QMARK_, b);
    cljs.core.truth_(e) || cljs.reader.reader_error.call(null, b, "EOF");
    if(cljs.core.truth_(cljs.core._EQ_.call(null, a, e))) {
      return d
    }
    var f = cljs.core.get.call(null, cljs.reader.macros, e);
    cljs.core.truth_(f) ? e = f.call(null, b, e) : (cljs.reader.unread.call(null, b, e), e = cljs.reader.read.call(null, b, !0, null, c));
    d = cljs.core.truth_(cljs.core._EQ_.call(null, e, b)) ? d : cljs.core.conj.call(null, d, e)
  }
};
cljs.reader.not_implemented = function(a, b) {
  return cljs.reader.reader_error.call(null, a, "Reader for ", b, " not implemented yet")
};
cljs.reader.read_dispatch = function(a, b) {
  var c = cljs.reader.read_char.call(null, a), d = cljs.core.get.call(null, cljs.reader.dispatch_macros, c);
  return cljs.core.truth_(d) ? d.call(null, a, b) : cljs.reader.reader_error.call(null, a, "No dispatch macro for ", c)
};
cljs.reader.read_unmatched_delimiter = function(a, b) {
  return cljs.reader.reader_error.call(null, a, "Unmached delimiter ", b)
};
cljs.reader.read_list = function(a) {
  return cljs.core.apply.call(null, cljs.core.list, cljs.reader.read_delimited_list.call(null, ")", a, !0))
};
cljs.reader.read_comment = cljs.reader.skip_line;
cljs.reader.read_vector = function(a) {
  return cljs.reader.read_delimited_list.call(null, "]", a, !0)
};
cljs.reader.read_map = function(a) {
  var b = cljs.reader.read_delimited_list.call(null, "}", a, !0);
  cljs.core.truth_(cljs.core.odd_QMARK_.call(null, cljs.core.count.call(null, b))) && cljs.reader.reader_error.call(null, a, "Map literal must contain an even number of forms");
  return cljs.core.apply.call(null, cljs.core.hash_map, b)
};
cljs.reader.read_number = function(a, b) {
  for(var c = new goog.string.StringBuffer(b), d = cljs.reader.read_char.call(null, a);;) {
    if(cljs.core.truth_(function() {
      var a = cljs.core.nil_QMARK_.call(null, d);
      if(cljs.core.truth_(a)) {
        return a
      }
      a = cljs.reader.whitespace_QMARK_.call(null, d);
      return cljs.core.truth_(a) ? a : cljs.core.contains_QMARK_.call(null, cljs.reader.macros, d)
    }())) {
      cljs.reader.unread.call(null, a, d);
      var e = c.toString(), c = cljs.reader.match_number.call(null, e);
      return cljs.core.truth_(c) ? c : cljs.reader.reader_error.call(null, a, "Invalid number format [", e, "]")
    }
    c.append(d);
    d = e = cljs.reader.read_char.call(null, a)
  }
};
cljs.reader.read_string = function(a) {
  for(var b = new goog.string.StringBuffer, c = cljs.reader.read_char.call(null, a);;) {
    if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, c))) {
      return cljs.reader.reader_error.call(null, a, "EOF while reading string")
    }
    if(cljs.core.truth_(cljs.core._EQ_.call(null, "\\", c))) {
      b.append(cljs.reader.escape_char.call(null, b, a)), c = cljs.reader.read_char.call(null, a)
    }else {
      if(cljs.core.truth_(cljs.core._EQ_.call(null, '"', c))) {
        return b.toString()
      }
      if(cljs.core.truth_("\ufdd0'default")) {
        b.append(c), c = cljs.reader.read_char.call(null, a)
      }else {
        return null
      }
    }
  }
};
cljs.reader.special_symbols = cljs.core.ObjMap.fromObject(["nil", "true", "false"], {nil:null, "true":!0, "false":!1});
cljs.reader.read_symbol = function(a, b) {
  var c = cljs.reader.read_token.call(null, a, b);
  return cljs.core.truth_(goog.string.contains.call(null, c, "/")) ? cljs.core.symbol.call(null, cljs.core.subs.call(null, c, 0, c.indexOf("/")), cljs.core.subs.call(null, c, c.indexOf("/") + 1, c.length)) : cljs.core.get.call(null, cljs.reader.special_symbols, c, cljs.core.symbol.call(null, c))
};
cljs.reader.read_keyword = function(a) {
  var b = cljs.reader.read_token.call(null, a, cljs.reader.read_char.call(null, a)), b = cljs.core.re_matches.call(null, cljs.reader.symbol_pattern, b), c = cljs.core.nth.call(null, b, 0, null), d = cljs.core.nth.call(null, b, 1, null), e = cljs.core.nth.call(null, b, 2, null);
  return cljs.core.truth_(function() {
    var a;
    a = cljs.core.not.call(null, void 0 === d);
    a = cljs.core.truth_(a) ? ":/" === d.substring(d.length - 2, d.length) : a;
    if(cljs.core.truth_(a)) {
      return a
    }
    a = ":" === e[e.length - 1];
    return cljs.core.truth_(a) ? a : cljs.core.not.call(null, -1 === c.indexOf("::", 1))
  }()) ? cljs.reader.reader_error.call(null, a, "Invalid token: ", c) : cljs.core.truth_(cljs.reader.ns_QMARK_) ? cljs.core.keyword.call(null, d.substring(0, d.indexOf("/")), e) : cljs.core.keyword.call(null, c)
};
cljs.reader.desugar_meta = function(a) {
  return cljs.core.truth_(cljs.core.symbol_QMARK_.call(null, a)) ? cljs.core.ObjMap.fromObject(["\ufdd0'tag"], {"\ufdd0'tag":a}) : cljs.core.truth_(cljs.core.string_QMARK_.call(null, a)) ? cljs.core.ObjMap.fromObject(["\ufdd0'tag"], {"\ufdd0'tag":a}) : cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, a)) ? cljs.core.HashMap.fromArrays([a], [!0]) : cljs.core.truth_("\ufdd0'else") ? a : null
};
cljs.reader.wrapping_reader = function(a) {
  return function(b) {
    return cljs.core.list.call(null, a, cljs.reader.read.call(null, b, !0, null, !0))
  }
};
cljs.reader.throwing_reader = function(a) {
  return function(b) {
    return cljs.reader.reader_error.call(null, b, a)
  }
};
cljs.reader.read_meta = function(a) {
  var b = cljs.reader.desugar_meta.call(null, cljs.reader.read.call(null, a, !0, null, !0));
  cljs.core.truth_(cljs.core.map_QMARK_.call(null, b)) || cljs.reader.reader_error.call(null, a, "Metadata must be Symbol,Keyword,String or Map");
  var c = cljs.reader.read.call(null, a, !0, null, !0);
  return cljs.core.truth_(function() {
    return cljs.core.truth_(function() {
      if(cljs.core.truth_(c)) {
        var a = c.cljs$core$IWithMeta$;
        return cljs.core.truth_(a) ? cljs.core.not.call(null, c.hasOwnProperty("cljs$core$IWithMeta$")) : a
      }
      return c
    }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.IWithMeta, c)
  }()) ? cljs.core.with_meta.call(null, c, cljs.core.merge.call(null, cljs.core.meta.call(null, c), b)) : cljs.reader.reader_error.call(null, a, "Metadata can only be applied to IWithMetas")
};
cljs.reader.read_set = function(a) {
  return cljs.core.set.call(null, cljs.reader.read_delimited_list.call(null, "}", a, !0))
};
cljs.reader.read_regex = function(a, b) {
  return cljs.core.re_pattern.call(null, cljs.reader.read_string.call(null, a, b))
};
cljs.reader.read_discard = function(a) {
  cljs.reader.read.call(null, a, !0, null, !0);
  return a
};
cljs.reader.macros = cljs.core.HashMap.fromArrays("@,`,\",#,%,',(,),:,;,[,{,\\,],},^,~".split(","), [cljs.reader.wrapping_reader.call(null, "\ufdd1'deref"), cljs.reader.not_implemented, cljs.reader.read_string, cljs.reader.read_dispatch, cljs.reader.not_implemented, cljs.reader.wrapping_reader.call(null, "\ufdd1'quote"), cljs.reader.read_list, cljs.reader.read_unmatched_delimiter, cljs.reader.read_keyword, cljs.reader.not_implemented, cljs.reader.read_vector, cljs.reader.read_map, cljs.reader.read_char, 
cljs.reader.read_unmatched_delimiter, cljs.reader.read_unmatched_delimiter, cljs.reader.read_meta, cljs.reader.not_implemented]);
cljs.reader.dispatch_macros = cljs.core.ObjMap.fromObject(["{", "<", '"', "!", "_"], {"{":cljs.reader.read_set, "<":cljs.reader.throwing_reader.call(null, "Unreadable form"), '"':cljs.reader.read_regex, "!":cljs.reader.read_comment, _:cljs.reader.read_discard});
cljs.reader.read = function(a, b, c) {
  for(;;) {
    var d = cljs.reader.read_char.call(null, a);
    if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, d))) {
      return cljs.core.truth_(b) ? cljs.reader.reader_error.call(null, a, "EOF") : c
    }
    if(!cljs.core.truth_(cljs.reader.whitespace_QMARK_.call(null, d))) {
      if(cljs.core.truth_(cljs.reader.comment_prefix_QMARK_.call(null, d))) {
        a = cljs.reader.read_comment.call(null, a, d)
      }else {
        if(cljs.core.truth_("\ufdd0'else")) {
          if(d = cljs.core.truth_(cljs.reader.macros.call(null, d)) ? cljs.reader.macros.call(null, d).call(null, a, d) : cljs.core.truth_(cljs.reader.number_literal_QMARK_.call(null, a, d)) ? cljs.reader.read_number.call(null, a, d) : cljs.core.truth_("\ufdd0'else") ? cljs.reader.read_symbol.call(null, a, d) : null, !cljs.core.truth_(cljs.core._EQ_.call(null, d, a))) {
            return d
          }
        }else {
          return null
        }
      }
    }
  }
};
cljs.reader.read_string = function(a) {
  a = cljs.reader.push_back_reader.call(null, a);
  return cljs.reader.read.call(null, a, !0, null, !1)
};
clojure.browser.net = {};
clojure.browser.net._STAR_timeout_STAR_ = 1E4;
clojure.browser.net.event_types = cljs.core.into.call(null, cljs.core.ObjMap.fromObject([], {}), cljs.core.map.call(null, function(a) {
  var b = cljs.core.nth.call(null, a, 0, null), a = cljs.core.nth.call(null, a, 1, null);
  return cljs.core.Vector.fromArray([cljs.core.keyword.call(null, b.toLowerCase()), a])
}, cljs.core.merge.call(null, cljs.core.js__GT_clj.call(null, goog.net.EventType))));
clojure.browser.net.IConnection = {};
clojure.browser.net.connect = function() {
  var a = null;
  return function(a, c, d, e) {
    switch(arguments.length) {
      case 1:
        var f;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.clojure$browser$net$IConnection$connect : a)) {
          f = a.clojure$browser$net$IConnection$connect(a)
        }else {
          f = clojure.browser.net.connect[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(f) && (f = clojure.browser.net.connect._, !cljs.core.truth_(f))) {
            throw cljs.core.missing_protocol.call(null, "IConnection.connect", a);
          }
          f = f.call(null, a)
        }
        return f;
      case 2:
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.clojure$browser$net$IConnection$connect : a)) {
          f = a.clojure$browser$net$IConnection$connect(a, c)
        }else {
          f = clojure.browser.net.connect[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(f) && (f = clojure.browser.net.connect._, !cljs.core.truth_(f))) {
            throw cljs.core.missing_protocol.call(null, "IConnection.connect", a);
          }
          f = f.call(null, a, c)
        }
        return f;
      case 3:
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.clojure$browser$net$IConnection$connect : a)) {
          f = a.clojure$browser$net$IConnection$connect(a, c, d)
        }else {
          f = clojure.browser.net.connect[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(f) && (f = clojure.browser.net.connect._, !cljs.core.truth_(f))) {
            throw cljs.core.missing_protocol.call(null, "IConnection.connect", a);
          }
          f = f.call(null, a, c, d)
        }
        return f;
      case 4:
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.clojure$browser$net$IConnection$connect : a)) {
          f = a.clojure$browser$net$IConnection$connect(a, c, d, e)
        }else {
          f = clojure.browser.net.connect[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(f) && (f = clojure.browser.net.connect._, !cljs.core.truth_(f))) {
            throw cljs.core.missing_protocol.call(null, "IConnection.connect", a);
          }
          f = f.call(null, a, c, d, e)
        }
        return f
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
clojure.browser.net.transmit = function() {
  var a = null;
  return function(a, c, d, e, f, g) {
    switch(arguments.length) {
      case 2:
        var h;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.clojure$browser$net$IConnection$transmit : a)) {
          h = a.clojure$browser$net$IConnection$transmit(a, c)
        }else {
          h = clojure.browser.net.transmit[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(h) && (h = clojure.browser.net.transmit._, !cljs.core.truth_(h))) {
            throw cljs.core.missing_protocol.call(null, "IConnection.transmit", a);
          }
          h = h.call(null, a, c)
        }
        return h;
      case 3:
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.clojure$browser$net$IConnection$transmit : a)) {
          h = a.clojure$browser$net$IConnection$transmit(a, c, d)
        }else {
          h = clojure.browser.net.transmit[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(h) && (h = clojure.browser.net.transmit._, !cljs.core.truth_(h))) {
            throw cljs.core.missing_protocol.call(null, "IConnection.transmit", a);
          }
          h = h.call(null, a, c, d)
        }
        return h;
      case 4:
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.clojure$browser$net$IConnection$transmit : a)) {
          h = a.clojure$browser$net$IConnection$transmit(a, c, d, e)
        }else {
          h = clojure.browser.net.transmit[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(h) && (h = clojure.browser.net.transmit._, !cljs.core.truth_(h))) {
            throw cljs.core.missing_protocol.call(null, "IConnection.transmit", a);
          }
          h = h.call(null, a, c, d, e)
        }
        return h;
      case 5:
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.clojure$browser$net$IConnection$transmit : a)) {
          h = a.clojure$browser$net$IConnection$transmit(a, c, d, e, f)
        }else {
          h = clojure.browser.net.transmit[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(h) && (h = clojure.browser.net.transmit._, !cljs.core.truth_(h))) {
            throw cljs.core.missing_protocol.call(null, "IConnection.transmit", a);
          }
          h = h.call(null, a, c, d, e, f)
        }
        return h;
      case 6:
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.clojure$browser$net$IConnection$transmit : a)) {
          h = a.clojure$browser$net$IConnection$transmit(a, c, d, e, f, g)
        }else {
          h = clojure.browser.net.transmit[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(h) && (h = clojure.browser.net.transmit._, !cljs.core.truth_(h))) {
            throw cljs.core.missing_protocol.call(null, "IConnection.transmit", a);
          }
          h = h.call(null, a, c, d, e, f, g)
        }
        return h
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
clojure.browser.net.close = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.clojure$browser$net$IConnection$close : a)) {
    a = a.clojure$browser$net$IConnection$close(a)
  }else {
    var b;
    b = clojure.browser.net.close[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = clojure.browser.net.close._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IConnection.close", a);
    }
    a = b.call(null, a)
  }
  return a
};
goog.net.XhrIo.prototype.clojure$browser$event$EventType$ = !0;
goog.net.XhrIo.prototype.clojure$browser$event$EventType$event_types = function() {
  return cljs.core.into.call(null, cljs.core.ObjMap.fromObject([], {}), cljs.core.map.call(null, function(a) {
    var b = cljs.core.nth.call(null, a, 0, null), a = cljs.core.nth.call(null, a, 1, null);
    return cljs.core.Vector.fromArray([cljs.core.keyword.call(null, b.toLowerCase()), a])
  }, cljs.core.merge.call(null, cljs.core.js__GT_clj.call(null, goog.net.EventType))))
};
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$ = !0;
goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit = function() {
  var a = null;
  return function(a, c, d, e, f, g) {
    switch(arguments.length) {
      case 2:
        return clojure.browser.net.transmit.call(null, a, c, "GET", null, null, clojure.browser.net._STAR_timeout_STAR_);
      case 3:
        return clojure.browser.net.transmit.call(null, a, c, d, null, null, clojure.browser.net._STAR_timeout_STAR_);
      case 4:
        return clojure.browser.net.transmit.call(null, a, c, d, e, null, clojure.browser.net._STAR_timeout_STAR_);
      case 5:
        return clojure.browser.net.transmit.call(null, a, c, d, e, f, clojure.browser.net._STAR_timeout_STAR_);
      case 6:
        return a.setTimeoutInterval(g), a.send(c, d, e, f)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
clojure.browser.net.xpc_config_fields = cljs.core.into.call(null, cljs.core.ObjMap.fromObject([], {}), cljs.core.map.call(null, function(a) {
  var b = cljs.core.nth.call(null, a, 0, null), a = cljs.core.nth.call(null, a, 1, null);
  return cljs.core.Vector.fromArray([cljs.core.keyword.call(null, b.toLowerCase()), a])
}, cljs.core.js__GT_clj.call(null, goog.net.xpc.CfgFields)));
clojure.browser.net.xhr_connection = function() {
  return new goog.net.XhrIo
};
clojure.browser.net.ICrossPageChannel = {};
clojure.browser.net.register_service = function() {
  var a = null;
  return function(a, c, d, e) {
    switch(arguments.length) {
      case 3:
        var f;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.clojure$browser$net$ICrossPageChannel$register_service : a)) {
          f = a.clojure$browser$net$ICrossPageChannel$register_service(a, c, d)
        }else {
          f = clojure.browser.net.register_service[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(f) && (f = clojure.browser.net.register_service._, !cljs.core.truth_(f))) {
            throw cljs.core.missing_protocol.call(null, "ICrossPageChannel.register-service", a);
          }
          f = f.call(null, a, c, d)
        }
        return f;
      case 4:
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.clojure$browser$net$ICrossPageChannel$register_service : a)) {
          f = a.clojure$browser$net$ICrossPageChannel$register_service(a, c, d, e)
        }else {
          f = clojure.browser.net.register_service[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(f) && (f = clojure.browser.net.register_service._, !cljs.core.truth_(f))) {
            throw cljs.core.missing_protocol.call(null, "ICrossPageChannel.register-service", a);
          }
          f = f.call(null, a, c, d, e)
        }
        return f
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$ = !0;
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$connect = function() {
  var a = null;
  return function(a, c, d, e) {
    switch(arguments.length) {
      case 1:
        return clojure.browser.net.connect.call(null, a, null);
      case 2:
        return a.connect(c);
      case 3:
        return clojure.browser.net.connect.call(null, a, c, d, document.body);
      case 4:
        return a.createPeerIframe(e, d), a.connect(c)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$transmit = function(a, b, c) {
  return a.send(cljs.core.name.call(null, b), c)
};
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$close = function(a) {
  return a.close(cljs.core.List.EMPTY)
};
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$ICrossPageChannel$ = !0;
goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$ICrossPageChannel$register_service = function() {
  var a = null;
  return function(a, c, d, e) {
    switch(arguments.length) {
      case 3:
        return clojure.browser.net.register_service.call(null, a, c, d, !1);
      case 4:
        return a.registerService(cljs.core.name.call(null, c), d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
clojure.browser.net.xpc_connection = function() {
  var a = null, b = function(a) {
    return new goog.net.xpc.CrossPageChannel(cljs.core.reduce.call(null, function(a, b) {
      var c = cljs.core.nth.call(null, b, 0, null), g = cljs.core.nth.call(null, b, 1, null), c = cljs.core.get.call(null, clojure.browser.net.xpc_config_fields, c);
      return cljs.core.truth_(c) ? cljs.core.assoc.call(null, a, c, g) : a
    }, cljs.core.ObjMap.fromObject([], {}), a).strobj)
  };
  return function(a) {
    switch(arguments.length) {
      case 0:
        var d;
        d = (new goog.Uri(window.location.href)).getParameterValue("xpc");
        d = cljs.core.truth_(d) ? new goog.net.xpc.CrossPageChannel(goog.json.parse.call(null, d)) : null;
        return d;
      case 1:
        return b.call(this, a)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
one.browser = {};
one.browser.remote = {};
one.browser.remote.responders = cljs.core.atom.call(null, cljs.core.ObjMap.fromObject([], {}));
one.browser.remote.add_responders = function(a, b, c) {
  return cljs.core.truth_(cljs.core.truth_(b) ? b : c) ? cljs.core.swap_BANG_.call(null, one.browser.remote.responders, cljs.core.assoc, a, cljs.core.ObjMap.fromObject(["\ufdd0'success", "\ufdd0'error"], {"\ufdd0'success":b, "\ufdd0'error":c})) : null
};
goog.net.XhrManager.prototype.clojure$browser$event$EventType$ = !0;
goog.net.XhrManager.prototype.clojure$browser$event$EventType$event_types = function() {
  return cljs.core.into.call(null, cljs.core.ObjMap.fromObject([], {}), cljs.core.map.call(null, function(a) {
    var b = cljs.core.nth.call(null, a, 0, null), a = cljs.core.nth.call(null, a, 1, null);
    return cljs.core.Vector.fromArray([cljs.core.keyword.call(null, b.toLowerCase()), a])
  }, cljs.core.js__GT_clj.call(null, goog.net.EventType)))
};
one.browser.remote._STAR_xhr_manager_STAR_ = new goog.net.XhrManager(null, null, null, 0, 5E3);
one.browser.remote.request = function() {
  var a = function(a, b, e) {
    var f = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, e)) ? cljs.core.apply.call(null, cljs.core.hash_map, e) : e, e = cljs.core.get.call(null, f, "\ufdd0'on-error"), g = cljs.core.get.call(null, f, "\ufdd0'on-success"), h = cljs.core.get.call(null, f, "\ufdd0'retries", 0), i = cljs.core.get.call(null, f, "\ufdd0'priority"), j = cljs.core.get.call(null, f, "\ufdd0'headers"), k = cljs.core.get.call(null, f, "\ufdd0'content"), f = cljs.core.get.call(null, f, "\ufdd0'method", "GET"), j = ttmachines.client.util.map__GT_js.call(null, 
    cljs.core.merge.call(null, j, cljs.core.ObjMap.fromObject(["X-Requested-With"], {"X-Requested-With":"XMLHttpRequest"})));
    try {
      return one.browser.remote.add_responders.call(null, a, g, e), one.browser.remote._STAR_xhr_manager_STAR_.send(a, b, f, k, j, i, null, h)
    }catch(l) {
      if(cljs.core.truth_(cljs.core.instance_QMARK_.call(null, Error, l))) {
        return null
      }
      if(cljs.core.truth_("\ufdd0'else")) {
        throw l;
      }
      return null
    }
  }, b = function(b, d, e) {
    var f = null;
    goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
    return a.call(this, d, e, b)
  };
  return b
}();
one.browser.remote.response_success = function(a) {
  var b = cljs.core.get.call(null, cljs.core.deref.call(null, one.browser.remote.responders), "\ufdd0'id".call(null, a));
  return cljs.core.truth_(b) ? (b = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, b)) ? cljs.core.apply.call(null, cljs.core.hash_map, b) : b, cljs.core.get.call(null, b, "\ufdd0'success").call(null, a), cljs.core.swap_BANG_.call(null, one.browser.remote.responders, cljs.core.dissoc, "\ufdd0'id".call(null, a))) : null
};
one.browser.remote.response_error = function(a) {
  var b = cljs.core.get.call(null, cljs.core.deref.call(null, one.browser.remote.responders), "\ufdd0'id".call(null, a));
  return cljs.core.truth_(b) ? (b = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, b)) ? cljs.core.apply.call(null, cljs.core.hash_map, b) : b, cljs.core.get.call(null, b, "\ufdd0'error").call(null, a), cljs.core.swap_BANG_.call(null, one.browser.remote.responders, cljs.core.dissoc, "\ufdd0'id".call(null, a))) : null
};
one.browser.remote.response_received = function(a, b) {
  return a.call(null, cljs.core.ObjMap.fromObject(["\ufdd0'id", "\ufdd0'body", "\ufdd0'status", "\ufdd0'event"], {"\ufdd0'id":b.id, "\ufdd0'body":b.xhrIo.getResponseText(), "\ufdd0'status":b.xhrIo.getStatus(), "\ufdd0'event":b}))
};
clojure.browser.event.listen.call(null, one.browser.remote._STAR_xhr_manager_STAR_, "success", cljs.core.partial.call(null, one.browser.remote.response_received, one.browser.remote.response_success));
clojure.browser.event.listen.call(null, one.browser.remote._STAR_xhr_manager_STAR_, "error", cljs.core.partial.call(null, one.browser.remote.response_received, one.browser.remote.response_error));
ttmachines.client.request = {};
ttmachines.client.request.request_id = cljs.core.atom.call(null, 0);
ttmachines.client.request.get_page = function(a) {
  return one.browser.remote.request.call(null, cljs.core.str.call(null, "request-", cljs.core.swap_BANG_.call(null, ttmachines.client.request.request_id, cljs.core.inc)), a, "\ufdd0'method", "GET", "\ufdd0'on-success", function(a) {
    return one.dispatch.fire.call(null, "\ufdd0'switch-page", cljs.reader.read_string.call(null, a.call(null, "\ufdd0'body")))
  })
};
clojure.browser.repl = {};
clojure.browser.repl.xpc_connection = cljs.core.atom.call(null, null);
clojure.browser.repl.repl_print = function(a) {
  var b = cljs.core.deref.call(null, clojure.browser.repl.xpc_connection);
  return cljs.core.truth_(b) ? clojure.browser.net.transmit.call(null, b, "\ufdd0'print", cljs.core.pr_str.call(null, a)) : null
};
clojure.browser.repl.evaluate_javascript = function(a, b) {
  var c = function() {
    try {
      return cljs.core.ObjMap.fromObject(["\ufdd0'status", "\ufdd0'value"], {"\ufdd0'status":"\ufdd0'success", "\ufdd0'value":cljs.core.str.call(null, eval(b))})
    }catch(a) {
      if(cljs.core.truth_(cljs.core.instance_QMARK_.call(null, Error, a))) {
        return cljs.core.ObjMap.fromObject(["\ufdd0'status", "\ufdd0'value", "\ufdd0'stacktrace"], {"\ufdd0'status":"\ufdd0'exception", "\ufdd0'value":cljs.core.pr_str.call(null, a), "\ufdd0'stacktrace":cljs.core.truth_(a.hasOwnProperty("stack")) ? a.stack : "No stacktrace available."})
      }
      if(cljs.core.truth_("\ufdd0'else")) {
        throw a;
      }
      return null
    }
  }();
  return cljs.core.pr_str.call(null, c)
};
clojure.browser.repl.send_result = function(a, b, c) {
  return clojure.browser.net.transmit.call(null, a, b, "POST", c, null, 0)
};
clojure.browser.repl.send_print = function() {
  var a = null, b = function(b, d, e) {
    var f = clojure.browser.net.xhr_connection.call(null);
    clojure.browser.event.listen.call(null, f, "\ufdd0'error", function() {
      return cljs.core.truth_(10 > e) ? a.call(null, b, d, e + 1) : console.log(cljs.core.str.call(null, "Could not send ", d, " after ", e, " attempts."))
    });
    return clojure.browser.net.transmit.call(null, f, b, "POST", d, null, 0)
  };
  return a = function(c, d, e) {
    switch(arguments.length) {
      case 2:
        return a.call(null, c, d, 0);
      case 3:
        return b.call(this, c, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
clojure.browser.repl.order = cljs.core.atom.call(null, 0);
clojure.browser.repl.wrap_message = function(a, b) {
  return cljs.core.pr_str.call(null, cljs.core.ObjMap.fromObject(["\ufdd0'type", "\ufdd0'content", "\ufdd0'order"], {"\ufdd0'type":a, "\ufdd0'content":b, "\ufdd0'order":cljs.core.swap_BANG_.call(null, clojure.browser.repl.order, cljs.core.inc)}))
};
clojure.browser.repl.start_evaluator = function(a) {
  var b = clojure.browser.net.xpc_connection.call(null);
  if(cljs.core.truth_(b)) {
    var c = clojure.browser.net.xhr_connection.call(null);
    clojure.browser.event.listen.call(null, c, "\ufdd0'success", function(a) {
      return clojure.browser.net.transmit.call(null, b, "\ufdd0'evaluate-javascript", a.currentTarget.getResponseText(cljs.core.List.EMPTY))
    });
    clojure.browser.net.register_service.call(null, b, "\ufdd0'send-result", function(b) {
      return clojure.browser.repl.send_result.call(null, c, a, clojure.browser.repl.wrap_message.call(null, "\ufdd0'result", b))
    });
    clojure.browser.net.register_service.call(null, b, "\ufdd0'print", function(b) {
      return clojure.browser.repl.send_print.call(null, a, clojure.browser.repl.wrap_message.call(null, "\ufdd0'print", b))
    });
    clojure.browser.net.connect.call(null, b, cljs.core.constantly.call(null, null));
    return setTimeout.call(null, function() {
      return clojure.browser.repl.send_result.call(null, c, a, clojure.browser.repl.wrap_message.call(null, "\ufdd0'ready", "ready"))
    }, 50)
  }
  return alert.call(null, "No 'xpc' param provided to child iframe.")
};
clojure.browser.repl.connect = function(a) {
  var b = clojure.browser.net.xpc_connection.call(null, cljs.core.ObjMap.fromObject(["\ufdd0'peer_uri"], {"\ufdd0'peer_uri":a}));
  cljs.core.swap_BANG_.call(null, clojure.browser.repl.xpc_connection, cljs.core.constantly.call(null, b));
  clojure.browser.net.register_service.call(null, b, "\ufdd0'evaluate-javascript", function(a) {
    return clojure.browser.net.transmit.call(null, b, "\ufdd0'send-result", clojure.browser.repl.evaluate_javascript.call(null, b, a))
  });
  return clojure.browser.net.connect.call(null, b, cljs.core.constantly.call(null, null), function(a) {
    return a.style.display = "none"
  })
};
ttmachines.client.layout = {};
ttmachines.client.layout.init = function() {
  ttmachines.client.request.get_page.call(null, ttmachines.client.util.path_name.call(null));
  return clojure.browser.repl.connect.call(null, "http://localhost:9000/repl")
};
ttmachines.client.layout.set_content_BANG_ = function(a, b) {
  var c = domina.domina.css.sel.call(null, a);
  domina.domina.destroy_children_BANG_.call(null, c);
  return domina.domina.append_BANG_.call(null, c, b)
};
ttmachines.client.layout.state = cljs.core.ObjMap.fromObject(["\ufdd0'headline", "\ufdd0'text", "\ufdd0'main", "\ufdd0'below-main", "\ufdd0'sidebar"], {"\ufdd0'headline":cljs.core.atom.call(null, null), "\ufdd0'text":cljs.core.atom.call(null, null), "\ufdd0'main":cljs.core.atom.call(null, null), "\ufdd0'below-main":cljs.core.atom.call(null, null), "\ufdd0'sidebar":cljs.core.atom.call(null, null)});
ttmachines.client.layout.targets = cljs.core.ObjMap.fromObject(["\ufdd0'headline", "\ufdd0'text", "\ufdd0'main", "\ufdd0'below-main", "\ufdd0'sidebar"], {"\ufdd0'headline":"#headline", "\ufdd0'text":"#text", "\ufdd0'main":"#main", "\ufdd0'below-main":"#below-main", "\ufdd0'sidebar":"#sidebar"});
ttmachines.client.layout.dom_watchers = cljs.core.zipmap.call(null, cljs.core.keys.call(null, ttmachines.client.layout.state), cljs.core.map.call(null, function(a) {
  return cljs.core.partial.call(null, ttmachines.client.layout.set_content_BANG_, a)
}, cljs.core.vals.call(null, ttmachines.client.layout.targets)));
cljs.core.add_watch.call(null, ttmachines.client.layout.state.call(null, "\ufdd0'headline"), "\ufdd0'alter-dom", function(a, b, c, d) {
  return ttmachines.client.layout.dom_watchers.call(null, "\ufdd0'headline").call(null, d)
});
cljs.core.add_watch.call(null, ttmachines.client.layout.state.call(null, "\ufdd0'text"), "\ufdd0'alter-dom", function(a, b, c, d) {
  return ttmachines.client.layout.dom_watchers.call(null, "\ufdd0'text").call(null, d)
});
cljs.core.add_watch.call(null, ttmachines.client.layout.state.call(null, "\ufdd0'main"), "\ufdd0'alter-dom", function(a, b, c, d) {
  return ttmachines.client.layout.dom_watchers.call(null, "\ufdd0'main").call(null, d)
});
cljs.core.add_watch.call(null, ttmachines.client.layout.state.call(null, "\ufdd0'below-main"), "\ufdd0'alter-dom", function(a, b, c, d) {
  return ttmachines.client.layout.dom_watchers.call(null, "\ufdd0'below-main").call(null, d)
});
cljs.core.add_watch.call(null, ttmachines.client.layout.state.call(null, "\ufdd0'sidebar"), "\ufdd0'alter-dom", function(a, b, c, d) {
  return ttmachines.client.layout.dom_watchers.call(null, "\ufdd0'sidebar").call(null, d)
});
ttmachines.client.layout.load_state = function(a) {
  a = cljs.core.seq.call(null, a.call(null, "\ufdd0'layout"));
  if(cljs.core.truth_(a)) {
    var b = cljs.core.first.call(null, a);
    cljs.core.nth.call(null, b, 0, null);
    for(cljs.core.nth.call(null, b, 1, null);;) {
      var c = b, b = cljs.core.nth.call(null, c, 0, null), c = cljs.core.nth.call(null, c, 1, null);
      cljs.core.truth_(cljs.core.contains_QMARK_.call(null, ttmachines.client.layout.state, b)) && cljs.core.reset_BANG_.call(null, ttmachines.client.layout.state.call(null, b), c);
      a = cljs.core.next.call(null, a);
      if(cljs.core.truth_(a)) {
        b = a, a = cljs.core.first.call(null, b), c = b, b = a, a = c
      }else {
        return null
      }
    }
  }else {
    return null
  }
};
ttmachines.client.layout.update_nav_li = function(a) {
  domina.domina.remove_class_BANG_.call(null, domina.domina.css.sel.call(null, "#nav li"), "active");
  var b = cljs.core.seq.call(null, domina.domina.nodes.call(null, domina.domina.css.sel.call(null, "#nav li")));
  if(cljs.core.truth_(b)) {
    for(var c = cljs.core.first.call(null, b);;) {
      var d = cljs.core.first.call(null, domina.domina.children.call(null, c));
      cljs.core.truth_(cljs.core._EQ_.call(null, domina.domina.attr.call(null, d, "\ufdd0'href"), a)) && domina.domina.add_class_BANG_.call(null, c, "active");
      c = cljs.core.next.call(null, b);
      if(cljs.core.truth_(c)) {
        b = c, c = cljs.core.first.call(null, b)
      }else {
        return null
      }
    }
  }else {
    return null
  }
};
domina.domina.events.listen_BANG_.call(null, domina.domina.css.sel.call(null, "#nav a"), "\ufdd0'click", function(a) {
  domina.domina.events.prevent_default.call(null, a);
  a = domina.domina.events.target.call(null, a);
  a = domina.domina.attr.call(null, a, "\ufdd0'href");
  return one.dispatch.fire.call(null, "\ufdd0'link-clicked", cljs.core.ObjMap.fromObject(["\ufdd0'url"], {"\ufdd0'url":a}))
});
one.dispatch.react_to.call(null, cljs.core.set(["\ufdd0'link-clicked"]), cljs.core.ObjMap.fromObject(["\ufdd0'priority"], {"\ufdd0'priority":1}), function(a, b) {
  var c = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, b)) ? cljs.core.apply.call(null, cljs.core.hash_map, b) : b, c = cljs.core.get.call(null, c, "\ufdd0'url");
  return ttmachines.client.history.push_state_BANG_.call(null, "\ufdd0'url", c)
});
one.dispatch.react_to.call(null, cljs.core.set(["\ufdd0'history-state-change"]), cljs.core.ObjMap.fromObject(["\ufdd0'priority"], {"\ufdd0'priority":1}), function(a, b) {
  var c = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, b)) ? cljs.core.apply.call(null, cljs.core.hash_map, b) : b, c = cljs.core.get.call(null, c, "\ufdd0'url");
  return ttmachines.client.request.get_page.call(null, c)
});
one.dispatch.react_to.call(null, cljs.core.set(["\ufdd0'switch-page"]), cljs.core.ObjMap.fromObject(["\ufdd0'max-count", "\ufdd0'priority"], {"\ufdd0'max-count":1, "\ufdd0'priority":0}), function() {
  hideLoading.call(null);
  return domina.domina.destroy_BANG_.call(null, domina.domina.css.sel.call(null, "#loading"))
});
one.dispatch.react_to.call(null, cljs.core.set(["\ufdd0'switch-page"]), cljs.core.ObjMap.fromObject(["\ufdd0'priority"], {"\ufdd0'priority":0}), function(a, b) {
  var c = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, b)) ? cljs.core.apply.call(null, cljs.core.hash_map, b) : b, c = cljs.core.get.call(null, c, "\ufdd0'data");
  return ttmachines.client.layout.update_nav_li.call(null, c.call(null, "\ufdd0'route"))
});
one.dispatch.react_to.call(null, cljs.core.set(["\ufdd0'switch-page"]), cljs.core.ObjMap.fromObject(["\ufdd0'priority"], {"\ufdd0'priority":1}), function(a, b) {
  return ttmachines.client.layout.load_state.call(null, b.call(null, "\ufdd0'data"))
});
ttmachines.client.layout.init.call(null);
clojure.walk = {};
clojure.walk.walk = function(a, b, c) {
  return cljs.core.truth_(cljs.core.seq_QMARK_.call(null, c)) ? b.call(null, cljs.core.doall.call(null, cljs.core.map.call(null, a, c))) : cljs.core.truth_(cljs.core.coll_QMARK_.call(null, c)) ? b.call(null, cljs.core.into.call(null, cljs.core.empty.call(null, c), cljs.core.map.call(null, a, c))) : cljs.core.truth_("\ufdd0'else") ? b.call(null, c) : null
};
clojure.walk.postwalk = function postwalk(b, c) {
  return clojure.walk.walk.call(null, cljs.core.partial.call(null, postwalk, b), b, c)
};
clojure.walk.prewalk = function prewalk(b, c) {
  return clojure.walk.walk.call(null, cljs.core.partial.call(null, prewalk, b), cljs.core.identity, b.call(null, c))
};
clojure.walk.keywordize_keys = function(a) {
  var b = function(a) {
    var b = cljs.core.nth.call(null, a, 0, null), a = cljs.core.nth.call(null, a, 1, null);
    return cljs.core.truth_(cljs.core.string_QMARK_.call(null, b)) ? cljs.core.Vector.fromArray([cljs.core.keyword.call(null, b), a]) : cljs.core.Vector.fromArray([b, a])
  };
  return clojure.walk.postwalk.call(null, function(a) {
    return cljs.core.truth_(cljs.core.map_QMARK_.call(null, a)) ? cljs.core.into.call(null, cljs.core.ObjMap.fromObject([], {}), cljs.core.map.call(null, b, a)) : a
  }, a)
};
clojure.walk.stringify_keys = function(a) {
  var b = function(a) {
    var b = cljs.core.nth.call(null, a, 0, null), a = cljs.core.nth.call(null, a, 1, null);
    return cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, b)) ? cljs.core.Vector.fromArray([cljs.core.name.call(null, b), a]) : cljs.core.Vector.fromArray([b, a])
  };
  return clojure.walk.postwalk.call(null, function(a) {
    return cljs.core.truth_(cljs.core.map_QMARK_.call(null, a)) ? cljs.core.into.call(null, cljs.core.ObjMap.fromObject([], {}), cljs.core.map.call(null, b, a)) : a
  }, a)
};
clojure.walk.prewalk_replace = function(a, b) {
  return clojure.walk.prewalk.call(null, function(b) {
    return cljs.core.truth_(cljs.core.contains_QMARK_.call(null, a, b)) ? a.call(null, b) : b
  }, b)
};
clojure.walk.postwalk_replace = function(a, b) {
  return clojure.walk.postwalk.call(null, function(b) {
    return cljs.core.truth_(cljs.core.contains_QMARK_.call(null, a, b)) ? a.call(null, b) : b
  }, b)
};
ttmachines.client.animate = {};
ttmachines.client.animate.effects = {};
ttmachines.client.animate.effects.effects = cljs.core.set("rotateIn,rotateInUpRight,fadeIn,bounceOutUp,rotateInUpLeft,rollIn,fadeInDown,fadeInUpBig,fadeInRightBig,flipInX,shake,bounceOut,flipInY,rotateOutDownRight,fadeOutLeftBig,fadeInLeft,bounceInUp,bounceOutDown,bounce,rotateInDownLeft,fadeOutRight,tada,wiggle,hinge,fadeOutDownBig,flip,bounceOutLeft,fadeOutUp,bounceIn,rotateOutUpRight,bounceInDown,bounceInRight,flash,wobble,rollOut,fadeOut,fadeOutUpBig,rotateOut,fadeOutDown,bounceInLeft,rotateOutUpLeft,lightSpeedIn,bounceOutRight,fadeOutRightBig,flipOutX,flipOutY,fadeInLeftBig,fadeOutLeft,pulse,rotateInDownRight,fadeInRight,rotateOutDownLeft,fadeInUp,lightSpeedOut,fadeInDownBig,swing".split(","));
clojure.zip = {};
clojure.zip.zipper = function(a, b, c, d) {
  return cljs.core.with_meta(cljs.core.Vector.fromArray([d, null]), cljs.core.ObjMap.fromObject(["\ufdd0'zip/make-node", "\ufdd0'zip/children", "\ufdd0'zip/branch?"], {"\ufdd0'zip/make-node":c, "\ufdd0'zip/children":b, "\ufdd0'zip/branch?":a}))
};
clojure.zip.seq_zip = function(a) {
  return clojure.zip.zipper.call(null, cljs.core.seq_QMARK_, cljs.core.identity, function(a, c) {
    return cljs.core.with_meta.call(null, c, cljs.core.meta.call(null, a))
  }, a)
};
clojure.zip.vector_zip = function(a) {
  return clojure.zip.zipper.call(null, cljs.core.vector_QMARK_, cljs.core.seq, function(a, c) {
    return cljs.core.with_meta.call(null, cljs.core.vec.call(null, c), cljs.core.meta.call(null, a))
  }, a)
};
clojure.zip.xml_zip = function(a) {
  return clojure.zip.zipper.call(null, cljs.core.complement.call(null, cljs.core.string_QMARK_), cljs.core.comp.call(null, cljs.core.seq, "\ufdd0'content"), function(a, c) {
    return cljs.core.assoc.call(null, a, "\ufdd0'content", cljs.core.truth_(c) ? cljs.core.apply.call(null, cljs.core.vector, c) : c)
  }, a)
};
clojure.zip.node = function(a) {
  return a.call(null, 0)
};
clojure.zip.branch_QMARK_ = function(a) {
  return"\ufdd0'zip/branch?".call(null, cljs.core.meta.call(null, a)).call(null, clojure.zip.node.call(null, a))
};
clojure.zip.children = function(a) {
  if(cljs.core.truth_(clojure.zip.branch_QMARK_.call(null, a))) {
    return"\ufdd0'zip/children".call(null, cljs.core.meta.call(null, a)).call(null, clojure.zip.node.call(null, a))
  }
  throw"called children on a leaf node";
};
clojure.zip.make_node = function(a, b, c) {
  return"\ufdd0'zip/make-node".call(null, cljs.core.meta.call(null, a)).call(null, b, c)
};
clojure.zip.path = function(a) {
  return"\ufdd0'pnodes".call(null, a.call(null, 1))
};
clojure.zip.lefts = function(a) {
  return cljs.core.seq.call(null, "\ufdd0'l".call(null, a.call(null, 1)))
};
clojure.zip.rights = function(a) {
  return"\ufdd0'r".call(null, a.call(null, 1))
};
clojure.zip.down = function(a) {
  if(cljs.core.truth_(clojure.zip.branch_QMARK_.call(null, a))) {
    var b = cljs.core.nth.call(null, a, 0, null), c = cljs.core.nth.call(null, a, 1, null), d = clojure.zip.children.call(null, a), e = cljs.core.nth.call(null, d, 0, null), f = cljs.core.nthnext.call(null, d, 1);
    return cljs.core.truth_(d) ? cljs.core.with_meta.call(null, cljs.core.Vector.fromArray([e, cljs.core.ObjMap.fromObject(["\ufdd0'l", "\ufdd0'pnodes", "\ufdd0'ppath", "\ufdd0'r"], {"\ufdd0'l":cljs.core.Vector.fromArray([]), "\ufdd0'pnodes":cljs.core.truth_(c) ? cljs.core.conj.call(null, "\ufdd0'pnodes".call(null, c), b) : cljs.core.Vector.fromArray([b]), "\ufdd0'ppath":c, "\ufdd0'r":f})]), cljs.core.meta.call(null, a)) : null
  }
  return null
};
clojure.zip.up = function(a) {
  var b = cljs.core.nth.call(null, a, 0, null), c = cljs.core.nth.call(null, a, 1, null), d = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, c)) ? cljs.core.apply.call(null, cljs.core.hash_map, c) : c, c = cljs.core.get.call(null, d, "\ufdd0'l"), e = cljs.core.get.call(null, d, "\ufdd0'ppath"), f = cljs.core.get.call(null, d, "\ufdd0'pnodes"), g = cljs.core.get.call(null, d, "\ufdd0'r"), d = cljs.core.get.call(null, d, "\ufdd0'changed?");
  return cljs.core.truth_(f) ? (f = cljs.core.peek.call(null, f), cljs.core.with_meta.call(null, cljs.core.truth_(d) ? cljs.core.Vector.fromArray([clojure.zip.make_node.call(null, a, f, cljs.core.concat.call(null, c, cljs.core.cons.call(null, b, g))), cljs.core.truth_(e) ? cljs.core.assoc.call(null, e, "\ufdd0'changed?", !0) : e]) : cljs.core.Vector.fromArray([f, e]), cljs.core.meta.call(null, a))) : null
};
clojure.zip.root = function(a) {
  for(;;) {
    if(cljs.core.truth_(cljs.core._EQ_.call(null, "\ufdd0'end", a.call(null, 1)))) {
      return clojure.zip.node.call(null, a)
    }
    var b = clojure.zip.up.call(null, a);
    if(cljs.core.truth_(b)) {
      a = b
    }else {
      return clojure.zip.node.call(null, a)
    }
  }
};
clojure.zip.right = function(a) {
  var b = cljs.core.nth.call(null, a, 0, null), c = cljs.core.nth.call(null, a, 1, null), c = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, c)) ? cljs.core.apply.call(null, cljs.core.hash_map, c) : c, d = cljs.core.get.call(null, c, "\ufdd0'l"), e = cljs.core.get.call(null, c, "\ufdd0'r"), f = cljs.core.nth.call(null, e, 0, null), g = cljs.core.nthnext.call(null, e, 1);
  return cljs.core.truth_(cljs.core.truth_(c) ? e : c) ? cljs.core.with_meta.call(null, cljs.core.Vector.fromArray([f, cljs.core.assoc.call(null, c, "\ufdd0'l", cljs.core.conj.call(null, d, b), "\ufdd0'r", g)]), cljs.core.meta.call(null, a)) : null
};
clojure.zip.rightmost = function(a) {
  var b = cljs.core.nth.call(null, a, 0, null), c = cljs.core.nth.call(null, a, 1, null), c = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, c)) ? cljs.core.apply.call(null, cljs.core.hash_map, c) : c, d = cljs.core.get.call(null, c, "\ufdd0'l"), e = cljs.core.get.call(null, c, "\ufdd0'r");
  return cljs.core.truth_(cljs.core.truth_(c) ? e : c) ? cljs.core.with_meta.call(null, cljs.core.Vector.fromArray([cljs.core.last.call(null, e), cljs.core.assoc.call(null, c, "\ufdd0'l", cljs.core.apply.call(null, cljs.core.conj, d, b, cljs.core.butlast.call(null, e)), "\ufdd0'r", null)]), cljs.core.meta.call(null, a)) : a
};
clojure.zip.left = function(a) {
  var b = cljs.core.nth.call(null, a, 0, null), c = cljs.core.nth.call(null, a, 1, null), c = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, c)) ? cljs.core.apply.call(null, cljs.core.hash_map, c) : c, d = cljs.core.get.call(null, c, "\ufdd0'l"), e = cljs.core.get.call(null, c, "\ufdd0'r");
  return cljs.core.truth_(cljs.core.truth_(c) ? cljs.core.seq.call(null, d) : c) ? cljs.core.with_meta.call(null, cljs.core.Vector.fromArray([cljs.core.peek.call(null, d), cljs.core.assoc.call(null, c, "\ufdd0'l", cljs.core.pop.call(null, d), "\ufdd0'r", cljs.core.cons.call(null, b, e))]), cljs.core.meta.call(null, a)) : null
};
clojure.zip.leftmost = function(a) {
  var b = cljs.core.nth.call(null, a, 0, null), c = cljs.core.nth.call(null, a, 1, null), c = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, c)) ? cljs.core.apply.call(null, cljs.core.hash_map, c) : c, d = cljs.core.get.call(null, c, "\ufdd0'l"), e = cljs.core.get.call(null, c, "\ufdd0'r");
  return cljs.core.truth_(cljs.core.truth_(c) ? cljs.core.seq.call(null, d) : c) ? cljs.core.with_meta.call(null, cljs.core.Vector.fromArray([cljs.core.first.call(null, d), cljs.core.assoc.call(null, c, "\ufdd0'l", cljs.core.Vector.fromArray([]), "\ufdd0'r", cljs.core.concat.call(null, cljs.core.rest.call(null, d), cljs.core.Vector.fromArray([b]), e))]), cljs.core.meta.call(null, a)) : a
};
clojure.zip.insert_left = function(a, b) {
  var c = cljs.core.nth.call(null, a, 0, null), d = cljs.core.nth.call(null, a, 1, null), d = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, d)) ? cljs.core.apply.call(null, cljs.core.hash_map, d) : d, e = cljs.core.get.call(null, d, "\ufdd0'l");
  if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, d))) {
    throw"Insert at top";
  }
  return cljs.core.with_meta.call(null, cljs.core.Vector.fromArray([c, cljs.core.assoc.call(null, d, "\ufdd0'l", cljs.core.conj.call(null, e, b), "\ufdd0'changed?", !0)]), cljs.core.meta.call(null, a))
};
clojure.zip.insert_right = function(a, b) {
  var c = cljs.core.nth.call(null, a, 0, null), d = cljs.core.nth.call(null, a, 1, null), d = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, d)) ? cljs.core.apply.call(null, cljs.core.hash_map, d) : d, e = cljs.core.get.call(null, d, "\ufdd0'r");
  if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, d))) {
    throw"Insert at top";
  }
  return cljs.core.with_meta.call(null, cljs.core.Vector.fromArray([c, cljs.core.assoc.call(null, d, "\ufdd0'r", cljs.core.cons.call(null, b, e), "\ufdd0'changed?", !0)]), cljs.core.meta.call(null, a))
};
clojure.zip.replace = function(a, b) {
  cljs.core.nth.call(null, a, 0, null);
  var c = cljs.core.nth.call(null, a, 1, null);
  return cljs.core.with_meta.call(null, cljs.core.Vector.fromArray([b, cljs.core.assoc.call(null, c, "\ufdd0'changed?", !0)]), cljs.core.meta.call(null, a))
};
clojure.zip.edit = function() {
  var a = function(a, b, e) {
    return clojure.zip.replace.call(null, a, cljs.core.apply.call(null, b, clojure.zip.node.call(null, a), e))
  }, b = function(b, d, e) {
    var f = null;
    goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
    return a.call(this, d, e, b)
  };
  return b
}();
clojure.zip.insert_child = function(a, b) {
  return clojure.zip.replace.call(null, a, clojure.zip.make_node.call(null, a, clojure.zip.node.call(null, a), cljs.core.cons.call(null, b, clojure.zip.children.call(null, a))))
};
clojure.zip.append_child = function(a, b) {
  return clojure.zip.replace.call(null, a, clojure.zip.make_node.call(null, a, clojure.zip.node.call(null, a), cljs.core.concat.call(null, clojure.zip.children.call(null, a), cljs.core.Vector.fromArray([b]))))
};
clojure.zip.next = function(a) {
  if(cljs.core.truth_(cljs.core._EQ_.call(null, "\ufdd0'end", a.call(null, 1)))) {
    return a
  }
  var b;
  b = clojure.zip.branch_QMARK_.call(null, a);
  b = cljs.core.truth_(b) ? clojure.zip.down.call(null, a) : b;
  if(cljs.core.truth_(b)) {
    return b
  }
  b = clojure.zip.right.call(null, a);
  if(cljs.core.truth_(b)) {
    return b
  }
  for(;;) {
    if(cljs.core.truth_(clojure.zip.up.call(null, a))) {
      b = clojure.zip.right.call(null, clojure.zip.up.call(null, a));
      if(cljs.core.truth_(b)) {
        return b
      }
      a = clojure.zip.up.call(null, a)
    }else {
      return cljs.core.Vector.fromArray([clojure.zip.node.call(null, a), "\ufdd0'end"])
    }
  }
};
clojure.zip.prev = function(a) {
  var b = clojure.zip.left.call(null, a);
  if(cljs.core.truth_(b)) {
    for(a = b;;) {
      if(b = clojure.zip.branch_QMARK_.call(null, a), b = cljs.core.truth_(b) ? clojure.zip.down.call(null, a) : b, cljs.core.truth_(b)) {
        a = clojure.zip.rightmost.call(null, b)
      }else {
        return a
      }
    }
  }else {
    return clojure.zip.up.call(null, a)
  }
};
clojure.zip.end_QMARK_ = function(a) {
  return cljs.core._EQ_.call(null, "\ufdd0'end", a.call(null, 1))
};
clojure.zip.remove = function(a) {
  cljs.core.nth.call(null, a, 0, null);
  var b = cljs.core.nth.call(null, a, 1, null), b = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, b)) ? cljs.core.apply.call(null, cljs.core.hash_map, b) : b, c = cljs.core.get.call(null, b, "\ufdd0'l"), d = cljs.core.get.call(null, b, "\ufdd0'ppath"), e = cljs.core.get.call(null, b, "\ufdd0'pnodes"), f = cljs.core.get.call(null, b, "\ufdd0'r");
  if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, b))) {
    throw"Remove at top";
  }
  if(cljs.core.truth_(0 < cljs.core.count.call(null, c))) {
    for(a = cljs.core.with_meta.call(null, cljs.core.Vector.fromArray([cljs.core.peek.call(null, c), cljs.core.assoc.call(null, b, "\ufdd0'l", cljs.core.pop.call(null, c), "\ufdd0'changed?", !0)]), cljs.core.meta.call(null, a));;) {
      if(b = clojure.zip.branch_QMARK_.call(null, a), b = cljs.core.truth_(b) ? clojure.zip.down.call(null, a) : b, cljs.core.truth_(b)) {
        a = clojure.zip.rightmost.call(null, b)
      }else {
        return a
      }
    }
  }else {
    return cljs.core.with_meta.call(null, cljs.core.Vector.fromArray([clojure.zip.make_node.call(null, a, cljs.core.peek.call(null, e), f), cljs.core.truth_(d) ? cljs.core.assoc.call(null, d, "\ufdd0'changed?", !0) : d]), cljs.core.meta.call(null, a))
  }
};
clojure.set = {};
clojure.set.bubble_max_key = function(a, b) {
  var c = cljs.core.apply.call(null, cljs.core.max_key, a, b);
  return cljs.core.cons.call(null, c, cljs.core.remove.call(null, function(a) {
    return c === a
  }, b))
};
clojure.set.union = function() {
  var a = null, b = function() {
    var a = function(a, b, c) {
      a = clojure.set.bubble_max_key.call(null, cljs.core.count, cljs.core.conj.call(null, c, b, a));
      return cljs.core.reduce.call(null, cljs.core.into, cljs.core.first.call(null, a), cljs.core.rest.call(null, a))
    }, b = function(b, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return a.call(this, b, d, h)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), g = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return a.call(this, d, g, b)
    };
    return b
  }(), a = function(a, d, e) {
    switch(arguments.length) {
      case 0:
        return cljs.core.set([]);
      case 1:
        return a;
      case 2:
        return cljs.core.truth_(cljs.core.count.call(null, a) < cljs.core.count.call(null, d)) ? cljs.core.reduce.call(null, cljs.core.conj, d, a) : cljs.core.reduce.call(null, cljs.core.conj, a, d);
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
clojure.set.intersection = function() {
  var a = null, b = function(a, b) {
    for(;;) {
      if(cljs.core.truth_(cljs.core.count.call(null, b) < cljs.core.count.call(null, a))) {
        var c = a, a = b, b = c
      }else {
        return cljs.core.reduce.call(null, function(a, b) {
          return function(a, c) {
            return cljs.core.truth_(cljs.core.contains_QMARK_.call(null, b, c)) ? a : cljs.core.disj.call(null, a, c)
          }
        }(a, b), a, a)
      }
    }
  }, c = function() {
    var b = function(b, c, d) {
      b = clojure.set.bubble_max_key.call(null, function(a) {
        return-cljs.core.count.call(null, a)
      }, cljs.core.conj.call(null, d, c, b));
      return cljs.core.reduce.call(null, a, cljs.core.first.call(null, b), cljs.core.rest.call(null, b))
    }, c = function(a, c, e) {
      var i = null;
      goog.isDef(e) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, c, i)
    };
    c.cljs$lang$maxFixedArity = 2;
    c.cljs$lang$applyTo = function(a) {
      var c = cljs.core.first(a), e = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, c, e, a)
    };
    return c
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, e);
      default:
        return c.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  return a
}();
clojure.set.difference = function() {
  var a = null, b = function(a, b) {
    return cljs.core.truth_(cljs.core.count.call(null, a) < cljs.core.count.call(null, b)) ? cljs.core.reduce.call(null, function(a, c) {
      return cljs.core.truth_(cljs.core.contains_QMARK_.call(null, b, c)) ? cljs.core.disj.call(null, a, c) : a
    }, a, a) : cljs.core.reduce.call(null, cljs.core.disj, a, b)
  }, c = function() {
    var b = function(b, c, d) {
      var h = null;
      goog.isDef(d) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.reduce.call(null, a, b, cljs.core.conj.call(null, h, c))
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var c = cljs.core.first(b), d = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return cljs.core.reduce.call(null, a, c, cljs.core.conj.call(null, b, d))
    };
    return b
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, e);
      default:
        return c.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  return a
}();
clojure.set.select = function(a, b) {
  return cljs.core.reduce.call(null, function(b, d) {
    return cljs.core.truth_(a.call(null, d)) ? b : cljs.core.disj.call(null, b, d)
  }, b, b)
};
clojure.set.project = function(a, b) {
  return cljs.core.set.call(null, cljs.core.map.call(null, function(a) {
    return cljs.core.select_keys.call(null, a, b)
  }, a))
};
clojure.set.rename_keys = function(a, b) {
  return cljs.core.reduce.call(null, function(a, b) {
    var e = cljs.core.nth.call(null, b, 0, null), f = cljs.core.nth.call(null, b, 1, null);
    return cljs.core.truth_(function() {
      var b = cljs.core.not_EQ_.call(null, e, f);
      return cljs.core.truth_(b) ? cljs.core.contains_QMARK_.call(null, a, e) : b
    }()) ? cljs.core.dissoc.call(null, cljs.core.assoc.call(null, a, f, cljs.core.get.call(null, a, e)), e) : a
  }, a, b)
};
clojure.set.rename = function(a, b) {
  return cljs.core.set.call(null, cljs.core.map.call(null, function(a) {
    return clojure.set.rename_keys.call(null, a, b)
  }, a))
};
clojure.set.index = function(a, b) {
  return cljs.core.reduce.call(null, function(a, d) {
    var e = cljs.core.select_keys.call(null, d, b);
    return cljs.core.assoc.call(null, a, e, cljs.core.conj.call(null, cljs.core.get.call(null, a, e, cljs.core.set([])), d))
  }, cljs.core.ObjMap.fromObject([], {}), a)
};
clojure.set.map_invert = function(a) {
  return cljs.core.reduce.call(null, function(a, c) {
    var d = cljs.core.nth.call(null, c, 0, null), e = cljs.core.nth.call(null, c, 1, null);
    return cljs.core.assoc.call(null, a, e, d)
  }, cljs.core.ObjMap.fromObject([], {}), a)
};
clojure.set.join = function() {
  var a = null, b = function(a, b) {
    if(cljs.core.truth_(function() {
      var c = cljs.core.seq.call(null, a);
      return cljs.core.truth_(c) ? cljs.core.seq.call(null, b) : c
    }())) {
      var c = clojure.set.intersection.call(null, cljs.core.set.call(null, cljs.core.keys.call(null, cljs.core.first.call(null, a))), cljs.core.set.call(null, cljs.core.keys.call(null, cljs.core.first.call(null, b)))), g = cljs.core.truth_(cljs.core.count.call(null, a) <= cljs.core.count.call(null, b)) ? cljs.core.Vector.fromArray([a, b]) : cljs.core.Vector.fromArray([b, a]), h = cljs.core.nth.call(null, g, 0, null), g = cljs.core.nth.call(null, g, 1, null), i = clojure.set.index.call(null, h, c);
      return cljs.core.reduce.call(null, function(a, b) {
        var d = i.call(null, cljs.core.select_keys.call(null, b, c));
        return cljs.core.truth_(d) ? cljs.core.reduce.call(null, function(a, c) {
          return cljs.core.conj.call(null, a, cljs.core.merge.call(null, c, b))
        }, a, d) : a
      }, cljs.core.set([]), g)
    }
    return cljs.core.set([])
  }, c = function(a, b, c) {
    var a = cljs.core.truth_(cljs.core.count.call(null, a) <= cljs.core.count.call(null, b)) ? cljs.core.Vector.fromArray([a, b, clojure.set.map_invert.call(null, c)]) : cljs.core.Vector.fromArray([b, a, c]), b = cljs.core.nth.call(null, a, 0, null), c = cljs.core.nth.call(null, a, 1, null), g = cljs.core.nth.call(null, a, 2, null), h = clojure.set.index.call(null, b, cljs.core.vals.call(null, g));
    return cljs.core.reduce.call(null, function(a, b) {
      var c = h.call(null, clojure.set.rename_keys.call(null, cljs.core.select_keys.call(null, b, cljs.core.keys.call(null, g)), g));
      return cljs.core.truth_(c) ? cljs.core.reduce.call(null, function(a, c) {
        return cljs.core.conj.call(null, a, cljs.core.merge.call(null, c, b))
      }, a, c) : a
    }, cljs.core.set([]), c)
  };
  return function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
clojure.set.subset_QMARK_ = function(a, b) {
  var c = cljs.core.count.call(null, a) <= cljs.core.count.call(null, b);
  return cljs.core.truth_(c) ? cljs.core.every_QMARK_.call(null, function(a) {
    return cljs.core.contains_QMARK_.call(null, b, a)
  }, a) : c
};
clojure.set.superset_QMARK_ = function(a, b) {
  var c = cljs.core.count.call(null, a) >= cljs.core.count.call(null, b);
  return cljs.core.truth_(c) ? cljs.core.every_QMARK_.call(null, function(b) {
    return cljs.core.contains_QMARK_.call(null, a, b)
  }, b) : c
};
ttmachines.client.broadcast = {};
ttmachines.client.broadcast.title = domina.domina.by_id.call(null, "title");
ttmachines.client.animate.ANIMATION_DURATION_MS = 300;
ttmachines.client.animate.ANIMATION_DELAY_MS = 1E3;
ttmachines.client.animate.ANIMATION_COMPLETE = ttmachines.client.animate.ANIMATION_DURATION_MS + ttmachines.client.animate.ANIMATION_DELAY_MS;
var G__3555__3556 = cljs.core.seq.call(null, cljs.core.vals.call(null, ttmachines.client.layout.targets));
if(cljs.core.truth_(G__3555__3556)) {
  for(var t__3557 = cljs.core.first.call(null, G__3555__3556), G__3555__3558 = G__3555__3556;;) {
    var element__3559 = domina.domina.css.sel.call(null, t__3557);
    domina.domina.add_class_BANG_.call(null, element__3559, "animated");
    var temp__3698__auto____3560 = cljs.core.next.call(null, G__3555__3558);
    if(cljs.core.truth_(temp__3698__auto____3560)) {
      var G__3555__3561 = temp__3698__auto____3560, G__3562 = cljs.core.first.call(null, G__3555__3561), G__3563 = G__3555__3561, t__3557 = G__3562, G__3555__3558 = G__3563
    }else {
      break
    }
  }
}
ttmachines.client.animate.animate = function() {
  var a = function(a, b) {
    var e = cljs.core.seq.call(null, b);
    if(cljs.core.truth_(e)) {
      for(var f = cljs.core.first.call(null, e);;) {
        var g = domina.domina.css.sel.call(null, f);
        domina.domina.add_class_BANG_.call(null, g, a);
        ttmachines.client.util.after.call(null, ttmachines.client.animate.ANIMATION_COMPLETE, function() {
          return function() {
            return domina.domina.remove_class_BANG_.call(null, g, a)
          }
        }(f, e));
        f = cljs.core.next.call(null, e);
        if(cljs.core.truth_(f)) {
          e = f, f = cljs.core.first.call(null, e)
        }else {
          return null
        }
      }
    }else {
      return null
    }
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a.call(this, d, b)
  };
  return b
}();
ttmachines.client.animate.fade_in_left = cljs.core.partial.call(null, ttmachines.client.animate.animate, "fadeInLeft");
ttmachines.client.animate.fade_out_left = cljs.core.partial.call(null, ttmachines.client.animate.animate, "fadeOutLeft");
ttmachines.client.animate.fade_in_right = cljs.core.partial.call(null, ttmachines.client.animate.animate, "fadeInRight");
ttmachines.client.animate.fade_out_right = cljs.core.partial.call(null, ttmachines.client.animate.animate, "fadeOutRight");
ttmachines.client.animate.entrances = cljs.core.ObjMap.fromObject(["\ufdd0'headline", "\ufdd0'text", "\ufdd0'main", "\ufdd0'below-main", "\ufdd0'sidebar"], {"\ufdd0'headline":ttmachines.client.animate.fade_in_left, "\ufdd0'text":ttmachines.client.animate.fade_in_left, "\ufdd0'main":ttmachines.client.animate.fade_in_left, "\ufdd0'below-main":ttmachines.client.animate.fade_in_left, "\ufdd0'sidebar":ttmachines.client.animate.fade_in_right});
ttmachines.client.animate.incoming_keys = function(a) {
  return cljs.core.keys.call(null, cljs.core.filter.call(null, function(a, c) {
    return cljs.core.not.call(null, cljs.core.nil_QMARK_.call(null, c))
  }, a))
};
ttmachines.client.animate.fade_in_layout_elements = function(a) {
  var b = cljs.core.seq.call(null, ttmachines.client.animate.incoming_keys.call(null, a));
  if(cljs.core.truth_(b)) {
    for(a = cljs.core.first.call(null, b);;) {
      var c = ttmachines.client.animate.entrances.call(null, a), a = ttmachines.client.layout.targets.call(null, a);
      c.call(null, a);
      a = cljs.core.next.call(null, b);
      if(cljs.core.truth_(a)) {
        b = a, a = cljs.core.first.call(null, b)
      }else {
        return null
      }
    }
  }else {
    return null
  }
};
one.dispatch.react_to.call(null, cljs.core.set(["\ufdd0'switch-page"]), cljs.core.ObjMap.fromObject(["\ufdd0'priority"], {"\ufdd0'priority":2}), function(a, b) {
  var c = cljs.core.get_in.call(null, b, cljs.core.Vector.fromArray(["\ufdd0'data", "\ufdd0'layout"]));
  return ttmachines.client.animate.fade_in_layout_elements.call(null, c)
});
ttmachines.client.user = {};
ttmachines.client.user.foo = function(a) {
  return cljs.core.str.call(null, "foo ", a)
};
ttmachines.client.repl = {};
ttmachines.client.repl.codemirrorify = function(a, b) {
  var c = document.getElementById(a);
  return cljs.core.truth_(c) ? CodeMirror.fromTextArea(c, ttmachines.client.util.map__GT_js.call(null, b)) : null
};
ttmachines.client.repl.set_option = function(a, b, c) {
  return a.setOption(cljs.core.name.call(null, b), c)
};
ttmachines.client.repl.editor_textarea = "editor-textarea";
ttmachines.client.repl.editor_settings = cljs.core.ObjMap.fromObject(["\ufdd0'theme", "\ufdd0'lineNumbers", "\ufdd0'matchBrackets"], {"\ufdd0'theme":"ambiance", "\ufdd0'lineNumbers":!0, "\ufdd0'matchBrackets":!0});
ttmachines.client.repl.result_textarea = "result-textarea";
ttmachines.client.repl.result_settings = cljs.core.ObjMap.fromObject(["\ufdd0'theme", "\ufdd0'readOnly", "\ufdd0'lineWrapping"], {"\ufdd0'theme":"ambiance", "\ufdd0'readOnly":!0, "\ufdd0'lineWrapping":!0});
ttmachines.client.repl.code = cljs.core.atom.call(null, "");
cljs.core.set_validator_BANG_.call(null, ttmachines.client.repl.code, ttmachines.client.repl.valid_code);
cljs.core.add_watch.call(null, ttmachines.client.repl.code, "\ufdd0'process", function(a, b, c, d) {
  return ttmachines.client.repl.process.call(null, d)
});
ttmachines.client.repl.update_code = function(a) {
  var b = a.getValue();
  return setTimeout.call(null, function() {
    return cljs.core.truth_(cljs.core._EQ_.call(null, a.getValue(), b)) ? (ttmachines.client.repl.result.setValue(""), cljs.core.reset_BANG_.call(null, ttmachines.client.repl.code, b)) : null
  }, 200)
};
ttmachines.client.repl.get_selection_doc = function(a) {
  a = a.getSelection();
  return cljs.core.truth_(cljs.core._EQ_.call(null, "", a)) ? null : ttmachines.client.repl.get_doc.call(null, a)
};
ttmachines.client.repl.change_listeners = cljs.core.atom.call(null, cljs.core.ObjMap.fromObject(["\ufdd0'editor", "\ufdd0'result"], {"\ufdd0'editor":cljs.core.ObjMap.fromObject(["\ufdd0'update-code"], {"\ufdd0'update-code":ttmachines.client.repl.update_code}), "\ufdd0'result":cljs.core.ObjMap.fromObject([], {})}));
ttmachines.client.repl.activity_listeners = cljs.core.atom.call(null, cljs.core.ObjMap.fromObject(["\ufdd0'editor", "\ufdd0'result"], {"\ufdd0'editor":cljs.core.ObjMap.fromObject(["\ufdd0'get-selection-doc"], {"\ufdd0'get-selection-doc":ttmachines.client.repl.get_selection_doc}), "\ufdd0'result":cljs.core.ObjMap.fromObject([], {})}));
ttmachines.client.repl.init_editor = function(a) {
  ttmachines.client.repl.editor = ttmachines.client.repl.codemirrorify.call(null, a, ttmachines.client.repl.editor_settings);
  return cljs.core.truth_(ttmachines.client.repl.editor) ? (ttmachines.client.repl.set_option.call(null, ttmachines.client.repl.editor, "\ufdd0'onChange", function(a, c) {
    var d = cljs.core.seq.call(null, cljs.core.deref.call(null, ttmachines.client.repl.change_listeners).call(null, "\ufdd0'editor"));
    if(cljs.core.truth_(d)) {
      var e = cljs.core.first.call(null, d);
      cljs.core.nth.call(null, e, 0, null);
      for(cljs.core.nth.call(null, e, 1, null);;) {
        if(cljs.core.nth.call(null, e, 0, null), e = cljs.core.nth.call(null, e, 1, null), e.call(null, a, c), e = cljs.core.next.call(null, d), cljs.core.truth_(e)) {
          d = e, e = cljs.core.first.call(null, d)
        }else {
          return null
        }
      }
    }else {
      return null
    }
  }), ttmachines.client.repl.set_option.call(null, ttmachines.client.repl.editor, "\ufdd0'onCursorActivity", function(a) {
    var c = cljs.core.seq.call(null, cljs.core.deref.call(null, ttmachines.client.repl.activity_listeners).call(null, "\ufdd0'editor"));
    if(cljs.core.truth_(c)) {
      var d = cljs.core.first.call(null, c);
      cljs.core.nth.call(null, d, 0, null);
      for(cljs.core.nth.call(null, d, 1, null);;) {
        if(cljs.core.nth.call(null, d, 0, null), d = cljs.core.nth.call(null, d, 1, null), d.call(null, a), d = cljs.core.next.call(null, c), cljs.core.truth_(d)) {
          c = d, d = cljs.core.first.call(null, c)
        }else {
          return null
        }
      }
    }else {
      return null
    }
  })) : null
};
ttmachines.client.repl.init_result = function(a) {
  ttmachines.client.repl.result = ttmachines.client.repl.codemirrorify.call(null, a, ttmachines.client.repl.result_settings);
  return cljs.core.truth_(ttmachines.client.repl.result) ? (ttmachines.client.repl.set_option.call(null, ttmachines.client.repl.result, "\ufdd0'onChange", function(a, c) {
    var d = cljs.core.seq.call(null, cljs.core.deref.call(null, ttmachines.client.repl.change_listeners).call(null, "\ufdd0'result"));
    if(cljs.core.truth_(d)) {
      var e = cljs.core.first.call(null, d);
      cljs.core.nth.call(null, e, 0, null);
      for(cljs.core.nth.call(null, e, 1, null);;) {
        if(cljs.core.nth.call(null, e, 0, null), e = cljs.core.nth.call(null, e, 1, null), e.call(null, a, c), e = cljs.core.next.call(null, d), cljs.core.truth_(e)) {
          d = e, e = cljs.core.first.call(null, d)
        }else {
          return null
        }
      }
    }else {
      return null
    }
  }), ttmachines.client.repl.set_option.call(null, ttmachines.client.repl.result, "\ufdd0'onCursorActivity", function(a) {
    var c = cljs.core.seq.call(null, cljs.core.deref.call(null, ttmachines.client.repl.activity_listeners).call(null, "\ufdd0'result"));
    if(cljs.core.truth_(c)) {
      var d = cljs.core.first.call(null, c);
      cljs.core.nth.call(null, d, 0, null);
      for(cljs.core.nth.call(null, d, 1, null);;) {
        if(cljs.core.nth.call(null, d, 0, null), d = cljs.core.nth.call(null, d, 1, null), d.call(null, a), d = cljs.core.next.call(null, c), cljs.core.truth_(d)) {
          c = d, d = cljs.core.first.call(null, c)
        }else {
          return null
        }
      }
    }else {
      return null
    }
  })) : null
};
ttmachines.client.repl.add_change_listener = function(a, b, c) {
  return cljs.core.swap_BANG_.call(null, ttmachines.client.repl.change_listeners, cljs.core.assoc_in, cljs.core.Vector.fromArray([a, b]), c)
};
ttmachines.client.repl.add_activity_listener = function(a, b, c) {
  return cljs.core.swap_BANG_.call(null, ttmachines.client.repl.activity_listeners, cljs.core.assoc_in, cljs.core.Vector.fromArray([a, b]), c)
};
ttmachines.client.repl.remove_change_listener = function(a, b) {
  return cljs.core.swap_BANG_.call(null, ttmachines.client.repl.change_listeners, ttmachines.client.repl.dissoc_in, cljs.core.Vector.fromArray([a, b]))
};
ttmachines.client.repl.remove_activity_listener = function(a, b) {
  return cljs.core.swap_BANG_.call(null, ttmachines.client.repl.activity_listeners, ttmachines.client.repl.dissoc_in, cljs.core.Vector.fromArray([a, b]))
};
ttmachines.client.repl.add_editor_change_listener = cljs.core.partial.call(null, ttmachines.client.repl.add_change_listener, "\ufdd0'editor");
ttmachines.client.repl.add_result_change_listener = cljs.core.partial.call(null, ttmachines.client.repl.add_change_listener, "\ufdd0'result");
ttmachines.client.repl.add_editor_activity_listener = cljs.core.partial.call(null, ttmachines.client.repl.add_activity_listener, "\ufdd0'editor");
ttmachines.client.repl.add_result_activity_listener = cljs.core.partial.call(null, ttmachines.client.repl.add_activity_listener, "\ufdd0'result");
ttmachines.client.repl.remove_editor_change_listener = cljs.core.partial.call(null, ttmachines.client.repl.remove_change_listener, "\ufdd0'editor");
ttmachines.client.repl.remove_result_change_listener = cljs.core.partial.call(null, ttmachines.client.repl.remove_change_listener, "\ufdd0'result");
ttmachines.client.repl.remove_editor_activity_listener = cljs.core.partial.call(null, ttmachines.client.repl.remove_activity_listener, "\ufdd0'editor");
ttmachines.client.repl.remove_result_activity_listener = cljs.core.partial.call(null, ttmachines.client.repl.remove_activity_listener, "\ufdd0'result");
ttmachines.client.repl.editor_text = function() {
  return ttmachines.client.repl.editor.getValue()
};
goog.exportSymbol("ttmachines.client.repl.editor_text", ttmachines.client.repl.editor_text);
ttmachines.client.repl.result_text = function() {
  return ttmachines.client.repl.result.getValue()
};
goog.exportSymbol("ttmachines.client.repl.result_text", ttmachines.client.repl.result_text);
ttmachines.client.repl.char_count = function(a, b) {
  return cljs.core.count.call(null, cljs.core.filter.call(null, function(a) {
    return cljs.core._EQ_.call(null, a, b)
  }, a))
};
ttmachines.client.repl.valid_code = function(a) {
  var a = cljs.core.partial.call(null, ttmachines.client.repl.char_count, a), b = cljs.core._EQ_.call(null, a.call(null, "("), a.call(null, ")"));
  return cljs.core.truth_(b) && (b = cljs.core._EQ_.call(null, a.call(null, "{"), a.call(null, "}")), cljs.core.truth_(b)) ? (b = cljs.core._EQ_.call(null, a.call(null, "["), a.call(null, "]")), cljs.core.truth_(b) ? cljs.core.even_QMARK_.call(null, a.call(null, '"')) : b) : b
};
ttmachines.client.repl.ns_alias_expansions = cljs.core.ObjMap.fromObject(["string", "dom", "css"], {string:"clojure.string", dom:"domina.domina", css:"domina.domina.css"});
ttmachines.client.repl.ns_from_str = function(a) {
  a = cljs.core.re_find.call(null, /^([\w.\-\?\!]+)\/[\w.\-\?\!]+$/, a);
  return cljs.core.truth_(a) ? a.call(null, 1) : null
};
ttmachines.client.repl.expand_ns_aliases = function(a) {
  var b = cljs.core.str.call(null, a), c = ttmachines.client.repl.ns_from_str.call(null, b), d = ttmachines.client.repl.ns_alias_expansions.call(null, c);
  return cljs.core.truth_(cljs.core.truth_(c) ? d : c) ? cljs.core.symbol.call(null, clojure.string.replace.call(null, b, c, d)) : a
};
ttmachines.client.repl.pre_compile = function(a) {
  return cljs.core.pr_str.call(null, clojure.walk.postwalk.call(null, ttmachines.client.repl.expand_ns_aliases, cljs.reader.read_string.call(null, cljs.core.str.call(null, "(do ", a, ")"))))
};
ttmachines.client.repl._STAR_cljs_ns_STAR_ = cljs.core.atom.call(null, "ttmachines.client.user");
ttmachines.client.repl.go_compile = function(a) {
  var b = cljs.core.atom.call(null, null), a = ttmachines.client.util.map__GT_js.call(null, cljs.core.ObjMap.fromObject("\ufdd0'url,\ufdd0'data,\ufdd0'contentType,\ufdd0'async,\ufdd0'type,\ufdd0'dataType,\ufdd0'success".split(","), {"\ufdd0'url":"/compile", "\ufdd0'data":cljs.core.str.call(null, "{:expr ", a, " :cljs-ns ", cljs.core.deref.call(null, ttmachines.client.repl._STAR_cljs_ns_STAR_), "}"), "\ufdd0'contentType":"application/clojure; charset=utf-8", "\ufdd0'async":!1, "\ufdd0'type":"POST", 
  "\ufdd0'dataType":"text", "\ufdd0'success":function(a) {
    return cljs.core.reset_BANG_.call(null, b, cljs.reader.read_string.call(null, a))
  }}));
  jQuery.ajax(a);
  return cljs.core.deref.call(null, b)
};
ttmachines.client.repl.evaluate = function(a) {
  var a = ttmachines.client.repl.go_compile.call(null, a), b = cljs.core.truth_(a) ? "\ufdd0'error".call(null, a) : a;
  cljs.core.truth_(b) && cljs.core.str.call(null, "Compilation error: ", b);
  try {
    return eval.call(null, "\ufdd0'js".call(null, a))
  }catch(c) {
    if(cljs.core.truth_(cljs.core.instance_QMARK_.call(null, Error, c))) {
      return cljs.core.str.call(null, "Compilation error: ", c)
    }
    if(cljs.core.truth_("\ufdd0'else")) {
      throw c;
    }
    return null
  }
};
ttmachines.client.repl.show_result = function(a) {
  return ttmachines.client.repl.result.setValue(ttmachines.client.util.finite_pr_str.call(null, a))
};
ttmachines.client.repl.process = function(a) {
  a = ttmachines.client.repl.pre_compile.call(null, a);
  a = ttmachines.client.repl.evaluate.call(null, a);
  return ttmachines.client.repl.show_result.call(null, a)
};
ttmachines.client.repl.get_doc = function(a) {
  cljs.core.atom.call(null, null);
  a = ttmachines.client.util.map__GT_js.call(null, cljs.core.ObjMap.fromObject(["\ufdd0'url", "\ufdd0'async", "\ufdd0'type", "\ufdd0'success"], {"\ufdd0'url":cljs.core.str.call(null, "/doc/", a), "\ufdd0'async":!0, "\ufdd0'type":"GET", "\ufdd0'success":function(a) {
    return ttmachines.client.repl.show_doc.call(null, a)
  }}));
  jQuery.ajax(a);
  return null
};
ttmachines.client.repl.show_doc = function(a) {
  var b = jQuery.call(null, "#doc-name"), c = jQuery.call(null, "#doc-args"), d = jQuery.call(null, "#doc-body");
  b.text(a.name);
  c.html(clojure.string.join.call(null, cljs.core.map.call(null, function(a) {
    return cljs.core.str.call(null, "<li>", a, "</li>")
  }, a.arglists)));
  return d.text(a.doc)
};
one.dispatch.react_to.call(null, cljs.core.set(["\ufdd0'switch-page"]), cljs.core.ObjMap.fromObject(["\ufdd0'priority"], {"\ufdd0'priority":2}), function(a, b) {
  var c = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, b)) ? cljs.core.apply.call(null, cljs.core.hash_map, b) : b, c = cljs.core.get.call(null, c, "\ufdd0'data").call(null, "\ufdd0'cljs-ns");
  cljs.core.truth_(c) && cljs.core.reset_BANG_.call(null, ttmachines.client.repl._STAR_cljs_ns_STAR_, c);
  ttmachines.client.repl.init_editor.call(null, ttmachines.client.repl.editor_textarea);
  ttmachines.client.repl.init_result.call(null, ttmachines.client.repl.result_textarea);
  return cljs.core.truth_(ttmachines.client.repl.editor) ? (cljs.core.set_validator_BANG_.call(null, ttmachines.client.repl.code, ttmachines.client.repl.valid_code), cljs.core.reset_BANG_.call(null, ttmachines.client.repl.code, ttmachines.client.repl.editor_text.call(null))) : null
});
ttmachines.client.index = {};
ttmachines.client.index.trim_element_text = function(a) {
  var b = domina.domina.text.call(null, a);
  return domina.domina.set_text_BANG_.call(null, a, clojure.string.trim.call(null, b))
};
ttmachines.client.index.enable_introduce_me_BANG_ = function() {
  return domina.domina.remove_class_BANG_.call(null, domina.domina.css.sel.call(null, "#introduce-me"), "disabled")
};
one.dispatch.react_to.call(null, cljs.core.set(["\ufdd0'switch-page"]), cljs.core.ObjMap.fromObject(["\ufdd0'priority"], {"\ufdd0'priority":3}), function() {
  var a = domina.domina.by_id.call(null, "my-name");
  return cljs.core.truth_(a) ? (domina.domina.events.listen_BANG_.call(null, a, "\ufdd0'blur", function() {
    if(cljs.core.truth_(cljs.core._EQ_.call(null, "", clojure.string.trim.call(null, domina.domina.text.call(null, a))))) {
      return null
    }
    ttmachines.client.index.trim_element_text.call(null, a);
    return ttmachines.client.index.enable_introduce_me_BANG_.call(null)
  }), document.getElementById("my-name").focus()) : null
});
one.dispatch.react_to.call(null, cljs.core.set(["\ufdd0'switch-page"]), cljs.core.ObjMap.fromObject(["\ufdd0'priority"], {"\ufdd0'priority":3}), function() {
  var a = domina.domina.by_id.call(null, "introduce-me");
  if(cljs.core.truth_(a)) {
    var b = domina.domina.css.sel.call(null, "#my-name");
    return domina.domina.events.listen_BANG_.call(null, a, "\ufdd0'click", function() {
      if(cljs.core.truth_(domina.domina.has_class_QMARK_.call(null, a, "disabled"))) {
        return null
      }
      cljs.core.reset_BANG_.call(null, ttmachines.client.chapter.one.my_name, domina.domina.text.call(null, b));
      return ttmachines.client.history.push_state_BANG_.call(null, "\ufdd0'url", "/chapter/1/1")
    })
  }
  return null
});
one.logging = {};
one.logging.ILogViewer = {};
one.logging.start_display = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.one$logging$ILogViewer$start_display : a)) {
    a = a.one$logging$ILogViewer$start_display(a)
  }else {
    var b;
    b = one.logging.start_display[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = one.logging.start_display._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "ILogViewer.start-display", a);
    }
    a = b.call(null, a)
  }
  return a
};
one.logging.stop_display = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.one$logging$ILogViewer$stop_display : a)) {
    a = a.one$logging$ILogViewer$stop_display(a)
  }else {
    var b;
    b = one.logging.stop_display[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = one.logging.stop_display._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "ILogViewer.stop-display", a);
    }
    a = b.call(null, a)
  }
  return a
};
one.logging.levels = cljs.core.ObjMap.fromObject("\ufdd0'severe,\ufdd0'warning,\ufdd0'info,\ufdd0'config,\ufdd0'fine,\ufdd0'finer,\ufdd0'finest".split(","), {"\ufdd0'severe":goog.debug.Logger.Level.SEVERE, "\ufdd0'warning":goog.debug.Logger.Level.WARNING, "\ufdd0'info":goog.debug.Logger.Level.INFO, "\ufdd0'config":goog.debug.Logger.Level.CONFIG, "\ufdd0'fine":goog.debug.Logger.Level.FINE, "\ufdd0'finer":goog.debug.Logger.Level.FINER, "\ufdd0'finest":goog.debug.Logger.Level.FINEST});
one.logging.get_logger = function(a) {
  return goog.debug.Logger.getLogger.call(null, a)
};
one.logging.severe = function(a, b) {
  return a.severe(b)
};
one.logging.warning = function(a, b) {
  return a.warning(b)
};
one.logging.info = function(a, b) {
  return a.info(b)
};
one.logging.config = function(a, b) {
  return a.config(b)
};
one.logging.fine = function(a, b) {
  return a.fine(b)
};
one.logging.finer = function(a, b) {
  return a.finer(b)
};
one.logging.finest = function(a, b) {
  return a.finest(b)
};
one.logging.set_level = function(a, b) {
  return a.setLevel(cljs.core.get.call(null, one.logging.levels, b, goog.debug.Logger.Level.INFO))
};
goog.debug.FancyWindow.prototype.one$logging$ILogViewer$ = !0;
goog.debug.FancyWindow.prototype.one$logging$ILogViewer$start_display = function(a) {
  a.setEnabled(!0);
  a.init(cljs.core.List.EMPTY);
  return a
};
goog.debug.FancyWindow.prototype.one$logging$ILogViewer$stop_display = function(a) {
  return a.setCapturing(!1)
};
goog.debug.Console.prototype.one$logging$ILogViewer$ = !0;
goog.debug.Console.prototype.one$logging$ILogViewer$start_display = function(a) {
  return a.setCapturing(!0)
};
goog.debug.Console.prototype.one$logging$ILogViewer$stop_display = function(a) {
  return a.setCapturing(!1)
};
one.logging.console_output = function() {
  return new goog.debug.Console
};
one.logging.fancy_output = function(a) {
  return new goog.debug.FancyWindow(a)
};
one.color = {};
one.color.IColor = {};
one.color.rgb = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.one$color$IColor$rgb : a)) {
    a = a.one$color$IColor$rgb(a)
  }else {
    var b;
    b = one.color.rgb[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = one.color.rgb._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IColor.rgb", a);
    }
    a = b.call(null, a)
  }
  return a
};
one.color.rgba = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.one$color$IColor$rgba : a)) {
    a = a.one$color$IColor$rgba(a)
  }else {
    var b;
    b = one.color.rgba[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = one.color.rgba._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IColor.rgba", a);
    }
    a = b.call(null, a)
  }
  return a
};
one.color.hex = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.one$color$IColor$hex : a)) {
    a = a.one$color$IColor$hex(a)
  }else {
    var b;
    b = one.color.hex[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = one.color.hex._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IColor.hex", a);
    }
    a = b.call(null, a)
  }
  return a
};
one.color.hex_rgba = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.one$color$IColor$hex_rgba : a)) {
    a = a.one$color$IColor$hex_rgba(a)
  }else {
    var b;
    b = one.color.hex_rgba[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = one.color.hex_rgba._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IColor.hex-rgba", a);
    }
    a = b.call(null, a)
  }
  return a
};
one.color.alpha = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.one$color$IColor$alpha : a)) {
    a = a.one$color$IColor$alpha(a)
  }else {
    var b;
    b = one.color.alpha[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = one.color.alpha._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IColor.alpha", a);
    }
    a = b.call(null, a)
  }
  return a
};
one.color.Color = function(a, b, c, d, e, f) {
  this.r = a;
  this.g = b;
  this.b = c;
  this.a = d;
  this.__meta = e;
  this.__extmap = f;
  4 < arguments.length ? (this.__meta = e, this.__extmap = f) : this.__extmap = this.__meta = null
};
one.color.Color.prototype.cljs$core$IHash$ = !0;
one.color.Color.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
one.color.Color.prototype.cljs$core$ILookup$ = !0;
one.color.Color.prototype.cljs$core$ILookup$_lookup = function() {
  var a = null;
  return function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, a, c, null);
      case 3:
        return cljs.core.get.call(null, cljs.core.merge.call(null, cljs.core.hash_map.call(null, "\ufdd0'r", this.r, "\ufdd0'g", this.g, "\ufdd0'b", this.b, "\ufdd0'a", this.a), this.__extmap), c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
one.color.Color.prototype.cljs$core$IAssociative$ = !0;
one.color.Color.prototype.cljs$core$IAssociative$_assoc = function(a, b, c) {
  a = cljs.core.identical_QMARK_;
  return cljs.core.truth_(a.call(null, "\ufdd0'r", b)) ? new one.color.Color(c, this.g, this.b, this.a, this.__meta, this.__extmap) : cljs.core.truth_(a.call(null, "\ufdd0'g", b)) ? new one.color.Color(this.r, c, this.b, this.a, this.__meta, this.__extmap) : cljs.core.truth_(a.call(null, "\ufdd0'b", b)) ? new one.color.Color(this.r, this.g, c, this.a, this.__meta, this.__extmap) : cljs.core.truth_(a.call(null, "\ufdd0'a", b)) ? new one.color.Color(this.r, this.g, this.b, c, this.__meta, this.__extmap) : 
  new one.color.Color(this.r, this.g, this.b, this.a, this.__meta, cljs.core.assoc.call(null, this.__extmap, b, c))
};
one.color.Color.prototype.one$color$IColor$ = !0;
one.color.Color.prototype.one$color$IColor$rgb = function() {
  return cljs.core.Vector.fromArray([this.r, this.g, this.b])
};
one.color.Color.prototype.one$color$IColor$rgba = function() {
  return cljs.core.Vector.fromArray([this.r, this.g, this.b, this.a])
};
one.color.Color.prototype.one$color$IColor$hex = function() {
  return goog.color.rgbArrayToHex.call(null, cljs.core.array.call(null, this.r, this.g, this.b))
};
one.color.Color.prototype.one$color$IColor$hex_rgba = function() {
  return goog.color.alpha.rgbaArrayToHex.call(null, cljs.core.array.call(null, this.r, this.g, this.b, this.a))
};
one.color.Color.prototype.one$color$IColor$alpha = function() {
  return this.a
};
one.color.Color.prototype.cljs$core$IRecord$ = !0;
one.color.Color.prototype.cljs$core$ICollection$ = !0;
one.color.Color.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return cljs.core.truth_(cljs.core.vector_QMARK_.call(null, b)) ? cljs.core._assoc.call(null, a, cljs.core._nth.call(null, b, 0), cljs.core._nth.call(null, b, 1)) : cljs.core.reduce.call(null, cljs.core._conj, a, b)
};
one.color.Color.prototype.cljs$core$ISeqable$ = !0;
one.color.Color.prototype.cljs$core$ISeqable$_seq = function() {
  return cljs.core.seq.call(null, cljs.core.concat.call(null, cljs.core.Vector.fromArray([cljs.core.vector.call(null, "\ufdd0'r", this.r), cljs.core.vector.call(null, "\ufdd0'g", this.g), cljs.core.vector.call(null, "\ufdd0'b", this.b), cljs.core.vector.call(null, "\ufdd0'a", this.a)]), this.__extmap))
};
one.color.Color.prototype.cljs$core$IPrintable$ = !0;
one.color.Color.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, function(a) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", b, a)
  }, cljs.core.str.call(null, "#", "one.color.Color", "{"), ", ", "}", b, cljs.core.concat.call(null, cljs.core.Vector.fromArray([cljs.core.vector.call(null, "\ufdd0'r", this.r), cljs.core.vector.call(null, "\ufdd0'g", this.g), cljs.core.vector.call(null, "\ufdd0'b", this.b), cljs.core.vector.call(null, "\ufdd0'a", this.a)]), this.__extmap))
};
one.color.Color.prototype.cljs$core$ICounted$ = !0;
one.color.Color.prototype.cljs$core$ICounted$_count = function() {
  return 4 + cljs.core.count.call(null, this.__extmap)
};
one.color.Color.prototype.cljs$core$IEquiv$ = !0;
one.color.Color.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  var c = a.constructor === b.constructor;
  return cljs.core.truth_(c) ? cljs.core.equiv_map.call(null, a, b) : c
};
one.color.Color.prototype.cljs$core$IWithMeta$ = !0;
one.color.Color.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new one.color.Color(this.r, this.g, this.b, this.a, b, this.__extmap)
};
one.color.Color.prototype.cljs$core$IMeta$ = !0;
one.color.Color.prototype.cljs$core$IMeta$_meta = function() {
  return this.__meta
};
one.color.Color.prototype.cljs$core$IMap$ = !0;
one.color.Color.prototype.cljs$core$IMap$_dissoc = function(a, b) {
  return cljs.core.truth_(cljs.core.contains_QMARK_.call(null, cljs.core.set(["\ufdd0'r", "\ufdd0'a", "\ufdd0'b", "\ufdd0'g"]), b)) ? cljs.core.dissoc.call(null, cljs.core.with_meta.call(null, cljs.core.into.call(null, cljs.core.ObjMap.fromObject([], {}), a), this.__meta), b) : new one.color.Color(this.r, this.g, this.b, this.a, this.__meta, cljs.core.not_empty.call(null, cljs.core.dissoc.call(null, this.__extmap, b)))
};
one.color.Color.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "one.color.Color")
};
one.color.__GT_Color = function(a, b, c, d) {
  return new one.color.Color(a, b, c, d)
};
one.color.map__GT_Color = function(a) {
  return new one.color.Color("\ufdd0'r".call(null, a), "\ufdd0'g".call(null, a), "\ufdd0'b".call(null, a), "\ufdd0'a".call(null, a), null, cljs.core.dissoc.call(null, a, "\ufdd0'r", "\ufdd0'g", "\ufdd0'b", "\ufdd0'a"))
};
one.color.make_color = function() {
  var a = null;
  return a = function(b, c, d, e) {
    switch(arguments.length) {
      case 3:
        return a.call(null, b, c, d, 1);
      case 4:
        return new one.color.Color(b, c, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
one.color.IColorSource = {};
one.color.color = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.one$color$IColorSource$color : a)) {
    a = a.one$color$IColorSource$color(a)
  }else {
    var b;
    b = one.color.color[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = one.color.color._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IColorSource.color", a);
    }
    a = b.call(null, a)
  }
  return a
};
one.color.bg_color = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.one$color$IColorSource$bg_color : a)) {
    a = a.one$color$IColorSource$bg_color(a)
  }else {
    var b;
    b = one.color.bg_color[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = one.color.bg_color._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IColorSource.bg-color", a);
    }
    a = b.call(null, a)
  }
  return a
};
Element.prototype.one$color$IColorSource$ = !0;
Element.prototype.one$color$IColorSource$color = function(a) {
  return one.color.color.call(null, cljs.core.js__GT_clj.call(null, goog.color.parse.call(null, one.core.get_style.call(null, a, "color")), "\ufdd0'keywordize-keys", !0))
};
Element.prototype.one$color$IColorSource$bg_color = function(a) {
  return one.color.color.call(null, cljs.core.js__GT_clj.call(null, function() {
    var b = goog.style.getBackgroundColor.call(null, a);
    try {
      return goog.color.parse.call(null, b)
    }catch(c) {
      if(cljs.core.truth_(cljs.core.instance_QMARK_.call(null, Error, c))) {
        return goog.color.alpha.parse.call(null, b)
      }
      if(cljs.core.truth_("\ufdd0'else")) {
        throw c;
      }
      return null
    }
  }(), "\ufdd0'keywordize-keys", !0))
};
cljs.core.ObjMap.prototype.one$color$IColorSource$ = !0;
cljs.core.ObjMap.prototype.one$color$IColorSource$color = function(a) {
  return one.color.color.call(null, "\ufdd0'hex".call(null, a))
};
cljs.core.ObjMap.prototype.one$color$IColorSource$bg_color = function(a) {
  return one.color.color.call(null, a)
};
String.prototype.one$color$IColorSource$ = !0;
String.prototype.one$color$IColorSource$color = function(a) {
  return one.color.color.call(null, cljs.core.js__GT_clj.call(null, cljs.core.truth_(goog.string.startsWith.call(null, a, "#")) ? cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.count.call(null, a), 7)) ? goog.color.hexToRgb.call(null, a) : cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.count.call(null, a), 9)) ? goog.color.alpha.hexToRgba.call(null, a) : null : cljs.core.truth_(goog.string.startsWith.call(null, a, "rgba(")) ? goog.color.alpha.parse.call(null, a) : cljs.core.truth_(goog.string.startsWith.call(null, 
  a, "rgb(")) ? goog.color.parseRgb.call(null, a) : null, "\ufdd0'keywordize-keys", !0))
};
String.prototype.one$color$IColorSource$bg_color = function(a) {
  return one.color.color.call(null, a)
};
Array.prototype.one$color$IColorSource$ = !0;
Array.prototype.one$color$IColorSource$color = function(a) {
  return cljs.core.apply.call(null, one.color.make_color, cljs.core.js__GT_clj.call(null, a))
};
Array.prototype.one$color$IColorSource$bg_color = function(a) {
  return cljs.core.apply.call(null, one.color.make_color, cljs.core.js__GT_clj.call(null, a))
};
cljs.core.Vector.prototype.one$color$IColorSource$ = !0;
cljs.core.Vector.prototype.one$color$IColorSource$color = function(a) {
  return cljs.core.apply.call(null, one.color.make_color, a)
};
cljs.core.Vector.prototype.one$color$IColorSource$bg_color = function(a) {
  return cljs.core.apply.call(null, one.color.make_color, a)
};
one.color.Color.prototype.one$color$IColorSource$ = !0;
one.color.Color.prototype.one$color$IColorSource$color = function(a) {
  return a
};
one.color.Color.prototype.one$color$IColorSource$bg_color = function(a) {
  return a
};
one.color.IColorSource["null"] = !0;
one.color.color["null"] = function() {
  return one.color.make_color.call(null, 0, 0, 0)
};
one.color.bg_color["null"] = function() {
  return one.color.make_color.call(null, 0, 0, 0)
};
one.browser.repl_client = {};
one.browser.repl_client.server = function() {
  var a = window.location.toString(cljs.core.List.EMPTY);
  return cljs.core.str.call(null, goog.uri.utils.getScheme.call(null, a), "://", goog.uri.utils.getDomain.call(null, a))
};
one.browser.repl_client.repl = function() {
  return clojure.browser.repl.connect.call(null, cljs.core.str.call(null, one.browser.repl_client.server.call(null), ":9000/repl"))
};
goog.exportSymbol("one.browser.repl_client.repl", one.browser.repl_client.repl);
domina.domina.xpath = {};
domina.domina.xpath.select_node_STAR_ = function(a, b, c, d) {
  var e = goog.dom.getOwnerDocument.call(null, b);
  if(cljs.core.truth_(function() {
    var a = b.selectSingleNode;
    return cljs.core.truth_(a) ? e.setProperty : a
  }())) {
    return e.setProperty("SelectionLanguage", "XPath"), c.call(null, b, a)
  }
  if(cljs.core.truth_(e.evaluate)) {
    return d.call(null, null, e, b, a)
  }
  if(cljs.core.truth_("\ufdd0'else")) {
    throw Error("Could not find XPath support in this browser.");
  }
  return null
};
domina.domina.xpath.select_node = function(a, b) {
  return domina.domina.xpath.select_node_STAR_.call(null, a, b, function(a, b) {
    return a.selectSingleNode(b)
  }, function(a, b, e, f) {
    return b.evaluate(f, e, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  })
};
domina.domina.xpath.select_nodes = function(a, b) {
  return domina.domina.xpath.select_node_STAR_.call(null, a, b, function(a, b) {
    return a.selectNodes(b)
  }, function(a, b, e, f) {
    for(var a = b.evaluate(f, e, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null), b = a.snapshotLength, e = 0, g = null;;) {
      if(cljs.core.truth_(e < b)) {
        f = e + 1, g = cljs.core.cons.call(null, a.snapshotItem(e), g), e = f
      }else {
        return g
      }
    }
  })
};
domina.domina.xpath.root_element = function() {
  return goog.dom.getElementsByTagNameAndClass.call(null, "html")[0]
};
domina.domina.xpath.xpath = function() {
  var a = null, b = function(b, d) {
    if(cljs.core.truth_(void 0 === domina.domina.xpath.t3126)) {
      domina.domina.xpath.t3126 = function(a, b, c, d) {
        this.expr = a;
        this.base = b;
        this.xpath = c;
        this.__meta = d
      }, domina.domina.xpath.t3126.cljs$core$IPrintable$_pr_seq = function() {
        return cljs.core.list.call(null, "domina.domina.xpath.t3126")
      }, domina.domina.xpath.t3126.prototype.domina$domina$DomContent$ = !0, domina.domina.xpath.t3126.prototype.domina$domina$DomContent$nodes = function() {
        return cljs.core.mapcat.call(null, cljs.core.partial.call(null, domina.domina.xpath.select_nodes, this.expr), domina.domina.nodes.call(null, this.base))
      }, domina.domina.xpath.t3126.prototype.domina$domina$DomContent$single_node = function() {
        return cljs.core.first.call(null, cljs.core.filter.call(null, cljs.core.complement.call(null, cljs.core.nil_QMARK_), cljs.core.map.call(null, cljs.core.partial.call(null, domina.domina.xpath.select_node, this.expr), domina.domina.nodes.call(null, this.base))))
      }, domina.domina.xpath.t3126.prototype.cljs$core$IMeta$ = !0, domina.domina.xpath.t3126.prototype.cljs$core$IMeta$_meta = function() {
        return this.__meta
      }, domina.domina.xpath.t3126.prototype.cljs$core$IWithMeta$ = !0, domina.domina.xpath.t3126.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
        return new domina.domina.xpath.t3126(this.expr, this.base, this.xpath, b)
      }
    }
    return new domina.domina.xpath.t3126(d, b, a, null)
  };
  return a = function(c, d) {
    switch(arguments.length) {
      case 1:
        return a.call(null, domina.domina.xpath.root_element.call(null), c);
      case 2:
        return b.call(this, c, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
