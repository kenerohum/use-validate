import ce, { createContext as pr, forwardRef as gr, useRef as Fe, useState as vr, useContext as hr } from "react";
var ue = { exports: {} }, M = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ke;
function mr() {
  if (ke) return M;
  ke = 1;
  var t = ce, o = Symbol.for("react.element"), E = Symbol.for("react.fragment"), v = Object.prototype.hasOwnProperty, R = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, S = { key: !0, ref: !0, __self: !0, __source: !0 };
  function A(y, m, j) {
    var _, C = {}, w = null, x = null;
    j !== void 0 && (w = "" + j), m.key !== void 0 && (w = "" + m.key), m.ref !== void 0 && (x = m.ref);
    for (_ in m) v.call(m, _) && !S.hasOwnProperty(_) && (C[_] = m[_]);
    if (y && y.defaultProps) for (_ in m = y.defaultProps, m) C[_] === void 0 && (C[_] = m[_]);
    return { $$typeof: o, type: y, key: w, ref: x, props: C, _owner: R.current };
  }
  return M.Fragment = E, M.jsx = A, M.jsxs = A, M;
}
var q = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ie;
function br() {
  return Ie || (Ie = 1, process.env.NODE_ENV !== "production" && function() {
    var t = ce, o = Symbol.for("react.element"), E = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), R = Symbol.for("react.strict_mode"), S = Symbol.for("react.profiler"), A = Symbol.for("react.provider"), y = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), j = Symbol.for("react.suspense"), _ = Symbol.for("react.suspense_list"), C = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), x = Symbol.for("react.offscreen"), s = Symbol.iterator, p = "@@iterator";
    function i(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = s && e[s] || e[p];
      return typeof r == "function" ? r : null;
    }
    var u = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function l(e) {
      {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
          n[a - 1] = arguments[a];
        D("error", e, n);
      }
    }
    function D(e, r, n) {
      {
        var a = u.ReactDebugCurrentFrame, d = a.getStackAddendum();
        d !== "" && (r += "%s", n = n.concat([d]));
        var g = n.map(function(f) {
          return String(f);
        });
        g.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, g);
      }
    }
    var L = !1, B = !1, z = !1, J = !1, K = !1, le;
    le = Symbol.for("react.module.reference");
    function We(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === v || e === S || K || e === R || e === j || e === _ || J || e === x || L || B || z || typeof e == "object" && e !== null && (e.$$typeof === w || e.$$typeof === C || e.$$typeof === A || e.$$typeof === y || e.$$typeof === m || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === le || e.getModuleId !== void 0));
    }
    function Ne(e, r, n) {
      var a = e.displayName;
      if (a)
        return a;
      var d = r.displayName || r.name || "";
      return d !== "" ? n + "(" + d + ")" : n;
    }
    function fe(e) {
      return e.displayName || "Context";
    }
    function P(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && l("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case v:
          return "Fragment";
        case E:
          return "Portal";
        case S:
          return "Profiler";
        case R:
          return "StrictMode";
        case j:
          return "Suspense";
        case _:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case y:
            var r = e;
            return fe(r) + ".Consumer";
          case A:
            var n = e;
            return fe(n._context) + ".Provider";
          case m:
            return Ne(e, e.render, "ForwardRef");
          case C:
            var a = e.displayName || null;
            return a !== null ? a : P(e.type) || "Memo";
          case w: {
            var d = e, g = d._payload, f = d._init;
            try {
              return P(f(g));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var F = Object.assign, Y = 0, de, pe, ge, ve, he, me, be;
    function Ee() {
    }
    Ee.__reactDisabledLog = !0;
    function Ye() {
      {
        if (Y === 0) {
          de = console.log, pe = console.info, ge = console.warn, ve = console.error, he = console.group, me = console.groupCollapsed, be = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Ee,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        Y++;
      }
    }
    function Ve() {
      {
        if (Y--, Y === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: F({}, e, {
              value: de
            }),
            info: F({}, e, {
              value: pe
            }),
            warn: F({}, e, {
              value: ge
            }),
            error: F({}, e, {
              value: ve
            }),
            group: F({}, e, {
              value: he
            }),
            groupCollapsed: F({}, e, {
              value: me
            }),
            groupEnd: F({}, e, {
              value: be
            })
          });
        }
        Y < 0 && l("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Q = u.ReactCurrentDispatcher, ee;
    function G(e, r, n) {
      {
        if (ee === void 0)
          try {
            throw Error();
          } catch (d) {
            var a = d.stack.trim().match(/\n( *(at )?)/);
            ee = a && a[1] || "";
          }
        return `
` + ee + e;
      }
    }
    var re = !1, X;
    {
      var Ue = typeof WeakMap == "function" ? WeakMap : Map;
      X = new Ue();
    }
    function Re(e, r) {
      if (!e || re)
        return "";
      {
        var n = X.get(e);
        if (n !== void 0)
          return n;
      }
      var a;
      re = !0;
      var d = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var g;
      g = Q.current, Q.current = null, Ye();
      try {
        if (r) {
          var f = function() {
            throw Error();
          };
          if (Object.defineProperty(f.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(f, []);
            } catch (T) {
              a = T;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch (T) {
              a = T;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (T) {
            a = T;
          }
          e();
        }
      } catch (T) {
        if (T && a && typeof T.stack == "string") {
          for (var c = T.stack.split(`
`), $ = a.stack.split(`
`), h = c.length - 1, b = $.length - 1; h >= 1 && b >= 0 && c[h] !== $[b]; )
            b--;
          for (; h >= 1 && b >= 0; h--, b--)
            if (c[h] !== $[b]) {
              if (h !== 1 || b !== 1)
                do
                  if (h--, b--, b < 0 || c[h] !== $[b]) {
                    var O = `
` + c[h].replace(" at new ", " at ");
                    return e.displayName && O.includes("<anonymous>") && (O = O.replace("<anonymous>", e.displayName)), typeof e == "function" && X.set(e, O), O;
                  }
                while (h >= 1 && b >= 0);
              break;
            }
        }
      } finally {
        re = !1, Q.current = g, Ve(), Error.prepareStackTrace = d;
      }
      var N = e ? e.displayName || e.name : "", k = N ? G(N) : "";
      return typeof e == "function" && X.set(e, k), k;
    }
    function Me(e, r, n) {
      return Re(e, !1);
    }
    function qe(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function H(e, r, n) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Re(e, qe(e));
      if (typeof e == "string")
        return G(e);
      switch (e) {
        case j:
          return G("Suspense");
        case _:
          return G("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case m:
            return Me(e.render);
          case C:
            return H(e.type, r, n);
          case w: {
            var a = e, d = a._payload, g = a._init;
            try {
              return H(g(d), r, n);
            } catch {
            }
          }
        }
      return "";
    }
    var V = Object.prototype.hasOwnProperty, _e = {}, ye = u.ReactDebugCurrentFrame;
    function Z(e) {
      if (e) {
        var r = e._owner, n = H(e.type, e._source, r ? r.type : null);
        ye.setExtraStackFrame(n);
      } else
        ye.setExtraStackFrame(null);
    }
    function Be(e, r, n, a, d) {
      {
        var g = Function.call.bind(V);
        for (var f in e)
          if (g(e, f)) {
            var c = void 0;
            try {
              if (typeof e[f] != "function") {
                var $ = Error((a || "React class") + ": " + n + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw $.name = "Invariant Violation", $;
              }
              c = e[f](r, f, a, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (h) {
              c = h;
            }
            c && !(c instanceof Error) && (Z(d), l("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, f, typeof c), Z(null)), c instanceof Error && !(c.message in _e) && (_e[c.message] = !0, Z(d), l("Failed %s type: %s", n, c.message), Z(null));
          }
      }
    }
    var ze = Array.isArray;
    function te(e) {
      return ze(e);
    }
    function Je(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, n = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return n;
      }
    }
    function Ke(e) {
      try {
        return $e(e), !1;
      } catch {
        return !0;
      }
    }
    function $e(e) {
      return "" + e;
    }
    function Te(e) {
      if (Ke(e))
        return l("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Je(e)), $e(e);
    }
    var U = u.ReactCurrentOwner, Ge = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ce, Oe, ne;
    ne = {};
    function Xe(e) {
      if (V.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function He(e) {
      if (V.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Ze(e, r) {
      if (typeof e.ref == "string" && U.current && r && U.current.stateNode !== r) {
        var n = P(U.current.type);
        ne[n] || (l('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', P(U.current.type), e.ref), ne[n] = !0);
      }
    }
    function Qe(e, r) {
      {
        var n = function() {
          Ce || (Ce = !0, l("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: n,
          configurable: !0
        });
      }
    }
    function er(e, r) {
      {
        var n = function() {
          Oe || (Oe = !0, l("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: n,
          configurable: !0
        });
      }
    }
    var rr = function(e, r, n, a, d, g, f) {
      var c = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: o,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: n,
        props: f,
        // Record the component responsible for creating this element.
        _owner: g
      };
      return c._store = {}, Object.defineProperty(c._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(c, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: a
      }), Object.defineProperty(c, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: d
      }), Object.freeze && (Object.freeze(c.props), Object.freeze(c)), c;
    };
    function tr(e, r, n, a, d) {
      {
        var g, f = {}, c = null, $ = null;
        n !== void 0 && (Te(n), c = "" + n), He(r) && (Te(r.key), c = "" + r.key), Xe(r) && ($ = r.ref, Ze(r, d));
        for (g in r)
          V.call(r, g) && !Ge.hasOwnProperty(g) && (f[g] = r[g]);
        if (e && e.defaultProps) {
          var h = e.defaultProps;
          for (g in h)
            f[g] === void 0 && (f[g] = h[g]);
        }
        if (c || $) {
          var b = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          c && Qe(f, b), $ && er(f, b);
        }
        return rr(e, c, $, d, a, U.current, f);
      }
    }
    var ae = u.ReactCurrentOwner, Se = u.ReactDebugCurrentFrame;
    function W(e) {
      if (e) {
        var r = e._owner, n = H(e.type, e._source, r ? r.type : null);
        Se.setExtraStackFrame(n);
      } else
        Se.setExtraStackFrame(null);
    }
    var ie;
    ie = !1;
    function se(e) {
      return typeof e == "object" && e !== null && e.$$typeof === o;
    }
    function je() {
      {
        if (ae.current) {
          var e = P(ae.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function nr(e) {
      return "";
    }
    var Pe = {};
    function ar(e) {
      {
        var r = je();
        if (!r) {
          var n = typeof e == "string" ? e : e.displayName || e.name;
          n && (r = `

Check the top-level render call using <` + n + ">.");
        }
        return r;
      }
    }
    function we(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var n = ar(r);
        if (Pe[n])
          return;
        Pe[n] = !0;
        var a = "";
        e && e._owner && e._owner !== ae.current && (a = " It was passed a child from " + P(e._owner.type) + "."), W(e), l('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', n, a), W(null);
      }
    }
    function xe(e, r) {
      {
        if (typeof e != "object")
          return;
        if (te(e))
          for (var n = 0; n < e.length; n++) {
            var a = e[n];
            se(a) && we(a, r);
          }
        else if (se(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var d = i(e);
          if (typeof d == "function" && d !== e.entries)
            for (var g = d.call(e), f; !(f = g.next()).done; )
              se(f.value) && we(f.value, r);
        }
      }
    }
    function ir(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var n;
        if (typeof r == "function")
          n = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === m || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === C))
          n = r.propTypes;
        else
          return;
        if (n) {
          var a = P(r);
          Be(n, e.props, "prop", a, e);
        } else if (r.PropTypes !== void 0 && !ie) {
          ie = !0;
          var d = P(r);
          l("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", d || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && l("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function sr(e) {
      {
        for (var r = Object.keys(e.props), n = 0; n < r.length; n++) {
          var a = r[n];
          if (a !== "children" && a !== "key") {
            W(e), l("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), W(null);
            break;
          }
        }
        e.ref !== null && (W(e), l("Invalid attribute `ref` supplied to `React.Fragment`."), W(null));
      }
    }
    var Ae = {};
    function De(e, r, n, a, d, g) {
      {
        var f = We(e);
        if (!f) {
          var c = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (c += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var $ = nr();
          $ ? c += $ : c += je();
          var h;
          e === null ? h = "null" : te(e) ? h = "array" : e !== void 0 && e.$$typeof === o ? (h = "<" + (P(e.type) || "Unknown") + " />", c = " Did you accidentally export a JSX literal instead of a component?") : h = typeof e, l("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", h, c);
        }
        var b = tr(e, r, n, d, g);
        if (b == null)
          return b;
        if (f) {
          var O = r.children;
          if (O !== void 0)
            if (a)
              if (te(O)) {
                for (var N = 0; N < O.length; N++)
                  xe(O[N], e);
                Object.freeze && Object.freeze(O);
              } else
                l("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              xe(O, e);
        }
        if (V.call(r, "key")) {
          var k = P(e), T = Object.keys(r).filter(function(dr) {
            return dr !== "key";
          }), oe = T.length > 0 ? "{key: someKey, " + T.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ae[k + oe]) {
            var fr = T.length > 0 ? "{" + T.join(": ..., ") + ": ...}" : "{}";
            l(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, oe, k, fr, k), Ae[k + oe] = !0;
          }
        }
        return e === v ? sr(b) : ir(b), b;
      }
    }
    function or(e, r, n) {
      return De(e, r, n, !0);
    }
    function ur(e, r, n) {
      return De(e, r, n, !1);
    }
    var cr = ur, lr = or;
    q.Fragment = v, q.jsx = cr, q.jsxs = lr;
  }()), q;
}
process.env.NODE_ENV === "production" ? ue.exports = mr() : ue.exports = br();
var Er = ue.exports;
const Le = pr({
  register: () => ({
    ref: { current: null },
    onBlur: () => {
    },
    onChange: () => {
    }
  }),
  trigger: () => !0,
  resetErros: () => {
  },
  errors: {}
}), Rr = {
  required: "é obrigatório.",
  cpf: "está incorreto.",
  cnpj: "está incorreto.",
  nameAndLastName: "digite seu nome completo."
}, I = {
  required: "required",
  cpf: "cpf",
  cnpj: "cnpj",
  nameAndLastName: "nameAndLastName"
}, _r = {
  cpf: (t) => {
    const o = t.replace(/\D/g, "");
    let E = "", v = "", R = "", S = "";
    return o.length > 9 ? (E = o.substring(0, 3), v = o.substring(3, 6), R = o.substring(6, 9), S = o.substring(9, 11), `${E}.${v}.${R}-${S}`) : o.length > 6 ? (E = o.substring(0, 3), v = o.substring(3, 6), R = o.substring(6, 9), `${E}.${v}.${R}`) : o.length > 3 ? (E = o.substring(0, 3), v = o.substring(3, 6), `${E}.${v}`) : o;
  },
  "cpf-cnpj": (t) => (t = t.replace(/\D/g, ""), t.length > 14 && (t = t.substring(0, 14)), t.length <= 11 ? (t = t.replace(/(\d{3})(\d)/, "$1.$2"), t = t.replace(/(\d{3})(\d)/, "$1.$2"), t = t.replace(/(\d{3})(\d{1,2})$/, "$1-$2")) : (t = t.replace(/^(\d{2})(\d)/, "$1.$2"), t = t.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3"), t = t.replace(/\.(\d{3})(\d)/, ".$1/$2"), t = t.replace(/(\d{4})(\d)/, "$1-$2")), t),
  cnpj: (t) => (t = t.replace(/\D/g, ""), t.length > 14 && (t = t.substring(0, 14)), t = t.replace(/^(\d{2})(\d)/, "$1.$2"), t = t.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3"), t = t.replace(/\.(\d{3})(\d)/, ".$1/$2"), t = t.replace(/(\d{4})(\d)/, "$1-$2"), t),
  name: (t) => t.split(" ").map((v) => v.length >= 3 ? v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() : v).join(" "),
  "card-number": (t) => t.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim(),
  "card-data": (t) => t.replace(/\D/g, "").replace(/(\d{2})(\d{2})/, "$1/$2"),
  phone: (t) => {
    const o = t.replace(/[^\d]/g, "");
    return t.length >= 16 ? t.slice(0, 16) : o.length <= 2 ? `(${o}` : o.length <= 3 ? `(${o.slice(0, 2)}) ${o.slice(2)}` : o.length <= 7 ? `(${o.slice(0, 2)}) ${o.slice(2, 3)} ${o.slice(3)}` : `(${o.slice(0, 2)}) ${o.slice(2, 3)} ${o.slice(3, 7)}-${o.slice(7, 11)}`;
  },
  chassi: (t) => (t = t.replace(/[^A-HJ-NPR-Z0-9]/gi, "").toUpperCase(), t.length > 5 && t.length <= 10 ? `${t.slice(0, 5)}-${t.slice(5)}` : t.length > 10 && t.length <= 15 ? `${t.slice(0, 5)}-${t.slice(5, 10)}-${t.slice(10)}` : t.length > 15 ? `${t.slice(0, 5)}-${t.slice(5, 10)}-${t.slice(10, 15)}-${t.slice(15, 17)}` : t),
  plate: (t) => (t = t.replace(/[^A-Z0-9]/gi, "").toUpperCase(), t.length <= 3 ? t : t.length <= 7 ? `${t.slice(0, 3)}-${t.slice(3, 7)}` : `${t.slice(0, 3)}-${t.slice(3, 7)}`)
}, $r = gr(
  ({ children: t }, o) => {
    const E = Fe({}), v = Fe({}), [R, S] = vr({}), A = (s, p) => {
      var l, D;
      let i = !1, u = "";
      p ? (l = v.current[s]) != null && l.cpf && p && !_(p) ? (u = y(s, I.cpf), i = !0) : (D = v.current[s]) != null && D.nameAndLastName && p && !C(p) ? (u = y(s, I.nameAndLastName), i = !0) : i = !1 : (u = y(s, I.required), i = !0), S((L) => ({
        ...L,
        [s]: i ? {
          error: !0,
          message: u
        } : void 0
      }));
    }, y = (s, p) => {
      var i;
      return `${w(((i = v.current[s]) == null ? void 0 : i.nameOptional) || s)} ${Rr[p]}`;
    }, m = (s, p, i = { required: !0 }) => {
      const u = ce.createRef();
      return E.current[s] = u, v.current[s] = i, {
        ref: u,
        onBlur: (l) => {
          i != null && i.required && A(s, l.target.value);
        },
        onChange: (l) => {
          i != null && i.required && A(s, l.target.value), i != null && i.mask && (l.target.value = _r[i == null ? void 0 : i.mask](l.target.value)), p(l);
        }
      };
    }, j = (s) => {
      let p = !0;
      const i = { ...R };
      return s || (s = Object.keys(E.current)), s.forEach((u) => {
        var D, L, B, z, J, K;
        const l = (L = (D = E.current[u]) == null ? void 0 : D.current) == null ? void 0 : L.value;
        (B = E.current[u]) != null && B.current && (l || (i[u] = {
          error: !0,
          message: y(u, I.required)
        }, p = !1), (z = v.current[u]) != null && z.cpf && l && !_(l) && (i[u] = {
          error: !0,
          message: y(u, I.cpf)
        }, p = !1), (J = v.current[u]) != null && J.cnpj && l && l.length < 18 && (i[u] = {
          error: !0,
          message: y(u, I.cnpj)
        }, p = !1), (K = v.current[u]) != null && K.nameAndLastName && l && !C(l) && (i[u] = {
          error: !0,
          message: y(u, I.nameAndLastName)
        }, p = !1));
      }), S(i), p;
    };
    function _(s) {
      if (s = s.replace(/\D/g, ""), s.length !== 11 || /^(\d)\1{10}$/.test(s))
        return !1;
      let p = 0, i;
      for (let u = 1; u <= 9; u++)
        p += parseInt(s.substring(u - 1, u)) * (11 - u);
      if (i = p * 10 % 11, (i === 10 || i === 11) && (i = 0), i !== parseInt(s.substring(9, 10)))
        return !1;
      p = 0;
      for (let u = 1; u <= 10; u++)
        p += parseInt(s.substring(u - 1, u)) * (12 - u);
      return i = p * 10 % 11, (i === 10 || i === 11) && (i = 0), i === parseInt(s.substring(10, 11));
    }
    function C(s) {
      const p = s.trim().split(" ");
      return p.length >= 2 && p[0].length >= 3;
    }
    function w(s) {
      return s && s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : s;
    }
    const x = (s) => {
      const p = { ...R };
      s || (s = Object.keys(E.current)), s.forEach((i) => {
        p[i] = null;
      }), S(p);
    };
    return typeof o == "function" ? o({ register: m, errors: R, trigger: j, resetErros: x }) : o && (o.current = { register: m, errors: R, trigger: j, resetErros: x }), /* @__PURE__ */ Er.jsx(Le.Provider, { value: { register: m, errors: R, trigger: j, resetErros: x }, children: t({ register: m, errors: R, trigger: j, resetErros: x }) });
  }
), Tr = () => hr(Le);
export {
  $r as ValidationProvider,
  Tr as useValidation
};
