/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ // The require scope
  /******/ var __webpack_require__ = {};
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  /*!************************************************!*\
  !*** ./src/rprofiler/rprofiler.ts + 8 modules ***!
  \************************************************/
  // ESM COMPAT FLAG
  __webpack_require__.r(__webpack_exports__);

  // EXPORTS
  __webpack_require__.d(__webpack_exports__, {
    default: () => /* binding */ rprofiler,
  }); // CONCATENATED MODULE: ./node_modules/web-vitals/dist/web-vitals.js

  var e,
    n,
    t,
    i,
    r,
    a = -1,
    o = function (e) {
      addEventListener(
        "pageshow",
        function (n) {
          n.persisted && ((a = n.timeStamp), e(n));
        },
        !0
      );
    },
    c = function () {
      return (
        window.performance &&
        performance.getEntriesByType &&
        performance.getEntriesByType("navigation")[0]
      );
    },
    u = function () {
      var e = c();
      return (e && e.activationStart) || 0;
    },
    f = function (e, n) {
      var t = c(),
        i = "navigate";
      a >= 0
        ? (i = "back-forward-cache")
        : t &&
          (document.prerendering || u() > 0
            ? (i = "prerender")
            : document.wasDiscarded
            ? (i = "restore")
            : t.type && (i = t.type.replace(/_/g, "-")));
      return {
        name: e,
        value: void 0 === n ? -1 : n,
        rating: "good",
        delta: 0,
        entries: [],
        id: "v3-"
          .concat(Date.now(), "-")
          .concat(Math.floor(8999999999999 * Math.random()) + 1e12),
        navigationType: i,
      };
    },
    s = function (e, n, t) {
      try {
        if (PerformanceObserver.supportedEntryTypes.includes(e)) {
          var i = new PerformanceObserver(function (e) {
            Promise.resolve().then(function () {
              n(e.getEntries());
            });
          });
          return (
            i.observe(Object.assign({ type: e, buffered: !0 }, t || {})), i
          );
        }
      } catch (e) {}
    },
    d = function (e, n, t, i) {
      var r, a;
      return function (o) {
        n.value >= 0 &&
          (o || i) &&
          ((a = n.value - (r || 0)) || void 0 === r) &&
          ((r = n.value),
          (n.delta = a),
          (n.rating = (function (e, n) {
            return e > n[1] ? "poor" : e > n[0] ? "needs-improvement" : "good";
          })(n.value, t)),
          e(n));
      };
    },
    l = function (e) {
      requestAnimationFrame(function () {
        return requestAnimationFrame(function () {
          return e();
        });
      });
    },
    p = function (e) {
      var n = function (n) {
        ("pagehide" !== n.type && "hidden" !== document.visibilityState) ||
          e(n);
      };
      addEventListener("visibilitychange", n, !0),
        addEventListener("pagehide", n, !0);
    },
    v = function (e) {
      var n = !1;
      return function (t) {
        n || (e(t), (n = !0));
      };
    },
    m = -1,
    h = function () {
      return "hidden" !== document.visibilityState || document.prerendering
        ? 1 / 0
        : 0;
    },
    g = function (e) {
      "hidden" === document.visibilityState &&
        m > -1 &&
        ((m = "visibilitychange" === e.type ? e.timeStamp : 0), T());
    },
    y = function () {
      addEventListener("visibilitychange", g, !0),
        addEventListener("prerenderingchange", g, !0);
    },
    T = function () {
      removeEventListener("visibilitychange", g, !0),
        removeEventListener("prerenderingchange", g, !0);
    },
    E = function () {
      return (
        m < 0 &&
          ((m = h()),
          y(),
          o(function () {
            setTimeout(function () {
              (m = h()), y();
            }, 0);
          })),
        {
          get firstHiddenTime() {
            return m;
          },
        }
      );
    },
    C = function (e) {
      document.prerendering
        ? addEventListener(
            "prerenderingchange",
            function () {
              return e();
            },
            !0
          )
        : e();
    },
    L = [1800, 3e3],
    w = function (e, n) {
      (n = n || {}),
        C(function () {
          var t,
            i = E(),
            r = f("FCP"),
            a = s("paint", function (e) {
              e.forEach(function (e) {
                "first-contentful-paint" === e.name &&
                  (a.disconnect(),
                  e.startTime < i.firstHiddenTime &&
                    ((r.value = Math.max(e.startTime - u(), 0)),
                    r.entries.push(e),
                    t(!0)));
              });
            });
          a &&
            ((t = d(e, r, L, n.reportAllChanges)),
            o(function (i) {
              (r = f("FCP")),
                (t = d(e, r, L, n.reportAllChanges)),
                l(function () {
                  (r.value = performance.now() - i.timeStamp), t(!0);
                });
            }));
        });
    },
    b = [0.1, 0.25],
    S = function (e, n) {
      (n = n || {}),
        w(
          v(function () {
            var t,
              i = f("CLS", 0),
              r = 0,
              a = [],
              c = function (e) {
                e.forEach(function (e) {
                  if (!e.hadRecentInput) {
                    var n = a[0],
                      t = a[a.length - 1];
                    r &&
                    e.startTime - t.startTime < 1e3 &&
                    e.startTime - n.startTime < 5e3
                      ? ((r += e.value), a.push(e))
                      : ((r = e.value), (a = [e]));
                  }
                }),
                  r > i.value && ((i.value = r), (i.entries = a), t());
              },
              u = s("layout-shift", c);
            u &&
              ((t = d(e, i, b, n.reportAllChanges)),
              p(function () {
                c(u.takeRecords()), t(!0);
              }),
              o(function () {
                (r = 0),
                  (i = f("CLS", 0)),
                  (t = d(e, i, b, n.reportAllChanges)),
                  l(function () {
                    return t();
                  });
              }),
              setTimeout(t, 0));
          })
        );
    },
    A = { passive: !0, capture: !0 },
    I = new Date(),
    P = function (i, r) {
      e || ((e = r), (n = i), (t = new Date()), k(removeEventListener), F());
    },
    F = function () {
      if (n >= 0 && n < t - I) {
        var r = {
          entryType: "first-input",
          name: e.type,
          target: e.target,
          cancelable: e.cancelable,
          startTime: e.timeStamp,
          processingStart: e.timeStamp + n,
        };
        i.forEach(function (e) {
          e(r);
        }),
          (i = []);
      }
    },
    M = function (e) {
      if (e.cancelable) {
        var n =
          (e.timeStamp > 1e12 ? new Date() : performance.now()) - e.timeStamp;
        "pointerdown" == e.type
          ? (function (e, n) {
              var t = function () {
                  P(e, n), r();
                },
                i = function () {
                  r();
                },
                r = function () {
                  removeEventListener("pointerup", t, A),
                    removeEventListener("pointercancel", i, A);
                };
              addEventListener("pointerup", t, A),
                addEventListener("pointercancel", i, A);
            })(n, e)
          : P(n, e);
      }
    },
    k = function (e) {
      ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(function (
        n
      ) {
        return e(n, M, A);
      });
    },
    D = [100, 300],
    x = function (t, r) {
      (r = r || {}),
        C(function () {
          var a,
            c = E(),
            u = f("FID"),
            l = function (e) {
              e.startTime < c.firstHiddenTime &&
                ((u.value = e.processingStart - e.startTime),
                u.entries.push(e),
                a(!0));
            },
            m = function (e) {
              e.forEach(l);
            },
            h = s("first-input", m);
          (a = d(t, u, D, r.reportAllChanges)),
            h &&
              p(
                v(function () {
                  m(h.takeRecords()), h.disconnect();
                })
              ),
            h &&
              o(function () {
                var o;
                (u = f("FID")),
                  (a = d(t, u, D, r.reportAllChanges)),
                  (i = []),
                  (n = -1),
                  (e = null),
                  k(addEventListener),
                  (o = l),
                  i.push(o),
                  F();
              });
        });
    },
    B = 0,
    R = 1 / 0,
    H = 0,
    N = function (e) {
      e.forEach(function (e) {
        e.interactionId &&
          ((R = Math.min(R, e.interactionId)),
          (H = Math.max(H, e.interactionId)),
          (B = H ? (H - R) / 7 + 1 : 0));
      });
    },
    O = function () {
      return r ? B : performance.interactionCount || 0;
    },
    q = function () {
      "interactionCount" in performance ||
        r ||
        (r = s("event", N, {
          type: "event",
          buffered: !0,
          durationThreshold: 0,
        }));
    },
    j = [200, 500],
    _ = 0,
    z = function () {
      return O() - _;
    },
    G = [],
    J = {},
    K = function (e) {
      var n = G[G.length - 1],
        t = J[e.interactionId];
      if (t || G.length < 10 || e.duration > n.latency) {
        if (t) t.entries.push(e), (t.latency = Math.max(t.latency, e.duration));
        else {
          var i = { id: e.interactionId, latency: e.duration, entries: [e] };
          (J[i.id] = i), G.push(i);
        }
        G.sort(function (e, n) {
          return n.latency - e.latency;
        }),
          G.splice(10).forEach(function (e) {
            delete J[e.id];
          });
      }
    },
    Q = function (e, n) {
      (n = n || {}),
        C(function () {
          var t;
          q();
          var i,
            r = f("INP"),
            a = function (e) {
              e.forEach(function (e) {
                (e.interactionId && K(e), "first-input" === e.entryType) &&
                  !G.some(function (n) {
                    return n.entries.some(function (n) {
                      return (
                        e.duration === n.duration && e.startTime === n.startTime
                      );
                    });
                  }) &&
                  K(e);
              });
              var n,
                t = ((n = Math.min(G.length - 1, Math.floor(z() / 50))), G[n]);
              t &&
                t.latency !== r.value &&
                ((r.value = t.latency), (r.entries = t.entries), i());
            },
            c = s("event", a, {
              durationThreshold:
                null !== (t = n.durationThreshold) && void 0 !== t ? t : 40,
            });
          (i = d(e, r, j, n.reportAllChanges)),
            c &&
              ("PerformanceEventTiming" in window &&
                "interactionId" in PerformanceEventTiming.prototype &&
                c.observe({ type: "first-input", buffered: !0 }),
              p(function () {
                a(c.takeRecords()),
                  r.value < 0 && z() > 0 && ((r.value = 0), (r.entries = [])),
                  i(!0);
              }),
              o(function () {
                (G = []),
                  (_ = O()),
                  (r = f("INP")),
                  (i = d(e, r, j, n.reportAllChanges));
              }));
        });
    },
    U = [2500, 4e3],
    V = {},
    W = function (e, n) {
      (n = n || {}),
        C(function () {
          var t,
            i = E(),
            r = f("LCP"),
            a = function (e) {
              var n = e[e.length - 1];
              n &&
                n.startTime < i.firstHiddenTime &&
                ((r.value = Math.max(n.startTime - u(), 0)),
                (r.entries = [n]),
                t());
            },
            c = s("largest-contentful-paint", a);
          if (c) {
            t = d(e, r, U, n.reportAllChanges);
            var m = v(function () {
              V[r.id] ||
                (a(c.takeRecords()), c.disconnect(), (V[r.id] = !0), t(!0));
            });
            ["keydown", "click"].forEach(function (e) {
              addEventListener(
                e,
                function () {
                  return setTimeout(m, 0);
                },
                !0
              );
            }),
              p(m),
              o(function (i) {
                (r = f("LCP")),
                  (t = d(e, r, U, n.reportAllChanges)),
                  l(function () {
                    (r.value = performance.now() - i.timeStamp),
                      (V[r.id] = !0),
                      t(!0);
                  });
              });
          }
        });
    },
    X = [800, 1800],
    Y = function e(n) {
      document.prerendering
        ? C(function () {
            return e(n);
          })
        : "complete" !== document.readyState
        ? addEventListener(
            "load",
            function () {
              return e(n);
            },
            !0
          )
        : setTimeout(n, 0);
    },
    Z = function (e, n) {
      n = n || {};
      var t = f("TTFB"),
        i = d(e, t, X, n.reportAllChanges);
      Y(function () {
        var r = c();
        if (r) {
          var a = r.responseStart;
          if (a <= 0 || a > performance.now()) return;
          (t.value = Math.max(a - u(), 0)),
            (t.entries = [r]),
            i(!0),
            o(function () {
              (t = f("TTFB", 0)), (i = d(e, t, X, n.reportAllChanges))(!0);
            });
        }
      });
    }; // CONCATENATED MODULE: ./src/types.ts

  var WindowEvent;
  (function (WindowEvent) {
    WindowEvent["Load"] = "load";
    WindowEvent["BeforeUnload"] = "beforeunload";
    WindowEvent["Abort"] = "abort";
    WindowEvent["Error"] = "error";
    WindowEvent["Unload"] = "unload";
  })(WindowEvent || (WindowEvent = {}));
  var VisibilityType;
  (function (VisibilityType) {
    VisibilityType[(VisibilityType["Focus"] = 0)] = "Focus";
    VisibilityType[(VisibilityType["Blur"] = 1)] = "Blur";
  })(VisibilityType || (VisibilityType = {}));
  // enum definition matches core enum
  var PostType;
  (function (PostType) {
    PostType[(PostType["OnLoad"] = 0)] = "OnLoad";
    PostType[(PostType["OnBeforeUnload"] = 1)] = "OnBeforeUnload";
    PostType[(PostType["OnAbort"] = 2)] = "OnAbort";
    PostType[(PostType["Flush"] = 3)] = "Flush";
  })(PostType || (PostType = {}));
  var Metrics;
  (function (Metrics) {
    Metrics[(Metrics["DNS"] = 0)] = "DNS";
    Metrics[(Metrics["Connect"] = 1)] = "Connect";
    Metrics[(Metrics["Load"] = 2)] = "Load";
    Metrics[(Metrics["Wait"] = 3)] = "Wait";
    Metrics[(Metrics["Start"] = 4)] = "Start";
    Metrics[(Metrics["Redirect"] = 5)] = "Redirect";
    Metrics[(Metrics["Duration"] = 6)] = "Duration";
    Metrics[(Metrics["SSL"] = 7)] = "SSL";
  })(Metrics || (Metrics = {}));
  var CookieIdentifier;
  (function (CookieIdentifier) {
    CookieIdentifier["UserId"] = "u";
    CookieIdentifier["SessionId"] = "s";
    CookieIdentifier["SessionTime"] = "t";
    CookieIdentifier["PageViewCount"] = "c";
    CookieIdentifier["UrlCheckSum"] = "k";
    CookieIdentifier["PostFlag"] = "f";
  })(CookieIdentifier || (CookieIdentifier = {}));
  // defined in CP.Common.Interfaces
  var WinHttpMethod;
  (function (WinHttpMethod) {
    WinHttpMethod[(WinHttpMethod["GET"] = 0)] = "GET";
    WinHttpMethod[(WinHttpMethod["POST"] = 1)] = "POST";
    WinHttpMethod[(WinHttpMethod["HEAD"] = 2)] = "HEAD";
    WinHttpMethod[(WinHttpMethod["DELETE"] = 3)] = "DELETE";
    WinHttpMethod[(WinHttpMethod["OPTIONS"] = 4)] = "OPTIONS";
    WinHttpMethod[(WinHttpMethod["PUT"] = 5)] = "PUT";
    WinHttpMethod[(WinHttpMethod["TRACE"] = 6)] = "TRACE";
    WinHttpMethod[(WinHttpMethod["CONNECT"] = 7)] = "CONNECT";
  })(WinHttpMethod || (WinHttpMethod = {})); // CONCATENATED MODULE: ./src/rprofiler/AjaxTiming.ts

  var AjaxTiming = /** @class */ (function () {
    function AjaxTiming(url, method, isAsync, open) {
      var _this = this;
      this.getPerformanceTimings = function (entry) {
        // If a call is being made on same url multiple time, take the first one so that we capture dns and ssl time
        _this.connect = entry.connectEnd - entry.connectStart;
        _this.dns = entry.domainLookupEnd - entry.domainLookupStart;
        _this.duration = entry.duration;
        _this.load = entry.responseEnd - entry.responseStart;
        _this.wait = entry.responseStart - entry.requestStart;
        _this.start = entry.startTime;
        _this.redirect = entry.redirectEnd - entry.redirectStart;
        if (entry["secureConnectionStart"]) {
          _this.ssl = entry.connectEnd - entry["secureConnectionStart"];
        }
      };
      this.url = url;
      this.method = method;
      this.isAsync = isAsync;
      this.open = open;
    }
    return AjaxTiming;
  })();
  /* harmony default export */ const rprofiler_AjaxTiming = AjaxTiming; // CONCATENATED MODULE: ./src/rprofiler/AjaxRequestsHandler.ts

  var AjaxRequestsHandler = /** @class */ (function () {
    function AjaxRequestsHandler() {
      var _this = this;
      this.fetchRequests = [];
      this.fetchEntriesIndices = {};
      this.compareEntriesDelay = 100;
      this.hasPerformance =
        typeof window.performance === "object" &&
        typeof window.performance.now === "function" &&
        typeof window.performance.getEntriesByType === "function";
      this.captureFetchRequests = function () {
        var tempArray = [];
        var ajaxHandler = _this;
        var onRequestError = function (error) {
          return error;
        };
        var onResponseError = function (error) {
          // @ts-ignore
          return Promise.reject(error);
        };
        if (!window.fetch) {
          return;
        }
        /*TODO: Adding ignore to resolve the error
            Need to relook on ts error. After adding latest vesion in tsconfig lib, It's unable to get the fetch type.*/
        // @ts-ignore
        window.fetch = (function (fetch) {
          return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            var fetchRequestIndex = 0;
            /*TODO: Adding ignore to resolve the error
                    Need to relook on ts error. After adding latest vesion in tsconfig lib, It's unable to get the promise type.*/
            // @ts-ignore
            var promise = Promise.resolve(args);
            promise = promise.then(function (args) {
              var firstArg;
              var config = {};
              if (args.length && args.length >= 1) {
                firstArg = args[0];
                if (args.length > 1) {
                  config = args[1];
                }
              } else {
                return [];
              }
              var method = "GET";
              if (config.method) {
                method = config.method;
              }
              fetchRequestIndex = tempArray.length;
              var fetchUrl = "";
              //The first argument can be either a url or Request object
              if (typeof firstArg === "object" && !!firstArg) {
                if (Array.isArray(firstArg) && firstArg.length > 0) {
                  fetchUrl = firstArg[0];
                } else {
                  fetchUrl = firstArg.url;
                }
              } else {
                fetchUrl = firstArg;
              }
              if (fetchUrl) {
                tempArray.push(
                  new rprofiler_AjaxTiming(
                    fetchUrl,
                    method,
                    true,
                    ajaxHandler.now()
                  )
                );
              }
              return [firstArg, config];
            }, onRequestError);
            // @ts-ignore
            promise = promise.then(function (args) {
              return fetch.apply(void 0, args);
            });
            promise = promise.then(function (response) {
              var fetchRequest = tempArray[fetchRequestIndex];
              var requestArray = ajaxHandler.fetchRequests;
              ajaxHandler.processPerformanceEntries(fetchRequest, requestArray);
              return response;
            }, onResponseError);
            return promise;
          };
        })(window.fetch);
      };
      this.captureFetchRequests();
      AjaxRequestsHandler.startAjaxCapture(this);
    }
    AjaxRequestsHandler.prototype.getAjaxRequests = function () {
      return this.fetchRequests;
    };
    AjaxRequestsHandler.prototype.clear = function () {
      this.fetchRequests = [];
    };
    AjaxRequestsHandler.prototype.now = function () {
      if (this.hasPerformance) {
        return window.performance.now();
      }
      return new Date().getTime();
    };
    AjaxRequestsHandler.prototype.processPerformanceEntries = function (
      fetchRequest,
      requestArray
    ) {
      var ajaxHandler = this;
      setTimeout(function () {
        if (!ajaxHandler.hasPerformance) {
          return;
        }
        var url = fetchRequest.url;
        var matches = [];
        var entries = performance.getEntriesByType("resource");
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
          var entry = entries_1[_i];
          if (entry.name === url) {
            matches.push(entry);
          }
        }
        requestArray.push(fetchRequest);
        if (matches.length === 0) {
          return;
        }
        if (!ajaxHandler.fetchEntriesIndices[url]) {
          ajaxHandler.fetchEntriesIndices[url] = [];
        }
        if (matches.length === 1) {
          fetchRequest.getPerformanceTimings(matches[0]);
          ajaxHandler.fetchEntriesIndices[url].push(0);
          return;
        }
        var u = ajaxHandler.fetchEntriesIndices[url];
        for (var index in matches) {
          if (u.indexOf(index) !== -1) {
            continue;
          }
          fetchRequest.getPerformanceTimings(matches[index]);
          u.push(index);
          return;
        }
        fetchRequest.getPerformanceTimings(matches[0]); // if we can't find it, just use the first entry
      }, ajaxHandler.compareEntriesDelay);
    };
    AjaxRequestsHandler.startAjaxCapture = function (ajaxHandler) {
      var xhr = XMLHttpRequest.prototype;
      var open = xhr.open;
      var send = xhr.send;
      var tempArray = [];
      if (
        ajaxHandler.hasPerformance &&
        typeof window.performance.setResourceTimingBufferSize === "function"
      ) {
        window.performance.setResourceTimingBufferSize(300);
      }
      // @ts-ignore
      xhr.open = function (method, url, async, user, password) {
        this.rpIndex = tempArray.length;
        tempArray.push(
          new rprofiler_AjaxTiming(url, method, async, ajaxHandler.now())
        );
        open.call(
          this,
          method,
          url,
          async === false ? false : true,
          user,
          password
        );
      };
      xhr.send = function (data) {
        var _this = this;
        var changeFunc = this.onreadystatechange;
        this.onreadystatechange = function (arg) {
          var request = tempArray[_this.rpIndex];
          if (!request) {
            return;
          }
          var state = _this.readyState;
          var hasResponse = !!(
            _this.response &&
            _this.response !== null &&
            _this.response !== undefined
          );
          switch (state) {
            case 0:
              break;
            case 1:
              request.connectionEstablished = ajaxHandler.now();
              break;
            case 2:
              request.requestReceived = ajaxHandler.now();
              break;
            case 3:
              request.processingTime = ajaxHandler.now();
              break;
            case 4:
              request.complete = ajaxHandler.now();
              switch (_this.responseType) {
                case "text":
                case "":
                  if (typeof _this.responseText === "string") {
                    request.responseSize = _this.responseText.length;
                  }
                  break;
                case "json":
                  if (
                    hasResponse &&
                    typeof _this.response.toString === "function"
                  ) {
                    request.responseSize = _this.response.toString().length;
                  }
                  break;
                case "arraybuffer":
                  if (
                    hasResponse &&
                    typeof _this.response.byteLength === "number"
                  ) {
                    request.responseSize = _this.response.byteLength;
                  }
                  break;
                case "blob":
                  if (hasResponse && typeof _this.response.size === "number") {
                    request.responseSize = _this.response.size;
                  }
                  break;
                case "document":
                  break;
              }
              ajaxHandler.processPerformanceEntries(
                request,
                ajaxHandler.fetchRequests
              );
              break;
          }
          if (typeof changeFunc === "function") {
            changeFunc.call(_this, arg);
          }
        };
        var request = tempArray[this.rpIndex];
        if (!request) {
          return;
        }
        if (data && !isNaN(data.length)) {
          request.sendSize = data.length;
        }
        request.send = ajaxHandler.now();
        send.call(this, data);
      };
    };
    return AjaxRequestsHandler;
  })();
  /* harmony default export */ const rprofiler_AjaxRequestsHandler =
    AjaxRequestsHandler; // CONCATENATED MODULE: ./src/rprofiler/ProfilerEventManager.ts

  var ProfilerEventManager = /** @class */ (function () {
    function ProfilerEventManager() {
      this.events = [];
      this.hasAttachEvent = !!window["attachEvent"];
    }
    ProfilerEventManager.prototype.add = function (type, target, func) {
      this.events.push({ type: type, target: target, func: func });
      if (this.hasAttachEvent) {
        target.attachEvent("on" + type, func);
      } else {
        target.addEventListener(type, func, false);
      }
    };
    ProfilerEventManager.prototype.remove = function (type, target, func) {
      if (this.hasAttachEvent) {
        target.detachEvent(type, func);
      } else {
        target.removeEventListener(type, func, false);
      }
      var index = this.events.indexOf({
        type: type,
        target: target,
        func: func,
      });
      if (index !== 1) {
        this.events.splice(index, 1);
      }
    };
    ProfilerEventManager.prototype.clear = function () {
      var events = this.events;
      for (var i = 0; i < events.length; i++) {
        var ev = events[i];
        this.remove(ev.type, ev.target, ev.func);
      }
      this.events = [];
    };
    return ProfilerEventManager;
  })();
  /* harmony default export */ const rprofiler_ProfilerEventManager =
    ProfilerEventManager; // CONCATENATED MODULE: ./src/rprofiler/EventsTimingHandler.ts

  var EventsTimingHandler = /** @class */ (function () {
    function EventsTimingHandler() {
      var _this = this;
      //Capture window Focus (Used for Page On Time)
      this.hiddenStrings = ["hidden", "msHidden", "webkitHidden", "mozHidden"];
      this.visibilityStrings = [
        "visibilitychange",
        "msvisibilitychange",
        "webkitvisibilitychange",
        "mozvisibilitychange",
      ];
      // @ts-ignore
      this.captureSoftNavigation = false;
      this.hidden = "hidden";
      this.visibilityChange = "visibilitychange";
      this.visibilityEvents = [];
      // Capture scroll, focus, resize, mouse and keyEvents
      this.eventManager = new rprofiler_ProfilerEventManager();
      this.engagementTimeIntervalMs = 1000;
      this.engagementTime = 0;
      this.firstEngagementTime = 0;
      this.lastEventTimeStamp = 0;
      this.timeoutId = undefined;
      this.startTime = new Date().getTime();
      this.now = function () {
        return new Date().getTime();
      };
      // @ts-ignore
      this.startVisibilityCapture = function () {
        _this.initializeVisibilityProperties();
        document.addEventListener(
          _this.visibilityChange,
          _this.captureFocusEvent,
          false
        );
      };
      this.initializeVisibilityProperties = function () {
        var values = _this.hiddenStrings;
        var propertyIndex = 0;
        for (var i = 0; i < values.length; i++) {
          if (typeof document[values[i]] !== "undefined") {
            propertyIndex = i;
          }
        }
        _this.visibilityChange = _this.visibilityStrings[propertyIndex];
        _this.hidden = _this.hiddenStrings[propertyIndex];
      };
      this.captureFocusEvent = function () {
        _this.updateVisibilityChangeTime();
        if (!document[_this.hidden]) {
          _this.captureEngagementTime();
        }
      };
      this.updateVisibilityChangeTime = function () {
        if (document[_this.hidden]) {
          _this.captureVisibilityEvent(VisibilityType.Blur);
        } else {
          _this.captureVisibilityEvent(VisibilityType.Focus);
        }
      };
      this.onBlur = function () {
        _this.captureVisibilityEvent(VisibilityType.Blur);
      };
      this.onFocus = function () {
        _this.captureVisibilityEvent(VisibilityType.Focus);
      };
      this.captureVisibilityEvent = function (type) {
        _this.visibilityEvents.push({
          type: type,
          time: _this.now(),
        });
      };
      this.captureEngagementTime = function (isFirstEngagement) {
        if (isFirstEngagement === void 0) {
          isFirstEngagement = true;
        }
        // 1000 ms for default focus
        if (!_this.lastEventTimeStamp) {
          _this.engagementTime = _this.engagementTimeIntervalMs;
          _this.lastEventTimeStamp = _this.now();
          return;
        }
        var timeBetweenEvents = _this.now() - _this.lastEventTimeStamp;
        _this.lastEventTimeStamp = _this.now();
        if (isFirstEngagement && _this.firstEngagementTime === 0) {
          _this.firstEngagementTime = _this.now();
        }
        if (
          timeBetweenEvents > 0 &&
          timeBetweenEvents < _this.engagementTimeIntervalMs
        ) {
          clearTimeout(_this.timeoutId);
          _this.engagementTime += timeBetweenEvents;
          return;
        }
        _this.startTimer();
      };
      //Do not include mousemove for first engagement, as it doesn't really indicate engagement if use just moved mouse to close the page
      this.captureMouseMove = function () {
        _this.captureEngagementTime(false);
      };
      this.startTimer = function () {
        _this.timeoutId = window.setTimeout(function () {
          _this.engagementTime += _this.engagementTimeIntervalMs;
        }, _this.engagementTimeIntervalMs);
      };
      this.getFocusAwayTime = function () {
        var events = _this.visibilityEvents;
        var resetIndex = -1;
        if (events.length === 0) {
          return 0;
        }
        var currentBlurIndex = resetIndex;
        var index = 0;
        var currentFocusIndex = resetIndex;
        var hiddenTimeLapsed = 0;
        while (index < events.length) {
          if (
            events[index].type === VisibilityType.Blur &&
            currentBlurIndex === resetIndex
          ) {
            currentBlurIndex = index;
          }
          var isNewFocusEvent =
            currentFocusIndex === resetIndex && currentBlurIndex !== resetIndex;
          if (events[index].type === VisibilityType.Focus && isNewFocusEvent) {
            currentFocusIndex = index;
          }
          var validFocusChange =
            currentBlurIndex !== resetIndex && currentFocusIndex !== resetIndex;
          if (validFocusChange) {
            var diff =
              events[currentFocusIndex].time - events[currentBlurIndex].time;
            if (diff > 0) {
              hiddenTimeLapsed += diff;
            }
            currentBlurIndex = resetIndex;
            currentFocusIndex = resetIndex;
          }
          index = index + 1;
        }
        if (currentBlurIndex === events.length - 1) {
          hiddenTimeLapsed += _this.now() - events[currentBlurIndex].time;
        }
        return hiddenTimeLapsed;
      };
      this.getEngagementTime = function () {
        return _this.engagementTime;
      };
      this.getStartTime = function () {
        return _this.startTime;
      };
      this.getFirstEngagementTime = function () {
        return _this.firstEngagementTime;
      };
      this.startSoftNavigationCapture = function () {
        _this.captureSoftNavigation = true;
      };
      this.resetSoftNavigationCapture = function () {
        _this.resetEngagementMetrics();
        _this.visibilityEvents = [];
      };
      this.resetEngagementMetrics = function () {
        _this.engagementTime = 0;
        _this.lastEventTimeStamp = _this.now();
        _this.firstEngagementTime = 0;
      };
      this.clear = function () {
        _this.eventManager.clear();
      };
      this.captureEngagementTime(false);
      this.eventManager.add("scroll", document, this.captureEngagementTime);
      this.eventManager.add("resize", window, this.captureEngagementTime);
      this.eventManager.add("mouseup", document, this.captureEngagementTime);
      this.eventManager.add("keyup", document, this.captureEngagementTime);
      this.eventManager.add("mousemove", document, this.captureMouseMove);
      this.eventManager.add("focus", window, this.onFocus);
      this.eventManager.add("blur", window, this.onBlur);
      this.eventManager.add("focus", document, this.onFocus);
      this.eventManager.add("blur", document, this.onBlur);
    }
    return EventsTimingHandler;
  })();
  /* harmony default export */ const rprofiler_EventsTimingHandler =
    EventsTimingHandler; // CONCATENATED MODULE: ./src/rprofiler/InputDelayHandler.ts

  var InputDelayHandler = /** @class */ (function () {
    function InputDelayHandler() {
      var _this = this;
      this.firstInputDelay = 0;
      this.firstInputTimeStamp = 0;
      this.startTime = 0;
      this.delay = 0;
      this.profileManager = new rprofiler_ProfilerEventManager();
      this.eventTypes = [
        "click",
        "mousedown",
        "keydown",
        "touchstart",
        "pointerdown",
      ];
      this.addEventListeners = function () {
        _this.eventTypes.forEach(function (event) {
          _this.profileManager.add(event, document, _this.onInput);
        });
      };
      this.now = function () {
        return new Date().getTime();
      };
      this.removeEventListeners = function () {
        _this.eventTypes.forEach(function (event) {
          _this.profileManager.remove(event, document, _this.onInput);
        });
      };
      this.onInput = function (evt) {
        // Only count cancelable events, which should trigger behavior
        if (!evt.cancelable) {
          return;
        }
        // In some browsers `event.timeStamp` returns a `DOMTimeStamp` value
        // (epoch time) istead of the newer `DOMHighResTimeStamp`
        // (document-origin time). To check for that we assume any timestamp
        // greater than 1 trillion is a `DOMTimeStamp`, and compare it using
        var isEpochTime = evt.timeStamp > 1e12;
        _this.firstInputTimeStamp = _this.now();
        var useFirstInputTime = isEpochTime || !window["performance"];
        var now = useFirstInputTime
          ? _this.firstInputTimeStamp
          : window["performance"].now();
        _this.delay = now - evt.timeStamp;
        if (evt.type == "pointerdown") {
          _this.onPointerDown();
        } else {
          _this.removeEventListeners();
          _this.updateFirstInputDelay();
        }
      };
      this.onPointerUp = function () {
        _this.removeEventListeners();
        _this.updateFirstInputDelay();
      };
      this.onPointerCancel = function () {
        _this.removePointerEventListeners();
      };
      this.removePointerEventListeners = function () {
        _this.profileManager.remove("pointerup", document, _this.onPointerUp);
        _this.profileManager.remove(
          "pointercancel",
          document,
          _this.onPointerCancel
        );
      };
      this.updateFirstInputDelay = function () {
        if (
          _this.delay >= 0 &&
          _this.delay < _this.firstInputTimeStamp - _this.startTime
        ) {
          _this.firstInputDelay = Math.round(_this.delay);
        }
      };
      this.startSoftNavigationCapture = function () {
        _this.resetSoftNavigationCapture();
      };
      this.resetSoftNavigationCapture = function () {
        _this.resetFirstInputDelay();
        _this.addEventListeners();
      };
      this.resetFirstInputDelay = function () {
        _this.delay = 0;
        _this.firstInputDelay = 0;
        _this.startTime = 0;
        _this.firstInputTimeStamp = 0;
      };
      this.startTime = this.now();
      this.addEventListeners();
    }
    InputDelayHandler.prototype.onPointerDown = function () {
      this.profileManager.add("pointerup", document, this.onPointerUp);
      this.profileManager.add("pointercancel", document, this.onPointerCancel);
    };
    InputDelayHandler.prototype.getFirstInputDelay = function () {
      return this.firstInputDelay;
    };
    return InputDelayHandler;
  })();
  /* harmony default export */ const rprofiler_InputDelayHandler =
    InputDelayHandler; // CONCATENATED MODULE: ./src/rprofiler/ProfilerJsError.ts

  var ProfilerJsError = /** @class */ (function () {
    function ProfilerJsError(message, url, lineNumber) {
      this.count = 0;
      this.message = message;
      this.url = url;
      this.lineNumber = lineNumber;
    }
    ProfilerJsError.createText = function (msg, url, num) {
      return [msg, url, num].join(":");
    };
    ProfilerJsError.prototype.getText = function () {
      return ProfilerJsError.createText(
        this.message,
        this.url,
        this.lineNumber
      );
    };
    return ProfilerJsError;
  })();
  /* harmony default export */ const rprofiler_ProfilerJsError =
    ProfilerJsError; // CONCATENATED MODULE: ./src/rprofiler/rprofiler.ts

  var RProfiler = /** @class */ (function () {
    function RProfiler() {
      var _this = this;
      // private restUrl: string = '{{restUrl}}';
      this.restUrl = "portalstage.catchpoint.com/jp/1826/v3.3.11/M";
      this.startTime = new Date().getTime();
      this.eventsTimingHandler = new rprofiler_EventsTimingHandler();
      this.inputDelay = new rprofiler_InputDelayHandler();
      // version: string = '{{version}}'; //version number of inline script
      this.version = "v3_3_11"; //version number of inline script
      this.info = {};
      this.hasInsight = false;
      this.data = {
        start: this.startTime,
        jsCount: 0,
        jsErrors: [],
        loadTime: -1,
        loadFired: window.document.readyState == "complete",
      };
      this.eventManager = new rprofiler_ProfilerEventManager();
      this.setCLS = function (_a) {
        var metricName = _a.name,
          metricValue = _a.delta;
        var CLS = metricName === "CLS" ? metricValue : undefined;
        _this.cls = CLS;
      };
      this.setLCP = function (_a) {
        var metricName = _a.name,
          metricValue = _a.value,
          metricDelta = _a.delta;
        var LCP = metricName === "LCP" ? metricValue : undefined;
        // Logic skip if the delta value is negative and metric value is 0.
        if (metricDelta >= 0 && metricValue > 0) {
          _this.lcp = LCP;
        }
      };
      // Value being used instead delta as metricValue, Delta provide single value and value is for overall value.
      this.setINP = function (_a) {
        var metricName = _a.name,
          metricValue = _a.value;
        var INP = metricName === "INP" ? metricValue : undefined;
        _this.inp = INP;
      };
      this.recordPageLoad = function () {
        _this.data.loadTime = new Date().getTime();
        _this.data.loadFired = true;
      };
      this.addError = function (msg, url, lineNum) {
        _this.data.jsCount++;
        var currError = rprofiler_ProfilerJsError.createText(msg, url, lineNum);
        var errorArr = _this.data.jsErrors;
        for (var _i = 0, errorArr_1 = errorArr; _i < errorArr_1.length; _i++) {
          var err = errorArr_1[_i];
          if (err.getText() == currError) {
            err.count++;
            return;
          }
        }
        errorArr.push(new rprofiler_ProfilerJsError(msg, url, lineNum));
      };
      this.getAjaxRequests = function () {
        return _this.ajaxHandler.getAjaxRequests();
      };
      this.clearAjaxRequests = function () {
        _this.ajaxHandler.clear();
      };
      this.addInfo = function (infoType, key, value) {
        if (_this.isNullOrEmpty(infoType)) {
          return;
        }
        if (_this.isNullOrEmpty(value)) {
          _this.info[infoType] = key;
        } else {
          if (_this.isNullOrEmpty(key)) {
            return;
          }
          if (_this.isNullOrEmpty(_this.info[infoType])) {
            _this.info[infoType] = {};
          }
          _this.info[infoType][key] = value;
        }
        _this.hasInsight = true;
      };
      this.clearInfo = function () {
        _this.info = {};
        _this.hasInsight = false;
      };
      this.clearErrors = function () {
        _this.data.jsCount = 0;
        _this.data.jsErrors = [];
      };
      this.getInfo = function () {
        if (!_this.hasInsight) {
          return null;
        }
        return _this.info;
      };
      this.getEventTimingHandler = function () {
        return _this.eventsTimingHandler;
      };
      this.getInputDelay = function () {
        return _this.inputDelay;
      };
      this.getCPWebVitals = function () {
        S(_this.setCLS);
        W(_this.setLCP);
        Q(_this.setINP);
        return {
          cls: _this.cls,
          lcp: _this.lcp,
          inp: _this.inp,
        };
      };
      this.attachIframe = function () {
        var protocol = window.location.protocol;
        var iframe = document.createElement("iframe");
        iframe.src = "about:blank";
        var style = iframe.style;
        style.position = "absolute";
        style.top = "-10000px";
        style.left = "-1000px";
        iframe.addEventListener("load", function (event) {
          var frame = event.currentTarget;
          if (frame && frame.contentDocument) {
            var iframeDocument = frame.contentDocument;
            var rumScript = iframeDocument.createElement("script");
            rumScript.type = "text/javascript";
            rumScript.src = protocol + "//" + _this.restUrl;
            iframeDocument.body.appendChild(rumScript);
          }
        });
        if (document.body) {
          document.body.insertAdjacentElement("afterbegin", iframe);
        }
      };
      this.eventManager.add(WindowEvent.Load, window, this.recordPageLoad);
      var errorFunc = this.addError;
      this.ajaxHandler = new rprofiler_AjaxRequestsHandler();
      S(this.setCLS);
      W(this.setLCP, { reportAllChanges: true });
      Q(this.setINP, { reportAllChanges: true });
      function recordJsError(e) {
        var ev = e.target || e.srcElement;
        if (ev.nodeType == 3) {
          ev = ev.parentNode;
        }
        errorFunc("N/A", ev.src || ev.URL, -1);
        return false;
      }
      if (!!window["opera"]) {
        this.eventManager.add(WindowEvent.Error, document, recordJsError);
      } else if ("onerror" in window) {
        var origOnError = window.onerror;
        window.onerror = function (msg, url, lineNum) {
          errorFunc(
            msg,
            url !== null && url !== void 0 ? url : "",
            lineNum !== null && lineNum !== void 0 ? lineNum : 0
          );
          if (!!origOnError) {
            return origOnError(msg, url, lineNum);
          }
          return false;
        };
      }
      // Event to capture the errors in promise rejection
      if ("onunhandledrejection" in window) {
        window.onunhandledrejection = function (errorEvent) {
          var _a, _b, _c;
          var fullMessage =
            (_a = errorEvent.reason.stack) !== null && _a !== void 0 ? _a : "";
          var errorMsg = fullMessage !== "" ? fullMessage.split("at") : [];
          var fileUrl = errorMsg[1] ? errorMsg[1].replace(/:\d+/g, "") : "";
          var errorLineNumbers = errorMsg[1] ? errorMsg[1].match(/:\d+/g) : [];
          var lineNum = errorLineNumbers[0]
            ? errorLineNumbers[0].replace(":", "")
            : 0;
          errorFunc(
            (_c =
              (_b = errorMsg[0]) === null || _b === void 0
                ? void 0
                : _b.trim()) !== null && _c !== void 0
              ? _c
              : "N/A",
            fileUrl.trim(),
            lineNum
          );
        };
      }
      if (!!window["__cpCdnPath"]) {
        this.restUrl = window["__cpCdnPath"].trim();
      }
    }
    RProfiler.prototype.isNullOrEmpty = function (val) {
      if (val === undefined || val === null) {
        return true;
      }
      if (typeof val == "string") {
        var str = val;
        return str.trim().length == 0;
      }
      return false;
    };
    RProfiler.prototype.dispatchCustomEvent = function (event) {
      (function (w) {
        if (typeof w.CustomEvent === "function") {
          return false;
        }
        function CustomEvent(event, params) {
          params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined,
          };
          var evt = document.createEvent("CustomEvent");
          evt.initCustomEvent(
            event,
            params.bubbles,
            params.cancelable,
            params.detail
          );
          return evt;
        }
        CustomEvent.prototype = Event.prototype;
        // @ts-ignore
        w.CustomEvent = CustomEvent;
      })(window); //for the browsers don't support CustomEvent
      var e = new CustomEvent(event);
      window.dispatchEvent(e);
    };
    return RProfiler;
  })();
  /* harmony default export */ const rprofiler = RProfiler;
  var profiler = new RProfiler();
  window["RProfiler"] = profiler;
  window["WindowEvent"] = WindowEvent;
  // if the document state is already complete by the time script is injected - can happen in the case of tag managers like GTM
  if (document.readyState === "complete") {
    profiler.attachIframe();
  } else {
    document.onreadystatechange = function () {
      if (document.readyState === "complete") {
        profiler.attachIframe();
      }
    };
  }
  profiler.dispatchCustomEvent("GlimpseLoaded");

  /******/
})();
