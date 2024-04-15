try {
  self["workbox:core:7.0.0"] && _();
} catch {
}
const $ = (s, ...e) => {
  let t = s;
  return e.length > 0 && (t += ` :: ${JSON.stringify(e)}`), t;
}, G = $;
class h extends Error {
  /**
   *
   * @param {string} errorCode The error code that
   * identifies this particular error.
   * @param {Object=} details Any relevant arguments
   * that will help developers identify issues should
   * be added as a key on the context object.
   */
  constructor(e, t) {
    const n = G(e, t);
    super(n), this.name = e, this.details = t;
  }
}
const f = {
  googleAnalytics: "googleAnalytics",
  precache: "precache-v2",
  prefix: "workbox",
  runtime: "runtime",
  suffix: typeof registration < "u" ? registration.scope : ""
}, U = (s) => [f.prefix, s, f.suffix].filter((e) => e && e.length > 0).join("-"), V = (s) => {
  for (const e of Object.keys(f))
    s(e);
}, C = {
  updateDetails: (s) => {
    V((e) => {
      typeof s[e] == "string" && (f[e] = s[e]);
    });
  },
  getGoogleAnalyticsName: (s) => s || U(f.googleAnalytics),
  getPrecacheName: (s) => s || U(f.precache),
  getPrefix: () => f.prefix,
  getRuntimeName: (s) => s || U(f.runtime),
  getSuffix: () => f.suffix
};
function N(s, e) {
  const t = e();
  return s.waitUntil(t), t;
}
try {
  self["workbox:precaching:7.0.0"] && _();
} catch {
}
const Q = "__WB_REVISION__";
function z(s) {
  if (!s)
    throw new h("add-to-cache-list-unexpected-type", { entry: s });
  if (typeof s == "string") {
    const r = new URL(s, location.href);
    return {
      cacheKey: r.href,
      url: r.href
    };
  }
  const { revision: e, url: t } = s;
  if (!t)
    throw new h("add-to-cache-list-unexpected-type", { entry: s });
  if (!e) {
    const r = new URL(t, location.href);
    return {
      cacheKey: r.href,
      url: r.href
    };
  }
  const n = new URL(t, location.href), a = new URL(t, location.href);
  return n.searchParams.set(Q, e), {
    cacheKey: n.href,
    url: a.href
  };
}
class J {
  constructor() {
    this.updatedURLs = [], this.notUpdatedURLs = [], this.handlerWillStart = async ({ request: e, state: t }) => {
      t && (t.originalRequest = e);
    }, this.cachedResponseWillBeUsed = async ({ event: e, state: t, cachedResponse: n }) => {
      if (e.type === "install" && t && t.originalRequest && t.originalRequest instanceof Request) {
        const a = t.originalRequest.url;
        n ? this.notUpdatedURLs.push(a) : this.updatedURLs.push(a);
      }
      return n;
    };
  }
}
class X {
  constructor({ precacheController: e }) {
    this.cacheKeyWillBeUsed = async ({ request: t, params: n }) => {
      const a = (n == null ? void 0 : n.cacheKey) || this._precacheController.getCacheKeyForURL(t.url);
      return a ? new Request(a, { headers: t.headers }) : t;
    }, this._precacheController = e;
  }
}
let y;
function Y() {
  if (y === void 0) {
    const s = new Response("");
    if ("body" in s)
      try {
        new Response(s.body), y = !0;
      } catch {
        y = !1;
      }
    y = !1;
  }
  return y;
}
async function Z(s, e) {
  let t = null;
  if (s.url && (t = new URL(s.url).origin), t !== self.location.origin)
    throw new h("cross-origin-copy-response", { origin: t });
  const n = s.clone(), a = {
    headers: new Headers(n.headers),
    status: n.status,
    statusText: n.statusText
  }, r = e ? e(a) : a, c = Y() ? n.body : await n.blob();
  return new Response(c, r);
}
const ee = (s) => new URL(String(s), location.href).href.replace(new RegExp(`^${location.origin}`), "");
function M(s, e) {
  const t = new URL(s);
  for (const n of e)
    t.searchParams.delete(n);
  return t.href;
}
async function te(s, e, t, n) {
  const a = M(e.url, t);
  if (e.url === a)
    return s.match(e, n);
  const r = Object.assign(Object.assign({}, n), { ignoreSearch: !0 }), c = await s.keys(e, r);
  for (const i of c) {
    const o = M(i.url, t);
    if (a === o)
      return s.match(i, n);
  }
}
class se {
  /**
   * Creates a promise and exposes its resolve and reject functions as methods.
   */
  constructor() {
    this.promise = new Promise((e, t) => {
      this.resolve = e, this.reject = t;
    });
  }
}
const ne = /* @__PURE__ */ new Set();
async function ae() {
  for (const s of ne)
    await s();
}
function re(s) {
  return new Promise((e) => setTimeout(e, s));
}
try {
  self["workbox:strategies:7.0.0"] && _();
} catch {
}
function R(s) {
  return typeof s == "string" ? new Request(s) : s;
}
class ce {
  /**
   * Creates a new instance associated with the passed strategy and event
   * that's handling the request.
   *
   * The constructor also initializes the state that will be passed to each of
   * the plugins handling this request.
   *
   * @param {workbox-strategies.Strategy} strategy
   * @param {Object} options
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params] The return value from the
   *     {@link workbox-routing~matchCallback} (if applicable).
   */
  constructor(e, t) {
    this._cacheKeys = {}, Object.assign(this, t), this.event = t.event, this._strategy = e, this._handlerDeferred = new se(), this._extendLifetimePromises = [], this._plugins = [...e.plugins], this._pluginStateMap = /* @__PURE__ */ new Map();
    for (const n of this._plugins)
      this._pluginStateMap.set(n, {});
    this.event.waitUntil(this._handlerDeferred.promise);
  }
  /**
   * Fetches a given request (and invokes any applicable plugin callback
   * methods) using the `fetchOptions` (for non-navigation requests) and
   * `plugins` defined on the `Strategy` object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - `requestWillFetch()`
   * - `fetchDidSucceed()`
   * - `fetchDidFail()`
   *
   * @param {Request|string} input The URL or request to fetch.
   * @return {Promise<Response>}
   */
  async fetch(e) {
    const { event: t } = this;
    let n = R(e);
    if (n.mode === "navigate" && t instanceof FetchEvent && t.preloadResponse) {
      const c = await t.preloadResponse;
      if (c)
        return c;
    }
    const a = this.hasCallback("fetchDidFail") ? n.clone() : null;
    try {
      for (const c of this.iterateCallbacks("requestWillFetch"))
        n = await c({ request: n.clone(), event: t });
    } catch (c) {
      if (c instanceof Error)
        throw new h("plugin-error-request-will-fetch", {
          thrownErrorMessage: c.message
        });
    }
    const r = n.clone();
    try {
      let c;
      c = await fetch(n, n.mode === "navigate" ? void 0 : this._strategy.fetchOptions);
      for (const i of this.iterateCallbacks("fetchDidSucceed"))
        c = await i({
          event: t,
          request: r,
          response: c
        });
      return c;
    } catch (c) {
      throw a && await this.runCallbacks("fetchDidFail", {
        error: c,
        event: t,
        originalRequest: a.clone(),
        request: r.clone()
      }), c;
    }
  }
  /**
   * Calls `this.fetch()` and (in the background) runs `this.cachePut()` on
   * the response generated by `this.fetch()`.
   *
   * The call to `this.cachePut()` automatically invokes `this.waitUntil()`,
   * so you do not have to manually call `waitUntil()` on the event.
   *
   * @param {Request|string} input The request or URL to fetch and cache.
   * @return {Promise<Response>}
   */
  async fetchAndCachePut(e) {
    const t = await this.fetch(e), n = t.clone();
    return this.waitUntil(this.cachePut(e, n)), t;
  }
  /**
   * Matches a request from the cache (and invokes any applicable plugin
   * callback methods) using the `cacheName`, `matchOptions`, and `plugins`
   * defined on the strategy object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - cacheKeyWillByUsed()
   * - cachedResponseWillByUsed()
   *
   * @param {Request|string} key The Request or URL to use as the cache key.
   * @return {Promise<Response|undefined>} A matching response, if found.
   */
  async cacheMatch(e) {
    const t = R(e);
    let n;
    const { cacheName: a, matchOptions: r } = this._strategy, c = await this.getCacheKey(t, "read"), i = Object.assign(Object.assign({}, r), { cacheName: a });
    n = await caches.match(c, i);
    for (const o of this.iterateCallbacks("cachedResponseWillBeUsed"))
      n = await o({
        cacheName: a,
        matchOptions: r,
        cachedResponse: n,
        request: c,
        event: this.event
      }) || void 0;
    return n;
  }
  /**
   * Puts a request/response pair in the cache (and invokes any applicable
   * plugin callback methods) using the `cacheName` and `plugins` defined on
   * the strategy object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - cacheKeyWillByUsed()
   * - cacheWillUpdate()
   * - cacheDidUpdate()
   *
   * @param {Request|string} key The request or URL to use as the cache key.
   * @param {Response} response The response to cache.
   * @return {Promise<boolean>} `false` if a cacheWillUpdate caused the response
   * not be cached, and `true` otherwise.
   */
  async cachePut(e, t) {
    const n = R(e);
    await re(0);
    const a = await this.getCacheKey(n, "write");
    if (!t)
      throw new h("cache-put-with-no-response", {
        url: ee(a.url)
      });
    const r = await this._ensureResponseSafeToCache(t);
    if (!r)
      return !1;
    const { cacheName: c, matchOptions: i } = this._strategy, o = await self.caches.open(c), l = this.hasCallback("cacheDidUpdate"), g = l ? await te(
      // TODO(philipwalton): the `__WB_REVISION__` param is a precaching
      // feature. Consider into ways to only add this behavior if using
      // precaching.
      o,
      a.clone(),
      ["__WB_REVISION__"],
      i
    ) : null;
    try {
      await o.put(a, l ? r.clone() : r);
    } catch (u) {
      if (u instanceof Error)
        throw u.name === "QuotaExceededError" && await ae(), u;
    }
    for (const u of this.iterateCallbacks("cacheDidUpdate"))
      await u({
        cacheName: c,
        oldResponse: g,
        newResponse: r.clone(),
        request: a,
        event: this.event
      });
    return !0;
  }
  /**
   * Checks the list of plugins for the `cacheKeyWillBeUsed` callback, and
   * executes any of those callbacks found in sequence. The final `Request`
   * object returned by the last plugin is treated as the cache key for cache
   * reads and/or writes. If no `cacheKeyWillBeUsed` plugin callbacks have
   * been registered, the passed request is returned unmodified
   *
   * @param {Request} request
   * @param {string} mode
   * @return {Promise<Request>}
   */
  async getCacheKey(e, t) {
    const n = `${e.url} | ${t}`;
    if (!this._cacheKeys[n]) {
      let a = e;
      for (const r of this.iterateCallbacks("cacheKeyWillBeUsed"))
        a = R(await r({
          mode: t,
          request: a,
          event: this.event,
          // params has a type any can't change right now.
          params: this.params
          // eslint-disable-line
        }));
      this._cacheKeys[n] = a;
    }
    return this._cacheKeys[n];
  }
  /**
   * Returns true if the strategy has at least one plugin with the given
   * callback.
   *
   * @param {string} name The name of the callback to check for.
   * @return {boolean}
   */
  hasCallback(e) {
    for (const t of this._strategy.plugins)
      if (e in t)
        return !0;
    return !1;
  }
  /**
   * Runs all plugin callbacks matching the given name, in order, passing the
   * given param object (merged ith the current plugin state) as the only
   * argument.
   *
   * Note: since this method runs all plugins, it's not suitable for cases
   * where the return value of a callback needs to be applied prior to calling
   * the next callback. See
   * {@link workbox-strategies.StrategyHandler#iterateCallbacks}
   * below for how to handle that case.
   *
   * @param {string} name The name of the callback to run within each plugin.
   * @param {Object} param The object to pass as the first (and only) param
   *     when executing each callback. This object will be merged with the
   *     current plugin state prior to callback execution.
   */
  async runCallbacks(e, t) {
    for (const n of this.iterateCallbacks(e))
      await n(t);
  }
  /**
   * Accepts a callback and returns an iterable of matching plugin callbacks,
   * where each callback is wrapped with the current handler state (i.e. when
   * you call each callback, whatever object parameter you pass it will
   * be merged with the plugin's current state).
   *
   * @param {string} name The name fo the callback to run
   * @return {Array<Function>}
   */
  *iterateCallbacks(e) {
    for (const t of this._strategy.plugins)
      if (typeof t[e] == "function") {
        const n = this._pluginStateMap.get(t);
        yield (r) => {
          const c = Object.assign(Object.assign({}, r), { state: n });
          return t[e](c);
        };
      }
  }
  /**
   * Adds a promise to the
   * [extend lifetime promises]{@link https://w3c.github.io/ServiceWorker/#extendableevent-extend-lifetime-promises}
   * of the event event associated with the request being handled (usually a
   * `FetchEvent`).
   *
   * Note: you can await
   * {@link workbox-strategies.StrategyHandler~doneWaiting}
   * to know when all added promises have settled.
   *
   * @param {Promise} promise A promise to add to the extend lifetime promises
   *     of the event that triggered the request.
   */
  waitUntil(e) {
    return this._extendLifetimePromises.push(e), e;
  }
  /**
   * Returns a promise that resolves once all promises passed to
   * {@link workbox-strategies.StrategyHandler~waitUntil}
   * have settled.
   *
   * Note: any work done after `doneWaiting()` settles should be manually
   * passed to an event's `waitUntil()` method (not this handler's
   * `waitUntil()` method), otherwise the service worker thread my be killed
   * prior to your work completing.
   */
  async doneWaiting() {
    let e;
    for (; e = this._extendLifetimePromises.shift(); )
      await e;
  }
  /**
   * Stops running the strategy and immediately resolves any pending
   * `waitUntil()` promises.
   */
  destroy() {
    this._handlerDeferred.resolve(null);
  }
  /**
   * This method will call cacheWillUpdate on the available plugins (or use
   * status === 200) to determine if the Response is safe and valid to cache.
   *
   * @param {Request} options.request
   * @param {Response} options.response
   * @return {Promise<Response|undefined>}
   *
   * @private
   */
  async _ensureResponseSafeToCache(e) {
    let t = e, n = !1;
    for (const a of this.iterateCallbacks("cacheWillUpdate"))
      if (t = await a({
        request: this.request,
        response: t,
        event: this.event
      }) || void 0, n = !0, !t)
        break;
    return n || t && t.status !== 200 && (t = void 0), t;
  }
}
class W {
  /**
   * Creates a new instance of the strategy and sets all documented option
   * properties as public instance properties.
   *
   * Note: if a custom strategy class extends the base Strategy class and does
   * not need more than these properties, it does not need to define its own
   * constructor.
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to the cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
   * `fetch()` requests made by this strategy.
   * @param {Object} [options.matchOptions] The
   * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
   * for any `cache.match()` or `cache.put()` calls made by this strategy.
   */
  constructor(e = {}) {
    this.cacheName = C.getRuntimeName(e.cacheName), this.plugins = e.plugins || [], this.fetchOptions = e.fetchOptions, this.matchOptions = e.matchOptions;
  }
  /**
   * Perform a request strategy and returns a `Promise` that will resolve with
   * a `Response`, invoking all relevant plugin callbacks.
   *
   * When a strategy instance is registered with a Workbox
   * {@link workbox-routing.Route}, this method is automatically
   * called when the route matches.
   *
   * Alternatively, this method can be used in a standalone `FetchEvent`
   * listener by passing it to `event.respondWith()`.
   *
   * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
   *     properties listed below.
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params]
   */
  handle(e) {
    const [t] = this.handleAll(e);
    return t;
  }
  /**
   * Similar to {@link workbox-strategies.Strategy~handle}, but
   * instead of just returning a `Promise` that resolves to a `Response` it
   * it will return an tuple of `[response, done]` promises, where the former
   * (`response`) is equivalent to what `handle()` returns, and the latter is a
   * Promise that will resolve once any promises that were added to
   * `event.waitUntil()` as part of performing the strategy have completed.
   *
   * You can await the `done` promise to ensure any extra work performed by
   * the strategy (usually caching responses) completes successfully.
   *
   * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
   *     properties listed below.
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params]
   * @return {Array<Promise>} A tuple of [response, done]
   *     promises that can be used to determine when the response resolves as
   *     well as when the handler has completed all its work.
   */
  handleAll(e) {
    e instanceof FetchEvent && (e = {
      event: e,
      request: e.request
    });
    const t = e.event, n = typeof e.request == "string" ? new Request(e.request) : e.request, a = "params" in e ? e.params : void 0, r = new ce(this, { event: t, request: n, params: a }), c = this._getResponse(r, n, t), i = this._awaitComplete(c, r, n, t);
    return [c, i];
  }
  async _getResponse(e, t, n) {
    await e.runCallbacks("handlerWillStart", { event: n, request: t });
    let a;
    try {
      if (a = await this._handle(t, e), !a || a.type === "error")
        throw new h("no-response", { url: t.url });
    } catch (r) {
      if (r instanceof Error) {
        for (const c of e.iterateCallbacks("handlerDidError"))
          if (a = await c({ error: r, event: n, request: t }), a)
            break;
      }
      if (!a)
        throw r;
    }
    for (const r of e.iterateCallbacks("handlerWillRespond"))
      a = await r({ event: n, request: t, response: a });
    return a;
  }
  async _awaitComplete(e, t, n, a) {
    let r, c;
    try {
      r = await e;
    } catch {
    }
    try {
      await t.runCallbacks("handlerDidRespond", {
        event: a,
        request: n,
        response: r
      }), await t.doneWaiting();
    } catch (i) {
      i instanceof Error && (c = i);
    }
    if (await t.runCallbacks("handlerDidComplete", {
      event: a,
      request: n,
      response: r,
      error: c
    }), t.destroy(), c)
      throw c;
  }
}
class d extends W {
  /**
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to the cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] {@link https://developers.google.com/web/tools/workbox/guides/using-plugins|Plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters|init}
   * of all fetch() requests made by this strategy.
   * @param {Object} [options.matchOptions] The
   * {@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions|CacheQueryOptions}
   * for any `cache.match()` or `cache.put()` calls made by this strategy.
   * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
   * get the response from the network if there's a precache miss.
   */
  constructor(e = {}) {
    e.cacheName = C.getPrecacheName(e.cacheName), super(e), this._fallbackToNetwork = e.fallbackToNetwork !== !1, this.plugins.push(d.copyRedirectedCacheableResponsesPlugin);
  }
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(e, t) {
    const n = await t.cacheMatch(e);
    return n || (t.event && t.event.type === "install" ? await this._handleInstall(e, t) : await this._handleFetch(e, t));
  }
  async _handleFetch(e, t) {
    let n;
    const a = t.params || {};
    if (this._fallbackToNetwork) {
      const r = a.integrity, c = e.integrity, i = !c || c === r;
      n = await t.fetch(new Request(e, {
        integrity: e.mode !== "no-cors" ? c || r : void 0
      })), r && i && e.mode !== "no-cors" && (this._useDefaultCacheabilityPluginIfNeeded(), await t.cachePut(e, n.clone()));
    } else
      throw new h("missing-precache-entry", {
        cacheName: this.cacheName,
        url: e.url
      });
    return n;
  }
  async _handleInstall(e, t) {
    this._useDefaultCacheabilityPluginIfNeeded();
    const n = await t.fetch(e);
    if (!await t.cachePut(e, n.clone()))
      throw new h("bad-precaching-response", {
        url: e.url,
        status: n.status
      });
    return n;
  }
  /**
   * This method is complex, as there a number of things to account for:
   *
   * The `plugins` array can be set at construction, and/or it might be added to
   * to at any time before the strategy is used.
   *
   * At the time the strategy is used (i.e. during an `install` event), there
   * needs to be at least one plugin that implements `cacheWillUpdate` in the
   * array, other than `copyRedirectedCacheableResponsesPlugin`.
   *
   * - If this method is called and there are no suitable `cacheWillUpdate`
   * plugins, we need to add `defaultPrecacheCacheabilityPlugin`.
   *
   * - If this method is called and there is exactly one `cacheWillUpdate`, then
   * we don't have to do anything (this might be a previously added
   * `defaultPrecacheCacheabilityPlugin`, or it might be a custom plugin).
   *
   * - If this method is called and there is more than one `cacheWillUpdate`,
   * then we need to check if one is `defaultPrecacheCacheabilityPlugin`. If so,
   * we need to remove it. (This situation is unlikely, but it could happen if
   * the strategy is used multiple times, the first without a `cacheWillUpdate`,
   * and then later on after manually adding a custom `cacheWillUpdate`.)
   *
   * See https://github.com/GoogleChrome/workbox/issues/2737 for more context.
   *
   * @private
   */
  _useDefaultCacheabilityPluginIfNeeded() {
    let e = null, t = 0;
    for (const [n, a] of this.plugins.entries())
      a !== d.copyRedirectedCacheableResponsesPlugin && (a === d.defaultPrecacheCacheabilityPlugin && (e = n), a.cacheWillUpdate && t++);
    t === 0 ? this.plugins.push(d.defaultPrecacheCacheabilityPlugin) : t > 1 && e !== null && this.plugins.splice(e, 1);
  }
}
d.defaultPrecacheCacheabilityPlugin = {
  async cacheWillUpdate({ response: s }) {
    return !s || s.status >= 400 ? null : s;
  }
};
d.copyRedirectedCacheableResponsesPlugin = {
  async cacheWillUpdate({ response: s }) {
    return s.redirected ? await Z(s) : s;
  }
};
class ie {
  /**
   * Create a new PrecacheController.
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] The cache to use for precaching.
   * @param {string} [options.plugins] Plugins to use when precaching as well
   * as responding to fetch events for precached assets.
   * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
   * get the response from the network if there's a precache miss.
   */
  constructor({ cacheName: e, plugins: t = [], fallbackToNetwork: n = !0 } = {}) {
    this._urlsToCacheKeys = /* @__PURE__ */ new Map(), this._urlsToCacheModes = /* @__PURE__ */ new Map(), this._cacheKeysToIntegrities = /* @__PURE__ */ new Map(), this._strategy = new d({
      cacheName: C.getPrecacheName(e),
      plugins: [
        ...t,
        new X({ precacheController: this })
      ],
      fallbackToNetwork: n
    }), this.install = this.install.bind(this), this.activate = this.activate.bind(this);
  }
  /**
   * @type {workbox-precaching.PrecacheStrategy} The strategy created by this controller and
   * used to cache assets and respond to fetch events.
   */
  get strategy() {
    return this._strategy;
  }
  /**
   * Adds items to the precache list, removing any duplicates and
   * stores the files in the
   * {@link workbox-core.cacheNames|"precache cache"} when the service
   * worker installs.
   *
   * This method can be called multiple times.
   *
   * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
   */
  precache(e) {
    this.addToCacheList(e), this._installAndActiveListenersAdded || (self.addEventListener("install", this.install), self.addEventListener("activate", this.activate), this._installAndActiveListenersAdded = !0);
  }
  /**
   * This method will add items to the precache list, removing duplicates
   * and ensuring the information is valid.
   *
   * @param {Array<workbox-precaching.PrecacheController.PrecacheEntry|string>} entries
   *     Array of entries to precache.
   */
  addToCacheList(e) {
    const t = [];
    for (const n of e) {
      typeof n == "string" ? t.push(n) : n && n.revision === void 0 && t.push(n.url);
      const { cacheKey: a, url: r } = z(n), c = typeof n != "string" && n.revision ? "reload" : "default";
      if (this._urlsToCacheKeys.has(r) && this._urlsToCacheKeys.get(r) !== a)
        throw new h("add-to-cache-list-conflicting-entries", {
          firstEntry: this._urlsToCacheKeys.get(r),
          secondEntry: a
        });
      if (typeof n != "string" && n.integrity) {
        if (this._cacheKeysToIntegrities.has(a) && this._cacheKeysToIntegrities.get(a) !== n.integrity)
          throw new h("add-to-cache-list-conflicting-integrities", {
            url: r
          });
        this._cacheKeysToIntegrities.set(a, n.integrity);
      }
      if (this._urlsToCacheKeys.set(r, a), this._urlsToCacheModes.set(r, c), t.length > 0) {
        const i = `Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
        console.warn(i);
      }
    }
  }
  /**
   * Precaches new and updated assets. Call this method from the service worker
   * install event.
   *
   * Note: this method calls `event.waitUntil()` for you, so you do not need
   * to call it yourself in your event handlers.
   *
   * @param {ExtendableEvent} event
   * @return {Promise<workbox-precaching.InstallResult>}
   */
  install(e) {
    return N(e, async () => {
      const t = new J();
      this.strategy.plugins.push(t);
      for (const [r, c] of this._urlsToCacheKeys) {
        const i = this._cacheKeysToIntegrities.get(c), o = this._urlsToCacheModes.get(r), l = new Request(r, {
          integrity: i,
          cache: o,
          credentials: "same-origin"
        });
        await Promise.all(this.strategy.handleAll({
          params: { cacheKey: c },
          request: l,
          event: e
        }));
      }
      const { updatedURLs: n, notUpdatedURLs: a } = t;
      return { updatedURLs: n, notUpdatedURLs: a };
    });
  }
  /**
   * Deletes assets that are no longer present in the current precache manifest.
   * Call this method from the service worker activate event.
   *
   * Note: this method calls `event.waitUntil()` for you, so you do not need
   * to call it yourself in your event handlers.
   *
   * @param {ExtendableEvent} event
   * @return {Promise<workbox-precaching.CleanupResult>}
   */
  activate(e) {
    return N(e, async () => {
      const t = await self.caches.open(this.strategy.cacheName), n = await t.keys(), a = new Set(this._urlsToCacheKeys.values()), r = [];
      for (const c of n)
        a.has(c.url) || (await t.delete(c), r.push(c.url));
      return { deletedURLs: r };
    });
  }
  /**
   * Returns a mapping of a precached URL to the corresponding cache key, taking
   * into account the revision information for the URL.
   *
   * @return {Map<string, string>} A URL to cache key mapping.
   */
  getURLsToCacheKeys() {
    return this._urlsToCacheKeys;
  }
  /**
   * Returns a list of all the URLs that have been precached by the current
   * service worker.
   *
   * @return {Array<string>} The precached URLs.
   */
  getCachedURLs() {
    return [...this._urlsToCacheKeys.keys()];
  }
  /**
   * Returns the cache key used for storing a given URL. If that URL is
   * unversioned, like `/index.html', then the cache key will be the original
   * URL with a search parameter appended to it.
   *
   * @param {string} url A URL whose cache key you want to look up.
   * @return {string} The versioned URL that corresponds to a cache key
   * for the original URL, or undefined if that URL isn't precached.
   */
  getCacheKeyForURL(e) {
    const t = new URL(e, location.href);
    return this._urlsToCacheKeys.get(t.href);
  }
  /**
   * @param {string} url A cache key whose SRI you want to look up.
   * @return {string} The subresource integrity associated with the cache key,
   * or undefined if it's not set.
   */
  getIntegrityForCacheKey(e) {
    return this._cacheKeysToIntegrities.get(e);
  }
  /**
   * This acts as a drop-in replacement for
   * [`cache.match()`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match)
   * with the following differences:
   *
   * - It knows what the name of the precache is, and only checks in that cache.
   * - It allows you to pass in an "original" URL without versioning parameters,
   * and it will automatically look up the correct cache key for the currently
   * active revision of that URL.
   *
   * E.g., `matchPrecache('index.html')` will find the correct precached
   * response for the currently active service worker, even if the actual cache
   * key is `'/index.html?__WB_REVISION__=1234abcd'`.
   *
   * @param {string|Request} request The key (without revisioning parameters)
   * to look up in the precache.
   * @return {Promise<Response|undefined>}
   */
  async matchPrecache(e) {
    const t = e instanceof Request ? e.url : e, n = this.getCacheKeyForURL(t);
    if (n)
      return (await self.caches.open(this.strategy.cacheName)).match(n);
  }
  /**
   * Returns a function that looks up `url` in the precache (taking into
   * account revision information), and returns the corresponding `Response`.
   *
   * @param {string} url The precached URL which will be used to lookup the
   * `Response`.
   * @return {workbox-routing~handlerCallback}
   */
  createHandlerBoundToURL(e) {
    const t = this.getCacheKeyForURL(e);
    if (!t)
      throw new h("non-precached-url", { url: e });
    return (n) => (n.request = new Request(e), n.params = Object.assign({ cacheKey: t }, n.params), this.strategy.handle(n));
  }
}
let L;
const v = () => (L || (L = new ie()), L);
try {
  self["workbox:routing:7.0.0"] && _();
} catch {
}
const B = "GET", b = (s) => s && typeof s == "object" ? s : { handle: s };
class p {
  /**
   * Constructor for Route class.
   *
   * @param {workbox-routing~matchCallback} match
   * A callback function that determines whether the route matches a given
   * `fetch` event by returning a non-falsy value.
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(e, t, n = B) {
    this.handler = b(t), this.match = e, this.method = n;
  }
  /**
   *
   * @param {workbox-routing-handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response
   */
  setCatchHandler(e) {
    this.catchHandler = b(e);
  }
}
class oe extends p {
  /**
   * If the regular expression contains
   * [capture groups]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#grouping-back-references},
   * the captured values will be passed to the
   * {@link workbox-routing~handlerCallback} `params`
   * argument.
   *
   * @param {RegExp} regExp The regular expression to match against URLs.
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(e, t, n) {
    const a = ({ url: r }) => {
      const c = e.exec(r.href);
      if (c && !(r.origin !== location.origin && c.index !== 0))
        return c.slice(1);
    };
    super(a, t, n);
  }
}
class le {
  /**
   * Initializes a new Router.
   */
  constructor() {
    this._routes = /* @__PURE__ */ new Map(), this._defaultHandlerMap = /* @__PURE__ */ new Map();
  }
  /**
   * @return {Map<string, Array<workbox-routing.Route>>} routes A `Map` of HTTP
   * method name ('GET', etc.) to an array of all the corresponding `Route`
   * instances that are registered.
   */
  get routes() {
    return this._routes;
  }
  /**
   * Adds a fetch event listener to respond to events when a route matches
   * the event's request.
   */
  addFetchListener() {
    self.addEventListener("fetch", (e) => {
      const { request: t } = e, n = this.handleRequest({ request: t, event: e });
      n && e.respondWith(n);
    });
  }
  /**
   * Adds a message event listener for URLs to cache from the window.
   * This is useful to cache resources loaded on the page prior to when the
   * service worker started controlling it.
   *
   * The format of the message data sent from the window should be as follows.
   * Where the `urlsToCache` array may consist of URL strings or an array of
   * URL string + `requestInit` object (the same as you'd pass to `fetch()`).
   *
   * ```
   * {
   *   type: 'CACHE_URLS',
   *   payload: {
   *     urlsToCache: [
   *       './script1.js',
   *       './script2.js',
   *       ['./script3.js', {mode: 'no-cors'}],
   *     ],
   *   },
   * }
   * ```
   */
  addCacheListener() {
    self.addEventListener("message", (e) => {
      if (e.data && e.data.type === "CACHE_URLS") {
        const { payload: t } = e.data, n = Promise.all(t.urlsToCache.map((a) => {
          typeof a == "string" && (a = [a]);
          const r = new Request(...a);
          return this.handleRequest({ request: r, event: e });
        }));
        e.waitUntil(n), e.ports && e.ports[0] && n.then(() => e.ports[0].postMessage(!0));
      }
    });
  }
  /**
   * Apply the routing rules to a FetchEvent object to get a Response from an
   * appropriate Route's handler.
   *
   * @param {Object} options
   * @param {Request} options.request The request to handle.
   * @param {ExtendableEvent} options.event The event that triggered the
   *     request.
   * @return {Promise<Response>|undefined} A promise is returned if a
   *     registered route can handle the request. If there is no matching
   *     route and there's no `defaultHandler`, `undefined` is returned.
   */
  handleRequest({ request: e, event: t }) {
    const n = new URL(e.url, location.href);
    if (!n.protocol.startsWith("http"))
      return;
    const a = n.origin === location.origin, { params: r, route: c } = this.findMatchingRoute({
      event: t,
      request: e,
      sameOrigin: a,
      url: n
    });
    let i = c && c.handler;
    const o = e.method;
    if (!i && this._defaultHandlerMap.has(o) && (i = this._defaultHandlerMap.get(o)), !i)
      return;
    let l;
    try {
      l = i.handle({ url: n, request: e, event: t, params: r });
    } catch (u) {
      l = Promise.reject(u);
    }
    const g = c && c.catchHandler;
    return l instanceof Promise && (this._catchHandler || g) && (l = l.catch(async (u) => {
      if (g)
        try {
          return await g.handle({ url: n, request: e, event: t, params: r });
        } catch (D) {
          D instanceof Error && (u = D);
        }
      if (this._catchHandler)
        return this._catchHandler.handle({ url: n, request: e, event: t });
      throw u;
    })), l;
  }
  /**
   * Checks a request and URL (and optionally an event) against the list of
   * registered routes, and if there's a match, returns the corresponding
   * route along with any params generated by the match.
   *
   * @param {Object} options
   * @param {URL} options.url
   * @param {boolean} options.sameOrigin The result of comparing `url.origin`
   *     against the current origin.
   * @param {Request} options.request The request to match.
   * @param {Event} options.event The corresponding event.
   * @return {Object} An object with `route` and `params` properties.
   *     They are populated if a matching route was found or `undefined`
   *     otherwise.
   */
  findMatchingRoute({ url: e, sameOrigin: t, request: n, event: a }) {
    const r = this._routes.get(n.method) || [];
    for (const c of r) {
      let i;
      const o = c.match({ url: e, sameOrigin: t, request: n, event: a });
      if (o)
        return i = o, (Array.isArray(i) && i.length === 0 || o.constructor === Object && // eslint-disable-line
        Object.keys(o).length === 0 || typeof o == "boolean") && (i = void 0), { route: c, params: i };
    }
    return {};
  }
  /**
   * Define a default `handler` that's called when no routes explicitly
   * match the incoming request.
   *
   * Each HTTP method ('GET', 'POST', etc.) gets its own default handler.
   *
   * Without a default handler, unmatched requests will go against the
   * network as if there were no service worker present.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to associate with this
   * default handler. Each method has its own default.
   */
  setDefaultHandler(e, t = B) {
    this._defaultHandlerMap.set(t, b(e));
  }
  /**
   * If a Route throws an error while handling a request, this `handler`
   * will be called and given a chance to provide a response.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   */
  setCatchHandler(e) {
    this._catchHandler = b(e);
  }
  /**
   * Registers a route with the router.
   *
   * @param {workbox-routing.Route} route The route to register.
   */
  registerRoute(e) {
    this._routes.has(e.method) || this._routes.set(e.method, []), this._routes.get(e.method).push(e);
  }
  /**
   * Unregisters a route with the router.
   *
   * @param {workbox-routing.Route} route The route to unregister.
   */
  unregisterRoute(e) {
    if (!this._routes.has(e.method))
      throw new h("unregister-route-but-not-found-with-method", {
        method: e.method
      });
    const t = this._routes.get(e.method).indexOf(e);
    if (t > -1)
      this._routes.get(e.method).splice(t, 1);
    else
      throw new h("unregister-route-route-not-registered");
  }
}
let w;
const he = () => (w || (w = new le(), w.addFetchListener(), w.addCacheListener()), w);
function E(s, e, t) {
  let n;
  if (typeof s == "string") {
    const r = new URL(s, location.href), c = ({ url: i }) => i.href === r.href;
    n = new p(c, e, t);
  } else if (s instanceof RegExp)
    n = new oe(s, e, t);
  else if (typeof s == "function")
    n = new p(s, e, t);
  else if (s instanceof p)
    n = s;
  else
    throw new h("unsupported-route-type", {
      moduleName: "workbox-routing",
      funcName: "registerRoute",
      paramName: "capture"
    });
  return he().registerRoute(n), n;
}
function ue(s, e = []) {
  for (const t of [...s.searchParams.keys()])
    e.some((n) => n.test(t)) && s.searchParams.delete(t);
  return s;
}
function* fe(s, { ignoreURLParametersMatching: e = [/^utm_/, /^fbclid$/], directoryIndex: t = "index.html", cleanURLs: n = !0, urlManipulation: a } = {}) {
  const r = new URL(s, location.href);
  r.hash = "", yield r.href;
  const c = ue(r, e);
  if (yield c.href, t && c.pathname.endsWith("/")) {
    const i = new URL(c.href);
    i.pathname += t, yield i.href;
  }
  if (n) {
    const i = new URL(c.href);
    i.pathname += ".html", yield i.href;
  }
  if (a) {
    const i = a({ url: r });
    for (const o of i)
      yield o.href;
  }
}
class de extends p {
  /**
   * @param {PrecacheController} precacheController A `PrecacheController`
   * instance used to both match requests and respond to fetch events.
   * @param {Object} [options] Options to control how requests are matched
   * against the list of precached URLs.
   * @param {string} [options.directoryIndex=index.html] The `directoryIndex` will
   * check cache entries for a URLs ending with '/' to see if there is a hit when
   * appending the `directoryIndex` value.
   * @param {Array<RegExp>} [options.ignoreURLParametersMatching=[/^utm_/, /^fbclid$/]] An
   * array of regex's to remove search params when looking for a cache match.
   * @param {boolean} [options.cleanURLs=true] The `cleanURLs` option will
   * check the cache for the URL with a `.html` added to the end of the end.
   * @param {workbox-precaching~urlManipulation} [options.urlManipulation]
   * This is a function that should take a URL and return an array of
   * alternative URLs that should be checked for precache matches.
   */
  constructor(e, t) {
    const n = ({ request: a }) => {
      const r = e.getURLsToCacheKeys();
      for (const c of fe(a.url, t)) {
        const i = r.get(c);
        if (i) {
          const o = e.getIntegrityForCacheKey(i);
          return { cacheKey: i, integrity: o };
        }
      }
    };
    super(n, e.strategy);
  }
}
function pe(s) {
  const e = v(), t = new de(e, s);
  E(t);
}
const ge = "-precache-", ye = async (s, e = ge) => {
  const n = (await self.caches.keys()).filter((a) => a.includes(e) && a.includes(self.registration.scope) && a !== s);
  return await Promise.all(n.map((a) => self.caches.delete(a))), n;
};
function we() {
  self.addEventListener("activate", (s) => {
    const e = C.getPrecacheName();
    s.waitUntil(ye(e).then((t) => {
    }));
  });
}
function me(s) {
  return v().createHandlerBoundToURL(s);
}
function Re(s) {
  v().precache(s);
}
function be(s, e) {
  Re(s), pe(e);
}
class Ce extends p {
  /**
   * If both `denylist` and `allowlist` are provided, the `denylist` will
   * take precedence and the request will not match this route.
   *
   * The regular expressions in `allowlist` and `denylist`
   * are matched against the concatenated
   * [`pathname`]{@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/pathname}
   * and [`search`]{@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/search}
   * portions of the requested URL.
   *
   * *Note*: These RegExps may be evaluated against every destination URL during
   * a navigation. Avoid using
   * [complex RegExps](https://github.com/GoogleChrome/workbox/issues/3077),
   * or else your users may see delays when navigating your site.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {Object} options
   * @param {Array<RegExp>} [options.denylist] If any of these patterns match,
   * the route will not handle the request (even if a allowlist RegExp matches).
   * @param {Array<RegExp>} [options.allowlist=[/./]] If any of these patterns
   * match the URL's pathname and search parameter, the route will handle the
   * request (assuming the denylist doesn't match).
   */
  constructor(e, { allowlist: t = [/./], denylist: n = [] } = {}) {
    super((a) => this._match(a), e), this._allowlist = t, this._denylist = n;
  }
  /**
   * Routes match handler.
   *
   * @param {Object} options
   * @param {URL} options.url
   * @param {Request} options.request
   * @return {boolean}
   *
   * @private
   */
  _match({ url: e, request: t }) {
    if (t && t.mode !== "navigate")
      return !1;
    const n = e.pathname + e.search;
    for (const a of this._denylist)
      if (a.test(n))
        return !1;
    return !!this._allowlist.some((a) => a.test(n));
  }
}
const _e = {
  /**
   * Returns a valid response (to allow caching) if the status is 200 (OK) or
   * 0 (opaque).
   *
   * @param {Object} options
   * @param {Response} options.response
   * @return {Response|null}
   *
   * @private
   */
  cacheWillUpdate: async ({ response: s }) => s.status === 200 || s.status === 0 ? s : null
};
class Ue extends W {
  /**
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
   * `fetch()` requests made by this strategy.
   * @param {Object} [options.matchOptions] [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
   */
  constructor(e = {}) {
    super(e), this.plugins.some((t) => "cacheWillUpdate" in t) || this.plugins.unshift(_e);
  }
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(e, t) {
    const n = t.fetchAndCachePut(e).catch(() => {
    });
    t.waitUntil(n);
    let a = await t.cacheMatch(e), r;
    if (!a)
      try {
        a = await n;
      } catch (c) {
        c instanceof Error && (r = c);
      }
    if (!a)
      throw new h("no-response", { url: e.url, error: r });
    return a;
  }
}
try {
  self["workbox:cacheable-response:7.0.0"] && _();
} catch {
}
const Le = (s, e) => e.some((t) => s instanceof t);
let O, S;
function ke() {
  return O || (O = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function Pe() {
  return S || (S = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const j = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakMap(), F = /* @__PURE__ */ new WeakMap(), k = /* @__PURE__ */ new WeakMap(), x = /* @__PURE__ */ new WeakMap();
function Ie(s) {
  const e = new Promise((t, n) => {
    const a = () => {
      s.removeEventListener("success", r), s.removeEventListener("error", c);
    }, r = () => {
      t(m(s.result)), a();
    }, c = () => {
      n(s.error), a();
    };
    s.addEventListener("success", r), s.addEventListener("error", c);
  });
  return e.then((t) => {
    t instanceof IDBCursor && j.set(t, s);
  }).catch(() => {
  }), x.set(e, s), e;
}
function Te(s) {
  if (T.has(s))
    return;
  const e = new Promise((t, n) => {
    const a = () => {
      s.removeEventListener("complete", r), s.removeEventListener("error", c), s.removeEventListener("abort", c);
    }, r = () => {
      t(), a();
    }, c = () => {
      n(s.error || new DOMException("AbortError", "AbortError")), a();
    };
    s.addEventListener("complete", r), s.addEventListener("error", c), s.addEventListener("abort", c);
  });
  T.set(s, e);
}
let K = {
  get(s, e, t) {
    if (s instanceof IDBTransaction) {
      if (e === "done")
        return T.get(s);
      if (e === "objectStoreNames")
        return s.objectStoreNames || F.get(s);
      if (e === "store")
        return t.objectStoreNames[1] ? void 0 : t.objectStore(t.objectStoreNames[0]);
    }
    return m(s[e]);
  },
  set(s, e, t) {
    return s[e] = t, !0;
  },
  has(s, e) {
    return s instanceof IDBTransaction && (e === "done" || e === "store") ? !0 : e in s;
  }
};
function Ke(s) {
  K = s(K);
}
function ve(s) {
  return s === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(e, ...t) {
    const n = s.call(P(this), e, ...t);
    return F.set(n, e.sort ? e.sort() : [e]), m(n);
  } : Pe().includes(s) ? function(...e) {
    return s.apply(P(this), e), m(j.get(this));
  } : function(...e) {
    return m(s.apply(P(this), e));
  };
}
function Ee(s) {
  return typeof s == "function" ? ve(s) : (s instanceof IDBTransaction && Te(s), Le(s, ke()) ? new Proxy(s, K) : s);
}
function m(s) {
  if (s instanceof IDBRequest)
    return Ie(s);
  if (k.has(s))
    return k.get(s);
  const e = Ee(s);
  return e !== s && (k.set(s, e), x.set(e, s)), e;
}
const P = (s) => x.get(s), xe = ["get", "getKey", "getAll", "getAllKeys", "count"], De = ["put", "add", "delete", "clear"], I = /* @__PURE__ */ new Map();
function A(s, e) {
  if (!(s instanceof IDBDatabase && !(e in s) && typeof e == "string"))
    return;
  if (I.get(e))
    return I.get(e);
  const t = e.replace(/FromIndex$/, ""), n = e !== t, a = De.includes(t);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(t in (n ? IDBIndex : IDBObjectStore).prototype) || !(a || xe.includes(t))
  )
    return;
  const r = async function(c, ...i) {
    const o = this.transaction(c, a ? "readwrite" : "readonly");
    let l = o.store;
    return n && (l = l.index(i.shift())), (await Promise.all([
      l[t](...i),
      a && o.done
    ]))[0];
  };
  return I.set(e, r), r;
}
Ke((s) => ({
  ...s,
  get: (e, t, n) => A(e, t) || s.get(e, t, n),
  has: (e, t) => !!A(e, t) || s.has(e, t)
}));
try {
  self["workbox:expiration:7.0.0"] && _();
} catch {
}
try {
  self["workbox:recipes:7.0.0"] && _();
} catch {
}
function Ne(s) {
  self.addEventListener("install", (e) => {
    const t = s.urls.map((n) => s.strategy.handleAll({
      event: e,
      request: new Request(n)
    })[1]);
    e.waitUntil(Promise.all(t));
  });
}
self.addEventListener("message", (s) => {
  s.data && s.data.type === "SKIP_WAITING" && self.skipWaiting();
});
be([{"revision":null,"url":"assets/af-NFTbimw4.js"},{"revision":null,"url":"assets/ar-DcG66jZs.js"},{"revision":null,"url":"assets/codicon-B7HMvkfX.ttf"},{"revision":null,"url":"assets/cs-bEuezh8F.js"},{"revision":null,"url":"assets/css-MHM-5ikl.js"},{"revision":null,"url":"assets/cssMode-HOWzM9_L.js"},{"revision":null,"url":"assets/de-i63AknQb.js"},{"revision":null,"url":"assets/DeviceCamera-seYkq88N.js"},{"revision":null,"url":"assets/es-CofDacCQ.js"},{"revision":null,"url":"assets/fr-SQPOoecA.js"},{"revision":null,"url":"assets/gcode.tmLanguage-qqL1nTYK.js"},{"revision":null,"url":"assets/HlsstreamCamera-UkmDTOEx.js"},{"revision":null,"url":"assets/hu-sJVt1DgE.js"},{"revision":null,"url":"assets/IframeCamera-e-Npy1ti.js"},{"revision":null,"url":"assets/index-A0WahC5x.js"},{"revision":null,"url":"assets/index-bc2tlqWl.css"},{"revision":null,"url":"assets/IpstreamCamera-sFzulB8i.js"},{"revision":null,"url":"assets/it-YurPLwBS.js"},{"revision":null,"url":"assets/ja-S-1bwTJ2.js"},{"revision":null,"url":"assets/jsonMode-ZoV07EVV.js"},{"revision":null,"url":"assets/klipper-config.tmLanguage-bGfLwusa.js"},{"revision":null,"url":"assets/ko-0KK1QqLz.js"},{"revision":null,"url":"assets/log.tmLanguage-j5eotMH-.js"},{"revision":null,"url":"assets/markdown-ZkR7NG-c.js"},{"revision":null,"url":"assets/MjpegstreamerAdaptiveCamera-yRM-KMvQ.js"},{"revision":null,"url":"assets/MjpegstreamerCamera-VvOcoZR1.js"},{"revision":null,"url":"assets/nl-XARpur5o.js"},{"revision":null,"url":"assets/onigasm-JEMbk6-O.wasm"},{"revision":null,"url":"assets/parseGcode.worker-15RKfwwY.js"},{"revision":null,"url":"assets/pl-vVLNjMCP.js"},{"revision":null,"url":"assets/pt-r9qKU9_m.js"},{"revision":null,"url":"assets/qr-scanner-worker.min-Xq4UWGb2.js"},{"revision":null,"url":"assets/raleway-cyrillic-400-normal-P_alB7DV.woff"},{"revision":null,"url":"assets/raleway-cyrillic-400-normal-UjOnhPpR.woff2"},{"revision":null,"url":"assets/raleway-cyrillic-ext-400-normal-ovhNJAYv.woff"},{"revision":null,"url":"assets/raleway-cyrillic-ext-400-normal-QmQcc25y.woff2"},{"revision":null,"url":"assets/raleway-latin-400-normal-MVDVYPWU.woff"},{"revision":null,"url":"assets/raleway-latin-400-normal-PitgnBsa.woff2"},{"revision":null,"url":"assets/raleway-latin-ext-400-normal-0jms_GQg.woff"},{"revision":null,"url":"assets/raleway-latin-ext-400-normal-IKCyVIeV.woff2"},{"revision":null,"url":"assets/raleway-vietnamese-400-normal-pJj5sCkU.woff2"},{"revision":null,"url":"assets/raleway-vietnamese-400-normal-tLxEG26y.woff"},{"revision":null,"url":"assets/roboto-cyrillic-300-normal--po7MILF.woff2"},{"revision":null,"url":"assets/roboto-cyrillic-300-normal-FF-TwrnM.woff"},{"revision":null,"url":"assets/roboto-cyrillic-400-normal-1Q02bZlk.woff2"},{"revision":null,"url":"assets/roboto-cyrillic-400-normal-wkKjpXzZ.woff"},{"revision":null,"url":"assets/roboto-cyrillic-500-normal-EKVnmLHG.woff"},{"revision":null,"url":"assets/roboto-cyrillic-500-normal-wJGYTDoQ.woff2"},{"revision":null,"url":"assets/roboto-cyrillic-700-normal-eWQSlgh7.woff2"},{"revision":null,"url":"assets/roboto-cyrillic-700-normal-wCMcOcVz.woff"},{"revision":null,"url":"assets/roboto-cyrillic-ext-300-normal-E82ViLoj.woff2"},{"revision":null,"url":"assets/roboto-cyrillic-ext-300-normal-uwBobgv-.woff"},{"revision":null,"url":"assets/roboto-cyrillic-ext-400-normal-PiqLoFV_.woff"},{"revision":null,"url":"assets/roboto-cyrillic-ext-400-normal-zkSvWxgI.woff2"},{"revision":null,"url":"assets/roboto-cyrillic-ext-500-normal-BvVvIYM0.woff2"},{"revision":null,"url":"assets/roboto-cyrillic-ext-500-normal-LK2sTP5U.woff"},{"revision":null,"url":"assets/roboto-cyrillic-ext-700-normal-HQzrQ3OY.woff"},{"revision":null,"url":"assets/roboto-cyrillic-ext-700-normal-rKwhCSHC.woff2"},{"revision":null,"url":"assets/roboto-greek-300-normal-4G3vnZze.woff"},{"revision":null,"url":"assets/roboto-greek-300-normal-J3YrlqhA.woff2"},{"revision":null,"url":"assets/roboto-greek-400-normal-UVhwlGKP.woff2"},{"revision":null,"url":"assets/roboto-greek-400-normal-ZxjWinlq.woff"},{"revision":null,"url":"assets/roboto-greek-500-normal-AqREn8Hx.woff2"},{"revision":null,"url":"assets/roboto-greek-500-normal-lY3bHV_X.woff"},{"revision":null,"url":"assets/roboto-greek-700-normal-nNk6vBVU.woff2"},{"revision":null,"url":"assets/roboto-greek-700-normal-o7k6RnxP.woff"},{"revision":null,"url":"assets/roboto-latin-300-normal-E4R60IWG.woff2"},{"revision":null,"url":"assets/roboto-latin-300-normal-JauzICV2.woff"},{"revision":null,"url":"assets/roboto-latin-400-normal-JkyEVz-m.woff2"},{"revision":null,"url":"assets/roboto-latin-400-normal-VNUqCuId.woff"},{"revision":null,"url":"assets/roboto-latin-500-normal-3Jvq4Vhd.woff"},{"revision":null,"url":"assets/roboto-latin-500-normal-8Xcd2lzs.woff2"},{"revision":null,"url":"assets/roboto-latin-700-normal-njOYDr_M.woff2"},{"revision":null,"url":"assets/roboto-latin-700-normal-YeN9SxC4.woff"},{"revision":null,"url":"assets/roboto-latin-ext-300-normal-mlLlnqo5.woff"},{"revision":null,"url":"assets/roboto-latin-ext-300-normal-xLDXUQvh.woff2"},{"revision":null,"url":"assets/roboto-latin-ext-400-normal-5aATcKHE.woff"},{"revision":null,"url":"assets/roboto-latin-ext-400-normal-OGy6Zcg4.woff2"},{"revision":null,"url":"assets/roboto-latin-ext-500-normal-faQMfyR3.woff"},{"revision":null,"url":"assets/roboto-latin-ext-500-normal-VisukoF9.woff2"},{"revision":null,"url":"assets/roboto-latin-ext-700-normal-8FF03k7w.woff"},{"revision":null,"url":"assets/roboto-latin-ext-700-normal-WBgqNxqO.woff2"},{"revision":null,"url":"assets/roboto-vietnamese-300-normal-pz61bwbN.woff2"},{"revision":null,"url":"assets/roboto-vietnamese-300-normal-zsQ2em1q.woff"},{"revision":null,"url":"assets/roboto-vietnamese-400-normal-JAkXt1WZ.woff2"},{"revision":null,"url":"assets/roboto-vietnamese-400-normal-ZBATgFfY.woff"},{"revision":null,"url":"assets/roboto-vietnamese-500-normal-cIPA24el.woff"},{"revision":null,"url":"assets/roboto-vietnamese-500-normal-nIo0EVVo.woff2"},{"revision":null,"url":"assets/roboto-vietnamese-700-normal-DHNHOqon.woff"},{"revision":null,"url":"assets/roboto-vietnamese-700-normal-EnpEoUH0.woff2"},{"revision":null,"url":"assets/ru-NH4gmHis.js"},{"revision":null,"url":"assets/setupMonaco-KzARrAXX.css"},{"revision":null,"url":"assets/setupMonaco-r2eBxFzO.js"},{"revision":null,"url":"assets/setupMonaco-xUukGoF6.css"},{"revision":null,"url":"assets/setupMonaco.features-2z46axmE.js"},{"revision":null,"url":"assets/sl-L1sPKd73.js"},{"revision":null,"url":"assets/uk-6OPg2vdL.js"},{"revision":null,"url":"assets/virtual_pwa-register-Z3o-MlLb.js"},{"revision":null,"url":"assets/vue-echarts-chunk-GyXD36o2.js"},{"revision":null,"url":"assets/WebrtcCamerastreamerCamera-KohNwWKP.js"},{"revision":null,"url":"assets/WebrtcGo2RtcCamera-zQ8zYBb3.js"},{"revision":null,"url":"assets/workbox-window.prod.es5-prqDwDSL.js"},{"revision":null,"url":"assets/zh-CN-kDWSROUh.js"},{"revision":null,"url":"assets/zh-HK-iEspWhEZ.js"},{"revision":"090ba117eec2bb38deb4dc465ea97598","url":"index.html"},{"revision":"501924be8e3f5a3fc223a60a96d286fd","url":"monacoeditorwork/css.worker.bundle.js"},{"revision":"1bb50bb1fbc44c1cf9f5e6fd193a50af","url":"monacoeditorwork/editor.worker.bundle.js"},{"revision":"fdff2c8fbf4410ad2823a4528c0d26b3","url":"monacoeditorwork/json.worker.bundle.js"},{"revision":"3bb20e2e2531f1d718ff39721bb93034","url":"editor.theme.json"},{"revision":"6ea1e9fde2682dd8d0d1ea08f6624e9f","url":"img/icons/android-chrome-192x192.png"},{"revision":"80ae0fbdf558c18f367ffcc02e3d8347","url":"favicon.ico"},{"revision":"3beae0267c3a29319cffa7ab09abdfde","url":"logo_annex.svg"},{"revision":"74e672677715e4840f22be046a144303","url":"logo_btt.svg"},{"revision":"48cd4739378f66f5b4cffd3655b16af5","url":"logo_eva.svg"},{"revision":"c19ef86d3647286b474e3ab4f4f22c07","url":"logo_fluidd.svg"},{"revision":"b9d7dc20763cb79efe987c33df23e232","url":"logo_hevort.svg"},{"revision":"2e592ea44568b5865fe29374352241f6","url":"logo_kingroon.svg"},{"revision":"9f102036941e2b688c3bcfc8d1ab74e8","url":"logo_klipper.svg"},{"revision":"f5c47f9e5d2bec2c3223d010e8b7c688","url":"logo_ldo.svg"},{"revision":"c2bf33fe7a1c0039f21449459f78fd0e","url":"logo_peopoly.svg"},{"revision":"aecd918812a69d584ff0a531d7b07ff9","url":"logo_prusa.svg"},{"revision":"0d06e11bc4388b77f5dc7646c741f81e","url":"logo_qidi.svg"},{"revision":"a3c3a13b525e0de1c8d65641808a7fed","url":"logo_ratrig.svg"},{"revision":"6f7f330be9f99d5876b8ed7d9e9ec637","url":"logo_siboor.svg"},{"revision":"a117c9fec7308a0b903fb586afd24fc5","url":"logo_snakeoil.svg"},{"revision":"fdb5c8c4e93f071adbd9c84ce40e812b","url":"logo_voron.svg"},{"revision":"b8f98afe9c9c4be7fd75c6693c870aea","url":"logo_vzbot.svg"},{"revision":"347a31155d0db7eccbc12b3c5e419bd0","url":"logo_zerog.svg"},{"revision":"db3b74c0e8a1fec2025f202d28f612f9","url":"img/icons/android-chrome-512x512.png"},{"revision":"b355fe6957e72037f1bc6fb3bad3a78d","url":"img/icons/android-chrome-maskable-192x192.png"},{"revision":"a351c8d619180fe28d1b9ae02b3d9066","url":"img/icons/android-chrome-maskable-512x512.png"},{"revision":"ec48f367f52f03862cee7cec3d01ad07","url":"img/icons/apple-touch-icon-120x120.png"},{"revision":"bc8f75876a747950735260adc634a81b","url":"img/icons/apple-touch-icon-152x152.png"},{"revision":"23e6410e45ff58896d23b4f4ef4514bd","url":"img/icons/apple-touch-icon-180x180.png"},{"revision":"27ab6d467f78011d71362fb060a98cf9","url":"img/icons/apple-touch-icon-60x60.png"},{"revision":"4af08cd1f1e8ad8b510a8b79847d1b5a","url":"img/icons/apple-touch-icon-76x76.png"},{"revision":"23e6410e45ff58896d23b4f4ef4514bd","url":"img/icons/apple-touch-icon.png"},{"revision":"d5ad46f18f3207b4073c1f8e734302d7","url":"img/icons/favicon-16x16.png"},{"revision":"3de1cf2d2204e73c6c5a622749f0f2f4","url":"img/icons/favicon-32x32.png"},{"revision":"80ae0fbdf558c18f367ffcc02e3d8347","url":"img/icons/favicon.ico"},{"revision":"4cc0223d744bd99a649837825b82c06e","url":"img/icons/msapplication-icon-144x144.png"},{"revision":"98c08c8393ca7732e4916440e52ae08f","url":"img/icons/mstile-150x150.png"},{"revision":"46e22970a62e18a71bc1039cdeab1d59","url":"img/icons/safari-pinned-tab.svg"},{"revision":"603dcda2c2942700dcec8b8e9aad766c","url":"img/icons/shortcut-configuration-96x96.png"},{"revision":"808c09c0275277dbc4d9dc43429221ac","url":"img/icons/shortcut-settings-96x96.png"},{"revision":"1f812c07e68e2d6adc8b9cca761bd331","url":"manifest.webmanifest"}]);
we();
const H = new URL("config.json", self.location.href).pathname, q = new Ue({
  cacheName: "config",
  fetchOptions: {
    cache: "no-cache"
  }
});
Ne({
  urls: [
    H
  ],
  strategy: q
});
E(H, q, "GET");
const Me = [
  /\/websocket/,
  /\/(printer|api|access|machine|server)\//,
  /\/webcam[2-4]?\//
], Oe = void 0;
E(
  new Ce(me("index.html"), {
    allowlist: Oe,
    denylist: Me
  })
);
