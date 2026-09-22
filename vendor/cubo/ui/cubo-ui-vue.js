var Tu = Object.defineProperty;
var Iu = (e, t, a) => t in e ? Tu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var ze = (e, t, a) => Iu(e, typeof t != "symbol" ? t + "" : t, a);
import { defineComponent as N, createVNode as n, getCurrentInstance as at, mergeProps as te, Fragment as se, inject as St, computed as O, provide as Lu, shallowRef as Un, watch as Q, onMounted as ye, ref as E, nextTick as be, onUnmounted as Se, Teleport as De, createApp as Fu, shallowReactive as Ou, h as wa, onBeforeUnmount as $e, createTextVNode as xe, onUpdated as hl, isVNode as Ce, cloneVNode as _l, Comment as Bu, Text as Pu, useId as ot, reactive as Ru, withModifiers as Rt, useSlots as Nu } from "vue";
import { g as Ca, c as pa, h as qu } from "./registry-C8AtAPDw.js";
import { I as Vd, K as Ud, b as Hd, r as Gd } from "./registry-C8AtAPDw.js";
import { useRouter as wl, useRoute as Hn, onBeforeRouteLeave as Mu, RouterLink as dn } from "vue-router";
const Ku = [
  { abbr: "en", name: "English" },
  { abbr: "ru", name: "Русский" }
], $t = "en", $u = {
  en: "en-US",
  ru: "ru-RU"
};
function ju(e) {
  return Ku.some((t) => t.abbr === e) ? e : $t;
}
function un(e, t) {
  if (e == null) return;
  let a = e;
  for (const l of t.split(".")) {
    if (a == null || typeof a != "object") return;
    a = a[l];
  }
  return a;
}
function Cl(e, t) {
  return t ? e.replace(
    /\{(\w+)\}/g,
    (a, l) => l in t ? String(t[l]) : a
  ) : e;
}
class Vu {
  constructor(t) {
    ze(this, "locale");
    ze(this, "fallbackLocale");
    ze(this, "translations");
    ze(this, "listeners", /* @__PURE__ */ new Set());
    ze(this, "t", (t, a, l) => {
      var i, o;
      let u = un((i = this.translations) == null ? void 0 : i[this.locale], t);
      return u = u ?? un((o = this.translations) == null ? void 0 : o[this.fallbackLocale], t), u = u ?? l ?? t, typeof u == "string" ? Cl(u, a) : typeof u == "function" ? u(a, l) : `${u}`;
    });
    // setLocale/getLocale/subscribe are bound arrow fields (not prototype methods)
    // so they can be handed straight to a store binding — e.g. React's
    // `useSyncExternalStore(i18n.subscribe, i18n.getLocale)` — without losing `this`.
    ze(this, "setLocale", (t) => {
      t !== this.locale && (this.locale = t, this.listeners.forEach((a) => a(t)));
    });
    ze(this, "getLocale", () => this.locale);
    /** Subscribe to locale changes; returns an unsubscribe fn. */
    ze(this, "subscribe", (t) => (this.listeners.add(t), () => this.listeners.delete(t)));
    this.locale = t.locale, this.fallbackLocale = t.fallbackLocale ?? t.locale, this.translations = t.translations;
  }
  /** A translator bound to a sub-tree, so keys are relative to `base`. */
  tBase(t) {
    return (a, l, u) => {
      const i = t ? `${t}.${a}` : a;
      return this.t(i, l, u);
    };
  }
}
function Rs(e) {
  return new Vu(e);
}
function Ns(e, t) {
  var o, r, c;
  if (typeof window > "u") return t;
  const a = (o = window.localStorage) == null ? void 0 : o.getItem("cubo_lng");
  if (a && e.includes(a)) return a;
  const l = (r = navigator.language) == null ? void 0 : r.split("-")[0];
  if (l && e.includes(l)) return l;
  const u = ((c = navigator.languages) == null ? void 0 : c.filter(Boolean).map((s) => s.split("-")[0])) ?? [];
  for (const s of u) if (e.includes(s)) return s;
  const i = typeof document < "u" ? document.documentElement.lang : "";
  return i && e.includes(i) ? i : t;
}
const Sa = {
  en: "https://static.cubo.sh",
  ru: "https://static.cuboapp.ru"
};
function Uu(e) {
  return e && Sa[e] || Sa[$t];
}
function ka(e, t, a) {
  return `${e.replace(/\/+$/, "")}/icons/${t}/${encodeURIComponent(a)}.svg`;
}
function Hu(e) {
  return e.replace(/^[\s\S]*?<svg\b[^>]*>/i, "").replace(/<\/svg\s*>[\s\S]*$/i, "").trim();
}
const Bt = /* @__PURE__ */ new Map();
function xa(e) {
  let t = Bt.get(e);
  return t || (t = typeof fetch > "u" ? Promise.resolve(null) : fetch(e, { cache: "force-cache" }).then((a) => a.ok ? a.text() : null).then(
    (a) => a && /<svg\b[^>]*>/i.test(a) ? Hu(a) : null
  ).catch(() => (Bt.delete(e), null)), Bt.set(e, t)), t;
}
function qs(e) {
  e ? Bt.delete(e) : Bt.clear();
}
async function Gu(e, t, a = !1) {
  if (a) {
    const u = await xa(ka(e, "generated-filled", t));
    if (u) return { inner: u, filled: !0 };
  }
  return { inner: await xa(ka(e, "generated", t)), filled: !1 };
}
const Ms = [
  "primary",
  "neutral",
  "success",
  "warning",
  "danger"
], Zu = {
  primary: "var(--c-color-primary)",
  neutral: "var(--c-color-gray-70)",
  success: "var(--c-color-success)",
  warning: "var(--c-color-warning)",
  danger: "var(--c-color-danger)"
};
function Be(e) {
  if (e != null)
    return Zu[e] ?? e;
}
let Pn = {};
const Rn = /* @__PURE__ */ new Set();
function Ks(e) {
  Pn = { ...Pn, ...e }, Rn.forEach((t) => t());
}
function pl() {
  return Pn;
}
function Wu(e) {
  return Rn.add(e), () => {
    Rn.delete(e);
  };
}
const Wt = [255, 255, 255], Lt = [0, 0, 0], Yu = [
  { stop: "10", toward: Wt, t: 0.95 },
  { stop: "20", toward: Wt, t: 0.85 },
  { stop: "30", toward: Wt, t: 0.7 },
  { stop: "40", toward: Wt, t: 0.45 },
  { stop: "50", toward: null, t: 0 },
  { stop: "60", toward: Lt, t: 0.12 },
  { stop: "70", toward: Lt, t: 0.26 },
  { stop: "80", toward: Lt, t: 0.4 },
  { stop: "90", toward: Lt, t: 0.52 },
  { stop: "100", toward: Lt, t: 0.68 }
], Aa = {
  sharp: { sm: "0px", md: "2px", lg: "4px", xl: "6px" },
  default: { sm: "2px", md: "8px", lg: "12px", xl: "16px" },
  rounded: { sm: "5px", md: "12px", lg: "18px", xl: "24px" },
  full: { sm: "8px", md: "16px", lg: "24px", xl: "32px" }
};
function Qu(e) {
  let t = e.replace("#", "").trim();
  t.length === 3 && (t = t.split("").map((l) => l + l).join(""));
  const a = parseInt(t, 16);
  return [a >> 16 & 255, a >> 8 & 255, a & 255];
}
function za([e, t, a]) {
  return "#" + [e, t, a].map(
    (l) => Math.round(Math.max(0, Math.min(255, l))).toString(16).padStart(2, "0")
  ).join("");
}
function Ju(e, t, a) {
  return [
    e[0] + (t[0] - e[0]) * a,
    e[1] + (t[1] - e[1]) * a,
    e[2] + (t[2] - e[2]) * a
  ];
}
function Xu(e) {
  const t = Qu(e), a = {};
  for (const { stop: l, toward: u, t: i } of Yu)
    a[l] = za(u ? Ju(t, u, i) : t);
  return a;
}
function $s(e) {
  const t = Xu(e), a = document.documentElement;
  for (const [l, u] of Object.entries(t))
    a.style.setProperty(`--c-color-primary-${l}`, u);
}
function js(e) {
  const t = Aa[e] ?? Aa.default, a = document.documentElement;
  for (const [l, u] of Object.entries(t))
    a.style.setProperty(`--c-radius-${l}`, u);
}
const ei = {
  error: "alert-circle",
  success: "circle-check",
  warning: "alert-triangle"
};
function Ee(e) {
  if (!(typeof document > "u")) {
    if (e) {
      const t = document.querySelector(e);
      if (t) return t;
    }
    return document.querySelector("#app") ?? document.body;
  }
}
function Sl(e, t, a = 8, l = typeof window > "u" ? 0 : window.innerHeight) {
  const u = l - (e.top + e.height) - a, i = e.top - a;
  return t <= u || i <= u ? null : `${Math.max(4, e.top - t - a)}px`;
}
function rt(e, t, a = 8) {
  const l = e.left + e.width / 2, u = e.top + e.height / 2, i = e.left + e.width, o = e.top + e.height;
  switch (t) {
    case "top":
      return { top: `${e.top - a}px`, left: `${l}px`, transform: "translate(-50%, -100%)" };
    case "top_left":
      return { top: `${e.top - a}px`, left: `${e.left}px`, transform: "translate(0, -100%)" };
    case "top_right":
      return { top: `${e.top - a}px`, left: `${i}px`, transform: "translate(-100%, -100%)" };
    case "bottom":
      return { top: `${o + a}px`, left: `${l}px`, transform: "translate(-50%, 0)" };
    case "bottom_left":
      return { top: `${o + a}px`, left: `${e.left}px`, transform: "translate(0, 0)" };
    case "bottom_right":
      return { top: `${o + a}px`, left: `${i}px`, transform: "translate(-100%, 0)" };
    case "left":
      return { top: `${u}px`, left: `${e.left - a}px`, transform: "translate(-100%, -50%)" };
    case "right":
      return { top: `${u}px`, left: `${i + a}px`, transform: "translate(0, -50%)" };
  }
}
const jt = ["small", "medium", "large"], Vs = [
  "default",
  "error",
  "success",
  "warning"
], Us = [
  "text",
  "search",
  "email",
  "url",
  "tel",
  "password",
  "number",
  "date",
  "time",
  "datetime-local",
  "month",
  "week"
];
function W(...e) {
  return e.filter(Boolean).join(" ");
}
function nt(e) {
  typeof process < "u" && process.env && process.env.NODE_ENV === "production" || console.warn(`[cubo-ui] ${e}`);
}
function Hs(e) {
  return typeof e == "string" || typeof e == "number";
}
function kl(e) {
  return typeof e == "number" ? `${e}px` : e;
}
function xl(e) {
  return e === "small" ? 16 : e === "large" ? 20 : 18;
}
function ti(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Da(e, t) {
  return t ? `<title>${ti(t)}</title>${e}` : e;
}
const ni = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function Al(e) {
  return e ? Array.from(e.querySelectorAll(ni)).filter(
    (t) => !t.hasAttribute("disabled") && t.getAttribute("aria-hidden") !== "true" && (t.offsetWidth > 0 || t.offsetHeight > 0 || t.getClientRects().length > 0)
  ) : [];
}
let Yt = 0, Ft = null;
function zl() {
  if (typeof document > "u") return () => {
  };
  const e = document.body;
  if (Yt === 0) {
    const a = window.innerWidth - document.documentElement.clientWidth;
    Ft = { overflow: e.style.overflow, paddingRight: e.style.paddingRight }, e.style.overflow = "hidden", a > 0 && (e.style.paddingRight = `${a}px`);
  }
  Yt += 1;
  let t = !1;
  return () => {
    t || (t = !0, Yt -= 1, Yt === 0 && Ft && (e.style.overflow = Ft.overflow, e.style.paddingRight = Ft.paddingRight, Ft = null));
  };
}
function ai(e, t) {
  return t === "number" ? e.value === "" ? null : e.valueAsNumber : e.value;
}
function li(e) {
  return e == null ? "" : typeof e == "number" ? Number.isNaN(e) ? "" : String(e) : e;
}
function Gn(e, t) {
  if (!t)
    return {
      year: e.getFullYear(),
      month: e.getMonth(),
      day: e.getDate(),
      hour: e.getHours(),
      minute: e.getMinutes()
    };
  const a = new Intl.DateTimeFormat("en-US", {
    timeZone: t,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: !1
  }), l = {};
  for (const i of a.formatToParts(e))
    i.type !== "literal" && (l[i.type] = i.value);
  let u = parseInt(l.hour, 10);
  return u === 24 && (u = 0), { year: +l.year, month: +l.month - 1, day: +l.day, hour: u, minute: +l.minute };
}
function he(e, t) {
  const a = Gn(e, t);
  return { year: a.year, month: a.month, day: a.day };
}
function fn(e, t) {
  const a = Gn(e, t);
  return { hour: a.hour, minute: a.minute };
}
function Ne(e, t, a, l = 0, u = 0, i) {
  if (!i) return new Date(e, t, a, l, u, 0, 0);
  const o = Date.UTC(e, t, a, l, u), r = Gn(new Date(o), i), c = Date.UTC(e, t, a, l, u), s = Date.UTC(r.year, r.month, r.day, r.hour, r.minute);
  return new Date(o + (c - s));
}
function He(e, t, a) {
  if (!e || !t) return !1;
  const l = he(e, a), u = he(t, a);
  return l.year === u.year && l.month === u.month && l.day === u.day;
}
function Qt(e, t, a) {
  const l = he(e, a), u = he(t, a), i = l.year * 1e4 + l.month * 100 + l.day, o = u.year * 1e4 + u.month * 100 + u.day;
  return i < o ? -1 : i > o ? 1 : 0;
}
function Je(e, t, a) {
  const l = e * 12 + t + a;
  return { year: Math.floor(l / 12), month: (l % 12 + 12) % 12 };
}
function ui(e, t, a = {}) {
  const l = a.weekStartsOn ?? 1, i = (new Date(e, t, 1).getDay() - l + 7) % 7, o = new Date(e, t, 1 - i), r = he(/* @__PURE__ */ new Date(), a.timeZone), c = [];
  for (let s = 0; s < 42; s++) {
    const b = new Date(o.getFullYear(), o.getMonth(), o.getDate() + s), d = b.getFullYear(), f = b.getMonth(), y = b.getDate();
    c.push({
      date: Ne(d, f, y, 0, 0, a.timeZone),
      year: d,
      month: f,
      day: y,
      inMonth: f === t,
      isToday: d === r.year && f === r.month && y === r.day,
      weekday: b.getDay()
    });
  }
  return c;
}
function ii(e, t = 1) {
  const a = new Intl.DateTimeFormat(e, { weekday: "short" });
  return Array.from(
    { length: 7 },
    (l, u) => a.format(new Date(2023, 0, 1 + (u + t) % 7))
  );
}
function Ea(e, t, a) {
  return new Intl.DateTimeFormat(a, { month: "long", year: "numeric" }).format(new Date(e, t, 1));
}
const Ta = (e) => String(e).padStart(2, "0");
function Sn(e, t = "dd.mm.yyyy", a) {
  if (!e) return "";
  const { year: l, month: u, day: i } = he(e, a);
  return t.replace(/yyyy/g, String(l)).replace(/mm/g, Ta(u + 1)).replace(/dd/g, Ta(i));
}
function oi(e, t = "dd.mm.yyyy", a) {
  const l = [];
  t.replace(/dd|mm|yyyy/g, (s) => (l.push(s === "dd" ? "d" : s === "mm" ? "m" : "y"), s));
  const u = e.match(/\d+/g);
  if (!u || u.length < 3) return null;
  let i = 1, o = 1, r = 1970;
  if (l.forEach((s, b) => {
    const d = parseInt(u[b], 10);
    s === "d" ? i = d : s === "m" ? o = d : r = d;
  }), r < 100 && (r += 2e3), o < 1 || o > 12 || i < 1 || i > 31) return null;
  const c = Ne(r, o - 1, i, 0, 0, a);
  return he(c, a).day !== i ? null : c;
}
function ri(e) {
  let t = e.replace("#", "").trim();
  t.length === 3 && (t = t.split("").map((l) => l + l).join(""));
  const a = parseInt(t || "000000", 16);
  return [a >> 16 & 255, a >> 8 & 255, a & 255];
}
function ci([e, t, a]) {
  return "#" + [e, t, a].map((l) => Math.round(Math.max(0, Math.min(255, l))).toString(16).padStart(2, "0")).join("");
}
function si([e, t, a]) {
  const l = e / 255, u = t / 255, i = a / 255, o = Math.max(l, u, i), r = Math.min(l, u, i), c = o - r;
  let s = 0;
  c !== 0 && (o === l ? s = (u - i) / c % 6 : o === u ? s = (i - l) / c + 2 : s = (l - u) / c + 4, s *= 60, s < 0 && (s += 360));
  const b = o === 0 ? 0 : c / o;
  return { h: s, s: b, v: o };
}
function di({ h: e, s: t, v: a }) {
  const l = a * t, u = l * (1 - Math.abs(e / 60 % 2 - 1)), i = a - l;
  let o = 0, r = 0, c = 0;
  return e < 60 ? [o, r, c] = [l, u, 0] : e < 120 ? [o, r, c] = [u, l, 0] : e < 180 ? [o, r, c] = [0, l, u] : e < 240 ? [o, r, c] = [0, u, l] : e < 300 ? [o, r, c] = [u, 0, l] : [o, r, c] = [l, 0, u], [(o + i) * 255, (r + i) * 255, (c + i) * 255];
}
function Jt(e) {
  return si(ri(e));
}
function kn(e) {
  return ci(di(e));
}
function Xt(e) {
  const t = e.trim().replace(/^#/, "");
  return /^[0-9a-fA-F]{3}$/.test(t) ? "#" + t.split("").map((a) => a + a).join("").toLowerCase() : /^[0-9a-fA-F]{6}$/.test(t) ? "#" + t.toLowerCase() : null;
}
const fi = ["table", "cards", "pipeline"];
function Nt(e = "table") {
  return { view: e, filters: [], sort: [], group: null, search: "", preset: null };
}
const bi = {
  text: !0,
  number: !0,
  boolean: !0,
  date: !0,
  timestamp: !0,
  select: !0,
  multiselect: !1
}, vi = {
  text: !0,
  number: !1,
  boolean: !0,
  date: !0,
  timestamp: !0,
  select: !0,
  multiselect: !0
};
function yi(e) {
  return e.sortable ?? bi[e.type];
}
function Nn(e) {
  return e.groupable ?? vi[e.type];
}
function Dl(e) {
  return e.filterable ?? !0;
}
function qn(e) {
  return e.type === "select" && Array.isArray(e.options) && e.options.length > 0;
}
function ht(e) {
  return e.filterKey ?? e.key;
}
function El(e) {
  return e.sortKey ?? e.key;
}
function qt(e) {
  return e.groupKey ?? e.key;
}
const mi = {
  eq: "is",
  ne: "is not",
  contains: "contains",
  notContains: "doesn't contain",
  gt: ">",
  gte: "≥",
  lt: "<",
  lte: "≤",
  between: "between",
  before: "before",
  after: "after",
  in: "is any of",
  notIn: "is none of",
  isTrue: "is checked",
  isFalse: "is unchecked",
  empty: "is empty",
  notEmpty: "is not empty"
}, gi = {
  text: ["contains", "notContains", "eq", "ne", "empty", "notEmpty"],
  number: ["eq", "ne", "gt", "gte", "lt", "lte", "between", "empty", "notEmpty"],
  boolean: ["isTrue", "isFalse"],
  date: ["eq", "before", "after", "between", "empty", "notEmpty"],
  timestamp: ["eq", "before", "after", "between", "empty", "notEmpty"],
  select: ["in", "notIn", "empty", "notEmpty"],
  multiselect: ["in", "notIn", "empty", "notEmpty"]
};
function Tl(e) {
  return gi[e].map((t) => ({ op: t, label: mi[t] }));
}
function hi(e) {
  return e === "empty" || e === "notEmpty" || e === "isTrue" || e === "isFalse";
}
function _t(e, t) {
  if (!t) return e;
  const a = new Set(e), l = t.filter((u) => a.has(u));
  return l.length ? l : e;
}
function bn(e, t) {
  if (!(t.length === e.length && t.every((a, l) => a === e[l])))
    return t;
}
function Il(e, t, a) {
  const l = _t(e, t), u = l.includes(a) ? l.filter((i) => i !== a) : (
    // re-insert at its natural position so a re-shown column returns near home
    e.filter((i) => l.includes(i) || i === a)
  );
  return bn(e, u);
}
function _i(e, t, a, l, u) {
  if (a === l) return t;
  const i = _t(e, t).filter((r) => r !== a);
  let o = i.indexOf(l);
  return o < 0 ? t : (u && (o += 1), i.splice(o, 0, a), bn(e, i));
}
const Mn = "cubo-data:columns:";
function Ia() {
  if (typeof window > "u" || !window.location) return "";
  const { pathname: e, hash: t } = window.location, a = t ? t.replace(/^#/, "").split("?")[0] : "";
  return e + (a ? `#${a}` : "");
}
function wi(e) {
  var t;
  if (!(typeof window > "u" || !e))
    try {
      const a = (t = window.localStorage) == null ? void 0 : t.getItem(Mn + e);
      if (!a) return;
      const l = JSON.parse(a);
      return Array.isArray(l) && l.every((u) => typeof u == "string") ? l : void 0;
    } catch {
      return;
    }
}
function Ci(e, t) {
  if (!(typeof window > "u" || !e))
    try {
      const a = window.localStorage;
      if (!a) return;
      t && t.length ? a.setItem(Mn + e, JSON.stringify(t)) : a.removeItem(Mn + e);
    } catch {
    }
}
function wt(e, t) {
  return e == null ? void 0 : e[t];
}
function Fe(e) {
  if (e == null || e === "") return null;
  if (e instanceof Date) return e.getTime();
  if (typeof e == "number") return e;
  const t = new Date(e).getTime();
  return Number.isNaN(t) ? null : t;
}
function ut(e, t) {
  var l;
  const a = (l = e.options) == null ? void 0 : l.find((u) => u.value === t);
  return a ? a.label : t == null ? "" : String(t);
}
function on(e, t) {
  var a, l;
  return (l = (a = e.options) == null ? void 0 : a.find((u) => u.value === t)) == null ? void 0 : l.color;
}
function et(e, t) {
  const a = wt(t, e.key);
  if (a == null || a === "") return "";
  switch (e.type) {
    case "boolean":
      return a ? "Yes" : "No";
    case "date": {
      const l = Fe(a);
      return l == null ? "" : new Date(l).toLocaleDateString();
    }
    case "timestamp": {
      const l = Fe(a);
      return l == null ? "" : new Date(l).toLocaleString();
    }
    case "select":
      return ut(e, a);
    case "multiselect":
      return Array.isArray(a) ? a.map((l) => ut(e, l)).join(", ") : ut(e, a);
    default:
      return String(a);
  }
}
function Kn(e) {
  const t = Fe(e);
  if (t == null) return null;
  const a = new Date(t);
  return new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
}
function pi(e, t, a) {
  const l = e.filterValue ? e.filterValue(t) : wt(t, e.key), u = l == null || l === "" || Array.isArray(l) && l.length === 0;
  switch (a.op) {
    case "empty":
      return u;
    case "notEmpty":
      return !u;
    case "isTrue":
      return l === !0;
    case "isFalse":
      return l === !1 || l == null;
    case "contains":
      return String(l ?? "").toLowerCase().includes(String(a.value ?? "").toLowerCase());
    case "notContains":
      return !String(l ?? "").toLowerCase().includes(String(a.value ?? "").toLowerCase());
    case "eq":
      return e.type === "date" || e.type === "timestamp" ? Kn(l) === Kn(a.value) : String(l ?? "") === String(a.value ?? "");
    case "ne":
      return String(l ?? "") !== String(a.value ?? "");
    case "gt":
    case "gte":
    case "lt":
    case "lte": {
      const i = Number(l), o = Number(a.value);
      return Number.isNaN(i) || Number.isNaN(o) ? !1 : a.op === "gt" ? i > o : a.op === "gte" ? i >= o : a.op === "lt" ? i < o : i <= o;
    }
    case "between": {
      if (e.type === "date" || e.type === "timestamp") {
        const c = Fe(l), s = Fe(a.value), b = Fe(a.value2);
        return c == null ? !1 : (s == null || c >= s) && (b == null || c <= b);
      }
      const i = Number(l);
      if (Number.isNaN(i)) return !1;
      const o = a.value == null || a.value === "" ? null : Number(a.value), r = a.value2 == null || a.value2 === "" ? null : Number(a.value2);
      return (o == null || i >= o) && (r == null || i <= r);
    }
    case "before": {
      const i = Fe(l), o = Fe(a.value);
      return i != null && o != null && i < o;
    }
    case "after": {
      const i = Fe(l), o = Fe(a.value);
      return i != null && o != null && i > o;
    }
    case "in": {
      const i = Array.isArray(a.value) ? a.value : [a.value];
      return Array.isArray(l) ? l.some((o) => i.includes(o)) : i.includes(l);
    }
    case "notIn": {
      const i = Array.isArray(a.value) ? a.value : [a.value];
      return Array.isArray(l) ? !l.some((o) => i.includes(o)) : !i.includes(l);
    }
    default:
      return !0;
  }
}
function Ll(e, t, a) {
  if (!t.length) return e;
  const l = new Map(a.map((u) => [ht(u), u]));
  return e.filter(
    (u) => t.every((i) => {
      const o = l.get(i.field);
      return o ? pi(o, u, i) : !0;
    })
  );
}
function Si(e, t, a) {
  const l = t.trim().toLowerCase();
  return l ? e.filter((u) => a.some((i) => et(i, u).toLowerCase().includes(l))) : e;
}
function ki(e, t, a) {
  const l = wt(t, e.key), u = wt(a, e.key), i = l == null || l === "", o = u == null || u === "";
  if (i && o) return 0;
  if (i) return 1;
  if (o) return -1;
  switch (e.type) {
    case "number":
      return Number(l) - Number(u);
    case "boolean":
      return (l ? 1 : 0) - (u ? 1 : 0);
    case "date":
    case "timestamp":
      return (Fe(l) ?? 0) - (Fe(u) ?? 0);
    case "select":
      return ut(e, l).localeCompare(ut(e, u));
    default:
      return String(l).localeCompare(String(u), void 0, { numeric: !0 });
  }
}
function xi(e, t, a) {
  if (!t.length) return e;
  const l = new Map(a.map((u) => [El(u), u]));
  return e.slice().sort((u, i) => {
    for (const o of t) {
      const r = l.get(o.field);
      if (!r) continue;
      const c = ki(r, u, i);
      if (c !== 0) return o.dir === "desc" ? -c : c;
    }
    return 0;
  });
}
function La(e, t, a = !1) {
  const l = e.find((i) => i.field === t), u = a ? e.filter((i) => i.field !== t) : [];
  return l ? l.dir === "asc" ? [...u, { field: t, dir: "desc" }] : u : [...u, { field: t, dir: "asc" }];
}
function Fl(e, t, a) {
  const l = a.find((c) => qt(c) === t);
  if (!l) return [{ key: "__all__", label: "", value: null, rows: e }];
  const u = /* @__PURE__ */ new Map(), i = { key: "__empty__", label: "—", value: null, rows: [] };
  if (l.type === "select")
    for (const c of l.options ?? [])
      u.set(String(c.value), { key: String(c.value), label: c.label, value: c.value, color: c.color, rows: [] });
  else l.type === "boolean" && (u.set("true", { key: "true", label: "Yes", value: !0, rows: [] }), u.set("false", { key: "false", label: "No", value: !1, rows: [] }));
  const o = (c, s, b) => {
    let d = u.get(c);
    d || (d = s(), u.set(c, d)), d.rows.push(b);
  };
  for (const c of e) {
    const s = l.groupValue ? l.groupValue(c) : wt(c, l.key);
    if (s == null || s === "" || Array.isArray(s) && s.length === 0) {
      i.rows.push(c);
      continue;
    }
    if (l.type === "multiselect" && Array.isArray(s))
      for (const b of s)
        o(String(b), () => ({ key: String(b), label: ut(l, b), value: b, color: on(l, b), rows: [] }), c);
    else if (l.type === "date" || l.type === "timestamp") {
      const b = Kn(s), d = b == null ? "—" : new Date(b).toLocaleDateString();
      o(String(b), () => ({ key: String(b), label: d, value: b, rows: [] }), c);
    } else l.type === "select" ? o(String(s), () => ({ key: String(s), label: ut(l, s), value: s, color: on(l, s), rows: [] }), c) : l.type === "boolean" ? o(String(!!s), () => ({ key: String(!!s), label: s ? "Yes" : "No", value: !!s, rows: [] }), c) : o(String(s), () => ({ key: String(s), label: String(s), value: s, rows: [] }), c);
  }
  const r = [...u.values()];
  return i.rows.length && r.push(i), r;
}
function Ai(e, t) {
  if (!t || !t.options) return [];
  const a = t.options.map((i) => ({
    key: String(i.value),
    label: i.label,
    value: i.value,
    color: i.color,
    rows: []
  })), l = { key: "__empty__", label: "—", value: null, rows: [] }, u = new Map(a.map((i) => [i.key, i]));
  for (const i of e) {
    const o = wt(i, t.key);
    (o == null || o === "" ? l : u.get(String(o)) ?? l).rows.push(i);
  }
  return l.rows.length && a.push(l), a;
}
function Zn(e, t) {
  if (!t || t.length === 0) return e;
  const a = new Map(t.map((l, u) => [l, u]));
  return e.map((l, u) => ({ g: l, i: u })).sort((l, u) => {
    const i = a.get(l.g.key) ?? 1 / 0, o = a.get(u.g.key) ?? 1 / 0;
    return i === o ? l.i - u.i : i - o;
  }).map((l) => l.g);
}
function ln(e) {
  return e.filters;
}
function zi(e, t, a) {
  let l = Si(e, t.search, a);
  return l = Ll(l, ln(t), a), l = xi(l, t.sort, a), l;
}
function Le(e, t = "id") {
  const a = typeof t == "function" ? t(e) : e[t];
  return String(a);
}
function Di(e) {
  var a, l, u;
  const t = {};
  return e.view && e.view !== "table" && (t.view = e.view), (a = e.filters) != null && a.length && (t.filters = e.filters), (l = e.sort) != null && l.length && (t.sort = e.sort), e.group && (t.group = e.group), e.search && (t.search = e.search), e.preset && (t.preset = e.preset), (u = e.columns) != null && u.length && (t.columns = e.columns), t;
}
function Ei(e) {
  const t = Di(e);
  return Object.keys(t).length === 0 ? "" : JSON.stringify(t);
}
function Ti(e, t = "table") {
  const a = Nt(t);
  if (!e) return a;
  try {
    const l = JSON.parse(e);
    return {
      view: l.view ?? a.view,
      filters: Array.isArray(l.filters) ? l.filters : [],
      sort: Array.isArray(l.sort) ? l.sort : [],
      group: l.group ?? null,
      search: typeof l.search == "string" ? l.search : "",
      preset: l.preset ?? null,
      columns: Array.isArray(l.columns) ? l.columns : void 0
    };
  } catch {
    return a;
  }
}
function Ii(e, t = "table") {
  return {
    view: e.view ?? t,
    filters: e.filters ?? [],
    sort: e.sort ?? [],
    group: e.group ?? null,
    search: e.search ?? "",
    preset: e.id,
    columns: e.columns
  };
}
function Li(e, t) {
  return JSON.stringify(e.filters ?? []) === JSON.stringify(t.filters ?? []) && JSON.stringify(e.sort ?? []) === JSON.stringify(t.sort ?? []) && (e.group ?? null) === (t.group ?? null) && (e.search ?? "") === (t.search ?? "") && JSON.stringify(e.columns ?? null) === JSON.stringify(t.columns ?? null);
}
function Ol(e, t = []) {
  const a = e.preset ? t.find((l) => l.id === e.preset) : void 0;
  return a ? Li(e, a) : e.filters.length === 0 && e.sort.length === 0 && e.group == null && !e.search && (e.columns == null || e.columns.length === 0);
}
function Ot(e, t, a = [], l = "table") {
  const u = new URLSearchParams(e.startsWith("?") ? e.slice(1) : e), i = u.get(t.preset ?? "preset"), o = u.get(t.data ?? "data"), r = u.get(t.view ?? "view"), c = r && fi.includes(r) ? r : null, s = i ? a.find((f) => f.id === i) : void 0, b = s ? Ii(s, l) : i ? { ...Nt(l), preset: i } : Nt(l);
  if (!o) return { ...b, view: c ?? b.view };
  const d = Ti(o, b.view);
  return {
    view: c ?? d.view ?? b.view,
    filters: d.filters,
    sort: d.sort,
    group: d.group,
    search: d.search,
    preset: b.preset,
    columns: d.columns ?? b.columns
  };
}
function Fa(e, t, a, l = [], u = "table") {
  const i = new URLSearchParams(e.startsWith("?") ? e.slice(1) : e), o = t.preset ?? "preset", r = t.data ?? "data", c = t.view ?? "view";
  a.preset ? i.set(o, a.preset) : i.delete(o);
  const s = a.preset ? l.find((f) => f.id === a.preset) : void 0, b = (s == null ? void 0 : s.view) ?? u;
  if (a.view && a.view !== b ? i.set(c, a.view) : i.delete(c), Ol(a, l)) i.delete(r);
  else {
    const f = Ei(a);
    f ? i.set(r, f) : i.delete(r);
  }
  const d = i.toString();
  return d ? `?${d}` : "";
}
function Pt(e) {
  return e instanceof Date ? e : new Date(e);
}
function $n(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime();
}
function Oa(e, t) {
  if (!t) return e === 0 ? "Today" : "Yesterday";
  const a = new Intl.RelativeTimeFormat(t, { numeric: "auto" }).format(e, "day");
  return a.charAt(0).toLocaleUpperCase(t) + a.slice(1);
}
function Fi(e, t = /* @__PURE__ */ new Date(), a) {
  const l = $n(Pt(e)), u = $n(t), i = 864e5;
  if (l === u) return Oa(0, a);
  if (l === u - i) return Oa(-1, a);
  const o = new Date(l), r = o.getFullYear() === t.getFullYear();
  return new Intl.DateTimeFormat(a, {
    day: "numeric",
    month: "long",
    year: r ? void 0 : "numeric"
  }).format(o);
}
function Ct(e, t) {
  return new Intl.DateTimeFormat(t, { hour: "2-digit", minute: "2-digit" }).format(Pt(e));
}
function Bl(e, t = {}) {
  const { now: a = /* @__PURE__ */ new Date(), locale: l, ascending: u = !1 } = t, i = /* @__PURE__ */ new Map();
  for (const r of e) {
    const c = $n(Pt(r.createdAt)), s = i.get(c);
    s ? s.push(r) : i.set(c, [r]);
  }
  const o = [...i.entries()].map(([r, c]) => ({
    key: r,
    label: Fi(r, a, l),
    events: c.slice().sort((s, b) => Pt(s.createdAt).getTime() - Pt(b.createdAt).getTime())
  }));
  return o.sort((r, c) => u ? r.key - c.key : c.key - r.key), o;
}
function Pl(e) {
  if (e == null) return "";
  if (e < 1024) return `${e} B`;
  const t = ["KB", "MB", "GB", "TB"];
  let a = e / 1024, l = 0;
  for (; a >= 1024 && l < t.length - 1; )
    a /= 1024, l++;
  return `${a < 10 ? a.toFixed(1) : Math.round(a)} ${t[l]}`;
}
function Oi(e) {
  return e.reduce((t, a) => t + (a.read ? 0 : 1), 0);
}
const Ba = (e) => e != null && /[\p{L}\p{N}]/u.test(e);
function Rl(e, t) {
  if (!e) return [];
  const a = [...t].sort((o, r) => r.name.length - o.name.length), l = [];
  let u = "", i = 0;
  for (; i < e.length; ) {
    const o = i === 0 || !Ba(e[i - 1]);
    if (e[i] === "@" && o) {
      const r = e.slice(i + 1), c = a.find(
        (s) => s.name.length > 0 && r.startsWith(s.name) && !Ba(r[s.name.length])
      );
      if (c) {
        u && (l.push({ type: "text", value: u }), u = ""), l.push({ type: "mention", user: c }), i += 1 + c.name.length;
        continue;
      }
    }
    u += e[i], i += 1;
  }
  return u && l.push({ type: "text", value: u }), l;
}
function Bi(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Pi(e, t, a) {
  const l = /* @__PURE__ */ new Set([1, t]);
  for (let r = e - a; r <= e + a; r++)
    r >= 1 && r <= t && l.add(r);
  const u = [...l].sort((r, c) => r - c), i = [];
  let o = 0;
  for (const r of u)
    o && r - o > 1 && (r - o === 2 ? i.push(o + 1) : i.push("dots")), i.push(r), o = r;
  return i;
}
function Ri(e) {
  const { totalPages: t } = e, a = e.itemsInCenter ?? 1, l = e.showArrows ?? !0, u = Math.min(Math.max(e.current, 1), Math.max(t, 1)), i = [];
  l && i.push({
    type: "arrow",
    direction: "prev",
    label: "‹",
    value: u - 1,
    disabled: u <= 1
  });
  for (const o of Pi(u, t, a))
    o === "dots" ? i.push({ type: "dots", label: "…", disabled: !0 }) : i.push({ type: "number", label: o, value: o, disabled: !1, active: o === u });
  return l && i.push({
    type: "arrow",
    direction: "next",
    label: "›",
    value: u + 1,
    disabled: u >= t
  }), i;
}
function Ni(e, t) {
  const a = e.trim().toLowerCase();
  return a ? t.filter((l) => !l.divider && l.label != null && l.label.toLowerCase().includes(a)) : t;
}
function qi(e) {
  return e == null || Array.isArray(e) && e.length === 0;
}
let Wn = null;
function Mi(e) {
  Wn = e;
}
function Ki() {
  return Wn;
}
function Pa() {
  Wn = null;
}
function $i(e, t, a) {
  const l = a ? t.x : t.y;
  let u = 0;
  for (const i of e) {
    const o = a ? i.left + i.width / 2 : i.top + i.height / 2;
    l > o && (u += 1);
  }
  return u;
}
function ji(e, t, a) {
  const l = e.slice();
  if (t < 0 || t >= l.length) return l;
  let u = Math.max(0, Math.min(a, l.length));
  t < u && (u -= 1);
  const [i] = l.splice(t, 1);
  return l.splice(u, 0, i), l;
}
const Vi = {
  placeholder: "Select…",
  searchPlaceholder: "Search…",
  empty: "No results",
  selectAll: "Select all"
}, Ui = {
  placeholder: "Выберите…",
  searchPlaceholder: "Поиск…",
  empty: "Ничего не найдено",
  selectAll: "Выбрать все"
}, Hi = { close: "Close" }, Gi = { close: "Закрыть" }, Zi = { close: "Close" }, Wi = { close: "Закрыть" }, Yi = { empty: "No data" }, Qi = { empty: "Нет данных" }, Ji = { placeholder: "Search…", empty: "No results found." }, Xi = {
  placeholder: "Поиск…",
  empty: "Ничего не найдено."
}, eo = {
  searchPlaceholder: "Search…",
  searchLabel: "Filter menu items",
  empty: "No results",
  menu: "Menu"
}, to = {
  searchPlaceholder: "Поиск…",
  searchLabel: "Фильтр пунктов меню",
  empty: "Ничего не найдено",
  menu: "Меню"
}, no = { yes: "Yes", no: "No" }, ao = { yes: "Да", no: "Нет" }, lo = { ok: "Ok" }, uo = { ok: "ОК" }, io = { yes: "Yes", no: "No" }, oo = { yes: "Да", no: "Нет" }, ro = { dismiss: "Dismiss" }, co = { dismiss: "Закрыть" }, so = {
  prevPage: "Previous page",
  nextPage: "Next page",
  page: "Page {label}"
}, fo = {
  prevPage: "Предыдущая страница",
  nextPage: "Следующая страница",
  page: "Страница {label}"
}, bo = { selected: "{count} selected", open: "Open calendar" }, vo = { selected: "Выбрано: {count}", open: "Открыть календарь" }, yo = {
  previous: "Previous",
  next: "Next",
  previousMonth: "Previous month",
  nextMonth: "Next month",
  previousYear: "Previous year",
  nextYear: "Next year",
  switchView: "Switch calendar view",
  from: "From",
  to: "To"
}, mo = {
  previous: "Назад",
  next: "Вперёд",
  previousMonth: "Предыдущий месяц",
  nextMonth: "Следующий месяц",
  previousYear: "Предыдущий год",
  nextYear: "Следующий год",
  switchView: "Переключить вид календаря",
  from: "С",
  to: "До"
}, go = {
  empty: "No activity yet",
  composerPlaceholder: "Write a message…  (⌘/Ctrl+Enter to send)",
  send: "Send",
  attach: "Attach files",
  removeAttachment: "Remove attachment",
  manageFollowers: "Manage followers",
  followers: "Followers",
  owner: "Owner",
  createTitle: "New {label}",
  create: "Create",
  cancel: "Cancel",
  requiredHint: " (required)",
  chooseUser: "Choose user…",
  complete: "Complete",
  reopen: "Reopen",
  completedBy: "Completed by {name}",
  completed: "Completed",
  unknownAuthor: "Unknown",
  mentionMenu: "Mention a user"
}, ho = {
  empty: "Пока нет активности",
  composerPlaceholder: "Напишите сообщение…  (⌘/Ctrl+Enter — отправить)",
  send: "Отправить",
  attach: "Прикрепить файлы",
  removeAttachment: "Удалить вложение",
  manageFollowers: "Управление подписчиками",
  followers: "Подписчики",
  owner: "Владелец",
  createTitle: "Создать: {label}",
  create: "Создать",
  cancel: "Отмена",
  requiredHint: " (обязательно)",
  chooseUser: "Выберите пользователя…",
  complete: "Завершить",
  reopen: "Возобновить",
  completedBy: "Завершил: {name}",
  completed: "Завершено",
  unknownAuthor: "Неизвестно",
  mentionMenu: "Упомянуть пользователя"
}, _o = {
  title: "Notifications",
  tabNew: "New",
  tabAll: "All",
  readAll: "Read all",
  emptyNew: "No new notifications",
  emptyAll: "No notifications"
}, wo = {
  title: "Уведомления",
  tabNew: "Новые",
  tabAll: "Все",
  readAll: "Прочитать все",
  emptyNew: "Новых уведомлений нет",
  emptyAll: "Уведомлений нет"
}, Co = {
  yes: "Yes",
  no: "No",
  chooseUser: "Choose user…",
  detach: "Detach",
  attachEmpty: "Nothing left to attach.",
  attachColName: "Name",
  attachColDetail: "Detail",
  add: "Add",
  attachLabel: "Attach {label}",
  mainTab: "Main",
  timelineTab: "Timeline",
  saving: "Saving…",
  empty: "—"
}, po = {
  yes: "Да",
  no: "Нет",
  chooseUser: "Выберите пользователя…",
  detach: "Открепить",
  attachEmpty: "Больше нечего прикрепить.",
  attachColName: "Название",
  attachColDetail: "Описание",
  add: "Добавить",
  attachLabel: "Прикрепить: {label}",
  mainTab: "Основное",
  timelineTab: "Лента",
  saving: "Сохранение…",
  empty: "—"
}, So = {
  detailTitle: "Details",
  create: { title: "New record", button: "Add", submit: "Create", cancel: "Cancel" },
  detail: {
    discardTitle: "Discard changes?",
    discardBody: "You have unsaved changes — closing now will lose them.",
    discardConfirm: "Discard",
    discardKeep: "Keep editing"
  },
  emptyValue: "—",
  empty: {
    title: "No results",
    descriptionFiltered: "Try adjusting your filters.",
    descriptionEmpty: "There is nothing here yet."
  },
  status: { loading: "Loading", resultCount: "{count} results" },
  search: {
    placeholder: "Search…",
    ariaLabel: "Search",
    clear: "Clear search",
    searching: "Searching…",
    noResults: "No results",
    resultsAriaLabel: "Search results"
  },
  filters: {
    popAriaLabel: "Filters",
    clearTitle: "Clear filters",
    clearCount: "Clear {count} filters",
    clearLabel: "Clear",
    toggle: "Filter",
    apply: "Apply",
    cancel: "Cancel",
    valuePlaceholder: "Value",
    removeAriaLabel: "Remove filter",
    add: "Add filter"
  },
  preset: {
    saveActiveAriaLabel: "Save filters to this view",
    saveActiveLabel: "Save",
    lockedTitle: "Default view (locked)",
    nameAriaLabel: "View name",
    namePlaceholder: "View name",
    defaultToggle: "Default",
    pinnedToggle: "Pinned",
    editSave: "Save",
    editCancel: "Cancel",
    removeTitle: "Remove view",
    saveChanges: "Save changes",
    createAriaLabel: "Create view",
    createCancelAriaLabel: "Cancel",
    saveAsNew: "Save as new view",
    editTitle: "Edit {name}",
    removeAriaLabel: "Remove {name}"
  },
  group: { pipelinePlaceholder: "Pipeline field", placeholder: "Group by…" },
  columns: { ariaLabel: "Columns", label: "Columns" },
  view: { table: "Table", cards: "Cards", pipeline: "Pipeline" },
  tab: {
    fast: "Fast",
    extendable: "Extendable",
    columns: "Columns",
    misc: "Misc"
  },
  fast: {
    min: "Min",
    max: "Max",
    any: "Any",
    boolAny: "Any",
    boolYes: "Yes",
    boolNo: "No",
    textPlaceholder: "Contains…",
    empty: "No filterable fields."
  },
  misc: {
    groupByLabel: "Group by",
    groupByPlaceholder: "No grouping",
    defaultViewLabel: "Default view"
  },
  pipeline: {
    emptyTitle: "No pipeline field",
    emptyDescription: "Pick a select field for the pipeline.",
    regionAriaLabel: "Pipeline"
  }
}, ko = {
  detailTitle: "Подробности",
  create: { title: "Новая запись", button: "Добавить", submit: "Создать", cancel: "Отмена" },
  detail: {
    discardTitle: "Отменить изменения?",
    discardBody: "Есть несохранённые изменения — закрытие их потеряет.",
    discardConfirm: "Отменить",
    discardKeep: "Продолжить"
  },
  emptyValue: "—",
  empty: {
    title: "Ничего не найдено",
    descriptionFiltered: "Попробуйте изменить фильтры.",
    descriptionEmpty: "Здесь пока ничего нет."
  },
  status: { loading: "Загрузка", resultCount: "Результатов: {count}" },
  search: {
    placeholder: "Поиск…",
    ariaLabel: "Поиск",
    clear: "Очистить поиск",
    searching: "Идёт поиск…",
    noResults: "Ничего не найдено",
    resultsAriaLabel: "Результаты поиска"
  },
  filters: {
    popAriaLabel: "Фильтры",
    clearTitle: "Сбросить фильтры",
    clearCount: "Сбросить фильтры: {count}",
    clearLabel: "Очистить",
    toggle: "Фильтр",
    apply: "Применить",
    cancel: "Отмена",
    valuePlaceholder: "Значение",
    removeAriaLabel: "Удалить фильтр",
    add: "Добавить фильтр"
  },
  preset: {
    saveActiveAriaLabel: "Сохранить фильтры в этот пресет",
    saveActiveLabel: "Сохранить",
    lockedTitle: "Вид по умолчанию (заблокирован)",
    nameAriaLabel: "Название пресета",
    namePlaceholder: "Название пресета",
    defaultToggle: "По умолчанию",
    pinnedToggle: "Закреплён",
    editSave: "Сохранить",
    editCancel: "Отмена",
    removeTitle: "Удалить пресет",
    saveChanges: "Сохранить изменения",
    createAriaLabel: "Создать пресет",
    createCancelAriaLabel: "Отмена",
    saveAsNew: "Сохранить пресет",
    editTitle: "Изменить «{name}»",
    removeAriaLabel: "Удалить «{name}»"
  },
  group: {
    pipelinePlaceholder: "Поле воронки",
    placeholder: "Группировать по…"
  },
  columns: { ariaLabel: "Столбцы", label: "Столбцы" },
  view: { table: "Таблица", cards: "Карточки", pipeline: "Воронка" },
  tab: {
    fast: "Быстрые",
    extendable: "Расширенные",
    columns: "Столбцы",
    misc: "Прочее"
  },
  fast: {
    min: "Мин",
    max: "Макс",
    any: "Любое",
    boolAny: "Любое",
    boolYes: "Да",
    boolNo: "Нет",
    textPlaceholder: "Содержит…",
    empty: "Нет полей для фильтрации."
  },
  misc: {
    groupByLabel: "Группировать по",
    groupByPlaceholder: "Без группировки",
    defaultViewLabel: "Вид по умолчанию"
  },
  pipeline: {
    emptyTitle: "Нет поля воронки",
    emptyDescription: "Выберите поле-список для воронки.",
    regionAriaLabel: "Воронка"
  }
}, xo = {
  /** Default label for the augmented submit button. */
  submit: "Save",
  /** Default label for the reset button. */
  reset: "Reset",
  /** Default message when a `required` field is empty. */
  required: "This field is required"
}, Ao = {
  submit: "Сохранить",
  reset: "Сбросить",
  required: "Обязательное поле"
}, zo = {
  modal: Hi,
  drawer: Zi,
  table: Yi,
  select: Vi,
  search: Ji,
  dropdown: eo,
  inlineConfirm: no,
  alert: lo,
  confirm: io,
  messages: ro,
  pagination: so,
  datePicker: bo,
  calendar: yo,
  timeline: go,
  eventsBox: _o,
  card: Co,
  data: So,
  form: xo
}, Do = {
  modal: Gi,
  drawer: Wi,
  table: Qi,
  select: Ui,
  search: Xi,
  dropdown: to,
  inlineConfirm: ao,
  alert: uo,
  confirm: oo,
  messages: co,
  pagination: fo,
  datePicker: vo,
  calendar: mo,
  timeline: ho,
  eventsBox: wo,
  card: po,
  data: ko,
  form: Ao
}, Ra = { en: zo, ru: Do };
function le(e) {
  const t = ju(e);
  return (a, l) => {
    const u = un(Ra[t], a) ?? un(Ra.en, a) ?? a;
    return Cl(String(u), l);
  };
}
const Eo = /* @__PURE__ */ N({
  name: "CuboSpinner",
  props: {
    /** Width/height. A number is treated as px. */
    size: {
      type: [Number, String],
      default: 20
    },
    /** Stroke width of the ring. */
    stroke: {
      type: Number,
      default: 3
    },
    /** Named colour (autocompletes) or any custom CSS colour (otherwise inherits `currentColor`). */
    color: {
      type: String,
      default: void 0
    },
    /** Accessible label. */
    label: {
      type: String,
      default: "Loading"
    }
  },
  setup(e) {
    return () => {
      const t = kl(e.size), a = Be(e.color);
      return n("svg", {
        class: "cubo-spinner",
        width: t,
        height: t,
        viewBox: "0 0 24 24",
        fill: "none",
        role: "status",
        "aria-label": e.label,
        style: a ? {
          color: a
        } : void 0
      }, [n("circle", {
        class: "cubo-spinner__track",
        cx: "12",
        cy: "12",
        r: "9",
        stroke: "currentColor",
        "stroke-width": e.stroke
      }, null), n("path", {
        class: "cubo-spinner__head",
        d: "M21 12a9 9 0 0 0 -9 -9",
        stroke: "currentColor",
        "stroke-width": e.stroke,
        "stroke-linecap": "round"
      }, null)]);
    };
  }
}), Ae = Eo;
function kt(e) {
  var a;
  return ((a = e == null ? void 0 : e.vnode.props) == null ? void 0 : a.size) || void 0;
}
const To = /* @__PURE__ */ N({
  name: "CuboButton",
  props: {
    disabled: {
      type: Boolean,
      default: !1
    },
    loading: {
      type: Boolean,
      default: !1
    },
    color: {
      type: String,
      default: void 0
    },
    size: {
      type: String,
      default: "medium"
    },
    ghost: {
      type: Boolean,
      default: !1
    },
    htmlType: {
      type: String,
      default: "button"
    },
    htmlAttrs: {
      type: Object,
      default: () => ({})
    }
  },
  emits: {
    click: (e) => !0
  },
  setup(e, {
    emit: t,
    slots: a
  }) {
    const l = at();
    return () => {
      var o, r;
      const u = Be(e.color), i = kt(l);
      return n("button", te(e.htmlAttrs, {
        type: e.htmlType,
        class: W("cubo-button", e.ghost && "cubo-button--ghost"),
        "data-size": e.size,
        "data-gtc-size": i,
        disabled: e.disabled || e.loading,
        "aria-busy": e.loading ? "true" : void 0,
        style: u ? {
          "--cubo-button-color": u
        } : void 0,
        onClick: (c) => t("click", c)
      }), [e.loading ? n(se, null, [n(Ae, {
        class: "cubo-button__spinner",
        size: xl(e.size),
        stroke: 2.5
      }, null), n("span", {
        class: "cubo-button__label"
      }, [(o = a.default) == null ? void 0 : o.call(a)])]) : (r = a.default) == null ? void 0 : r.call(a)]);
    };
  }
}), ie = To, pt = Symbol("cubo-config"), tt = Un(pl());
Wu(() => {
  tt.value = pl();
});
const Io = /* @__PURE__ */ N({
  name: "CuboConfig",
  props: {
    language: {
      type: String,
      default: void 0
    },
    iconBaseUrl: {
      type: String,
      default: void 0
    },
    iconSource: {
      type: String,
      default: void 0
    },
    background: {
      type: String,
      default: void 0
    }
  },
  setup(e, {
    slots: t
  }) {
    const a = St(pt, null), l = O(() => e.language ?? (a == null ? void 0 : a.language.value) ?? tt.value.language ?? $t), u = O(() => e.iconBaseUrl ?? (a == null ? void 0 : a.iconBaseUrl.value) ?? tt.value.iconBaseUrl), i = O(() => e.iconSource ?? (a == null ? void 0 : a.iconSource.value) ?? "tabler"), o = O(() => e.background ?? (a == null ? void 0 : a.background.value) ?? tt.value.background);
    return Lu(pt, {
      language: l,
      iconBaseUrl: u,
      iconSource: i,
      background: o
    }), () => {
      var r;
      return (r = t.default) == null ? void 0 : r.call(t);
    };
  }
}), Gs = Io;
function _e(e) {
  const t = St(pt, null);
  return O(() => (e == null ? void 0 : e()) ?? (t == null ? void 0 : t.language.value) ?? tt.value.language ?? $t);
}
function Lo(e, t) {
  const a = St(pt, null);
  return O(() => (e == null ? void 0 : e()) ?? (a == null ? void 0 : a.iconBaseUrl.value) ?? tt.value.iconBaseUrl ?? Uu((t == null ? void 0 : t()) ?? (a == null ? void 0 : a.language.value) ?? tt.value.language ?? $t));
}
function Fo(e) {
  const t = St(pt, null);
  return O(() => (e == null ? void 0 : e()) ?? (t == null ? void 0 : t.iconSource.value) ?? "tabler");
}
function ct(e) {
  const t = St(pt, null);
  return O(() => (e == null ? void 0 : e()) ?? (t == null ? void 0 : t.background.value) ?? tt.value.background);
}
const Yn = /* @__PURE__ */ new Map();
function Zs(e) {
  Yn.set(e.source, e);
}
function Oo(e) {
  return e === "tabler" || Yn.has(e);
}
function Na(e, t) {
  var c;
  if (e === "tabler") return null;
  const a = Yn.get(e);
  if (!a) return null;
  const l = a.classPrefix, u = l ? t.trim().split(/\s+/).find((s) => s.startsWith(l)) : void 0, i = u && l ? u.slice(l.length) : t, o = ((c = a.aliases) == null ? void 0 : c[i]) ?? i, r = a.glyphs[o];
  return r ? {
    source: e,
    name: o,
    glyph: r,
    fontFamily: a.fontFamily
  } : null;
}
const qa = /* @__PURE__ */ new Set(), Bo = /* @__PURE__ */ N({
  name: "CuboIcon",
  props: {
    /** Semantic Cubo name or a provider-native name (any string accepted). */
    icon: {
      type: String,
      required: !0
    },
    /** Override the inherited icon source. */
    source: {
      type: String,
      default: void 0
    },
    /** Width/height. A number is treated as px. */
    size: {
      type: [Number, String],
      default: 20
    },
    /** Stroke width. */
    stroke: {
      type: Number,
      default: 2
    },
    /** Named colour (autocompletes) or any custom CSS colour. Overrides the inherited `currentColor`. */
    color: {
      type: String,
      default: void 0
    },
    /** Accessible label. When set the icon is exposed as `img`; otherwise hidden. */
    title: {
      type: String,
      default: void 0
    },
    filled: {
      type: Boolean,
      default: void 0
    },
    /** Override the icon CDN base URL (else CuboConfig / language default). */
    baseUrl: {
      type: String,
      default: void 0
    },
    /** Language picking the default icon CDN (else inherited from CuboConfig). */
    language: {
      type: String,
      default: void 0
    }
  },
  setup(e, {
    attrs: t
  }) {
    const a = Fo(() => e.source), l = Lo(() => e.baseUrl, () => e.language), u = Un(null);
    return Q([() => e.icon, () => !!e.filled, l, a], ([i, o, r, c], s, b) => {
      if (Na(c, i)) {
        u.value = null;
        return;
      }
      if (Ca(i, o) !== null) {
        u.value = null;
        return;
      }
      u.value = null;
      let d = !0;
      b(() => {
        d = !1;
      }), Gu(r, i, o).then((f) => {
        d && (f.inner === null && nt(`<CuboIcon>: could not load icon "${i}" from ${r}.`), u.value = f);
      });
    }, {
      immediate: !0
    }), () => {
      const i = Na(a.value, e.icon), o = kl(e.size), {
        class: r,
        style: c,
        ...s
      } = t, b = Be(e.color);
      if (i)
        return n("span", te(s, {
          class: W("cubo-icon", pa(e.icon), r),
          style: [c, {
            inlineSize: o,
            blockSize: o,
            fontSize: o,
            color: b
          }],
          role: e.title ? "img" : void 0,
          "aria-label": e.title,
          "aria-hidden": e.title ? void 0 : "true",
          "data-clickable": s.onClick ? !0 : void 0,
          "data-filled": "true",
          "data-icon-source": i.source,
          "data-icon-name": e.icon,
          "data-icon-resolved": i.name
        }), [n("span", {
          class: "cubo-icon__glyph",
          style: {
            fontFamily: i.fontFamily
          },
          "aria-hidden": "true"
        }, [i.glyph])]);
      a.value !== "tabler" && !Oo(a.value) && !qa.has(a.value) && (qa.add(a.value), nt(`<CuboIcon>: source "${a.value}" is not registered; falling back to Tabler.`));
      const d = Ca(e.icon, e.filled);
      let f, y;
      if (d !== null)
        f = Da(d, e.title), y = !!e.filled && qu(e.icon);
      else {
        const v = u.value;
        f = v != null && v.inner ? Da(v.inner, e.title) : "", y = (v == null ? void 0 : v.filled) ?? !!e.filled;
      }
      return n("svg", te(s, {
        class: W("cubo-icon", pa(e.icon), r),
        width: o,
        height: o,
        viewBox: "0 0 24 24",
        fill: y ? b ?? "currentColor" : "none",
        stroke: y ? "none" : b ?? "currentColor",
        "stroke-width": y ? void 0 : e.stroke,
        "stroke-linecap": y ? void 0 : "round",
        "stroke-linejoin": y ? void 0 : "round",
        role: e.title ? "img" : void 0,
        "aria-label": e.title,
        "aria-hidden": e.title ? void 0 : "true",
        "data-clickable": s.onClick ? !0 : void 0,
        "data-filled": y ? !0 : void 0,
        "data-icon-source": "tabler",
        "data-icon-name": e.icon,
        "data-icon-fallback": a.value === "tabler" ? void 0 : a.value,
        innerHTML: f
      }), null);
    };
  }
}), M = Bo, Nl = /* @__PURE__ */ N({
  name: "CuboAlertShell",
  props: {
    visible: {
      type: Boolean,
      default: !1
    },
    color: {
      type: String,
      default: void 0
    },
    icon: {
      type: String,
      default: void 0
    },
    teleportSelector: {
      type: String,
      default: void 0
    }
  },
  emits: {
    close: () => !0
  },
  setup(e, {
    emit: t,
    slots: a
  }) {
    const l = (r) => {
      e.visible && r.key === "Escape" && t("close");
    };
    ye(() => document.addEventListener("keydown", l));
    const u = E(null);
    let i = null;
    const o = () => {
      const r = u.value;
      if (!r) return;
      const c = Al(r);
      (c[c.length - 1] ?? r).focus();
    };
    return Q(() => e.visible, (r, c) => {
      var s;
      r ? (i = document.activeElement, be(() => {
        o(), requestAnimationFrame(o);
      })) : c && ((s = i == null ? void 0 : i.focus) == null || s.call(i), i = null);
    }, {
      immediate: !0
    }), Se(() => {
      var r;
      document.removeEventListener("keydown", l), (r = i == null ? void 0 : i.focus) == null || r.call(i), i = null;
    }), () => {
      var b, d;
      if (!e.visible) return null;
      const r = Be(e.color), c = (b = a.title) == null ? void 0 : b.call(a), s = (d = a.body) == null ? void 0 : d.call(a);
      return n(De, {
        to: Ee(e.teleportSelector)
      }, {
        default: () => {
          var f;
          return [n("div", {
            class: "cubo-alert",
            role: "alertdialog",
            "aria-modal": "true"
          }, [n("div", {
            class: "cubo-alert__backdrop",
            onClick: () => t("close")
          }, null), n("div", {
            ref: u,
            class: "cubo-alert__box",
            tabindex: -1,
            style: r ? {
              "--cubo-alert-color": r
            } : void 0
          }, [n("div", {
            class: "cubo-alert__main"
          }, [e.icon ? n("div", {
            class: "cubo-alert__icon"
          }, [n(M, {
            icon: e.icon,
            size: 22
          }, null)]) : null, n("div", {
            class: "cubo-alert__content"
          }, [c != null ? n("div", {
            class: "cubo-alert__title"
          }, [c]) : null, s != null ? n("div", {
            class: "cubo-alert__body"
          }, [s]) : null])]), n("div", {
            class: "cubo-alert__actions"
          }, [(f = a.actions) == null ? void 0 : f.call(a)])])])];
        }
      });
    };
  }
});
function ne(e) {
  return typeof e == "function" ? e() : e;
}
const Po = /* @__PURE__ */ N({
  name: "CuboAlert",
  props: {
    visible: {
      type: Boolean,
      default: !1
    },
    color: {
      type: String,
      default: void 0
    },
    icon: {
      type: String,
      default: void 0
    },
    title: {
      type: [String, Object, Function],
      default: void 0
    },
    content: {
      type: [String, Object, Function],
      default: void 0
    },
    primaryButton: {
      type: [String, Object, Function],
      default: void 0
    },
    language: {
      type: String,
      default: void 0
    },
    teleportSelector: {
      type: String,
      default: void 0
    }
  },
  emits: {
    submit: () => !0,
    setVisible: (e) => !0
  },
  setup(e, {
    emit: t,
    slots: a
  }) {
    const l = _e(() => e.language), u = () => {
      t("submit"), t("setVisible", !1);
    };
    return () => {
      const i = le(l.value);
      return n(Nl, {
        visible: e.visible,
        color: e.color,
        icon: e.icon,
        teleportSelector: e.teleportSelector,
        onClose: () => t("setVisible", !1)
      }, {
        title: () => {
          var o;
          return ne(e.title) ?? ((o = a.title) == null ? void 0 : o.call(a));
        },
        body: () => {
          var o;
          return ne(e.content) ?? ((o = a.default) == null ? void 0 : o.call(a));
        },
        actions: () => n(ie, {
          color: e.color,
          onClick: u
        }, {
          default: () => {
            var o;
            return [ne(e.primaryButton) ?? ((o = a.primaryButton) == null ? void 0 : o.call(a)) ?? i("alert.ok")];
          }
        })
      });
    };
  }
}), Ro = Po, No = /* @__PURE__ */ N({
  name: "CuboConfirm",
  props: {
    visible: {
      type: Boolean,
      default: !1
    },
    color: {
      type: String,
      default: void 0
    },
    icon: {
      type: String,
      default: void 0
    },
    title: {
      type: [String, Object, Function],
      default: void 0
    },
    content: {
      type: [String, Object, Function],
      default: void 0
    },
    primaryButton: {
      type: [String, Object, Function],
      default: void 0
    },
    secondaryButton: {
      type: [String, Object, Function],
      default: void 0
    },
    primaryDisabled: {
      type: Boolean,
      default: !1
    },
    language: {
      type: String,
      default: void 0
    },
    teleportSelector: {
      type: String,
      default: void 0
    }
  },
  emits: {
    submit: () => !0,
    cancel: () => !0,
    setVisible: (e) => !0
  },
  setup(e, {
    emit: t,
    slots: a
  }) {
    const l = _e(() => e.language), u = () => {
      t("submit"), t("setVisible", !1);
    }, i = () => {
      t("cancel"), t("setVisible", !1);
    };
    return () => {
      const o = le(l.value);
      return n(Nl, {
        visible: e.visible,
        color: e.color,
        icon: e.icon,
        teleportSelector: e.teleportSelector,
        onClose: i
      }, {
        title: () => {
          var r;
          return ne(e.title) ?? ((r = a.title) == null ? void 0 : r.call(a));
        },
        body: () => {
          var r;
          return ne(e.content) ?? ((r = a.default) == null ? void 0 : r.call(a));
        },
        actions: () => n(se, null, [n(ie, {
          ghost: !0,
          color: "neutral",
          onClick: i
        }, {
          default: () => {
            var r;
            return [ne(e.secondaryButton) ?? ((r = a.secondaryButton) == null ? void 0 : r.call(a)) ?? o("confirm.no")];
          }
        }), n(ie, {
          color: e.color,
          disabled: e.primaryDisabled,
          onClick: u
        }, {
          default: () => {
            var r;
            return [ne(e.primaryButton) ?? ((r = a.primaryButton) == null ? void 0 : r.call(a)) ?? o("confirm.yes")];
          }
        })])
      });
    };
  }
}), qo = No, rn = Ou([]);
let Mo = 1;
function Ma(e) {
  const t = rn.findIndex((a) => a.id === e);
  t >= 0 && rn.splice(t, 1);
}
let Ka = !1;
function Ko() {
  if (Ka || typeof document > "u") return;
  Ka = !0;
  const e = document.createElement("div");
  e.setAttribute("data-cubo-alert-host", ""), (Ee() ?? document.body).appendChild(e), Fu(Vo).mount(e);
}
function vn(e, t) {
  return Ko(), new Promise((a) => {
    let l = !1;
    const u = (i) => {
      l || (l = !0, a(i));
    };
    rn.push({
      id: Mo++,
      kind: e,
      opts: t,
      settle: u
    });
  });
}
const $o = Ro, jo = qo, Vo = /* @__PURE__ */ N({
  name: "CuboAlertHost",
  setup() {
    return () => rn.map((e) => {
      const {
        opts: t
      } = e, a = {
        key: e.id,
        visible: !0,
        color: t.color,
        icon: t.icon,
        title: t.title,
        content: t.content,
        primaryButton: t.primaryButton,
        language: t.language,
        teleportSelector: t.teleportSelector
      };
      if (e.kind === "alert") {
        const u = {
          ...a,
          onSubmit: () => {
            var i;
            e.settle(!0), (i = t.onSubmit) == null || i.call(t);
          },
          onSetVisible: (i) => {
            i || (e.settle(!0), Ma(e.id));
          }
        };
        return wa($o, u);
      }
      const l = {
        ...a,
        secondaryButton: t.secondaryButton,
        primaryDisabled: t.primaryDisabled,
        onSubmit: () => {
          var u;
          e.settle(!0), (u = t.onSubmit) == null || u.call(t);
        },
        onCancel: () => {
          var u;
          e.settle(!1), (u = t.onCancel) == null || u.call(t);
        },
        onSetVisible: (u) => {
          u || (e.settle(!1), Ma(e.id));
        }
      };
      return wa(jo, l);
    });
  }
});
function Uo(e = {}) {
  return vn("confirm", e);
}
function Ws(e = {}) {
  return vn("alert", e).then(() => {
  });
}
function Ys() {
  const e = _e();
  return (t = {}) => vn("confirm", {
    language: e.value,
    ...t
  });
}
function Qs() {
  const e = _e();
  return (t = {}) => vn("alert", {
    language: e.value,
    ...t
  }).then(() => {
  });
}
const ql = (e) => {
  if (!e) return [];
  const t = [];
  for (const a of e) {
    if (a.type === se && Array.isArray(a.children)) {
      t.push(...ql(a.children));
      continue;
    }
    typeof a.type != "symbol" && t.push(a);
  }
  return t;
}, Js = ["neutral", "primary", "success", "warning", "danger", "info", "feature"], Xs = ["soft", "solid", "outline"], ed = ["small", "medium", "large"], td = ["rounded", "pill"], nd = ["default", "hover", "active", "focus", "selected", "disabled"], ad = ["filter", "input", "action", "link"], ld = ["solid", "soft"], ud = ["check", "clock", "alert", "user", "file", "star", "lock"], Ho = {
  check: "check",
  clock: "clock",
  alert: "alert-triangle",
  user: "user",
  file: "file",
  star: "star",
  lock: "lock"
}, Ml = (e) => n(M, {
  class: "cubo-tag__icon",
  icon: Ho[e],
  size: "var(--gtc-component-tag-icon-size)"
}, null), Go = () => n(M, {
  icon: "x",
  size: "var(--gtc-component-tag-icon-size)"
}, null), Kl = {
  tone: {
    type: String,
    default: "neutral"
  },
  appearance: {
    type: String,
    default: "soft"
  },
  size: {
    type: String,
    default: "medium"
  },
  shape: {
    type: String,
    default: "rounded"
  },
  /** Точка-статус слева: цвет несёт смысл, но не остаётся единственным носителем. */
  dot: {
    type: Boolean,
    default: !1
  },
  icon: {
    type: String,
    default: null
  },
  /** Обрезать длинную подпись многоточием (узкие колонки таблиц). */
  truncate: {
    type: Boolean,
    default: !1
  },
  /**
   * Полный текст для обрезанной подписи. Усечение обязано раскрываться по
   * ховеру (Spectrum), иначе часть смысла просто пропадает.
   */
  title: {
    type: String,
    default: ""
  }
}, $l = (e) => e.title || void 0, jl = (e, t) => e === "outline" && t !== "neutral" ? "soft" : e, id = /* @__PURE__ */ N({
  name: "CuboTag",
  props: {
    ...Kl,
    /** Число после подписи: «Документы 12». Не индикатор — часть текста. */
    count: {
      type: Number,
      default: null
    }
  },
  setup(e, {
    slots: t
  }) {
    return () => {
      var a;
      return n("span", {
        class: "cubo-tag",
        "data-tone": e.tone,
        "data-appearance": jl(e.appearance, e.tone),
        "data-size": e.size,
        "data-shape": e.shape,
        "data-truncate": e.truncate ? "true" : void 0,
        title: $l(e)
      }, [e.dot ? n("span", {
        class: "cubo-tag__dot"
      }, null) : null, e.icon ? Ml(e.icon) : null, n("span", {
        class: "cubo-tag__label"
      }, [(a = t.default) == null ? void 0 : a.call(t)]), e.count !== null ? n("span", {
        class: "cubo-tag__count"
      }, [e.count]) : null]);
    };
  }
}), od = /* @__PURE__ */ N({
  name: "CuboChip",
  props: {
    ...Kl,
    /** Роль чипа: filter (переключатель) / input (тег в поле) / action (кнопка). */
    kind: {
      type: String,
      default: "filter"
    },
    /** Включён (фильтр). Пишется в aria-pressed — состояние слышно скринридеру. */
    selected: {
      type: Boolean,
      default: !1
    },
    /**
     * Недоступен. Это aria-disabled, а не нативный disabled: выключенный фильтр
     * должен оставаться в таб-порядке — иначе о нём просто не узнают.
     */
    disabled: {
      type: Boolean,
      default: !1
    },
    /** Крестик: отдельная кнопка внутри чипа со своим фокусом. */
    removable: {
      type: Boolean,
      default: !1
    },
    /** Метка для крестика. По умолчанию — «Убрать». */
    removeLabel: {
      type: String,
      default: "Убрать"
    },
    /**
     * Адрес перехода для kind=link. Тело рендерится настоящим <a> (канон §8:
     * кликабельное — только button или a), крестик остаётся сиблингом —
     * интерактив не вкладывается в ссылку (модель Polaris url + onRemove).
     */
    href: {
      type: String,
      default: ""
    },
    /** Форсаж состояния для витрин (в проде не используется). */
    state: {
      type: String,
      default: null
    }
  },
  emits: ["select", "remove"],
  setup(e, {
    slots: t,
    emit: a
  }) {
    const l = O(() => e.state && e.state !== "default" ? e.state : void 0), u = O(() => e.kind === "link" && !!e.href && !e.disabled), i = O(() => e.kind !== "input" && !u.value), o = O(() => e.removable && !(e.size === "small" && e.kind !== "input")), r = {
      onClickCapture: (f) => {
        e.disabled && (f.stopPropagation(), f.preventDefault());
      }
    }, c = () => {
      e.disabled || a("select", !e.selected);
    }, s = (f) => {
      !e.removable || e.disabled || f.key !== "Backspace" && f.key !== "Delete" || (f.preventDefault(), a("remove"));
    }, b = () => o.value ? n("button", {
      type: "button",
      class: "cubo-chip__remove",
      "aria-label": e.removeLabel,
      "aria-disabled": e.disabled || void 0,
      tabindex: -1,
      onClick: (f) => {
        f.stopPropagation(), e.disabled || a("remove");
      }
    }, [n(Go, null, null)]) : null, d = () => {
      var f;
      return n(se, null, [e.dot ? n("span", {
        class: "cubo-tag__dot"
      }, null) : null, e.icon ? Ml(e.icon) : null, n("span", {
        class: "cubo-tag__label"
      }, [(f = t.default) == null ? void 0 : f.call(t)])]);
    };
    return () => n("span", te(r, {
      class: "cubo-tag cubo-chip",
      "data-tone": e.tone,
      "data-appearance": jl(e.appearance, e.tone),
      "data-size": e.size,
      "data-shape": e.shape,
      "data-kind": e.kind,
      "data-truncate": e.truncate ? "true" : void 0,
      "data-state": l.value,
      "data-selected": e.selected ? "true" : void 0,
      "data-disabled": e.disabled ? "true" : void 0,
      title: $l(e)
    }), [u.value ? (
      // Ссылка — по канону §8 настоящий <a>. Кликом тела не управляем:
      // переход делает браузер, крестик рядом остаётся кнопкой-сиблингом
      // (сегментированная модель Polaris), Backspace-удаление сохраняем.
      n("a", {
        class: "cubo-chip__body",
        "data-chip-focusable": "true",
        href: e.href,
        onKeydown: s
      }, [d()])
    ) : i.value ? n("button", {
      type: "button",
      class: "cubo-chip__body",
      "data-chip-focusable": "true",
      "aria-pressed": e.kind === "filter" ? e.selected : void 0,
      "aria-disabled": e.disabled || void 0,
      onClick: c,
      onKeydown: s
    }, [d()]) : (
      // Тег в поле ввода не нажимается, но фокус ему нужен: иначе снять
      // его с клавиатуры нечем (крестик намеренно вне таб-порядка).
      // Это Primer Token: фокусируемый span, снимается Backspace/Delete.
      n("span", {
        class: "cubo-chip__body cubo-chip__body--static",
        "data-chip-focusable": "true",
        tabindex: e.disabled ? void 0 : 0,
        "aria-disabled": e.disabled || void 0,
        onKeydown: s
      }, [d()])
    ), b()]);
  }
}), rd = /* @__PURE__ */ N({
  name: "CuboTagGroup",
  props: {
    /** Обязательная метка группы: без неё скринридер читает мешок кнопок. */
    label: {
      type: String,
      required: !0
    },
    /** Показывать метку глазами, а не только для скринридера. */
    showLabel: {
      type: Boolean,
      default: !1
    },
    /** Сколько чипов показывать до «+N ещё». 0 — показывать все. */
    maxVisible: {
      type: Number,
      default: 0
    },
    /** Кнопка «Очистить всё» справа. */
    clearable: {
      type: Boolean,
      default: !1
    },
    clearLabel: {
      type: String,
      default: "Очистить всё"
    },
    /** Что показать, когда чипов нет. */
    emptyText: {
      type: String,
      default: ""
    }
  },
  emits: ["clear"],
  setup(e, {
    slots: t,
    emit: a
  }) {
    const l = E(null), u = E(!1), i = () => {
      var v;
      return Array.from(((v = l.value) == null ? void 0 : v.querySelectorAll("[data-chip-focusable]")) ?? []).filter((g) => g.getAttribute("aria-disabled") !== "true");
    }, o = (v = 0) => {
      i().forEach((w, p) => w.setAttribute("tabindex", p === v ? "0" : "-1"));
    }, r = (v) => {
      const g = i();
      if (!g.length) return;
      const w = g.indexOf(document.activeElement);
      if (w === -1) return;
      const p = (T) => {
        v.preventDefault();
        const A = g[(T + g.length) % g.length];
        o(g.indexOf(A)), A.focus();
      };
      v.key === "ArrowRight" || v.key === "ArrowDown" ? p(w + 1) : v.key === "ArrowLeft" || v.key === "ArrowUp" ? p(w - 1) : v.key === "Home" ? p(0) : v.key === "End" && p(g.length - 1);
    }, c = E(0), s = E(!1), b = (v) => {
      s.value = !0;
      const g = i().indexOf(v.target);
      g !== -1 && (c.value = g);
    }, d = (v) => {
      var g;
      (g = l.value) != null && g.contains(v.relatedTarget) || (s.value = !1);
    }, f = () => {
      var w;
      if (!s.value && document.activeElement !== document.body || (w = l.value) != null && w.contains(document.activeElement)) return;
      const v = i();
      if (!v.length) {
        s.value = !1;
        return;
      }
      const g = v[Math.min(c.value, v.length - 1)];
      o(v.indexOf(g)), g.focus();
    };
    let y = null;
    return ye(() => {
      o(), y = new MutationObserver((v) => {
        const g = i(), w = g.indexOf(document.activeElement);
        o(w === -1 ? Math.min(c.value, g.length - 1) : w), (v.some((T) => T.removedNodes.length > 0) || s.value && document.activeElement === document.body) && f();
      }), l.value && y.observe(l.value, {
        childList: !0,
        subtree: !0
      });
    }), $e(() => y == null ? void 0 : y.disconnect()), () => {
      var p;
      const v = ql((p = t.default) == null ? void 0 : p.call(t)), g = e.maxVisible > 0 && !u.value ? e.maxVisible : v.length, w = Math.max(v.length - g, 0);
      return n("div", {
        class: "cubo-tag-group"
      }, [e.showLabel ? n("span", {
        class: "cubo-tag-group__label"
      }, [e.label]) : null, n("div", {
        class: "cubo-tag-group__items",
        role: "group",
        "aria-label": e.label,
        ref: l,
        onKeydown: r,
        onFocusin: b,
        onFocusout: d
      }, [v.length ? v.slice(0, g) : null, !v.length && e.emptyText ? n("span", {
        class: "cubo-tag-group__empty"
      }, [e.emptyText]) : null, w > 0 ? n("button", {
        type: "button",
        class: "cubo-tag-group__more",
        "data-chip-focusable": "true",
        onClick: () => u.value = !0
      }, [xe("+"), w, xe(" ещё")]) : null, e.maxVisible > 0 && u.value && v.length > e.maxVisible ? n("button", {
        type: "button",
        class: "cubo-tag-group__more",
        "data-chip-focusable": "true",
        onClick: () => u.value = !1
      }, [xe("Свернуть")]) : null]), e.clearable && v.length ? n("button", {
        type: "button",
        class: "cubo-tag-group__clear",
        onClick: () => a("clear")
      }, [e.clearLabel]) : null]);
    };
  }
}), cd = /* @__PURE__ */ N({
  name: "CuboBadge",
  props: {
    tone: {
      type: String,
      default: "neutral"
    },
    appearance: {
      type: String,
      default: "soft"
    },
    size: {
      type: String,
      default: "medium"
    },
    count: {
      type: Number,
      default: null
    },
    /** Потолок счётчика: 100 при max=99 показывается как «99+». */
    max: {
      type: Number,
      default: 99
    },
    /** Только факт «есть новое», без числа. */
    dot: {
      type: Boolean,
      default: !1
    },
    /** Бейдж стоит на акцентной подложке (выбранный пункт меню). */
    onAccent: {
      type: Boolean,
      default: !1
    },
    /** Что скринридеру: «3 непрочитанных». Без этого счётчик читается как «3». */
    ariaLabel: {
      type: String,
      default: ""
    },
    /**
     * Счётчик живой: значение меняется на глазах и об этом надо сообщать.
     * Раньше role=status вешался вместе с ariaLabel — и любой статичный
     * бейдж превращался в live-region, который бубнит при каждой перерисовке.
     */
    live: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = O(() => e.dot || e.count === null ? "" : e.count > e.max ? `${e.max}+` : String(e.count));
    return () => n("span", {
      class: "cubo-badge",
      "data-tone": e.tone,
      "data-appearance": e.appearance,
      "data-size": e.size,
      "data-dot": e.dot ? "true" : void 0,
      "data-on-accent": e.onAccent ? "true" : void 0,
      "aria-label": e.ariaLabel || void 0,
      role: e.live ? "status" : void 0
    }, [t.value]);
  }
}), Zo = /* @__PURE__ */ N({
  name: "CuboBadgeLegacy",
  props: {
    color: {
      type: String,
      default: void 0
    },
    size: {
      type: String,
      default: "medium"
    },
    ghost: {
      type: Boolean,
      default: !1
    }
  },
  setup(e, {
    slots: t
  }) {
    return () => {
      var l;
      const a = Be(e.color);
      return n("span", {
        class: W("cubo-badge-legacy", e.ghost && "cubo-badge-legacy--ghost"),
        "data-size": e.size,
        style: a ? {
          "--cubo-badge-legacy-color": a
        } : void 0
      }, [(l = t.default) == null ? void 0 : l.call(t)]);
    };
  }
}), Ge = Zo, Wo = {
  xs: "xsmall",
  sm: "small",
  md: "medium",
  lg: "large",
  xl: "xlarge"
}, Yo = /* @__PURE__ */ N({
  name: "CuboButtonV2",
  inheritAttrs: !1,
  props: {
    tone: {
      type: String,
      default: "primary"
    },
    appearance: {
      type: String,
      default: "solid"
    },
    state: {
      type: String,
      default: "default"
    },
    size: {
      type: String,
      default: "md"
    },
    shape: {
      type: String,
      default: "rounded"
    },
    iconOnly: {
      type: Boolean,
      default: !1
    },
    loading: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    block: {
      type: Boolean,
      default: !1
    },
    leadIcon: {
      type: String,
      default: void 0
    },
    trailIcon: {
      type: String,
      default: void 0
    },
    ariaLabel: {
      type: String,
      default: void 0
    },
    htmlType: {
      type: String,
      default: "button"
    },
    htmlAttrs: {
      type: Object,
      default: () => ({})
    }
  },
  emits: {
    click: (e) => !0
  },
  setup(e, {
    attrs: t,
    emit: a,
    slots: l
  }) {
    const u = e, i = (r) => n(M, {
      icon: r,
      size: "var(--gtc-component-button-icon-size)",
      stroke: 2
    }, null), o = (r, c) => n("span", {
      class: ["cubo-button-v2__affix", c],
      "aria-hidden": "true"
    }, [r]);
    return () => {
      var m, C, k, z;
      const r = u.ariaLabel, c = t["aria-label"], s = r ?? (typeof c == "string" ? c : void 0);
      u.iconOnly && !s && nt("<CuboButtonV2>: iconOnly requires ariaLabel or aria-label.");
      const b = ((m = l.lead) == null ? void 0 : m.call(l)) ?? (u.leadIcon ? i(u.leadIcon) : null), d = ((C = l.trail) == null ? void 0 : C.call(l)) ?? (u.trailIcon ? i(u.trailIcon) : null), f = n(Ae, {
        class: "cubo-button-v2__spinner",
        size: "var(--gtc-component-button-icon-size)",
        stroke: 2.5,
        "aria-hidden": "true"
      }, null), y = u.iconOnly ? o(u.loading ? f : ((k = l.default) == null ? void 0 : k.call(l)) ?? b) : [u.loading ? o(f) : b ? o(b) : null, n("span", {
        class: "cubo-button-v2__label"
      }, [(z = l.default) == null ? void 0 : z.call(l)]), d ? o(d) : null], {
        class: v,
        style: g,
        ...w
      } = u.htmlAttrs ?? {}, {
        class: p,
        style: T,
        ...A
      } = t;
      return n("button", te(w, A, {
        type: u.htmlType,
        class: ["cubo-button-v2", u.iconOnly && "cubo-button-v2--icon-only", u.block && "cubo-button-v2--block", u.loading && "is-loading", u.state !== "default" && `is-${u.state}`, v, p],
        style: [g, T],
        "data-tone": u.tone,
        "data-appearance": u.appearance,
        "data-size": u.size,
        "data-gtc-size": Wo[u.size ?? "md"],
        "data-shape": u.shape,
        disabled: u.disabled,
        "aria-label": s,
        "aria-busy": u.loading ? "true" : void 0,
        "aria-disabled": u.loading ? "true" : void 0,
        onClick: (x) => {
          if (u.disabled || u.loading) {
            x.preventDefault(), x.stopPropagation();
            return;
          }
          a("click", x);
        }
      }), [y]);
    };
  }
}), sd = Yo;
function Qo(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ce(e);
}
const Jo = /* @__PURE__ */ N({
  name: "CuboButtonGroupLegacy",
  props: {
    value: {
      type: null,
      default: void 0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    buttons: {
      type: Array,
      required: !0
    },
    trigger: {
      type: String,
      default: "click"
    }
  },
  emits: {
    change: (e) => !0
  },
  setup(e, {
    emit: t
  }) {
    const a = E(null);
    let l = null;
    const u = () => {
      const i = a.value;
      if (!i) return;
      const o = i.querySelector(".cubo-button-group-legacy__indicator"), r = i.querySelector(".cubo-button-group-legacy__seg--active");
      if (!r || !o) {
        i.removeAttribute("data-bg-active");
        return;
      }
      o.style.left = `${r.offsetLeft}px`, o.style.top = `${r.offsetTop}px`, o.style.width = `${r.offsetWidth}px`, o.style.height = `${r.offsetHeight}px`, i.setAttribute("data-bg-active", "");
    };
    return ye(() => {
      u(), setTimeout(() => {
        var i;
        return (i = a.value) == null ? void 0 : i.setAttribute("data-bg-ready", "");
      }, 0), typeof ResizeObserver < "u" && a.value && (l = new ResizeObserver(() => u()), l.observe(a.value));
    }), hl(u), $e(() => l == null ? void 0 : l.disconnect()), () => {
      var c, s;
      const i = e.buttons.findIndex((b) => b.value === e.value), o = Be((s = (c = e.buttons[i]) == null ? void 0 : c.props) == null ? void 0 : s.color), r = o ? {
        "--cubo-bg-color": o
      } : void 0;
      return n("div", {
        ref: a,
        class: "cubo-button-group-legacy",
        role: "group",
        "data-disabled": e.disabled || void 0,
        style: r
      }, [n("span", {
        class: "cubo-button-group-legacy__indicator",
        "aria-hidden": "true"
      }, null), e.buttons.map((b, d) => {
        var p, T;
        const f = d === i, y = e.disabled || ((p = b.props) == null ? void 0 : p.disabled), v = () => {
          y || t("change", b.value);
        }, g = typeof b.label == "function" ? b.label() : b.label, w = e.trigger === "mousedown" ? {
          onMousedown: v
        } : {
          onClick: v
        };
        return n(ie, te({
          key: d
        }, b.props, {
          ghost: !0,
          disabled: y,
          class: W(
            "cubo-button-group-legacy__seg",
            f && "cubo-button-group-legacy__seg--active",
            // Preserve a per-button class (parity with React's className).
            (T = b.props) == null ? void 0 : T.class
          )
        }, w), Qo(g) ? g : {
          default: () => [g]
        });
      })]);
    };
  }
}), yn = Jo, Xo = (e) => {
  const t = [], a = (l) => {
    l.forEach((u) => {
      if (u == null || typeof u == "boolean") return;
      if (Array.isArray(u)) return a(u);
      const i = u;
      if (i.type !== Bu && !(i.type === Pu && !String(i.children ?? "").trim())) {
        if (i.type === se) {
          a(i.children ?? []);
          return;
        }
        t.push(i);
      }
    });
  };
  return a(e ?? []), t;
}, er = (e, t) => e.map((a) => {
  if (typeof a.type == "string") return a;
  const l = a.props ?? {}, u = {};
  return Object.entries(t).forEach(([i, o]) => {
    i === "disabled" && o === !0 ? u[i] = !0 : o !== void 0 && l[i] === void 0 && (u[i] = o);
  }), Object.keys(u).length ? _l(a, u) : a;
}), tr = /* @__PURE__ */ N({
  name: "CuboButtonGroup",
  inheritAttrs: !1,
  props: {
    size: {
      type: String,
      default: "md"
    },
    ariaLabel: {
      type: String,
      default: void 0
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  setup(e, {
    attrs: t,
    slots: a
  }) {
    return () => {
      var r;
      const l = e.ariaLabel ?? (typeof t["aria-label"] == "string" ? t["aria-label"] : void 0);
      !l && !t["aria-labelledby"] && nt("<CuboButtonGroup>: provide ariaLabel, aria-label or aria-labelledby.");
      const {
        class: u,
        ...i
      } = t, o = er(Xo((r = a.default) == null ? void 0 : r.call(a)), {
        size: e.size,
        tone: "neutral",
        appearance: "ghost",
        shape: "rounded",
        disabled: e.disabled || void 0
      });
      return n("div", te(i, {
        class: ["cubo-button-group", u],
        role: "group",
        "aria-label": l,
        "data-size": e.size,
        "data-disabled": e.disabled || void 0
      }), [o]);
    };
  }
}), dd = tr, nr = /* @__PURE__ */ N({
  name: "CuboToggleGroup",
  inheritAttrs: !1,
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      required: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    ariaLabel: {
      type: String,
      default: void 0
    }
  },
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, {
    attrs: t,
    emit: a
  }) {
    const l = [], u = (f) => {
      var y;
      return e.disabled || !!((y = e.items[f]) != null && y.disabled);
    }, i = () => {
      const f = e.items.findIndex((y, v) => e.modelValue.includes(y.value) && !u(v));
      return f >= 0 ? f : e.items.findIndex((y, v) => !u(v));
    }, o = E(i());
    Q(() => [e.items, e.disabled], () => {
      (o.value < 0 || u(o.value)) && (o.value = i());
    }, {
      deep: !0
    });
    const r = () => e.items.map((f, y) => y).filter((f) => !u(f)), c = (f) => {
      var y;
      o.value = f, (y = l[f]) == null || y.focus();
    }, s = (f, y) => {
      const v = r();
      if (v.length === 0) return;
      if (y === "first") return c(v[0]);
      if (y === "last") return c(v[v.length - 1]);
      const g = v.indexOf(f), w = y === "next" ? 1 : -1, p = (Math.max(g, 0) + w + v.length) % v.length;
      c(v[p]);
    }, b = (f, y) => {
      const v = f.key === "ArrowRight" ? "next" : f.key === "ArrowLeft" ? "previous" : f.key === "Home" ? "first" : f.key === "End" ? "last" : null;
      v && (f.preventDefault(), s(y, v));
    }, d = (f, y) => {
      u(y) || (o.value = y, a("update:modelValue", e.modelValue.includes(f) ? e.modelValue.filter((v) => v !== f) : [...e.modelValue, f]));
    };
    return () => {
      const f = e.ariaLabel ?? (typeof t["aria-label"] == "string" ? t["aria-label"] : void 0);
      !f && !t["aria-labelledby"] && nt("<CuboToggleGroup>: provide ariaLabel, aria-label or aria-labelledby.");
      const y = e.items.map((w) => w.value);
      new Set(y).size !== y.length && nt("<CuboToggleGroup>: item values must be unique.");
      const {
        class: v,
        ...g
      } = t;
      return n("div", te(g, {
        class: ["cubo-toggle-group", v],
        role: "group",
        "aria-label": f,
        "data-disabled": e.disabled || void 0,
        "data-type": "multiple",
        "data-orientation": "horizontal",
        "data-size": "medium"
      }), [e.items.map((w, p) => {
        const T = e.modelValue.includes(w.value), A = u(p);
        return n("button", {
          key: w.value,
          ref: (m) => {
            l[p] = m;
          },
          type: "button",
          class: "cubo-toggle-group__item",
          "data-value": w.value,
          "aria-pressed": T,
          disabled: A,
          tabindex: !A && p === o.value ? 0 : -1,
          onFocus: () => o.value = p,
          onKeydown: (m) => b(m, p),
          onClick: () => d(w.value, p)
        }, [n("span", {
          class: "cubo-toggle-group__label"
        }, [w.label])]);
      })]);
    };
  }
}), fd = nr, bd = ["primary", "neutral", "inverse", "danger", "success", "info"], vd = ["inherit", "sm", "md", "lg"], yd = ["arrow-right", "arrow-left", "external", "plus"], $a = {
  "arrow-right": "arrow-right",
  "arrow-left": "arrow-left",
  external: "external-link",
  plus: "plus"
}, ar = /* @__PURE__ */ N({
  name: "CuboTextLink",
  inheritAttrs: !1,
  props: {
    href: {
      type: String,
      default: void 0
    },
    target: {
      type: String,
      default: void 0
    },
    tone: {
      type: String,
      default: "primary"
    },
    size: {
      type: String,
      default: "inherit"
    },
    underline: {
      type: Boolean,
      default: !1
    },
    visited: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    leadingIcon: {
      type: String,
      default: void 0
    },
    trailingIcon: {
      type: String,
      default: void 0
    },
    ariaLabel: {
      type: String,
      default: void 0
    }
  },
  emits: {
    click: (e) => !0
  },
  setup(e, {
    attrs: t,
    emit: a,
    slots: l
  }) {
    const u = (i) => {
      if (e.disabled) {
        i.preventDefault();
        return;
      }
      a("click", i);
    };
    return () => {
      var y;
      const {
        class: i,
        rel: o,
        ...r
      } = t, c = e.ariaLabel ?? (typeof t["aria-label"] == "string" ? t["aria-label"] : void 0), s = typeof o == "string" ? o : void 0, b = e.target === "_blank" ? Array.from(/* @__PURE__ */ new Set([...(s == null ? void 0 : s.split(/\s+/).filter(Boolean)) ?? [], "noopener", "noreferrer"])).join(" ") : s, d = n(se, null, [e.leadingIcon ? n(M, {
        class: "cubo-text-link__icon",
        icon: $a[e.leadingIcon],
        size: "var(--cubo-text-link-icon-size)"
      }, null) : null, n("span", {
        class: "cubo-text-link__label"
      }, [(y = l.default) == null ? void 0 : y.call(l)]), e.trailingIcon ? n(M, {
        class: "cubo-text-link__icon",
        icon: $a[e.trailingIcon],
        size: "var(--cubo-text-link-icon-size)"
      }, null) : null]), f = {
        ...r,
        class: ["cubo-text-link", e.underline && "cubo-text-link--underline", i],
        "data-tone": e.tone,
        "data-size": e.size === "inherit" ? void 0 : e.size,
        "data-visited": e.visited ? "true" : void 0,
        "data-disabled": e.disabled ? "true" : void 0,
        "aria-label": c,
        onClick: u
      };
      return e.href ? n("a", te(f, {
        href: e.disabled ? void 0 : e.href,
        target: e.disabled ? void 0 : e.target,
        rel: e.disabled ? void 0 : b,
        tabindex: e.disabled ? -1 : void 0,
        "aria-disabled": e.disabled ? "true" : void 0
      }), [d]) : n("button", te(f, {
        type: "button",
        disabled: e.disabled
      }), [d]);
    };
  }
}), md = ar, lr = {
  small: "small",
  medium: "medium",
  large: "large"
};
function ur(e) {
  return e === "sliding" ? "line" : e === "soft" ? "pill" : e;
}
const ir = /* @__PURE__ */ N({
  name: "CuboTabs",
  props: {
    tabs: {
      type: Array,
      required: !0
    },
    active: {
      type: null,
      default: void 0
    },
    vertical: {
      type: Boolean,
      default: !1
    },
    format: {
      type: String,
      default: "line"
    },
    tone: {
      type: String,
      default: void 0
    },
    shape: {
      type: String,
      default: void 0
    },
    size: {
      type: String,
      default: void 0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    activeFirst: {
      type: Boolean,
      default: !1
    },
    emitSameChanged: {
      type: Boolean,
      default: !1
    },
    iconOnly: {
      type: Boolean,
      default: !1
    },
    expandLabel: {
      type: Boolean,
      default: !1
    },
    trigger: {
      type: String,
      default: "click"
    },
    renderItem: {
      type: Function,
      default: void 0
    },
    beforeTabs: {
      type: [String, Object, Function],
      default: void 0
    },
    afterTabs: {
      type: [String, Object, Function],
      default: void 0
    }
  },
  emits: {
    change: (e) => !0
  },
  setup(e, {
    emit: t
  }) {
    const a = ot() ?? "cubo-tabs", l = (c) => `${a}-tab-${c}`, u = `${a}-panel`, i = E(null);
    let o = null;
    const r = () => {
      const c = i.value;
      if (!c) return;
      const s = c.querySelector(".cubo-tabs__list"), b = s == null ? void 0 : s.querySelector(".cubo-tabs__indicator"), d = s == null ? void 0 : s.querySelector(".cubo-tabs__tab[data-active]");
      if (!s || !b || !d) {
        c.removeAttribute("data-tabs-active");
        return;
      }
      b.style.setProperty("--cubo-tabs-x", `${d.offsetLeft}px`), b.style.setProperty("--cubo-tabs-y", `${d.offsetTop}px`), b.style.setProperty("--cubo-tabs-w", `${d.offsetWidth}px`), b.style.setProperty("--cubo-tabs-h", `${d.offsetHeight}px`), c.setAttribute("data-tabs-active", "");
    };
    return ye(() => {
      var c;
      r(), typeof document < "u" && ((c = document.fonts) != null && c.ready) && document.fonts.ready.then(r), setTimeout(() => {
        var s;
        return (s = i.value) == null ? void 0 : s.setAttribute("data-tabs-ready", "");
      }, 0), typeof ResizeObserver < "u" && i.value && (o = new ResizeObserver(() => r()), o.observe(i.value));
    }), hl(r), Se(() => o == null ? void 0 : o.disconnect()), () => {
      const c = ur(e.format), s = e.tone ?? (e.format === "soft" ? "tonal" : c === "segmented" ? "neutral" : "primary"), b = c === "line" && s === "tonal" ? "primary" : c === "segmented" && s === "tonal" ? "neutral" : s, d = c === "line" ? "rounded" : c === "pill" ? e.shape === "rounded" ? "rounded" : "pill" : e.shape === "pill" ? "pill" : "rounded", f = e.active ?? (e.activeFirst && e.tabs.length ? e.tabs[0].id : void 0), y = (C) => {
        C !== void 0 && (C !== f || e.emitSameChanged) && t("change", C);
      }, v = e.tabs.findIndex((C) => C.id === f), g = v >= 0 ? e.tabs[v] : void 0, w = (g == null ? void 0 : g.content) != null, p = e.disabled ? [] : e.tabs.flatMap((C, k) => C.disabled || C.id === void 0 ? [] : [k]), T = v >= 0 && p.includes(v) ? v : p[0] ?? -1, A = (C) => {
        var z;
        const k = e.tabs[C];
        !k || k.disabled || k.id === void 0 || e.disabled || ((z = document.getElementById(l(C))) == null || z.focus(), y(k.id));
      }, m = (C, k) => {
        if (C.altKey || C.ctrlKey || C.metaKey || p.length === 0)
          return;
        const z = p.indexOf(k), x = Math.max(p.indexOf(T), 0), R = z >= 0 ? z : x;
        let U;
        if (C.key === "Home")
          U = p[0];
        else if (C.key === "End")
          U = p[p.length - 1];
        else {
          const B = e.vertical ? C.key === "ArrowUp" : C.key === "ArrowLeft", h = e.vertical ? C.key === "ArrowDown" : C.key === "ArrowRight";
          if (!B && !h) return;
          U = p[(R + (B ? -1 : 1) + p.length) % p.length];
        }
        C.preventDefault(), U !== void 0 && A(U);
      };
      return n("div", {
        ref: i,
        class: W("cubo-tabs"),
        "data-format": c,
        "data-tone": b,
        "data-shape": d,
        "data-size": e.size,
        "data-gtc-size": e.size ? lr[e.size] : void 0,
        "data-disabled": e.disabled || void 0,
        "data-vertical": e.vertical || void 0,
        "data-icon-only": e.iconOnly || void 0,
        "data-expand": e.expandLabel || void 0
      }, [n("div", {
        class: "cubo-tabs__list",
        role: "tablist",
        "aria-orientation": e.vertical ? "vertical" : void 0
      }, [n("span", {
        class: "cubo-tabs__indicator",
        "aria-hidden": "true"
      }, null), e.beforeTabs != null ? ne(e.beforeTabs) : null, e.tabs.map((C, k) => {
        const z = C.id === f, x = e.disabled || !!C.disabled, R = C.icon ?? C.iconAfter, U = e.iconOnly && !!R, B = e.renderItem ? e.iconOnly : U;
        e.iconOnly && !e.renderItem && !R && nt(`<CuboTabs>: iconOnly tab at index ${k} requires icon or iconAfter; rendering its label instead.`), U && C.label == null && !C.ariaLabel && nt(`<CuboTabs>: iconOnly tab at index ${k} requires label or ariaLabel.`);
        const h = () => {
          x || y(C.id);
        }, _ = e.trigger === "mousedown" ? {
          onMousedown: h
        } : {
          onClick: h
        }, D = {
          role: "tab",
          id: l(k),
          "aria-controls": z && w ? u : void 0,
          class: W("cubo-tabs__tab", C.is_split && "cubo-tabs__tab--split"),
          "data-active": z || void 0,
          "data-icon-only": B || void 0,
          "aria-selected": z,
          "aria-label": B ? C.ariaLabel : void 0,
          title: B ? C.ariaLabel ?? (typeof C.label == "string" ? C.label : void 0) : void 0,
          disabled: x || void 0,
          tabindex: x || k !== T ? -1 : 0,
          onKeydown: (X) => m(X, k)
        };
        if (e.renderItem)
          return n(se, {
            key: k
          }, [ne(e.renderItem({
            tab: C,
            attrs: D,
            ..._
          }))]);
        const F = C.badge ? typeof C.badge == "string" ? {
          text: C.badge,
          color: void 0
        } : C.badge : null, H = F != null && F.color ? Be(F.color) : null;
        return n("button", te({
          key: k,
          type: "button"
        }, D, _), [(U ? R : C.icon) ? n(M, {
          class: "cubo-tabs__icon",
          icon: U ? R : C.icon,
          size: "var(--cubo-tabs-icon)"
        }, null) : null, C.label != null ? n("span", {
          class: "cubo-tabs__label"
        }, [ne(C.label)]) : null, !U && F ? n("span", {
          class: "cubo-tabs__badge",
          style: H ? {
            "--cubo-tab-badge": H,
            "--cubo-tab-badge-fg": "var(--gtc-global-color-white)"
          } : void 0
        }, [F.text]) : null, !U && C.iconAfter ? n(M, {
          class: "cubo-tabs__icon",
          icon: C.iconAfter,
          size: "var(--cubo-tabs-icon)"
        }, null) : null]);
      }), e.afterTabs != null ? ne(e.afterTabs) : null]), w ? n("div", {
        class: "cubo-tabs__panel",
        role: "tabpanel",
        id: u,
        "aria-labelledby": v >= 0 ? l(v) : void 0,
        tabindex: 0
      }, [ne(g.content)]) : null]);
    };
  }
}), Qn = ir, or = /* @__PURE__ */ N({
  name: "CuboExpander",
  props: {
    color: {
      type: String,
      default: void 0
    },
    icon: {
      type: [String, Object],
      default: void 0
    },
    label: {
      type: [String, Object, Function],
      default: void 0
    },
    body: {
      type: [String, Object, Function],
      default: void 0
    },
    arrow: {
      type: [String, Object, Function],
      default: void 0
    },
    expandable: {
      type: Boolean,
      default: !0
    },
    bordered: {
      type: Boolean,
      default: !1
    },
    expanded: {
      type: Boolean,
      default: !1
    }
  },
  emits: {
    toggle: (e) => !0
  },
  setup(e, {
    emit: t,
    slots: a
  }) {
    return () => {
      var d, f;
      const l = Be(e.color), u = e.icon;
      let i = null;
      typeof u == "string" ? i = n(M, {
        icon: u,
        size: 18
      }, null) : u && (i = n(M, {
        icon: u.name,
        size: 18,
        color: Be(u.color)
      }, null));
      const o = e.arrow != null ? ne(e.arrow) : n(M, {
        icon: "chevron-down",
        size: 18
      }, null), r = ne(e.label) ?? ((d = a.label) == null ? void 0 : d.call(a)), c = ne(e.body) ?? ((f = a.default) == null ? void 0 : f.call(a)), s = () => {
        e.expandable && t("toggle", !e.expanded);
      }, b = [i != null ? n("span", {
        class: "cubo-expander__icon"
      }, [i]) : null, n("span", {
        class: "cubo-expander__label"
      }, [r]), e.expandable ? n("span", {
        class: "cubo-expander__arrow"
      }, [o]) : null];
      return n("div", {
        class: W("cubo-expander"),
        "data-expanded": e.expanded || void 0,
        "data-bordered": e.bordered || void 0,
        style: l ? {
          "--cubo-expander-color": l
        } : void 0
      }, [e.expandable ? n("button", {
        type: "button",
        class: "cubo-expander__header",
        "aria-expanded": e.expanded ? "true" : "false",
        onClick: s
      }, [b]) : n("div", {
        class: "cubo-expander__header cubo-expander__header--static"
      }, [b]), n("div", {
        class: "cubo-expander__body"
      }, [n("div", {
        class: "cubo-expander__body-content"
      }, [c])])]);
    };
  }
}), rr = or, cr = {
  small: "small",
  medium: "medium",
  large: "large"
}, sr = /* @__PURE__ */ N({
  name: "CuboText",
  inheritAttrs: !0,
  props: {
    htmlType: {
      type: String,
      default: "text"
    },
    value: {
      type: [String, Number, null],
      default: void 0
    },
    placeholder: {
      type: String,
      default: void 0
    },
    size: {
      type: String,
      default: "medium"
    },
    state: {
      type: String,
      default: "default"
    },
    readonly: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    loading: {
      type: Boolean,
      default: !1
    },
    autofocus: {
      type: Boolean,
      default: !1
    },
    prefix: {
      type: String,
      default: void 0
    },
    suffix: {
      type: String,
      default: void 0
    },
    prefixIcon: {
      type: String,
      default: void 0
    },
    suffixIcon: {
      type: String,
      default: void 0
    },
    htmlAttrs: {
      type: Object,
      default: () => ({})
    }
  },
  emits: {
    change: (e) => !0,
    keyup: (e) => !0,
    keydown: (e) => !0,
    keypress: (e) => !0,
    focus: (e) => !0,
    blur: (e) => !0,
    enter: (e) => !0,
    escape: (e) => !0
  },
  setup(e, {
    emit: t,
    slots: a
  }) {
    const l = at(), u = E(), i = ct();
    ye(() => {
      var s;
      e.autofocus && ((s = u.value) == null || s.focus());
    });
    const o = (s) => {
      t("change", ai(s.target, e.htmlType));
    }, r = (s) => {
      t("keydown", s), s.key === "Enter" ? t("enter", s) : s.key === "Escape" && t("escape", s);
    }, c = (s) => {
      var b;
      e.disabled || s.target !== s.currentTarget || (b = u.value) == null || b.focus();
    };
    return () => {
      var k;
      const {
        size: s,
        state: b,
        disabled: d,
        readonly: f,
        loading: y
      } = e, v = (k = l == null ? void 0 : l.vnode.props) == null ? void 0 : k.size, g = xl(s);
      let w = null, p = !1;
      a.prefix ? w = a.prefix() : e.prefix ? (w = e.prefix, p = !0) : e.prefixIcon && (w = n(M, {
        icon: e.prefixIcon,
        size: g
      }, null));
      let T = null, A, m = !1;
      y ? (T = n(Ae, {
        size: g
      }, null), A = "cubo-text__spinner") : a.suffix ? T = a.suffix() : e.suffix ? (T = e.suffix, m = !0) : e.suffixIcon ? T = n(M, {
        icon: e.suffixIcon,
        size: g
      }, null) : b !== "default" && (T = n(M, {
        icon: ei[b],
        size: g
      }, null), A = "cubo-text__status");
      const C = e.value === void 0 ? {} : {
        value: li(e.value)
      };
      return n("div", {
        class: W("cubo-text"),
        style: i.value ? {
          "--cubo-config-bg": i.value
        } : void 0,
        "data-size": s,
        "data-gtc-size": v ? cr[v] : void 0,
        "data-state": b,
        "data-disabled": d || void 0,
        "data-readonly": f || void 0,
        "data-loading": y || void 0,
        onMousedown: c
      }, [w != null && n("span", {
        class: W("cubo-text__affix", "cubo-text__affix--prefix", p && "cubo-text__affix--text")
      }, [w]), n("input", te(e.htmlAttrs, C, {
        ref: u,
        class: "cubo-text__input",
        type: e.htmlType,
        placeholder: e.placeholder,
        disabled: d,
        readonly: f,
        "aria-invalid": b === "error" ? "true" : void 0,
        "aria-busy": y ? "true" : void 0,
        onInput: o,
        onKeyup: (z) => t("keyup", z),
        onKeydown: r,
        onKeypress: (z) => t("keypress", z),
        onFocus: (z) => t("focus", z),
        onBlur: (z) => t("blur", z)
      }), null), T != null && n("span", {
        class: W("cubo-text__affix", "cubo-text__affix--suffix", A, m && "cubo-text__affix--text")
      }, [T])]);
    };
  }
}), pe = sr, dr = /* @__PURE__ */ N({
  name: "CuboTextarea",
  props: {
    value: {
      type: String,
      default: void 0
    },
    placeholder: {
      type: String,
      default: void 0
    },
    size: {
      type: String,
      default: "medium"
    },
    state: {
      type: String,
      default: "default"
    },
    readonly: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    autofocus: {
      type: Boolean,
      default: !1
    },
    autosize: {
      type: Boolean,
      default: !1
    },
    resizable: {
      type: Boolean,
      default: !1
    },
    rows: {
      type: Number,
      default: 3
    },
    htmlAttrs: {
      type: Object,
      default: void 0
    }
  },
  emits: {
    change: (e) => !0,
    focus: (e) => !0,
    blur: (e) => !0,
    keydown: (e) => !0,
    enter: (e) => !0,
    escape: (e) => !0
  },
  setup(e, {
    emit: t
  }) {
    const a = at(), l = E(null), u = () => {
      const r = l.value;
      e.autosize && r && (r.style.height = "auto", r.style.height = `${r.scrollHeight}px`);
    };
    Q(() => e.value, async () => {
      await be(), u();
    }), ye(u);
    const i = (r) => {
      t("change", r.target.value), u();
    }, o = (r) => {
      t("keydown", r), r.key === "Enter" && !r.shiftKey ? t("enter", r) : r.key === "Escape" && t("escape", r);
    };
    return () => n("div", {
      class: W("cubo-text", "cubo-text--textarea"),
      "data-size": e.size,
      "data-gtc-size": kt(a),
      "data-state": e.state,
      "data-disabled": e.disabled || void 0,
      "data-readonly": e.readonly || void 0
    }, [n("textarea", te(e.htmlAttrs || {}, {
      ref: l,
      class: "cubo-text__input cubo-text__input--textarea",
      "data-resizable": e.resizable && !e.autosize || void 0,
      rows: e.rows,
      value: e.value,
      placeholder: e.placeholder,
      disabled: e.disabled,
      readonly: e.readonly,
      autofocus: e.autofocus,
      "aria-invalid": e.state === "error" || void 0,
      onInput: i,
      onFocus: (r) => t("focus", r),
      onBlur: (r) => t("blur", r),
      onKeydown: o
    }), null)]);
  }
}), Vl = dr, fr = {
  small: 12,
  medium: 16,
  large: 20
}, br = /* @__PURE__ */ N({
  name: "CuboCheckbox",
  props: {
    value: {
      type: Boolean,
      default: !1
    },
    indeterminate: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    loading: {
      type: Boolean,
      default: !1
    },
    color: {
      type: String,
      default: void 0
    },
    size: {
      type: String,
      default: "medium"
    }
  },
  emits: {
    change: (e) => !0
  },
  setup(e, {
    emit: t,
    slots: a
  }) {
    const l = E(), u = ct(), i = () => {
      l.value && (l.value.indeterminate = e.indeterminate);
    };
    return ye(i), Q(() => e.indeterminate, i), () => {
      const o = Be(e.color), r = fr[e.size], c = {
        ...o ? {
          "--cubo-checkbox-color": o
        } : {},
        ...u.value ? {
          "--cubo-config-bg": u.value
        } : {}
      };
      let s = null;
      return e.loading ? s = n(Ae, {
        size: r,
        stroke: 2.5
      }, null) : e.indeterminate ? s = n(M, {
        icon: "minus",
        size: r,
        stroke: 3
      }, null) : e.value && (s = n(M, {
        icon: "check",
        size: r,
        stroke: 3
      }, null)), n("label", {
        class: W("cubo-checkbox"),
        "data-size": e.size,
        "data-gtc-size": e.size,
        "data-checked": e.value || void 0,
        "data-indeterminate": e.indeterminate || void 0,
        "data-disabled": e.disabled || e.loading || void 0,
        style: c
      }, [n("input", {
        ref: l,
        type: "checkbox",
        class: "cubo-checkbox__input",
        checked: e.value,
        disabled: e.disabled || e.loading,
        onChange: (b) => t("change", b.target.checked)
      }, null), n("span", {
        class: "cubo-checkbox__box"
      }, [s]), a.default && n("span", {
        class: "cubo-checkbox__label"
      }, [a.default()])]);
    };
  }
}), cn = br;
function vr(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ce(e);
}
const yr = /* @__PURE__ */ N({
  name: "CuboSelectVariants",
  props: {
    variants: {
      type: Array,
      default: () => []
    },
    value: {
      type: null,
      default: void 0
    },
    multiple: {
      type: Boolean,
      default: !1
    },
    selectAll: {
      type: Boolean,
      default: !1
    },
    loading: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: "medium",
      validator: (e) => jt.includes(e)
    },
    highlightedIndex: {
      type: Number,
      default: -1
    },
    triggerEvent: {
      type: String,
      default: "click"
    },
    emptyText: {
      type: String,
      default: void 0
    },
    checkPosition: {
      type: String,
      default: "right"
    },
    selectedTone: {
      type: String,
      default: "neutral"
    },
    language: {
      type: String,
      default: void 0
    }
  },
  emits: {
    select: (e) => !0,
    highlight: (e) => !0,
    selectAll: (e) => !0,
    loadMore: () => !0
  },
  setup(e, {
    emit: t,
    slots: a
  }) {
    const l = O(() => e.multiple ? e.value ?? [] : e.value == null ? [] : [e.value]), u = O(() => e.variants.some((y) => y.group)), i = O(() => e.variants.filter((y) => !y.disabled && !y.divider && y.value != null).map((y) => y.value)), o = O(() => e.multiple && i.value.length > 0 && i.value.every((y) => l.value.includes(y))), r = O(() => e.multiple && l.value.length > 0 && !o.value), c = () => t("selectAll", o.value ? [] : i.value), s = (y) => {
      y.disabled || t("select", y);
    };
    let b = !1;
    const d = (y) => {
      const v = y.target, g = v.scrollTop + v.clientHeight >= v.scrollHeight - 24;
      g && !b && t("loadMore"), b = g;
    }, f = (y) => e.triggerEvent === "mousedown" ? {
      onMousedown: (v) => {
        v.preventDefault(), y();
      }
    } : {
      onMousedown: (v) => v.preventDefault(),
      onClick: y
    };
    return () => {
      let y;
      const v = le(e.language);
      let g;
      return n("div", {
        class: W("cubo-select__variants"),
        "data-size": e.size,
        "data-check": e.checkPosition !== "left" ? e.checkPosition : void 0,
        "data-selected-tone": e.selectedTone !== "accent" ? e.selectedTone : void 0,
        "data-multiple": e.multiple || void 0,
        "data-select-all": e.selectAll || void 0,
        role: "listbox"
      }, [e.multiple && e.selectAll && !e.loading ? n("div", te({
        class: "cubo-select__selectall"
      }, f(c)), [n(cn, {
        value: o.value,
        indeterminate: r.value,
        size: "small"
      }, vr(y = v("select.selectAll")) ? y : {
        default: () => [y]
      })]) : null, n("div", {
        class: "cubo-select__list",
        onScroll: d
      }, [e.loading ? n("div", {
        class: "cubo-select__loading"
      }, [n(Ae, {
        size: 16
      }, null)]) : n(se, null, [e.variants.length === 0 ? n("div", {
        class: "cubo-select__empty"
      }, [e.emptyText ?? v("select.empty")]) : null, e.variants.map((w, p) => {
        if (w.divider)
          return n("div", {
            key: `divider-${p}`,
            class: "cubo-select__divider",
            role: "separator"
          }, null);
        const T = u.value && w.group && w.group !== g ? n("div", {
          class: "cubo-select__group"
        }, [w.group]) : null;
        g = w.group;
        const A = w.value != null && l.value.includes(w.value), m = e.checkPosition === "left" && !e.multiple && l.value.length === 0, C = e.checkPosition === "none" || m ? null : n("span", {
          class: "cubo-select__option-check"
        }, [e.multiple ? n(cn, {
          value: A,
          size: "small"
        }, null) : A ? n(M, {
          icon: "check",
          size: 16
        }, null) : null]), k = n("span", {
          class: "cubo-select__option-label"
        }, [a.variant ? a.variant({
          variant: w
        }) : w.label]), z = w.description ? n("span", {
          class: "cubo-select__option-body"
        }, [k, n("span", {
          class: "cubo-select__option-description"
        }, [w.description])]) : k;
        return n(se, null, [T, n("div", te({
          class: "cubo-select__option",
          role: "option",
          "aria-selected": A,
          "data-index": p,
          "data-selected": A || void 0,
          "data-highlighted": e.highlightedIndex === p || void 0,
          "data-disabled": w.disabled || void 0,
          "data-has-description": w.description ? "" : void 0,
          onMouseenter: () => {
            w.disabled || t("highlight", p);
          }
        }, f(() => s(w))), [e.checkPosition === "right" ? n(se, null, [z, C]) : n(se, null, [C, z])])]);
      })])])]);
    };
  }
}), mr = yr;
function gr(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ce(e);
}
const ja = {
  small: "small",
  medium: "medium",
  large: "large"
};
function Va(e, t, a) {
  let l = t;
  for (; ; ) {
    const u = l + a;
    if (u < 0 || u >= e.length) return t < 0 ? Ul(e) : t;
    if (l = u, !e[l].disabled && !e[l].divider) return l;
  }
}
function Ul(e) {
  return e.findIndex((t) => !t.disabled && !t.divider);
}
function hr(e) {
  const t = [], a = /* @__PURE__ */ new Map();
  for (const l of e)
    if (!(l.divider || l.value == null))
      if (l.group == null) t.push(l);
      else {
        const u = a.get(l.group);
        u ? u.push(l) : a.set(l.group, [l]);
      }
  return {
    top: t,
    groups: [...a.entries()]
  };
}
const _r = /* @__PURE__ */ N({
  name: "CuboSelect",
  // We forward fallthrough attrs ourselves so native mode can target the inner
  // <select> (id/name/required), not the wrapper — mirroring React's `{...rest}`.
  inheritAttrs: !1,
  props: {
    value: {
      type: null,
      default: void 0
    },
    variants: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: !1
    },
    native: {
      type: Boolean,
      default: !1
    },
    searchable: {
      type: Boolean,
      default: !1
    },
    selectAll: {
      type: Boolean,
      default: !1
    },
    clearable: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    readonly: {
      type: Boolean,
      default: !1
    },
    loading: {
      type: Boolean,
      default: !1
    },
    error: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: "medium",
      validator: (e) => jt.includes(e)
    },
    position: {
      type: String,
      default: "bottom_left"
    },
    placeholder: {
      type: String,
      default: void 0
    },
    searchPlaceholder: {
      type: String,
      default: void 0
    },
    maxTagCount: {
      type: Number,
      default: 3
    },
    tagsRemovable: {
      type: Boolean,
      default: !1
    },
    // Show every selected tag (no `+N`); the trigger grows and tags wrap.
    tagsWrap: {
      type: Boolean,
      default: !1
    },
    checkPosition: {
      type: String,
      default: "right"
    },
    selectedTone: {
      type: String,
      default: "neutral"
    },
    filterFn: {
      type: [Function, null],
      default: void 0
    },
    teleportSelector: {
      type: String,
      default: void 0
    },
    triggerEvent: {
      type: String,
      default: "click"
    },
    ariaLabelledby: {
      type: String,
      default: void 0
    },
    ariaRequired: {
      type: Boolean,
      default: !1
    },
    language: {
      type: String,
      default: void 0
    }
  },
  emits: {
    change: (e, t) => !0,
    setOpened: (e) => !0,
    search: (e) => !0,
    loadMore: () => !0
  },
  setup(e, {
    emit: t,
    slots: a,
    attrs: l
  }) {
    const u = at(), i = _e(() => e.language), o = ct(), r = E(null), c = E(null), s = E(null), b = E(!1), d = E(""), f = E(0), y = E(null), v = O(() => !e.disabled && !e.readonly && !e.loading), g = O(() => new Map(e.variants.map((_) => [_.value, _]))), w = O(() => e.searchable && d.value && e.filterFn !== null ? (e.filterFn ?? Ni)(d.value, e.variants) : e.variants), p = O(() => e.multiple ? e.value ?? [] : e.value == null ? [] : [e.value]), T = O(() => p.value.map((_) => g.value.get(_)).filter(Boolean)), A = O(() => qi(e.value)), m = (_) => {
      b.value = _, t("setOpened", _), _ || (d.value = "");
    }, C = () => {
      var re;
      if (!r.value) return;
      const _ = r.value.getBoundingClientRect(), D = {
        top: _.top,
        left: _.left,
        width: _.width,
        height: _.height
      }, F = rt(D, e.position, 4), H = ((re = c.value) == null ? void 0 : re.offsetHeight) ?? 0, X = H && e.position.startsWith("bottom") ? Sl(D, H, 4) : null;
      y.value = {
        top: X ?? F.top,
        left: F.left,
        transform: F.transform,
        minWidth: `${_.width}px`
      };
    }, k = (_) => {
      var F, H;
      const D = _.target;
      (F = r.value) != null && F.contains(D) || (H = D == null ? void 0 : D.closest) != null && H.call(D, ".cubo-select__panel") || m(!1);
    }, z = (_) => {
      b.value && _.key === "Escape" && m(!1);
    };
    Q(b, async (_) => {
      var D, F;
      if (_) {
        document.addEventListener("mousedown", k), document.addEventListener("keydown", z), window.addEventListener("scroll", C, !0), window.addEventListener("resize", C), await be(), C(), e.searchable && !((D = window.matchMedia) != null && D.call(window, "(pointer: coarse)").matches) && ((F = s.value) == null || F.focus());
        const H = w.value.findIndex((X) => X.value != null && p.value.includes(X.value));
        f.value = H >= 0 ? H : Ul(w.value);
      } else
        document.removeEventListener("mousedown", k), document.removeEventListener("keydown", z), window.removeEventListener("scroll", C, !0), window.removeEventListener("resize", C);
    }), Se(() => {
      document.removeEventListener("mousedown", k), document.removeEventListener("keydown", z), window.removeEventListener("scroll", C, !0), window.removeEventListener("resize", C);
    }), Q(f, async () => {
      var _;
      b.value && (await be(), (_ = document.querySelector(`.cubo-select__panel [data-index="${f.value}"]`)) == null || _.scrollIntoView({
        block: "nearest"
      }));
    });
    const x = (_) => {
      if (!(_.disabled || _.divider || _.value == null))
        if (e.multiple) {
          const D = e.value ?? [], F = D.includes(_.value) ? D.filter((H) => H !== _.value) : [...D, _.value];
          t("change", F, F.map((H) => g.value.get(H)).filter(Boolean));
        } else
          t("change", _.value, _), m(!1);
    }, R = (_) => {
      _.stopPropagation(), t("change", e.multiple ? [] : void 0, e.multiple ? [] : void 0);
    }, U = (_, D) => {
      _.stopPropagation();
      const F = (e.value ?? []).filter((H) => H !== D);
      t("change", F, F.map((H) => g.value.get(H)).filter(Boolean));
    }, B = (_) => {
      t("change", _, _.map((D) => g.value.get(D)).filter(Boolean));
    }, h = (_) => {
      if (v.value) {
        if (!b.value) {
          ["Enter", "ArrowDown", " "].includes(_.key) && (_.preventDefault(), m(!0));
          return;
        }
        if (_.key === "ArrowDown")
          _.preventDefault(), f.value = Va(w.value, f.value, 1);
        else if (_.key === "ArrowUp")
          _.preventDefault(), f.value = Va(w.value, f.value, -1);
        else if (_.key === "Enter") {
          _.preventDefault();
          const D = w.value[f.value];
          D && x(D);
        }
      }
    };
    return () => {
      var I, P, V;
      const {
        class: _,
        style: D,
        ...F
      } = l;
      if (e.native) {
        const {
          top: K,
          groups: G
        } = hr(e.variants), q = (Y) => {
          const ee = e.variants.find((ge) => String(ge.value) === Y);
          return ee ? ee.value : Y;
        }, Z = (Y) => {
          const ee = Y.target;
          if (e.multiple) {
            const ge = Array.from(ee.selectedOptions, (ce) => q(ce.value));
            t("change", ge, ge.map((ce) => g.value.get(ce)).filter(Boolean));
          } else {
            const ge = q(ee.value);
            t("change", ge, g.value.get(ge));
          }
        }, de = !e.multiple && !A.value && e.variants.some((Y) => Y.value != null && String(Y.value) === String(e.value)) ? String(e.value) : "", me = new Set((e.multiple ? Array.isArray(e.value) ? e.value : [] : []).map(String)), $ = (Y, ee) => n("option", {
          key: `${String(Y.value)}-${ee}`,
          value: String(Y.value),
          disabled: Y.disabled,
          selected: e.multiple ? me.has(String(Y.value)) : void 0
        }, [Y.label ?? String(Y.value)]);
        return n("div", {
          class: [W("cubo-native-select"), _],
          style: [D, o.value ? {
            "--cubo-config-bg": o.value
          } : void 0],
          "data-size": e.size,
          "data-gtc-size": (I = u == null ? void 0 : u.vnode.props) != null && I.size ? ja[e.size] : void 0,
          "data-disabled": e.disabled || void 0,
          "data-error": e.error || void 0
        }, [n("select", te(F, e.multiple ? {} : {
          value: de
        }, {
          class: "cubo-native-select__select",
          multiple: e.multiple,
          disabled: e.disabled,
          onChange: Z
        }), [e.multiple ? null : n("option", {
          value: "",
          disabled: !0,
          hidden: !0
        }, [e.placeholder ?? ""]), K.map($), G.map(([Y, ee]) => n("optgroup", {
          key: Y,
          label: Y
        }, [ee.map($)]))]), n(M, {
          icon: "selector",
          size: 16,
          class: "cubo-native-select__icon"
        }, null)]);
      }
      const H = le(i.value);
      let X;
      if (a.value)
        X = a.value({
          selected: e.multiple ? T.value : T.value[0]
        });
      else if (A.value)
        X = n("span", null, [e.placeholder ?? H("select.placeholder")]);
      else if (e.multiple) {
        const K = e.tagsWrap ? T.value.length : e.maxTagCount, G = T.value.slice(0, K), q = T.value.slice(K);
        X = n(se, null, [G.map((Z) => n("span", {
          class: "cubo-select__tag",
          key: Z.value
        }, [Z.label, e.tagsRemovable && v.value ? n("span", {
          class: "cubo-select__tag-remove",
          onClick: (oe) => U(oe, Z.value)
        }, [n(M, {
          icon: "x",
          size: 12
        }, null)]) : null])), q.length > 0 ? (
          // The counter names what it hides (plain tooltip via title).
          n("span", {
            class: "cubo-select__more",
            title: q.map((Z) => Z.label).join(", ")
          }, [xe("+"), q.length])
        ) : null]);
      } else
        X = n("span", null, [((P = T.value[0]) == null ? void 0 : P.label) ?? String(e.value)]);
      const re = e.clearable && v.value && !A.value, ae = b.value ? n("div", {
        ref: c,
        class: "cubo-select__panel",
        "data-size": e.size,
        style: y.value ?? void 0
      }, [e.searchable ? n("div", {
        class: "cubo-select__search"
      }, [n(M, {
        icon: "search",
        size: 16
      }, null), n("input", {
        ref: s,
        class: "cubo-select__search-input",
        type: "text",
        placeholder: e.searchPlaceholder ?? H("select.searchPlaceholder"),
        value: d.value,
        onInput: (K) => {
          d.value = K.target.value, t("search", d.value), f.value = 0;
        },
        onKeydown: h
      }, null)]) : null, n(mr, {
        variants: w.value,
        value: e.value,
        multiple: e.multiple,
        selectAll: e.selectAll,
        size: e.size,
        language: i.value,
        highlightedIndex: f.value,
        triggerEvent: e.triggerEvent,
        checkPosition: e.checkPosition,
        selectedTone: e.selectedTone,
        onHighlight: (K) => f.value = K,
        onSelect: x,
        onSelectAll: B,
        onLoadMore: () => t("loadMore")
      }, {
        variant: a.variant ? (K) => a.variant(K) : void 0
      })]) : null;
      return n("div", te(F, {
        ref: r,
        class: [W("cubo-select"), _],
        style: [D, o.value ? {
          "--cubo-config-bg": o.value
        } : void 0],
        "data-size": e.size,
        "data-gtc-size": (V = u == null ? void 0 : u.vnode.props) != null && V.size ? ja[e.size] : void 0,
        "data-open": b.value || void 0,
        "data-disabled": e.disabled || void 0,
        "data-readonly": e.readonly || void 0,
        "data-loading": e.loading || void 0,
        "data-multiple": e.multiple || void 0,
        "data-searchable": e.searchable || void 0,
        "data-tags-removable": e.tagsRemovable || void 0,
        "data-tags-wrap": e.tagsWrap || void 0,
        "data-empty": A.value || void 0,
        "data-error": e.error || void 0
      }), [n("div", {
        class: "cubo-select__trigger",
        role: "combobox",
        "aria-expanded": b.value,
        "aria-haspopup": "listbox",
        "aria-labelledby": e.ariaLabelledby,
        "aria-required": e.ariaRequired || void 0,
        tabindex: v.value ? 0 : -1,
        onClick: () => v.value && m(!b.value),
        onKeydown: h
      }, [n("span", {
        class: "cubo-select__value",
        "data-empty": A.value || void 0
      }, [X]), n("span", {
        class: "cubo-select__trailing"
      }, [e.loading ? n(Ae, {
        size: 16
      }, null) : re ? n("span", {
        class: "cubo-select__clear",
        onClick: R
      }, [n(M, {
        icon: "x",
        size: 16
      }, null)]) : n("span", {
        class: "cubo-select__chevron"
      }, [n(M, {
        icon: "chevron-down",
        size: 16
      }, null)])])]), b.value ? n(De, {
        to: Ee(e.teleportSelector)
      }, gr(ae) ? ae : {
        default: () => [ae]
      }) : null]);
    };
  }
}), je = _r, Ua = /* @__PURE__ */ N({
  name: "CuboCalendarGrid",
  props: {
    year: {
      type: Number,
      required: !0
    },
    /** 0–11. */
    month: {
      type: Number,
      required: !0
    },
    weekStartsOn: {
      type: Number,
      default: 1
    },
    timeZone: {
      type: String,
      default: void 0
    },
    locale: {
      type: String,
      default: void 0
    },
    disabledDate: {
      type: Function,
      default: void 0
    },
    cellFlags: {
      type: Function,
      required: !0
    },
    onSelect: {
      type: Function,
      required: !0
    },
    onHover: {
      type: Function,
      default: void 0
    },
    isActive: {
      type: Function,
      default: void 0
    },
    onFocusCell: {
      type: Function,
      default: void 0
    },
    onKeydownCell: {
      type: Function,
      default: void 0
    },
    getCellAriaLabel: {
      type: Function,
      default: void 0
    },
    renderCell: {
      type: Function,
      default: void 0
    }
  },
  setup(e) {
    const t = O(() => ui(e.year, e.month, {
      weekStartsOn: e.weekStartsOn,
      timeZone: e.timeZone
    })), a = O(() => ii(e.locale, e.weekStartsOn));
    return () => n(se, null, [n("div", {
      class: "cubo-calendar__weekdays"
    }, [a.value.map((l, u) => n("span", {
      key: u,
      class: "cubo-calendar__weekday"
    }, [l]))]), n("div", {
      class: "cubo-calendar__grid"
    }, [t.value.map((l) => {
      var d, f, y;
      const {
        selected: u,
        inRange: i,
        preview: o,
        rangeStart: r,
        rangeEnd: c
      } = e.cellFlags(l), s = !!((d = e.disabledDate) != null && d.call(e, l.date)), b = !!((f = e.isActive) != null && f.call(e, l));
      return n("button", {
        key: `${l.year}-${l.month}-${l.day}`,
        type: "button",
        class: "cubo-calendar__cell",
        "data-outside": !l.inMonth || void 0,
        "data-today": l.isToday || void 0,
        "data-selected": u || void 0,
        "data-range": i || void 0,
        "data-preview": o || void 0,
        "data-range-start": r || void 0,
        "data-range-end": c || void 0,
        "data-disabled": s || void 0,
        "data-focus-date": b || void 0,
        disabled: s,
        tabindex: b ? 0 : -1,
        "aria-current": l.isToday ? "date" : void 0,
        "aria-label": (y = e.getCellAriaLabel) == null ? void 0 : y.call(e, l),
        onClick: () => e.onSelect(l),
        onMouseenter: () => {
          var v;
          return (v = e.onHover) == null ? void 0 : v.call(e, l);
        },
        onFocus: () => {
          var v;
          return (v = e.onFocusCell) == null ? void 0 : v.call(e, l);
        },
        onKeydown: (v) => {
          var g;
          return (g = e.onKeydownCell) == null ? void 0 : g.call(e, v, l);
        }
      }, [e.renderCell ? e.renderCell({
        ...l,
        selected: u,
        disabled: s,
        inRange: i
      }) : l.day]);
    })])]);
  }
}), wr = (e, t) => {
  const {
    hour: a,
    minute: l
  } = fn(e, t);
  return `${String(a).padStart(2, "0")}:${String(l).padStart(2, "0")}`;
}, Cr = (e, t, a) => new Intl.DateTimeFormat(a, {
  month: "short"
}).format(new Date(e, t, 1)), xn = (e) => e - 6, An = 12, pr = /* @__PURE__ */ N({
  name: "CuboCalendar",
  props: {
    type: {
      type: String,
      default: "single"
    },
    value: {
      type: null,
      default: void 0
    },
    timeZone: {
      type: String,
      default: void 0
    },
    locale: {
      type: String,
      default: void 0
    },
    language: {
      type: String,
      default: void 0
    },
    weekStartsOn: {
      type: Number,
      default: 1
    },
    disabledDate: {
      type: Function,
      default: void 0
    },
    time: {
      type: Boolean,
      default: !1
    },
    dual: {
      type: Boolean,
      default: !1
    },
    presets: {
      type: Array,
      default: void 0
    },
    renderCell: {
      type: Function,
      default: void 0
    }
  },
  emits: {
    change: (e) => !0
  },
  setup(e, {
    emit: t,
    expose: a
  }) {
    const l = _e(() => e.language), u = O(() => e.locale ?? $u[l.value]), i = O(() => e.value == null ? [] : Array.isArray(e.value) ? e.value.slice() : [e.value]), o = he(i.value[0] ?? /* @__PURE__ */ new Date(), e.timeZone), r = E({
      year: o.year,
      month: o.month
    }), c = E(null), s = E("days"), b = E(null), d = () => {
      const I = he(/* @__PURE__ */ new Date(), e.timeZone);
      return Ne(I.year, I.month, I.day, 0, 0, e.timeZone);
    }, f = E(i.value[0] ?? d()), y = O(() => e.dual ? [r.value, Je(r.value.year, r.value.month, 1)] : [r.value]), v = (I) => {
      t("change", e.type === "single" ? I[0] ?? void 0 : I);
    }, g = (I) => {
      var P;
      return !!((P = e.disabledDate) != null && P.call(e, I));
    }, w = (I, P) => {
      const V = he(I, e.timeZone);
      return Ne(V.year, V.month, V.day + P, 0, 0, e.timeZone);
    }, p = (I, P, V) => {
      const {
        day: K
      } = he(V, e.timeZone), G = new Date(I, P + 1, 0).getDate();
      return Ne(I, P, Math.min(K, G), 0, 0, e.timeZone);
    }, T = (I, P) => {
      let V = I;
      for (let K = 0; K < 3660; K += 1) {
        if (!g(V)) return V;
        V = w(V, P);
      }
      return I;
    }, A = (I, P) => {
      const V = he(I, e.timeZone);
      return V.year === P.year && V.month === P.month;
    }, m = (I, P) => {
      const V = r.value;
      if (!e.dual) {
        const Z = he(I, e.timeZone);
        r.value = {
          year: Z.year,
          month: Z.month
        };
        return;
      }
      const K = Je(V.year, V.month, 1);
      if (A(I, V) || A(I, K)) return;
      const G = Je(V.year, V.month, -1), q = Je(V.year, V.month, 2);
      if (A(I, G))
        r.value = G;
      else if (A(I, q))
        r.value = K;
      else {
        const Z = he(I, e.timeZone);
        r.value = P < 0 ? {
          year: Z.year,
          month: Z.month
        } : Je(Z.year, Z.month, -1);
      }
    }, C = (I, P = 1, V = !1, K = !1) => {
      const G = T(I, P);
      f.value = G, K && m(G, P), V && be(() => {
        var q, Z;
        return (Z = (q = b.value) == null ? void 0 : q.querySelector("[data-focus-date]")) == null ? void 0 : Z.focus();
      });
    }, k = (I) => {
      const P = Je(r.value.year, r.value.month, I);
      r.value = P, C(p(P.year, P.month, f.value), I < 0 ? -1 : 1);
    }, z = (I) => {
      s.value === "months" ? r.value = {
        ...r.value,
        year: r.value.year + I
      } : s.value === "years" ? r.value = {
        ...r.value,
        year: r.value.year + I * An
      } : k(I);
    }, x = () => {
      s.value = s.value === "days" ? "months" : "years";
    }, R = (I) => {
      const P = e.timeZone, V = {
        selected: !1,
        inRange: !1,
        preview: !1,
        rangeStart: !1,
        rangeEnd: !1
      };
      if (e.type === "multiple")
        return {
          ...V,
          selected: i.value.some((K) => He(K, I.date, P))
        };
      if (e.type === "range") {
        const [K, G] = i.value, q = !!(K && G), Z = G ?? (i.value.length === 1 ? c.value : void 0);
        let oe = K, de = Z ?? void 0;
        K && Z && Qt(K, Z, P) > 0 && (oe = Z, de = K);
        const me = K && He(I.date, K, P) || Z && He(I.date, Z, P), $ = !!(oe && de && Qt(I.date, oe, P) > 0 && Qt(I.date, de, P) < 0), Y = !!oe && !!de;
        return {
          selected: !!me,
          inRange: q && $,
          preview: !q && $,
          rangeStart: Y && !!oe && He(I.date, oe, P),
          rangeEnd: Y && !!de && He(I.date, de, P)
        };
      }
      return {
        ...V,
        selected: He(i.value[0], I.date, P)
      };
    }, U = (I) => {
      var V;
      const P = e.timeZone;
      if (!((V = e.disabledDate) != null && V.call(e, I.date))) {
        if (C(I.date), e.type === "single") {
          const K = i.value[0] ? fn(i.value[0], P) : {
            hour: 0,
            minute: 0
          };
          v([Ne(I.year, I.month, I.day, K.hour, K.minute, P)]);
        } else if (e.type === "multiple") {
          const K = i.value.find((G) => He(G, I.date, P));
          v(K ? i.value.filter((G) => G !== K) : [...i.value, Ne(I.year, I.month, I.day, 0, 0, P)].sort((G, q) => G.getTime() - q.getTime()));
        } else {
          const K = Ne(I.year, I.month, I.day, 0, 0, P);
          if (i.value.length === 1) {
            const G = i.value[0];
            v(Qt(G, K, P) <= 0 ? [G, K] : [K, G]), c.value = null;
          } else
            v([K]);
        }
        I.inMonth || (r.value = {
          year: I.year,
          month: I.month
        });
      }
    }, B = (I) => {
      e.type === "range" && i.value.length === 1 && !g(I.date) && (c.value = I.date);
    }, h = (I) => I.inMonth && He(I.date, f.value, e.timeZone), _ = (I) => new Intl.DateTimeFormat(u.value, {
      dateStyle: "full"
    }).format(I.date), D = () => {
      const I = i.value[0] ?? d();
      C(I, 1, !0);
    }, F = (I) => {
      He(I.date, f.value, e.timeZone) || (f.value = I.date);
    }, H = (I, P) => {
      const V = (G, q) => {
        I.preventDefault(), C(G, q, !0, !0);
      }, K = he(P.date, e.timeZone);
      switch (I.key) {
        case "ArrowLeft":
          V(w(P.date, -1), -1);
          break;
        case "ArrowRight":
          V(w(P.date, 1), 1);
          break;
        case "ArrowUp":
          V(w(P.date, -7), -1);
          break;
        case "ArrowDown":
          V(w(P.date, 7), 1);
          break;
        case "Home": {
          const q = (new Date(K.year, K.month, K.day).getDay() - e.weekStartsOn + 7) % 7;
          V(w(P.date, -q), -1);
          break;
        }
        case "End": {
          const G = new Date(K.year, K.month, K.day).getDay(), q = (e.weekStartsOn + 6 - G + 7) % 7;
          V(w(P.date, q), 1);
          break;
        }
        case "PageUp": {
          const G = I.shiftKey ? {
            year: K.year - 1,
            month: K.month
          } : Je(K.year, K.month, -1);
          V(p(G.year, G.month, P.date), -1);
          break;
        }
        case "PageDown": {
          const G = I.shiftKey ? {
            year: K.year + 1,
            month: K.month
          } : Je(K.year, K.month, 1);
          V(p(G.year, G.month, P.date), 1);
          break;
        }
        default:
          return;
      }
    };
    Q(i, (I) => {
      I[0] && (f.value = I[0]);
    }), a({
      focusDate: D
    });
    const X = (I, P) => {
      const V = i.value[I];
      if (!V || !/^\d{2}:\d{2}$/.test(P)) return;
      const [K, G] = P.split(":").map(Number), q = he(V, e.timeZone), Z = i.value.slice();
      Z[I] = Ne(q.year, q.month, q.day, K, G, e.timeZone), v(Z);
    }, re = (I) => {
      const P = Array.isArray(I.value) ? I.value : [I.value];
      if (v(P), P[0]) {
        const V = he(P[0], e.timeZone);
        r.value = {
          year: V.year,
          month: V.month
        };
      }
    }, ae = () => {
      const I = he(/* @__PURE__ */ new Date(), e.timeZone);
      if (s.value === "months")
        return n("div", {
          class: "cubo-calendar__grid cubo-calendar__grid--months"
        }, [Array.from({
          length: 12
        }, (V, K) => n("button", {
          key: K,
          type: "button",
          class: "cubo-calendar__picker-cell",
          "data-selected": K === r.value.month || void 0,
          "data-current": r.value.year === I.year && K === I.month || void 0,
          onClick: () => {
            r.value = {
              ...r.value,
              month: K
            }, s.value = "days";
          }
        }, [Cr(r.value.year, K, u.value)]))]);
      const P = xn(r.value.year);
      return n("div", {
        class: "cubo-calendar__grid cubo-calendar__grid--years"
      }, [Array.from({
        length: An
      }, (V, K) => {
        const G = P + K;
        return n("button", {
          key: G,
          type: "button",
          class: "cubo-calendar__picker-cell",
          "data-selected": G === r.value.year || void 0,
          "data-current": G === I.year || void 0,
          onClick: () => {
            r.value = {
              ...r.value,
              year: G
            }, s.value = "months";
          }
        }, [G]);
      })]);
    };
    return () => {
      const I = le(l.value), P = s.value === "days" ? Ea(r.value.year, r.value.month, u.value) : s.value === "months" ? String(r.value.year) : `${xn(r.value.year)} – ${xn(r.value.year) + An - 1}`;
      return n("div", {
        ref: b,
        class: W("cubo-calendar"),
        "data-dual": e.dual || void 0,
        "data-mode": s.value
      }, [n("div", {
        class: "cubo-calendar__months"
      }, [e.dual ? y.value.map((V, K) => n("div", {
        key: `${V.year}-${V.month}`,
        class: "cubo-calendar__month"
      }, [n("div", {
        class: "cubo-calendar__header"
      }, [n("div", {
        class: "cubo-calendar__nav-group",
        "data-hidden": K !== 0 || void 0
      }, [n("button", {
        type: "button",
        class: "cubo-calendar__nav",
        "aria-label": I("calendar.previousYear"),
        onClick: () => k(-12)
      }, [n(M, {
        icon: "chevrons-left",
        size: 16
      }, null)]), n("button", {
        type: "button",
        class: "cubo-calendar__nav",
        "aria-label": I("calendar.previousMonth"),
        onClick: () => k(-1)
      }, [n(M, {
        icon: "chevron-left",
        size: 16
      }, null)])]), n("div", {
        class: "cubo-calendar__title cubo-calendar__title--static"
      }, [Ea(V.year, V.month, u.value)]), n("div", {
        class: "cubo-calendar__nav-group",
        "data-hidden": K !== y.value.length - 1 || void 0
      }, [n("button", {
        type: "button",
        class: "cubo-calendar__nav",
        "aria-label": I("calendar.nextMonth"),
        onClick: () => k(1)
      }, [n(M, {
        icon: "chevron-right",
        size: 16
      }, null)]), n("button", {
        type: "button",
        class: "cubo-calendar__nav",
        "aria-label": I("calendar.nextYear"),
        onClick: () => k(12)
      }, [n(M, {
        icon: "chevrons-right",
        size: 16
      }, null)])])]), n(Ua, {
        year: V.year,
        month: V.month,
        weekStartsOn: e.weekStartsOn,
        timeZone: e.timeZone,
        locale: u.value,
        disabledDate: e.disabledDate,
        cellFlags: R,
        onSelect: U,
        onHover: B,
        isActive: h,
        onFocusCell: F,
        onKeydownCell: H,
        getCellAriaLabel: _,
        renderCell: e.renderCell
      }, null)])) : n("div", {
        class: "cubo-calendar__month"
      }, [n("div", {
        class: "cubo-calendar__header"
      }, [n("div", {
        class: "cubo-calendar__nav-group"
      }, [n("button", {
        type: "button",
        class: "cubo-calendar__nav",
        "aria-label": I("calendar.previous"),
        onClick: () => z(-1)
      }, [n(M, {
        icon: "chevron-left",
        size: 16
      }, null)])]), n("button", {
        type: "button",
        class: "cubo-calendar__title",
        onClick: x,
        "aria-label": I("calendar.switchView")
      }, [P]), n("div", {
        class: "cubo-calendar__nav-group"
      }, [n("button", {
        type: "button",
        class: "cubo-calendar__nav",
        "aria-label": I("calendar.next"),
        onClick: () => z(1)
      }, [n(M, {
        icon: "chevron-right",
        size: 16
      }, null)])])]), s.value === "days" ? n(Ua, {
        year: r.value.year,
        month: r.value.month,
        weekStartsOn: e.weekStartsOn,
        timeZone: e.timeZone,
        locale: u.value,
        disabledDate: e.disabledDate,
        cellFlags: R,
        onSelect: U,
        onHover: B,
        isActive: h,
        onFocusCell: F,
        onKeydownCell: H,
        getCellAriaLabel: _,
        renderCell: e.renderCell
      }, null) : ae()])]), s.value === "days" && e.time && i.value.length > 0 ? n("div", {
        class: "cubo-calendar__times"
      }, [i.value.slice(0, e.type === "range" ? 2 : 1).map((V, K) => n("label", {
        key: K,
        class: "cubo-calendar__time"
      }, [e.type === "range" ? n("span", null, [I(K === 0 ? "calendar.from" : "calendar.to")]) : null, n("input", {
        type: "time",
        class: "cubo-calendar__time-input",
        value: wr(V, e.timeZone),
        onInput: (G) => X(K, G.target.value)
      }, null)]))]) : null, s.value === "days" && e.presets && e.presets.length > 0 ? n("div", {
        class: "cubo-calendar__presets"
      }, [e.presets.map((V) => n(ie, {
        key: V.label,
        size: "small",
        ghost: !0,
        color: "neutral",
        onClick: () => re(V)
      }, {
        default: () => [V.label]
      }))]) : null]);
    };
  }
}), Sr = pr, kr = Sr, xr = (e, t) => {
  const {
    hour: a,
    minute: l
  } = fn(e, t);
  return `${String(a).padStart(2, "0")}:${String(l).padStart(2, "0")}`;
}, Ar = /* @__PURE__ */ N({
  name: "CuboDatePicker",
  props: {
    type: {
      type: String,
      default: "single"
    },
    value: {
      type: null,
      default: void 0
    },
    format: {
      type: String,
      default: "dd.mm.yyyy"
    },
    timeZone: {
      type: String,
      default: void 0
    },
    locale: {
      type: String,
      default: void 0
    },
    weekStartsOn: {
      type: Number,
      default: 1
    },
    disabledDate: {
      type: Function,
      default: void 0
    },
    time: {
      type: Boolean,
      default: !1
    },
    dual: {
      type: Boolean,
      default: !1
    },
    presets: {
      type: Array,
      default: void 0
    },
    renderCell: {
      type: Function,
      default: void 0
    },
    placeholder: {
      type: String,
      default: void 0
    },
    language: {
      type: String,
      default: void 0
    },
    size: {
      type: String,
      default: "medium"
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    clearable: {
      type: Boolean,
      default: !1
    },
    position: {
      type: String,
      default: "bottom_left"
    },
    teleportSelector: {
      type: String,
      default: void 0
    },
    ariaLabelledby: {
      type: String,
      default: void 0
    },
    ariaRequired: {
      type: Boolean,
      default: !1
    }
  },
  emits: {
    change: (e) => !0
  },
  setup(e, {
    emit: t
  }) {
    const a = at(), l = _e(() => e.language), u = O(() => e.value == null ? [] : Array.isArray(e.value) ? e.value : [e.value]), i = E(!1), o = E(null), r = E(null), c = E(null), s = E(null), b = E(null), d = `cubo-date-picker-${ot()}`, f = E("input"), y = E(!1), v = O(() => {
      const B = u.value;
      return e.type === "single" ? Sn(B[0], e.format, e.timeZone) : e.type === "range" ? B[0] ? `${Sn(B[0], e.format, e.timeZone)} – ${B[1] ? Sn(B[1], e.format, e.timeZone) : "…"}` : "" : B.length ? le(l.value)("datePicker.selected", {
        count: B.length
      }) : "";
    }), g = E(v.value);
    Q(v, (B) => g.value = B);
    const w = (B) => t("change", B), p = () => {
      if (e.type !== "single") return;
      const B = oi(g.value, e.format, e.timeZone);
      if (B) {
        const h = u.value[0] ? fn(u.value[0], e.timeZone) : {
          hour: 0,
          minute: 0
        }, _ = he(B, e.timeZone);
        w(Ne(_.year, _.month, _.day, h.hour, h.minute, e.timeZone));
      } else
        g.value = v.value;
    }, T = (B) => {
      if (!u.value[0] || !/^\d{2}:\d{2}$/.test(B)) return;
      const [h, _] = B.split(":").map(Number), D = he(u.value[0], e.timeZone);
      w(Ne(D.year, D.month, D.day, h, _, e.timeZone));
    }, A = (B) => {
      w(B);
      const h = Array.isArray(B) ? B : B ? [B] : [];
      e.type === "single" && !e.time && z(), e.type === "range" && h.length === 2 && z();
    }, m = (B) => {
      B.stopPropagation(), w(e.type === "single" ? void 0 : []);
    }, C = () => {
      if (!r.value) return;
      const B = r.value.getBoundingClientRect(), h = rt({
        top: B.top,
        left: B.left,
        width: B.width,
        height: B.height
      }, e.position, 6);
      o.value = {
        top: h.top,
        left: h.left,
        transform: h.transform
      }, be(() => {
        const _ = () => {
          var ae;
          const D = document.getElementById(d);
          if (!D) return 0;
          const F = D.getBoundingClientRect(), H = 16, X = document.documentElement.clientWidth, re = F.left < H ? H - F.left : F.right > X - H ? X - H - F.right : 0;
          if (re !== 0) {
            const P = `${Number.parseFloat(String(((ae = o.value) == null ? void 0 : ae.left) ?? h.left)) + re}px`;
            D.style.left = P, o.value = {
              ...o.value,
              left: P
            };
          }
          return re;
        };
        _() !== 0 && be(_);
      });
    }, k = (B) => {
      var _, D;
      const h = B.target;
      (_ = r.value) != null && _.contains(h) || (D = h == null ? void 0 : h.closest) != null && D.call(h, ".cubo-date-picker__pop") || (i.value = !1);
    }, z = () => {
      i.value = !1, be(() => {
        var B, h;
        f.value === "input" ? (y.value = !0, (B = c.value) == null || B.focus()) : (h = s.value) == null || h.focus();
      });
    }, x = () => {
      if (y.value) {
        y.value = !1;
        return;
      }
      f.value = "input", i.value = !0;
    }, R = (B) => {
      f.value = B, i.value = !0, be(() => {
        var h, _;
        return (_ = (h = b.value) == null ? void 0 : h.focusDate) == null ? void 0 : _.call(h);
      });
    }, U = (B) => {
      B.key === "Escape" && i.value && z();
    };
    return Q(i, (B) => {
      var h;
      B ? (document.addEventListener("mousedown", k), document.addEventListener("keydown", U), window.addEventListener("scroll", C, !0), window.addEventListener("resize", C), C(), be(C), (h = document.fonts) != null && h.ready && document.fonts.ready.then(C)) : (document.removeEventListener("mousedown", k), document.removeEventListener("keydown", U), window.removeEventListener("scroll", C, !0), window.removeEventListener("resize", C));
    }), Se(() => {
      document.removeEventListener("mousedown", k), document.removeEventListener("keydown", U), window.removeEventListener("scroll", C, !0), window.removeEventListener("resize", C);
    }), () => {
      const B = e.type === "single" && !e.disabled, h = e.clearable && !e.disabled && u.value.length > 0;
      return n("div", {
        ref: r,
        class: W("cubo-date-picker"),
        "data-size": e.size,
        "data-gtc-size": kt(a),
        "data-type": e.type,
        "data-disabled": e.disabled || void 0
      }, [n("div", {
        class: "cubo-date-picker__inputs"
      }, [n("div", {
        class: "cubo-date-picker__field"
      }, [n("button", {
        ref: s,
        type: "button",
        class: "cubo-date-picker__open",
        "aria-label": le(l.value)("datePicker.open"),
        "aria-expanded": i.value,
        "aria-controls": d,
        disabled: e.disabled,
        onClick: () => R("button")
      }, [n(M, {
        icon: "calendar",
        size: 16
      }, null)]), n("input", {
        ref: c,
        class: "cubo-date-picker__date",
        type: "text",
        value: B ? g.value : v.value,
        placeholder: e.placeholder ?? e.format,
        "aria-labelledby": e.ariaLabelledby,
        "aria-required": e.ariaRequired || void 0,
        "aria-expanded": i.value,
        "aria-controls": d,
        readonly: !B,
        disabled: e.disabled,
        onFocus: () => !e.disabled && x(),
        onClick: () => !e.disabled && x(),
        onInput: (_) => g.value = _.target.value,
        onKeydown: (_) => {
          _.key === "Enter" ? (p(), i.value = !1) : _.key === "ArrowDown" && !e.disabled && (_.preventDefault(), R("input"));
        },
        onBlur: p
      }, null), h ? n("span", {
        class: "cubo-date-picker__clear",
        onMousedown: m
      }, [n(M, {
        icon: "x",
        size: 15
      }, null)]) : null]), e.time && e.type === "single" ? n("div", {
        class: "cubo-date-picker__field cubo-date-picker__field--time"
      }, [n(M, {
        icon: "clock",
        size: 16
      }, null), n("input", {
        class: "cubo-date-picker__time",
        type: "time",
        value: u.value[0] ? xr(u.value[0], e.timeZone) : "",
        disabled: e.disabled || !u.value[0],
        onInput: (_) => T(_.target.value)
      }, null)]) : null]), i.value ? n(De, {
        to: Ee(e.teleportSelector)
      }, {
        default: () => [n("div", {
          id: d,
          class: "cubo-date-picker__pop",
          style: o.value ?? void 0
        }, [n(kr, {
          ref: b,
          type: e.type,
          value: e.value,
          onChange: A,
          timeZone: e.timeZone,
          locale: e.locale,
          language: e.language,
          weekStartsOn: e.weekStartsOn,
          disabledDate: e.disabledDate,
          time: e.time,
          dual: e.dual,
          presets: e.presets,
          renderCell: e.renderCell
        }, null)])]
      }) : null]);
    };
  }
}), Mt = Ar, zr = {
  small: 7,
  medium: 9,
  large: 12
}, Dr = {
  small: 9,
  medium: 11,
  large: 14
}, Er = /* @__PURE__ */ N({
  name: "CuboSwitch",
  props: {
    value: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    loading: {
      type: Boolean,
      default: !1
    },
    color: {
      type: String,
      default: void 0
    },
    size: {
      type: String,
      default: "medium"
    },
    thumbIcon: {
      type: String,
      default: void 0
    }
  },
  emits: {
    change: (e) => !0
  },
  setup(e, {
    emit: t,
    slots: a
  }) {
    return () => {
      const l = Be(e.color);
      return n("label", {
        class: W("cubo-switch"),
        "data-size": e.size,
        "data-gtc-size": e.size,
        "data-checked": e.value || void 0,
        "data-disabled": e.disabled || e.loading || void 0,
        style: l ? {
          "--cubo-switch-color": l
        } : void 0
      }, [n("input", {
        type: "checkbox",
        class: "cubo-switch__input",
        role: "switch",
        checked: e.value,
        disabled: e.disabled || e.loading,
        onChange: (u) => t("change", u.target.checked)
      }, null), n("span", {
        class: "cubo-switch__track"
      }, [n("span", {
        class: "cubo-switch__thumb"
      }, [e.loading ? n(Ae, {
        size: zr[e.size],
        stroke: 2.5
      }, null) : e.thumbIcon ? n(M, {
        icon: e.thumbIcon,
        size: Dr[e.size]
      }, null) : null])]), a.default ? n("span", {
        class: "cubo-switch__label"
      }, [a.default()]) : null]);
    };
  }
}), sn = Er, Tr = /* @__PURE__ */ N({
  name: "CuboModal",
  // The render root is a <Teleport>, so Vue can't auto-inherit fallthrough
  // attrs (class/style/id/…). We forward them onto the `.cubo-modal` overlay
  // ourselves (parity with React, which spreads `{...rest}` + merges className).
  inheritAttrs: !1,
  props: {
    visible: {
      type: Boolean,
      default: !0
    },
    loading: {
      type: Boolean,
      default: !1
    },
    closeOnEscapePress: {
      type: Boolean,
      default: !0
    },
    closeOnBackgroundClick: {
      type: Boolean,
      default: !0
    },
    showCloseIcon: {
      type: Boolean,
      default: !0
    },
    top: {
      type: Boolean,
      default: !1
    },
    wrapAttrs: {
      type: Object,
      default: void 0
    },
    teleportSelector: {
      type: String,
      default: void 0
    },
    language: {
      type: String,
      default: void 0
    },
    header: {
      type: [String, Object, Function],
      default: void 0
    },
    content: {
      type: [String, Object, Function],
      default: void 0
    },
    footer: {
      type: [String, Object, Function],
      default: void 0
    }
  },
  emits: {
    setVisible: (e) => !0
  },
  setup(e, {
    emit: t,
    slots: a,
    attrs: l
  }) {
    const u = `${ot()}-title`, i = _e(() => e.language), o = ct(), r = E(null), c = E(null);
    let s = null, b = null;
    const d = (v) => {
      !e.visible || !e.closeOnEscapePress || v.key !== "Escape" || document.querySelector(".cubo-select__panel, .cubo-date-picker__pop") || t("setVisible", !1);
    }, f = (v) => {
      var C;
      if (v.key !== "Tab") return;
      const g = c.value;
      if (!g) return;
      const w = Al(g);
      if (w.length === 0) {
        v.preventDefault(), (C = r.value) == null || C.focus();
        return;
      }
      const p = w[0], T = w[w.length - 1], A = document.activeElement, m = g.contains(A);
      v.shiftKey ? (!m || A === p) && (v.preventDefault(), T.focus()) : (!m || A === T) && (v.preventDefault(), p.focus());
    }, y = () => {
      var v;
      document.removeEventListener("keydown", f, !0), (v = s == null ? void 0 : s.focus) == null || v.call(s), s = null, b == null || b(), b = null;
    };
    return Q(() => e.visible, (v, g) => {
      v ? (s = document.activeElement, b = zl(), document.addEventListener("keydown", f, !0), be(() => {
        var w;
        return (w = r.value) == null ? void 0 : w.focus();
      })) : g && y();
    }, {
      immediate: !0
    }), ye(() => document.addEventListener("keydown", d)), Se(() => {
      document.removeEventListener("keydown", d), y();
    }), () => {
      var k, z, x;
      if (!e.visible) return null;
      const v = le(i.value), g = ne(e.header) ?? ((k = a.header) == null ? void 0 : k.call(a)), w = ne(e.footer) ?? ((z = a.footer) == null ? void 0 : z.call(a)), p = ne(e.content) ?? ((x = a.default) == null ? void 0 : x.call(a)), T = () => t("setVisible", !1), {
        class: A,
        style: m,
        ...C
      } = l;
      return n(De, {
        to: Ee(e.teleportSelector)
      }, {
        default: () => [n("div", te(C, {
          ref: r,
          class: [W("cubo-modal"), A],
          style: [m, o.value ? {
            "--cubo-config-bg": o.value
          } : void 0],
          "data-top": e.top || void 0,
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": g != null ? u : l["aria-labelledby"],
          tabindex: -1
        }), [n("div", {
          class: "cubo-modal__backdrop",
          onClick: () => e.closeOnBackgroundClick && T()
        }, null), n("div", te({
          ref: c,
          class: "cubo-modal__dialog"
        }, e.wrapAttrs || {}), [g != null ? n("div", {
          class: "cubo-modal__header",
          id: u
        }, [g, e.showCloseIcon ? n("button", {
          type: "button",
          class: "cubo-modal__close",
          "aria-label": v("modal.close"),
          onClick: T
        }, [n(M, {
          icon: "x",
          size: 20
        }, null)]) : null]) : e.showCloseIcon ? n("button", {
          type: "button",
          class: "cubo-modal__close cubo-modal__header--bare",
          "aria-label": v("modal.close"),
          onClick: T
        }, [n(M, {
          icon: "x",
          size: 20
        }, null)]) : null, n("div", {
          class: "cubo-modal__body"
        }, [p]), w != null ? n("div", {
          class: "cubo-modal__footer"
        }, [w]) : null, e.loading ? n("div", {
          class: "cubo-modal__loader"
        }, [n(Ae, {
          size: 28
        }, null)]) : null])])]
      });
    };
  }
}), Kt = Tr;
function zn(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ce(e);
}
const Hl = /* @__PURE__ */ N({
  name: "CuboEmptyHeader",
  setup(e, {
    slots: t
  }) {
    return () => {
      var a;
      return n("div", {
        class: W("cubo-empty__header")
      }, [(a = t.default) == null ? void 0 : a.call(t)]);
    };
  }
}), Gl = /* @__PURE__ */ N({
  name: "CuboEmptyMedia",
  props: {
    variant: {
      type: String,
      default: "default"
    },
    icon: {
      type: String,
      default: void 0
    }
  },
  setup(e, {
    slots: t
  }) {
    return () => {
      var a;
      return n("div", {
        class: W("cubo-empty__media"),
        "data-variant": e.variant
      }, [((a = t.default) == null ? void 0 : a.call(t)) ?? (e.icon != null ? n(M, {
        icon: e.icon,
        size: 24
      }, null) : null)]);
    };
  }
}), Zl = /* @__PURE__ */ N({
  name: "CuboEmptyTitle",
  setup(e, {
    slots: t
  }) {
    return () => {
      var a;
      return n("div", {
        class: W("cubo-empty__title")
      }, [(a = t.default) == null ? void 0 : a.call(t)]);
    };
  }
}), Wl = /* @__PURE__ */ N({
  name: "CuboEmptyDescription",
  setup(e, {
    slots: t
  }) {
    return () => {
      var a;
      return n("div", {
        class: W("cubo-empty__description")
      }, [(a = t.default) == null ? void 0 : a.call(t)]);
    };
  }
}), Yl = /* @__PURE__ */ N({
  name: "CuboEmptyContent",
  setup(e, {
    slots: t
  }) {
    return () => {
      var a;
      return n("div", {
        class: W("cubo-empty__content")
      }, [(a = t.default) == null ? void 0 : a.call(t)]);
    };
  }
}), Ir = /* @__PURE__ */ N({
  name: "CuboEmpty",
  props: {
    icon: {
      type: String,
      default: void 0
    },
    title: {
      type: [String, Object, Function],
      default: void 0
    },
    description: {
      type: [String, Object, Function],
      default: void 0
    },
    actions: {
      type: [String, Object, Function],
      default: void 0
    }
  },
  setup(e, {
    slots: t
  }) {
    return () => {
      var o;
      const a = (o = t.default) == null ? void 0 : o.call(t);
      if (a != null)
        return n("div", {
          class: W("cubo-empty")
        }, [a]);
      const l = ne(e.title), u = ne(e.description), i = ne(e.actions);
      return n("div", {
        class: W("cubo-empty")
      }, [n(Hl, null, {
        default: () => [e.icon != null ? n(Gl, {
          variant: "icon",
          icon: e.icon
        }, null) : null, l != null ? n(Zl, null, zn(l) ? l : {
          default: () => [l]
        }) : null, u != null ? n(Wl, null, zn(u) ? u : {
          default: () => [u]
        }) : null]
      }), i != null ? n(Yl, null, zn(i) ? i : {
        default: () => [i]
      }) : null]);
    };
  }
}), gd = Hl, hd = Gl, _d = Zl, wd = Wl, Cd = Yl, mn = Ir, Lr = /* @__PURE__ */ N({
  name: "CuboPagination",
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    defaultPageSize: {
      type: Number,
      default: void 0
    },
    showPageSizeSelect: {
      type: Boolean,
      default: !1
    },
    showArrows: {
      type: Boolean,
      default: !0
    },
    showIfEmpty: {
      type: Boolean,
      default: !1
    },
    itemsInCenter: {
      type: Number,
      default: 1
    },
    size: {
      type: String,
      default: "medium"
    },
    pageSizeOptions: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    clickEvent: {
      type: String,
      default: "click"
    },
    language: {
      type: String,
      default: void 0
    }
  },
  emits: {
    change: (e) => !0
  },
  setup(e, {
    emit: t
  }) {
    const a = at(), l = _e(() => e.language);
    return () => {
      const u = kt(a), i = le(l.value), o = e.pageSize || e.defaultPageSize || 10, r = Bi(e.total, o), c = e.showIfEmpty || r > 1;
      if (!c && !e.showPageSizeSelect) return null;
      const s = Ri({
        current: e.current,
        totalPages: r,
        itemsInCenter: e.itemsInCenter,
        showArrows: e.showArrows
      }), b = (d) => {
        const f = Math.min(Math.max(d, 1), r);
        f !== e.current && t("change", {
          current: f,
          pageSize: o
        });
      };
      return n("div", {
        class: W("cubo-pagination"),
        "data-size": e.size,
        "data-gtc-size": u,
        role: "navigation"
      }, [c ? n("ul", {
        class: "cubo-pagination__list"
      }, [s.map((d, f) => {
        if (d.type === "dots")
          return n("li", {
            key: f
          }, [n("span", {
            class: "cubo-pagination__dots"
          }, [d.label])]);
        const y = d.disabled || !!d.active, v = d.value ?? e.current, g = y ? {} : e.clickEvent === "mousedown" ? {
          onMousedown: () => b(v)
        } : {
          onClick: () => b(v)
        };
        return n("li", {
          key: f
        }, [n(ie, te({
          size: u,
          ghost: !d.active,
          color: d.active ? "primary" : "neutral",
          class: "cubo-pagination__item",
          disabled: d.disabled,
          "aria-current": d.active ? "page" : void 0,
          "aria-label": d.type === "arrow" ? d.direction === "prev" ? i("pagination.prevPage") : i("pagination.nextPage") : i("pagination.page", {
            label: d.label
          })
        }, g), {
          default: () => [d.label]
        })]);
      })]) : null, e.showPageSizeSelect ? n(je, {
        class: "cubo-pagination__size",
        size: u,
        searchable: !1,
        value: o,
        variants: e.pageSizeOptions.map((d) => ({
          label: String(d),
          value: d
        })),
        onChange: (d) => {
          d != null && t("change", {
            current: 1,
            pageSize: Number(d)
          });
        }
      }, null) : null]);
    };
  }
}), Ql = Lr;
function Fr(e) {
  const t = String(e);
  let a = 0;
  for (let l = 0; l < t.length; l++) a = (a * 31 + t.charCodeAt(l)) % 360;
  return a;
}
function Or(e) {
  const t = e.trim().split(/\s+/).filter(Boolean);
  return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
}
const Br = /* @__PURE__ */ N({
  name: "CuboAvatar",
  props: {
    user: {
      type: Object,
      default: void 0
    },
    size: {
      type: Number,
      default: 28
    },
    className: {
      type: String,
      default: void 0
    }
  },
  setup(e) {
    return () => {
      var u, i, o;
      const t = ((u = e.user) == null ? void 0 : u.name) ?? "", a = Fr(((i = e.user) == null ? void 0 : i.id) ?? t ?? 0), l = {
        "--cubo-avatar-size": `${e.size}px`,
        "--cubo-avatar-bg": `hsl(${a} 60% 88%)`,
        "--cubo-avatar-fg": `hsl(${a} 45% 32%)`
      };
      return n("span", {
        class: W("cubo-avatar", e.className),
        style: l,
        "aria-hidden": "true"
      }, [(o = e.user) != null && o.avatar ? n("img", {
        class: "cubo-avatar__img",
        src: e.user.avatar,
        alt: t
      }, null) : n("span", {
        class: "cubo-avatar__initials"
      }, [Or(t)])]);
    };
  }
}), it = Br, Pr = 6;
function Jl(e, t) {
  if (!e || !t || t.length === 0) return e;
  const a = Rl(e, t);
  return a.length === 1 && a[0].type === "text" ? e : a.map((l, u) => l.type === "mention" ? n("span", {
    key: u,
    class: "cubo-timeline__mention",
    "data-user": l.user.id
  }, [xe("@"), l.user.name]) : n("span", {
    key: u
  }, [l.value]));
}
function Rr(e, t) {
  let a = -1;
  for (let i = t - 1; i >= 0; i--) {
    const o = e[i];
    if (o === "@") {
      a = i;
      break;
    }
    if (/\s/.test(o)) return null;
  }
  if (a < 0) return null;
  const l = a === 0 ? "" : e[a - 1];
  if (l && /[\p{L}\p{N}]/u.test(l)) return null;
  const u = e.slice(a + 1, t);
  return u.includes("@") ? null : {
    start: a,
    query: u
  };
}
const Ha = /* @__PURE__ */ N({
  name: "CuboMentionTextarea",
  inheritAttrs: !1,
  props: {
    value: {
      type: String,
      default: ""
    },
    users: {
      type: Array,
      default: () => []
    },
    lang: {
      type: String,
      default: "en"
    },
    placeholder: {
      type: String,
      default: void 0
    },
    size: {
      type: String,
      default: "medium"
    },
    rows: {
      type: Number,
      default: 1
    },
    autosize: {
      type: Boolean,
      default: !0
    },
    htmlAttrs: {
      type: Object,
      default: void 0
    },
    onChange: {
      type: Function,
      default: void 0
    },
    onMention: {
      type: Function,
      default: void 0
    },
    onSubmit: {
      type: Function,
      default: void 0
    }
  },
  setup(e, {
    attrs: t
  }) {
    const a = E(null), l = E(null), u = E(0), i = () => {
      var f;
      return ((f = a.value) == null ? void 0 : f.querySelector("textarea")) ?? null;
    }, o = O(() => {
      const f = l.value;
      return f ? (f.query ? e.users.filter((v) => v.name.toLowerCase().includes(f.query.toLowerCase())) : e.users).slice(0, Pr) : [];
    }), r = (f, y, v) => {
      const g = Rr(f, y);
      l.value = g, g && v && (u.value = 0);
    }, c = (f) => {
      var v;
      (v = e.onChange) == null || v.call(e, f);
      const y = i();
      r(f, (y == null ? void 0 : y.selectionStart) ?? f.length, !0);
    }, s = (f) => {
      var m, C;
      const y = l.value;
      if (!y) return;
      const v = i(), g = v ? v.selectionStart : y.start + 1 + y.query.length, w = `@${f.name} `, p = e.value.slice(0, y.start), T = p + w + e.value.slice(g);
      (m = e.onChange) == null || m.call(e, T), (C = e.onMention) == null || C.call(e, f), l.value = null;
      const A = p.length + w.length;
      be(() => {
        const k = i();
        k && (k.focus(), k.setSelectionRange(A, A));
      });
    }, b = (f) => {
      if (e.onSubmit && f.key === "Enter" && (f.metaKey || f.ctrlKey)) {
        f.preventDefault(), l.value = null, e.onSubmit();
        return;
      }
      const y = o.value;
      !l.value || y.length === 0 || (f.key === "ArrowDown" ? (f.preventDefault(), u.value = (u.value + 1) % y.length) : f.key === "ArrowUp" ? (f.preventDefault(), u.value = (u.value - 1 + y.length) % y.length) : f.key === "Enter" || f.key === "Tab" ? (f.preventDefault(), s(y[Math.min(u.value, y.length - 1)])) : f.key === "Escape" && (f.preventDefault(), f.stopPropagation(), l.value = null));
    }, d = (f) => {
      const y = f.currentTarget;
      r(y.value, y.selectionStart ?? 0, f.type === "click");
    };
    return () => {
      const f = le(e.lang), y = o.value, v = Math.min(u.value, Math.max(0, y.length - 1));
      return n("div", {
        class: "cubo-mention",
        ref: a
      }, [n(Vl, {
        class: t.class,
        value: e.value,
        size: e.size,
        rows: e.rows,
        autosize: e.autosize,
        placeholder: e.placeholder,
        onChange: c,
        onKeydown: b,
        htmlAttrs: {
          ...e.htmlAttrs || {},
          onKeyup: d,
          onClick: d
        }
      }, null), l.value && y.length > 0 && n("div", {
        class: "cubo-mention__menu",
        role: "listbox",
        "aria-label": f("timeline.mentionMenu")
      }, [y.map((g, w) => n("button", {
        key: g.id,
        type: "button",
        role: "option",
        "aria-selected": w === v,
        class: "cubo-mention__option",
        "data-active": w === v || void 0,
        onMousedown: (p) => {
          p.preventDefault(), s(g);
        },
        onMouseenter: () => u.value = w
      }, [n(it, {
        user: g,
        size: 22
      }, null), n("span", {
        class: "cubo-mention__option-text"
      }, [n("span", {
        class: "cubo-mention__option-name"
      }, [g.name]), g.role && n("span", {
        class: "cubo-mention__option-role"
      }, [g.role])])]))])]);
    };
  }
});
function Nr(e) {
  const t = (e.type ?? "").toLowerCase();
  return t.includes("image") || t === "img" ? "photo" : t.includes("pdf") ? "file-type-pdf" : t.includes("zip") || t.includes("rar") || t.includes("compress") ? "file-zip" : t.includes("sheet") || t.includes("excel") || t.includes("csv") ? "file-spreadsheet" : t.includes("audio") ? "file-music" : t.includes("video") ? "video" : "file";
}
function qr(e, t) {
  if (e == null) return "";
  const a = e instanceof Date ? e : new Date(e);
  return new Intl.DateTimeFormat(t, {
    day: "numeric",
    month: "short"
  }).format(a);
}
function Xl(e, t) {
  return !e || e.length === 0 ? null : n("div", {
    class: "cubo-timeline__attachments"
  }, [e.map((a) => n("button", {
    key: a.id,
    type: "button",
    class: "cubo-timeline__attachment",
    onClick: () => t == null ? void 0 : t(a)
  }, [n(M, {
    class: "cubo-timeline__attachment-icon",
    icon: Nr(a),
    size: 16
  }, null), n("span", {
    class: "cubo-timeline__attachment-name"
  }, [a.name]), a.size != null && n("span", {
    class: "cubo-timeline__attachment-size"
  }, [Pl(a.size)])]))]);
}
function Mr(e, t) {
  return n("div", {
    class: "cubo-timeline__event cubo-timeline__event--system"
  }, [n("span", {
    class: "cubo-timeline__node"
  }, [n(M, {
    icon: e.icon ?? "info-circle",
    size: 14
  }, null)]), n("span", {
    class: "cubo-timeline__system-text"
  }, [e.text]), n("span", {
    class: "cubo-timeline__time"
  }, [Ct(e.createdAt, t)])]);
}
function Kr(e, t) {
  return n("div", {
    class: "cubo-timeline__event cubo-timeline__event--change"
  }, [n("span", {
    class: "cubo-timeline__node"
  }, [n(M, {
    icon: "pencil",
    size: 14
  }, null)]), n("span", {
    class: "cubo-timeline__change-field"
  }, [e.field, xe(":")]), e.from != null && e.from !== "" && n("span", {
    class: "cubo-timeline__change-from"
  }, [String(e.from)]), n(M, {
    class: "cubo-timeline__change-arrow",
    icon: "arrow-right",
    size: 14
  }, null), n("span", {
    class: "cubo-timeline__change-to"
  }, [String(e.to)]), n("span", {
    class: "cubo-timeline__time"
  }, [Ct(e.createdAt, t)])]);
}
function $r(e, t, a, l, u, i = []) {
  const o = le(a), r = !!e.done, c = e.resultOptions, s = c == null ? void 0 : c.find((b) => b.value === e.result);
  return n("div", {
    class: W("cubo-timeline__event", "cubo-timeline__event--task"),
    "data-done": r || void 0
  }, [n("div", {
    class: "cubo-timeline__task-head"
  }, [n(M, {
    class: "cubo-timeline__task-icon",
    icon: r ? "circle-check" : "circle",
    size: 18
  }, null), n("span", {
    class: "cubo-timeline__task-title"
  }, [e.title]), n("span", {
    class: "cubo-timeline__time"
  }, [Ct(e.createdAt, t)])]), e.description && n("p", {
    class: "cubo-timeline__task-desc"
  }, [Jl(e.description, i)]), Xl(e.attachments, u), n("div", {
    class: "cubo-timeline__task-foot"
  }, [e.assignee && !r && n("span", {
    class: "cubo-timeline__assignee"
  }, [n(it, {
    user: e.assignee,
    size: 20
  }, null), n("span", {
    class: "cubo-timeline__assignee-name"
  }, [e.assignee.name])]), e.dueAt != null && !r && n("span", {
    class: "cubo-timeline__task-due"
  }, [n(M, {
    icon: "calendar",
    size: 14
  }, null), qr(e.dueAt, t)]), n("span", {
    class: "cubo-timeline__task-action"
  }, [r ? n("span", {
    class: "cubo-timeline__task-completed"
  }, [n(M, {
    class: "cubo-timeline__task-completed-icon",
    icon: "circle-check",
    size: 14
  }, null), n("span", {
    class: "cubo-timeline__task-completed-by"
  }, [e.completedBy ? o("timeline.completedBy", {
    name: e.completedBy.name
  }) : o("timeline.completed"), e.completedAt != null ? ` · ${Ct(e.completedAt, t)}` : ""]), e.result != null && n(Ge, {
    class: "cubo-timeline__task-result",
    size: "small",
    color: (s == null ? void 0 : s.color) ?? "success"
  }, {
    default: () => [(s == null ? void 0 : s.label) ?? e.result]
  }), n("button", {
    type: "button",
    class: "cubo-timeline__task-reopen",
    onClick: () => l == null ? void 0 : l(e, !1)
  }, [n(M, {
    icon: "refresh",
    size: 13
  }, null), o("timeline.reopen")])]) : c && c.length > 0 ? n("span", {
    class: "cubo-timeline__task-results"
  }, [c.map((b) => n(ie, {
    key: b.value,
    size: "small",
    ghost: !0,
    color: b.color ?? "success",
    onClick: () => l == null ? void 0 : l(e, !0, b.value)
  }, {
    default: () => [b.label]
  }))]) : n(ie, {
    size: "small",
    ghost: !0,
    color: "success",
    onClick: () => l == null ? void 0 : l(e, !0)
  }, {
    default: () => [n(M, {
      icon: "check",
      size: 14
    }, null), o("timeline.complete")]
  })])])]);
}
function jr(e, t, a, l, u = []) {
  const i = le(a), o = e.author;
  return n("div", {
    class: "cubo-timeline__event cubo-timeline__event--message"
  }, [n(it, {
    user: o,
    size: 28
  }, null), n("div", {
    class: "cubo-timeline__msg-body"
  }, [n("div", {
    class: "cubo-timeline__msg-head"
  }, [n("span", {
    class: "cubo-timeline__msg-author"
  }, [(o == null ? void 0 : o.name) ?? i("timeline.unknownAuthor")]), n("span", {
    class: "cubo-timeline__time"
  }, [Ct(e.createdAt, t)])]), e.text && n("div", {
    class: "cubo-timeline__msg-text"
  }, [Jl(e.text, u)]), Xl(e.attachments, l)])]);
}
function Vr(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ce(e);
}
const Ur = /* @__PURE__ */ N({
  name: "CuboPopup",
  // The consumer's `class` should style the popover panel (the visible
  // surface), not the inline `.cubo-popup` trigger wrapper — so we route
  // fallthrough attrs ourselves instead of letting Vue auto-apply them to root.
  inheritAttrs: !1,
  props: {
    visible: {
      type: Boolean,
      default: !1
    },
    content: {
      type: [String, Object, Function],
      default: void 0
    },
    text: {
      type: [String, Object, Function],
      default: void 0
    },
    position: {
      type: String,
      default: "bottom"
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    teleportSelector: {
      type: String,
      default: void 0
    }
  },
  emits: {
    setVisible: (e) => !0
  },
  setup(e, {
    emit: t,
    slots: a,
    attrs: l
  }) {
    const u = E(null), i = E(null), o = () => t("setVisible", !1), r = (b) => {
      var f, y;
      const d = b.target;
      (f = u.value) != null && f.contains(d) || (y = d == null ? void 0 : d.closest) != null && y.call(d, ".cubo-popup__pop") || o();
    }, c = (b) => {
      e.visible && b.key === "Escape" && o();
    }, s = () => {
      if (!e.teleportSelector || !u.value) return;
      const b = u.value.getBoundingClientRect(), d = rt({
        top: b.top,
        left: b.left,
        width: b.width,
        height: b.height
      }, e.position);
      i.value = {
        top: d.top,
        left: d.left,
        transform: d.transform
      };
    };
    return Q(() => e.visible, async (b) => {
      b ? (document.addEventListener("mousedown", r), document.addEventListener("keydown", c), window.addEventListener("scroll", s, !0), window.addEventListener("resize", s), await be(), s()) : (document.removeEventListener("mousedown", r), document.removeEventListener("keydown", c), window.removeEventListener("scroll", s, !0), window.removeEventListener("resize", s));
    }), Se(() => {
      document.removeEventListener("mousedown", r), document.removeEventListener("keydown", c), window.removeEventListener("scroll", s, !0), window.removeEventListener("resize", s);
    }), () => {
      var g;
      let b;
      const {
        class: d,
        onClick: f,
        ...y
      } = l, v = () => {
        var w;
        return n("div", {
          class: [W("cubo-popup__pop", e.teleportSelector && "cubo-popup__pop--fixed"), d],
          "data-position": e.teleportSelector ? void 0 : e.position,
          style: e.teleportSelector ? i.value ?? void 0 : void 0,
          role: "dialog",
          onClick: (p) => p.stopPropagation()
        }, [ne(e.content) ?? ((w = a.content) == null ? void 0 : w.call(a)) ?? ne(e.text)]);
      };
      return n("div", te(y, {
        ref: u,
        class: W("cubo-popup"),
        onClick: (w) => {
          f == null || f(w), e.disabled || t("setVisible", !e.visible);
        }
      }), [(g = a.default) == null ? void 0 : g.call(a), e.visible ? e.teleportSelector ? n(De, {
        to: Ee(e.teleportSelector)
      }, Vr(b = v()) ? b : {
        default: () => [b]
      }) : v() : null]);
    };
  }
}), Jn = Ur;
function Ga(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ce(e);
}
const Dn = je, Hr = Mt, Za = (e) => e.charAt(0).toUpperCase() + e.slice(1), Wa = (e) => e == null || e === "" || Array.isArray(e) && e.length === 0, Ya = (e, t) => typeof e.options == "function" ? e.options(t) : e.options ?? [];
function Qa(e, t) {
  const a = /* @__PURE__ */ new Set();
  for (const l of e)
    if (l)
      for (const u of Rl(l, t)) u.type === "mention" && a.add(u.user.id);
  return a.size ? [...a] : void 0;
}
function En(e, t) {
  const a = /* @__PURE__ */ new Set(), l = [];
  t != null && (l.push(t), a.add(t));
  for (const u of e) a.has(u) || (a.add(u), l.push(u));
  return l;
}
const Gr = /* @__PURE__ */ N({
  name: "CuboTimelineComposer",
  props: {
    users: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: "medium"
    },
    lang: {
      type: String,
      default: "en"
    },
    eventTypes: {
      type: Array,
      default: () => []
    },
    followers: {
      type: Array,
      default: void 0
    },
    ownerId: {
      type: [String, Number],
      default: void 0
    },
    onFollowersChange: {
      type: Function,
      default: void 0
    },
    onCreateEvent: {
      type: Function,
      default: void 0
    }
  },
  setup(e) {
    const t = E(""), a = E([]), l = E(null), u = E(null), i = E({}), o = E(!1), r = `cubo-tl-create-${ot()}`, c = () => En(e.followers ?? [], e.ownerId), s = (m) => {
      if (e.followers === void 0 || !e.onFollowersChange || !m || m.length === 0) return;
      const C = c();
      m.some((k) => !C.includes(k)) && e.onFollowersChange(En([...C, ...m], e.ownerId));
    }, b = (m) => {
      u.value = m, i.value = {};
    }, d = () => {
      u.value = null;
    }, f = (m, C) => {
      var z;
      const k = {
        ...i.value,
        [m]: C
      };
      for (const x of ((z = u.value) == null ? void 0 : z.fields) ?? []) x.dependsOn === m && delete k[x.key];
      i.value = k;
    }, y = () => {
      var z;
      const m = u.value;
      if (!m) return;
      const C = m.fields ?? [];
      if (C.some((x) => x.required && Wa(i.value[x.key]))) return;
      const k = Qa(C.filter((x) => x.type === "textarea").map((x) => i.value[x.key]), e.users);
      (z = e.onCreateEvent) == null || z.call(e, {
        type: m.type,
        values: i.value,
        mentions: k
      }), s(k), u.value = null;
    }, v = (m) => {
      m && (a.value = [...a.value, ...Array.from(m)]);
    }, g = (m) => {
      a.value = a.value.filter((C, k) => k !== m);
    }, w = () => {
      var k;
      const m = t.value.trim();
      if (!m) return;
      const C = Qa([m], e.users);
      (k = e.onCreateEvent) == null || k.call(e, {
        type: "message",
        text: m,
        mentions: C,
        attachments: a.value.length ? a.value : void 0
      }), s(C), t.value = "", a.value = [], l.value && (l.value.value = "");
    }, p = (m, C, k) => {
      const z = le(e.lang), x = (B) => f(m.key, B), R = m.required || void 0, U = {
        "aria-labelledby": k,
        "aria-required": R
      };
      switch (m.type) {
        case "textarea":
          return n(Ha, {
            value: C ?? "",
            users: e.users,
            lang: e.lang,
            onChange: x,
            autosize: !0,
            rows: 2,
            placeholder: m.placeholder,
            htmlAttrs: U
          }, null);
        case "number":
          return n(pe, {
            htmlType: "number",
            value: C ?? null,
            onChange: x,
            placeholder: m.placeholder,
            htmlAttrs: U
          }, null);
        case "date":
          return n(Hr, {
            value: C != null ? new Date(C) : void 0,
            onChange: (B) => x(B ? B.getTime() : void 0),
            ariaLabelledby: k,
            ariaRequired: R
          }, null);
        case "select":
          return n(Dn, {
            value: C,
            variants: Ya(m, i.value),
            clearable: !0,
            searchable: !0,
            placeholder: m.placeholder,
            ariaLabelledby: k,
            ariaRequired: R,
            onChange: x
          }, null);
        case "multiselect":
          return n(Dn, {
            multiple: !0,
            value: C ?? [],
            variants: Ya(m, i.value),
            searchable: !0,
            placeholder: m.placeholder,
            ariaLabelledby: k,
            ariaRequired: R,
            onChange: x
          }, null);
        case "user":
          return n(Dn, {
            value: C,
            variants: e.users.map((B) => ({
              label: B.name,
              value: B.id
            })),
            clearable: !0,
            searchable: !0,
            placeholder: m.placeholder ?? z("timeline.chooseUser"),
            ariaLabelledby: k,
            ariaRequired: R,
            onChange: x
          }, null);
        default:
          return n(pe, {
            value: C ?? "",
            onChange: x,
            placeholder: m.placeholder,
            htmlAttrs: U
          }, null);
      }
    }, T = 5, A = () => {
      if (e.followers === void 0) return null;
      const m = le(e.lang), C = c(), k = e.ownerId, z = (_) => e.users.find((D) => D.id === _) ?? {
        id: _,
        name: String(_)
      }, x = C.map(z), R = x.slice(0, T), U = x.length - R.length, B = k != null ? [...e.users.filter((_) => _.id === k), ...e.users.filter((_) => _.id !== k)] : e.users, h = (_) => {
        var D;
        _ !== k && ((D = e.onFollowersChange) == null || D.call(e, En(C.includes(_) ? C.filter((F) => F !== _) : [...C, _], k)));
      };
      return n("div", {
        class: "cubo-timeline__followers"
      }, [n(Jn, {
        class: "cubo-timeline__followers-pop",
        position: "top_left",
        visible: o.value,
        onSetVisible: (_) => o.value = _,
        content: () => n("div", {
          class: "cubo-timeline__followers-menu",
          role: "listbox",
          "aria-multiselectable": "true",
          "aria-label": m("timeline.followers")
        }, [B.map((_) => {
          const D = C.includes(_.id), F = k != null && _.id === k;
          return n("button", {
            key: _.id,
            type: "button",
            role: "option",
            "aria-selected": D,
            "aria-disabled": F || void 0,
            disabled: F,
            class: "cubo-timeline__follower-option",
            "data-checked": D || void 0,
            onClick: () => h(_.id)
          }, [n("span", {
            class: "cubo-timeline__follower-check",
            "aria-hidden": "true"
          }, [D ? n(M, {
            icon: "check",
            size: 13
          }, null) : null]), n(it, {
            user: _,
            size: 24
          }, null), n("span", {
            class: "cubo-mention__option-text"
          }, [n("span", {
            class: "cubo-mention__option-name"
          }, [_.name]), _.role && n("span", {
            class: "cubo-mention__option-role"
          }, [_.role])]), F ? n("span", {
            class: "cubo-timeline__follower-owner"
          }, [m("timeline.owner")]) : null]);
        })])
      }, {
        default: () => [n("button", {
          type: "button",
          class: "cubo-timeline__followers-stack",
          "aria-label": m("timeline.manageFollowers"),
          "aria-haspopup": "listbox"
        }, [R.map((_) => n(it, {
          key: _.id,
          class: "cubo-timeline__followers-avatar",
          user: _,
          size: 24
        }, null)), U > 0 ? n("span", {
          class: "cubo-timeline__followers-avatar cubo-timeline__followers-more"
        }, [xe("+"), U]) : null, n("span", {
          class: "cubo-timeline__followers-avatar cubo-timeline__followers-add"
        }, [n(M, {
          icon: "plus",
          size: 14
        }, null)])])]
      })]);
    };
    return () => {
      const m = le(e.lang), C = e.eventTypes.filter((x) => x.fields && x.fields.length > 0), k = u.value, z = k ? (k.fields ?? []).some((x) => x.required && Wa(i.value[x.key])) : !1;
      return n("div", {
        class: "cubo-timeline__composer"
      }, [C.length > 0 && n("div", {
        class: "cubo-timeline__composer-add"
      }, [C.map((x) => n(ie, {
        key: x.type,
        class: "cubo-timeline__composer-add-btn",
        size: "small",
        ghost: !0,
        color: "neutral",
        onClick: () => b(x)
      }, {
        default: () => [n(M, {
          icon: x.icon ?? "plus",
          size: 15
        }, null), n("span", null, [x.button ?? Za(x.type)])]
      }))]), n("div", {
        class: "cubo-timeline__composer-box"
      }, [a.value.length > 0 && n("div", {
        class: "cubo-timeline__composer-files"
      }, [a.value.map((x, R) => n("span", {
        key: R,
        class: "cubo-timeline__composer-file"
      }, [n(M, {
        icon: "paperclip",
        size: 14
      }, null), n("span", {
        class: "cubo-timeline__composer-file-name"
      }, [x.name]), n("span", {
        class: "cubo-timeline__composer-file-size"
      }, [Pl(x.size)]), n("button", {
        type: "button",
        class: "cubo-timeline__composer-file-remove",
        "aria-label": m("timeline.removeAttachment"),
        onClick: () => g(R)
      }, [n(M, {
        icon: "x",
        size: 12
      }, null)])]))]), n(Ha, {
        class: "cubo-timeline__composer-input",
        value: t.value,
        users: e.users,
        lang: e.lang,
        onChange: (x) => t.value = x,
        onSubmit: w,
        autosize: !0,
        rows: 1,
        size: e.size,
        placeholder: m("timeline.composerPlaceholder")
      }, null), n("div", {
        class: "cubo-timeline__composer-tools"
      }, [A(), n("input", {
        ref: l,
        type: "file",
        multiple: !0,
        class: "cubo-timeline__composer-file-input",
        onChange: (x) => v(x.target.files)
      }, null), n(ie, {
        class: "cubo-timeline__composer-attach",
        size: "small",
        ghost: !0,
        color: "neutral",
        "aria-label": m("timeline.attach"),
        onClick: () => {
          var x;
          return (x = l.value) == null ? void 0 : x.click();
        }
      }, {
        default: () => [n(M, {
          icon: "paperclip",
          size: 16
        }, null)]
      }), n(ie, {
        class: "cubo-timeline__composer-send",
        size: "small",
        disabled: !t.value.trim(),
        onClick: w
      }, {
        default: () => [n(M, {
          icon: "send",
          size: 16
        }, null), m("timeline.send")]
      })])]), k && n(Kt, {
        visible: !0,
        language: e.lang,
        header: m("timeline.createTitle", {
          label: k.button ?? Za(k.type)
        }),
        content: () => {
          let x, R;
          return n("div", {
            class: "cubo-timeline__create-form"
          }, [(k.fields ?? []).map((U) => {
            const B = `${r}-${U.key}`;
            return n("div", {
              key: U.key,
              class: "cubo-timeline__create-field"
            }, [n("span", {
              class: "cubo-timeline__create-label",
              id: B
            }, [U.label, U.required ? n(se, null, [n("span", {
              class: "cubo-timeline__create-req",
              "aria-hidden": "true"
            }, [" ", xe("*")]), n("span", {
              class: "cubo-visually-hidden"
            }, [m("timeline.requiredHint")])]) : null]), p(U, i.value[U.key], B)]);
          }), n("div", {
            class: "cubo-timeline__create-actions"
          }, [n(ie, {
            size: "small",
            disabled: z,
            onClick: y
          }, Ga(x = m("timeline.create")) ? x : {
            default: () => [x]
          }), n(ie, {
            size: "small",
            ghost: !0,
            color: "neutral",
            onClick: d
          }, Ga(R = m("timeline.cancel")) ? R : {
            default: () => [R]
          })])]);
        },
        onSetVisible: (x) => {
          x || d();
        }
      }, null)]);
    };
  }
}), Zr = /* @__PURE__ */ N({
  name: "CuboTimeline",
  props: {
    events: {
      type: Array,
      required: !0
    },
    users: {
      type: Array,
      default: () => []
    },
    followers: {
      type: Array,
      default: void 0
    },
    ownerId: {
      type: [String, Number],
      default: void 0
    },
    eventTypes: {
      type: Array,
      default: () => []
    },
    currentUser: {
      type: Object,
      default: void 0
    },
    groupByDay: {
      type: Boolean,
      default: !0
    },
    loading: {
      type: Boolean,
      default: !1
    },
    hasMore: {
      type: Boolean,
      default: !1
    },
    composer: {
      type: Boolean,
      default: !0
    },
    renderEvent: {
      type: Function,
      default: void 0
    },
    // Declared as a Function PROP (not just an emit) so the row can gate its
    // clickability on it: a listener whose name matches a declared `emit` is
    // stripped from `attrs`, so reading it from `attrs` always saw undefined.
    onEventClick: {
      type: Function,
      default: void 0
    },
    language: {
      type: String,
      default: void 0
    },
    emptyText: {
      type: String,
      default: void 0
    },
    size: {
      type: String,
      default: "medium"
    },
    locale: {
      type: String,
      default: void 0
    }
  },
  emits: {
    loadMore: () => !0,
    createEvent: (e) => !0,
    taskComplete: (e, t, a) => !0,
    attachmentClick: (e) => !0,
    followersChange: (e) => !0
  },
  setup(e, {
    emit: t,
    slots: a
  }) {
    const l = _e(() => e.language), u = E(null), i = E(null);
    let o = !1, r = null;
    Q(() => e.events.length, (f) => {
      const y = u.value;
      y && !o && f > 0 && (y.scrollTop = y.scrollHeight, o = !0);
    }, {
      immediate: !0,
      flush: "post"
    });
    const c = () => {
      r == null || r.disconnect(), r = null;
    }, s = () => {
      c();
      const f = i.value, y = u.value;
      !f || !y || !e.hasMore || e.loading || (r = new IntersectionObserver((v) => {
        v.some((g) => g.isIntersecting) && t("loadMore");
      }, {
        root: y,
        rootMargin: "120px 0px 0px 0px",
        threshold: 0
      }), r.observe(f));
    };
    Q(() => [e.hasMore, e.loading], s, {
      flush: "post"
    }), ye(s), Se(c);
    const b = (f) => t("attachmentClick", f), d = (f, y) => {
      var g;
      if (a.event) {
        const w = a.event({
          event: f
        });
        if (w != null) return w;
      }
      if (e.renderEvent) {
        const w = ne(e.renderEvent(f));
        if (w != null) return w;
      }
      const v = (g = e.eventTypes.find((w) => w.type === f.type)) == null ? void 0 : g.render;
      if (v) return v(f);
      switch (f.type) {
        case "system":
          return Mr(f, e.locale);
        case "field-change":
          return Kr(f, e.locale);
        case "task":
          return $r(f, e.locale, y, (w, p, T) => t("taskComplete", w, p, T), b, e.users);
        case "message":
          return jr(f, e.locale, y, b, e.users);
        default:
          return null;
      }
    };
    return () => {
      const f = l.value, y = le(f), v = e.groupByDay ? Bl(e.events, {
        locale: e.locale,
        ascending: !0
      }) : [{
        key: 0,
        label: "",
        events: e.events
      }], g = e.events.length === 0, w = !!e.onEventClick;
      return n("div", {
        class: W("cubo-timeline"),
        "data-size": e.size
      }, [n("div", {
        class: "cubo-timeline__scroll",
        ref: u
      }, [e.hasMore && n("div", {
        class: "cubo-timeline__sentinel",
        ref: i,
        "aria-hidden": "true"
      }, null), e.loading && n("div", {
        class: "cubo-timeline__loading"
      }, [n(Ae, {
        size: 20
      }, null)]), g ? n(mn, {
        class: "cubo-timeline__empty",
        icon: "message-circle",
        description: e.emptyText ?? y("timeline.empty")
      }, null) : v.map((p) => n("div", {
        class: "cubo-timeline__group",
        key: p.key
      }, [e.groupByDay && p.label && n("div", {
        class: "cubo-timeline__day-sep"
      }, [n("span", {
        class: "cubo-timeline__day-pill"
      }, [p.label])]), p.events.map((T) => n("div", {
        class: "cubo-timeline__row",
        key: T.id,
        "data-clickable": w || void 0,
        onClick: w ? () => {
          var A;
          return (A = e.onEventClick) == null ? void 0 : A.call(e, T);
        } : void 0
      }, [d(T, f)]))]))]), e.composer && n(Gr, {
        users: e.users,
        size: e.size,
        lang: f,
        eventTypes: e.eventTypes,
        followers: e.followers,
        ownerId: e.ownerId,
        onFollowersChange: (p) => t("followersChange", p),
        onCreateEvent: (p) => t("createEvent", p)
      }, null)]);
    };
  }
}), Wr = Zr;
function Yr(e, t) {
  const a = e.filter((l) => l.column !== !1);
  return t && t.length ? t.map((l) => a.find((u) => u.key === l)).filter((l) => !!l) : a;
}
function Qr(e, t) {
  return t ? e.find((a) => a.key === t) : e.find((a) => a.type === "text") ?? e[0];
}
function Jr(e, t, a) {
  return a && a.length ? a.map((l) => e.find((u) => u.key === l)).filter((l) => !!l) : e.filter((l) => l.key !== t).slice(0, 4);
}
function Xr(e, t) {
  return t ? e.find((a) => a.key === t) : e.find((a) => {
    var l;
    return a.type === "select" && (((l = a.options) == null ? void 0 : l.length) ?? 0) > 0;
  });
}
function Ja(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ce(e);
}
const Xa = {
  small: "small",
  medium: "small",
  large: "medium"
}, en = () => n("span", {
  class: "cubo-data__muted"
}, [xe("—")]);
function eu(e, t, a, l = !0, u, i) {
  if (e.format)
    return ne(e.format({
      value: t[e.key],
      row: t,
      change: (o) => u == null ? void 0 : u(t, o),
      showDetail: () => i == null ? void 0 : i(t)
    })) ?? (l ? en() : null);
  if (e.type === "select") {
    const o = et(e, t);
    return o ? n(Ge, {
      size: Xa[a],
      color: on(e, t[e.key]),
      ghost: !0
    }, Ja(o) ? o : {
      default: () => [o]
    }) : l ? en() : null;
  }
  if (e.type === "multiselect") {
    const o = t[e.key], r = Array.isArray(o) ? o : o == null || o === "" ? [] : [o];
    return r.length ? n("span", {
      class: "cubo-data__badges"
    }, [r.map((c, s) => {
      let b;
      return n(Ge, {
        key: s,
        size: Xa[a],
        color: on(e, c),
        ghost: !0
      }, Ja(b = et({
        ...e,
        type: "select"
      }, {
        [e.key]: c
      })) ? b : {
        default: () => [b]
      });
    })]) : l ? en() : null;
  }
  return et(e, t) || en();
}
function tu(e) {
  const {
    row: t,
    fields: a,
    titleField: l,
    bodyFields: u,
    size: i,
    groupKey: o,
    canMove: r,
    renderCard: c,
    onOpen: s,
    onRowChange: b,
    onDragStart: d,
    onDragEnd: f
  } = e, y = () => s(t), v = c ? c({
    row: t,
    fields: a,
    open: y
  }) : n(se, null, [l ? n("div", {
    class: "cubo-data__card-title"
  }, [et(l, t) || "—"]) : null, u.length > 0 ? n("div", {
    class: "cubo-data__card-fields"
  }, [u.map((g) => n("div", {
    key: g.key,
    class: "cubo-data__card-field"
  }, [n("span", {
    class: "cubo-data__card-label"
  }, [g.label]), n("span", {
    class: "cubo-data__card-value"
  }, [eu(g, t, i, !1, b, s)])]))]) : null]);
  return n("div", {
    class: "cubo-data__card",
    role: "button",
    tabindex: 0,
    draggable: r,
    onClick: y,
    onKeydown: (g) => {
      (g.key === "Enter" || g.key === " ") && (g.preventDefault(), y());
    },
    onDragstart: (g) => d(t, o, g),
    onDragend: f
  }, [v]);
}
function ec(e) {
  const {
    rows: t,
    fields: a,
    query: l,
    size: u,
    rowKey: i,
    titleField: o,
    bodyFields: r,
    expanded: c,
    groupOrder: s,
    dragOverKey: b,
    canMove: d,
    renderCard: f,
    onToggleGroup: y,
    onOpen: v,
    onRowChange: g,
    onDragStart: w,
    onDragEnd: p,
    onDragOverGroup: T,
    onDropGroup: A
  } = e, m = d && l.group != null, C = (k, z) => tu({
    row: k,
    fields: a,
    titleField: o,
    bodyFields: r,
    size: u,
    groupKey: z,
    canMove: m,
    renderCard: f,
    onOpen: v,
    onRowChange: g,
    onDragStart: w,
    onDragEnd: p
  });
  if (l.group) {
    const k = Zn(Fl(t, l.group, a), s);
    return n("div", {
      class: "cubo-data__cards",
      "data-grouped": !0
    }, [k.map((z) => {
      const x = !c.has(z.key);
      return n("div", {
        key: z.key,
        class: "cubo-data__card-group",
        "data-drop-active": m && b === z.key || void 0,
        onDragover: m ? (R) => {
          R.preventDefault(), T(z.key);
        } : void 0,
        onDragleave: m ? () => T(null) : void 0,
        onDrop: m ? (R) => {
          R.preventDefault(), A(z.key, z.value);
        } : void 0
      }, [n("div", {
        class: "cubo-data__group-head",
        role: "button",
        tabindex: 0,
        "aria-expanded": !x,
        "data-collapsed": x || void 0,
        onClick: () => y(z.key),
        onKeydown: (R) => {
          (R.key === "Enter" || R.key === " ") && (R.preventDefault(), y(z.key));
        }
      }, [n(M, {
        icon: x ? "chevron-right" : "chevron-down",
        size: 16
      }, null), z.color ? n("span", {
        class: "cubo-data__dot",
        style: {
          backgroundColor: z.color
        }
      }, null) : null, n("span", {
        class: "cubo-data__group-label"
      }, [z.label || "Ungrouped"]), n(Ge, {
        size: "small",
        ghost: !0,
        color: "neutral"
      }, {
        default: () => [z.rows.length]
      })]), x ? null : n("div", {
        class: "cubo-data__card-grid"
      }, [z.rows.map((R) => n(se, {
        key: Le(R, i)
      }, [C(R, z.key)]))])]);
    })]);
  }
  return n("div", {
    class: "cubo-data__cards"
  }, [n("div", {
    class: "cubo-data__card-grid"
  }, [t.map((k) => n(se, {
    key: Le(k, i)
  }, [C(k, "__all__")]))])]);
}
const tc = (e) => Array.from(e.querySelectorAll(":scope > .cubo-sortable__item")).map((t) => t.getBoundingClientRect()), nc = /* @__PURE__ */ N({
  name: "CuboSortable",
  props: {
    rows: {
      type: Array,
      required: !0
    },
    horizontal: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    handler: {
      type: String,
      default: void 0
    },
    handle: {
      type: String,
      default: void 0
    },
    group: {
      type: String,
      default: void 0
    },
    name: {
      type: String,
      default: void 0
    },
    renderItem: {
      type: Function,
      default: void 0
    },
    placeholder: {
      type: null,
      default: void 0
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    change: (e) => !0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    add: (e) => !0
  },
  setup(e, {
    emit: t,
    slots: a
  }) {
    const l = {}, u = E(null), i = E(null), o = E(!1), r = E(null), c = () => {
      u.value = null, i.value = null, o.value = !1, r.value = null;
    }, s = () => {
      if (!e.group || u.value !== null) return null;
      const b = Ki();
      return b && b.group === e.group && b.fromKey !== l ? b : null;
    };
    return () => {
      var d;
      const b = i.value !== null && (o.value || u.value !== null && i.value !== u.value && i.value !== u.value + 1);
      return n("div", {
        class: W("cubo-sortable", e.horizontal && "cubo-sortable--horizontal"),
        onDragover: (f) => {
          if (e.disabled) return;
          const y = s();
          u.value === null && !y || (f.preventDefault(), i.value = $i(tc(f.currentTarget), {
            x: f.clientX,
            y: f.clientY
          }, e.horizontal), o.value = y !== null);
        },
        onDragleave: (f) => {
          f.currentTarget.contains(f.relatedTarget) || (i.value = null, o.value = !1);
        },
        onDrop: (f) => {
          if (e.disabled || i.value === null) return;
          if (u.value !== null) {
            f.preventDefault();
            const v = ji(e.rows, u.value, i.value), g = v.some((w, p) => w !== e.rows[p]);
            c(), g && t("change", v);
            return;
          }
          const y = s();
          if (y) {
            f.preventDefault();
            const v = {
              row: y.row,
              from: {
                name: y.fromName,
                rows: y.fromRows,
                index: y.fromIndex
              },
              to: {
                name: e.name,
                rows: e.rows,
                index: i.value
              }
            };
            Pa(), c(), t("add", v);
          }
        }
      }, [e.rows.map((f, y) => {
        var w;
        const v = u.value === y, g = e.handler ?? e.handle;
        return n("div", {
          key: f.id,
          class: W("cubo-sortable__item", v && "cubo-sortable__item--ghost", b && i.value === y && "cubo-sortable__item--over-before", b && i.value === e.rows.length && y === e.rows.length - 1 && "cubo-sortable__item--over-after"),
          draggable: !e.disabled && (!g || r.value === f.id),
          onMousedown: (p) => {
            e.disabled || !g || (r.value = p.target.closest(g) ? f.id : null);
          },
          onDragstart: (p) => {
            if (e.disabled || g && r.value !== f.id) {
              p.preventDefault();
              return;
            }
            if (u.value = y, e.group && Mi({
              group: e.group,
              fromKey: l,
              fromName: e.name,
              fromRows: e.rows,
              fromIndex: y,
              row: f
            }), p.dataTransfer) {
              p.dataTransfer.effectAllowed = "move";
              try {
                p.dataTransfer.setData("text/plain", String(f.id));
              } catch {
              }
            }
          },
          onDragend: () => {
            Pa(), c();
          }
        }, [e.renderItem ? e.renderItem(f, y) : (w = a.default) == null ? void 0 : w.call(a, {
          row: f,
          index: y
        })]);
      }), e.group && e.rows.length === 0 && // An empty grouped list still needs a droppable area to receive a row.
      n("div", {
        class: W("cubo-sortable__placeholder", o.value && i.value !== null && "cubo-sortable__placeholder--over")
      }, [e.placeholder ?? ((d = a.placeholder) == null ? void 0 : d.call(a))])]);
    };
  }
}), Xn = nc, ac = Xn, nu = /* @__PURE__ */ N({
  name: "CuboDataColumnsConfig",
  props: {
    allColumns: {
      type: Array,
      required: !0
    },
    columns: {
      type: Array,
      default: void 0
    },
    size: {
      type: String,
      required: !0
    },
    onToggleColumn: {
      type: Function,
      required: !0
    },
    onReorderColumns: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    return () => {
      const {
        allColumns: t,
        columns: a,
        size: l
      } = e, u = t.map((d) => d.key), i = new Map(t.map((d) => [d.key, d])), o = _t(u, a), r = new Set(o), s = [...o, ...u.filter((d) => !r.has(d))].map((d) => i.get(d)).filter((d) => !!d).map((d) => ({
        id: d.key,
        field: d
      })), b = (d) => n("div", {
        class: "cubo-data__col-row",
        "data-hidden": !r.has(d.id) || void 0
      }, [n("span", {
        class: "cubo-data__col-handle",
        "aria-hidden": "true"
      }, [n(M, {
        icon: "grip-vertical",
        size: 15
      }, null)]), n(cn, {
        size: l,
        class: "cubo-data__col-check",
        value: r.has(d.id),
        onChange: () => e.onToggleColumn(d.id)
      }, {
        default: () => [d.field.label]
      })]);
      return n(ac, {
        class: "cubo-data__columns-config",
        rows: s,
        handler: ".cubo-data__col-handle",
        renderItem: (d) => b(d),
        onChange: (d) => e.onReorderColumns(d.map((f) => String(f.id)))
      }, null);
    };
  }
}), lc = yn, uc = /* @__PURE__ */ N({
  name: "CuboDataFastFilters",
  props: {
    query: {
      type: Object,
      required: !0
    },
    fields: {
      type: Array,
      required: !0
    },
    size: {
      type: String,
      required: !0
    },
    /** Resolved built-in-string language (threaded from `<CuboData>`). */
    lang: {
      type: String,
      required: !0
    }
  },
  emits: {
    patch: (e) => !0
  },
  setup(e, {
    emit: t
  }) {
    const a = (i) => e.query.filters.find((o) => o.field === i), l = (i, o) => {
      const r = e.query.filters.findIndex((s) => s.field === i), c = e.query.filters.slice();
      o == null ? r >= 0 && c.splice(r, 1) : r >= 0 ? c[r] = o : c.push(o), t("patch", {
        filters: c
      });
    }, u = (i) => {
      const o = ht(i), r = a(o), c = le(e.lang);
      switch (i.type) {
        case "number": {
          const s = (b, d) => {
            const f = (y) => y == null || y === "";
            if (f(b) && f(d)) return l(o, null);
            l(o, {
              field: o,
              op: "between",
              value: b,
              value2: d
            });
          };
          return n("div", {
            class: "cubo-data__fast-range"
          }, [n(pe, {
            htmlType: "number",
            size: e.size,
            value: (r == null ? void 0 : r.value) ?? null,
            placeholder: c("data.fast.min"),
            onChange: (b) => s(b, r == null ? void 0 : r.value2)
          }, null), n("span", {
            class: "cubo-data__fast-sep"
          }, [xe("–")]), n(pe, {
            htmlType: "number",
            size: e.size,
            value: (r == null ? void 0 : r.value2) ?? null,
            placeholder: c("data.fast.max"),
            onChange: (b) => s(r == null ? void 0 : r.value, b)
          }, null)]);
        }
        case "date":
        case "timestamp": {
          const s = (b, d) => {
            if (b == null && d == null) return l(o, null);
            l(o, {
              field: o,
              op: "between",
              value: b,
              value2: d
            });
          };
          return n("div", {
            class: "cubo-data__fast-range"
          }, [n(Mt, {
            size: e.size,
            value: r != null && r.value ? new Date(r.value) : void 0,
            onChange: (b) => s(b ? b.getTime() : null, (r == null ? void 0 : r.value2) ?? null)
          }, null), n("span", {
            class: "cubo-data__fast-sep"
          }, [xe("–")]), n(Mt, {
            size: e.size,
            value: r != null && r.value2 ? new Date(r.value2) : void 0,
            onChange: (b) => s((r == null ? void 0 : r.value) ?? null, b ? b.getTime() : null)
          }, null)]);
        }
        case "select":
        case "multiselect":
          return n(je, {
            multiple: !0,
            clearable: !0,
            size: e.size,
            searchable: !0,
            placeholder: c("data.fast.any"),
            value: Array.isArray(r == null ? void 0 : r.value) ? r == null ? void 0 : r.value : [],
            variants: (i.options ?? []).map((s) => ({
              label: s.label,
              value: s.value
            })),
            onChange: (s) => {
              const b = s ?? [];
              l(o, b.length ? {
                field: o,
                op: "in",
                value: b
              } : null);
            }
          }, null);
        case "boolean":
          return n(lc, {
            value: r ? r.op === "isTrue" ? "yes" : "no" : "any",
            buttons: [{
              label: c("data.fast.boolAny"),
              value: "any",
              props: {
                size: e.size
              }
            }, {
              label: c("data.fast.boolYes"),
              value: "yes",
              props: {
                size: e.size
              }
            }, {
              label: c("data.fast.boolNo"),
              value: "no",
              props: {
                size: e.size
              }
            }],
            onChange: (s) => l(o, s === "any" ? null : {
              field: o,
              op: s === "yes" ? "isTrue" : "isFalse"
            })
          }, null);
        default:
          return n(pe, {
            size: e.size,
            value: (r == null ? void 0 : r.value) ?? "",
            placeholder: c("data.fast.textPlaceholder"),
            onChange: (s) => l(o, s ? {
              field: o,
              op: "contains",
              value: s
            } : null)
          }, null);
      }
    };
    return () => {
      const i = le(e.lang), o = e.fields.filter(Dl);
      return o.length === 0 ? n("div", {
        class: "cubo-data__fast cubo-data__fast--empty"
      }, [i("data.fast.empty")]) : n("div", {
        class: "cubo-data__fast"
      }, [o.map((r) => n("div", {
        key: r.key,
        class: "cubo-data__fast-row"
      }, [n("span", {
        class: "cubo-data__fast-label"
      }, [r.label]), n("div", {
        class: "cubo-data__fast-control"
      }, [u(r)])]))]);
    };
  }
});
function el(e) {
  var t;
  return ((t = Tl(e.type)[0]) == null ? void 0 : t.op) ?? "eq";
}
function tl(e, t, a, l, u, i) {
  const o = t[a];
  switch (e.type) {
    case "number":
      return n(pe, {
        htmlType: "number",
        size: l,
        value: o ?? null,
        placeholder: u("data.filters.valuePlaceholder"),
        onChange: (r) => i(r)
      }, null);
    case "date":
    case "timestamp":
      return n(Mt, {
        size: l,
        value: o ? new Date(o) : void 0,
        onChange: (r) => i(r ? r.getTime() : void 0)
      }, null);
    case "select":
    case "multiselect": {
      const r = t.op === "in" || t.op === "notIn";
      return n(je, {
        multiple: r,
        clearable: !0,
        searchable: !0,
        size: l,
        value: r ? Array.isArray(o) ? o : o == null || o === "" ? [] : [o] : o,
        variants: (e.options ?? []).map((c) => ({
          label: c.label,
          value: c.value
        })),
        onChange: (c) => i(c)
      }, null);
    }
    default:
      return n(pe, {
        size: l,
        value: o ?? "",
        placeholder: u("data.filters.valuePlaceholder"),
        onChange: (r) => i(r)
      }, null);
  }
}
const ic = /* @__PURE__ */ N({
  name: "CuboDataFilters",
  props: {
    query: {
      type: Object,
      required: !0
    },
    fields: {
      type: Array,
      required: !0
    },
    size: {
      type: String,
      required: !0
    },
    /** Resolved built-in-string language (threaded from `<CuboData>`). */
    lang: {
      type: String,
      required: !0
    }
  },
  emits: {
    patch: (e) => !0
  },
  setup(e, {
    emit: t
  }) {
    const a = (i) => t("patch", {
      filters: i
    }), l = (i, o) => a(e.query.filters.map((r, c) => c === i ? {
      ...r,
      ...o
    } : r)), u = (i) => a(e.query.filters.filter((o, r) => r !== i));
    return () => {
      const {
        query: i,
        fields: o,
        size: r
      } = e, c = le(e.lang), s = o.filter(Dl), b = () => {
        const d = s[0];
        d && a([...i.filters, {
          field: ht(d),
          op: el(d),
          value: void 0
        }]);
      };
      return n("div", {
        class: "cubo-data__filters"
      }, [i.filters.map((d, f) => {
        const y = o.find((p) => ht(p) === d.field) ?? s[0];
        if (!y) return null;
        const v = Tl(y.type), g = hi(d.op), w = d.op === "between";
        return n("div", {
          key: f,
          class: "cubo-data__filter-row"
        }, [n(je, {
          size: r,
          class: "cubo-data__filter-field",
          value: d.field,
          variants: s.map((p) => ({
            label: p.label,
            value: ht(p)
          })),
          onChange: (p) => {
            const T = o.find((A) => ht(A) === p);
            l(f, {
              field: p,
              op: T ? el(T) : d.op,
              value: void 0,
              value2: void 0
            });
          }
        }, null), n(je, {
          size: r,
          class: "cubo-data__filter-op",
          value: d.op,
          variants: v.map((p) => ({
            label: p.label,
            value: p.op
          })),
          onChange: (p) => l(f, {
            op: p
          })
        }, null), g ? null : n("div", {
          class: "cubo-data__filter-value"
        }, [tl(y, d, "value", r, c, (p) => l(f, {
          value: p
        })), w ? n(se, null, [n("span", {
          class: "cubo-data__filter-sep"
        }, [xe("–")]), tl(y, d, "value2", r, c, (p) => l(f, {
          value2: p
        }))]) : null]), n(ie, {
          size: r,
          ghost: !0,
          class: "cubo-data__filter-remove",
          htmlAttrs: {
            "aria-label": c("data.filters.removeAriaLabel")
          },
          onClick: () => u(f)
        }, {
          default: () => [n(M, {
            icon: "trash",
            size: 16
          }, null)]
        })]);
      }), n("div", {
        class: "cubo-data__filter-add"
      }, [n(ie, {
        size: r,
        ghost: !0,
        disabled: s.length === 0,
        onClick: b
      }, {
        default: () => [n(M, {
          icon: "plus",
          size: 16
        }, null), n("span", null, [c("data.filters.add")])]
      })])]);
    };
  }
}), oc = /* @__PURE__ */ N({
  name: "CuboDataMisc",
  props: {
    query: {
      type: Object,
      required: !0
    },
    fields: {
      type: Array,
      required: !0
    },
    views: {
      type: Array,
      required: !0
    },
    size: {
      type: String,
      required: !0
    },
    /** Resolved built-in-string language (threaded from `<CuboData>`). */
    lang: {
      type: String,
      required: !0
    },
    /** Updates group/view (the panel routes this into its draft → Submit). */
    onPatch: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    return () => {
      const {
        query: t,
        fields: a,
        views: l,
        size: u
      } = e, i = le(e.lang), o = {
        table: i("data.view.table"),
        cards: i("data.view.cards"),
        pipeline: i("data.view.pipeline")
      }, r = a.filter(Nn);
      return n("div", {
        class: "cubo-data__misc"
      }, [r.length > 0 ? n("div", {
        class: "cubo-data__misc-row"
      }, [n("span", {
        class: "cubo-data__misc-label"
      }, [i("data.misc.groupByLabel")]), n("div", {
        class: "cubo-data__misc-control"
      }, [n(je, {
        size: u,
        clearable: !0,
        searchable: !0,
        value: t.group ?? void 0,
        placeholder: i("data.misc.groupByPlaceholder"),
        variants: r.map((c) => ({
          label: c.label,
          value: qt(c)
        })),
        onChange: (c) => e.onPatch({
          group: c ?? null
        })
      }, null)])]) : null, l.length > 1 ? n("div", {
        class: "cubo-data__misc-row"
      }, [n("span", {
        class: "cubo-data__misc-label"
      }, [i("data.misc.defaultViewLabel")]), n("div", {
        class: "cubo-data__misc-control"
      }, [n(yn, {
        value: t.view,
        buttons: l.map((c) => ({
          value: c,
          label: o[c],
          props: {
            size: u
          }
        })),
        onChange: (c) => e.onPatch({
          view: c
        })
      }, null)])]) : null]);
    };
  }
});
function jn(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ce(e);
}
const rc = Qn, cc = Xn, tn = (e) => JSON.stringify(e), sc = ({
  fast: e,
  ...t
}) => t, nn = (e) => e.filters.filter((t) => t.fast).map(sc), an = (e) => e.filters.filter((t) => !t.fast), dc = (e, t) => [...e.map((a) => ({
  ...a,
  fast: !0
})), ...t], nl = "__cubo_data_views_separator", fc = /* @__PURE__ */ N({
  name: "CuboDataPresetRow",
  props: {
    preset: {
      type: Object,
      required: !0
    },
    active: {
      type: Boolean,
      required: !0
    },
    /** Show the drag handle (sortable list, non-locked rows). */
    showHandle: {
      type: Boolean,
      required: !0
    },
    /** The default view: pinned to the top, shows a lock and never drags. */
    locked: {
      type: Boolean,
      required: !0
    },
    /** Resolved built-in-string language (threaded from `<CuboData>`). */
    lang: {
      type: String,
      required: !0
    },
    onSelect: {
      type: Function,
      required: !0
    },
    onEdit: {
      type: Function,
      required: !0
    },
    onDelete: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    const t = E(!1), a = E(e.preset.name), l = E(!!e.preset.isDefault), u = E(!!e.preset.primary), i = (r) => {
      r && (a.value = e.preset.name, l.value = !!e.preset.isDefault, u.value = !!e.preset.primary), t.value = r;
    }, o = () => {
      e.onEdit(e.preset, {
        name: a.value.trim() || e.preset.name,
        isDefault: l.value,
        // The default view is always pinned.
        primary: l.value || u.value
      }), t.value = !1;
    };
    return () => {
      const {
        preset: r,
        active: c,
        showHandle: s,
        locked: b
      } = e, d = le(e.lang);
      return n("div", {
        class: "cubo-data__preset",
        "data-active": c || void 0,
        "data-locked": b || void 0
      }, [b ? (
        // Not a `.cubo-data__preset-handle` — so CuboSortable can't drag it.
        n("span", {
          class: "cubo-data__preset-lock",
          "aria-hidden": "true",
          title: d("data.preset.lockedTitle")
        }, [n(M, {
          icon: "lock",
          size: 14
        }, null)])
      ) : s ? n("span", {
        class: "cubo-data__preset-handle",
        "aria-hidden": "true"
      }, [n(M, {
        icon: "grip-vertical",
        size: 15
      }, null)]) : null, n("button", {
        type: "button",
        class: "cubo-data__preset-name",
        onClick: () => e.onSelect(r.id)
      }, [r.color ? n("span", {
        class: "cubo-data__dot",
        style: {
          backgroundColor: r.color
        }
      }, null) : null, n("span", {
        class: "cubo-data__preset-label"
      }, [r.name])]), n(Jn, {
        class: "cubo-data__preset-editpop",
        visible: t.value,
        position: "right",
        teleportSelector: "#app",
        onSetVisible: i
      }, {
        default: () => n("button", {
          type: "button",
          class: "cubo-data__preset-edit",
          "aria-label": d("data.preset.editTitle", {
            name: r.name
          })
        }, [n(M, {
          icon: "pencil",
          size: 14
        }, null)]),
        content: () => {
          let f;
          return n("div", {
            class: "cubo-data__preset-form"
          }, [n("label", {
            class: "cubo-data__preset-field"
          }, [n(pe, {
            size: "medium",
            autofocus: !0,
            value: a.value,
            placeholder: d("data.preset.namePlaceholder"),
            htmlAttrs: {
              "aria-label": d("data.preset.nameAriaLabel")
            },
            onChange: (y) => a.value = y ?? "",
            onEnter: o
          }, null)]), n("label", {
            class: "cubo-data__preset-toggle"
          }, [n("span", null, [d("data.preset.defaultToggle")]), n(sn, {
            size: "small",
            value: l.value,
            onChange: (y) => l.value = y
          }, null)]), n("label", {
            class: "cubo-data__preset-toggle"
          }, [n("span", null, [d("data.preset.pinnedToggle")]), n(sn, {
            size: "small",
            value: l.value || u.value,
            disabled: l.value,
            onChange: (y) => u.value = y
          }, null)]), n("div", {
            class: "cubo-data__preset-form-actions"
          }, [n(ie, {
            size: "small",
            onClick: o
          }, {
            default: () => [n(M, {
              icon: "check",
              size: 15
            }, null), n("span", null, [d("data.preset.editSave")])]
          }), n(ie, {
            size: "small",
            ghost: !0,
            color: "neutral",
            onClick: () => t.value = !1
          }, jn(f = d("data.preset.editCancel")) ? f : {
            default: () => [f]
          }), n(ie, {
            size: "small",
            ghost: !0,
            color: "danger",
            class: "cubo-data__preset-remove",
            disabled: !!r.isDefault,
            htmlAttrs: {
              "aria-label": d("data.preset.removeAriaLabel", {
                name: r.name
              }),
              title: d("data.preset.removeTitle")
            },
            onClick: () => {
              e.onDelete(r), t.value = !1;
            }
          }, {
            default: () => [n(M, {
              icon: "trash",
              size: 15
            }, null)]
          })])]);
        }
      })]);
    };
  }
}), au = /* @__PURE__ */ N({
  name: "CuboDataFiltersPanel",
  props: {
    query: {
      type: Object,
      required: !0
    },
    fields: {
      type: Array,
      required: !0
    },
    size: {
      type: String,
      required: !0
    },
    /** Resolved built-in-string language (threaded from `<CuboData>`). */
    lang: {
      type: String,
      required: !0
    },
    onPatch: {
      type: Function,
      required: !0
    },
    presets: {
      type: Array,
      required: !0
    },
    activePresetId: {
      type: String,
      default: null
    },
    dirty: {
      type: Boolean,
      required: !0
    },
    canManagePresets: {
      type: Boolean,
      required: !0
    },
    onSelectPreset: {
      type: Function,
      required: !0
    },
    onEditPreset: {
      type: Function,
      required: !0
    },
    onDeletePreset: {
      type: Function,
      required: !0
    },
    onCreatePreset: {
      type: Function,
      required: !0
    },
    onResetToDefault: {
      type: Function,
      required: !0
    },
    onSortViews: {
      type: Function,
      default: void 0
    },
    views: {
      type: Array,
      required: !0
    },
    allColumns: {
      type: Array,
      required: !0
    },
    onToggleColumn: {
      type: Function,
      required: !0
    },
    onReorderColumns: {
      type: Function,
      required: !0
    },
    onClose: {
      type: Function,
      default: void 0
    }
  },
  setup(e) {
    const t = E("fast"), a = E(an(e.query)), l = E(nn(e.query)), u = E(e.query.columns), i = E(e.query.group ?? null), o = E(e.query.view), r = (v) => JSON.stringify([v.filters, v.columns ?? null, v.group ?? null, v.view]), c = E(r(e.query));
    Q(() => r(e.query), (v) => {
      c.value !== v && (c.value = v, a.value = an(e.query), l.value = nn(e.query), u.value = e.query.columns, i.value = e.query.group ?? null, o.value = e.query.view);
    });
    const s = E(!1), b = E(""), d = () => e.onPatch({
      // Recombine the two drafts into one list (Fast rows re-flagged), Fast first.
      filters: dc(l.value, a.value),
      columns: u.value,
      group: i.value,
      view: o.value
    }), f = () => {
      var v;
      a.value = an(e.query), l.value = nn(e.query), u.value = e.query.columns, i.value = e.query.group ?? null, o.value = e.query.view, (v = e.onClose) == null || v.call(e);
    }, y = () => {
      const v = b.value.trim();
      v && e.onCreatePreset(v), s.value = !1, b.value = "";
    };
    return () => {
      let v, g;
      const {
        query: w,
        fields: p,
        size: T,
        presets: A,
        activePresetId: m,
        dirty: C,
        canManagePresets: k
      } = e, z = le(e.lang), x = e.allColumns.map((q) => q.key), R = tn(a.value) !== tn(an(w)) || tn(l.value) !== tn(nn(w)) || JSON.stringify(u.value ?? null) !== JSON.stringify(w.columns ?? null) || i.value !== (w.group ?? null) || o.value !== w.view, U = {
        ...w,
        filters: l.value
      }, B = {
        ...w,
        filters: a.value
      }, h = (q) => {
        q.filters && (l.value = q.filters);
      }, _ = (q) => {
        q.filters && (a.value = q.filters);
      }, D = (q) => {
        u.value = Il(x, u.value, q);
      }, F = (q) => {
        const Z = new Set(_t(x, u.value)), oe = q.filter((de) => Z.has(de));
        u.value = bn(x, oe);
      }, H = {
        ...w,
        group: i.value,
        view: o.value
      }, X = (q) => {
        "group" in q && (i.value = q.group ?? null), q.view && (o.value = q.view);
      }, re = !!e.onSortViews, ae = A.find((q) => q.isDefault), I = A.filter((q) => q.primary && !q.isDefault), P = A.filter((q) => !q.primary && !q.isDefault), V = [...ae ? [{
        id: ae.id,
        kind: "default",
        preset: ae
      }] : [], ...I.map((q) => ({
        id: q.id,
        kind: "preset",
        preset: q
      })), {
        id: nl,
        kind: "separator"
      }, ...P.map((q) => ({
        id: q.id,
        kind: "preset",
        preset: q
      }))], K = (q) => {
        if (q.kind === "separator")
          return n("div", {
            class: "cubo-data__preset-divider",
            "aria-hidden": "true"
          }, null);
        const Z = q.preset;
        return n(fc, {
          key: Z.id,
          preset: Z,
          active: m === Z.id,
          showHandle: re && q.kind === "preset",
          locked: q.kind === "default",
          lang: e.lang,
          onSelect: e.onSelectPreset,
          onEdit: e.onEditPreset,
          onDelete: e.onDeletePreset
        }, null);
      }, G = (q) => {
        var Y;
        let Z = "pinned";
        const oe = [], de = [];
        for (const ee of q) {
          if (ee.id === nl) {
            Z = "views";
            continue;
          }
          ee.kind !== "default" && (Z === "pinned" ? oe : de).push(String(ee.id));
        }
        const me = new Set(oe);
        for (const ee of A)
          ee.isDefault || !!ee.primary !== me.has(ee.id) && e.onEditPreset(ee, {
            primary: me.has(ee.id)
          });
        const $ = [ae == null ? void 0 : ae.id, ...oe, ...de].filter((ee) => !!ee);
        (Y = e.onSortViews) == null || Y.call(e, $);
      };
      return n("div", {
        class: "cubo-data__filters-panel"
      }, [k ? n("div", {
        class: "cubo-data__filters-side"
      }, [re ? n(cc, {
        class: "cubo-data__preset-list",
        rows: V,
        handler: ".cubo-data__preset-handle",
        renderItem: (q) => K(q),
        onChange: (q) => G(q)
      }, null) : n("div", {
        class: "cubo-data__preset-list"
      }, [V.map((q) => n("div", {
        key: q.id
      }, [K(q)]))]), C ? n("div", {
        class: "cubo-data__preset-foot"
      }, [k ? s.value ? n("div", {
        class: "cubo-data__preset-editor",
        onKeydown: (q) => {
          q.key === "Escape" && (q.preventDefault(), q.stopPropagation(), s.value = !1);
        }
      }, [n(pe, {
        size: "small",
        autofocus: !0,
        class: "cubo-data__preset-input",
        value: b.value,
        placeholder: z("data.preset.namePlaceholder"),
        onChange: (q) => b.value = q ?? "",
        onEnter: y
      }, null), n(ie, {
        size: "small",
        ghost: !0,
        color: "neutral",
        htmlAttrs: {
          "aria-label": z("data.preset.createAriaLabel")
        },
        onClick: y
      }, {
        default: () => [n(M, {
          icon: "check",
          size: 15
        }, null)]
      }), n(ie, {
        size: "small",
        ghost: !0,
        color: "neutral",
        htmlAttrs: {
          "aria-label": z("data.preset.createCancelAriaLabel")
        },
        onClick: () => s.value = !1
      }, {
        default: () => [n(M, {
          icon: "x",
          size: 15
        }, null)]
      })]) : n("button", {
        type: "button",
        class: "cubo-data__preset-new",
        onClick: () => {
          b.value = "", s.value = !0;
        }
      }, [n(M, {
        icon: "plus",
        size: 14
      }, null), n("span", null, [z("data.preset.saveAsNew")])]) : null]) : null]) : null, n("div", {
        class: "cubo-data__filters-main",
        onKeydown: (q) => {
          var Z, oe, de;
          q.key === "Enter" && (document.querySelector(".cubo-select__panel, .cubo-date-picker__pop") || (oe = (Z = q.target).closest) != null && oe.call(Z, ".cubo-text") && (q.preventDefault(), R && d(), (de = e.onClose) == null || de.call(e)));
        }
      }, [n(rc, {
        class: "cubo-data__filters-tabs",
        active: t.value,
        onChange: (q) => t.value = q,
        tabs: [{
          id: "fast",
          // Sup = count of active (non-empty) Fast fields in the draft.
          label: () => n("span", {
            class: "cubo-data__tab-label"
          }, [z("data.tab.fast"), l.value.length > 0 ? n("sup", {
            class: "cubo-data__tab-count"
          }, [l.value.length]) : null]),
          content: () => n(uc, {
            query: U,
            fields: p,
            size: T,
            lang: e.lang,
            onPatch: h
          }, null)
        }, {
          id: "extendable",
          // Sup = number of Extendable filter rows in the draft.
          label: () => n("span", {
            class: "cubo-data__tab-label"
          }, [z("data.tab.extendable"), a.value.length > 0 ? n("sup", {
            class: "cubo-data__tab-count"
          }, [a.value.length]) : null]),
          content: () => n(ic, {
            query: B,
            fields: p,
            size: T,
            lang: e.lang,
            onPatch: _
          }, null)
        }, {
          id: "columns",
          label: z("data.tab.columns"),
          content: () => n(nu, {
            allColumns: e.allColumns,
            columns: u.value,
            size: T,
            onToggleColumn: D,
            onReorderColumns: F
          }, null)
        }, {
          id: "misc",
          label: z("data.tab.misc"),
          content: () => n(oc, {
            query: H,
            fields: p,
            views: e.views,
            size: T,
            lang: e.lang,
            onPatch: X
          }, null)
        }]
      }, null), R ? n("div", {
        class: "cubo-data__filters-actions"
      }, [n(ie, {
        size: T,
        onClick: d
      }, jn(v = z("data.filters.apply")) ? v : {
        default: () => [v]
      }), n(ie, {
        size: T,
        ghost: !0,
        color: "neutral",
        onClick: f
      }, jn(g = z("data.filters.cancel")) ? g : {
        default: () => [g]
      })]) : null])]);
    };
  }
});
function bc(e) {
  const {
    rows: t,
    fields: a,
    size: l,
    lang: u,
    rowKey: i,
    pipelineField: o,
    titleField: r,
    bodyFields: c,
    groupOrder: s,
    dragOverKey: b,
    canMove: d,
    renderCard: f,
    onOpen: y,
    onRowChange: v,
    onDragStart: g,
    onDragEnd: w,
    onDragOverColumn: p,
    onDropColumn: T
  } = e, A = le(u);
  if (!o)
    return n("div", {
      class: "cubo-data__pipeline-empty"
    }, [n(mn, {
      icon: "layout-columns",
      title: A("data.pipeline.emptyTitle"),
      description: A("data.pipeline.emptyDescription")
    }, null)]);
  const m = Zn(Ai(t, o), s);
  return (
    // The kanban is a two-axis scroll container — focusable so keyboard users
    // can scroll it, named after the field that drives the columns.
    n("div", {
      class: "cubo-data__pipeline",
      tabindex: 0,
      role: "region",
      "aria-label": o.label || A("data.pipeline.regionAriaLabel")
    }, [m.map((C) => n("div", {
      key: C.key,
      class: "cubo-data__column",
      "data-drop-active": d && b === C.key || void 0,
      onDragover: d ? (k) => {
        k.preventDefault(), p(C.key);
      } : void 0,
      onDragleave: d ? () => p(null) : void 0,
      onDrop: d ? (k) => {
        k.preventDefault(), T(C.key, C.value);
      } : void 0
    }, [n("div", {
      class: "cubo-data__column-head"
    }, [n("span", {
      class: "cubo-data__dot",
      style: {
        backgroundColor: C.color ?? "var(--c-color-border-strong)"
      }
    }, null), n("span", {
      class: "cubo-data__column-label"
    }, [C.label]), n(Ge, {
      size: "small",
      ghost: !0,
      color: "neutral"
    }, {
      default: () => [C.rows.length]
    })]), n("div", {
      class: "cubo-data__column-body"
    }, [C.rows.map((k) => n(se, {
      key: Le(k, i)
    }, [tu({
      row: k,
      fields: a,
      titleField: r,
      bodyFields: c,
      size: l,
      groupKey: C.key,
      canMove: d,
      renderCard: f,
      onOpen: y,
      onRowChange: v,
      onDragStart: g,
      onDragEnd: w
    })]))])]))])
  );
}
const vc = /* @__PURE__ */ N({
  name: "CuboDataTable",
  props: {
    rows: {
      type: Array,
      required: !0
    },
    columns: {
      type: Array,
      required: !0
    },
    fields: {
      type: Array,
      required: !0
    },
    query: {
      type: Object,
      required: !0
    },
    size: {
      type: String,
      required: !0
    },
    rowKey: {
      type: [String, Function],
      required: !0
    },
    expanded: {
      type: Object,
      required: !0
    },
    groupOrder: {
      type: Array,
      default: void 0
    },
    sort: {
      type: Object,
      default: null
    },
    onSort: {
      type: Function,
      required: !0
    },
    onReorderColumn: {
      type: Function,
      required: !0
    },
    onToggleGroup: {
      type: Function,
      required: !0
    },
    onOpen: {
      type: Function,
      required: !0
    },
    showDetailOnRowClick: {
      type: Boolean,
      default: !0
    },
    onRowChange: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    const t = E(null), a = E(null), l = E(null), u = (s, b) => {
      if (t.value = s, a.value = s, b.dataTransfer) {
        b.dataTransfer.effectAllowed = "move";
        try {
          b.dataTransfer.setData("text/plain", s);
        } catch {
        }
      }
    }, i = (s, b) => {
      if (t.value == null || t.value === s) return;
      b.preventDefault();
      const d = b.currentTarget.getBoundingClientRect(), f = b.clientX - d.left > d.width / 2, y = l.value;
      (!y || y.key !== s || y.after !== f) && (l.value = {
        key: s,
        after: f
      });
    }, o = (s) => {
      var b;
      ((b = l.value) == null ? void 0 : b.key) === s && (l.value = null);
    }, r = (s, b) => {
      var f;
      b.preventDefault();
      const d = t.value;
      d != null && d !== s && e.onReorderColumn(d, s, ((f = l.value) == null ? void 0 : f.after) ?? !1), t.value = null, a.value = null, l.value = null;
    }, c = () => {
      t.value = null, a.value = null, l.value = null;
    };
    return () => {
      const {
        rows: s,
        columns: b,
        fields: d,
        query: f,
        size: y,
        rowKey: v,
        expanded: g,
        groupOrder: w,
        sort: p,
        onSort: T,
        onToggleGroup: A,
        onOpen: m,
        showDetailOnRowClick: C,
        onRowChange: k
      } = e, x = {
        gridTemplateColumns: b.map((h) => h.width ? `${h.width}px` : h.type === "text" ? "minmax(140px, 1.6fr)" : "minmax(110px, 1fr)").join(" ")
      }, R = n("div", {
        class: "cubo-data__thead",
        role: "rowgroup",
        style: x
      }, [n("div", {
        role: "row",
        style: {
          display: "contents"
        }
      }, [b.map((h) => {
        var re, ae, I;
        const _ = yi(h), D = El(h), F = p && p.field === D ? p : void 0, H = ((re = l.value) == null ? void 0 : re.key) === h.key, X = () => T(D);
        return n("div", {
          key: h.key,
          class: "cubo-data__th",
          role: "columnheader",
          tabindex: _ ? 0 : void 0,
          "aria-sort": F ? F.dir === "asc" ? "ascending" : "descending" : void 0,
          draggable: !0,
          "data-sortable": _ || void 0,
          "data-sort-active": F ? !0 : void 0,
          "data-dragging": a.value === h.key || void 0,
          "data-drop-before": H && !((ae = l.value) != null && ae.after) ? !0 : void 0,
          "data-drop-after": H && ((I = l.value) != null && I.after) ? !0 : void 0,
          onClick: _ ? X : void 0,
          onKeydown: _ ? (P) => {
            (P.key === "Enter" || P.key === " ") && (P.preventDefault(), X());
          } : void 0,
          onDragstart: (P) => u(h.key, P),
          onDragover: (P) => i(h.key, P),
          onDragleave: () => o(h.key),
          onDrop: (P) => r(h.key, P),
          onDragend: c
        }, [n("span", {
          class: "cubo-data__th-label"
        }, [h.label]), _ ? n("span", {
          class: "cubo-data__sort-icon"
        }, [n(M, {
          icon: F ? F.dir === "asc" ? "chevron-up" : "chevron-down" : "selector",
          size: 14
        }, null)]) : null]);
      })])]), U = (h) => n("div", {
        key: Le(h, v),
        class: "cubo-data__tr",
        role: "row",
        tabindex: C ? 0 : void 0,
        "data-clickable": C || void 0,
        style: x,
        onClick: C ? () => m(h) : void 0,
        onKeydown: C ? (_) => {
          (_.key === "Enter" || _.key === " ") && (_.preventDefault(), m(h));
        } : void 0
      }, [b.map((_) => n("div", {
        key: _.key,
        class: "cubo-data__td",
        role: "cell"
      }, [eu(_, h, y, !0, k, () => m(h))]))]);
      let B;
      return f.group ? B = Zn(Fl(s, f.group, d), w).map((_) => {
        const D = !g.has(_.key);
        return n(se, {
          key: _.key
        }, [n("div", {
          class: "cubo-data__group-head",
          role: "row",
          tabindex: 0,
          "aria-expanded": !D,
          "data-collapsed": D || void 0,
          onClick: () => A(_.key),
          onKeydown: (F) => {
            (F.key === "Enter" || F.key === " ") && (F.preventDefault(), A(_.key));
          }
        }, [n("div", {
          role: "cell",
          "aria-colspan": b.length,
          style: {
            display: "contents"
          }
        }, [n(M, {
          icon: D ? "chevron-right" : "chevron-down",
          size: 16
        }, null), _.color ? n("span", {
          class: "cubo-data__dot",
          style: {
            backgroundColor: _.color
          }
        }, null) : null, n("span", {
          class: "cubo-data__group-label"
        }, [_.label || "Ungrouped"]), n(Ge, {
          size: "small",
          ghost: !0,
          color: "neutral"
        }, {
          default: () => [_.rows.length]
        })])]), D ? null : _.rows.map(U)]);
      }) : B = s.map(U), n("div", {
        class: "cubo-data__table",
        role: "table",
        "data-grouped": f.group ? !0 : void 0
      }, [R, n("div", {
        class: "cubo-data__tbody",
        role: "rowgroup"
      }, [B])]);
    };
  }
});
function yc(e) {
  return n(vc, {
    rows: e.rows,
    columns: e.columns,
    fields: e.fields,
    query: e.query,
    size: e.size,
    rowKey: e.rowKey,
    expanded: e.expanded,
    groupOrder: e.groupOrder,
    sort: e.sort,
    onSort: e.onSort,
    showDetailOnRowClick: e.showDetailOnRowClick,
    onReorderColumn: e.onReorderColumn,
    onToggleGroup: e.onToggleGroup,
    onOpen: e.onOpen,
    onRowChange: e.onRowChange
  }, null);
}
const mc = ".cubo-data__filters-pop, .cubo-select__panel, .cubo-date-picker__pop, .cubo-popup__pop";
function gc(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ce(e);
}
const hc = {
  table: "layout-list",
  cards: "layout-grid",
  pipeline: "layout-columns"
}, _c = /* @__PURE__ */ N({
  name: "CuboDataToolbar",
  props: {
    query: {
      type: Object,
      required: !0
    },
    fields: {
      type: Array,
      required: !0
    },
    views: {
      type: Array,
      required: !0
    },
    size: {
      type: String,
      required: !0
    },
    /** Resolved built-in-string language (threaded from `<CuboData>`). */
    lang: {
      type: String,
      required: !0
    },
    searchable: {
      type: Boolean,
      required: !0
    },
    /** Auto-open the filters popover when the search box is focused. @default true */
    showFiltersPopup: {
      type: Boolean,
      default: !0
    },
    /** Renders the "Add" control before the search box (ctx already bound). */
    addButton: {
      type: Function,
      default: void 0
    },
    /** Extra toolbar content rendered right after the search box. */
    toolbarExtra: {
      type: Function,
      default: void 0
    },
    /** All field defs (the universe of toggleable columns). */
    allColumns: {
      type: Array,
      required: !0
    },
    /** The select field currently driving the pipeline columns (pipeline view). */
    pipelineFieldKey: {
      type: String,
      default: void 0
    },
    presets: {
      type: Array,
      required: !0
    },
    /** Whether the working query diverges from a saved preset. */
    dirty: {
      type: Boolean,
      required: !0
    },
    filtersOpen: {
      type: Boolean,
      required: !0
    },
    /** Whether saved-view CRUD callbacks are wired. */
    canManagePresets: {
      type: Boolean,
      required: !0
    },
    columnsOpen: {
      type: Boolean,
      required: !0
    },
    // ---- preset API (forwarded straight to the filters panel) ----
    // These are plain Function props because they cross into the panel as props.
    activePresetId: {
      type: String,
      default: null
    },
    onSelectPreset: {
      type: Function,
      required: !0
    },
    onEditPreset: {
      type: Function,
      required: !0
    },
    onDeletePreset: {
      type: Function,
      required: !0
    },
    onCreatePreset: {
      type: Function,
      required: !0
    },
    onResetToDefault: {
      type: Function,
      required: !0
    },
    onSortViews: {
      type: Function,
      default: void 0
    },
    // Column visibility/order callbacks — plain Function props because they
    // cross into the filters panel (and the columns popover) as props.
    onToggleColumn: {
      type: Function,
      required: !0
    },
    onReorderColumns: {
      type: Function,
      required: !0
    },
    // ---- quick-find search (command palette) ----
    searchActive: {
      type: Boolean,
      required: !0
    },
    searching: {
      type: Boolean,
      required: !0
    },
    searchItems: {
      type: Array,
      required: !0
    },
    onSearchInput: {
      type: Function,
      required: !0
    },
    onApplySearch: {
      type: Function,
      required: !0
    },
    onClearSearch: {
      type: Function,
      required: !0
    },
    onOpenResult: {
      type: Function,
      required: !0
    }
  },
  emits: {
    patch: (e) => !0,
    clearFilters: () => !0,
    setFiltersOpen: (e) => !0,
    toggleColumnsPanel: (e) => !0
  },
  setup(e, {
    emit: t
  }) {
    const a = E(null), l = `cubo-data-filters-${ot()}`, u = (d) => {
      var y, v;
      const f = d.target;
      f && ((y = a.value) != null && y.contains(f) || (v = f.closest) != null && v.call(f, mc) || t("setFiltersOpen", !1));
    }, i = (d) => {
      var y;
      if (d.key !== "Escape" || document.querySelector(".cubo-select__panel, .cubo-date-picker__pop")) return;
      const f = document.activeElement;
      f instanceof HTMLElement && ((y = a.value) != null && y.contains(f)) && f.blur(), t("setFiltersOpen", !1);
    };
    Q(() => e.filtersOpen && e.searchable, (d) => {
      d ? (document.addEventListener("mousedown", u), document.addEventListener("keydown", i)) : (document.removeEventListener("mousedown", u), document.removeEventListener("keydown", i));
    }), $e(() => {
      document.removeEventListener("mousedown", u), document.removeEventListener("keydown", i);
    });
    const o = O(() => e.searchActive && e.query.search.trim().length > 0), r = E(0), c = E(null);
    Q(() => [e.query.search, e.searchItems.length], () => {
      r.value = 0;
    }), Q(r, () => {
      var d, f;
      o.value && ((f = (d = c.value) == null ? void 0 : d.querySelector(".cubo-data__search-result[data-active]")) == null || f.scrollIntoView({
        block: "nearest"
      }));
    });
    const s = (d) => {
      t("setFiltersOpen", !1), e.onOpenResult(d);
    }, b = (d) => {
      if (d.key === "Enter") {
        d.preventDefault(), e.onApplySearch(), t("setFiltersOpen", !1);
        return;
      }
      !o.value || e.searching || !e.searchItems.length || (d.key === "ArrowDown" ? (d.preventDefault(), r.value = Math.min(r.value + 1, e.searchItems.length - 1)) : d.key === "ArrowUp" && (d.preventDefault(), r.value = Math.max(r.value - 1, 0)));
    };
    return () => {
      const {
        query: d,
        fields: f,
        views: y,
        size: v,
        presets: g
      } = e, w = le(e.lang), p = {
        table: w("data.view.table"),
        cards: w("data.view.cards"),
        pipeline: w("data.view.pipeline")
      }, T = d.filters.length, A = d.view === "pipeline", m = A ? f.filter((k) => Nn(k) || qn(k)) : f.filter(Nn), C = {
        query: d,
        fields: f,
        size: v,
        lang: e.lang,
        presets: g,
        dirty: e.dirty,
        canManagePresets: e.canManagePresets,
        activePresetId: e.activePresetId,
        onPatch: (k) => t("patch", k),
        onSelectPreset: e.onSelectPreset,
        onEditPreset: e.onEditPreset,
        onDeletePreset: e.onDeletePreset,
        onCreatePreset: e.onCreatePreset,
        onResetToDefault: e.onResetToDefault,
        onSortViews: e.onSortViews,
        views: y,
        allColumns: e.allColumns,
        onToggleColumn: e.onToggleColumn,
        onReorderColumns: e.onReorderColumns,
        onClose: () => t("setFiltersOpen", !1)
      };
      return n("div", {
        class: "cubo-data__toolbar"
      }, [e.addButton ? n("div", {
        class: "cubo-data__add"
      }, [ne(e.addButton())]) : null, e.searchable ? n("div", {
        ref: a,
        class: "cubo-data__search",
        onFocusin: () => e.showFiltersPopup && t("setFiltersOpen", !0)
      }, [n(pe, {
        size: v,
        value: d.search,
        placeholder: w("data.search.placeholder"),
        prefixIcon: "search",
        loading: e.searchActive && e.searching,
        htmlAttrs: {
          "aria-label": w("data.search.ariaLabel"),
          "aria-haspopup": "dialog",
          "aria-expanded": e.filtersOpen,
          "aria-controls": l
        },
        onChange: (k) => e.onSearchInput(k ?? ""),
        onKeydown: b
      }, {
        // Clear button (×) — a custom node must go through the suffix
        // slot (the `suffix` prop is text-only). Hidden while loading.
        suffix: () => e.searchActive && !e.searching && d.search ? n("button", {
          type: "button",
          class: "cubo-data__search-clear",
          "aria-label": w("data.search.clear"),
          onMousedown: (k) => k.preventDefault(),
          onClick: () => e.onClearSearch()
        }, [n(M, {
          icon: "x",
          size: 14
        }, null)]) : null
      }), e.filtersOpen ? n("div", {
        class: "cubo-data__filters-pop",
        "data-search": o.value || void 0,
        id: l,
        role: o.value ? "listbox" : "dialog",
        "aria-label": o.value ? w("data.search.resultsAriaLabel") : w("data.filters.popAriaLabel")
      }, [o.value ? n("div", {
        class: "cubo-data__search-results",
        ref: c
      }, [e.searching ? n("div", {
        class: "cubo-data__search-status"
      }, [n(Ae, {
        size: 16,
        "aria-hidden": "true"
      }, null), n("span", null, [w("data.search.searching")])]) : e.searchItems.length ? e.searchItems.map((k, z) => n("button", {
        key: k.id,
        type: "button",
        role: "option",
        "aria-selected": z === r.value,
        class: "cubo-data__search-result",
        "data-active": z === r.value || void 0,
        onMouseenter: () => r.value = z,
        onMousedown: (x) => x.preventDefault(),
        onClick: () => s(k.row)
      }, [n("span", {
        class: "cubo-data__search-result-title"
      }, [k.title]), k.subtitle ? n("span", {
        class: "cubo-data__search-result-sub"
      }, [k.subtitle]) : null])) : n("div", {
        class: "cubo-data__search-status"
      }, [w("data.search.noResults")])]) : n(au, C, null)]) : null]) : null, e.toolbarExtra ? n("div", {
        class: "cubo-data__toolbar-extra"
      }, [ne(e.toolbarExtra())]) : null, T > 0 && e.dirty ? n(ie, {
        size: v,
        ghost: !0,
        class: "cubo-data__clear-btn",
        htmlAttrs: {
          "aria-label": w("data.filters.clearCount", {
            count: T
          }),
          title: w("data.filters.clearTitle")
        },
        onClick: () => t("clearFilters")
      }, {
        default: () => [n(M, {
          icon: "filter-off",
          size: 16
        }, null), n("span", null, [w("data.filters.clearLabel")]), n("sup", {
          class: "cubo-data__clear-count"
        }, [T])]
      }) : null, e.searchable ? null : n(ie, {
        size: v,
        ghost: !0,
        class: "cubo-data__filter-btn",
        "data-active": e.filtersOpen || void 0,
        htmlAttrs: {
          "aria-expanded": e.filtersOpen
        },
        onClick: () => t("setFiltersOpen", !e.filtersOpen)
      }, {
        default: () => [n(M, {
          icon: "filter",
          size: 16
        }, null), n("span", null, [w("data.filters.toggle")]), T > 0 ? n(Ge, {
          size: "small",
          color: "primary"
        }, gc(T) ? T : {
          default: () => [T]
        }) : null]
      }), n("div", {
        class: "cubo-data__spacer"
      }, null), m.length > 0 ? n("div", {
        class: "cubo-data__group"
      }, [n(je, {
        size: v,
        clearable: !A,
        searchable: !0,
        value: A ? e.pipelineFieldKey ?? void 0 : d.group ?? void 0,
        placeholder: w(A ? "data.group.pipelinePlaceholder" : "data.group.placeholder"),
        variants: m.map((k) => ({
          label: k.label,
          // The select value is the field's groupKey (groupKey ?? key) —
          // that's what `query.group` stores.
          value: qt(k),
          // Pipeline columns require a `select` field with options.
          disabled: A && !qn(k)
        })),
        onChange: (k) => t("patch", {
          group: k ?? null
        })
      }, null)]) : null, d.view === "table" ? n("div", {
        class: "cubo-data__columns-btn"
      }, [n(Jn, {
        visible: e.columnsOpen,
        position: "bottom_right",
        onSetVisible: (k) => t("toggleColumnsPanel", k)
      }, {
        default: () => n(ie, {
          size: v,
          ghost: !0,
          htmlAttrs: {
            "aria-label": w("data.columns.ariaLabel"),
            "aria-haspopup": "dialog",
            "aria-expanded": e.columnsOpen
          }
        }, {
          default: () => [n(M, {
            icon: "columns-3",
            size: 16
          }, null), n("span", null, [w("data.columns.label")])]
        }),
        content: () => n("div", {
          class: "cubo-data__columns-menu"
        }, [n(nu, {
          allColumns: e.allColumns,
          columns: d.columns,
          size: v,
          onToggleColumn: e.onToggleColumn,
          onReorderColumns: e.onReorderColumns
        }, null)])
      })]) : null, y.length > 1 ? n("div", {
        class: "cubo-data__views"
      }, [n(yn, {
        value: d.view,
        buttons: y.map((k) => ({
          value: k,
          label: () => n(M, {
            icon: hc[k],
            size: 16,
            title: p[k]
          }, null),
          props: {
            size: v,
            htmlAttrs: {
              "aria-label": p[k]
            }
          }
        })),
        onChange: (k) => t("patch", {
          view: k
        })
      }, null)]) : null]);
    };
  }
});
function al(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ce(e);
}
const yt = "preset", mt = "view", wc = ["table", "cards", "pipeline"], ll = {
  text: "text",
  number: "number",
  boolean: "switch",
  date: "date",
  timestamp: "date",
  select: "select",
  multiselect: "multiselect"
};
function Cc() {
  try {
    return {
      route: Hn(),
      router: wl()
    };
  } catch {
    return {
      route: void 0,
      router: void 0
    };
  }
}
const pc = /* @__PURE__ */ N({
  name: "CuboData",
  inheritAttrs: !1,
  props: {
    fields: {
      type: Array,
      required: !0
    },
    rows: {
      type: Array,
      required: !0
    },
    rowKey: {
      type: [String, Function],
      default: "id"
    },
    views: {
      type: Array,
      default: void 0
    },
    defaultView: {
      type: String,
      default: void 0
    },
    columns: {
      type: Array,
      default: void 0
    },
    pipelineField: {
      type: String,
      default: void 0
    },
    cardTitleField: {
      type: String,
      default: void 0
    },
    cardFields: {
      type: Array,
      default: void 0
    },
    renderCard: {
      type: Function,
      default: void 0
    },
    renderDetail: {
      type: Function,
      default: void 0
    },
    onDetailSubmit: {
      type: Function,
      default: void 0
    },
    onRowChange: {
      type: Function,
      default: void 0
    },
    sort: {
      type: Object,
      default: void 0
    },
    onSortChange: {
      type: Function,
      default: void 0
    },
    detailMode: {
      type: String,
      default: "modal"
    },
    detailRoute: {
      type: Function,
      default: void 0
    },
    detailTimeline: {
      type: Function,
      default: void 0
    },
    addButton: {
      type: Function,
      default: void 0
    },
    onCreate: {
      type: Function,
      default: void 0
    },
    presets: {
      type: Array,
      default: () => []
    },
    query: {
      type: Object,
      default: void 0
    },
    urlSync: {
      type: Boolean,
      default: !0
    },
    urlKey: {
      type: String,
      default: "filters"
    },
    searchDebounce: {
      type: Number,
      default: 300
    },
    size: {
      type: String,
      default: "medium"
    },
    table: {
      type: Object,
      default: void 0
    },
    // `undefined` (not `false`) when absent, so CuboData can fall back to its own
    // internal loading flag while a Promise-returning `onFetch` is pending.
    loading: {
      type: Boolean,
      default: void 0
    },
    searchable: {
      type: Boolean,
      default: !0
    },
    showFiltersPopup: {
      type: Boolean,
      default: !0
    },
    toolbarExtra: {
      type: Function,
      default: void 0
    },
    language: {
      type: String,
      default: void 0
    },
    // Listener-presence gates. These names map to declared emits, so Vue strips
    // them from `attrs` — they are observable only as declared props (emit()
    // still dispatches to a listener captured as a prop).
    onFetch: {
      type: Function,
      default: void 0
    },
    groupsOrder: {
      type: Function,
      default: void 0
    },
    defaultFilters: {
      type: Object,
      default: void 0
    },
    onPresetCreate: {
      type: Function,
      default: void 0
    },
    // The panel needs to KNOW a sort listener exists to enable the drag handle,
    // so this is declared as a prop (Vue strips it from `attrs` once it maps to
    // the `sortViews` emit) and forwarded straight through to the panel.
    onSortViews: {
      type: Function,
      default: void 0
    },
    onCardMove: {
      type: Function,
      default: void 0
    },
    // Quick-find: `onSearch` is a declared prop (its listener maps to the
    // `search` emit, so Vue strips it from attrs) used as the presence gate.
    onSearch: {
      type: Function,
      default: void 0
    },
    searchResults: {
      type: Array,
      default: void 0
    },
    searching: {
      type: Boolean,
      default: !1
    }
  },
  emits: {
    queryChange: (e) => !0,
    cardMove: (e) => !0,
    rowOpen: (e) => !0,
    presetCreate: (e) => !0,
    presetUpdate: (e) => !0,
    presetDelete: (e) => !0,
    sortViews: (e) => !0,
    fetch: (e) => !0,
    filtersClear: () => !0,
    search: (e, t) => !0
  },
  setup(e, {
    emit: t,
    slots: a,
    attrs: l
  }) {
    const u = _e(() => e.language), i = ct(), o = O(() => e.views ?? wc), r = O(() => e.defaultView ?? o.value[0] ?? "table"), c = O(() => e.query !== void 0), {
      route: s,
      router: b
    } = Cc(), d = !!b && !!s, f = O(() => !!e.onFetch), y = O(() => !!e.onSearch), v = O(() => !!e.onCardMove), g = O(() => e.presets), w = O(() => ({
      preset: yt,
      data: e.urlKey,
      view: mt
    })), p = O(() => {
      var S;
      return ((S = e.table) == null ? void 0 : S.saveColumnsStateToLocalStorage) ?? !0;
    }), T = O(() => {
      var S;
      return ((S = e.defaultFilters) == null ? void 0 : S.filters) ?? [];
    }), A = E((() => {
      if (c.value) return e.query;
      const S = e.urlSync && d ? Ot(re(), w.value, e.presets, r.value) : e.urlSync && typeof window < "u" ? Ot(window.location.search, w.value, e.presets, r.value) : Nt(r.value);
      if (p.value && S.columns == null) {
        const L = wi(Ia());
        L && (S.columns = L);
      }
      return S;
    })()), m = O(() => {
      const S = c.value ? e.query : A.value;
      return o.value.includes(S.view) ? S : {
        ...S,
        view: o.value[0] ?? "table"
      };
    }), C = O(() => {
      var S;
      return (S = e.table) == null ? void 0 : S.pagination;
    }), k = O(() => {
      var S;
      return (S = C.value) == null ? void 0 : S.component;
    }), z = O(() => C.value != null), x = E((() => {
      var j;
      if (!e.urlSync) return;
      const S = d && typeof ((j = s.query) == null ? void 0 : j.limit) == "string" ? s.query.limit : typeof window < "u" ? new URLSearchParams(window.location.search).get("limit") : null, L = Math.floor(Number(S));
      return Number.isFinite(L) && L > 0 ? L : void 0;
    })()), R = O(() => {
      var S;
      return x.value ?? ((S = k.value) == null ? void 0 : S.pageSize) ?? 20;
    }), U = O(() => {
      var S;
      return (S = k.value) == null ? void 0 : S.current;
    }), B = O(() => {
      var S;
      return ((S = k.value) == null ? void 0 : S.total) != null;
    }), h = O(() => {
      var S;
      return (S = C.value) == null ? void 0 : S.summary;
    }), _ = O(() => {
      var S;
      return ((S = e.table) == null ? void 0 : S.showDetailOnRowClick) ?? !0;
    }), D = E((() => {
      var j;
      if (!e.urlSync) return 1;
      const S = d && typeof ((j = s.query) == null ? void 0 : j.page) == "string" ? s.query.page : typeof window < "u" ? new URLSearchParams(window.location.search).get("page") : null, L = Math.floor(Number(S));
      return Number.isFinite(L) && L >= 1 ? L : 1;
    })()), F = O(() => U.value ?? D.value), H = O(() => z.value && m.value.view === "table" && m.value.group == null);
    let X = !c.value && A.value.preset != null && !e.presets.some((S) => S.id === A.value.preset);
    Q(() => e.query, (S) => {
      c.value && S && (A.value = S);
    });
    function re() {
      var Ye, we, Qe;
      const S = new URLSearchParams(), L = (Ye = s.query) == null ? void 0 : Ye[yt], j = (we = s.query) == null ? void 0 : we[e.urlKey], ue = (Qe = s.query) == null ? void 0 : Qe[mt];
      typeof L == "string" && L && S.set(yt, L), typeof j == "string" && j && S.set(e.urlKey, j), typeof ue == "string" && ue && S.set(mt, ue);
      const ve = S.toString();
      return ve ? `?${ve}` : "";
    }
    const ae = (S, L) => {
      if (!e.urlSync) return;
      const j = H.value ? String(L ?? F.value) : void 0, ue = H.value ? String(R.value) : void 0, ve = S.group != null && Ze.value.size > 0 ? [...Ze.value].join(",") : void 0;
      if (d) {
        const vt = Fa("", w.value, S, g.value, r.value), Et = new URLSearchParams(vt.startsWith("?") ? vt.slice(1) : vt);
        b.replace({
          query: {
            ...s.query,
            [yt]: Et.get(yt) || void 0,
            [e.urlKey]: Et.get(e.urlKey) || void 0,
            [mt]: Et.get(mt) || void 0,
            page: j,
            limit: ue,
            expanded: ve
          }
        });
        return;
      }
      if (typeof window > "u") return;
      const Ye = Fa(window.location.search, w.value, S, g.value, r.value), we = new URLSearchParams(Ye.startsWith("?") ? Ye.slice(1) : Ye);
      we.delete("page"), we.delete("limit"), we.delete("expanded"), j && we.set("page", j), ue && we.set("limit", ue), ve && we.set("expanded", ve);
      const Qe = we.toString(), wn = Qe ? `?${Qe}` : "", Dt = window.location.pathname;
      try {
        window.history.replaceState(window.history.state, "", Dt + wn + window.location.hash);
      } catch {
      }
    }, I = (S) => {
      X = !1, c.value || (A.value = S), t("queryChange", S), ae(S);
    }, P = (S) => {
      I({
        ...m.value,
        ...S
      });
    }, V = () => {
      c.value || (X = !1, A.value = Ot(window.location.search, w.value, g.value, r.value));
    };
    d && Q(() => {
      var S, L, j;
      return [(S = s.query) == null ? void 0 : S[yt], (L = s.query) == null ? void 0 : L[e.urlKey], (j = s.query) == null ? void 0 : j[mt]];
    }, () => {
      !e.urlSync || c.value || (X = !1, A.value = Ot(re(), w.value, g.value, r.value));
    }), ye(() => {
      !d && e.urlSync && typeof window < "u" && window.addEventListener("popstate", V);
    }), $e(() => {
      typeof window < "u" && window.removeEventListener("popstate", V);
    }), Q(() => m.value.columns, (S) => {
      p.value && Ci(Ia(), S);
    }), Q(() => e.presets, (S) => {
      if (!X) return;
      const L = A.value.preset;
      if (L == null || !S.some((ue) => ue.id === L)) return;
      X = !1;
      const j = d ? re() : typeof window < "u" ? window.location.search : "";
      A.value = Ot(j, w.value, S, r.value);
    });
    const K = O(() => Yr(e.fields, e.columns)), G = O(() => K.value.map((S) => S.key)), q = O(() => {
      const S = new Map(K.value.map((L) => [L.key, L]));
      return _t(G.value, m.value.columns).map((L) => S.get(L)).filter((L) => !!L);
    }), Z = O(() => Qr(e.fields, e.cardTitleField)), oe = O(() => {
      var S;
      return Jr(e.fields, (S = Z.value) == null ? void 0 : S.key, e.cardFields);
    }), de = O(() => Xr(e.fields, e.pipelineField)), me = O(() => {
      const S = m.value.group;
      if (S) {
        const L = e.fields.find((j) => qt(j) === S);
        if (L && qn(L)) return L;
      }
      return de.value;
    }), $ = O(() => {
      const S = We.value;
      return Object.keys(S).length ? e.rows.map((L) => {
        const j = S[Le(L, e.rowKey)];
        return j ? {
          ...L,
          ...j
        } : L;
      }) : e.rows;
    });
    Q(() => e.rows, () => {
      const S = We.value;
      if (!Object.keys(S).length) return;
      const L = {};
      for (const j of e.rows) {
        const ue = S[Le(j, e.rowKey)];
        ue && !Object.keys(ue).every((ve) => j[ve] === ue[ve]) && (L[Le(j, e.rowKey)] = ue);
      }
      Object.keys(L).length !== Object.keys(S).length && (We.value = L);
    });
    const Y = O(() => !!e.onSortChange), ee = O(() => Y.value ? e.sort ?? null : m.value.sort[0] ?? null), ge = (S) => {
      var L;
      Y.value ? (L = e.onSortChange) == null || L.call(e, La(ee.value ? [ee.value] : [], S)[0] ?? null) : P({
        sort: La(m.value.sort, S)
      });
    }, ce = (S, L) => {
      var ue;
      const j = Le(S, e.rowKey);
      We.value = {
        ...We.value,
        [j]: {
          ...We.value[j] ?? {},
          ...L
        }
      }, (ue = e.onRowChange) == null || ue.call(e, S, L);
    }, fe = O(() => {
      if (f.value) return $.value;
      const S = T.value.length ? Ll($.value, T.value, e.fields) : $.value, L = y.value ? {
        ...m.value,
        search: ""
      } : m.value, j = Y.value ? {
        ...L,
        sort: []
      } : L;
      return zi(S, j, e.fields);
    }), qe = (S) => {
      const L = {
        // Default filters lead the effective set so the server applies the floor.
        filters: [...T.value, ...ln(m.value)],
        sort: m.value.sort,
        group: m.value.group,
        view: m.value.view,
        search: m.value.search
      };
      return H.value && (L.page = S ?? F.value, L.limit = R.value), m.value.group != null && (L.expanded = [...Ze.value]), L;
    }, st = O(() => e.groupsOrder ? e.groupsOrder(qe()) : void 0), lt = E(0), Ve = (S) => {
      var j;
      const L = (j = e.onFetch) == null ? void 0 : j.call(e, S);
      L && typeof L.then == "function" && (lt.value += 1, Promise.resolve(L).finally(() => {
        lt.value = Math.max(0, lt.value - 1);
      }));
    }, xt = O(() => e.loading ?? lt.value > 0);
    let dt = m.value.search, At = !1;
    Q(
      () => JSON.stringify([m.value.filters, m.value.sort, m.value.group, m.value.view, m.value.preset]),
      () => {
        const S = !At;
        S || (D.value = 1, ae(m.value, 1)), At = !0, f.value && (Ve(qe(S ? void 0 : 1)), dt = m.value.search);
      },
      // Fire once on mount too so initial server data loads. Search/columns are
      // NOT in the key — toggling columns never refetches; search is debounced.
      {
        immediate: !0
      }
    );
    let Pe;
    const Te = () => {
      Pe = void 0, dt = m.value.search, D.value = 1, ae(m.value, 1), Ve(qe(1));
    };
    Q(() => [m.value.search, y.value, e.searchDebounce], () => {
      Pe && clearTimeout(Pe), !(m.value.search === dt || !f.value || y.value) && (Pe = setTimeout(Te, Math.max(0, e.searchDebounce)));
    });
    const su = () => {
      Pe && (clearTimeout(Pe), Te());
    };
    $e(() => {
      Pe && clearTimeout(Pe);
    });
    const gn = E(!1), hn = E(!1), Ze = E((() => {
      var L;
      if (!e.urlSync) return /* @__PURE__ */ new Set();
      const S = d && typeof ((L = s.query) == null ? void 0 : L.expanded) == "string" ? s.query.expanded : typeof window < "u" ? new URLSearchParams(window.location.search).get("expanded") : null;
      return S ? new Set(S.split(",").filter(Boolean)) : /* @__PURE__ */ new Set();
    })()), ft = E(null), Me = E(null), Ke = E(null), Vt = E(!1), ke = E(!1), Ie = E({}), We = E({});
    let Ut = null;
    const ta = (S) => {
      const L = new Set(Ze.value);
      L.has(S) ? L.delete(S) : L.add(S), Ze.value = L, ae(m.value), f.value && Ve(qe());
    }, na = (S) => P({
      columns: Il(G.value, m.value.columns, S)
    }), du = (S, L, j) => P({
      columns: _i(G.value, m.value.columns, S, L, j)
    }), aa = (S) => {
      const L = new Set(_t(G.value, m.value.columns)), j = S.filter((ue) => L.has(ue));
      P({
        columns: bn(G.value, j)
      });
    };
    Q(() => m.value.view, (S) => {
      S !== "table" && (hn.value = !1);
    }), Q(() => m.value.group, () => {
      Ze.value = /* @__PURE__ */ new Set();
    }), Q(() => [m.value.filters, m.value.sort, m.value.group, m.value.search], () => {
      D.value = 1;
    }), Q(() => R.value, () => {
      D.value = 1, H.value && (ae(m.value, 1), f.value && Ve(qe(1)));
    });
    const fu = (S) => {
      D.value = S, ae(m.value, S), H.value && f.value && Ve(qe(S));
    }, bu = (S) => {
      x.value = S;
    };
    Q(() => [F.value, R.value, H.value], () => {
      H.value && ae(m.value);
    });
    const Ht = (S) => {
      if (t("rowOpen", S), e.detailMode === "route" && e.detailRoute) {
        const L = e.detailRoute(S);
        d ? b.push(L) : typeof window < "u" && (L.startsWith("#") ? window.location.hash = L.slice(1) : window.location.assign(L));
        return;
      }
      e.detailMode === "modal" && (ke.value = !1, Me.value = S, Ke.value = {
        ...S
      }, Vt.value = !0);
    }, vu = O(() => {
      if (ke.value) return Object.keys(Ie.value).length > 0;
      const S = Me.value, L = Ke.value;
      if (!S || !L) return !1;
      for (const j of /* @__PURE__ */ new Set([...Object.keys(S), ...Object.keys(L)]))
        if (S[j] !== L[j]) return !0;
      return !1;
    }), bt = () => {
      Vt.value = !1, Me.value = null, Ke.value = null, ke.value = !1, Ie.value = {};
    }, la = () => {
      if (!vu.value) {
        bt();
        return;
      }
      const S = le(u.value);
      Uo({
        color: "danger",
        title: S("data.detail.discardTitle"),
        content: S("data.detail.discardBody"),
        primaryButton: S("data.detail.discardConfirm"),
        secondaryButton: S("data.detail.discardKeep"),
        language: u.value
      }).then((L) => {
        L && bt();
      });
    }, yu = (S) => {
      ke.value ? Ie.value = {
        ...Ie.value,
        ...S
      } : Ke.value && (Ke.value = {
        ...Ke.value,
        ...S
      });
    }, mu = (S) => {
      var L, j;
      if (ke.value) {
        const ue = {
          ...Ie.value,
          ...S ?? {}
        };
        (L = e.onDetailSubmit) == null || L.call(e, ue), f.value && Ve(qe());
      } else if (Me.value) {
        const ue = S ?? Ke.value ?? {}, ve = Le(Me.value, e.rowKey);
        We.value = {
          ...We.value,
          [ve]: ue
        }, (j = e.onDetailSubmit) == null || j.call(e, {
          ...Me.value,
          ...ue
        });
      }
      bt();
    }, gu = () => {
      ke.value ? Ie.value = {} : Ke.value = Me.value ? {
        ...Me.value
      } : null;
    }, hu = (S) => {
      Me.value = null, Ke.value = null, Ie.value = {
        ...S ?? {}
      }, ke.value = !0, Vt.value = !0;
    }, ua = () => {
      bt();
    }, _u = () => {
      var S;
      (S = e.onCreate) == null || S.call(e, Ie.value), bt();
    }, ia = (S, L, j) => {
      if (Ut = {
        row: S,
        fromKey: L
      }, j.dataTransfer) {
        j.dataTransfer.effectAllowed = "move";
        try {
          j.dataTransfer.setData("text/plain", Le(S, e.rowKey));
        } catch {
        }
      }
    }, oa = () => {
      Ut = null, ft.value = null;
    }, ra = (S, L, j) => {
      const ue = Ut;
      if (ft.value = null, !ue || ue.fromKey === S) return;
      const ve = {
        row: ue.row,
        fromKey: ue.fromKey,
        toKey: S,
        field: j,
        value: L
      };
      t("cardMove", ve), Ut = null;
    }, ca = O(() => e.presets.length > 0 || !!e.onPresetCreate), zt = (S) => {
      if (S == null) {
        I({
          ...Nt(m.value.view),
          view: m.value.view
        });
        return;
      }
      const L = e.presets.find((j) => j.id === S);
      L && I({
        view: L.view ?? m.value.view,
        filters: L.filters ?? [],
        sort: L.sort ?? [],
        group: L.group ?? null,
        search: L.search ?? "",
        preset: L.id,
        // A preset that doesn't define its own column layout keeps the current
        // one (the localStorage-saved / user-arranged columns) rather than
        // resetting to the default order.
        columns: L.columns ?? m.value.columns
      });
    };
    let Gt = !1;
    Q(() => e.presets, () => {
      if (Gt || c.value) return;
      const S = m.value;
      if (S.preset != null) {
        Gt = !0;
        return;
      }
      if (S.filters.length || S.sort.length || S.group != null || S.search) {
        Gt = !0;
        return;
      }
      const L = e.presets.find((j) => j.isDefault);
      L && (Gt = !0, zt(L.id));
    }, {
      immediate: !0
    });
    const wu = (S, L, j) => ({
      ...j,
      id: S,
      name: L,
      view: m.value.view,
      filters: m.value.filters,
      sort: m.value.sort,
      group: m.value.group,
      search: m.value.search,
      columns: m.value.columns
    }), sa = (S) => {
      const L = S.trim();
      if (!L) return;
      const j = `preset-${Date.now()}`;
      t("presetCreate", wu(j, L)), I({
        ...m.value,
        preset: j
      });
    }, da = (S, L) => {
      if (L.isDefault)
        for (const j of e.presets)
          j.id !== S.id && j.isDefault && t("presetUpdate", {
            ...j,
            isDefault: !1
          });
      t("presetUpdate", {
        ...S,
        ...L
      });
    }, fa = (S) => {
      S.isDefault || (t("presetDelete", S.id), m.value.preset === S.id && I({
        ...m.value,
        preset: null
      }));
    }, ba = () => {
      var S;
      zt(((S = e.presets.find((L) => L.isDefault)) == null ? void 0 : S.id) ?? null);
    }, va = O(() => e.onSortViews ? (S) => t("sortViews", S) : void 0), _n = O(() => e.presets.filter((S) => S.primary)), ya = O(() => !Ol(m.value, e.presets)), Cu = () => {
      P({
        filters: []
      }), t("filtersClear");
    }, pu = (S) => {
      P({
        search: S
      }), e.onSearch && t("search", S, {
        filters: ln(m.value),
        view: m.value.view
      });
    }, Su = () => {
      P({
        search: ""
      }), e.onSearch && t("search", "", {
        filters: ln(m.value),
        view: m.value.view
      });
    }, ku = O(() => (e.searchResults ?? []).map((S) => ({
      row: S,
      id: Le(S, e.rowKey),
      title: Z.value ? et(Z.value, S) : Le(S, e.rowKey),
      subtitle: oe.value[0] ? et(oe.value[0], S) : ""
    })));
    return () => {
      var ga, ha, _a;
      let S, L;
      const j = m.value, ue = u.value, ve = le(ue), Ye = fe.value.length === 0, we = Me.value, Qe = we && Z.value ? et(Z.value, we) : we ? ve("data.detailTitle") : "", wn = ke.value ? Ie.value : Ke.value, Dt = !ke.value && we == null ? null : {
        row: wn ?? {},
        mode: ke.value ? "create" : "update",
        title: ke.value ? ve("data.create.title") : Qe,
        change: yu,
        // hide(true) closes immediately; hide() is the GUARDED close —
        // prompts to discard when the draft is dirty.
        hide: (J) => J ? bt() : la(),
        submit: mu,
        reset: gu
      };
      let vt = null;
      we != null && (vt = n(ul, {
        size: e.size,
        language: ue,
        fields: e.fields.map((J) => ({
          key: J.key,
          label: J.label,
          type: ll[J.type],
          value: we[J.key],
          options: J.options,
          readonly: !0,
          badge: J.type === "select"
        })),
        rightContent: () => {
          var J;
          return n(Wr, {
            events: ((J = e.detailTimeline) == null ? void 0 : J.call(e, we)) ?? [],
            language: ue
          }, null);
        }
      }, null));
      const Et = ke.value ? n("div", {
        class: "cubo-data__create"
      }, [n(ul, {
        size: e.size,
        language: ue,
        fields: e.fields.map((J) => ({
          key: J.key,
          label: J.label,
          type: ll[J.type],
          value: Ie.value[J.key],
          options: J.options
          // No `badge` here: selects must render as *editable* dropdowns in
          // creation mode (a badge is display-only).
        })),
        onFieldChange: (J, Ue) => {
          Ie.value = {
            ...Ie.value,
            [J]: Ue
          };
        }
      }, null), n("div", {
        class: "cubo-data__create-actions"
      }, [n(ie, {
        size: e.size,
        ghost: !0,
        color: "neutral",
        onClick: ua
      }, al(S = ve("data.create.cancel")) ? S : {
        default: () => [S]
      }), n(ie, {
        size: e.size,
        color: "primary",
        onClick: _u
      }, al(L = ve("data.create.submit")) ? L : {
        default: () => [L]
      })])]) : null, ma = a.card ? (J) => a.card(J) : e.renderCard;
      let Tt;
      if (Ye && j.view !== "pipeline")
        Tt = n("div", {
          class: "cubo-data__empty"
        }, [n(mn, {
          icon: "database-off",
          title: ve("data.empty.title"),
          description: j.filters.length || j.search ? ve("data.empty.descriptionFiltered") : ve("data.empty.descriptionEmpty")
        }, null)]);
      else if (j.view === "table") {
        const Ue = !j.group && z.value, Re = R.value, It = B.value ? ((ga = k.value) == null ? void 0 : ga.total) ?? 0 : fe.value.length, Du = Math.max(1, Math.ceil(It / Re)), Zt = Math.min(F.value, Du), Eu = Ue && !B.value ? fe.value.slice((Zt - 1) * Re, Zt * Re) : fe.value, Cn = Ue && h.value ? h.value({
          page: Zt,
          pageSize: Re,
          total: It
        }) : null;
        Tt = n(se, null, [yc({
          rows: Eu,
          columns: q.value,
          fields: e.fields,
          query: j,
          size: e.size,
          rowKey: e.rowKey,
          expanded: Ze.value,
          groupOrder: st.value,
          sort: ee.value,
          onSort: ge,
          showDetailOnRowClick: _.value,
          onReorderColumn: du,
          onToggleGroup: ta,
          onOpen: Ht,
          onRowChange: ce
        }), Ue && (Cn != null || It > Re || (ha = k.value) != null && ha.showPageSizeSelect) ? n("div", {
          class: "cubo-data__table-foot"
        }, [Cn != null ? n("div", {
          class: "cubo-data__table-summary"
        }, [Cn]) : null, It > Re || (_a = k.value) != null && _a.showPageSizeSelect ? n(Ql, te(k.value, {
          current: Zt,
          total: It,
          pageSize: Re,
          size: e.size,
          language: ue,
          onChange: (pn) => pn.pageSize !== Re ? bu(pn.pageSize) : fu(pn.current)
        }), null) : null]) : null]);
      } else j.view === "cards" ? Tt = ec({
        rows: fe.value,
        fields: e.fields,
        query: j,
        size: e.size,
        rowKey: e.rowKey,
        titleField: Z.value,
        bodyFields: oe.value,
        expanded: Ze.value,
        groupOrder: st.value,
        dragOverKey: ft.value,
        canMove: v.value,
        renderCard: ma,
        onToggleGroup: ta,
        onOpen: Ht,
        onRowChange: ce,
        onDragStart: ia,
        onDragEnd: oa,
        onDragOverGroup: (J) => ft.value = J,
        onDropGroup: (J, Ue) => ra(J, Ue, j.group ?? void 0)
      }) : Tt = bc({
        rows: fe.value,
        fields: e.fields,
        size: e.size,
        lang: ue,
        rowKey: e.rowKey,
        pipelineField: me.value,
        titleField: Z.value,
        bodyFields: oe.value,
        groupOrder: st.value,
        dragOverKey: ft.value,
        canMove: v.value,
        renderCard: ma,
        onOpen: Ht,
        onRowChange: ce,
        onDragStart: ia,
        onDragEnd: oa,
        onDragOverColumn: (J) => ft.value = J,
        onDropColumn: (J, Ue) => {
          var Re;
          return ra(J, Ue, (Re = me.value) == null ? void 0 : Re.key);
        }
      });
      const {
        class: xu,
        style: Au,
        ...zu
      } = l;
      return n("div", te(zu, {
        class: W("cubo-data", xu),
        style: [Au, i.value ? {
          "--cubo-config-bg": i.value
        } : void 0],
        "data-size": e.size,
        "data-view": j.view
      }), [_n.value.length > 0 ? n(Qn, {
        class: "cubo-data__tabs",
        active: j.preset && _n.value.some((J) => J.id === j.preset) ? j.preset : void 0,
        tabs: _n.value.map((J) => ({
          id: J.id,
          label: () => n("span", {
            class: "cubo-data__tab"
          }, [J.color ? n("span", {
            class: "cubo-data__dot",
            style: {
              backgroundColor: J.color
            }
          }, null) : null, J.name])
        })),
        onChange: (J) => zt(J)
      }, null) : null, n(_c, {
        query: j,
        fields: e.fields,
        views: o.value,
        size: e.size,
        lang: ue,
        searchable: e.searchable,
        showFiltersPopup: e.showFiltersPopup,
        toolbarExtra: e.toolbarExtra,
        addButton: e.addButton ? () => e.addButton({
          showDetail: (J) => hu(J)
        }) : void 0,
        allColumns: K.value,
        pipelineFieldKey: me.value ? qt(me.value) : void 0,
        presets: e.presets,
        dirty: ya.value,
        filtersOpen: gn.value,
        canManagePresets: ca.value,
        columnsOpen: hn.value,
        onPatch: P,
        onClearFilters: Cu,
        onSetFiltersOpen: (J) => gn.value = J,
        searchActive: y.value,
        searching: e.searching,
        searchItems: ku.value,
        onSearchInput: pu,
        onApplySearch: su,
        onClearSearch: Su,
        onOpenResult: (J) => Ht(J),
        onToggleColumn: na,
        onReorderColumns: aa,
        activePresetId: j.preset,
        onSelectPreset: zt,
        onEditPreset: da,
        onDeletePreset: fa,
        onCreatePreset: sa,
        onResetToDefault: ba,
        onSortViews: va.value,
        onToggleColumnsPanel: (J) => hn.value = J
      }, null), !e.searchable && gn.value ? n(au, {
        query: j,
        fields: e.fields,
        size: e.size,
        lang: ue,
        onPatch: P,
        presets: e.presets,
        activePresetId: j.preset,
        dirty: ya.value,
        canManagePresets: ca.value,
        onSelectPreset: zt,
        onEditPreset: da,
        onDeletePreset: fa,
        onCreatePreset: sa,
        onResetToDefault: ba,
        onSortViews: va.value,
        views: o.value,
        allColumns: K.value,
        onToggleColumn: na,
        onReorderColumns: aa
      }, null) : null, n("div", {
        class: "cubo-data__view"
      }, [Tt, xt.value ? n("div", {
        class: "cubo-data__loading"
      }, [n(Ae, {
        size: 32,
        "aria-hidden": "true"
      }, null)]) : null]), n("div", {
        role: "status",
        class: "cubo-visually-hidden"
      }, [xt.value ? ve("data.status.loading") : ve("data.status.resultCount", {
        count: fe.value.length
      })]), a.detail || e.renderDetail ? Dt ? a.detail ? a.detail(Dt) : e.renderDetail(Dt) : null : e.detailMode === "modal" || ke.value ? n(Kt, {
        visible: Vt.value,
        header: ke.value ? ve("data.create.title") : Qe,
        content: () => ke.value ? Et : vt,
        onSetVisible: (J) => {
          J || (ke.value ? ua() : la());
        }
      }, null) : null]);
    };
  }
}), Sc = pc;
function kc(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ce(e);
}
const Tn = je, xc = Mt, Ac = Sc, zc = (e, t) => {
  if (e == null || e === "") return "";
  const a = e instanceof Date ? e : new Date(e);
  return Number.isNaN(a.getTime()) ? "" : new Intl.DateTimeFormat(t, {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(a);
};
function Dc(e, t, a) {
  var u, i, o, r;
  const l = e.value;
  switch (e.type) {
    case "date":
      return zc(l, a);
    case "switch":
      return l ? le(t)("card.yes") : le(t)("card.no");
    case "select":
      return ((i = (u = e.options) == null ? void 0 : u.find((c) => c.value === l)) == null ? void 0 : i.label) ?? (l == null ? "" : String(l));
    case "multiselect":
      return (Array.isArray(l) ? l : []).map((s) => {
        var b, d;
        return ((d = (b = e.options) == null ? void 0 : b.find((f) => f.value === s)) == null ? void 0 : d.label) ?? String(s);
      }).join(", ");
    case "user":
      return ((r = (o = e.users) == null ? void 0 : o.find((c) => c.id === l)) == null ? void 0 : r.name) ?? (l == null ? "" : String(l));
    default:
      return l == null ? "" : String(l);
  }
}
const lu = 300, Ec = /* @__PURE__ */ N({
  name: "CuboCardInlineText",
  props: {
    field: {
      type: Object,
      required: !0
    },
    size: {
      type: String,
      default: "medium"
    },
    onCommit: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    const t = () => e.field.type === "number", a = (c) => c ?? (t() ? null : ""), l = E(a(e.field.value)), u = E(!1);
    let i = null;
    Q(() => e.field.value, (c) => {
      u.value || (l.value = a(c));
    }), Se(() => i != null && clearTimeout(i));
    const o = (c) => {
      c !== a(e.field.value) && e.onCommit(t() ? c : c ?? "");
    }, r = (c) => {
      l.value = c, i != null && clearTimeout(i), i = setTimeout(() => o(c), lu);
    };
    return () => n(pe, {
      class: "cubo-card__control",
      htmlType: t() ? "number" : "text",
      value: l.value,
      size: e.size,
      readonly: e.field.readonly,
      placeholder: e.field.placeholder,
      htmlAttrs: {
        "aria-label": e.field.label
      },
      onChange: r,
      onFocus: () => u.value = !0,
      onBlur: () => {
        u.value = !1, i != null && clearTimeout(i), o(l.value), l.value = a(e.field.value);
      },
      onEnter: (c) => c.currentTarget.blur()
    }, null);
  }
}), Tc = /* @__PURE__ */ N({
  name: "CuboCardInlineTextarea",
  props: {
    field: {
      type: Object,
      required: !0
    },
    size: {
      type: String,
      default: "medium"
    },
    onCommit: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    const t = E(e.field.value ?? ""), a = E(!1);
    let l = null;
    Q(() => e.field.value, (o) => {
      a.value || (t.value = o ?? "");
    }), Se(() => l != null && clearTimeout(l));
    const u = (o) => {
      o !== (e.field.value ?? "") && e.onCommit(o);
    }, i = (o) => {
      t.value = o, l != null && clearTimeout(l), l = setTimeout(() => u(o), lu);
    };
    return () => n(Vl, {
      class: "cubo-card__control",
      value: t.value,
      size: e.size,
      readonly: e.field.readonly,
      autosize: !0,
      rows: 2,
      placeholder: e.field.placeholder,
      htmlAttrs: {
        "aria-label": e.field.label
      },
      onChange: i,
      onFocus: () => a.value = !0,
      onBlur: () => {
        a.value = !1, l != null && clearTimeout(l), u(t.value);
      }
    }, null);
  }
});
function Ic(e, t) {
  return e === t ? !0 : Array.isArray(e) && Array.isArray(t) ? e.length === t.length && e.every((a, l) => a === t[l]) : !1;
}
function Lc(e, t, a, l, u) {
  var r;
  const i = le(a);
  if (e.render) return n("span", {
    class: "cubo-card__static"
  }, [e.render(e.value)]);
  const o = (c) => {
    Ic(c, e.value) || u(c);
  };
  if (e.badge && (e.type === "select" || e.type === "multiselect")) {
    const c = (r = e.options) == null ? void 0 : r.find((s) => s.value === e.value);
    return c ? n(Ge, {
      color: c.color ?? "neutral",
      ghost: !0,
      size: t
    }, {
      default: () => [c.label]
    }) : n("span", {
      class: "cubo-card__static cubo-card__static--empty"
    }, [i("card.empty")]);
  }
  if (e.readonly && e.type !== "switch") {
    const c = Dc(e, a, l);
    return n("span", {
      class: W("cubo-card__static", !c && "cubo-card__static--empty")
    }, [c || i("card.empty")]);
  }
  switch (e.type) {
    case "textarea":
      return n(Tc, {
        field: e,
        size: t,
        onCommit: u
      }, null);
    case "switch":
      return n(sn, {
        value: !!e.value,
        size: t,
        disabled: e.readonly,
        "aria-label": e.label,
        onChange: (c) => o(c)
      }, null);
    case "select":
      return n(Tn, {
        class: "cubo-card__control",
        value: e.value,
        variants: e.options ?? [],
        size: t,
        clearable: !0,
        searchable: !0,
        placeholder: e.placeholder,
        "aria-label": e.label,
        onChange: (c) => o(c)
      }, null);
    case "multiselect":
      return n(Tn, {
        class: "cubo-card__control",
        multiple: !0,
        value: e.value ?? [],
        variants: e.options ?? [],
        size: t,
        searchable: !0,
        placeholder: e.placeholder,
        "aria-label": e.label,
        onChange: (c) => o(c)
      }, null);
    case "user":
      return n(Tn, {
        class: "cubo-card__control",
        value: e.value,
        variants: (e.users ?? []).map((c) => ({
          label: c.name,
          value: c.id
        })),
        size: t,
        clearable: !0,
        searchable: !0,
        placeholder: e.placeholder ?? i("card.chooseUser"),
        "aria-label": e.label,
        onChange: (c) => o(c)
      }, null);
    case "date":
      return n(xc, {
        class: "cubo-card__control",
        value: e.value != null ? new Date(e.value) : void 0,
        size: t,
        clearable: !0,
        "aria-label": e.label,
        onChange: (c) => o(c ? c.getTime() : void 0)
      }, null);
    default:
      return n(Ec, {
        field: e,
        size: t,
        onCommit: u
      }, null);
  }
}
const uu = /* @__PURE__ */ N({
  name: "CuboCard",
  props: {
    title: {
      type: [String, Object, Function],
      default: void 0
    },
    subtitle: {
      type: [String, Object, Function],
      default: void 0
    },
    media: {
      type: [String, Object, Function],
      default: void 0
    },
    actions: {
      type: [String, Object, Function],
      default: void 0
    },
    tabs: {
      type: Array,
      default: void 0
    },
    fields: {
      type: Array,
      default: void 0
    },
    groups: {
      type: Array,
      default: void 0
    },
    relations: {
      type: Array,
      default: void 0
    },
    rightContent: {
      type: [String, Object, Function],
      default: void 0
    },
    saving: {
      type: [Boolean, Array],
      default: !1
    },
    labelWidth: {
      type: String,
      default: "10rem"
    },
    size: {
      type: String,
      default: "medium"
    },
    language: {
      type: String,
      default: void 0
    },
    locale: {
      type: String,
      default: void 0
    }
  },
  emits: {
    fieldChange: (e, t) => !0,
    entityClick: (e, t) => !0,
    entityDetach: (e, t) => !0,
    entityAttach: (e, t) => !0
  },
  setup(e, {
    emit: t,
    slots: a
  }) {
    var d, f;
    const l = _e(() => e.language), u = E((f = (d = e.tabs) == null ? void 0 : d[0]) == null ? void 0 : f.key), i = Ru({}), o = E(null), r = E(null), c = E(null), s = E(!1);
    let b = null;
    return ye(() => {
      const y = c.value;
      !y || typeof ResizeObserver > "u" || (b = new ResizeObserver((v) => s.value = v[0].contentRect.width < 704), b.observe(y));
    }), Se(() => b == null ? void 0 : b.disconnect()), () => {
      var V, K, G, q, Z, oe, de, me;
      const y = l.value, v = le(y), g = !!((V = e.tabs) != null && V.length), w = (ne(e.rightContent) ?? ((K = a.rightContent) == null ? void 0 : K.call(a))) != null, p = e.saving === !0 || Array.isArray(e.saving) && e.saving.length > 0, T = ($) => (Y) => t("fieldChange", $, Y), A = ($) => {
        const Y = $.type === "textarea", ee = $.type === "switch" || $.badge && ($.type === "select" || $.type === "multiselect");
        return n("div", {
          class: "cubo-card__row",
          key: $.key,
          "data-multiline": Y || void 0
        }, [n("span", {
          class: "cubo-card__row-label",
          title: $.label
        }, [$.label]), n("span", {
          class: "cubo-card__row-value",
          "data-align": ee ? "start" : void 0
        }, [Lc($, e.size, y, e.locale, T($.key))])]);
      }, m = ($) => {
        $.key in i || (i[$.key] = !$.collapsed);
        const Y = i[$.key];
        return n(rr, {
          class: "cubo-card__group",
          key: $.key,
          label: $.label,
          icon: $.icon,
          expanded: Y,
          onToggle: (ee) => i[$.key] = ee
        }, {
          default: () => [n("div", {
            class: "cubo-card__fields"
          }, [$.fields.map(A)])]
        });
      }, C = ($, Y) => {
        var ee;
        t("entityClick", $, Y), (ee = $.fields) != null && ee.length && (r.value = $);
      }, k = ($) => {
        const Y = $.attachable != null, ee = $.kind ?? "one", ge = $.entities.length === 0, ce = Y && (ee === "many" || ge);
        return n("div", {
          class: "cubo-card__row cubo-card__row--relation",
          key: $.key
        }, [n("span", {
          class: "cubo-card__row-label",
          title: $.label
        }, [$.label]), n("span", {
          class: "cubo-card__row-value cubo-card__entities",
          "data-kind": ee
        }, [ge && !ce ? n("span", {
          class: "cubo-card__static cubo-card__static--empty"
        }, [$.emptyText ?? v("card.empty")]) : null, $.entities.map((fe) => n("div", {
          class: "cubo-card__entity",
          key: fe.id
        }, [n("button", {
          type: "button",
          class: "cubo-card__entity-main",
          onClick: () => C(fe, $)
        }, [fe.avatar != null || fe.icon == null ? n(it, {
          user: {
            id: fe.id,
            name: fe.label,
            avatar: fe.avatar
          },
          size: 28
        }, null) : n("span", {
          class: "cubo-card__entity-icon"
        }, [n(M, {
          icon: fe.icon,
          size: 18
        }, null)]), n("span", {
          class: "cubo-card__entity-text"
        }, [n("span", {
          class: "cubo-card__entity-label"
        }, [fe.label]), fe.description ? n("span", {
          class: "cubo-card__entity-desc"
        }, [fe.description]) : null])]), Y ? n("button", {
          type: "button",
          class: "cubo-card__entity-detach",
          "aria-label": v("card.detach"),
          onClick: () => t("entityDetach", fe, $)
        }, [n(M, {
          icon: "x",
          size: 16
        }, null)]) : null])), ce ? n("button", {
          type: "button",
          class: "cubo-card__attach",
          onClick: () => o.value = $.key
        }, [n(M, {
          icon: "plus",
          size: 15
        }, null), n("span", null, [$.attachLabel ?? v("card.attachLabel", {
          label: $.label.toLowerCase()
        })])]) : null])]);
      }, z = ($, Y, ee) => n("div", {
        class: "cubo-card__fields"
      }, [($ ?? []).map(A), (Y ?? []).map(m), (ee ?? []).map(k)]), x = ne(e.rightContent) ?? ((G = a.rightContent) == null ? void 0 : G.call(a)), R = ($) => ({
        id: $.key,
        label: $.label,
        content: () => z($.fields, $.groups, $.relations)
      });
      let U = null;
      s.value && w ? U = [...g ? (e.tabs ?? []).map(R) : [{
        id: "__main",
        label: v("card.mainTab"),
        content: () => z(e.fields, e.groups, e.relations)
      }], {
        id: "__timeline",
        label: v("card.timelineTab"),
        content: () => x
      }] : g && (U = (e.tabs ?? []).map(R));
      const B = U ? u.value && U.some(($) => $.id === u.value) ? u.value : (q = U[0]) == null ? void 0 : q.id : void 0, h = w && !s.value, _ = U ? n(Qn, {
        class: "cubo-card__tabs",
        tabs: U,
        active: B,
        onChange: ($) => u.value = $
      }, null) : z(e.fields, e.groups, e.relations), D = ne(e.title) ?? ((Z = a.title) == null ? void 0 : Z.call(a)), F = ne(e.subtitle) ?? ((oe = a.subtitle) == null ? void 0 : oe.call(a)), H = ne(e.media) ?? ((de = a.media) == null ? void 0 : de.call(a)), X = ne(e.actions) ?? ((me = a.actions) == null ? void 0 : me.call(a)), re = D != null || H != null || X != null, ae = [...e.relations ?? [], ...(e.tabs ?? []).flatMap(($) => $.relations ?? [])], I = o.value ? ae.find(($) => $.key === o.value) ?? null : null, P = ($) => {
        const Y = new Set($.entities.map((ce) => ce.id)), ee = ($.attachable ?? []).filter((ce) => !Y.has(ce.id)).map((ce) => ({
          id: ce.id,
          label: ce.label,
          description: ce.description ?? "",
          __entity: ce
        })), ge = (ce) => {
          t("entityAttach", ce, $), ($.kind ?? "one") === "one" && (o.value = null);
        };
        return ee.length === 0 ? n("p", {
          class: "cubo-card__attach-empty"
        }, [v("card.attachEmpty")]) : n("div", {
          class: "cubo-card__attach-picker"
        }, [n(Ac, {
          fields: [{
            key: "label",
            label: v("card.attachColName"),
            type: "text"
          }, {
            key: "description",
            label: v("card.attachColDetail"),
            type: "text"
          }],
          rows: ee,
          views: ["cards"],
          defaultView: "cards",
          renderCard: ({
            row: ce
          }) => {
            let fe;
            return n("div", {
              class: "cubo-card__attach-card"
            }, [n("span", {
              class: "cubo-card__entity-text"
            }, [n("span", {
              class: "cubo-card__entity-label"
            }, [ce.label]), ce.description ? n("span", {
              class: "cubo-card__entity-desc"
            }, [ce.description]) : null]), n(ie, {
              size: "small",
              onClick: () => ge(ce.__entity)
            }, kc(fe = v("card.add")) ? fe : {
              default: () => [fe]
            })]);
          }
        }, null)]);
      };
      return n("div", {
        ref: c,
        class: W("cubo-card"),
        "data-size": e.size,
        "data-split": h ? "true" : void 0,
        style: {
          "--cubo-card-label-width": e.labelWidth
        }
      }, [re && n("header", {
        class: "cubo-card__header"
      }, [H != null && n("span", {
        class: "cubo-card__media"
      }, [H]), n("span", {
        class: "cubo-card__heading"
      }, [D != null && n("span", {
        class: "cubo-card__title"
      }, [D]), F != null && n("span", {
        class: "cubo-card__subtitle"
      }, [F])]), n("span", {
        class: "cubo-card__header-actions"
      }, [n("span", {
        class: "cubo-card__saving",
        role: "status",
        "aria-live": "polite",
        "data-active": p || void 0
      }, [p ? n(se, null, [n(Ae, {
        size: 14,
        "aria-hidden": !0,
        label: ""
      }, null), n("span", null, [v("card.saving")])]) : null]), X])]), n("div", {
        class: "cubo-card__body"
      }, [n("div", {
        class: "cubo-card__main"
      }, [_]), h && n("aside", {
        class: "cubo-card__aside"
      }, [x])]), I ? n(Kt, {
        visible: !0,
        header: I.attachLabel ?? v("card.attachLabel", {
          label: I.label.toLowerCase()
        }),
        content: () => P(I),
        onSetVisible: ($) => {
          $ || (o.value = null);
        }
      }, null) : null, r.value ? n(Kt, {
        visible: !0,
        header: r.value.label,
        content: () => n(uu, {
          class: "cubo-card--detail",
          size: "small",
          fields: r.value.fields
        }, null),
        onSetVisible: ($) => {
          $ || (r.value = null);
        }
      }, null) : null]);
    };
  }
}), ul = uu, Fc = /* @__PURE__ */ N({
  name: "CuboDrawer",
  // The render root is a <Teleport>, so Vue can't auto-inherit fallthrough
  // attrs (class/style/id/…). We forward them onto `.cubo-drawer` ourselves.
  inheritAttrs: !1,
  props: {
    container: {
      type: String,
      default: void 0
    },
    visible: {
      type: Boolean,
      default: !0
    },
    title: {
      type: [String, Object, Function],
      default: void 0
    },
    showBackground: {
      type: Boolean,
      default: !0
    },
    showCloseIcon: {
      type: Boolean,
      default: !0
    },
    closeOnBackgroundClick: {
      type: Boolean,
      default: !0
    },
    language: {
      type: String,
      default: void 0
    }
  },
  emits: {
    setVisible: (e) => !0
  },
  setup(e, {
    emit: t,
    slots: a,
    attrs: l
  }) {
    const u = _e(() => e.language), i = ct(), o = (c) => {
      e.visible && c.key === "Escape" && t("setVisible", !1);
    };
    ye(() => document.addEventListener("keydown", o));
    let r = null;
    return Q(() => e.visible, (c) => {
      c && !r ? r = zl() : !c && r && (r(), r = null);
    }, {
      immediate: !0
    }), Se(() => {
      document.removeEventListener("keydown", o), r == null || r(), r = null;
    }), () => {
      if (!e.visible) return null;
      const c = le(u.value), s = ne(e.title), {
        class: b,
        style: d,
        ...f
      } = l;
      return n(De, {
        to: Ee(e.container)
      }, {
        default: () => {
          var y, v;
          return [n("div", te(f, {
            class: W("cubo-drawer", b),
            style: [d, i.value ? {
              "--cubo-config-bg": i.value
            } : void 0],
            role: "dialog",
            "aria-modal": "true"
          }), [e.showBackground && n("div", {
            class: "cubo-drawer__backdrop",
            onClick: () => e.closeOnBackgroundClick && t("setVisible", !1)
          }, null), n("div", {
            class: "cubo-drawer__panel"
          }, [n("div", {
            class: "cubo-drawer__header"
          }, [n("div", {
            class: "cubo-drawer__title"
          }, [s ?? ((y = a.title) == null ? void 0 : y.call(a))]), e.showCloseIcon && n("button", {
            type: "button",
            class: "cubo-drawer__close",
            "aria-label": c("drawer.close"),
            onClick: () => t("setVisible", !1)
          }, [n(M, {
            icon: "x",
            size: 20
          }, null)])]), n("div", {
            class: "cubo-drawer__body"
          }, [(v = a.default) == null ? void 0 : v.call(a)])])])];
        }
      });
    };
  }
}), iu = Fc;
function il(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ce(e);
}
const Oc = 150, Bc = 500;
let Pc = 0;
function ou(e) {
  return e.searchText != null ? e.searchText : typeof e.label == "string" ? e.label : "";
}
function Xe(e) {
  return !e.divider && !e.heading && !e.disabled;
}
function gt(e) {
  return e.findIndex(Xe);
}
function ol(e) {
  for (let t = e.length - 1; t >= 0; t--)
    if (Xe(e[t])) return t;
  return -1;
}
function rl(e, t, a) {
  let l = t;
  for (; ; ) {
    const u = l + a;
    if (u < 0 || u >= e.length) return t < 0 ? gt(e) : t;
    if (l = u, Xe(e[l])) return l;
  }
}
function Rc(e, t, a) {
  const l = t.toLowerCase();
  if (!l) return -1;
  const u = a >= 0 ? a + 1 : 0, i = [];
  for (let o = u; o < e.length; o++) i.push(o);
  for (let o = 0; o < u; o++) i.push(o);
  for (const o of i) {
    const r = e[o];
    if (Xe(r) && ou(r).toLowerCase().startsWith(l))
      return o;
  }
  return -1;
}
function In(e) {
  var t;
  return (t = e == null ? void 0 : e.closest("[data-gtc-theme]")) == null ? void 0 : t.dataset.gtcTheme;
}
function Nc(e, t) {
  typeof e == "function" ? e(t) : Array.isArray(e) && e.forEach((a) => a(t));
}
const ru = /* @__PURE__ */ N({
  name: "CuboDropdownMenu",
  props: {
    items: {
      type: Array,
      required: !0
    },
    size: {
      type: String,
      default: "medium"
    },
    lang: {
      type: String,
      required: !0
    },
    menuStyle: {
      type: Object,
      default: void 0
    },
    /** Where to put focus after mount. */
    autofocus: {
      type: String,
      default: "none"
    },
    searchable: {
      type: Boolean,
      default: !1
    },
    searchPlaceholder: {
      type: String,
      default: void 0
    },
    isRoot: {
      type: Boolean,
      default: !1
    },
    menuId: {
      type: String,
      default: void 0
    },
    instanceId: {
      type: String,
      required: !0
    },
    portalTheme: {
      type: String,
      default: void 0
    }
  },
  emits: {
    leaf: (e) => !0,
    /** `returnFocus` — Esc/activate path vs Tab. */
    closeRoot: (e) => !0
  },
  setup(e, {
    emit: t
  }) {
    const a = E(null), l = E(null), u = E([]), i = E(null), o = E(""), r = O(() => {
      const h = o.value.trim().toLowerCase();
      return e.searchable && h ? e.items.filter((_) => !_.divider && !_.heading && ou(_).toLowerCase().includes(h)) : e.items;
    }), c = E(gt(r.value)), s = E(null), b = E(!1), d = E(null);
    let f = null, y = "", v = null;
    const g = (h) => {
      var _;
      h < 0 || (c.value = h, (_ = u.value[h]) == null || _.focus({
        preventScroll: !0
      }));
    };
    Q(o, () => {
      c.value = gt(r.value), s.value = null;
    }), Q(() => e.items, () => {
      const h = c.value;
      h >= 0 && h < r.value.length && Xe(r.value[h]) || (c.value = gt(r.value));
    }), ye(() => {
      var h, _, D;
      if (e.autofocus === "search")
        (h = l.value) == null || h.focus({
          preventScroll: !0
        });
      else if (e.autofocus === "first") {
        const F = gt(r.value);
        F >= 0 ? g(F) : (_ = a.value) == null || _.focus({
          preventScroll: !0
        });
      } else if (e.autofocus === "last") {
        const F = ol(r.value);
        F >= 0 ? g(F) : (D = a.value) == null || D.focus({
          preventScroll: !0
        });
      }
    });
    const w = () => {
      f && (clearTimeout(f), f = null);
    }, p = () => {
      y = "", v && (clearTimeout(v), v = null);
    };
    $e(() => {
      w(), p();
    });
    const T = (h) => {
      const _ = u.value[h];
      if (!_) return;
      const D = _.getBoundingClientRect();
      let F = D.right;
      const H = i.value, X = (H == null ? void 0 : H.offsetWidth) ?? 0;
      X > 0 && F + X > window.innerWidth && (F = D.left - X), d.value = {
        position: "fixed",
        top: `${D.top}px`,
        left: `${F}px`
      };
    };
    Q(s, async (h) => {
      h != null && (T(h), await be(), T(h));
    });
    const A = (h, _ = !1) => {
      w(), T(h), b.value = _, s.value = h, c.value = h;
    }, m = () => {
      w(), s.value = null;
    }, C = (h, _) => {
      var D;
      if (Xe(h)) {
        if ((D = h.children) != null && D.length) {
          A(_, !0);
          return;
        }
        t("leaf", h);
      }
    }, k = (h) => {
      if (h.target instanceof HTMLInputElement || h.key.length !== 1 || h.ctrlKey || h.metaKey || h.altKey) return;
      h.preventDefault(), y += h.key, v && clearTimeout(v), v = setTimeout(p, Bc);
      const _ = Rc(r.value, y, c.value);
      _ >= 0 && g(_);
    }, z = () => {
      const h = gt(r.value);
      h >= 0 && g(h);
    }, x = () => {
      const h = ol(r.value);
      h >= 0 && g(h);
    }, R = () => {
      const h = r.value[c.value];
      h && C(h, c.value);
    }, U = (h) => {
      h.key === "ArrowDown" || h.key === "Home" ? (h.preventDefault(), h.stopPropagation(), z()) : h.key === "ArrowUp" || h.key === "End" ? (h.preventDefault(), h.stopPropagation(), x()) : h.key === "Enter" ? (h.preventDefault(), h.stopPropagation(), R()) : h.key === "Escape" ? (h.preventDefault(), h.stopPropagation(), o.value ? o.value = "" : t("closeRoot", !0)) : h.key === "Tab" && t("closeRoot", !1);
    }, B = (h) => {
      var D;
      if (s.value !== null) {
        if (h.key === "ArrowLeft" || h.key === "Escape") {
          h.preventDefault(), h.stopPropagation();
          const F = s.value;
          m(), g(F);
        }
        return;
      }
      const _ = r.value;
      if (h.key === "ArrowDown")
        h.preventDefault(), g(rl(_, c.value, 1));
      else if (h.key === "ArrowUp")
        h.preventDefault(), g(rl(_, c.value, -1));
      else if (h.key === "Home")
        h.preventDefault(), z();
      else if (h.key === "End")
        h.preventDefault(), x();
      else if (h.key === "ArrowRight") {
        const F = _[c.value];
        (D = F == null ? void 0 : F.children) != null && D.length && Xe(F) && (h.preventDefault(), A(c.value, !0));
      } else h.key === "ArrowLeft" ? e.isRoot || (h.preventDefault(), h.stopPropagation(), t("closeRoot", !0)) : h.key === "Escape" ? (h.preventDefault(), e.searchable && o.value ? (h.stopPropagation(), o.value = "") : (e.isRoot || h.stopPropagation(), t("closeRoot", !0))) : h.key === "Tab" ? t("closeRoot", !1) : h.key === "Enter" || h.key === " " ? _[c.value] && (h.preventDefault(), R()) : k(h);
    };
    return () => {
      const h = le(e.lang), _ = r.value.some((D) => !!D.check);
      return n("div", {
        class: "cubo-dropdown__menu",
        "data-size": e.size,
        "data-dropdown-id": e.instanceId,
        "data-has-checks": _ || void 0,
        style: e.menuStyle
      }, [e.searchable ? n("div", {
        class: "cubo-dropdown__search"
      }, [n(M, {
        class: "cubo-dropdown__search-icon",
        icon: "search",
        size: 15
      }, null), n("input", {
        ref: l,
        class: "cubo-dropdown__search-input",
        "data-cubo-dd-search": "",
        type: "text",
        "aria-label": h("dropdown.searchLabel"),
        placeholder: e.searchPlaceholder ?? h("dropdown.searchPlaceholder"),
        value: o.value,
        onInput: (D) => o.value = D.target.value,
        onKeydown: U
      }, null)]) : null, e.searchable && r.value.length === 0 ? n("div", {
        class: "cubo-dropdown__empty"
      }, [h("dropdown.empty")]) : null, n("div", {
        ref: a,
        id: e.isRoot ? e.menuId : void 0,
        class: "cubo-dropdown__menu-list",
        role: "menu",
        tabindex: -1,
        onKeydown: B
      }, [r.value.map((D, F) => {
        var ae;
        if (D.divider)
          return n("div", {
            key: F,
            class: "cubo-dropdown__separator",
            role: "separator"
          }, null);
        if (D.heading)
          return n("div", {
            key: F,
            class: "cubo-dropdown__label",
            role: "presentation"
          }, [ne(D.label)]);
        const H = !!((ae = D.children) != null && ae.length), X = s.value === F, re = D.check === "checkbox" ? "menuitemcheckbox" : D.check === "radio" ? "menuitemradio" : "menuitem";
        return n("div", {
          key: F,
          class: "cubo-dropdown__row"
        }, [n("button", {
          ref: (I) => {
            u.value[F] = I;
          },
          type: "button",
          class: "cubo-dropdown__item",
          "data-cubo-dd-item": "",
          role: re,
          tabindex: -1,
          disabled: D.disabled || void 0,
          "aria-disabled": D.disabled || void 0,
          "aria-checked": D.check ? String(!!D.checked) : void 0,
          "aria-haspopup": H || void 0,
          "aria-expanded": H ? X : void 0,
          "data-highlighted": c.value === F || void 0,
          "data-disabled": D.disabled || void 0,
          "data-danger": D.danger || void 0,
          "data-checked": D.checked || void 0,
          "data-check": D.check || void 0,
          onMouseenter: () => {
            Xe(D) && (c.value = F, w(), H ? f = setTimeout(() => A(F), Oc) : s.value !== null && m());
          },
          onMouseleave: w,
          onClick: (I) => {
            I.stopPropagation(), C(D, F);
          }
        }, [_ ? n("span", {
          class: "cubo-dropdown__check",
          "aria-hidden": "true"
        }, [D.checked ? n(M, {
          icon: "check",
          size: 16
        }, null) : null]) : null, D.prefix != null || D.icon ? n("span", {
          class: "cubo-dropdown__item-prefix"
        }, [D.prefix != null ? ne(D.prefix) : n(M, {
          icon: D.icon,
          size: 16
        }, null)]) : null, n("span", {
          class: "cubo-dropdown__item-label"
        }, [ne(D.label)]), D.suffix != null ? n("span", {
          class: "cubo-dropdown__item-suffix"
        }, [ne(D.suffix)]) : null, H ? n("span", {
          class: "cubo-dropdown__chevron"
        }, [n(M, {
          icon: "chevron-right",
          size: 16
        }, null)]) : null]), H && X ? n(De, {
          to: "body"
        }, {
          default: () => [n("div", {
            ref: i,
            class: "cubo-dropdown__submenu-wrap",
            "data-sub": F,
            "data-dropdown-id": e.instanceId,
            "data-gtc-theme": e.portalTheme,
            "data-cubo-gtc-bridge": "",
            onMouseenter: w
          }, [n(ru, {
            items: D.children,
            size: e.size,
            lang: e.lang,
            menuStyle: d.value ?? void 0,
            autofocus: b.value ? "first" : "none",
            isRoot: !1,
            instanceId: e.instanceId,
            portalTheme: e.portalTheme,
            onLeaf: (I) => t("leaf", I),
            onCloseRoot: (I) => {
              if (I) {
                const P = s.value;
                m(), P != null && g(P);
              } else
                t("closeRoot", !1);
            }
          }, null)])]
        }) : null]);
      })])]);
    };
  }
}), qc = /* @__PURE__ */ N({
  name: "CuboDropdown",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    position: {
      type: String,
      default: "bottom_left"
    },
    size: {
      type: String,
      default: "medium",
      validator: (e) => jt.includes(e)
    },
    language: {
      type: String,
      default: void 0
    },
    searchable: {
      type: Boolean,
      default: !1
    },
    searchPlaceholder: {
      type: String,
      default: void 0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    teleportSelector: {
      type: String,
      default: void 0
    },
    open: {
      type: Boolean,
      default: void 0
    },
    menuWidth: {
      type: [Number, String],
      default: void 0
    }
  },
  emits: {
    openChange: (e) => !0,
    select: (e) => !0
  },
  setup(e, {
    emit: t,
    slots: a
  }) {
    const l = _e(() => e.language), u = `dropdown-${++Pc}`, i = u, o = E(null), r = E(null), c = E(!1), s = O(() => e.open !== void 0), b = O(() => s.value ? !!e.open : c.value), d = E(null), f = E(void 0), y = E("none"), v = (x, R = "none") => {
      x && e.disabled || (x ? (f.value = In(o.value), y.value = R !== "none" ? R : e.searchable ? "search" : "first") : y.value = "none", s.value || (c.value = x), t("openChange", x));
    }, g = () => {
      var R;
      const x = (R = o.value) == null ? void 0 : R.querySelector('.cubo-dropdown__trigger button, .cubo-dropdown__trigger [href], .cubo-dropdown__trigger [tabindex]:not([tabindex="-1"])');
      x == null || x.focus({
        preventScroll: !0
      });
    }, w = () => {
      var D;
      if (!o.value) return;
      const x = o.value.getBoundingClientRect(), R = {
        top: x.top,
        left: x.left,
        width: x.width,
        height: x.height
      }, U = rt(R, e.position, 4), B = e.menuWidth != null ? typeof e.menuWidth == "number" ? `${e.menuWidth}px` : e.menuWidth : void 0, h = ((D = r.value) == null ? void 0 : D.offsetHeight) ?? 0, _ = h > 0 ? Sl(R, h, 4) : null;
      d.value = {
        position: "fixed",
        top: _ ?? U.top,
        left: U.left,
        transform: U.transform,
        width: B
      };
    }, p = (x) => {
      var U, B;
      const R = x.target;
      R && ((U = o.value) != null && U.contains(R) || (B = R.closest) != null && B.call(R, `[data-dropdown-id="${u}"]`) || v(!1));
    }, T = () => {
      document.addEventListener("mousedown", p), window.addEventListener("scroll", w, !0), window.addEventListener("resize", w);
    }, A = () => {
      document.removeEventListener("mousedown", p), window.removeEventListener("scroll", w, !0), window.removeEventListener("resize", w);
    };
    Q(b, async (x) => {
      x ? (f.value = In(o.value), y.value === "none" && (y.value = e.searchable ? "search" : "first"), T(), await be(), w(), await be(), w()) : (A(), y.value = "none");
    }), Se(A), ye(() => {
      b.value && (f.value = In(o.value), y.value = "none", T(), be(async () => {
        w(), await be(), w();
      }));
    });
    const m = (x) => {
      var R;
      (R = x.onClick) == null || R.call(x), t("select", x), !x.check && (v(!1), be(() => g()));
    }, C = (x) => {
      v(!1), x && be(() => g());
    }, k = (x) => {
      if (!e.disabled)
        if (x.key === "ArrowDown" || x.key === "Enter" || x.key === " ") {
          if (b.value && (x.key === "Enter" || x.key === " ")) return;
          x.preventDefault(), x.stopPropagation(), v(!0, x.key === "ArrowDown" ? "first" : e.searchable ? "search" : "first");
        } else x.key === "ArrowUp" ? (x.preventDefault(), x.stopPropagation(), v(!0, "last")) : x.key === "Escape" && b.value && (x.preventDefault(), x.stopPropagation(), v(!1), be(() => g()));
    }, z = () => {
      var U;
      let x;
      const R = {
        "aria-haspopup": "menu",
        "aria-expanded": b.value ? "true" : "false",
        "aria-controls": i
      };
      if (a.trigger) {
        const B = a.trigger(), h = B == null ? void 0 : B[0];
        if (h && (typeof h.type == "string" || typeof h.type == "object")) {
          const _ = (U = h.props) == null ? void 0 : U.onKeydown;
          return _l(h, {
            ...R,
            onKeydown: (D) => {
              Nc(_, D), k(D);
            }
          });
        }
        return B;
      }
      return n(ie, {
        size: e.size,
        disabled: e.disabled,
        htmlAttrs: {
          ...R,
          onKeydown: k
        }
      }, il(x = le(l.value)("dropdown.menu")) ? x : {
        default: () => [x]
      });
    };
    return () => {
      const x = b.value ? n("div", {
        ref: r,
        class: "cubo-dropdown__menu-wrap",
        "data-root": "",
        "data-dropdown-id": u,
        "data-gtc-theme": f.value,
        "data-cubo-gtc-bridge": "",
        style: d.value ?? void 0,
        onClick: (R) => R.stopPropagation()
      }, [n(ru, {
        items: e.items,
        size: e.size,
        lang: l.value,
        searchable: e.searchable,
        searchPlaceholder: e.searchPlaceholder,
        menuStyle: {
          inlineSize: "100%"
        },
        isRoot: !0,
        menuId: i,
        instanceId: u,
        portalTheme: f.value,
        autofocus: y.value,
        onLeaf: m,
        onCloseRoot: C
      }, null)]) : null;
      return n("div", {
        ref: o,
        class: W("cubo-dropdown"),
        "data-size": e.size
      }, [n("div", {
        class: "cubo-dropdown__trigger",
        onClick: () => {
          e.disabled || v(!b.value);
        }
      }, [z()]), b.value ? n(De, {
        to: Ee(e.teleportSelector)
      }, il(x) ? x : {
        default: () => [x]
      }) : null]);
    };
  }
}), pd = qc;
function Mc(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ce(e);
}
const Kc = /* @__PURE__ */ N({
  name: "CuboInlineConfirm",
  inheritAttrs: !1,
  props: {
    // `undefined` (not passed) = uncontrolled; an explicit boolean = controlled.
    visible: {
      type: Boolean,
      default: void 0
    },
    content: {
      type: [String, Object, Function],
      default: void 0
    },
    text: {
      type: String,
      default: void 0
    },
    position: {
      type: String,
      default: "top"
    },
    yes_button: {
      type: String,
      default: void 0
    },
    no_button: {
      type: String,
      default: void 0
    },
    autofocus: {
      type: [String, Boolean],
      default: "yes"
    },
    teleportSelector: {
      type: String,
      default: void 0
    },
    language: {
      type: String,
      default: void 0
    }
  },
  emits: {
    setVisible: (e) => !0,
    submit: () => !0,
    cancel: () => !0
  },
  setup(e, {
    emit: t,
    slots: a,
    attrs: l
  }) {
    const u = _e(() => e.language), i = E(null), o = E(null), r = E(null), c = E(!1), s = O(() => e.visible !== void 0 ? e.visible : c.value), b = (T) => {
      e.visible === void 0 && (c.value = T), t("setVisible", T);
    }, d = () => b(!1), f = (T) => {
      var m, C;
      const A = T.target;
      (m = i.value) != null && m.contains(A) || (C = A == null ? void 0 : A.closest) != null && C.call(A, ".cubo-inline-confirm__pop") || d();
    }, y = (T) => {
      var A;
      if (s.value) {
        if (T.key === "Escape")
          T.preventDefault(), d();
        else if (T.key === "Enter") {
          const m = (A = o.value) == null ? void 0 : A.querySelectorAll(".cubo-inline-confirm__actions button");
          if (m && document.activeElement === m[0]) return;
          T.preventDefault(), t("submit"), d();
        }
      }
    }, v = () => {
      if (!e.teleportSelector || !i.value) return;
      const T = i.value.getBoundingClientRect(), A = rt({
        top: T.top,
        left: T.left,
        width: T.width,
        height: T.height
      }, e.position);
      r.value = {
        top: A.top,
        left: A.left,
        transform: A.transform
      };
    };
    Q(s, async (T) => {
      var A, m, C;
      if (T) {
        document.addEventListener("mousedown", f), document.addEventListener("keydown", y), window.addEventListener("scroll", v, !0), window.addEventListener("resize", v), await be();
        const k = (A = o.value) == null ? void 0 : A.querySelectorAll(".cubo-inline-confirm__actions button");
        e.autofocus === "yes" ? (m = k == null ? void 0 : k[1]) == null || m.focus() : e.autofocus === "no" && ((C = k == null ? void 0 : k[0]) == null || C.focus()), v();
      } else
        document.removeEventListener("mousedown", f), document.removeEventListener("keydown", y), window.removeEventListener("scroll", v, !0), window.removeEventListener("resize", v);
    }), Se(() => {
      document.removeEventListener("mousedown", f), document.removeEventListener("keydown", y), window.removeEventListener("scroll", v, !0), window.removeEventListener("resize", v);
    });
    const g = () => {
      t("submit"), d();
    }, w = () => {
      t("cancel"), d();
    }, p = () => {
      var A;
      const T = le(u.value);
      return n("div", {
        ref: o,
        class: W("cubo-inline-confirm__pop", e.teleportSelector && "cubo-inline-confirm__pop--fixed"),
        "data-position": e.teleportSelector ? void 0 : e.position,
        style: e.teleportSelector ? r.value ?? void 0 : void 0,
        role: "dialog",
        onClick: (m) => m.stopPropagation()
      }, [n("div", {
        class: "cubo-inline-confirm__text"
      }, [ne(e.content) ?? ((A = a.content) == null ? void 0 : A.call(a)) ?? e.text]), n("div", {
        class: "cubo-inline-confirm__actions"
      }, [n(ie, {
        size: "small",
        ghost: !0,
        color: "neutral",
        onClick: w
      }, {
        default: () => [e.no_button ?? T("inlineConfirm.no")]
      }), n(ie, {
        size: "small",
        onClick: g
      }, {
        default: () => [e.yes_button ?? T("inlineConfirm.yes")]
      })])]);
    };
    return () => {
      var k;
      let T;
      const {
        class: A,
        onClick: m,
        ...C
      } = l;
      return n("div", te({
        ref: i
      }, C, {
        class: W("cubo-inline-confirm", A),
        onClick: (z) => {
          m == null || m(z), s.value || b(!0);
        }
      }), [(k = a.default) == null ? void 0 : k.call(a), s.value ? e.teleportSelector ? n(De, {
        to: Ee(e.teleportSelector)
      }, Mc(T = p()) ? T : {
        default: () => [T]
      }) : p() : null]);
    };
  }
}), $c = Kc;
function jc(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ce(e);
}
const Vc = {
  success: "circle-check",
  error: "alert-circle",
  warning: "alert-triangle",
  info: "info-circle"
}, cl = 8, sl = 64, Uc = 200, Ln = 120;
function Hc(e, t) {
  return e.includes("right") ? t > Ln : e.includes("left") ? t < -Ln : Math.abs(t) > Ln;
}
let Gc = 0;
function Sd(e = {}) {
  const t = e.duration ?? 3500, a = e.max ?? 4, l = E([]), u = /* @__PURE__ */ new Map(), i = (c) => {
    const s = u.get(c);
    s && (clearTimeout(s), u.delete(c));
  }, o = (c) => {
    i(c), l.value = l.value.filter((s) => s.id !== c);
  }, r = (c, s) => {
    const b = `cubo-msg-${++Gc}`;
    let d = [...l.value, {
      ...c,
      id: b
    }];
    if (d.length > a) {
      const y = d.slice(0, d.length - a);
      for (const v of y) i(v.id);
      d = d.slice(d.length - a);
    }
    l.value = d;
    const f = (s == null ? void 0 : s.duration) ?? t;
    return f > 0 && f !== 1 / 0 && u.set(b, setTimeout(() => o(b), f)), b;
  };
  return {
    messages: l,
    push: r,
    success: (c, s) => r({
      type: "success",
      text: c,
      title: s
    }),
    error: (c, s) => r({
      type: "error",
      text: c,
      title: s
    }),
    warning: (c, s) => r({
      type: "warning",
      text: c,
      title: s
    }),
    info: (c, s) => r({
      type: "info",
      text: c,
      title: s
    }),
    dismiss: o,
    clear: () => {
      for (const c of u.keys()) clearTimeout(u.get(c));
      u.clear(), l.value = [];
    }
  };
}
const Zc = /* @__PURE__ */ N({
  name: "CuboMessages",
  props: {
    controller: {
      type: Object,
      required: !0
    },
    position: {
      type: String,
      default: "top-right"
    },
    teleportSelector: {
      type: String,
      default: void 0
    },
    language: {
      type: String,
      default: void 0
    }
  },
  setup(e) {
    const t = _e(() => e.language), a = E([]), l = /* @__PURE__ */ new Map(), u = E({}), i = /* @__PURE__ */ new Map();
    let o = null;
    Q(() => e.controller.messages.value, (s) => {
      const b = new Set(s.map((f) => f.id));
      for (const f of b) {
        const y = l.get(f);
        y && (clearTimeout(y), l.delete(f));
      }
      const d = s.map((f) => ({
        ...f,
        leaving: !1
      }));
      for (const f of a.value)
        b.has(f.id) || (d.push({
          ...f,
          leaving: !0
        }), l.has(f.id) || l.set(f.id, setTimeout(() => {
          l.delete(f.id), a.value = a.value.filter((y) => y.id !== f.id);
        }, Uc)));
      a.value = d;
    }, {
      immediate: !0
    }), $e(() => {
      for (const s of l.values()) clearTimeout(s);
      l.clear(), o == null || o.disconnect();
    });
    const r = (s) => (b) => {
      const d = b;
      typeof ResizeObserver < "u" && !o && (o = new ResizeObserver((y) => {
        let v = u.value, g = !1;
        for (const w of y) {
          const p = w.target.dataset.toastId;
          if (p == null) continue;
          const T = w.target.offsetHeight;
          v[p] !== T && (g || (v = {
            ...u.value
          }, g = !0), v[p] = T);
        }
        g && (u.value = v);
      }));
      const f = i.get(s);
      f && f !== d && (o == null || o.unobserve(f)), d ? (d.dataset.toastId = String(s), i.set(s, d), o == null || o.observe(d), u.value[s] == null && (u.value = {
        ...u.value,
        [s]: d.offsetHeight
      })) : i.delete(s);
    }, c = (s, b) => {
      if (s.button !== 0 || s.target.closest(".cubo-messages__close")) return;
      const d = i.get(b);
      if (!d) return;
      const f = s.clientX;
      let y = 0;
      d.style.transition = "none";
      const v = (w) => {
        y = w.clientX - f, d.style.setProperty("--swipe", `${y}px`);
      }, g = () => {
        window.removeEventListener("pointermove", v), window.removeEventListener("pointerup", g), d.style.transition = "", Hc(e.position, y) ? e.controller.dismiss(b) : d.style.setProperty("--swipe", "0px");
      };
      window.addEventListener("pointermove", v), window.addEventListener("pointerup", g);
    };
    return () => {
      const s = le(t.value), b = a.value.filter((p) => !p.leaving).slice().reverse(), d = /* @__PURE__ */ new Map();
      let f = 0;
      b.forEach((p, T) => {
        const A = u.value[p.id] ?? sl;
        d.set(p.id, {
          index: T,
          offset: f,
          height: A
        }), f += A + cl;
      });
      const y = b.length ? u.value[b[0].id] ?? sl : 0, v = b.length ? f - cl : 0, g = {
        "--front-height": `${y}px`,
        "--total-height": `${v}px`
      }, w = n("div", {
        class: W("cubo-messages"),
        "data-position": e.position,
        style: g,
        role: "region",
        "aria-live": "polite"
      }, [a.value.map((p) => {
        const T = d.get(p.id), A = p.leaving || !T ? {
          "--index": 0
        } : {
          "--index": T.index,
          "--offset": `${T.offset}px`,
          "--toast-height": `${T.height}px`
        };
        return n("div", {
          key: p.id,
          ref: r(p.id),
          class: "cubo-messages__item",
          "data-type": p.type,
          "data-leaving": p.leaving || void 0,
          "aria-hidden": p.leaving || void 0,
          role: p.leaving ? void 0 : "listitem",
          style: A,
          onPointerdown: p.leaving ? void 0 : (m) => c(m, p.id)
        }, [n("span", {
          class: "cubo-messages__icon"
        }, [n(M, {
          icon: Vc[p.type],
          size: 18
        }, null)]), n("div", {
          class: "cubo-messages__body"
        }, [p.title ? n("div", {
          class: "cubo-messages__title"
        }, [p.title]) : null, n("div", {
          class: "cubo-messages__text"
        }, [p.text])]), n("button", {
          type: "button",
          class: "cubo-messages__close",
          "aria-label": s("messages.dismiss"),
          onClick: () => e.controller.dismiss(p.id)
        }, [n(M, {
          icon: "x",
          size: 16
        }, null)])]);
      })]);
      return n(De, {
        to: Ee(e.teleportSelector)
      }, jc(w) ? w : {
        default: () => [w]
      });
    };
  }
}), kd = Zc;
function Fn(e, t) {
  const a = Array.from({
    length: t
  }, () => "");
  for (let l = 0; l < t && l < e.length; l++) a[l] = e[l] ?? "";
  return a;
}
function dl(e) {
  let t = e.length;
  for (; t > 0 && e[t - 1] === ""; ) t--;
  return e.slice(0, t).join("");
}
const Wc = /* @__PURE__ */ N({
  name: "CuboOtp",
  inheritAttrs: !0,
  props: {
    length: {
      type: Number,
      default: 6
    },
    value: {
      type: String,
      default: void 0
    },
    pattern: {
      type: String,
      default: "[0-9]"
    },
    inputMode: {
      type: String,
      default: "numeric"
    },
    state: {
      type: String,
      default: "default"
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    autoFocus: {
      type: Boolean,
      default: !1
    },
    mask: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: "medium",
      validator: (e) => jt.includes(e)
    },
    ariaLabel: {
      type: String,
      default: "One-time code"
    }
  },
  emits: {
    change: (e) => !0,
    complete: (e) => !0
  },
  setup(e, {
    emit: t
  }) {
    const a = at(), l = E(""), u = O(() => e.value ?? l.value), i = O(() => Fn(u.value, e.length)), o = E([]), r = (m, C) => {
      o.value[C] = m ?? null;
    }, c = O(() => {
      try {
        return new RegExp(`^${e.pattern}$`);
      } catch {
        return /^.$/;
      }
    }), s = O(() => e.state === "loading"), b = O(() => e.disabled || s.value);
    let d = u.value.length === e.length;
    Q([() => e.value, () => e.length], () => {
      d = u.value.length === e.length;
    }, {
      flush: "sync"
    });
    const f = (m) => {
      const C = m.slice(0, e.length);
      e.value === void 0 && (l.value = C), t("change", C);
      const k = C.length === e.length;
      k && !d ? (d = !0, t("complete", C)) : k || (d = !1);
    }, y = (m, C) => {
      const k = Fn(u.value, e.length);
      return k[m] = C, dl(k);
    }, v = (m) => {
      const C = o.value[m];
      C && (C.focus(), C.select());
    }, g = (m, C) => {
      var x;
      const k = C.target, z = k.value.slice(-1);
      if (z !== "") {
        if (!c.value.test(z)) {
          k.value = i.value[m] ?? "";
          return;
        }
        f(y(m, z)), m < e.length - 1 ? v(m + 1) : (x = o.value[m]) == null || x.select();
      }
    }, w = (m, C) => {
      const k = i.value;
      switch (C.key) {
        case "Backspace": {
          C.preventDefault(), k[m] ? f(y(m, "")) : m > 0 && (f(y(m - 1, "")), v(m - 1));
          break;
        }
        case "Delete": {
          C.preventDefault(), k[m] && f(y(m, ""));
          break;
        }
        case "ArrowLeft": {
          C.preventDefault(), m > 0 && v(m - 1);
          break;
        }
        case "ArrowRight": {
          C.preventDefault(), m < e.length - 1 && v(m + 1);
          break;
        }
        case "Home": {
          C.preventDefault(), v(0);
          break;
        }
        case "End": {
          C.preventDefault(), v(e.length - 1);
          break;
        }
        case "Enter": {
          if (C.preventDefault(), u.value.length !== e.length) {
            const z = k.findIndex((x) => x === "");
            v(z === -1 ? e.length - 1 : z);
          }
          break;
        }
      }
    }, p = (m, C) => {
      var B;
      C.preventDefault();
      const k = ((B = C.clipboardData) == null ? void 0 : B.getData("text")) ?? "", z = Array.from(k).filter((h) => c.value.test(h));
      if (z.length === 0) return;
      const x = Fn(u.value, e.length);
      let R = m;
      for (const h of z) {
        if (R >= e.length) break;
        x[R] = h, R++;
      }
      f(dl(x));
      const U = x.findIndex((h) => h === "");
      v(U === -1 ? e.length - 1 : U);
    }, T = (m) => {
      m.target.select();
    };
    ye(() => {
      e.autoFocus && !b.value && v(0);
    });
    const A = O(() => e.size === "small" ? 16 : e.size === "large" ? 24 : 20);
    return () => n("div", {
      class: W("cubo-otp"),
      "data-size": e.size,
      "data-gtc-size": kt(a),
      "data-state": e.state,
      "data-disabled": b.value || void 0,
      role: "group",
      "aria-label": e.ariaLabel,
      "aria-busy": s.value || void 0
    }, [i.value.map((m, C) => n("input", {
      key: C,
      ref: (k) => r(k, C),
      class: "cubo-otp__box",
      type: e.mask ? "password" : "text",
      inputmode: e.inputMode,
      pattern: e.pattern,
      maxlength: 1,
      autocomplete: C === 0 ? "one-time-code" : "off",
      value: m,
      disabled: b.value,
      "aria-label": `${e.ariaLabel} digit ${C + 1}`,
      "aria-invalid": e.state === "error" || void 0,
      "data-filled": m !== "" || void 0,
      onInput: (k) => g(C, k),
      onKeydown: (k) => w(C, k),
      onPaste: (k) => p(C, k),
      onFocus: T
    }, null)), s.value ? n("span", {
      class: "cubo-otp__spinner",
      "aria-hidden": "true"
    }, [n(Ae, {
      size: A.value
    }, null)]) : null]);
  }
}), xd = Wc;
function Yc(e, t) {
  const a = e.trim().toLowerCase();
  return a ? t.filter((l) => {
    var u;
    return l.label.toLowerCase().includes(a) ? !0 : ((u = l.keywords) == null ? void 0 : u.some((i) => i.toLowerCase().includes(a))) ?? !1;
  }) : t;
}
function cu(e) {
  return e.findIndex((t) => !t.disabled);
}
function fl(e, t, a) {
  let l = t;
  for (; ; ) {
    const u = l + a;
    if (u < 0 || u >= e.length) return t < 0 ? cu(e) : t;
    if (l = u, !e[l].disabled) return l;
  }
}
const Qc = /* @__PURE__ */ N({
  name: "CuboSearch",
  // Attrs are bound to the palette box explicitly: with the fullscreen teleport
  // the render root is a Teleport/overlay, where Vue's automatic fallthrough
  // would drop (or mis-place) them.
  inheritAttrs: !1,
  props: {
    items: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: void 0
    },
    value: {
      type: String,
      default: void 0
    },
    emptyText: {
      type: String,
      default: void 0
    },
    loading: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: "medium",
      validator: (e) => jt.includes(e)
    },
    language: {
      type: String,
      default: void 0
    },
    autoFocus: {
      type: Boolean,
      default: !1
    },
    filterFn: {
      type: [Function, null],
      default: void 0
    },
    fullscreen: {
      type: Boolean,
      default: !1
    },
    open: {
      type: Boolean,
      default: void 0
    },
    hotkey: {
      type: [Boolean, String],
      default: !0
    },
    teleportSelector: {
      type: String,
      default: void 0
    }
  },
  emits: {
    change: (e) => !0,
    select: (e) => !0,
    openChange: (e) => !0,
    /** The row the keyboard/mouse highlight currently rests on (null when none). */
    highlightChange: (e) => !0
  },
  setup(e, {
    emit: t,
    slots: a,
    attrs: l
  }) {
    const u = _e(() => e.language), i = E(null), o = E(null), r = E(""), c = E(0), s = O(() => e.value !== void 0), b = O(() => s.value ? e.value : r.value), d = Un(e.items), f = E(!1);
    Q([b, () => e.items, () => e.filterFn], ([z, x], R, U) => {
      const B = e.filterFn;
      if (B === null) {
        d.value = x, f.value = !1;
        return;
      }
      const h = (B ?? Yc)(z, x);
      if (Array.isArray(h)) {
        d.value = h, f.value = !1;
        return;
      }
      let _ = !0;
      const D = setTimeout(() => {
        _ && (f.value = !0);
      }, 150);
      h.then((F) => {
        _ && (clearTimeout(D), d.value = F, f.value = !1);
      }).catch(() => {
        _ && (clearTimeout(D), f.value = !1);
      }), U(() => {
        _ = !1, clearTimeout(D);
      });
    }, {
      immediate: !0
    });
    const y = O(() => d.value);
    Q(y, () => {
      c.value = cu(y.value);
    }, {
      immediate: !0
    }), Q(() => y.value[c.value] ?? null, (z) => t("highlightChange", z), {
      immediate: !0
    }), Q(c, async () => {
      var z, x;
      await be(), (x = (z = o.value) == null ? void 0 : z.querySelector(`[data-index="${c.value}"]`)) == null || x.scrollIntoView({
        block: "nearest"
      });
    });
    const v = O(() => e.open !== void 0), g = E(!1), w = O(() => v.value ? e.open : g.value), p = (z) => {
      v.value || (g.value = z), t("openChange", z);
    }, T = O(() => typeof e.hotkey == "string" ? e.hotkey.toLowerCase() : "k"), A = (z) => {
      !e.fullscreen || !e.hotkey || (z.metaKey || z.ctrlKey) && !z.altKey && z.key.toLowerCase() === T.value && (z.preventDefault(), p(!w.value));
    };
    ye(() => {
      var z;
      e.autoFocus && ((z = i.value) == null || z.focus()), document.addEventListener("keydown", A);
    }), Se(() => document.removeEventListener("keydown", A)), Q(() => e.fullscreen && w.value, (z) => {
      z && be(() => {
        var x;
        (x = i.value) == null || x.focus(), requestAnimationFrame(() => {
          var R;
          return (R = i.value) == null ? void 0 : R.focus();
        });
      });
    });
    const m = (z) => {
      s.value || (r.value = z), t("change", z);
    }, C = (z) => {
      var x;
      z.disabled || ((x = z.onSelect) == null || x.call(z), t("select", z), e.fullscreen && p(!1));
    }, k = (z) => {
      var x;
      if (z.key === "ArrowDown")
        z.preventDefault(), c.value = fl(y.value, c.value, 1);
      else if (z.key === "ArrowUp")
        z.preventDefault(), c.value = fl(y.value, c.value, -1);
      else if (z.key === "Enter") {
        z.preventDefault();
        const R = y.value[c.value];
        R && C(R);
      } else z.key === "Escape" && (b.value ? (z.preventDefault(), m("")) : e.fullscreen ? (z.preventDefault(), p(!1)) : (x = i.value) == null || x.blur());
    };
    return () => {
      var h;
      const z = le(u.value), x = y.value.some((_) => _.group);
      let R, U;
      e.loading || f.value ? U = n("div", {
        class: "cubo-search__loading"
      }, [n(Ae, {
        size: 20
      }, null)]) : y.value.length === 0 ? U = n("div", {
        class: "cubo-search__empty"
      }, [e.emptyText ?? z("search.empty")]) : U = y.value.map((_, D) => {
        const F = x && _.group && _.group !== R ? n("div", {
          class: "cubo-search__group"
        }, [_.group]) : null;
        return R = _.group, n(se, null, [F, n("div", {
          class: "cubo-search__item",
          role: "option",
          "aria-selected": c.value === D,
          "data-index": D,
          "data-highlighted": c.value === D || void 0,
          "data-disabled": _.disabled || void 0,
          key: _.value,
          onMouseenter: () => !_.disabled && (c.value = D),
          onMousedown: (H) => H.preventDefault(),
          onClick: () => C(_)
        }, [_.icon ? n("span", {
          class: "cubo-search__icon"
        }, [n(M, {
          icon: _.icon,
          size: 16
        }, null)]) : null, n("span", {
          class: "cubo-search__label"
        }, [_.content != null ? ne(_.content) : _.label]), _.suffix != null ? n("span", {
          class: "cubo-search__shortcut"
        }, [ne(_.suffix)]) : null])]);
      });
      const B = n("div", te(l, {
        class: W("cubo-search", e.fullscreen && "cubo-search--fullscreen"),
        "data-size": e.size
      }), [n("div", {
        class: "cubo-search__header"
      }, [n(M, {
        icon: "search",
        size: 16
      }, null), n("input", {
        ref: i,
        class: "cubo-search__input",
        type: "text",
        placeholder: e.placeholder ?? z("search.placeholder"),
        value: b.value,
        onInput: (_) => m(_.target.value),
        onKeydown: k
      }, null)]), n("div", {
        class: "cubo-search__list",
        ref: o,
        role: "listbox"
      }, [U]), (h = a.aside) == null ? void 0 : h.call(a)]);
      return e.fullscreen ? w.value ? n(De, {
        to: Ee(e.teleportSelector)
      }, {
        default: () => [n("div", {
          class: "cubo-search__overlay",
          role: "presentation",
          onMousedown: (_) => {
            _.target === _.currentTarget && p(!1);
          }
        }, [B])]
      }) : null : B;
    };
  }
}), Ad = Qc, zd = /* @__PURE__ */ N({
  name: "CuboRadio",
  props: {
    value: {
      type: String,
      required: !0
    },
    options: {
      type: Array,
      required: !0
    },
    name: {
      type: String,
      default: void 0
    },
    size: {
      type: String,
      default: "medium"
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    vertical: {
      type: Boolean,
      default: !1
    },
    ariaLabel: {
      type: String,
      required: !0
    }
  },
  emits: {
    change: (e) => !0
  },
  setup(e, {
    emit: t
  }) {
    const a = `cubo-radio-${ot()}`, l = /* @__PURE__ */ new Map(), u = (i, o) => {
      const r = ["ArrowRight", "ArrowDown"].includes(i.key) ? 1 : ["ArrowLeft", "ArrowUp"].includes(i.key) ? -1 : 0;
      if (!r || e.disabled || e.options.length < 2) return;
      i.preventDefault();
      let c = o;
      for (let s = 0; s < e.options.length; s += 1) {
        c = (c + r + e.options.length) % e.options.length;
        const b = e.options[c];
        if (!b.disabled) {
          t("change", b.value), requestAnimationFrame(() => {
            var d;
            return (d = l.get(b.value)) == null ? void 0 : d.focus();
          });
          return;
        }
      }
    };
    return () => n("div", {
      class: "cubo-radio",
      role: "radiogroup",
      "aria-label": e.ariaLabel,
      "data-size": e.size,
      "data-gtc-size": e.size,
      "data-value": e.value,
      "data-vertical": e.vertical || void 0,
      "data-disabled": e.disabled || void 0
    }, [e.options.map((i, o) => {
      const r = e.value === i.value, c = e.disabled || i.disabled;
      return n("label", {
        class: "cubo-radio__option",
        "data-value": i.value,
        "data-checked": r || void 0,
        "data-disabled": c || void 0
      }, [n("input", {
        ref: (s) => {
          s ? l.set(i.value, s) : l.delete(i.value);
        },
        class: "cubo-radio__input",
        type: "radio",
        name: e.name ?? a,
        value: i.value,
        checked: r,
        disabled: c,
        onChange: () => t("change", i.value),
        onKeydown: (s) => u(s, o)
      }, null), n("span", {
        class: "cubo-radio__dot",
        "aria-hidden": "true"
      }, null), n("span", {
        class: "cubo-radio__label"
      }, [i.label])]);
    })]);
  }
}), On = (e) => e.width ? {
  flex: `0 0 ${e.width}`
} : void 0, Jc = (e) => e.sortable ? e.sortActive === "asc" ? "ascending" : e.sortActive === "desc" ? "descending" : "none" : void 0, Xc = /* @__PURE__ */ N({
  name: "CuboTable",
  props: {
    rows: {
      type: Array,
      required: !0
    },
    columns: {
      type: Array,
      required: !0
    },
    totals: {
      type: null,
      default: void 0
    },
    hoverable: {
      type: Boolean,
      default: !1
    },
    stickyHeader: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: "medium"
    },
    language: {
      type: String,
      default: void 0
    },
    emptyText: {
      type: String,
      default: void 0
    },
    draggable: {
      type: Boolean,
      default: !1
    },
    rowClickEvent: {
      type: String,
      default: "click"
    },
    rowAttributes: {
      type: Function
    }
  },
  emits: {
    rowClick: (e) => !0,
    columnClick: (e) => !0,
    setSort: (e) => !0,
    sort: (e) => !0
  },
  setup(e, {
    emit: t,
    slots: a
  }) {
    const l = _e(() => e.language), u = ct(), i = (c) => {
      var s;
      return c.headCell ? c.headCell(c) : ((s = a[`head_${c.key}`]) == null ? void 0 : s.call(a, {
        column: c
      })) ?? n("span", null, [c.label]);
    }, o = (c, s, b) => {
      var d;
      return c.bodyCell ? c.bodyCell(s, b) : ((d = a[`body_${c.key}`]) == null ? void 0 : d.call(a, {
        row: s,
        index: b
      })) ?? String(s[c.key] ?? "");
    }, r = (c, s) => {
      var v;
      const b = ((v = e.rowAttributes) == null ? void 0 : v.call(e, {
        row: c,
        index: s,
        emit: t
      })) || {}, d = (e.rowClickEvent || "click") === "click" ? "onClick" : "onMousedown";
      b[d] === void 0 && (b[d] = () => {
        t("rowClick", c);
      });
      const {
        class: f,
        ...y
      } = b;
      return n("div", te(y, {
        role: "row",
        class: {
          "cubo-table__row cubo-table__row--body": !0,
          ...f || {}
        }
      }), [e.draggable ? n("div", {
        class: "cubo-table__cell cubo-table__cell--body cubo-table__drag",
        role: "cell"
      }, [n(M, {
        icon: "grip-vertical",
        size: 18
      }, null)]) : null, e.columns.map((g) => n("div", {
        key: g.key,
        class: `cubo-table__cell cubo-table__cell--body column-${g.key}`,
        role: "cell",
        "data-align": g.align,
        style: On(g),
        onClick: () => t("columnClick", {
          row: c,
          column: g,
          index: s
        })
      }, [o(g, c, s)]))]);
    };
    return () => {
      var b;
      const c = le(l.value), s = e.columns.some((d) => d.footCell) || Object.keys(a).some((d) => d.startsWith("foot_"));
      return n("div", {
        class: W("cubo-table"),
        style: u.value ? {
          "--cubo-config-bg": u.value
        } : void 0,
        "data-size": e.size,
        "data-hoverable": e.hoverable || void 0,
        "data-sticky": e.stickyHeader || void 0,
        role: "table"
      }, [n("div", {
        class: "cubo-table__grid"
      }, [n("div", {
        class: "cubo-table__head",
        role: "rowgroup"
      }, [n("div", {
        class: "cubo-table__row cubo-table__row--head",
        role: "row"
      }, [e.draggable ? n("div", {
        class: "cubo-table__cell cubo-table__cell--head cubo-table__drag",
        role: "columnheader"
      }, null) : null, e.columns.map((d) => n("div", {
        key: d.key,
        class: `cubo-table__cell cubo-table__cell--head column-${d.key}`,
        role: "columnheader",
        "aria-sort": Jc(d),
        "data-align": d.align,
        "data-sortable": d.sortable || void 0,
        "data-sort-active": !!d.sortActive || void 0,
        style: On(d),
        onClick: d.sortable ? () => t("setSort", {
          key: d.sortKey ?? d.key,
          direction: d.sortActive === "asc" ? "desc" : "asc"
        }) : void 0
      }, [i(d), d.sortable ? n("span", {
        class: "cubo-table__sort-icon"
      }, [n(M, {
        icon: d.sortActive === "asc" ? "chevron-up" : d.sortActive === "desc" ? "chevron-down" : "selector",
        size: 16
      }, null)]) : null]))])]), n("div", {
        class: "cubo-table__body",
        role: "rowgroup"
      }, [e.rows.length === 0 ? n("div", {
        class: "cubo-table__empty"
      }, [((b = a.empty) == null ? void 0 : b.call(a)) ?? e.emptyText ?? c("table.empty")]) : null, e.rows.length > 0 && e.draggable ? n(Xn, {
        rows: e.rows,
        handler: ".cubo-table__drag",
        onChange: (d) => t("sort", d),
        renderItem: (d, f) => r(d, f)
      }, null) : null, e.rows.length > 0 && !e.draggable ? e.rows.map((d, f) => r(d, f)) : null]), s ? n("div", {
        class: "cubo-table__foot",
        role: "rowgroup"
      }, [n("div", {
        class: "cubo-table__row cubo-table__row--foot",
        role: "row"
      }, [e.draggable ? n("div", {
        class: "cubo-table__cell cubo-table__cell--foot cubo-table__drag",
        role: "cell"
      }, null) : null, e.columns.map((d) => {
        var f;
        return n("div", {
          key: d.key,
          class: `cubo-table__cell cubo-table__cell--foot column-${d.key}`,
          role: "cell",
          "data-align": d.align,
          style: On(d)
        }, [d.footCell ? d.footCell(e.totals) : ((f = a[`foot_${d.key}`]) == null ? void 0 : f.call(a, {
          totals: e.totals
        })) ?? null]);
      })])]) : null])]);
    };
  }
}), es = Xc;
function ts(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ce(e);
}
const ns = /* @__PURE__ */ N({
  name: "CuboTooltip",
  props: {
    content: {
      type: [String, Object, Function],
      default: void 0
    },
    color: {
      type: String,
      default: void 0
    },
    position: {
      type: String,
      default: "top"
    },
    teleportSelector: {
      type: String,
      default: void 0
    }
  },
  setup(e, {
    slots: t
  }) {
    const a = E(null), l = `${ot() ?? "cubo"}-tooltip`, u = E(!1), i = E(null), o = () => {
      if (!e.teleportSelector || !a.value) return;
      const s = a.value.getBoundingClientRect(), b = rt({
        top: s.top,
        left: s.left,
        width: s.width,
        height: s.height
      }, e.position, 6);
      i.value = {
        top: b.top,
        left: b.left,
        transform: b.transform
      };
    }, r = async () => {
      u.value = !0, window.addEventListener("scroll", o, !0), window.addEventListener("resize", o), await be(), o();
    }, c = () => {
      u.value = !1, window.removeEventListener("scroll", o, !0), window.removeEventListener("resize", o);
    };
    return Se(() => {
      window.removeEventListener("scroll", o, !0), window.removeEventListener("resize", o);
    }), () => {
      var v, g;
      const s = Be(e.color), b = {
        ...s ? {
          "--cubo-tooltip-bg": s
        } : {},
        ...e.teleportSelector ? i.value : {}
      }, d = ne(e.content) ?? ((v = t.content) == null ? void 0 : v.call(t)), f = d != null, y = u.value && f ? n("div", {
        id: l,
        class: W("cubo-tooltip__pop", e.teleportSelector && "cubo-tooltip__pop--fixed"),
        "data-position": e.teleportSelector ? void 0 : e.position,
        style: b,
        role: "tooltip"
      }, [d]) : null;
      return n("div", {
        ref: a,
        class: W("cubo-tooltip"),
        "aria-describedby": u.value && f ? l : void 0,
        onMouseenter: r,
        onMouseleave: c,
        onFocusin: r,
        onFocusout: c
      }, [(g = t.default) == null ? void 0 : g.call(t), y ? e.teleportSelector ? n(De, {
        to: Ee(e.teleportSelector)
      }, ts(y) ? y : {
        default: () => [y]
      }) : y : null]);
    };
  }
}), Dd = ns;
function as(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ce(e);
}
const Bn = (e, t = 0, a = 1) => Math.max(t, Math.min(a, e)), ls = /* @__PURE__ */ N({
  name: "CuboColorPicker",
  props: {
    value: {
      type: String,
      default: "#000000"
    },
    swatches: {
      type: Array,
      default: void 0
    },
    inline: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: "medium"
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    position: {
      type: String,
      default: "bottom_left"
    },
    teleportSelector: {
      type: String,
      default: void 0
    }
  },
  emits: {
    change: (e) => !0
  },
  setup(e, {
    emit: t
  }) {
    const a = at(), l = E(Jt(e.value)), u = E(e.value), i = E(!1), o = E(null), r = E(null), c = E(null), s = E(null), b = O(() => kn(l.value));
    Q(() => e.value, (A) => {
      Xt(A) !== kn(l.value) && (l.value = Jt(A), u.value = A);
    });
    const d = (A) => {
      l.value = A;
      const m = kn(A);
      u.value = m, t("change", m);
    }, f = (A) => {
      var C;
      const m = (C = c.value) == null ? void 0 : C.getBoundingClientRect();
      m && d({
        ...l.value,
        s: Bn((A.clientX - m.left) / m.width),
        v: 1 - Bn((A.clientY - m.top) / m.height)
      });
    }, y = (A) => {
      var C;
      const m = (C = s.value) == null ? void 0 : C.getBoundingClientRect();
      m && d({
        ...l.value,
        h: Bn((A.clientX - m.left) / m.width) * 360
      });
    }, v = (A) => (m) => {
      if (e.disabled) return;
      m.preventDefault(), A(m);
      const C = (z) => A(z), k = () => {
        window.removeEventListener("pointermove", C), window.removeEventListener("pointerup", k);
      };
      window.addEventListener("pointermove", C), window.addEventListener("pointerup", k);
    }, g = (A) => {
      u.value = A;
      const m = Xt(A);
      m && (l.value = Jt(m), t("change", m));
    }, w = () => {
      if (!r.value) return;
      const A = r.value.getBoundingClientRect(), m = rt({
        top: A.top,
        left: A.left,
        width: A.width,
        height: A.height
      }, e.position, 6);
      o.value = {
        top: m.top,
        left: m.left,
        transform: m.transform
      };
    }, p = (A) => {
      var C, k;
      const m = A.target;
      (C = r.value) != null && C.contains(m) || (k = m == null ? void 0 : m.closest) != null && k.call(m, ".cubo-color-picker__panel") || (i.value = !1);
    };
    Q(i, (A) => {
      e.inline || (A ? (document.addEventListener("mousedown", p), window.addEventListener("scroll", w, !0), window.addEventListener("resize", w), w()) : (document.removeEventListener("mousedown", p), window.removeEventListener("scroll", w, !0), window.removeEventListener("resize", w)));
    }), Se(() => {
      document.removeEventListener("mousedown", p), window.removeEventListener("scroll", w, !0), window.removeEventListener("resize", w);
    });
    const T = () => n("div", {
      class: W("cubo-color-picker__panel", !e.inline && "cubo-color-picker__panel--pop"),
      style: e.inline ? void 0 : o.value ?? void 0
    }, [n("div", {
      ref: c,
      class: "cubo-color-picker__sv",
      style: {
        "--cpk-hue": l.value.h
      },
      onPointerdown: v(f)
    }, [n("div", {
      class: "cubo-color-picker__sv-knob",
      style: {
        left: `${l.value.s * 100}%`,
        top: `${(1 - l.value.v) * 100}%`,
        background: b.value
      }
    }, null)]), n("div", {
      class: "cubo-color-picker__hue",
      ref: s,
      onPointerdown: v(y)
    }, [n("div", {
      class: "cubo-color-picker__hue-knob",
      style: {
        left: `${l.value.h / 360 * 100}%`
      }
    }, null)]), n("div", {
      class: "cubo-color-picker__row"
    }, [n("span", {
      class: "cubo-color-picker__preview",
      style: {
        background: b.value
      }
    }, null), n("input", {
      class: "cubo-color-picker__hex",
      value: u.value,
      spellcheck: !1,
      onInput: (A) => g(A.target.value)
    }, null)]), e.swatches && e.swatches.length > 0 ? n("div", {
      class: "cubo-color-picker__swatches"
    }, [e.swatches.map((A) => n("button", {
      key: A,
      type: "button",
      class: "cubo-color-picker__swatch",
      style: {
        background: A
      },
      "aria-label": A,
      "data-active": Xt(A) === b.value || void 0,
      onClick: () => {
        const m = Xt(A);
        m && d(Jt(m));
      }
    }, null))]) : null]);
    return () => {
      let A;
      return e.inline ? n("div", {
        class: W("cubo-color-picker", "cubo-color-picker--inline")
      }, [T()]) : n("div", {
        ref: r,
        class: W("cubo-color-picker"),
        "data-size": e.size,
        "data-gtc-size": kt(a),
        "data-disabled": e.disabled || void 0
      }, [n("button", {
        type: "button",
        class: "cubo-color-picker__trigger",
        disabled: e.disabled,
        onClick: () => i.value = !i.value
      }, [n("span", {
        class: "cubo-color-picker__chip",
        style: {
          background: b.value
        }
      }, null), n("span", {
        class: "cubo-color-picker__value"
      }, [b.value])]), i.value ? n(De, {
        to: Ee(e.teleportSelector)
      }, as(A = T()) ? A : {
        default: () => [A]
      }) : null]);
    };
  }
}), Ed = ls;
function us(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ce(e);
}
const is = yn, os = {
  system: "info-circle",
  task: "circle-check",
  message: "message-circle",
  "field-change": "pencil"
}, rs = /* @__PURE__ */ N({
  name: "CuboEventsBox",
  props: {
    notifications: {
      type: Array,
      required: !0
    },
    visible: {
      type: Boolean,
      default: !1
    },
    title: {
      type: String,
      default: void 0
    },
    language: {
      type: String,
      default: void 0
    },
    locale: {
      type: String,
      default: void 0
    },
    loading: {
      type: Boolean,
      default: !1
    },
    hasMore: {
      type: Boolean,
      default: !1
    },
    groupByDay: {
      type: Boolean,
      default: !0
    },
    renderNotification: {
      type: Function,
      default: void 0
    },
    emptyText: {
      type: String,
      default: void 0
    },
    size: {
      type: String,
      default: "medium"
    }
  },
  emits: {
    setVisible: (e) => !0,
    loadMore: () => !0,
    readAll: () => !0,
    read: (e) => !0,
    notificationClick: (e) => !0
  },
  setup(e, {
    emit: t,
    slots: a
  }) {
    const l = _e(() => e.language), u = E("new"), i = E(null), o = E(null);
    let r = null;
    const c = () => u.value === "new" ? e.notifications.filter((v) => !v.read) : e.notifications, s = () => {
      r == null || r.disconnect(), r = null;
    };
    Q(() => [e.visible, e.hasMore, e.loading, c().length, u.value], () => {
      s();
      const v = o.value, g = i.value;
      !e.visible || !v || !g || !e.hasMore || e.loading || (r = new IntersectionObserver((w) => {
        w.some((p) => p.isIntersecting) && t("loadMore");
      }, {
        root: g,
        rootMargin: "0px 0px 120px 0px",
        threshold: 0
      }), r.observe(v));
    }, {
      flush: "post"
    }), Se(s);
    const d = (v) => {
      v.read || t("read", v), t("notificationClick", v);
    }, f = (v) => {
      var w;
      if (a.notification) {
        const p = a.notification({
          notification: v
        });
        if (p != null) return p;
      }
      if (e.renderNotification) {
        const p = ne(e.renderNotification(v));
        if (p != null) return p;
      }
      const g = v.icon ?? (v.type ? os[v.type] : void 0) ?? "bell";
      return n("button", {
        type: "button",
        class: "cubo-events-box__item",
        "data-unread": !v.read || void 0,
        onClick: () => d(v)
      }, [n("span", {
        class: "cubo-events-box__lead"
      }, [v.author ? n(it, {
        user: v.author,
        size: 32
      }, null) : n("span", {
        class: "cubo-events-box__lead-icon",
        "data-type": v.type || void 0
      }, [n(M, {
        icon: g,
        size: 18
      }, null)])]), n("span", {
        class: "cubo-events-box__body"
      }, [n("span", {
        class: "cubo-events-box__row-head"
      }, [n("span", {
        class: "cubo-events-box__title"
      }, [v.title ?? ((w = v.author) == null ? void 0 : w.name) ?? ""]), n("span", {
        class: "cubo-events-box__time"
      }, [Ct(v.createdAt)])]), n("span", {
        class: "cubo-events-box__text"
      }, [v.text])]), !v.read && n("span", {
        class: "cubo-events-box__dot",
        "aria-hidden": "true"
      }, null)]);
    }, y = () => {
      const v = le(l.value), g = c();
      return g.length === 0 ? n(mn, {
        class: "cubo-events-box__empty",
        icon: "bell-off",
        description: e.emptyText ?? (u.value === "new" ? v("eventsBox.emptyNew") : v("eventsBox.emptyAll"))
      }, null) : e.groupByDay ? Bl(g, {
        locale: e.locale
      }).map((p) => n("div", {
        class: "cubo-timeline__group",
        key: p.key
      }, [n("div", {
        class: "cubo-timeline__day-sep"
      }, [n("span", {
        class: "cubo-timeline__day-pill"
      }, [p.label])]), p.events.map((T) => n("div", {
        class: "cubo-events-box__row",
        key: T.id
      }, [f(T)]))])) : g.map((p) => n("div", {
        class: "cubo-events-box__row",
        key: p.id
      }, [f(p)]));
    };
    return () => {
      const v = le(l.value), g = Oi(e.notifications), w = n("span", {
        class: "cubo-events-box__head"
      }, [n("span", {
        class: "cubo-events-box__head-title"
      }, [e.title ?? v("eventsBox.title")]), g > 0 && n(Ge, {
        class: "cubo-events-box__head-count",
        size: "small",
        color: "primary"
      }, us(g) ? g : {
        default: () => [g]
      })]);
      return n(iu, {
        visible: e.visible,
        onSetVisible: (p) => t("setVisible", p),
        title: () => w
      }, {
        default: () => [n("div", {
          class: W("cubo-events-box"),
          "data-size": e.size
        }, [n("div", {
          class: "cubo-events-box__toolbar"
        }, [n(is, {
          value: u.value,
          onChange: (p) => u.value = p,
          buttons: [{
            label: g > 0 ? `${v("eventsBox.tabNew")} (${g})` : v("eventsBox.tabNew"),
            value: "new",
            props: {
              size: "small"
            }
          }, {
            label: v("eventsBox.tabAll"),
            value: "all",
            props: {
              size: "small"
            }
          }]
        }, null), n(ie, {
          class: "cubo-events-box__read-all",
          size: "small",
          ghost: !0,
          color: "neutral",
          disabled: g === 0,
          onClick: () => t("readAll")
        }, {
          default: () => [n(M, {
            icon: "checks",
            size: 16
          }, null), v("eventsBox.readAll")]
        })]), n("div", {
          class: "cubo-events-box__list",
          ref: i
        }, [y(), e.hasMore && n("div", {
          class: "cubo-events-box__sentinel",
          ref: o,
          "aria-hidden": "true"
        }, null), e.loading && n("div", {
          class: "cubo-events-box__loading"
        }, [n(Ae, {
          size: 20
        }, null)])])])]
      });
    };
  }
}), Td = rs, Vn = 100, Id = /* @__PURE__ */ N({
  props: {
    messages: {
      type: Array,
      default: () => []
    },
    zIndex: {
      type: Number,
      default: Vn
    }
  },
  setup(e) {
    const t = (a, l) => {
      const u = {
        display: "flex",
        flexDirection: "column",
        minWidth: "240px",
        background: "rgb(var(--c-color-white))",
        borderLeft: "4px solid transparent",
        filter: "var(--c-shadow-sm)",
        padding: ".75rem 1.25rem .75rem 1rem",
        borderRadius: "3px",
        fontSize: "13px"
      };
      return a.type === "info" ? (u.backgroundColor = "rgb(var(--c-color-white))", u.borderLeftColor = "rgb(var(--c-color-gray-500))") : a.type === "warning" ? (u.backgroundColor = "rgb(var(--c-color-orange-100))", u.borderLeftColor = "rgb(var(--c-color-orange-500))", u.color = "rgb(var(--c-color-orange-700))") : a.type === "error" ? (u.backgroundColor = "rgb(var(--c-color-red-400))", u.borderLeftColor = "rgb(var(--c-color-red-800))", u.color = "#fffd") : a.type === "success" && (u.backgroundColor = "rgb(var(--c-color-green-100))", u.borderLeftColor = "rgb(var(--c-color-green-500))", u.color = "rgb(var(--c-color-green-700))"), l > 0 && (u.marginBottom = ".75rem"), u;
    };
    return () => {
      var a;
      return n("div", {
        class: "c-flex c-items-start c-p-5 cubo-ui-messages",
        style: {
          position: "fixed",
          bottom: 0,
          flexDirection: "column-reverse",
          zIndex: e.zIndex
        }
      }, [((a = e.messages) == null ? void 0 : a.length) > 0 && e.messages.map((l, u) => n("div", {
        style: t(l, u)
      }, [n("p", {
        class: "c-font-bold",
        style: "font-size: 14px;"
      }, [l.title]), n("p", {
        class: "c-pt-1",
        style: "font-size: 13px;",
        innerHTML: l.text
      }, null)]))]);
    };
  }
});
class cs {
  constructor() {
    ze(this, "duration", 3e3);
    ze(this, "maxCount", 3);
    ze(this, "messages", E([]));
    ze(this, "zIndex", E(Vn));
  }
  clear() {
    this.messages.value = [], this.zIndex.value = Vn;
  }
  message(t, a) {
    const l = (/* @__PURE__ */ new Date()).valueOf();
    if (this.messages.value.push({
      id: l,
      ...t,
      title: a == null ? void 0 : a.title,
      timeout: setTimeout(() => {
        const u = this.messages.value.findIndex((i) => i.id === l);
        u >= 0 && this.messages.value.splice(u, 1);
      }, (a == null ? void 0 : a.duration) || this.duration)
    }), a != null && a.zIndex)
      this.zIndex.value = a.zIndex;
    else {
      const u = document.querySelector(".cubo-ui-modal.__visible");
      if (u) {
        const i = getComputedStyle(u).zIndex;
        this.zIndex.value = i ? parseInt(i) + 1 : 2e3;
      }
    }
    if (this.messages.value.length > this.maxCount) {
      const u = this.messages.value.length - this.maxCount;
      this.messages.value.splice(0, u);
    }
  }
  info(t, a) {
    return this.message({
      type: "info",
      text: t
    }, {
      ...a || {},
      title: (a == null ? void 0 : a.title) || "Информация"
    });
  }
  success(t, a) {
    return this.message({
      type: "success",
      text: t
    }, {
      ...a || {},
      title: (a == null ? void 0 : a.title) || "Выполнено"
    });
  }
  warning(t, a) {
    return this.message({
      type: "warning",
      text: t
    }, {
      ...a || {},
      title: (a == null ? void 0 : a.title) || "Внимание"
    });
  }
  error(t, a) {
    return this.message({
      type: "error",
      text: t
    }, {
      ...a || {},
      title: (a == null ? void 0 : a.title) || "Ошибка"
    });
  }
}
function Ld() {
  return new cs();
}
function ss() {
  return St("messages");
}
function Oe(e, t) {
  const a = E(e);
  return [a, (u) => {
    t ? t(a, u, a.value) : a.value = u;
  }];
}
function bl(e) {
  return typeof e != "string" ? !1 : !isNaN(+e) && !isNaN(parseFloat(e));
}
function vl() {
  return window;
}
function Fd(e) {
  return new Promise((t, a) => {
    if (!navigator.clipboard) {
      const l = document.createElement("textarea");
      l.value = e, l.style.top = "0", l.style.left = "0", l.style.position = "fixed", document.body.appendChild(l), l.focus(), l.select();
      let u = !1;
      try {
        u = !!document.execCommand("copy");
      } catch {
      }
      document.body.removeChild(l), u ? t() : a();
      return;
    }
    navigator.clipboard.writeText(e).then(
      () => {
        t();
      },
      () => {
        a();
      }
    );
  });
}
function ds(e) {
  return JSON.parse(JSON.stringify(e));
}
function fs(e, t = 50, a = {}) {
  let l;
  const u = a.isImmediate ?? !1, i = a.callback ?? !1, o = a.maxWait;
  let r = Date.now(), c = [];
  function s() {
    if (o !== void 0) {
      const d = Date.now() - r;
      if (d + t >= o)
        return o - d;
    }
    return t;
  }
  const b = function(...d) {
    const f = this;
    return new Promise((y, v) => {
      const g = function() {
        if (l = void 0, r = Date.now(), !u) {
          const p = e.apply(f, d);
          i && i(p), c.forEach(({ resolve: T }) => T(p)), c = [];
        }
      }, w = u && l === void 0;
      if (l !== void 0 && clearTimeout(l), l = setTimeout(g, s()), w) {
        const p = e.apply(f, d);
        return i && i(p), y(p);
      }
      c.push({ resolve: y, reject: v });
    });
  };
  return b.cancel = function(d) {
    l !== void 0 && clearTimeout(l), c.forEach(({ reject: f }) => f(d)), c = [];
  }, b;
}
const bs = /* @__PURE__ */ N((e, {
  emit: t
}) => {
  const a = O(() => {
    var o, r, c, s, b, d;
    switch (typeof ((r = (o = e.buttons) == null ? void 0 : o.remove) == null ? void 0 : r.submit)) {
      case "string":
        return (s = (c = e.buttons) == null ? void 0 : c.remove) == null ? void 0 : s.submit;
      case "function":
        return ((d = (b = e.buttons) == null ? void 0 : b.remove) == null ? void 0 : d.submit).call(d, e.card);
      default:
        return "Remove entity";
    }
  }), l = O(() => {
    var o, r, c, s, b, d;
    switch (typeof ((r = (o = e.buttons) == null ? void 0 : o.remove) == null ? void 0 : r.cancel)) {
      case "string":
        return (s = (c = e.buttons) == null ? void 0 : c.remove) == null ? void 0 : s.cancel;
      case "function":
        return ((d = (b = e.buttons) == null ? void 0 : b.remove) == null ? void 0 : d.cancel).call(d, e.card);
      default:
        return "Cancel";
    }
  }), u = O(() => {
    var o, r, c, s, b, d;
    switch (typeof ((r = (o = e.buttons) == null ? void 0 : o.remove) == null ? void 0 : r.text)) {
      case "string":
        return (s = (c = e.buttons) == null ? void 0 : c.remove) == null ? void 0 : s.text;
      case "function":
        return ((d = (b = e.buttons) == null ? void 0 : b.remove) == null ? void 0 : d.text).call(d, e.card);
      default:
        return "Are you sure of removing entity?";
    }
  }), i = O(() => {
    const o = e.card.id;
    return e.title ? e.title(e.card) : o > 0 ? "Entity #" + o : "New entity";
  });
  return () => {
    var o;
    return n("div", {
      class: "cubo-ui-data-view-card-header"
    }, [e.removable && n("div", {
      class: "cubo-ui-data-view-card-header-remove"
    }, [n($c, {
      content: u.value,
      yes_button: a.value,
      no_button: l.value,
      onSubmit: () => t("remove"),
      position: "right",
      teleportSelector: e.teleportSelector
    }, {
      default() {
        return n(M, {
          icon: "trash"
        }, null);
      }
    })]), n("div", {
      class: "cubo-ui-data-view-card-header-title"
    }, [n("span", null, [i.value])]), n("div", {
      class: "cubo-ui-data-view-card-header-actions"
    }, [n(ie, {
      onClick: () => t("submit"),
      loading: (o = e.loaders) == null ? void 0 : o.saving,
      disabled: !e.editable,
      color: "primary"
    }, {
      default: () => {
        var r;
        return [((r = e.buttons) == null ? void 0 : r.submit) || "Submit"];
      }
    }), n(ie, {
      disabled: !e.editable,
      color: "gray",
      ghost: !0,
      onClick: Rt(() => t("hide"), ["prevent", "stop"])
    }, {
      default: () => {
        var r;
        return [((r = e.buttons) == null ? void 0 : r.cancel) || "Cancel"];
      }
    })])]);
  };
}, {
  props: ["editable", "removable", "card", "title", "buttons", "loaders", "teleportSelector"],
  emits: ["hide", "submit", "remove"]
}), Od = /* @__PURE__ */ N((e) => () => n("div", {
  class: "cubo-ui-data-view-card-form-line"
}, [n("div", {
  class: "cubo-ui-data-view-card-form-line-label"
}, [typeof e.label == "string" && n("span", null, [e.label]), typeof e.label != "string" && e.label]), n("div", {
  class: "cubo-ui-data-view-card-form-line-value"
}, [e.value])]), {
  props: ["label", "value"],
  emits: []
}), vs = /* @__PURE__ */ N((e, {
  emit: t
}) => {
  const [a, l] = Oe(null), u = O(() => {
    var y, v;
    return [void 0, !0].includes((v = e.rights) == null ? void 0 : v[(y = a.value) != null && y.id ? "update" : "create"]);
  }), i = () => {
    l(ds({
      ...e.card || {},
      ...e.initialProps || {}
    }));
  }, o = (y) => {
    for (const v in y)
      a.value[v] = y[v];
  }, r = (y, v) => {
    t("change", y, v);
  }, c = () => {
    t("remove");
  }, s = () => {
    t("hide");
  }, b = () => {
    t("fetch");
  }, d = async (y) => {
    t("submit", a.value, y);
  }, f = async () => {
    t("remove", a.value);
  };
  return ye(() => {
    i();
  }), !e.type || e.type === "modal" ? () => a.value !== null && n(Kt, te({
    class: "cubo-ui-data-view-card",
    header: () => e.header === void 0 ? null : n(bs, te({
      editable: u.value,
      buttons: e.buttons,
      loaders: e.loaders,
      card: a.value,
      onHide: s,
      onSubmit: d,
      onRemove: f
    }, e.header), null),
    content: () => e.component({
      card: a.value,
      editable: u.value,
      remove: f,
      submit: d,
      change: o,
      emitChange: r,
      emitRemove: c,
      hide: s,
      fetch: b
    }),
    onChange: s,
    showCloseIcon: !1
  }, e.modalProps || {}), null) : () => {
  };
}, {
  inheritAttrs: !0,
  props: ["type", "header", "card", "component", "loaders", "rights", "buttons", "queries", "initialProps", "messages", "modalProps", "hooks", "autoOpenByQuery"],
  emits: ["hide", "fetch", "remove", "submit", "change", "setLoaders"]
}), ys = /* @__PURE__ */ N((e) => () => n("div", {
  class: "cubo-ui-data-view-list-data-pipeline"
}, [n("span", null, [xe("Under construction")])]), {
  props: []
}), ms = /* @__PURE__ */ N((e, {
  emit: t
}) => {
  const a = (u) => {
    t("show", u);
  }, l = O(() => {
    if (!e.columns)
      return e;
    const {
      columns: u,
      rowAttributes: i,
      ...o
    } = e;
    return {
      ...o,
      rowAttributes(r) {
        return (i == null ? void 0 : i({
          ...r,
          extra: {
            onClick: () => a(r.row.id)
          }
        })) || {};
      },
      columns: u.map((r) => r.bodyCell ? {
        ...r,
        bodyCell(c) {
          return r.bodyCell({
            ...c,
            onClick() {
              a(c.row.id);
            }
          });
        }
      } : r)
    };
  });
  return () => n("div", {
    class: "cubo-ui-data-view-list-data-table"
  }, [n(es, l.value, null)]);
}, {
  props: ["columns", "emptyText", "hoverable", "rowAttributes", "rows", "size", "stickyHeader"],
  emits: ["show"]
}), gs = /* @__PURE__ */ N((e, {
  emit: t
}) => () => n("div", {
  class: "cubo-ui-data-view-list-data"
}, [(!e.type || e.type === "table") && n(ms, te(e.table || {}, {
  rows: e.rows || [],
  onShow: (a) => t("show", a)
}), null), e.type === "pipeline" && n(ys, te(e.table || {}, {
  rows: e.rows || []
}), null)]), {
  props: ["type", "table", "rows", "filters"],
  emits: ["show"]
});
function hs(e, t) {
  const a = {};
  for (const l of (t == null ? void 0 : t.fields) || [])
    switch (l.type) {
      case "text":
        e[l.key] !== void 0 && (a[l.key] = e[l.key] || "");
        break;
      case "select":
        e[l.key] !== void 0 && (a[l.key] = bl(e[l.key]) ? +e[l.key] : e[l.key]);
        break;
      case "number":
        e[l.key] !== void 0 && (a[l.key] = bl(e[l.key]) ? +e[l.key] : e[l.key]);
        break;
      case "number_range":
        {
          const u = e[l.key + "_start"], i = e[l.key + "_end"];
          u && !isNaN(Number(u)) && (a[l.key + "_start"] = u), i && !isNaN(Number(i)) && (a[l.key + "_end"] = i);
        }
        break;
      case "date_range":
        {
          const u = e[l.key + "_start"], i = e[l.key + "_end"];
          u && (a[l.key + "_start"] = u), i && !isNaN(Number(i)) && (a[l.key + "_end"] = i);
        }
        break;
      case "checkbox":
        e[l.key] !== void 0 && (a[l.key] = e[l.key] === "Y");
        break;
    }
  return e.limit && !isNaN(Number(e.limit)) && (a.limit = Number(e.limit)), e.page && !isNaN(Number(e.page)) && (a.page = Number(e.page)), e.search && (a.search = e.search), a;
}
function ea(e, t, a) {
  var u, i, o, r;
  const l = {};
  for (const c of (t == null ? void 0 : t.fields) || []) {
    let s;
    switch (c.type) {
      case "text":
        s = e[c.key] || void 0;
        break;
      case "number":
        s = Number(e[c.key]), isNaN(s) && (s = void 0);
        break;
      case "number_range":
        {
          const b = e[c.key + "_start"], d = e[c.key + "_end"];
          b && (l[c.key + "_start"] = b), d && (l[c.key + "_end"] = d);
        }
        break;
      case "date_range":
        {
          const b = e[c.key + "_start"], d = e[c.key + "_end"];
          b && (l[c.key + "_start"] = b), d && (l[c.key + "_end"] = d);
        }
        break;
      case "select":
        s = e[c.key];
        break;
      case "checkbox":
        e[c.key] !== void 0 && (s = e[c.key] === !0 ? "Y" : "N");
        break;
    }
    if (s !== void 0 && s !== ((u = t == null ? void 0 : t.defaults) == null ? void 0 : u[c.key])) {
      if (a != null && a.forFetch) {
        const b = c.condition !== void 0 ? c.condition || "" : "eq";
        s = `${b ? b + ":" : ""}${s}`;
      }
      l[c.key] = s;
    }
  }
  return e.limit && e.limit !== ((i = t == null ? void 0 : t.defaults) == null ? void 0 : i.limit) && (l.limit = `${e.limit}`), e.page && e.page !== ((o = t == null ? void 0 : t.defaults) == null ? void 0 : o.page) && (l.page = `${e.page}`), e.search && e.search !== ((r = t == null ? void 0 : t.defaults) == null ? void 0 : r.search) && (l.search = `${e.search}`), l;
}
function _s(e, t, a) {
  const l = ea(
    e,
    a,
    { forFetch: !0 }
  );
  return Object.keys(t || {}).length && Object.assign(l, t), l;
}
const ws = /* @__PURE__ */ N((e, {
  emit: t
}) => {
  const a = (l) => {
    t("change", l);
  };
  return () => n("div", {
    class: "cubo-ui-data-view-list-header-filters-drawer-line"
  }, [n("div", {
    class: "cubo-ui-data-view-list-header-filters-drawer-line-value __checkbox"
  }, [n(cn, {
    value: e.value,
    onChange: a
  }, {
    default: () => [e.label]
  })]), e.description && n("div", {
    class: "cubo-ui-data-view-list-header-filters-drawer-description"
  }, [e.description])]);
}, {
  props: ["value", "label", "description", "checkboxOptions"],
  emits: ["change", "submit"]
}), Cs = /* @__PURE__ */ N((e, {
  emit: t
}) => {
  const a = (l, u) => {
    t(l === "start" ? "setStart" : "setEnd", u || void 0);
  };
  return () => n("div", {
    class: "cubo-ui-data-view-list-header-filters-drawer-line"
  }, [n("p", {
    class: "cubo-ui-data-view-list-header-filters-drawer-line-label"
  }, [e.label]), n("div", {
    class: "cubo-ui-data-view-list-header-filters-drawer-line-value __date_range"
  }, [n(pe, {
    onKeypress: (l) => l.code === "Enter" ? t("submit") : !0,
    htmlType: "date",
    value: e.start || "",
    onChange: (l) => a("start", l || "")
  }, null), n("strong", {
    class: "__date_range_item"
  }, [xe("-")]), n(pe, {
    onKeypress: (l) => l.code === "Enter" ? t("submit") : !0,
    htmlType: "date",
    value: e.end,
    onChange: (l) => a("end", l || "")
  }, null)]), e.description && n("div", {
    class: "cubo-ui-data-view-list-header-filters-drawer-description"
  }, [e.description])]);
}, {
  props: ["start", "end", "label", "description"],
  emits: ["setStart", "setEnd", "submit"]
}), ps = /* @__PURE__ */ N((e, {
  emit: t
}) => {
  const a = (l, u) => {
    t(l === "start" ? "setStart" : "setEnd", u || void 0);
  };
  return () => n("div", {
    class: "cubo-ui-data-view-list-header-filters-drawer-line"
  }, [n("p", {
    class: "cubo-ui-data-view-list-header-filters-drawer-line-label"
  }, [e.label]), n("div", {
    class: "cubo-ui-data-view-list-header-filters-drawer-line-value __number_range"
  }, [n(pe, {
    onKeypress: (l) => l.code === "Enter" ? t("submit") : !0,
    htmlType: "number",
    value: e.start,
    onChange: (l) => a("start", l)
  }, null), n("strong", {
    class: "__number_range_item"
  }, [xe("-")]), n(pe, {
    onKeypress: (l) => l.code === "Enter" ? t("submit") : !0,
    htmlType: "number",
    value: e.end ?? null,
    onChange: (l) => a("end", l)
  }, null)]), e.description && n("div", {
    class: "cubo-ui-data-view-list-header-filters-drawer-description"
  }, [e.description])]);
}, {
  props: ["start", "end", "label", "description"],
  emits: ["setStart", "setEnd", "submit"]
}), Ss = /* @__PURE__ */ N((e, {
  emit: t
}) => {
  const a = (l) => {
    t("change", l || void 0);
  };
  return () => n("div", {
    class: "cubo-ui-data-view-list-header-filters-drawer-line"
  }, [n("p", {
    class: "cubo-ui-data-view-list-header-filters-drawer-line-label"
  }, [e.label]), n("div", {
    class: "cubo-ui-data-view-list-header-filters-drawer-line-value __text"
  }, [n(je, te({
    value: e.value,
    onChange: (l) => a(l)
  }, e.selectOptions), null)]), e.description && n("div", {
    class: "cubo-ui-data-view-list-header-filters-drawer-description"
  }, [e.description])]);
}, {
  props: ["value", "label", "description", "selectOptions"],
  emits: ["change", "submit"]
}), ks = /* @__PURE__ */ N((e, {
  emit: t
}) => {
  const a = (l) => {
    t("change", l || void 0);
  };
  return () => n("div", {
    class: "cubo-ui-data-view-list-header-filters-drawer-line"
  }, [n("p", {
    class: "cubo-ui-data-view-list-header-filters-drawer-line-label"
  }, [e.label]), n("div", {
    class: "cubo-ui-data-view-list-header-filters-drawer-line-value __text"
  }, [n(pe, te({
    onKeypress: (l) => l.code === "Enter" ? t("submit") : !0,
    value: e.value,
    onChange: (l) => a(l)
  }, e.textOptions), null)]), e.description && n("div", {
    class: "cubo-ui-data-view-list-header-filters-drawer-description"
  }, [e.description])]);
}, {
  props: ["value", "label", "description", "textOptions"],
  emits: ["change", "submit"]
}), xs = /* @__PURE__ */ N((e, {
  emit: t
}) => {
  const a = (u) => {
    t("change", {
      ...e.query || {},
      ...u || {}
    });
  }, l = () => {
    t("submit");
  };
  return () => n(iu, {
    class: "cubo-ui-data-view-list-header-filters-drawer",
    visible: !0,
    closeOnBackgroundClick: !0,
    onSetVisible: () => t("hide")
  }, {
    header() {
      var u;
      return n(se, null, [n("div", {
        class: "cubo-ui-drawer-header-title"
      }, [n("span", null, [((u = e.header) == null ? void 0 : u.title) || "Filters"])]), n("div", {
        class: "cubo-ui-drawer-header-actions"
      }, [n(ie, {
        color: "primary",
        onClick: Rt(() => l(), ["prevent", "stop"])
      }, {
        default: () => {
          var i, o;
          return [((o = (i = e.header) == null ? void 0 : i.buttons) == null ? void 0 : o.submit) || "Submit"];
        }
      }), n(ie, {
        color: "gray",
        ghost: !0,
        onClick: Rt(() => t("hide"), ["prevent", "stop"])
      }, {
        default: () => {
          var i, o;
          return [((o = (i = e.header) == null ? void 0 : i.buttons) == null ? void 0 : o.cancel) || "Cancel"];
        }
      })])]);
    },
    default() {
      var u;
      return n("div", {
        class: "cubo-ui-data-view-list-header-filters-drawer-body"
      }, [(u = e.fields) == null ? void 0 : u.map((i) => {
        var o, r, c, s, b, d, f;
        switch (i.type) {
          case "text":
            return n(ks, {
              label: i.label || i.key,
              value: (o = e.query) == null ? void 0 : o[i.key],
              onChange: (y) => a({
                [i.key]: y
              }),
              onSubmit: l,
              textOptions: i.textOptions
            }, null);
          case "date_range": {
            const y = i.key + "_start", v = i.key + "_end";
            return n(Cs, {
              label: i.label || i.key,
              start: (r = e.query) == null ? void 0 : r[y],
              end: (c = e.query) == null ? void 0 : c[v],
              onSetStart: (g) => a({
                [y]: g
              }),
              onSetEnd: (g) => a({
                [v]: g
              }),
              onSubmit: l
            }, null);
          }
          case "number_range": {
            const y = i.key + "_start", v = i.key + "_end";
            return n(ps, {
              label: i.label || i.key,
              start: (s = e.query) == null ? void 0 : s[y],
              end: (b = e.query) == null ? void 0 : b[v],
              onSetStart: (g) => a({
                [y]: g
              }),
              onSetEnd: (g) => a({
                [v]: g
              }),
              onSubmit: l
            }, null);
          }
          case "select":
            return n(Ss, {
              label: i.label || i.key,
              value: (d = e.query) == null ? void 0 : d[i.key],
              onChange: (y) => a({
                [i.key]: y
              }),
              onSubmit: l,
              selectOptions: i.selectOptions
            }, null);
          case "checkbox":
            return n(ws, {
              label: i.label || i.key,
              value: (f = e.query) == null ? void 0 : f[i.key],
              onChange: (y) => a({
                [i.key]: y
              }),
              onSubmit: l,
              checkboxOptions: i.checkboxOptions
            }, null);
          default:
            return;
        }
      })]);
    }
  });
}, {
  props: ["fields", "query", "header"],
  emits: ["change", "hide", "submit"]
}), As = /* @__PURE__ */ N((e, {
  emit: t
}) => {
  const [a, l] = Oe(!1), [u, i] = Oe({}), o = O(() => {
    const {
      limit: s,
      page: b,
      search: d,
      ...f
    } = ea(e.query || {}, e);
    return Object.values(f).length || 0;
  }), r = () => {
    t("change", e.defaults || {});
  }, c = () => {
    t("change", u.value), l(!1);
  };
  return ye(() => {
    i(e.query || {});
  }), Q(() => e.query, i, {
    deep: !0
  }), () => n("div", {
    class: "cubo-ui-data-view-list-header-filters"
  }, [n(ie, {
    class: "cubo-ui-data-view-list-header-filters-toggle",
    color: "white",
    onClick: () => l(!0)
  }, {
    default: () => [n(M, {
      icon: "filter"
    }, null), e.filterButton && n("p", null, [e.filterButton]), o.value > 0 && n("span", null, [o.value])]
  }), o.value > 0 && n("div", {
    class: "cubo-ui-data-view-list-header-filters-clear",
    onClick: () => r()
  }, [n(M, {
    icon: "x"
  }, null), n("span", null, [e.clearButton || "Clear filters"])]), a.value && n(xs, te({
    fields: e.fields,
    query: u.value,
    onChange: i,
    onSubmit: c,
    onHide: () => l(!1)
  }, e.drawerOptions), null)]);
}, {
  props: ["fields", "query", "current", "defaults", "extend", "storage", "clearButton", "drawerOptions", "filterButton"],
  emits: ["change"]
}), zs = /* @__PURE__ */ N((e, {
  emit: t
}) => {
  const a = O(() => {
    var i, o;
    return e.limit !== void 0 ? e.limit : e.pagination !== !1 ? ((i = e.pagination) == null ? void 0 : i.pageSize) ?? ((o = e.pagination) == null ? void 0 : o.defaultPageSize) : 25;
  }), l = O(() => (e.total || 0) > (a.value || 25)), u = (i) => {
    t("change", i.current, i.pageSize);
  };
  return () => n(se, null, [l.value && n("div", {
    class: "cubo-ui-data-view-list-header-pagination"
  }, [n(Ql, te({
    itemsInCenter: 3,
    showIfEmpty: !1,
    showPageSizeSelect: !0,
    current: e.page,
    pageSize: e.limit,
    total: e.total,
    onChange: u
  }, e.pagination || {}), null)])]);
}, {
  props: ["page", "limit", "total", "pagination"],
  emits: ["change"],
  inheritAttrs: !1
}), Ds = /* @__PURE__ */ N((e, {
  emit: t
}) => {
  const a = fs((l) => {
    t("change", l);
  }, e.debounceTimeout || 300);
  return () => n(se, null, [n("div", {
    class: "cubo-ui-data-view-list-header-search"
  }, [n(pe, {
    placeholder: e.placeholder,
    value: e.query || "",
    onChange: a
  }, null)])]);
}, {
  props: ["query", "placeholder"],
  inheritAttrs: !1
}), Es = /* @__PURE__ */ N((e, {
  emit: t
}) => {
  const a = (u) => {
    t("changeFilters", u);
  }, l = (u) => {
    t("add", u);
  };
  return () => {
    var u, i, o, r, c, s, b, d, f, y, v;
    return n("div", {
      class: "cubo-ui-data-view-list-header"
    }, [(((u = e.create) == null ? void 0 : u.allowed) === void 0 || e.create.allowed === !0) && n("div", {
      class: "cubo-ui-data-view-list-header-actions"
    }, [(i = e.slotActions) == null ? void 0 : i.call(e, {
      add: l,
      query: e.query || {},
      changeQuery: a
    }), !e.slotActions && n(ie, te({
      color: "primary"
    }, ((o = e.create) == null ? void 0 : o.buttonProps) || {}, {
      onClick: Rt(() => t("add"), ["prevent", "stop"])
    }), {
      default: () => {
        var g;
        return [n(M, {
          icon: "plus"
        }, null), n("span", null, [((g = e.create) == null ? void 0 : g.buttonName) || "New entity"])];
      }
    })]), (r = e.slotAfterActions) == null ? void 0 : r.call(e, {
      add: l,
      query: e.query || {},
      changeQuery: a
    }), !!e.search && n(Ds, te({
      query: ((c = e.query) == null ? void 0 : c.search) || "",
      onChange: (g) => {
        console.log({
          ...e.query || {},
          search: g
        }), a({
          ...e.query || {},
          search: g
        });
      }
    }, e.search || {}), null), (s = e.slotAfterSearch) == null ? void 0 : s.call(e, {
      add: l,
      query: e.query || {},
      changeQuery: a
    }), !!e.filters && n(As, te(e.filters || {}, {
      query: e.query,
      onChange: a
    }), null), (b = e.slotAfterFilters) == null ? void 0 : b.call(e, {
      add: l,
      query: e.query || {},
      changeQuery: a
    }), e.pagination !== !1 && n(zs, {
      page: ((d = e.query) == null ? void 0 : d.page) || 1,
      limit: (f = e.query) == null ? void 0 : f.limit,
      total: ((y = e.totals) == null ? void 0 : y.count) || 0,
      pagination: e.pagination,
      onChange: (g, w) => a({
        ...e.query || {},
        page: g,
        limit: w
      })
    }, null), (v = e.slotAfterPagination) == null ? void 0 : v.call(e, {
      add: l,
      query: e.query || {},
      changeQuery: a
    })]);
  };
}, {
  props: ["title", "create", "search", "filters", "query", "totals", "pagination", "slotAfterActions", "slotAfterSearch", "slotAfterFilters", "slotAfterPagination", "slotActions"],
  emits: ["changeFilters", "add"]
}), Ts = /* @__PURE__ */ N((e, {
  emit: t
}) => {
  const a = (l) => {
    t("changeFilters", l);
  };
  return () => {
    var l, u, i, o;
    return n("div", {
      class: "cubo-ui-data-view-list"
    }, [(l = e == null ? void 0 : e.slotBeforeAll) == null ? void 0 : l.call(e), n(Es, te({
      filters: (u = e.header) == null ? void 0 : u.filters,
      query: e.query,
      totals: e.totals,
      onChangeFilters: a,
      onAdd: (r) => t("showCard", 0, r)
    }, e.header), null), (i = e == null ? void 0 : e.slotAfterHeader) == null ? void 0 : i.call(e), n(gs, te(e.data || {}, {
      rows: e.rows,
      onShow: (r) => t("showCard", r)
    }), null), (o = e == null ? void 0 : e.slotAfterData) == null ? void 0 : o.call(e)]);
  };
}, {
  props: ["data", "rights", "header", "filters", "query", "totals", "rows", "slotBeforeAll", "slotAfterData", "slotAfterHeader", "extendQuery"],
  emits: ["changeFilters", "showCard"]
}), Bd = /* @__PURE__ */ N((e, {
  expose: t
}) => {
  const a = Hn(), l = wl(), u = ss();
  let i;
  const [o, r] = Oe(null), [, c] = Oe(!1), [s, b] = Oe({}), [d, f] = Oe([]), [y, v] = Oe({
    count: 0
  }), [g, w] = Oe({
    saving: !1,
    removing: !1
  }), p = O(() => {
    var h, _;
    return ((_ = (h = e.list.header) == null ? void 0 : h.filters) == null ? void 0 : _.storage) || "query";
  }), T = (h) => {
    var _;
    if (p.value === "query")
      return l.push({
        ...a,
        name: e.routeName || a.name,
        query: ea(h, (_ = e.list.header) == null ? void 0 : _.filters)
      });
  }, A = async (h, _) => {
    var F, H;
    let D = null;
    h > 0 ? D = await ((H = (F = e.queries) == null ? void 0 : F.getOne) == null ? void 0 : H.call(F, {
      id: h
    })) || null : D = _ || {}, r(D);
  }, m = () => {
    r(null);
  }, C = async () => {
    var h, _, D;
    c(!0);
    try {
      const F = _s(s.value, e.list.extendQuery, (h = e.list.header) == null ? void 0 : h.filters);
      if (e.crdt)
        i = e.crdt.client.useList(e.crdt.entity, {
          filters: F
        });
      else {
        const H = await ((D = (_ = e.queries) == null ? void 0 : _.getMany) == null ? void 0 : D.call(_, F));
        H && (f(H.rows), v(H.totals));
      }
    } catch (F) {
      console.error("Cubo:DataView", "fetching error", F);
    } finally {
      c(!1);
    }
  }, k = (h) => {
    var _;
    b(hs(h, (_ = e.list.header) == null ? void 0 : _.filters));
  }, z = O(() => e.crdt ? Array.from((i == null ? void 0 : i.rows().value) || []).toSorted((h, _) => _.id > h.id ? 1 : -1) : d.value), x = (h) => {
    if (!e.crdt) {
      const _ = d.value.findIndex((D) => D.id === h.id);
      _ >= 0 ? d.value[_] = h : d.value.unshift(h);
    }
  }, R = async (h) => {
    var _, D, F, H, X, re, ae, I, P, V, K, G, q, Z, oe, de, me, $;
    w({
      ...g.value,
      removing: !0
    });
    try {
      (D = (_ = e.card) == null ? void 0 : _.hooks) != null && D.beforeRemove && await ((F = e.card) == null ? void 0 : F.hooks.beforeRemove(h)), await ((X = (H = e.queries) == null ? void 0 : H.removeOne) == null ? void 0 : X.call(H, {
        id: h.id
      })), (ae = (re = e.card) == null ? void 0 : re.hooks) != null && ae.afterRemove && await ((I = e.card) == null ? void 0 : I.hooks.afterRemove(h)), !h.id && ((K = (V = (P = e.card) == null ? void 0 : P.messages) == null ? void 0 : V.delete) != null && K.success) && u.warning((G = e.card) == null ? void 0 : G.messages.delete.success, {
        zIndex: 2e3
      });
      const Y = z.value.findIndex((ee) => {
        var ge;
        return ee.id === ((ge = o.value) == null ? void 0 : ge.id);
      });
      Y >= 0 && z.value.splice(Y, 1), m();
    } catch (Y) {
      !h.id && ((oe = (Z = (q = e.card) == null ? void 0 : q.messages) == null ? void 0 : Z.delete) != null && oe.error) && u.error(($ = (me = (de = e.card) == null ? void 0 : de.messages) == null ? void 0 : me.delete) == null ? void 0 : $.error(Y), {
        zIndex: 2e3
      }), console.error("Cubo:DataView", "removing error", Y);
    } finally {
      w({
        ...g.value,
        removing: !1
      });
    }
  }, U = async (h, _) => {
    var D, F, H, X, re, ae, I, P, V, K, G, q, Z, oe, de, me, $, Y, ee, ge, ce, fe, qe, st, lt, Ve, xt, dt, At, Pe;
    w({
      ...g.value,
      saving: !0
    });
    try {
      (F = (D = e.card) == null ? void 0 : D.hooks) != null && F.beforeSubmit && await ((H = e.card) == null ? void 0 : H.hooks.beforeSubmit(h));
      let Te;
      h.id ? Te = await ((I = (ae = e.queries) == null ? void 0 : ae.updateOne) == null ? void 0 : I.call(ae, {
        id: h.id
      }, h)) : Te = await ((re = (X = e.queries) == null ? void 0 : X.createOne) == null ? void 0 : re.call(X, h)), !h.id && ((K = (V = (P = e.card) == null ? void 0 : P.messages) == null ? void 0 : V.create) != null && K.success) ? u.success((G = e.card) == null ? void 0 : G.messages.create.success, {
        zIndex: 2e3
      }) : h.id && ((oe = (Z = (q = e.card) == null ? void 0 : q.messages) == null ? void 0 : Z.update) != null && oe.success) && u.success((de = e.card) == null ? void 0 : de.messages.update.success, {
        zIndex: 2e3
      }), Te && x(Te), ($ = (me = e.card) == null ? void 0 : me.hooks) != null && $.afterSubmit && await ((Y = e.card) == null ? void 0 : Y.hooks.afterSubmit(h, Te)), (_ == null ? void 0 : _.autoclose) !== !1 && m();
    } catch (Te) {
      console.error("Cubo:DataView", "submiting error", Te), h.id ? (xt = (Ve = (lt = e.card) == null ? void 0 : lt.messages) == null ? void 0 : Ve.update) != null && xt.error && u.error((Pe = (At = (dt = e.card) == null ? void 0 : dt.messages) == null ? void 0 : At.update) == null ? void 0 : Pe.error(Te), {
        zIndex: 2e3
      }) : (ce = (ge = (ee = e.card) == null ? void 0 : ee.messages) == null ? void 0 : ge.create) != null && ce.error && u.error((st = (qe = (fe = e.card) == null ? void 0 : fe.messages) == null ? void 0 : qe.create) == null ? void 0 : st.error(Te), {
        zIndex: 2e3
      });
    } finally {
      w({
        ...g.value,
        saving: !1
      });
    }
  };
  ye(() => {
    var h, _;
    p.value === "query" && k((a == null ? void 0 : a.query) || {}), C(), (h = e.card) != null && h.autoOpenByQuery && p.value === "query" && ((_ = a == null ? void 0 : a.query) != null && _.id) && A(+a.query.id);
  }), $e(() => {
    e.crdt && (i == null || i.unsubscribe());
  });
  const B = Q(() => a, (h) => {
    p.value === "query" && JSON.stringify(h.query) !== JSON.stringify(s.value) && k(h.query), C();
  }, {
    deep: !0
  });
  return t({
    fetch: C,
    change: T,
    rows: z.value
  }), Mu(() => {
    B();
  }), () => n("div", {
    class: "cubo-ui-data-view"
  }, [n(Ts, te(e.list, {
    totals: y.value,
    rows: z.value,
    query: s.value,
    onChangeFilters: T,
    onShowCard: A
  }), null), !!e.card && o.value && n(vs, te({
    card: o.value,
    rights: e.rights,
    loaders: g.value,
    queries: e.queries,
    onHide: m,
    onFetch: C,
    onSetLoaders: w,
    onSubmit: U,
    onRemove: R,
    onChange: x
  }, e.card), null)]);
}, {
  props: ["card", "list", "queries", "rights", "crdt"],
  emits: []
});
function Is(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ce(e);
}
const yl = /* @__PURE__ */ N({
  props: {
    image: {
      type: String,
      default: void 0
    },
    text: {
      type: String,
      default: void 0
    },
    route: {
      type: Object,
      default: () => {
      }
    }
  },
  setup(e, {
    slots: t
  }) {
    const a = () => t.default ? t.default() : n(se, null, [e.image && n("img", {
      src: e.image,
      alt: ""
    }, null), e.text && n("span", {
      innerHTML: e.text
    }, null)]);
    return () => {
      let l;
      return n("div", {
        class: "cubo-ui-navbar-logotype"
      }, [e.route && n(dn, {
        to: e.route,
        "data-nohover": !0
      }, Is(l = a()) ? l : {
        default: () => [l]
      }), !e.route && n("div", {
        class: "cubo-ui-navbar-logotype-wrap"
      }, [a()])]);
    };
  }
}), ml = /* @__PURE__ */ N({
  props: {
    elements: {
      type: Array,
      default: () => []
    }
  },
  setup(e) {
    const t = Hn();
    return () => n("div", {
      class: "cubo-ui-navbar-menu"
    }, [e.elements.map((a) => n(dn, {
      to: {
        name: a.route
      },
      "data-nohover": !0,
      class: {
        __active: a.active || a.route === (t == null ? void 0 : t.name)
      }
    }, {
      default: () => [a.label]
    }))]);
  }
}), gl = /* @__PURE__ */ N({
  setup() {
    var l;
    const [e, t] = Oe(((l = document.getElementById("app")) == null ? void 0 : l.classList.contains("__dark")) || !1, (u, i) => {
      u.value = i;
      const o = document.getElementById("app");
      localStorage.setItem("cubo_theme", i ? "dark" : "light"), o.dataset.theme = i ? "dark" : "light", window.CUBO.ee.emit("theme_changed", o.dataset.theme);
    }), a = (u) => {
      e.value = u === "dark";
    };
    return ye(() => {
      var u, i, o;
      (o = (i = (u = vl()) == null ? void 0 : u.CUBO) == null ? void 0 : i.ee) == null || o.on("theme_changed", a);
    }), $e(() => {
      var u, i, o;
      (o = (i = (u = vl()) == null ? void 0 : u.CUBO) == null ? void 0 : i.ee) == null || o.off("theme_changed", a);
    }), () => n("div", {
      class: {
        "cubo-ui-navbar-theme": !0
      }
    }, [n(sn, {
      size: "small",
      value: e.value,
      onChange: t,
      thumbIcon: e.value ? "moon" : "sun"
    }, null)]);
  }
}), Ls = /* @__PURE__ */ N({
  props: {
    name: {
      type: String,
      default: ""
    },
    pic: {
      type: String,
      default: ""
    },
    menu: {
      type: Array,
      default: () => []
    }
  },
  setup(e) {
    const [t, a] = Oe(!1), l = O(() => {
      if (!e.name) return [];
      const r = e.name.split(" ");
      return r.length >= 2 ? [r[0][0].toUpperCase(), r[1][0].toUpperCase()] : [r[0][0], r[0][1] || void 0].filter((c) => c).map((c) => c.toUpperCase());
    }), u = () => {
      a(!t.value);
    }, i = (r) => {
      const c = r.target;
      c && !c.classList.contains("cubo-ui-navbar-user") && !c.closest(".cubo-ui-navbar-user") && a(!1);
    }, o = (r, c) => {
      var s;
      (s = c.onClick) == null || s.call(c, r), a(!1);
    };
    return ye(() => {
      document.addEventListener("click", i);
    }), $e(() => {
      document.removeEventListener("click", i);
    }), () => {
      var r, c;
      return n("div", {
        class: {
          "cubo-ui-navbar-user": !0,
          __menu: ((r = e.menu) == null ? void 0 : r.length) > 0,
          __shown: t.value
        }
      }, [n("div", {
        class: "cubo-ui-navbar-user-info",
        onClick: u
      }, [e.pic && n("img", {
        src: e.pic
      }, null), !e.pic && l.value.length > 0 && n("span", null, [l.value.join("")]), n(M, {
        icon: "chevron-down"
      }, null)]), ((c = e.menu) == null ? void 0 : c.length) > 0 && n("div", {
        class: "cubo-ui-navbar-user-modal"
      }, [e.menu.map((s) => n(se, null, [s.delimiter && n("div", {
        class: "cubo-ui-navbar-user-modal-delimiter"
      }, null), !s.delimiter && s.link && n("a", {
        href: s.link,
        target: "_blank",
        "data-nohover": !0,
        class: "cubo-ui-navbar-user-modal-item"
      }, [s.label]), !s.delimiter && !s.link && s.route && n(dn, {
        class: "cubo-ui-navbar-user-modal-item",
        "data-nohover": !0,
        to: s.route
      }, {
        default: () => [s.label]
      }), !s.delimiter && !s.link && !s.route && n("div", {
        class: "cubo-ui-navbar-user-modal-item",
        onClick: (b) => o(b, s)
      }, [s.label])]))])]);
    };
  }
}), Pd = /* @__PURE__ */ N((e, {
  slots: t
}) => {
  const a = O(() => e.logotype || {}), l = O(() => typeof e.user != "boolean" ? e.user : {}), u = O(() => typeof e.theme != "boolean" ? e.theme : void 0), [i, o] = Oe(!1);
  return () => {
    var r;
    return n("div", {
      class: {
        "cubo-ui-navbar": !0
      }
    }, [n("div", {
      class: {
        "c-container c-mx-auto": e.containered
      }
    }, [t.logotype && n(yl, a.value, {
      default: () => {
        var c;
        return [(c = t.logotype) == null ? void 0 : c.call(t)];
      }
    }), !t.logotype && a.value && n(yl, a.value, null), t.after_logotype && t.after_logotype(), e.menu && n(ml, e.menu, null), t.after_menu && n("div", {
      class: "cubo-ui-navbar-after_menu"
    }, [t.after_menu()]), e.user && n(Ls, l.value, null), t.after_user && t.after_user(), e.user && n(gl, u.value, null), t.after_theme && t.after_theme(), n("div", {
      class: "cubo-ui-navbar-mobile"
    }, [n("div", {
      class: "cubo-ui-navbar-mobile-menu",
      onClick: () => o(!i.value)
    }, [n(M, {
      icon: "menu-2"
    }, null)]), i.value && n("div", {
      class: "cubo-ui-navbar-mobile-modal"
    }, [n("div", {
      class: "cubo-ui-navbar-mobile-modal-header"
    }, [n("span", null, [((r = l.value) == null ? void 0 : r.name) || ""]), n(M, {
      icon: "menu-2",
      onClick: () => o(!i.value)
    }, null)]), n("div", {
      class: "cubo-ui-navbar-mobile-modal-body"
    }, [e.menu && n(ml, e.menu, null), t.after_menu && n("div", {
      class: "cubo-ui-navbar-after_menu"
    }, [t.after_menu()]), t.after_user && t.after_user(), e.user && n(gl, u.value, null), t.after_theme && t.after_theme()])])])])]);
  };
}, {
  props: ["containered", "theme", "user", "menu", "logotype"]
}), Rd = ["value", "variants", "filterVariantsFunction", "multiple", "loading", "disabled", "readonly", "clearable", "searchable", "autoOpen", "teleportSelector", "size", "searchPlaceholder", "valuePlaceholder", "valueFormat", "maxShownVariants", "multipleValueMore", "variantsZIndex", "position", "flat", "searchProps", "rowProps", "variantCheck", "style", "class"], Nd = /* @__PURE__ */ N((e, {
  slots: t
}) => {
  const a = O(() => e.label !== void 0 || e.slotLabel !== void 0), l = () => typeof e.label == "function" ? e.label() : e.label ?? "", u = () => {
    const o = e.slotLabel ?? (t == null ? void 0 : t.label);
    return o ? typeof o != "function" ? o : o({
      label: e.label
    }) : n("div", {
      class: "cubo-ui-form-field-label"
    }, [n("p", null, [l()])]);
  }, i = () => {
    var o;
    return typeof e.slotBody < "u" ? typeof e.slotBody != "function" ? e.slotBody : e.slotBody() : n("div", {
      class: "cubo-ui-form-field-body"
    }, [(o = t.default) == null ? void 0 : o.call(t)]);
  };
  return () => n("div", {
    class: "cubo-ui-form-field"
  }, [a.value && u(), i()]);
}, {
  props: ["label", "slotLabel", "slotBody"],
  emits: ["keydown"]
}), qd = /* @__PURE__ */ N((e, {
  slots: t
}) => () => {
  var a;
  return n("div", {
    class: "cubo-ui-form-line"
  }, [(a = t.default) == null ? void 0 : a.call(t)]);
}, {
  props: [],
  emits: ["keydown"]
}), Md = /* @__PURE__ */ N((e, {
  emit: t,
  slots: a
}) => {
  const l = async () => {
    t("submit");
  };
  return () => {
    var u;
    return n("form", {
      class: {
        "cubo-ui-form": !0,
        __vertical: e.vertical
      },
      onSubmit: Rt(l, ["prevent", "stop"])
    }, [(u = a.default) == null ? void 0 : u.call(a)]);
  };
}, {
  inheritAttrs: !0,
  props: ["vertical"],
  emits: ["submit"]
}), Kd = /* @__PURE__ */ N((e) => {
  const t = Nu(), a = (l, u = 0, i) => l.map((o, r) => {
    var c, s, b, d;
    return n(se, null, [n("div", te(o.attrs || {}, {
      class: {
        "cubo-ui-sidebar-item": !0,
        __header: !!o.header,
        __group: !!o.group,
        [`__level_${u}`]: !0,
        [`__key_${r}`]: !0,
        ...((c = o.attrs) == null ? void 0 : c.class) || {}
      },
      style: {
        paddingLeft: 1.5 + u * 0.5 + "rem",
        ...((s = o.attrs) == null ? void 0 : s.style) || {}
      }
    }), [o.route && ((b = o.route) == null ? void 0 : b.name) && n(dn, {
      to: {
        name: o.route.name
      },
      custom: !0
    }, {
      default: ({
        isActive: f,
        href: y,
        navigate: v,
        route: g
      }) => n("a", {
        href: y,
        onClick: v,
        "data-nohover": !0,
        class: {
          "cubo-ui-sidebar-item-link": !0,
          __active: f || g.name === e.active
        }
      }, [o.label])
    }), !o.route && n("span", {
      class: {
        "cubo-ui-sidebar-item-label": !0
      }
    }, [o.label])]), o.children && ((d = o.children) == null ? void 0 : d.length) > 0 && a(o.children, u + 1)]);
  });
  return () => n("div", te({
    class: "cubo-ui-sidebar"
  }, e.attrs || {}), [t.header && n("div", {
    class: "cubo-ui-sidebar-header"
  }, [t.header()]), a(e.menu, 0), t.footer && n("div", {
    class: "cubo-ui-sidebar-footer"
  }, [t.footer()])]);
}, {
  props: ["menu", "attrs", "active"]
});
export {
  ld as BADGE_APPEARANCES,
  ad as CHIP_KINDS,
  nd as CHIP_STATES,
  Ms as CUBO_COLORS,
  $t as CUBO_DEFAULT_LANGUAGE,
  Sa as CUBO_ICON_BASE_URL,
  Us as CUBO_INPUT_TYPES,
  $u as CUBO_INTL_LOCALE,
  Ra as CUBO_KIT_TRANSLATIONS,
  Ku as CUBO_LANGUAGES,
  Rd as CUBO_SELECT_PROPS,
  jt as CUBO_SIZES,
  Vs as CUBO_STATES,
  ud as CUBO_TAG_ICONS,
  yd as CUBO_TEXT_LINK_ICONS,
  vd as CUBO_TEXT_LINK_SIZES,
  bd as CUBO_TEXT_LINK_TONES,
  Ro as CuboAlert,
  it as CuboAvatar,
  cd as CuboBadge,
  Ge as CuboBadgeLegacy,
  ie as CuboButton,
  dd as CuboButtonGroup,
  yn as CuboButtonGroupLegacy,
  sd as CuboButtonV2,
  Sr as CuboCalendar,
  ul as CuboCard,
  cn as CuboCheckbox,
  od as CuboChip,
  Ed as CuboColorPicker,
  Gs as CuboConfig,
  qo as CuboConfirm,
  Sc as CuboData,
  Bd as CuboDataView,
  Od as CuboDataViewCardFormLine,
  Mt as CuboDatePicker,
  iu as CuboDrawer,
  pd as CuboDropdown,
  mn as CuboEmpty,
  Cd as CuboEmptyContent,
  wd as CuboEmptyDescription,
  gd as CuboEmptyHeader,
  hd as CuboEmptyMedia,
  _d as CuboEmptyTitle,
  Td as CuboEventsBox,
  rr as CuboExpander,
  Md as CuboForm,
  Nd as CuboFormField,
  qd as CuboFormLine,
  Vu as CuboI18n,
  M as CuboIcon,
  $c as CuboInlineConfirm,
  kd as CuboMessages,
  cs as CuboMessagesLegacy,
  Id as CuboMessagesLegacyComponent,
  Kt as CuboModal,
  Pd as CuboNavbar,
  xd as CuboOtp,
  Ql as CuboPagination,
  Jn as CuboPopup,
  zd as CuboRadio,
  Ad as CuboSearch,
  je as CuboSelect,
  mr as CuboSelectVariants,
  Kd as CuboSidebar,
  Xn as CuboSortable,
  Ae as CuboSpinner,
  sn as CuboSwitch,
  es as CuboTable,
  Qn as CuboTabs,
  id as CuboTag,
  rd as CuboTagGroup,
  pe as CuboText,
  md as CuboTextLink,
  Vl as CuboTextarea,
  Wr as CuboTimeline,
  fd as CuboToggleGroup,
  Dd as CuboTooltip,
  Vd as ICON_NAMES,
  Ud as KNOWN_ICON_NAMES,
  Vn as MESSAGES_Z_INDEX,
  ei as STATE_ICON,
  Xs as TAG_APPEARANCES,
  td as TAG_SHAPES,
  ed as TAG_SIZES,
  Js as TAG_TONES,
  xl as affixIconSize,
  $s as applyPrimary,
  js as applyRadius,
  qs as clearCuboIconCache,
  Fd as copyToClipboard,
  Rs as createCuboI18n,
  Sd as createCuboMessages,
  Ld as createMessages,
  Ws as cuboAlert,
  Uo as cuboConfirm,
  Hu as cuboExtractSvgInner,
  Al as cuboFocusableElements,
  un as cuboGet,
  pl as cuboGetConfig,
  Jt as cuboHexToHsv,
  ri as cuboHexToRgb,
  kn as cuboHsvToHex,
  Uu as cuboIconBaseUrl,
  ka as cuboIconUrl,
  Cl as cuboInterpolate,
  le as cuboKitT,
  zl as cuboLockBodyScroll,
  Xt as cuboNormalizeHex,
  Ee as cuboPortalTarget,
  ju as cuboResolveLanguage,
  ci as cuboRgbToHex,
  Ks as cuboSetConfig,
  Wu as cuboSubscribeConfig,
  W as cx,
  Ns as detectBrowserLanguage,
  nt as devWarn,
  ti as escapeXml,
  li as formatInputValue,
  vl as getGlobalStorage,
  Ca as getIconMarkup,
  Oo as hasCuboIconFontProvider,
  Hd as hasIcon,
  Da as iconInnerMarkup,
  bl as isNumeric,
  Hs as isTextLike,
  Gu as loadCuboGeneratedIcon,
  xa as loadCuboIconFile,
  hs as parseRouteQuery,
  rt as popoverFixedStyle,
  Sl as popoverFlipUpTop,
  _s as prepareFiltersToFetch,
  ea as prepareFiltersToRouteQuery,
  ai as readInputValue,
  Zs as registerCuboIconFontProvider,
  Gd as registerIcons,
  Be as resolveColor,
  Na as resolveCuboIconFont,
  kl as toCssSize,
  Qs as useAlert,
  Ys as useConfirm,
  ct as useCuboBackground,
  Lo as useCuboIconBaseUrl,
  Fo as useCuboIconSource,
  _e as useCuboLanguage,
  ss as useMessages,
  Oe as useRef
};
//# sourceMappingURL=cubo-ui-vue.js.map
