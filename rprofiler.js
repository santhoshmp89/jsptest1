/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/rprofiler/AjaxRequestsHandler.ts":
/*!**********************************************!*\
  !*** ./src/rprofiler/AjaxRequestsHandler.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var AjaxTiming_1 = __importDefault(__webpack_require__(/*! ./AjaxTiming */ "./src/rprofiler/AjaxTiming.ts"));
var AjaxRequestsHandler = /** @class */ (function () {
    function AjaxRequestsHandler() {
        var _this = this;
        this.fetchRequests = [];
        this.fetchEntriesIndices = {};
        this.compareEntriesDelay = 100;
        this.hasPerformance = typeof window.performance === "object" && typeof window.performance.now === "function" && typeof window.performance.getEntriesByType === "function";
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
                        }
                        else {
                            return [];
                        }
                        var method = 'GET';
                        if (config.method) {
                            method = config.method;
                        }
                        fetchRequestIndex = tempArray.length;
                        var fetchUrl = '';
                        //The first argument can be either a url or Request object
                        if (typeof (firstArg) === 'object' && !!firstArg) {
                            if (Array.isArray(firstArg) && firstArg.length > 0) {
                                fetchUrl = firstArg[0];
                            }
                            else {
                                fetchUrl = firstArg.url;
                            }
                        }
                        else {
                            fetchUrl = firstArg;
                        }
                        if (fetchUrl) {
                            tempArray.push(new AjaxTiming_1.default(fetchUrl, method, true, ajaxHandler.now()));
                        }
                        return [firstArg, config];
                    }, onRequestError);
                    // @ts-ignore
                    promise = promise.then(function (args) { return fetch.apply(void 0, args); });
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
        return (new Date()).getTime();
    };
    AjaxRequestsHandler.prototype.processPerformanceEntries = function (fetchRequest, requestArray) {
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
        if (ajaxHandler.hasPerformance && typeof window.performance.setResourceTimingBufferSize === "function") {
            window.performance.setResourceTimingBufferSize(300);
        }
        // @ts-ignore
        xhr.open = function (method, url, async, user, password) {
            this.rpIndex = tempArray.length;
            tempArray.push(new AjaxTiming_1.default(url, method, async, ajaxHandler.now()));
            open.call(this, method, url, (async === false) ? false : true, user, password);
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
                var hasResponse = !!(_this.response && _this.response !== null && _this.response !== undefined);
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
                                if (hasResponse && typeof _this.response.toString === "function") {
                                    request.responseSize = _this.response.toString().length;
                                }
                                break;
                            case "arraybuffer":
                                if (hasResponse && typeof _this.response.byteLength === "number") {
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
                        ajaxHandler.processPerformanceEntries(request, ajaxHandler.fetchRequests);
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
}());
exports["default"] = AjaxRequestsHandler;


/***/ }),

/***/ "./src/rprofiler/AjaxTiming.ts":
/*!*************************************!*\
  !*** ./src/rprofiler/AjaxTiming.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
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
}());
exports["default"] = AjaxTiming;


/***/ }),

/***/ "./src/rprofiler/EventsTimingHandler.ts":
/*!**********************************************!*\
  !*** ./src/rprofiler/EventsTimingHandler.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
var ProfilerEventManager_1 = __importDefault(__webpack_require__(/*! ./ProfilerEventManager */ "./src/rprofiler/ProfilerEventManager.ts"));
var EventsTimingHandler = /** @class */ (function () {
    function EventsTimingHandler() {
        var _this = this;
        //Capture window Focus (Used for Page On Time)
        this.hiddenStrings = ['hidden', 'msHidden', 'webkitHidden', 'mozHidden'];
        this.visibilityStrings = [
            'visibilitychange',
            'msvisibilitychange',
            'webkitvisibilitychange',
            'mozvisibilitychange'
        ];
        // @ts-ignore
        this.captureSoftNavigation = false;
        this.hidden = 'hidden';
        this.visibilityChange = 'visibilitychange';
        this.visibilityEvents = [];
        // Capture scroll, focus, resize, mouse and keyEvents
        this.eventManager = new ProfilerEventManager_1.default();
        this.engagementTimeIntervalMs = 1000;
        this.engagementTime = 0;
        this.firstEngagementTime = 0;
        this.lastEventTimeStamp = 0;
        this.timeoutId = undefined;
        this.startTime = new Date().getTime();
        this.now = function () {
            return (new Date()).getTime();
        };
        // @ts-ignore
        this.startVisibilityCapture = function () {
            _this.initializeVisibilityProperties();
            document.addEventListener(_this.visibilityChange, _this.captureFocusEvent, false);
        };
        this.initializeVisibilityProperties = function () {
            var values = _this.hiddenStrings;
            var propertyIndex = 0;
            for (var i = 0; i < values.length; i++) {
                if (typeof (document[values[i]]) !== 'undefined') {
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
                _this.captureVisibilityEvent(types_1.VisibilityType.Blur);
            }
            else {
                _this.captureVisibilityEvent(types_1.VisibilityType.Focus);
            }
        };
        this.onBlur = function () {
            _this.captureVisibilityEvent(types_1.VisibilityType.Blur);
        };
        this.onFocus = function () {
            _this.captureVisibilityEvent(types_1.VisibilityType.Focus);
        };
        this.captureVisibilityEvent = function (type) {
            _this.visibilityEvents.push({
                type: type,
                time: _this.now()
            });
        };
        this.captureEngagementTime = function (isFirstEngagement) {
            if (isFirstEngagement === void 0) { isFirstEngagement = true; }
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
            if (timeBetweenEvents > 0 && timeBetweenEvents < _this.engagementTimeIntervalMs) {
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
                if (events[index].type === types_1.VisibilityType.Blur &&
                    currentBlurIndex === resetIndex) {
                    currentBlurIndex = index;
                }
                var isNewFocusEvent = currentFocusIndex === resetIndex && currentBlurIndex !== resetIndex;
                if (events[index].type === types_1.VisibilityType.Focus && isNewFocusEvent) {
                    currentFocusIndex = index;
                }
                var validFocusChange = currentBlurIndex !== resetIndex && currentFocusIndex !== resetIndex;
                if (validFocusChange) {
                    var diff = events[currentFocusIndex].time - events[currentBlurIndex].time;
                    if (diff > 0) {
                        hiddenTimeLapsed += diff;
                    }
                    currentBlurIndex = resetIndex;
                    currentFocusIndex = resetIndex;
                }
                index = index + 1;
            }
            if (currentBlurIndex === (events.length - 1)) {
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
        this.eventManager.add('scroll', document, this.captureEngagementTime);
        this.eventManager.add('resize', window, this.captureEngagementTime);
        this.eventManager.add('mouseup', document, this.captureEngagementTime);
        this.eventManager.add('keyup', document, this.captureEngagementTime);
        this.eventManager.add('mousemove', document, this.captureMouseMove);
        this.eventManager.add('focus', window, this.onFocus);
        this.eventManager.add('blur', window, this.onBlur);
        this.eventManager.add('focus', document, this.onFocus);
        this.eventManager.add('blur', document, this.onBlur);
    }
    return EventsTimingHandler;
}());
exports["default"] = EventsTimingHandler;


/***/ }),

/***/ "./src/rprofiler/InputDelayHandler.ts":
/*!********************************************!*\
  !*** ./src/rprofiler/InputDelayHandler.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var ProfilerEventManager_1 = __importDefault(__webpack_require__(/*! ./ProfilerEventManager */ "./src/rprofiler/ProfilerEventManager.ts"));
var InputDelayHandler = /** @class */ (function () {
    function InputDelayHandler() {
        var _this = this;
        this.firstInputDelay = 0;
        this.firstInputTimeStamp = 0;
        this.startTime = 0;
        this.delay = 0;
        this.profileManager = new ProfilerEventManager_1.default();
        this.eventTypes = [
            'click',
            'mousedown',
            'keydown',
            'touchstart',
            'pointerdown',
        ];
        this.addEventListeners = function () {
            _this.eventTypes.forEach(function (event) {
                _this.profileManager.add(event, document, _this.onInput);
            });
        };
        this.now = function () {
            return (new Date()).getTime();
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
            var useFirstInputTime = isEpochTime || !window['performance'];
            var now = useFirstInputTime ? _this.firstInputTimeStamp : window['performance'].now();
            _this.delay = now - evt.timeStamp;
            if (evt.type == 'pointerdown') {
                _this.onPointerDown();
            }
            else {
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
            _this.profileManager.remove('pointerup', document, _this.onPointerUp);
            _this.profileManager.remove('pointercancel', document, _this.onPointerCancel);
        };
        this.updateFirstInputDelay = function () {
            if (_this.delay >= 0 && _this.delay < (_this.firstInputTimeStamp - _this.startTime)) {
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
        this.profileManager.add('pointerup', document, this.onPointerUp);
        this.profileManager.add('pointercancel', document, this.onPointerCancel);
    };
    InputDelayHandler.prototype.getFirstInputDelay = function () {
        return this.firstInputDelay;
    };
    return InputDelayHandler;
}());
exports["default"] = InputDelayHandler;


/***/ }),

/***/ "./src/rprofiler/ProfilerEventManager.ts":
/*!***********************************************!*\
  !*** ./src/rprofiler/ProfilerEventManager.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var ProfilerEventManager = /** @class */ (function () {
    function ProfilerEventManager() {
        this.events = [];
        this.hasAttachEvent = !!window['attachEvent'];
    }
    ProfilerEventManager.prototype.add = function (type, target, func) {
        this.events.push({ type: type, target: target, func: func });
        if (this.hasAttachEvent) {
            target.attachEvent("on" + type, func);
        }
        else {
            target.addEventListener(type, func, false);
        }
    };
    ProfilerEventManager.prototype.remove = function (type, target, func) {
        if (this.hasAttachEvent) {
            target.detachEvent(type, func);
        }
        else {
            target.removeEventListener(type, func, false);
        }
        var index = this.events.indexOf({ type: type, target: target, func: func });
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
}());
exports["default"] = ProfilerEventManager;


/***/ }),

/***/ "./src/rprofiler/ProfilerJsError.ts":
/*!******************************************!*\
  !*** ./src/rprofiler/ProfilerJsError.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
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
        return ProfilerJsError.createText(this.message, this.url, this.lineNumber);
    };
    return ProfilerJsError;
}());
exports["default"] = ProfilerJsError;


/***/ }),

/***/ "./src/rprofiler/rprofiler.ts":
/*!************************************!*\
  !*** ./src/rprofiler/rprofiler.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var web_vitals_1 = __webpack_require__(/*! web-vitals */ "./node_modules/web-vitals/dist/web-vitals.umd.cjs");
var types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
var AjaxRequestsHandler_1 = __importDefault(__webpack_require__(/*! ./AjaxRequestsHandler */ "./src/rprofiler/AjaxRequestsHandler.ts"));
var EventsTimingHandler_1 = __importDefault(__webpack_require__(/*! ./EventsTimingHandler */ "./src/rprofiler/EventsTimingHandler.ts"));
var InputDelayHandler_1 = __importDefault(__webpack_require__(/*! ./InputDelayHandler */ "./src/rprofiler/InputDelayHandler.ts"));
var ProfilerEventManager_1 = __importDefault(__webpack_require__(/*! ./ProfilerEventManager */ "./src/rprofiler/ProfilerEventManager.ts"));
var ProfilerJsError_1 = __importDefault(__webpack_require__(/*! ./ProfilerJsError */ "./src/rprofiler/ProfilerJsError.ts"));
var RProfiler = /** @class */ (function () {
    function RProfiler() {
        var _this = this;
        // private restUrl: string = "{{restUrl}}";
        this.restUrl = "portalstage.catchpoint.com/jp/1826/v3.3.8/M";
        this.startTime = (new Date()).getTime();
        this.eventsTimingHandler = new EventsTimingHandler_1.default();
        this.inputDelay = new InputDelayHandler_1.default();
        // version: string = "{{version}}"; //version number of inline script
        this.version = "v3.3.8"; //version number of inline script
        this.info = {};
        this.hasInsight = false;
        this.data = {
            start: this.startTime,
            jsCount: 0,
            jsErrors: [],
            loadTime: -1,
            loadFired: window.document.readyState == "complete",
        };
        this.eventManager = new ProfilerEventManager_1.default();
        this.setCLS = function (_a) {
            var metricName = _a.name, metricValue = _a.delta;
            var CLS = metricName === 'CLS' ? metricValue : undefined;
            _this.cls = CLS;
        };
        this.setLCP = function (_a) {
            var metricName = _a.name, metricValue = _a.delta;
            var LCP = metricName === 'LCP' ? metricValue : undefined;
            _this.lcp = LCP;
        };
        // Value being used instead delta as metricValue, Delta provide single value and value is for overall value.
        this.setINP = function (_a) {
            var metricName = _a.name, metricValue = _a.value;
            var INP = metricName === 'INP' ? metricValue : undefined;
            _this.inp = INP;
        };
        this.recordPageLoad = function () {
            _this.data.loadTime = (new Date()).getTime();
            _this.data.loadFired = true;
        };
        this.addError = function (msg, url, lineNum) {
            _this.data.jsCount++;
            var currError = ProfilerJsError_1.default.createText(msg, url, lineNum);
            var errorArr = _this.data.jsErrors;
            for (var _i = 0, errorArr_1 = errorArr; _i < errorArr_1.length; _i++) {
                var err = errorArr_1[_i];
                if (err.getText() == currError) {
                    err.count++;
                    return;
                }
            }
            errorArr.push(new ProfilerJsError_1.default(msg, url, lineNum));
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
            }
            else {
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
            (0, web_vitals_1.onCLS)(_this.setCLS, { reportAllChanges: false });
            (0, web_vitals_1.onLCP)(_this.setLCP, { reportAllChanges: false });
            (0, web_vitals_1.onINP)(_this.setINP, { reportAllChanges: false });
            return {
                cls: _this.cls,
                lcp: _this.lcp,
                inp: _this.inp
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
            iframe.addEventListener('load', function (event) {
                var frame = event.currentTarget;
                if (frame && frame.contentDocument) {
                    var iframeDocument = frame.contentDocument;
                    var rumScript = iframeDocument.createElement('script');
                    rumScript.type = 'text/javascript';
                    rumScript.src = protocol + '//' + _this.restUrl;
                    iframeDocument.body.appendChild(rumScript);
                }
            });
            if (document.body) {
                document.body.insertAdjacentElement('afterbegin', iframe);
            }
        };
        this.eventManager.add(types_1.WindowEvent.Load, window, this.recordPageLoad);
        var errorFunc = this.addError;
        this.ajaxHandler = new AjaxRequestsHandler_1.default();
        (0, web_vitals_1.onCLS)(this.setCLS, { reportAllChanges: false });
        (0, web_vitals_1.onLCP)(this.setLCP, { reportAllChanges: false });
        (0, web_vitals_1.onINP)(this.setINP, { reportAllChanges: false });
        function recordJsError(e) {
            var ev = e.target || e.srcElement;
            if (ev.nodeType == 3) {
                ev = ev.parentNode;
            }
            errorFunc("N/A", ev.src || ev.URL, -1);
            return false;
        }
        if (!!window["opera"]) {
            this.eventManager.add(types_1.WindowEvent.Error, document, recordJsError);
        }
        else if ("onerror" in window) {
            var origOnError = window.onerror;
            window.onerror = function (msg, url, lineNum) {
                errorFunc(msg, url !== null && url !== void 0 ? url : '', lineNum !== null && lineNum !== void 0 ? lineNum : 0);
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
                var fullMessage = (_a = errorEvent.reason.stack) !== null && _a !== void 0 ? _a : "";
                var errorMsg = fullMessage !== "" ? fullMessage.split("at") : [];
                var fileUrl = errorMsg[1] ? errorMsg[1].replace(/:\d+/g, "") : "";
                var errorLineNumbers = errorMsg[1] ? errorMsg[1].match(/:\d+/g) : [];
                var lineNum = errorLineNumbers[0] ? errorLineNumbers[0].replace(":", "") : 0;
                errorFunc((_c = (_b = errorMsg[0]) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : "N/A", fileUrl.trim(), lineNum);
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
                params = params || { bubbles: false, cancelable: false, detail: undefined };
                var evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
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
}());
exports["default"] = RProfiler;
var profiler = new RProfiler();
window["RProfiler"] = profiler;
window["WindowEvent"] = types_1.WindowEvent;
// if the document state is already complete by the time script is injected - can happen in the case of tag managers like GTM 
if (document.readyState === 'complete') {
    profiler.attachIframe();
}
else {
    document.onreadystatechange = function () {
        if (document.readyState === 'complete') {
            profiler.attachIframe();
        }
    };
}
profiler.dispatchCustomEvent("GlimpseLoaded");


/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostType = exports.VisibilityType = exports.WindowEvent = void 0;
var WindowEvent;
(function (WindowEvent) {
    WindowEvent["Load"] = "load";
    WindowEvent["BeforeUnload"] = "beforeunload";
    WindowEvent["Abort"] = "abort";
    WindowEvent["Error"] = "error";
    WindowEvent["Unload"] = "unload";
})(WindowEvent || (exports.WindowEvent = WindowEvent = {}));
var VisibilityType;
(function (VisibilityType) {
    VisibilityType[VisibilityType["Focus"] = 0] = "Focus";
    VisibilityType[VisibilityType["Blur"] = 1] = "Blur";
})(VisibilityType || (exports.VisibilityType = VisibilityType = {}));
;
// enum definition matches core enum
var PostType;
(function (PostType) {
    PostType[PostType["OnLoad"] = 0] = "OnLoad";
    PostType[PostType["OnBeforeUnload"] = 1] = "OnBeforeUnload";
    PostType[PostType["OnAbort"] = 2] = "OnAbort";
    PostType[PostType["Flush"] = 3] = "Flush";
})(PostType || (exports.PostType = PostType = {}));


/***/ }),

/***/ "./node_modules/web-vitals/dist/web-vitals.umd.cjs":
/*!*********************************************************!*\
  !*** ./node_modules/web-vitals/dist/web-vitals.umd.cjs ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports) {

!function(e,n){ true?n(exports):0}(this,(function(e){"use strict";var n,t,i,r,o,a=-1,c=function(e){addEventListener("pageshow",(function(n){n.persisted&&(a=n.timeStamp,e(n))}),!0)},u=function(){return window.performance&&performance.getEntriesByType&&performance.getEntriesByType("navigation")[0]},f=function(){var e=u();return e&&e.activationStart||0},s=function(e,n){var t=u(),i="navigate";a>=0?i="back-forward-cache":t&&(document.prerendering||f()>0?i="prerender":document.wasDiscarded?i="restore":t.type&&(i=t.type.replace(/_/g,"-")));return{name:e,value:void 0===n?-1:n,rating:"good",delta:0,entries:[],id:"v3-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12),navigationType:i}},d=function(e,n,t){try{if(PerformanceObserver.supportedEntryTypes.includes(e)){var i=new PerformanceObserver((function(e){Promise.resolve().then((function(){n(e.getEntries())}))}));return i.observe(Object.assign({type:e,buffered:!0},t||{})),i}}catch(e){}},l=function(e,n,t,i){var r,o;return function(a){n.value>=0&&(a||i)&&((o=n.value-(r||0))||void 0===r)&&(r=n.value,n.delta=o,n.rating=function(e,n){return e>n[1]?"poor":e>n[0]?"needs-improvement":"good"}(n.value,t),e(n))}},p=function(e){requestAnimationFrame((function(){return requestAnimationFrame((function(){return e()}))}))},v=function(e){var n=function(n){"pagehide"!==n.type&&"hidden"!==document.visibilityState||e(n)};addEventListener("visibilitychange",n,!0),addEventListener("pagehide",n,!0)},m=function(e){var n=!1;return function(t){n||(e(t),n=!0)}},h=-1,g=function(){return"hidden"!==document.visibilityState||document.prerendering?1/0:0},T=function(e){"hidden"===document.visibilityState&&h>-1&&(h="visibilitychange"===e.type?e.timeStamp:0,E())},y=function(){addEventListener("visibilitychange",T,!0),addEventListener("prerenderingchange",T,!0)},E=function(){removeEventListener("visibilitychange",T,!0),removeEventListener("prerenderingchange",T,!0)},C=function(){return h<0&&(h=g(),y(),c((function(){setTimeout((function(){h=g(),y()}),0)}))),{get firstHiddenTime(){return h}}},L=function(e){document.prerendering?addEventListener("prerenderingchange",(function(){return e()}),!0):e()},b=[1800,3e3],w=function(e,n){n=n||{},L((function(){var t,i=C(),r=s("FCP"),o=d("paint",(function(e){e.forEach((function(e){"first-contentful-paint"===e.name&&(o.disconnect(),e.startTime<i.firstHiddenTime&&(r.value=Math.max(e.startTime-f(),0),r.entries.push(e),t(!0)))}))}));o&&(t=l(e,r,b,n.reportAllChanges),c((function(i){r=s("FCP"),t=l(e,r,b,n.reportAllChanges),p((function(){r.value=performance.now()-i.timeStamp,t(!0)}))})))}))},S=[.1,.25],P=function(e,n){n=n||{},w(m((function(){var t,i=s("CLS",0),r=0,o=[],a=function(e){e.forEach((function(e){if(!e.hadRecentInput){var n=o[0],t=o[o.length-1];r&&e.startTime-t.startTime<1e3&&e.startTime-n.startTime<5e3?(r+=e.value,o.push(e)):(r=e.value,o=[e])}})),r>i.value&&(i.value=r,i.entries=o,t())},u=d("layout-shift",a);u&&(t=l(e,i,S,n.reportAllChanges),v((function(){a(u.takeRecords()),t(!0)})),c((function(){r=0,i=s("CLS",0),t=l(e,i,S,n.reportAllChanges),p((function(){return t()}))})),setTimeout(t,0))})))},I={passive:!0,capture:!0},F=new Date,A=function(e,r){n||(n=r,t=e,i=new Date,k(removeEventListener),D())},D=function(){if(t>=0&&t<i-F){var e={entryType:"first-input",name:n.type,target:n.target,cancelable:n.cancelable,startTime:n.timeStamp,processingStart:n.timeStamp+t};r.forEach((function(n){n(e)})),r=[]}},M=function(e){if(e.cancelable){var n=(e.timeStamp>1e12?new Date:performance.now())-e.timeStamp;"pointerdown"==e.type?function(e,n){var t=function(){A(e,n),r()},i=function(){r()},r=function(){removeEventListener("pointerup",t,I),removeEventListener("pointercancel",i,I)};addEventListener("pointerup",t,I),addEventListener("pointercancel",i,I)}(n,e):A(n,e)}},k=function(e){["mousedown","keydown","touchstart","pointerdown"].forEach((function(n){return e(n,M,I)}))},x=[100,300],B=function(e,i){i=i||{},L((function(){var o,a=C(),u=s("FID"),f=function(e){e.startTime<a.firstHiddenTime&&(u.value=e.processingStart-e.startTime,u.entries.push(e),o(!0))},p=function(e){e.forEach(f)},h=d("first-input",p);o=l(e,u,x,i.reportAllChanges),h&&v(m((function(){p(h.takeRecords()),h.disconnect()}))),h&&c((function(){var a;u=s("FID"),o=l(e,u,x,i.reportAllChanges),r=[],t=-1,n=null,k(addEventListener),a=f,r.push(a),D()}))}))},N=0,R=1/0,H=0,O=function(e){e.forEach((function(e){e.interactionId&&(R=Math.min(R,e.interactionId),H=Math.max(H,e.interactionId),N=H?(H-R)/7+1:0)}))},j=function(){return o?N:performance.interactionCount||0},q=function(){"interactionCount"in performance||o||(o=d("event",O,{type:"event",buffered:!0,durationThreshold:0}))},V=[200,500],_=0,z=function(){return j()-_},G=[],J={},K=function(e){var n=G[G.length-1],t=J[e.interactionId];if(t||G.length<10||e.duration>n.latency){if(t)t.entries.push(e),t.latency=Math.max(t.latency,e.duration);else{var i={id:e.interactionId,latency:e.duration,entries:[e]};J[i.id]=i,G.push(i)}G.sort((function(e,n){return n.latency-e.latency})),G.splice(10).forEach((function(e){delete J[e.id]}))}},Q=function(e,n){n=n||{},L((function(){var t;q();var i,r=s("INP"),o=function(e){e.forEach((function(e){(e.interactionId&&K(e),"first-input"===e.entryType)&&(!G.some((function(n){return n.entries.some((function(n){return e.duration===n.duration&&e.startTime===n.startTime}))}))&&K(e))}));var n,t=(n=Math.min(G.length-1,Math.floor(z()/50)),G[n]);t&&t.latency!==r.value&&(r.value=t.latency,r.entries=t.entries,i())},a=d("event",o,{durationThreshold:null!==(t=n.durationThreshold)&&void 0!==t?t:40});i=l(e,r,V,n.reportAllChanges),a&&("PerformanceEventTiming"in window&&"interactionId"in PerformanceEventTiming.prototype&&a.observe({type:"first-input",buffered:!0}),v((function(){o(a.takeRecords()),r.value<0&&z()>0&&(r.value=0,r.entries=[]),i(!0)})),c((function(){G=[],_=j(),r=s("INP"),i=l(e,r,V,n.reportAllChanges)})))}))},U=[2500,4e3],W={},X=function(e,n){n=n||{},L((function(){var t,i=C(),r=s("LCP"),o=function(e){var n=e[e.length-1];n&&n.startTime<i.firstHiddenTime&&(r.value=Math.max(n.startTime-f(),0),r.entries=[n],t())},a=d("largest-contentful-paint",o);if(a){t=l(e,r,U,n.reportAllChanges);var u=m((function(){W[r.id]||(o(a.takeRecords()),a.disconnect(),W[r.id]=!0,t(!0))}));["keydown","click"].forEach((function(e){addEventListener(e,(function(){return setTimeout(u,0)}),!0)})),v(u),c((function(i){r=s("LCP"),t=l(e,r,U,n.reportAllChanges),p((function(){r.value=performance.now()-i.timeStamp,W[r.id]=!0,t(!0)}))}))}}))},Y=[800,1800],Z=function e(n){document.prerendering?L((function(){return e(n)})):"complete"!==document.readyState?addEventListener("load",(function(){return e(n)}),!0):setTimeout(n,0)},$=function(e,n){n=n||{};var t=s("TTFB"),i=l(e,t,Y,n.reportAllChanges);Z((function(){var r=u();if(r){var o=r.responseStart;if(o<=0||o>performance.now())return;t.value=Math.max(o-f(),0),t.entries=[r],i(!0),c((function(){t=s("TTFB",0),(i=l(e,t,Y,n.reportAllChanges))(!0)}))}}))};e.CLSThresholds=S,e.FCPThresholds=b,e.FIDThresholds=x,e.INPThresholds=V,e.LCPThresholds=U,e.TTFBThresholds=Y,e.getCLS=P,e.getFCP=w,e.getFID=B,e.getINP=Q,e.getLCP=X,e.getTTFB=$,e.onCLS=P,e.onFCP=w,e.onFID=B,e.onINP=Q,e.onLCP=X,e.onTTFB=$}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/rprofiler/rprofiler.ts");
/******/ 	
/******/ })()
;
