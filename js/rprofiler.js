/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/main/main.ts + 2 modules ***!
  \**************************************/
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: ./src/types.ts
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
    VisibilityType[VisibilityType["Focus"] = 0] = "Focus";
    VisibilityType[VisibilityType["Blur"] = 1] = "Blur";
})(VisibilityType || (VisibilityType = {}));
// enum definition matches core enum
var PostType;
(function (PostType) {
    PostType[PostType["OnLoad"] = 0] = "OnLoad";
    PostType[PostType["OnBeforeUnload"] = 1] = "OnBeforeUnload";
    PostType[PostType["OnAbort"] = 2] = "OnAbort";
    PostType[PostType["Flush"] = 3] = "Flush";
})(PostType || (PostType = {}));
var Metrics;
(function (Metrics) {
    Metrics[Metrics["DNS"] = 0] = "DNS";
    Metrics[Metrics["Connect"] = 1] = "Connect";
    Metrics[Metrics["Load"] = 2] = "Load";
    Metrics[Metrics["Wait"] = 3] = "Wait";
    Metrics[Metrics["Start"] = 4] = "Start";
    Metrics[Metrics["Redirect"] = 5] = "Redirect";
    Metrics[Metrics["Duration"] = 6] = "Duration";
    Metrics[Metrics["SSL"] = 7] = "SSL";
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
    WinHttpMethod[WinHttpMethod["GET"] = 0] = "GET";
    WinHttpMethod[WinHttpMethod["POST"] = 1] = "POST";
    WinHttpMethod[WinHttpMethod["HEAD"] = 2] = "HEAD";
    WinHttpMethod[WinHttpMethod["DELETE"] = 3] = "DELETE";
    WinHttpMethod[WinHttpMethod["OPTIONS"] = 4] = "OPTIONS";
    WinHttpMethod[WinHttpMethod["PUT"] = 5] = "PUT";
    WinHttpMethod[WinHttpMethod["TRACE"] = 6] = "TRACE";
    WinHttpMethod[WinHttpMethod["CONNECT"] = 7] = "CONNECT";
})(WinHttpMethod || (WinHttpMethod = {}));

;// CONCATENATED MODULE: ./src/main/DataWrapper.ts
var DataWrapper = /** @class */ (function () {
    function DataWrapper() {
        // insight
        this.hasErrors = false;
        this._appErrors = null;
        this.hasIndicators = false;
        this._indicators = null;
        this.hasTracepoints = false;
        this._tracepoints = null;
    }
    DataWrapper.prototype.addError = function (key, value) {
        if (!this.hasErrors) {
            this._appErrors = new Object();
            this.hasErrors = true;
        }
        this._appErrors[key] = value;
    };
    DataWrapper.prototype.getErrors = function () {
        return this._appErrors;
    };
    DataWrapper.prototype.addIndicator = function (obj) {
        if (!this.hasIndicators) {
            this._indicators = {};
            this.hasIndicators = true;
        }
        for (var key in obj) {
            this._indicators[key] = obj[key];
        }
    };
    DataWrapper.prototype.getIndicators = function () {
        return this._indicators;
    };
    DataWrapper.prototype.addTracepoint = function (obj) {
        if (!this.hasTracepoints) {
            this._tracepoints = {};
            this.hasTracepoints = true;
        }
        for (var key in obj) {
            this._tracepoints[key] = obj[key];
        }
    };
    DataWrapper.prototype.getTracepoints = function () {
        return this._tracepoints;
    };
    return DataWrapper;
}());
/* harmony default export */ const main_DataWrapper = (DataWrapper);

;// CONCATENATED MODULE: ./src/main/main.ts
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


(function () {
    if (!document.getElementById || !(window['attachEvent'] || window.addEventListener)) {
        return;
    }
    var pageWindow = parent.window;
    var location = pageWindow.location;
    var profiler = pageWindow['RProfiler'];
    var windowEvent = pageWindow['WindowEvent'];
    var protocol = location.protocol + '//';
    if (!windowEvent || !profiler) {
        return;
    }
    var hasPerformanceApi = !!pageWindow.performance && typeof pageWindow.performance === 'object';
    var hasGetEntriesApi = hasPerformanceApi && typeof pageWindow.performance.getEntriesByType === 'function';
    // extend WindowEvent enum definition
    var windowEventDef = {
        Load: windowEvent.Load,
        BeforeUnload: windowEvent.BeforeUnload,
        Unload: windowEvent.Unload,
        Abort: windowEvent.Abort,
        Error: windowEvent.Error
    };
    // variable values replaced in code behind
    var testUserId = 123;
    var version = 'v3_3_11';
    var config = {
        // sampleRate: -999, // range [0 - 100]
        // waterfallSampleRate: -888, // range [0 - 100]
        // postUrl: protocol + '{{postUrl}}',
        // siteId: -111,
        // debugParameter: '{{debugParam}}',
        // debugUrl: '{{debugUrl}}',
        // waterfallParameter: '{{wfallParam}}',
        // sendOnLoad: false, // default is send onunload
        // clearResources: true, // clear performance entries when we send data to core. using performance.clearResourceTimings()
        // ajaxDomains: '{{ajaxDomains}}'
        sampleRate: 100,
        waterfallSampleRate: 100,
        postUrl: protocol + 'lst01a.3genlabs.net/hawklogserver/r.p',
        siteId: 1826,
        debugParameter: 'GlimpseDebug',
        debugUrl: 'portalstage.catchpoint.com/jp/v3.3.8/D',
        waterfallParameter: 'GlimpseWaterfall',
        sendOnLoad: false,
        clearResources: true,
        ajaxDomains: ''
    };
    var now = function () {
        return new Date().getTime();
    };
    if (!!pageWindow['__cpPostUrl']) {
        config.postUrl = pageWindow['__cpPostUrl'].trim();
    }
    if (!!pageWindow['__cpSendOnLoad']) {
        config.sendOnLoad = pageWindow['__cpSendOnLoad'] === true;
    }
    // TTI is calculated using https://github.com/WICG/time-to-interactive#definition
    var Storage = /** @class */ (function () {
        function Storage() {
        }
        Storage.save = function (value) {
            if (Storage.canUseLocalStorage()) {
                pageWindow.localStorage.setItem(Storage.storeKey, value);
                return;
            }
            Storage.setCookie(value);
        };
        Storage.read = function () {
            if (Storage.canUseLocalStorage()) {
                var store = pageWindow.localStorage.getItem(Storage.storeKey);
                if (store) {
                    return store;
                }
            }
            return this.readCookie();
        };
        Storage.canUseLocalStorage = function () {
            var canUse = true;
            try {
                var key = Storage.storeKey + 'delete';
                var value = key + 0;
                pageWindow.localStorage.setItem(key, value);
                var valueFromStorage = pageWindow.localStorage.getItem(key);
                canUse = value === valueFromStorage;
                if (canUse) {
                    pageWindow.localStorage.removeItem(key);
                }
            }
            catch (ex) {
                canUse = false;
            }
            return canUse;
        };
        Storage.setCookie = function (value) {
            var date = new Date();
            date.setTime(date.getTime() + Storage.cookieExpireDays * 24 * 60 * 60 * 1000);
            var expires = '; expires=' + date.toUTCString();
            var split = pageWindow.document.domain.split('.');
            var length = split.length;
            var domain = split[length - 2] + '.' + split[length - 1];
            document.cookie =
                Storage.storeKey +
                    '=' +
                    encodeURIComponent(value) +
                    expires +
                    '; path=/; domain=' +
                    domain +
                    '; SameSite=Lax;';
        };
        Storage.readCookie = function () {
            var split = pageWindow.document.cookie.split(';');
            var regex = Storage.storeRegex;
            for (var _i = 0, split_1 = split; _i < split_1.length; _i++) {
                var c = split_1[_i];
                if (regex.test(c)) {
                    return decodeURIComponent(c.substring(c.indexOf('=') + 1, c.length));
                }
            }
            return '';
        };
        Storage.cookieExpireDays = 365;
        Storage.storeKey = '{{cookieName}}';
        Storage.storeRegex = new RegExp('^(\\s)*' + Storage.storeKey + '=', 'i');
        return Storage;
    }());
    var Util = /** @class */ (function () {
        function Util() {
        }
        Util.getValue = function (resource, metric) {
            var allowOrigin = resource.responseStart !== 0;
            switch (metric) {
                case Metrics.DNS:
                    return Util.getMetricValue(resource.domainLookupEnd, resource.domainLookupStart, allowOrigin);
                case Metrics.Connect:
                    return Util.getMetricValue(resource.connectEnd, resource.connectStart, allowOrigin);
                case Metrics.Load:
                    return Util.getMetricValue(resource.responseEnd, resource.responseStart, allowOrigin);
                case Metrics.Wait:
                    return Util.getMetricValue(resource.responseStart, resource.requestStart, allowOrigin);
                case Metrics.Start:
                    return resource.startTime;
                case Metrics.Redirect:
                    return Util.getMetricValue(resource.redirectEnd, resource.redirectStart);
                case Metrics.Duration:
                    return resource.duration;
                case Metrics.SSL:
                    if (resource['secureConnectionStart']) {
                        return allowOrigin ? resource.connectEnd - resource['secureConnectionStart'] : null;
                    }
                    break;
            }
            return 0;
        };
        Util.getMetricValue = function (end, start, allowOrigin) {
            if (allowOrigin === void 0) { allowOrigin = true; }
            if (!allowOrigin) {
                return null;
            }
            else if (end >= 0 && end >= start && start >= 0) {
                var value = end - start;
                return Math.round(value);
            }
        };
        Util.getRoundedValue = function (value) {
            return value ? Math.round(value) : value;
        };
        Util.addScriptTag = function (url, scope) {
            var script = scope.document.createElement('script');
            script.type = 'text/javascript';
            script.src = protocol + url;
            scope.document.body.appendChild(script);
        };
        Util.getQueryStringValue = function (val) {
            var query = location.search.substring(1);
            var values = query.split('&');
            var arr;
            for (var i = 0; i < values.length; i++) {
                arr = values[i].split('=');
                if (arr[0] == val) {
                    return arr[1];
                }
            }
            return '';
        };
        Util.stopEvents = function () {
            if (!profiler) {
                return;
            }
            profiler.eventManager.clear();
            profiler.getEventTimingHandler().clear();
        };
        Util.getNavigationTime = function () {
            var timing = null;
            var navigationTime = hasGetEntriesApi && pageWindow.performance.getEntriesByType('navigation');
            if (navigationTime && navigationTime.length !== 0) {
                timing = navigationTime[0];
            }
            return timing;
        };
        Util.getNavigationStart = function (timing) {
            var navigationtiming = timing;
            return navigationtiming.startTime;
        };
        return Util;
    }());
    var PerformanceObserver = /** @class */ (function () {
        function PerformanceObserver(isSoftnav) {
            var _this = this;
            this.longTaskEndTime = 0;
            this.waitTime = 5000;
            this.performanceObserverApi = pageWindow['PerformanceObserver'];
            this.performanceLongTaskTiming = pageWindow['PerformanceLongTaskTiming'];
            this.nowTime = 0;
            this.isSoftnav = false;
            this.getDomContentLoad = function () {
                var timing = Util.getNavigationTime();
                if (timing) {
                    var navStart = Util.getNavigationStart(timing);
                    var domContentLoad = Util.getMetricValue(timing.domContentLoadedEventEnd, navStart);
                    return domContentLoad;
                }
            };
            this.observeLongTask = function (entries) {
                for (var i = 0; i < entries.length; i++) {
                    var currEntry = entries[i];
                    var startTime = _this.isSoftnav ? currEntry.startTime - _this.nowTime : currEntry.startTime;
                    var idleTimeBetweenLongTasks = startTime - _this.longTaskEndTime;
                    if (idleTimeBetweenLongTasks >= _this.waitTime) {
                        _this.performanceObserver.disconnect();
                    }
                    else {
                        _this.setLongTaskTime(currEntry);
                    }
                }
            };
            this.setLongTaskTime = function (entry) {
                var newLongTaskTime = Math.round(entry.startTime + entry.duration);
                _this.longTaskEndTime = newLongTaskTime;
            };
            this.getLongTaskTime = function () {
                return _this.longTaskEndTime;
            };
            if (this.performanceLongTaskTiming) {
                // setting default TTI as domContentLoad on Load (not soft navigation).
                this.isSoftnav = isSoftnav;
                this.nowTime = pageWindow.performance.now();
                var domContentLoad = this.getDomContentLoad();
                if (!isSoftnav) {
                    this.longTaskEndTime = domContentLoad;
                }
                this.observe(['longtask'], this.observeLongTask);
            }
        }
        PerformanceObserver.prototype.observe = function (entryTypes, callBack) {
            if (this.performanceObserverApi) {
                // @ts-ignore
                this.performanceObserver = new this.performanceObserverApi(function (list, obj) {
                    var entries = list.getEntries();
                    callBack(entries);
                });
                this.performanceObserver.observe({ entryTypes: entryTypes });
            }
        };
        return PerformanceObserver;
    }());
    var VisitorStorage = /** @class */ (function () {
        function VisitorStorage() {
            this.userId = -1;
            this.sessionId = 0;
            this.sessionTime = 0;
            this.pageViewCount = 0;
            this.viewCount = 0;
            this.pageViewId = 0;
            this.postFlag = -1;
            this.sendWaterfall = false;
            this.exitToEntry = 0;
        }
        VisitorStorage.prototype.resetViewCount = function () {
            this.viewCount = 1;
        };
        VisitorStorage.prototype.save = function () {
            var text = this.getText();
            Storage.save(text);
        };
        VisitorStorage.prototype.load = function () {
            var storeValue = Storage.read();
            if (!storeValue) {
                return false;
            }
            var split = storeValue.split(',');
            for (var _i = 0, split_2 = split; _i < split_2.length; _i++) {
                var visitorVal = split_2[_i];
                var array = visitorVal.split(':');
                if (array.length !== 2) {
                    continue;
                }
                var key = array[0];
                if (typeof key === 'string') {
                    key = key.trim();
                }
                var value = array[1];
                if (key === CookieIdentifier.UrlCheckSum) {
                    this.urlCheckSum = value;
                    continue;
                }
                var num = parseInt(array[1], 10);
                if (isNaN(num)) {
                    continue;
                }
                switch (key) {
                    case CookieIdentifier.UserId:
                        this.userId = num;
                        break;
                    case CookieIdentifier.SessionId:
                        this.sessionId = num;
                        break;
                    case CookieIdentifier.SessionTime:
                        this.sessionTime = num;
                        break;
                    case CookieIdentifier.PageViewCount:
                        this.pageViewCount = num;
                        break;
                    case CookieIdentifier.PostFlag:
                        this.postFlag = num;
                        break;
                }
            }
            return true;
        };
        VisitorStorage.prototype.getText = function () {
            var text = CookieIdentifier.UserId + ':' + this.userId + ',';
            text += CookieIdentifier.SessionId + ':' + this.sessionId + ',';
            text += CookieIdentifier.SessionTime + ':' + this.sessionTime + ',';
            text += CookieIdentifier.PageViewCount + ':' + this.pageViewCount + ',';
            text += CookieIdentifier.UrlCheckSum + ':' + this.urlCheckSum + ',';
            text += CookieIdentifier.PostFlag + ':' + this.postFlag;
            return text;
        };
        return VisitorStorage;
    }());
    var Visitor = /** @class */ (function () {
        function Visitor() {
            this.sessionExpire = 30 * 60 * 1000;
            this.store = new VisitorStorage();
        }
        Visitor.prototype.updateSessionTime = function () {
            if (!this.store) {
                return;
            }
            var time = new Date().getTime();
            if (time - this.store.sessionTime > this.sessionExpire) {
                this.store.sessionId = 0;
            }
            this.store.sessionTime = time;
            this.updateStore();
        };
        Visitor.prototype.updateStore = function () {
            if (!this.store) {
                return;
            }
            this.store.save();
        };
        Visitor.prototype.initStore = function () {
            var hasStoredValue = this.store.load();
            if (!hasStoredValue) {
                return;
            }
        };
        Visitor.prototype.checkAndResetPostFlags = function () {
            this.store.postFlag = 0;
            if (config.sampleRate < 0) {
                this.store.postFlag = -1;
                return;
            }
            var rate = this.getUserId(config.sampleRate / 100);
            if (this.store.userId <= rate) {
                this.store.postFlag = 1;
                var waterfallRate = rate / (100 / config.waterfallSampleRate);
                this.store.sendWaterfall = this.store.userId <= waterfallRate;
            }
        };
        Visitor.prototype.getReferrer = function (url) {
            var host = this.getHostName(url).replace(':', '-');
            var index = url.indexOf('?');
            var n = 0;
            for (var i = host.length; i < url.length; i++) {
                n += url.charCodeAt(i) % i;
            }
            return host + '/' + (index < 0 ? url.length : index) + '/' + url.length + '/' + n;
        };
        Visitor.prototype.getHostName = function (url) {
            var start = url.indexOf('//') + 2;
            var end = url.indexOf('/', start);
            if (start < 2 && end == -1) {
                return url;
            }
            if (end == -1) {
                end = url.length;
            }
            return url.substring(start, end);
        };
        Visitor.prototype.init = function () {
            var start = profiler.data.start;
            this.initStore();
            if (this.store.userId == -1 || this.store.userId == testUserId) {
                this.store.userId = this.getUserId();
            }
            this.checkAndResetPostFlags();
            if (this.store.sessionId == 0 || start - this.store.sessionTime > this.sessionExpire) {
                this.store.sessionId = Math.floor(1 + Math.random() * ((Math.pow(2, 32) - 2) / 2));
                this.store.pageViewCount = 1;
            }
            else {
                if (this.store.pageViewCount < 65535) {
                    this.store.pageViewCount++;
                }
                if (this.getReferrer(pageWindow.document.referrer) == this.store.urlCheckSum &&
                    this.store.sessionTime > 0) {
                    this.store.exitToEntry = start - this.store.sessionTime;
                }
            }
            this.store.sessionTime = new Date().getTime();
            this.store.pageViewId = Math.floor(1 + Math.random() * ((Math.pow(2, 16) - 2) / 2));
            this.store.urlCheckSum = this.getReferrer(pageWindow.location.href);
            this.store.resetViewCount();
            this.updateStore();
            var hasVisitorData = this.store.load();
            return hasVisitorData;
        };
        //This method is used for 2 purpose
        // 1. When the userId is -1 (no id assigned for user), user id is created randomly. So method is called without a param
        // 2. A seed is used when we sample the user and sample rate is passed as param in that case.
        // This logic for sampling is happening in Core as well. Any changes in this method should be approved by Core as well.
        Visitor.prototype.getUserId = function (seed) {
            if (seed === void 0) { seed = Math.random(); }
            var userId = Math.floor(1 + seed * ((Math.pow(2, 64) - 2) / 2));
            return userId;
        };
        Visitor.prototype.shouldPost = function () {
            return this.store.postFlag == 1;
        };
        return Visitor;
    }());
    var TreeNode = /** @class */ (function () {
        function TreeNode(char) {
            this.char = char;
            this.children = [];
        }
        return TreeNode;
    }());
    var Tree = /** @class */ (function () {
        function Tree() {
            this.root = new TreeNode('');
            this.isReversed = true;
        }
        Tree.prototype.add = function (parent, char) {
            if (parent === void 0) { parent = this.root; }
            var children = parent.children;
            for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                var child = children_1[_i];
                if (child.char == char) {
                    return child;
                }
            }
            var node = new TreeNode(char);
            children.push(node);
            node.parent = parent;
            return node;
        };
        Tree.prototype.toObject = function () {
            var obj = {};
            var isSuffix = this.isReversed;
            (function recurse(curr, obj) {
                var isRoot = curr.char == '';
                var arg;
                if (isRoot) {
                    arg = obj;
                }
                else {
                    var key = curr.char;
                    if (curr.children.length == 1) {
                        while (curr.children.length == 1) {
                            curr = curr.children[0];
                            key = isSuffix ? curr.char + key : key + curr.char;
                            if (curr.data) {
                                obj[key] = curr.data;
                            }
                        }
                    }
                    obj[key] = curr.data || {};
                    arg = obj[key];
                }
                for (var i = 0; i < curr.children.length; i++) {
                    recurse(curr.children[i], arg);
                }
            })(this.root, obj);
            return obj;
        };
        return Tree;
    }());
    var performanceObserver = new PerformanceObserver(false);
    var WaterfallItem = /** @class */ (function () {
        function WaterfallItem(resource) {
            this.dns = null;
            this.connect = null;
            this.load = null;
            this.wait = null;
            this.start = 0;
            this.duration = 0;
            this.redirect = 0;
            this.ssl = null;
            this.url = resource.name;
            var func = Util.getValue;
            this.dns = func(resource, Metrics.DNS);
            this.connect = func(resource, Metrics.Connect);
            this.wait = func(resource, Metrics.Wait);
            this.load = func(resource, Metrics.Load);
            this.start = func(resource, Metrics.Start);
            this.duration = func(resource, Metrics.Duration);
            this.redirect = func(resource, Metrics.Redirect);
            this.ssl = func(resource, Metrics.SSL);
        }
        Object.defineProperty(WaterfallItem.prototype, "url", {
            get: function () {
                return this._url;
            },
            set: function (u) {
                if (u.indexOf('http://') !== -1) {
                    this.protocol = 0;
                }
                else if (u.indexOf('https://') !== -1) {
                    this.protocol = 1;
                }
                var host = u.split('/').slice(1, 3).join('');
                var index = host.indexOf(':');
                if (index != -1) {
                    var p = host.substr(index + 1);
                    var num = parseInt(p);
                    if (!isNaN(num)) {
                        this.port = num;
                    }
                }
                u = u.substr(u.indexOf(host) + host.length);
                index = u.indexOf('?');
                if (index != -1) {
                    u = u.substr(0, index);
                }
                index = u.indexOf('#');
                if (index != -1) {
                    u = u.substr(0, index);
                }
                u = u.substr(0, 64);
                this._url = u;
            },
            enumerable: false,
            configurable: true
        });
        WaterfallItem.prototype.translateForPost = function () {
            // @ts-ignore
            var round = Math.round;
            var roundedValue = Util.getRoundedValue;
            var obj = {
                u: this.url,
                pr: this.protocol
            };
            var setIfNumber = function (key, num) {
                if (typeof num == 'number' && !isNaN(num)) {
                    obj[key] = num;
                }
            };
            setIfNumber('pt', this.port);
            setIfNumber('dn', roundedValue(this.dns));
            setIfNumber('fc', roundedValue(this.connect));
            setIfNumber('ld', roundedValue(this.load));
            setIfNumber('wt', roundedValue(this.wait));
            setIfNumber('st', roundedValue(this.start));
            setIfNumber('rd', roundedValue(this.redirect));
            setIfNumber('dr', roundedValue(this.duration));
            setIfNumber('ssl', roundedValue(this.ssl));
            return obj;
        };
        return WaterfallItem;
    }());
    var AjaxItem = /** @class */ (function (_super) {
        __extends(AjaxItem, _super);
        function AjaxItem(timing, resource, isSummary) {
            var _this = _super.call(this, resource) || this;
            _this.responseTime = 0; // calculated from readyState changes
            _this.sendSize = 0;
            _this.responseSize = 0;
            _this.method = WinHttpMethod[timing.method.toUpperCase()];
            if (timing.complete && timing.connectionEstablished) {
                _this.responseTime = timing.complete - timing.connectionEstablished;
            }
            _this.isSummary = isSummary;
            if (isSummary) {
                _this.start = undefined; // summary items should not have start time
                _this.count = 1;
            }
            else {
                _this.isAsync = timing.isAsync;
            }
            _this.sendSize = timing.sendSize || 0;
            _this.responseSize = timing.responseSize || 0;
            return _this;
        }
        AjaxItem.prototype.update = function (timing, resource) {
            var func = Util.getValue;
            if (resource.responseStart) {
                this.dns += func(resource, Metrics.DNS);
                this.connect += func(resource, Metrics.Connect);
                this.wait += func(resource, Metrics.Wait);
                this.load += func(resource, Metrics.Load);
                this.ssl += func(resource, Metrics.SSL);
            }
            this.duration += func(resource, Metrics.Duration);
            this.redirect += func(resource, Metrics.Redirect);
            this.sendSize += timing.sendSize || 0;
            this.responseSize += timing.responseSize || 0;
            this.count++;
        };
        AjaxItem.prototype.translateForPost = function () {
            var obj = _super.prototype.translateForPost.call(this);
            if (this.isSummary) {
                obj['n'] = this.count;
            }
            else {
                obj['ia'] = this.isAsync ? 1 : 0;
            }
            obj['md'] = this.method;
            obj['rp'] = Math.round(this.responseTime);
            obj['ss'] = this.sendSize;
            obj['rs'] = this.responseSize;
            return obj;
        };
        return AjaxItem;
    }(WaterfallItem));
    var HostSummary = /** @class */ (function () {
        function HostSummary() {
            this.count = 0;
            this.dns = null;
            this.connect = null;
            this.load = null;
            this.wait = null;
            this.duration = 0;
            this.redirect = 0;
            this.ssl = null;
        }
        HostSummary.prototype.addAjaxItem = function (timing, resource) {
            this.update(resource);
            var ajax = new AjaxItem(timing, resource, true);
            if (typeof this._ajax == 'undefined') {
                this._ajax = [];
                this._ajax.push(ajax);
                return;
            }
            for (var _i = 0, _a = this._ajax; _i < _a.length; _i++) {
                var a = _a[_i];
                if (a.url == ajax.url) {
                    a.update(timing, resource);
                    return;
                }
            }
            if (this._ajax.length < 10) {
                this._ajax.push(ajax);
            }
        };
        HostSummary.prototype.update = function (resource) {
            var func = Util.getValue;
            if (resource.responseStart) {
                this.dns += func(resource, Metrics.DNS);
                this.connect += func(resource, Metrics.Connect);
                this.wait += func(resource, Metrics.Wait);
                this.load += func(resource, Metrics.Load);
                this.ssl += func(resource, Metrics.SSL);
            }
            this.duration += func(resource, Metrics.Duration);
            this.redirect += func(resource, Metrics.Redirect);
            this.count++;
        };
        HostSummary.prototype.translateForPost = function () {
            var roundedValue = Util.getRoundedValue;
            var obj = {
                n: this.count,
                dn: roundedValue(this.dns),
                fc: roundedValue(this.connect),
                ld: roundedValue(this.load),
                wt: roundedValue(this.wait),
                dr: roundedValue(this.duration),
                rd: roundedValue(this.redirect),
                ssl: roundedValue(this.ssl)
            };
            if (this._ajax) {
                var ajax = [];
                for (var _i = 0, _a = this._ajax; _i < _a.length; _i++) {
                    var a = _a[_i];
                    ajax.push(a.translateForPost());
                }
                obj['ax'] = ajax;
            }
            return obj;
        };
        return HostSummary;
    }());
    var HostWaterfall = /** @class */ (function () {
        function HostWaterfall() {
            this._resources = [];
        }
        HostWaterfall.prototype.translateForPost = function () {
            var a = [];
            for (var _i = 0, _a = this._resources; _i < _a.length; _i++) {
                var res = _a[_i];
                a.push(res.translateForPost());
            }
            return a;
        };
        HostWaterfall.prototype.addItem = function (resource) {
            var item = new WaterfallItem(resource);
            this._resources.push(item);
        };
        HostWaterfall.prototype.addAjaxItem = function (timing, resource) {
            var ajax = new AjaxItem(timing, resource, false);
            this._resources.push(ajax);
        };
        return HostWaterfall;
    }());
    var PostData = /** @class */ (function (_super) {
        __extends(PostData, _super);
        function PostData() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.maxJsErrors = 10;
            _this.charCodes = {
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\',
                '&': '%26'
            };
            _this.strRegex = /["&\\\x00-\x1f\x7f-\x9f]/g;
            return _this;
        }
        PostData.prototype.toString = function (type, includeWaterfall) {
            var obj = this.translateForPost(type, includeWaterfall);
            if (typeof JSON == 'undefined') {
                return this.jsonStringify(obj);
            }
            return JSON.stringify(obj);
        };
        PostData.prototype.strEscape = function (value) {
            var char = this.charCodes[value];
            if (char) {
                return char;
            }
            var index = value.charCodeAt(0);
            return '\\u00' + Math.floor(index / 16).toString(16) + (index % 16).toString(16);
        };
        PostData.prototype.jsonStringify = function (value) {
            var arr = new Array();
            switch (typeof value) {
                case 'string':
                    return this.strRegex.test(value)
                        ? '"' + value.replace(this.strRegex, this.strEscape) + '"'
                        : '"' + value + '"';
                case 'number':
                    return isFinite(value) ? String(value) : 'null';
                case 'boolean':
                    return String(value);
                case 'object':
                    if (!value) {
                        return 'null';
                    }
                    if (value.constructor === Date) {
                    }
                    if (typeof value.length == 'number' && !value.propertyIsEnumerable('length')) {
                        for (var _i = 0, _a = value; _i < _a.length; _i++) {
                            var a = _a[_i];
                            arr.push(this.jsonStringify(a));
                        }
                        return '[' + arr.join(',') + ']';
                    }
                    for (var key in value) {
                        if (typeof key == 'string') {
                            var str = this.jsonStringify(value[key]);
                            if (!!str) {
                                arr.push(this.jsonStringify(key) + ':' + str);
                            }
                        }
                    }
                    return '{' + arr.join(',') + '}';
            }
            return '';
        };
        PostData.prototype.translateForPost = function (type, includeWaterfall) {
            var isSoftNavigation = this.viewCount > 1;
            var obj = new Object();
            obj['v'] = version;
            obj['pt'] = this.postType;
            obj['ui'] = this.userId;
            obj['si'] = this.sessionId;
            obj['di'] = this.siteId;
            obj['pi'] = this.pageViewId;
            obj['jsc'] = this.jsErrorCount || 0;
            obj['rf'] = this.referrer;
            obj['pc'] = this.pageViewCount;
            obj['vc'] = this.viewCount;
            obj['rc'] = this.redirectCount || 0;
            if (this.jsErrors && this.jsErrors.length > 0) {
                var arr = [];
                for (var i = 0; i < Math.min(this.jsErrors.length, this.maxJsErrors); i++) {
                    arr.push(this.translateErrorForPost(this.jsErrors[i]));
                }
                obj['jse'] = arr;
            }
            if (this.hasErrors) {
                obj['ae'] = this.getErrors();
            }
            if (this.pageGroup) {
                obj['pg'] = this.pageGroup;
            }
            if (this.variation) {
                obj['ab'] = this.variation;
            }
            if (this.resources || this.ajaxRequests) {
                var r = this.translateResources(this.resources, this.ajaxRequests);
                obj['res'] = r.summary;
                if (includeWaterfall) {
                    obj['wf'] = r.waterfall;
                }
            }
            if (typeof this.isNewView == 'boolean') {
                obj['nv'] = this.isNewView ? 1 : 0;
            }
            if (this.hasIndicators) {
                obj['ind'] = this.getIndicators();
            }
            if (this.hasTracepoints) {
                obj['tra'] = this.getTracepoints();
            }
            if (this.isConversion) {
                obj['cv'] = this.isConversion ? 1 : 0;
                if (this.revenue) {
                    obj['rv'] = this.revenue;
                }
                if (this.revenueItems) {
                    obj['ri'] = this.revenueItems;
                }
            }
            obj['np'] = this.isNewPageView ? 1 : 0;
            if (type === PostType.OnLoad || type === PostType.OnAbort) {
                obj['dh'] = this.screenHeight;
                obj['dw'] = this.screenWidth;
                if (this.isNewPageView) {
                    obj['dn'] = Math.round(this.dns);
                    obj['fc'] = Math.round(this.fullConnect);
                    obj['wt'] = Math.round(this.wait);
                    obj['ld'] = Math.round(this.load);
                    obj['de'] = this.domInteractive;
                    obj['dl'] = this.domLoaded;
                    obj['dc'] = this.docComplete;
                    obj['rp'] = this.response;
                    obj['cl'] = this.contentLoad;
                    obj['rd'] = this.redirect;
                    obj['rc'] = this.redirectCount || 0;
                    obj['cls'] = this.cls;
                    obj['lcp'] = this.lcp;
                    obj['inp'] = this.inp;
                    if (this.secureConnect) {
                        obj['sc'] = this.secureConnect;
                    }
                    if (this.exitToEntry) {
                        obj['xe'] = this.exitToEntry;
                    }
                    if (this.entryToOnLoad) {
                        obj['el'] = this.entryToOnLoad;
                    }
                    if (this.prerender) {
                        obj['pr'] = this.prerender;
                    }
                }
            }
            if (type === PostType.OnBeforeUnload) {
                obj['maf'] = this.markAboveTheFold;
                obj['mfl'] = this.markFullyLoaded;
                obj['mfv'] = this.markFullyVisible;
                obj['mtu'] = this.markTimeToUserAction;
                obj['tp'] = this.timeOnPage;
                obj['tti'] = this.timeToInteract;
                obj['et'] = this.engagementTime;
                obj['fet'] = this.firstEngagementTime;
                obj['fid'] = this.firstInputDelay;
                obj['vct'] = this.visComplete;
                obj['fid'] = this.firstInputDelay;
                if (!isSoftNavigation) {
                    obj['fp'] = this.firstPaint;
                    obj['fcp'] = this.firstContentPaint;
                    obj['cls'] = this.cls;
                    obj['lcp'] = this.lcp;
                    obj['inp'] = this.inp;
                }
            }
            return obj;
        };
        PostData.prototype.translateErrorForPost = function (error) {
            var obj = {};
            obj['m'] = error.message;
            obj['n'] = error.lineNumber;
            obj['c'] = error.count + 1; // starts at 0
            var url = error.url;
            if (url) {
                var qStrIndex = url.indexOf('?');
                if (qStrIndex != -1) {
                    url = url.substr(0, qStrIndex);
                }
            }
            obj['u'] = url;
            return obj;
        };
        PostData.prototype.translateResources = function (resources, ajaxResources) {
            var _this = this;
            var hasResources = !!resources;
            var hasAjaxResources = !!ajaxResources;
            if (!hasResources && !hasAjaxResources) {
                return null;
            }
            var getAjaxTiming = function (resource) {
                if (!hasResources || !hasAjaxResources) {
                    return null;
                }
                var filteredAjaxResources = _this.filterAjaxResources(ajaxResources);
                for (var _i = 0, filteredAjaxResources_1 = filteredAjaxResources; _i < filteredAjaxResources_1.length; _i++) {
                    var a = filteredAjaxResources_1[_i];
                    var url = a.url;
                    var targetUrl = '';
                    if (url && url.indexOf('http') != 0) {
                        var charCount = 0;
                        var mainUrl = location.href;
                        for (var i_1 = 0; i_1 < mainUrl.length; i_1++) {
                            if (mainUrl[i_1] === '/') {
                                charCount += 1;
                            }
                            if (charCount === 3) {
                                targetUrl = mainUrl.slice(0, i_1);
                                targetUrl = targetUrl + url;
                                break;
                            }
                        }
                        if (targetUrl === resource.name) {
                            return a;
                        }
                    }
                    if (url === resource.name) {
                        return a;
                    }
                }
                return null;
            };
            var hostObj = {};
            if (resources) {
                for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
                    var res = resources_1[_i];
                    if (!res) {
                        continue;
                    }
                    var host = res.name.split('/').slice(1, 3).join('');
                    if (!host || host.length == 0) {
                        continue;
                    }
                    var portIndex = host.indexOf(':');
                    if (portIndex != -1) {
                        host = host.substr(0, portIndex);
                    }
                    if (!hostObj.hasOwnProperty(host)) {
                        hostObj[host] = {
                            summary: new HostSummary(),
                            waterfall: new HostWaterfall()
                        };
                    }
                    var h = hostObj[host];
                    var ajax = getAjaxTiming(res);
                    if (ajax) {
                        h.summary.addAjaxItem(ajax, res);
                        h.waterfall.addAjaxItem(ajax, res);
                    }
                    else {
                        h.summary.update(res);
                        h.waterfall.addItem(res);
                    }
                }
            }
            var tree1 = new Tree();
            for (var name in hostObj) {
                var node = undefined;
                for (var i = name.length - 1; i >= 0; i--) {
                    var char = name[i];
                    node = tree1.add(node, char);
                }
                node.data = hostObj[name].summary.translateForPost();
            }
            var tree2 = new Tree();
            for (var name in hostObj) {
                var node = undefined;
                for (var i = name.length - 1; i >= 0; i--) {
                    var char = name[i];
                    node = tree2.add(node, char);
                }
                node.data = hostObj[name].waterfall.translateForPost();
            }
            var container = {
                summary: tree1.toObject(),
                waterfall: tree2.toObject()
            };
            return container;
        };
        PostData.prototype.filterAjaxResources = function (ajaxResources) {
            if (config.ajaxDomains === '' || config.ajaxDomains === undefined) {
                return ajaxResources;
            }
            // Returns the host with subdomain from the url
            var getHostNameWithSubdomain = function (url) {
                var regex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/;
                var output = regex.exec(url);
                if (output !== null) {
                    return output[1];
                }
            };
            // Returns the host without subdomain from the url
            var getHostNameWithoutSubdomain = function (url) {
                var regex = /([a-z\-0-9]{2,63})\.([a-z\.]{2,5})$/;
                var urlParts = regex.exec(url);
                return urlParts && urlParts[0];
            };
            // Returns the url with protocal
            var getFullUrl = function (url) {
                var regex = /(http|https)?:\/\/(\S+)/g;
                var hasSchema = regex.test(url);
                return hasSchema ? url : "https://".concat(url);
            };
            var filterAjaxDomainsList = config.ajaxDomains.split(',');
            var filteredAjaxResources = ajaxResources.filter(function (resource) {
                var resourceWithSubdomain = getHostNameWithSubdomain(resource.url);
                var resourceUrl = getFullUrl(resource.url);
                var resourceHostName = new URL(resourceUrl).host;
                var resourceWithoutSubdomain = getHostNameWithoutSubdomain(resourceHostName);
                var result = filterAjaxDomainsList.some(function (domain) {
                    var domainUrl = getFullUrl(domain);
                    var filterHostName = new URL(domainUrl).host;
                    var filterDomainWithSubdomain = filterHostName.replace('www.', '');
                    var filterDomainWithoutSubdomain = getHostNameWithoutSubdomain(filterHostName);
                    var hasFilterSubdomain = filterDomainWithSubdomain !== filterDomainWithoutSubdomain;
                    if (hasFilterSubdomain) {
                        return filterDomainWithSubdomain === resourceWithSubdomain;
                    }
                    else {
                        return resourceWithoutSubdomain === filterDomainWithoutSubdomain;
                    }
                });
                return result;
            });
            return filteredAjaxResources;
        };
        return PostData;
    }(main_DataWrapper));
    var DataProvider = /** @class */ (function () {
        function DataProvider() {
            var _this = this;
            this.visitor = new Visitor();
            this.postUrl = config.postUrl;
            this.didSendInitial = false;
            this.isDebugging = false;
            this.countResourcesSent = 0;
            this.didSoftNavigation = false;
            this.currentUrl = '';
            this.softNavigationStart = 0;
            // limit to protect us from processing very large numbers of performance marks that the client
            // may have added to their page.
            this.MaxNumberOfPerformanceMarks = 1000;
            this.updatePerformanceMetrics = function (postObj) {
                var timing = Util.getNavigationTime();
                if (!timing) {
                    return;
                }
                var navigationtiming = timing;
                var navStart = Util.getNavigationStart(timing);
                var domLoading = navigationtiming.loadEventEnd;
                var allowOrigin = timing.responseStart;
                postObj.dns = allowOrigin ? timing.domainLookupEnd - timing.domainLookupStart : null;
                postObj.fullConnect = allowOrigin ? timing.connectEnd - timing.connectStart : null;
                postObj.wait = allowOrigin ? timing.responseStart - timing.requestStart : null;
                postObj.load = allowOrigin ? timing.responseEnd - timing.responseStart : null;
                postObj.domInteractive = Util.getMetricValue(timing.domInteractive, navStart);
                postObj.domLoaded = Util.getMetricValue(timing.domContentLoadedEventStart, navStart);
                postObj.docComplete = Util.getMetricValue(timing.domComplete, navStart);
                postObj.response = Util.getMetricValue(timing.responseEnd, navStart);
                postObj.contentLoad = Util.getMetricValue(timing.loadEventStart, domLoading);
                postObj.redirect = timing.redirectEnd - timing.redirectStart;
                if (timing['secureConnectionStart']) {
                    postObj.secureConnect = timing.connectEnd - timing['secureConnectionStart'];
                }
            };
            this.updateResources = function (ev, postObj) {
                if (hasPerformanceApi) {
                    var arr = [];
                    if (hasGetEntriesApi) {
                        arr = pageWindow.performance.getEntriesByType('resource');
                    }
                    if (ev != PostType.OnLoad) {
                        _this.setClearResources();
                        if (config.clearResources && pageWindow.performance.clearResourceTimings) {
                            postObj.resources = arr;
                            pageWindow.performance.clearResourceTimings();
                        }
                        else {
                            postObj.resources = arr.slice(_this.countResourcesSent);
                            _this.countResourcesSent = arr.length;
                        }
                    }
                }
            };
            this.getTimeOnPage = function (isSoftNavigation) {
                var focusAwayTime = _this.getFocusAwayTime();
                var navigationStart = _this.getNavigationStart(isSoftNavigation);
                var timeOnPage = now() - navigationStart - focusAwayTime;
                return timeOnPage;
            };
            this.getVisuallyComplete = function (isSoftNavigation) {
                if (pageWindow['CPVisuallyComplete']) {
                    var val = pageWindow['CPVisuallyComplete'].getValue(isSoftNavigation);
                    if (typeof val == 'number' && val >= 0) {
                        return val;
                    }
                }
            };
            this.updateEngagementMetrics = function (postObj, isSoftNavigation) {
                if (hasGetEntriesApi) {
                    var paintTimings = pageWindow.performance.getEntriesByType('paint');
                    if (paintTimings && paintTimings.length > 0) {
                        postObj.firstPaint = _this.getPaintTimings(paintTimings, 'first-paint');
                        postObj.firstContentPaint = _this.getPaintTimings(paintTimings, 'first-contentful-paint');
                    }
                }
                var timing = Util.getNavigationTime();
                if (timing) {
                    var navStart = Util.getNavigationStart(timing);
                    var contentLoadEnd = Util.getMetricValue(timing.domContentLoadedEventEnd, navStart);
                    var timeToInteract = performanceObserver.getLongTaskTime();
                    if (isSoftNavigation) {
                        // For soft navigation when there are no long tasks captured, post visually complate as TTI.
                        postObj.timeToInteract = timeToInteract || _this.getVisuallyComplete(isSoftNavigation);
                    }
                    else {
                        postObj.timeToInteract =
                            contentLoadEnd && contentLoadEnd < timeToInteract ? timeToInteract : contentLoadEnd;
                    }
                }
                if (profiler.getEventTimingHandler) {
                    postObj.engagementTime = profiler.getEventTimingHandler().getEngagementTime();
                    postObj.timeOnPage = _this.getTimeOnPage(isSoftNavigation);
                    postObj.firstEngagementTime = _this.getFirstEngagementTime(isSoftNavigation);
                }
                if (profiler.getInputDelay) {
                    postObj.firstInputDelay = profiler.getInputDelay().getFirstInputDelay();
                }
            };
            this.getFirstEngagementTime = function (isSoftNavigation) {
                var navigationStart = _this.getNavigationStart(isSoftNavigation);
                var engagementStartTime = profiler.getEventTimingHandler().getFirstEngagementTime();
                if (engagementStartTime && navigationStart) {
                    var firstEngagementTime = engagementStartTime - navigationStart;
                    return firstEngagementTime;
                }
                return 0;
            };
            this.getNavigationStart = function (isSoftNavigation) {
                var navigationStart = profiler.getEventTimingHandler &&
                    typeof profiler.getEventTimingHandler === 'function' &&
                    profiler.getEventTimingHandler().getStartTime &&
                    typeof profiler.getEventTimingHandler().getStartTime === 'function'
                    ? profiler.getEventTimingHandler().getStartTime()
                    : 0;
                return isSoftNavigation ? _this.softNavigationStart : navigationStart;
            };
            this.getElapsedTimeSinceLatestNavStart = function () {
                var navStart = profiler.data.start;
                if (_this.didSoftNavigation && navStart) {
                    return _this.softNavigationStart - navStart;
                }
                else {
                    return 0;
                }
            };
            this.getFocusAwayTime = function () {
                return profiler.getEventTimingHandler().getFocusAwayTime() || 0;
            };
            this.updateDebugData = function () {
                var postObj = _this.createInitPostObject(PostType.OnBeforeUnload, false);
                var sendWaterfall = _this.visitor.store.sendWaterfall || !!Util.getQueryStringValue(config.waterfallParameter);
                var dataStr = postObj.toString(PostType.OnLoad, sendWaterfall);
                profiler['debugData'] = postObj;
                profiler['unloadDebugData'] = dataStr;
            };
            this.onPageLoad = function () {
                if (_this.isDebugging) {
                    profiler['debugData'] = _this.createInitPostObject(PostType.OnLoad, false);
                    profiler['updateDebugData'] = _this.updateDebugData;
                    profiler['sendData'] = function () {
                        _this.doPost(PostType.OnBeforeUnload, false);
                    };
                    Util.stopEvents();
                    Util.addScriptTag(config.debugUrl, pageWindow);
                    return;
                }
                _this.visitor.updateSessionTime();
                _this.doPost(PostType.OnLoad, false);
            };
            this.captureSoftNavigations = function () {
                profiler.eventManager.add('hashchange', pageWindow, _this.onSoftNavigation);
                var history = pageWindow.history;
                if (!history) {
                    return;
                }
                var functionStr = 'function';
                if (typeof history.go === functionStr) {
                    var origGo_1 = history.go;
                    history.go = function (delta) {
                        _this.onSoftNavigation();
                        origGo_1.call(history, delta);
                    };
                }
                if (typeof history.back === functionStr) {
                    var origBack_1 = history.back;
                    history.back = function () {
                        _this.onSoftNavigation();
                        origBack_1.call(history);
                    };
                }
                if (typeof history.forward === functionStr) {
                    var origForward_1 = history.forward;
                    history.forward = function () {
                        _this.onSoftNavigation();
                        origForward_1.call(history);
                    };
                }
                if (typeof history.pushState === functionStr) {
                    var origPush_1 = history.pushState;
                    history.pushState = function (data, title, url) {
                        _this.onSoftNavigation();
                        origPush_1.call(history, data, title, url);
                    };
                }
                if (typeof history.replaceState === functionStr) {
                    var origReplace_1 = history.replaceState;
                    history.replaceState = function (data, title, url) {
                        _this.onSoftNavigation();
                        origReplace_1.call(history, data, title, url);
                    };
                }
            };
            // @ts-ignore
            this.onViewVisuallyComplete = function (val) {
                if (_this.didSoftNavigation) {
                    _this.doPost(PostType.OnLoad, true);
                }
            };
            this.onSoftNavigation = function () {
                // do not consider softnavigation when load is not fired yet .....
                if (!profiler.data.loadFired) {
                    return;
                }
                var vc;
                if (performanceObserver) {
                    performanceObserver = new PerformanceObserver(true);
                }
                if (pageWindow['CPVisuallyComplete']) {
                    vc = pageWindow['CPVisuallyComplete'];
                    vc.onComplete(_this.onViewVisuallyComplete);
                }
                _this.doPost(PostType.OnBeforeUnload, _this.didSoftNavigation);
                _this.visitor.store.viewCount++;
                if (!!vc) {
                    pageWindow.setTimeout(function () {
                        vc.reset();
                    }, 0);
                }
                //Capture navigation start for each soft navigation
                pageWindow.setTimeout(function () {
                    _this.softNavigationStart = now();
                    if (profiler.getEventTimingHandler) {
                        var handler = profiler.getEventTimingHandler();
                        var inputHandler = profiler.getInputDelay();
                        handler.startSoftNavigationCapture();
                        inputHandler.startSoftNavigationCapture();
                        handler.resetSoftNavigationCapture();
                    }
                }, 0);
                _this.didSoftNavigation = true;
            };
            this.doPost = function (type, isSoftNavigation) {
                if (!_this.visitor.shouldPost()) {
                    return;
                }
                if (type == PostType.OnBeforeUnload && !profiler.data.loadFired) {
                    type = PostType.OnAbort;
                }
                var postObj;
                if (_this.didSendInitial) {
                    postObj = _this.createDiffPostObject(type, isSoftNavigation);
                }
                else {
                    postObj = _this.createInitPostObject(type, isSoftNavigation);
                    _this.didSendInitial = true;
                }
                var canSendWaterfall = _this.visitor.store.sendWaterfall || !!Util.getQueryStringValue(config.waterfallParameter);
                var isWaterfallPost = type == PostType.OnBeforeUnload || type == PostType.OnAbort;
                var sendWaterfall = canSendWaterfall && isWaterfallPost;
                _this.makeRequest(type, postObj, sendWaterfall);
            };
            if (!profiler || !profiler.data) {
                return;
            }
            var didInitVisitor = this.visitor.init();
            this.isDebugging = !!Util.getQueryStringValue(config.debugParameter);
            if (!this.isDebugging && !didInitVisitor) {
                Util.stopEvents();
                return;
            }
            this.captureSoftNavigations();
            // page load event capture
            var didLoadPost = false;
            var loadPost = function () {
                if (didLoadPost) {
                    return;
                }
                profiler.data.loadFired = true;
                didLoadPost = true;
                _this.onPageLoad();
            };
            if (!profiler.data.loadFired && !!pageWindow.document) {
                profiler.data.loadFired = pageWindow.document.readyState === 'complete';
            }
            if (profiler.data.loadFired) {
                loadPost();
            }
            else {
                profiler.eventManager.add(windowEventDef.Load, parent.window, loadPost);
            }
            // need on both "beforeunload" and "unload" for cross-browser compatibility
            var didUnloadPost = false;
            var unloadPost = function () {
                if (didUnloadPost) {
                    return;
                }
                didUnloadPost = true;
                _this.doPost(PostType.OnBeforeUnload, false);
            };
            profiler.eventManager.add(windowEventDef.BeforeUnload, pageWindow, unloadPost);
            profiler.eventManager.add(windowEventDef.Unload, pageWindow, unloadPost);
        }
        DataProvider.prototype.createInitPostObject = function (ev, isSoftNavigation) {
            var postObj = this.createBasePostObj(ev, true, isSoftNavigation);
            this.updatePerformanceMetrics(postObj);
            var info = this.visitor.store;
            if (info.exitToEntry > 0) {
                postObj.exitToEntry = info.exitToEntry;
            }
            var entryToLoad = profiler.data.loadTime - profiler.data.start;
            if (entryToLoad > 0) {
                postObj.entryToOnLoad = entryToLoad;
            }
            if (document['webkitVisibilityState'] === 'prerender') {
                postObj.prerender = 1;
            }
            if (hasPerformanceApi) {
                var arr = void 0;
                if (hasGetEntriesApi) {
                    // This is less than optimal but that's down to the API we're working with:
                    // https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType .
                    // We have to tell the TS compiler that we "know" the returned objects are in
                    // fact PerformanceResourceTiming's.
                    arr = pageWindow.performance.getEntriesByType('resource');
                    postObj.resources = arr;
                }
                if (ev != PostType.OnLoad) {
                    this.setClearResources();
                    if (config.clearResources && pageWindow.performance.clearResourceTimings) {
                        pageWindow.performance.clearResourceTimings();
                    }
                    else {
                        this.countResourcesSent = arr.length;
                    }
                }
            }
            return postObj;
        };
        DataProvider.prototype.createDiffPostObject = function (ev, isSoftNavigation) {
            var postObj = this.createBasePostObj(ev, false, isSoftNavigation);
            this.updateResources(ev, postObj);
            this.updateEngagementMetrics(postObj, isSoftNavigation);
            this.addPerformanceMarksToPostData(pageWindow.performance, postObj);
            var visComplete = this.getVisuallyComplete(isSoftNavigation);
            if (visComplete) {
                postObj.visComplete = visComplete;
            }
            if (profiler && profiler.getCPWebVitals) {
                var cpWebVitals = profiler.getCPWebVitals();
                if (cpWebVitals.cls) {
                    postObj.cls = cpWebVitals.cls;
                }
                if (cpWebVitals.lcp) {
                    postObj.lcp = cpWebVitals.lcp;
                }
                if (cpWebVitals.inp) {
                    postObj.inp = cpWebVitals.inp;
                }
            }
            if (profiler.data.jsCount > 0) {
                postObj.jsErrorCount = profiler.data.jsCount;
                postObj.jsErrors = profiler.data.jsErrors;
                profiler.clearErrors();
            }
            if (profiler && profiler.getAjaxRequests) {
                var ajaxRequests = profiler.getAjaxRequests();
                if (ajaxRequests) {
                    postObj.ajaxRequests = ajaxRequests.slice();
                    profiler.clearAjaxRequests();
                }
            }
            return postObj;
        };
        DataProvider.prototype.createBasePostObj = function (ev, isNewPageView, isSoftNavigation) {
            var postObj = new PostData();
            postObj.postType = ev;
            postObj.isNewPageView = isNewPageView;
            postObj.siteId = config.siteId;
            // We need to decode first because if the url is already encoded, it is getting double encoded
            // Eg: if url is google.com/test%20me then encodeURI is converting to google.com/test%2520me
            postObj.referrer = encodeURI(decodeURI(pageWindow.location.href));
            postObj.sampleRate = config.sampleRate;
            postObj.waterfallSampleRate = config.waterfallSampleRate;
            var info = this.visitor.store;
            postObj.userId = info.userId;
            postObj.sessionId = info.sessionId;
            postObj.pageViewId = info.pageViewId;
            postObj.pageViewCount = info.pageViewCount;
            postObj.viewCount = info.viewCount;
            postObj.screenHeight = screen.height;
            postObj.screenWidth = screen.width;
            this.currentUrl = postObj.referrer;
            if (ev === PostType.OnBeforeUnload || ev === PostType.OnAbort) {
                postObj.referrer = this.currentUrl || encodeURI(decodeURI(pageWindow.location.href));
            }
            else {
                postObj.referrer = encodeURI(decodeURI(pageWindow.location.href));
            }
            if (isSoftNavigation) {
                postObj.isNewView = ev == PostType.OnLoad;
            }
            if (profiler.hasInsight) {
                this.addInsightForPost(postObj);
                profiler.clearInfo();
            }
            return postObj;
        };
        /**
         * Iterate (if any) the "mark"'s (see https://www.w3.org/TR/user-timing/#extensions-performance-interface)
         * that have been added to the page's Performance object. For each one, check if its one of the four standard
         * ones that we capture. If it is, add it to the matching property in PostData. If there has been a soft
         * navigation only capture marks that were set after it occurred.
         * @param performance the w3.org Performance API object.
         * @param postObj the DTO Post object we use to populate our POST to the Logger.
         * @param isSoftNavigation true if this method is being invoked as part of a soft nav, false otherwise.
         */
        DataProvider.prototype.addPerformanceMarksToPostData = function (performance, postObj) {
            if (hasPerformanceApi && performance.getEntriesByType) {
                var marks = performance.getEntriesByType('mark');
                if (marks && marks.length > 0 && marks.length < this.MaxNumberOfPerformanceMarks) {
                    var elapsedNavStartTime_1 = this.getElapsedTimeSinceLatestNavStart();
                    var validMarks = marks.filter(function (x) {
                        return x.startTime != null && x.startTime >= elapsedNavStartTime_1;
                    });
                    for (var _i = 0, validMarks_1 = validMarks; _i < validMarks_1.length; _i++) {
                        var mark = validMarks_1[_i];
                        this.addMarkToPostData(mark, postObj);
                    }
                }
            }
        };
        /**
         * Given a performance mark (see https://www.w3.org/TR/user-timing/#extensions-performance-interface),
         * see if it's a standard one that we're interested in. If it is, set the matching PostData property.
         * @param mark the performance mark set on the clients' page that we're interrogating
         * @param postObj the DTO object into which we put the mark value
         */
        DataProvider.prototype.addMarkToPostData = function (mark, postObj) {
            var markTime = Util.getRoundedValue(mark.startTime + mark.duration);
            switch (mark.name) {
                case 'mark_fully_loaded':
                    postObj.markFullyLoaded = markTime;
                    break;
                case 'mark_fully_visible':
                    postObj.markFullyVisible = markTime;
                    break;
                case 'mark_above_the_fold':
                    postObj.markAboveTheFold = markTime;
                    break;
                case 'mark_time_to_user_action':
                    postObj.markTimeToUserAction = markTime;
                    break;
                default:
                    break; // arriving here means it's a nonstandard mark that we don't care about
            }
        };
        // @ts-ignore
        DataProvider.prototype.getPaintTimings = function (paintTimings, type) {
            var paintType = paintTimings.filter(function (x) { return x.name === type; });
            if (paintType && paintType.length > 0 && paintType[0].startTime) {
                return paintType[0].startTime;
            }
        };
        DataProvider.prototype.setClearResources = function () {
            if (!!pageWindow['__cpPreventResourceClear']) {
                config.clearResources = pageWindow['__cpPreventResourceClear'] === false;
            }
        };
        DataProvider.prototype.addInsightForPost = function (postObj) {
            var insight = profiler.info;
            for (var name_1 in insight) {
                switch (name_1) {
                    case 'appError':
                        var n = insight[name_1];
                        if (n && typeof n == 'object') {
                            var num;
                            for (var key in n) {
                                num = Number(key);
                                if (isNaN(num)) {
                                    continue;
                                }
                                var tmp = n[key];
                                if (tmp && typeof tmp == 'string') {
                                    var str = tmp;
                                    if (str.length > 32) {
                                        str = str.substring(0, 32);
                                    }
                                    postObj.addError(key, str);
                                }
                            }
                        }
                        break;
                    case 'conversion':
                        var n = insight[name_1];
                        postObj.isConversion = true;
                        if (n) {
                            if (typeof n == 'object') {
                                var num;
                                for (var key in n) {
                                    num = Number(key);
                                    if (isNaN(num)) {
                                        continue;
                                    }
                                    var tmp = n[key];
                                    if (tmp && typeof tmp == 'number') {
                                        postObj.revenue = num;
                                        postObj.revenueItems = tmp;
                                    }
                                }
                            }
                        }
                        break;
                    case 'indicator':
                        var ind = this.buildInsight(insight[name_1], 0);
                        if (ind[0]) {
                            postObj.addIndicator(ind[1]);
                        }
                        break;
                    case 'tracepoint':
                        var tra = this.buildInsight(insight[name_1], '');
                        if (tra[0]) {
                            postObj.addTracepoint(tra[1]);
                        }
                        break;
                    case 'pageGroup':
                        var n = insight[name_1];
                        if (n !== undefined && typeof n == 'string') {
                            postObj.pageGroup = n;
                        }
                        break;
                    case 'variation':
                        var n = insight[name_1];
                        if (n !== undefined && typeof n == 'string') {
                            postObj.variation = n;
                        }
                        break;
                }
            }
        };
        DataProvider.prototype.buildInsight = function (insight, expected) {
            var obj = {};
            var ret = false;
            if (insight && typeof insight == 'object') {
                for (var key in insight) {
                    if (key) {
                        var n = insight[key];
                        if (n != null && typeof n == typeof expected) {
                            obj[key] = n;
                            ret = true;
                        }
                    }
                }
            }
            if (!ret) {
                return [ret, obj];
            }
            return [ret, obj];
        };
        DataProvider.prototype.makeRequest = function (type, postObj, sendWaterfall) {
            var dataStr = postObj.toString(type, sendWaterfall);
            if (pageWindow.navigator && typeof pageWindow.navigator['sendBeacon'] == 'function') {
                pageWindow.navigator['sendBeacon'](this.postUrl, dataStr);
            }
            else {
                var request = new XMLHttpRequest();
                if (window.XDomainRequest) {
                    request = new window.XDomainRequest();
                    //Set all the fields so that the request can be made succesfully
                    request.timeout = 0;
                    request.onload = function () { };
                    request.onerror = function () { };
                    request.ontimeout = function () { };
                    request.onprogress = function () { };
                }
                request.open('POST', this.postUrl, false);
                request.setRequestHeader
                    ? request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
                    : null;
                request.send(dataStr);
                request = null;
            }
        };
        return DataProvider;
    }());
    // @ts-ignore
    var provider = new DataProvider();
})();

/******/ })()
;
