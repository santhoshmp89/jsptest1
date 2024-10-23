/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lastmile/LastMileApi.ts":
/*!*************************************************!*\
  !*** ./src/lastmile/LastMileApi.ts + 5 modules ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  createScheduledTest: function() { return /* binding */ createScheduledTest; },
  getUTCTimestamp: function() { return /* binding */ getUTCTimestamp; },
  postResults: function() { return /* binding */ postResults; },
  requestTest: function() { return /* binding */ requestTest; },
  runCustomTest: function() { return /* binding */ runCustomTest; },
  runSyntheticTests: function() { return /* binding */ runSyntheticTests; }
});

;// CONCATENATED MODULE: ./src/lastmile/AvailableMonitorType.ts
var AvailableMonitorType;
(function (AvailableMonitorType) {
    AvailableMonitorType[AvailableMonitorType["SyntheticNodeSingleObject"] = 2] = "SyntheticNodeSingleObject";
    AvailableMonitorType[AvailableMonitorType["SyntheticNodePing"] = 8] = "SyntheticNodePing";
})(AvailableMonitorType || (AvailableMonitorType = {}));

;// CONCATENATED MODULE: ./src/lastmile/ConfigRequest.ts
var ConfigRequest = /** @class */ (function () {
    function ConfigRequest() {
    }
    ConfigRequest.prototype.toString = function () {
        var config = this.prepareConfigRequest();
        return JSON.stringify(config);
    };
    ConfigRequest.prototype.prepareConfigRequest = function () {
        var jsonConfig = new Object();
        jsonConfig['t'] = this.siteType;
        jsonConfig['d'] = this.divisionId;
        jsonConfig['l'] = this.licenseKey;
        return jsonConfig;
    };
    return ConfigRequest;
}());


;// CONCATENATED MODULE: ./src/lastmile/ConfigResponse.ts
var ScheduledTest = /** @class */ (function () {
    function ScheduledTest(v, s, u, m, c) {
        this.v = v;
        this.s = s;
        this.u = u;
        this.m = m;
        this.c = c;
    }
    return ScheduledTest;
}());

var ConfigResponse = /** @class */ (function () {
    function ConfigResponse(v, freq_sec_diagnostics, monitor_type_bit_flags, tests_scheduled, machine_id, change_date, logger_time, error_message) {
        this.v = v;
        this.freq_sec_diagnostics = freq_sec_diagnostics;
        this.monitor_type_bit_flags = monitor_type_bit_flags;
        this.tests_scheduled = tests_scheduled;
        this.machine_id = machine_id;
        this.change_date = change_date;
        this.logger_time = logger_time;
        this.error_message = error_message;
    }
    return ConfigResponse;
}());


;// CONCATENATED MODULE: ./src/lastmile/LastMileResult.ts
var LastMileResult = /** @class */ (function () {
    function LastMileResult() {
        this.siteId = 0;
        this.monitorType = 0;
        this.singleObjectResult = {
            url: '',
            connectTime: 0,
            dnsTime: 0,
            sslTime: 0,
            waitTime: 0,
            receiveTime: 0,
            codeReturn: 0,
            codeError: 0,
            tracePoints: {
                clientId: 0,
                pageUrl: '',
                rtts: []
            }
        };
    }
    LastMileResult.prototype.toString = function () {
        var config = this.prepareResult();
        return JSON.stringify(config);
    };
    LastMileResult.prototype.prepareResult = function () {
        var jsonConfig = new Object();
        jsonConfig['di'] = this.siteId;
        jsonConfig['m'] = this.monitorType;
        jsonConfig['so'] = this.singleObjectResult;
        jsonConfig['so'] = {
            url: this.singleObjectResult.url,
            tc: this.singleObjectResult.connectTime,
            td: this.singleObjectResult.dnsTime,
            ts: this.singleObjectResult.sslTime,
            tw: this.singleObjectResult.waitTime,
            tl: this.singleObjectResult.receiveTime,
            cr: this.singleObjectResult.codeReturn,
            ce: this.singleObjectResult.codeError,
            tra: {
                cid: this.singleObjectResult.tracePoints.clientId,
                adid: this.singleObjectResult.tracePoints.pageUrl
                // dont need to stringify the rtts. Essentiall metadata for now
                // and is likely temporary.
            }
        };
        return jsonConfig;
    };
    return LastMileResult;
}());


;// CONCATENATED MODULE: ./src/lastmile/StatusCodes.ts
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["None"] = 0] = "None";
    HttpStatusCode[HttpStatusCode["HttpContinue"] = 100] = "HttpContinue";
    HttpStatusCode[HttpStatusCode["HttpSwitchingProtocols"] = 101] = "HttpSwitchingProtocols";
    HttpStatusCode[HttpStatusCode["HttpOk"] = 200] = "HttpOk";
    HttpStatusCode[HttpStatusCode["HttpCreated"] = 201] = "HttpCreated";
    HttpStatusCode[HttpStatusCode["HttpAccepted"] = 202] = "HttpAccepted";
    HttpStatusCode[HttpStatusCode["HttpNonAuthoritativeInformation"] = 203] = "HttpNonAuthoritativeInformation";
    HttpStatusCode[HttpStatusCode["HttpNoContent"] = 204] = "HttpNoContent";
    HttpStatusCode[HttpStatusCode["HttpResetContent"] = 205] = "HttpResetContent";
    HttpStatusCode[HttpStatusCode["HttpPartialContent"] = 206] = "HttpPartialContent";
    HttpStatusCode[HttpStatusCode["HttpAmbiguous"] = 300] = "HttpAmbiguous";
    HttpStatusCode[HttpStatusCode["HttpMoved"] = 301] = "HttpMoved";
    HttpStatusCode[HttpStatusCode["HttpRedirect"] = 302] = "HttpRedirect";
    HttpStatusCode[HttpStatusCode["HttpRedirectMethod"] = 303] = "HttpRedirectMethod";
    HttpStatusCode[HttpStatusCode["HttpNotModified"] = 304] = "HttpNotModified";
    HttpStatusCode[HttpStatusCode["HttpUseProxy"] = 305] = "HttpUseProxy";
    HttpStatusCode[HttpStatusCode["HttpUnused"] = 306] = "HttpUnused";
    HttpStatusCode[HttpStatusCode["HttpRedirectKeepVerb"] = 307] = "HttpRedirectKeepVerb";
    HttpStatusCode[HttpStatusCode["HttpBadRequest"] = 400] = "HttpBadRequest";
    HttpStatusCode[HttpStatusCode["HttpUnauthorized"] = 401] = "HttpUnauthorized";
    HttpStatusCode[HttpStatusCode["HttpPaymentRequired"] = 402] = "HttpPaymentRequired";
    HttpStatusCode[HttpStatusCode["HttpForbidden"] = 403] = "HttpForbidden";
    HttpStatusCode[HttpStatusCode["HttpNotFound"] = 404] = "HttpNotFound";
    HttpStatusCode[HttpStatusCode["HttpMethodNotAllowed"] = 405] = "HttpMethodNotAllowed";
    HttpStatusCode[HttpStatusCode["HttpNotAcceptable"] = 406] = "HttpNotAcceptable";
    HttpStatusCode[HttpStatusCode["HttpProxyAuthenticationRequired"] = 407] = "HttpProxyAuthenticationRequired";
    HttpStatusCode[HttpStatusCode["HttpRequestTimeout"] = 408] = "HttpRequestTimeout";
    HttpStatusCode[HttpStatusCode["HttpConflict"] = 409] = "HttpConflict";
    HttpStatusCode[HttpStatusCode["HttpGone"] = 410] = "HttpGone";
    HttpStatusCode[HttpStatusCode["HttpLengthRequired"] = 411] = "HttpLengthRequired";
    HttpStatusCode[HttpStatusCode["HttpPreconditionFailed"] = 412] = "HttpPreconditionFailed";
    HttpStatusCode[HttpStatusCode["HttpRequestEntityTooLarge"] = 413] = "HttpRequestEntityTooLarge";
    HttpStatusCode[HttpStatusCode["HttpRequestUriTooLong"] = 414] = "HttpRequestUriTooLong";
    HttpStatusCode[HttpStatusCode["HttpUnsupportedMediaType"] = 415] = "HttpUnsupportedMediaType";
    HttpStatusCode[HttpStatusCode["HttpRequestedRangeNotSatisfiable"] = 416] = "HttpRequestedRangeNotSatisfiable";
    HttpStatusCode[HttpStatusCode["HttpExpectationFailed"] = 417] = "HttpExpectationFailed";
    HttpStatusCode[HttpStatusCode["HttpInternalServerError"] = 500] = "HttpInternalServerError";
    HttpStatusCode[HttpStatusCode["HttpNotImplemented"] = 501] = "HttpNotImplemented";
    HttpStatusCode[HttpStatusCode["HttpBadGateway"] = 502] = "HttpBadGateway";
    HttpStatusCode[HttpStatusCode["HttpServiceUnavailable"] = 503] = "HttpServiceUnavailable";
    HttpStatusCode[HttpStatusCode["HttpGatewayTimeout"] = 504] = "HttpGatewayTimeout";
    HttpStatusCode[HttpStatusCode["HttpVersionNotSupported"] = 505] = "HttpVersionNotSupported";
})(HttpStatusCode || (HttpStatusCode = {}));
var AvailableRealUserWebNetworkError;
(function (AvailableRealUserWebNetworkError) {
    AvailableRealUserWebNetworkError[AvailableRealUserWebNetworkError["HttpError"] = 28] = "HttpError";
})(AvailableRealUserWebNetworkError || (AvailableRealUserWebNetworkError = {}));

;// CONCATENATED MODULE: ./src/lastmile/LastMileApi.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





// TODO: This would need to be dynamically generated based on environment (staging, qa, etc.)
// same as how RUM does it. These should be log servers
var configUrl = 'https://lst01a.3genlabs.net/hawklogserver/l.p';
var resultsUrl = 'https://lst01a.3genlabs.net/hawklogserver/rl.p';
// TEMPORARY
var siteType = 2;
var divisionId = 4323;
var licenseKey = 'b3a04a8473af473d8e52dba61146ba3f';
//const divisionId = 3081;
//const licenseKey = '5c13378d7dff44c99bb0e65df91e158a';
var divisionId = 4258;
var licenseKey = '337f894d523449c08ef6cb1103961997';
var currentTime;
function getUTCTimestamp() {
    var now = new Date();
    var year = now.getUTCFullYear();
    var month = String(now.getUTCMonth() + 1).padStart(2, '0');
    var day = String(now.getUTCDate()).padStart(2, '0');
    var hours = String(now.getUTCHours()).padStart(2, '0');
    var minutes = String(now.getUTCMinutes()).padStart(2, '0');
    var seconds = String(now.getUTCSeconds()).padStart(2, '0');
    var milliseconds = String(now.getUTCMilliseconds()).padStart(3, '0');
    var timestamp = "".concat(year).concat(month).concat(day).concat(hours).concat(minutes).concat(seconds).concat(milliseconds);
    console.log(timestamp);
    return timestamp;
}
function requestTest() {
    return __awaiter(this, void 0, void 0, function () {
        // Internal function
        function getConfigData() {
            var configRequest = new ConfigRequest();
            configRequest.siteType = siteType; // TODO: Input from portal (2 is scheduled tests)
            configRequest.divisionId = divisionId; // TODO: Input from portal
            configRequest.licenseKey = licenseKey; // TODO: Input from portal
            return configRequest.toString();
        }
        // Internal Step 2: Process the Core response.
        function processResponse(response) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (response.error_message !== undefined && response.error_message.length > 0) {
                        throw new Error(response.error_message);
                    }
                    if (response.tests_scheduled !== undefined && response.tests_scheduled.length <= 0) {
                        throw new Error('No tests scheduled');
                    }
                    if (response.tests_scheduled === undefined) {
                        console.warn('No scheduled tests available.');
                        response.tests_scheduled = [];
                    }
                    return [2 /*return*/, response.tests_scheduled];
                });
            });
        }
        var config, options, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = getConfigData();
                    options = {
                        method: 'POST',
                        body: config
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetch(configUrl, options)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('HTTP error! Status: ${response.status}');
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    console.log(data);
                    return [4 /*yield*/, processResponse(data)];
                case 4: return [2 /*return*/, _a.sent()];
                case 5:
                    error_1 = _a.sent();
                    console.error('There was a problem with the fetch operation: ', error_1);
                    throw error_1;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function runSyntheticTests(testsToRun, runPing) {
    return __awaiter(this, void 0, void 0, function () {
        var testPromises, testResults;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testPromises = testsToRun.map(function (test) { return __awaiter(_this, void 0, void 0, function () {
                        var monitorType;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    monitorType = test.m;
                                    if (!runPing) return [3 /*break*/, 2];
                                    return [4 /*yield*/, executeTest(test, runPingTest)];
                                case 1: return [2 /*return*/, _a.sent()];
                                case 2:
                                    if (!(AvailableMonitorType.SyntheticNodeSingleObject === monitorType)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, executeTest(test, runSingleObjectTest)];
                                case 3: return [2 /*return*/, _a.sent()];
                                case 4: return [2 /*return*/, null];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(testPromises)];
                case 1:
                    testResults = _a.sent();
                    return [2 /*return*/, testResults];
            }
        });
    });
}
function runCustomTest(testsToRun, testCallback) {
    return __awaiter(this, void 0, void 0, function () {
        var testPromises, testResults;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testPromises = testsToRun.map(function (test) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, executeTest(test, testCallback)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(testPromises)];
                case 1:
                    testResults = _a.sent();
                    return [2 /*return*/, testResults];
            }
        });
    });
}
function postResults(testResultsList) {
    return __awaiter(this, void 0, void 0, function () {
        var options, postPromises;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = function (testResults) { return ({
                        method: 'POST',
                        body: testResults.toString()
                    }); };
                    postPromises = testResultsList.map(function (testResults) { return fetch(resultsUrl, options(testResults)); });
                    return [4 /*yield*/, Promise.all(postPromises)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createScheduledTest(version, testId, url, monitorType, timeStamp) {
    return new ScheduledTest(version, testId, url, monitorType, timeStamp);
}
/********************************************************************************************************************************************** */
/*******************************************************************PRIVATE METHODS************************************************************ */
/********************************************************************************************************************************************** */
function executeTest(test, testFunction) {
    return __awaiter(this, void 0, void 0, function () {
        var url, queryParams, urlWithParams, results, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = test.u;
                    queryParams = { rand: "".concat(getRandomInt()) };
                    urlWithParams = appendQueryParams(url, queryParams);
                    console.log('Starting ExecuteTest');
                    results = new LastMileResult();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    currentTime = performance.now();
                    return [4 /*yield*/, testFunction(urlWithParams, test, results)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("runTest: Error - Site ID ".concat(test.s, " failed to run"), error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, Promise.resolve(results)];
            }
        });
    });
}
function runSingleObjectTest(urlToTest, test, results) {
    return __awaiter(this, void 0, void 0, function () {
        var options, observer, observerPromise, response, statusCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = {
                        method: 'GET'
                    };
                    observerPromise = new Promise(function (resolve, reject) {
                        observer = new PerformanceObserver(function (list) {
                            var entriesByName = list.getEntriesByName(urlToTest);
                            if (entriesByName.length > 0) {
                                observer.disconnect(); // stop observing
                                getSingleObjectTestMetrics(entriesByName, test, results);
                                resolve();
                            }
                        });
                        observer.observe({ entryTypes: ['resource'] });
                        // Add a timeout to resolve the promise if the observer doesn't capture the entry
                        setTimeout(function () {
                            observer.disconnect();
                            reject(new Error('Observer timeout'));
                        }, 5000);
                    });
                    return [4 /*yield*/, fetch(urlToTest, options)];
                case 1:
                    response = _a.sent();
                    statusCode = response.status;
                    return [4 /*yield*/, observerPromise];
                case 2:
                    _a.sent();
                    results.siteId = test.s;
                    results.monitorType = test.m;
                    results.singleObjectResult.url = test.u;
                    results.singleObjectResult.tracePoints.pageUrl = getCurrentPageUrl();
                    console.log("Parent URL: ".concat(results.singleObjectResult.tracePoints.pageUrl));
                    // Set HTTP Status Code to the results
                    results.singleObjectResult.codeReturn = statusCode;
                    if (statusCode >= HttpStatusCode.HttpBadRequest && statusCode <= HttpStatusCode.HttpVersionNotSupported) {
                        results.singleObjectResult.codeError = AvailableRealUserWebNetworkError.HttpError;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function runPingTest(urlToTest, test, results) {
    return __awaiter(this, void 0, void 0, function () {
        var options, numberOfProbes, foundEntries, observer, observerPromise, response, statusCode, i, url, queryParams, urlWithParams, rttResponse, rttStatusCode, pingResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = {
                        method: 'HEAD'
                    };
                    numberOfProbes = 5;
                    foundEntries = [];
                    observerPromise = new Promise(function (resolve, reject) {
                        observer = new PerformanceObserver(function (list) {
                            var resourceEntries = list.getEntries();
                            var entriesByName = resourceEntries.filter(function (entry) { return entry.name.startsWith(test.u); });
                            foundEntries.push.apply(foundEntries, entriesByName);
                            if (foundEntries.length > numberOfProbes) {
                                observer.disconnect(); // stop observing
                                getPingTestMetrics(foundEntries, test, results);
                                resolve();
                            }
                        });
                        observer.observe({ entryTypes: ['resource'] });
                        // Add a timeout to resolve the promise if the observer doesn't capture the entry
                        setTimeout(function () {
                            observer.disconnect();
                            reject(new Error('Observer timeout'));
                        }, 15000);
                    });
                    return [4 /*yield*/, fetch(urlToTest, options)];
                case 1:
                    response = _a.sent();
                    statusCode = response.status;
                    results.siteId = test.s;
                    results.monitorType = test.m;
                    results.singleObjectResult.url = test.u;
                    results.singleObjectResult.tracePoints.pageUrl = getCurrentPageUrl();
                    // Set HTTP Status Code to the results
                    results.singleObjectResult.codeReturn = statusCode;
                    if (statusCode >= HttpStatusCode.HttpBadRequest && statusCode <= HttpStatusCode.HttpVersionNotSupported) {
                        results.singleObjectResult.codeError = AvailableRealUserWebNetworkError.HttpError;
                    }
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < numberOfProbes)) return [3 /*break*/, 5];
                    url = test.u;
                    queryParams = { rand: "".concat(getRandomInt()) };
                    urlWithParams = appendQueryParams(url, queryParams);
                    return [4 /*yield*/, fetch(urlWithParams, options)];
                case 3:
                    rttResponse = _a.sent();
                    rttStatusCode = rttResponse.status;
                    pingResult = new LastMileResult();
                    pingResult.singleObjectResult.codeReturn = rttStatusCode;
                    if (statusCode >= HttpStatusCode.HttpBadRequest && rttStatusCode <= HttpStatusCode.HttpVersionNotSupported) {
                        pingResult.singleObjectResult.codeError = AvailableRealUserWebNetworkError.HttpError;
                    }
                    results.singleObjectResult.tracePoints.rtts.push(pingResult);
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [4 /*yield*/, observerPromise];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getSingleObjectTestMetrics(entries, test, results) {
    var entry = entries[0];
    console.log("URL: ".concat(entry.name));
    // Start real metrics
    console.log('Start real metrics');
    var startTime = Math.round(entry.startTime - currentTime);
    var dnsTime = Math.round(entry.domainLookupEnd - entry.domainLookupStart);
    var connectTime = Math.round(entry.connectEnd - entry.connectStart);
    var sslTime = entry.secureConnectionStart > 0 ? Math.round(entry.connectEnd - entry.secureConnectionStart) : 0;
    var waitTime = Math.round(entry.responseStart - entry.requestStart);
    var receiveTime = Math.round(entry.responseEnd - entry.responseStart);
    var duration = startTime + dnsTime + connectTime + sslTime + waitTime + receiveTime;
    console.log("Start time: ".concat(startTime, " ms"));
    console.log("DNS time: ".concat(dnsTime, " ms"));
    console.log("Connect time: ".concat(connectTime, " ms"));
    console.log("SSL time: ".concat(sslTime, " ms"));
    console.log("Wait time: ".concat(waitTime, " ms"));
    console.log("Receive time: ".concat(receiveTime, " ms"));
    console.log("Duration: ".concat(duration, " ms"));
    results.siteId = test.s;
    results.monitorType = test.m;
    results.singleObjectResult.url = test.u;
    results.singleObjectResult.tracePoints.pageUrl = getCurrentPageUrl();
    console.log("Parent URL: ".concat(results.singleObjectResult.tracePoints.pageUrl));
    results.singleObjectResult.connectTime = connectTime;
    results.singleObjectResult.dnsTime = dnsTime;
    results.singleObjectResult.sslTime = sslTime;
    results.singleObjectResult.waitTime = waitTime;
    results.singleObjectResult.receiveTime = receiveTime;
}
function getPingTestMetrics(entries, test, results) {
    // Populate high level result.
    getSingleObjectTestMetrics(entries, test, results);
    var rttEntries = entries.slice(1);
    results.singleObjectResult.tracePoints.rtts.forEach(function (pingResult, index) {
        if (pingResult.singleObjectResult.codeError !== AvailableRealUserWebNetworkError.HttpError &&
            index < rttEntries.length) {
            var entry = rttEntries[index];
            console.log("RTT Entry Name: ".concat(entry.name));
            var startTime = Math.round(entry.startTime - currentTime);
            var dnsTime = Math.round(entry.domainLookupEnd - entry.domainLookupStart);
            var connectTime = Math.round(entry.connectEnd - entry.connectStart);
            var sslTime = entry.secureConnectionStart > 0 ? Math.round(entry.connectEnd - entry.secureConnectionStart) : 0;
            var waitTime = Math.round(entry.responseStart - entry.requestStart);
            var receiveTime = Math.round(entry.responseEnd - entry.responseStart);
            var duration = startTime + dnsTime + connectTime + sslTime + waitTime + receiveTime;
            console.log("Start time: ".concat(startTime, " ms"));
            console.log("DNS time: ".concat(dnsTime, " ms"));
            console.log("Connect time: ".concat(connectTime, " ms"));
            console.log("SSL time: ".concat(sslTime, " ms"));
            console.log("Wait time: ".concat(waitTime, " ms"));
            console.log("Receive time: ".concat(receiveTime, " ms"));
            console.log("Duration: ".concat(duration, " ms"));
            pingResult.singleObjectResult.connectTime = connectTime;
            pingResult.singleObjectResult.dnsTime = dnsTime;
            pingResult.singleObjectResult.sslTime = sslTime;
            pingResult.singleObjectResult.waitTime = waitTime;
            pingResult.singleObjectResult.receiveTime = receiveTime;
        }
    });
}
// Generate a random number to append to URL to prevent
// needing to reset cache in browser.
function getRandomInt() {
    // Generate a random number between 1,000,000 (10^6) and 999,999,999 (10^9 - 1)
    return Math.floor(Math.random() * (1000000000 - 1000000) + 1000000);
}
function getCurrentPageUrl() {
    var isInIframe = parent !== window;
    var url;
    if (isInIframe) {
        url = document.referrer;
    }
    else {
        url = window.location.href;
    }
    return url;
}
function appendQueryParams(url, params) {
    var urlObj = new URL(url);
    var searchParams = new URLSearchParams(urlObj.search);
    for (var key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            searchParams.append(key, params[key]);
        }
    }
    urlObj.search = searchParams.toString();
    return urlObj.toString();
}
window.getUTCTimestamp = getUTCTimestamp;
window.getRandomInt = getRandomInt;
window.createScheduledTest = createScheduledTest;
window.requestTest = requestTest;
window.runSyntheticTests = runSyntheticTests;
window.runCustomTest = runCustomTest;
window.postResults = postResults;


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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************************************!*\
  !*** ./src/lastmile/lastmile.ts + 1 modules ***!
  \**********************************************/
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/lastmile/LastMileApi.ts + 5 modules
var LastMileApi = __webpack_require__("./src/lastmile/LastMileApi.ts");
;// CONCATENATED MODULE: ./src/lastmile/InitLastMile.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var initLastMileScript = function () { return __awaiter(void 0, void 0, void 0, function () {
    var scheduledTests, results, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, LastMileApi.requestTest()];
            case 1:
                scheduledTests = _a.sent();
                return [4 /*yield*/, LastMileApi.runSyntheticTests(scheduledTests, true)];
            case 2:
                results = _a.sent();
                LastMileApi.postResults(results);
                // store results in global
                window.lastMileResults = results;
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error('CP Last Mile Error', error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
/* harmony default export */ var InitLastMile = (initLastMileScript);

;// CONCATENATED MODULE: ./src/lastmile/lastmile.ts

function runLastMileTests() {
    var _a;
    // The JS must run in an iframe instead of directly on the page.
    // First check if we are in an iframe already, or if we need to
    // create one.
    if (window.self !== window.top) {
        console.log('Already in iframe. Executing....');
        InitLastMile();
    }
    else {
        console.log('Creating IFrame...');
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none'; // Hide the iframe
        document.body.appendChild(iframe);
        var iframeDoc = iframe.contentDocument || ((_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document);
        if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write('<script>parent.initLastMileScript();</script>');
            iframeDoc.close();
        }
    }
}
function main() {
    // if the document state is already complete by the time script is injected - can happen in the case of tag managers like GTM
    if (document.readyState === 'complete') {
        runLastMileTests();
    }
    else {
        document.onreadystatechange = function () {
            if (document.readyState === 'complete') {
                runLastMileTests();
            }
        };
    }
}
// Initialize the global variable
window.lastMileResults = null;
// Expose initLastMileScript to the global scope so it can be accessed from the iframe
window.initLastMileScript = InitLastMile;
// Call Main
main();

}();
/******/ })()
;
