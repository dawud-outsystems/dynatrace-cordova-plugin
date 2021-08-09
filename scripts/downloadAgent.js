"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHTTPRequest = exports.createHTTPRequestWithRetries = exports.isModeValid = exports.isJsAgentUrlValid = exports.createHTTPOptions = exports.retrieveJSAgentHttp = exports.downloadAgent = exports.StopBuildError = exports.AGENT_DTCONFIG = void 0;
var axios_1 = require("axios");
var https = require("https");
var logger_1 = require("./logger");
exports.AGENT_DTCONFIG = "data-dtconfig";
var JSAGENT_OPTIONS = ['jsInlineScript', 'jsTagComplete', 'syncCS', 'asyncCS', 'jsTag'];
var StopBuildError = (function (_super) {
    __extends(StopBuildError, _super);
    function StopBuildError(message) {
        return _super.call(this, message) || this;
    }
    return StopBuildError;
}(Error));
exports.StopBuildError = StopBuildError;
function downloadAgent(config) {
    return __awaiter(this, void 0, void 0, function () {
        var jsagentContent, exception_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (config.js === undefined) {
                        logger_1.default.logMessageSync("No Settings available for JSAgent in the dynatrace.config.js file - Will not retrieve or include JSAgent.", logger_1.default.INFO);
                        return [2];
                    }
                    else if (!isJsAgentUrlValid(config.js.url)) {
                        logger_1.default.logMessageSync("Incorrect or empty url found for JSAgent - Will not retrieve or include JSAgent.", logger_1.default.WARNING);
                        return [2];
                    }
                    logger_1.default.logMessageSync("Starting the retrieval of the JSAgent ..", logger_1.default.INFO);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    jsagentContent = void 0;
                    if (!isModeValid(config.js.mode)) return [3, 3];
                    return [4, retrieveJSAgentHttp(config.js, config.js.url.replace(JSAGENT_OPTIONS[0], JSAGENT_OPTIONS[config.js.mode]))];
                case 2:
                    jsagentContent = _a.sent();
                    logger_1.default.logMessageSync("JSAgent was retrieved successfully!", logger_1.default.INFO);
                    return [2, jsagentContent];
                case 3:
                    if (!(config.js.mode === undefined)) return [3, 5];
                    logger_1.default.logMessageSync("Mode value is not defined! Retrieving the default code snippet sync option for the JSAgent.", logger_1.default.INFO);
                    return [4, retrieveJSAgentHttp(config.js, config.js.url.replace(JSAGENT_OPTIONS[0], JSAGENT_OPTIONS[2]))];
                case 4:
                    jsagentContent = _a.sent();
                    logger_1.default.logMessageSync("JSAgent was retrieved successfully!", logger_1.default.INFO);
                    return [2, jsagentContent];
                case 5:
                    logger_1.default.logMessageSync("Mode value is not a number between 0 and 4! Retrieving the default code snippet sync option for the JSAgent. Please check the documentation for more details.", logger_1.default.WARNING);
                    return [4, retrieveJSAgentHttp(config.js, config.js.url)];
                case 6:
                    jsagentContent = _a.sent();
                    logger_1.default.logMessageSync("JSAgent was retrieved successfully!", logger_1.default.INFO);
                    return [2, jsagentContent];
                case 7: return [3, 9];
                case 8:
                    exception_1 = _a.sent();
                    logger_1.default.logMessageSync("Could not retrieve the JSAgent! - " + exception_1, logger_1.default.ERROR);
                    return [3, 9];
                case 9: return [2];
            }
        });
    });
}
exports.downloadAgent = downloadAgent;
function retrieveJSAgentHttp(configuration, jsAgentOptionsUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var configJsUrl, jsagentContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    configJsUrl = false;
                    if (!(jsAgentOptionsUrl === undefined)) return [3, 1];
                    throw new Error("JSAgent API url in configuration is not valid! Please update the url to a valid value!");
                case 1:
                    configJsUrl = isJsAgentUrlValid(jsAgentOptionsUrl);
                    if (!configJsUrl) return [3, 3];
                    if (configuration.allowanycert !== undefined && configuration.allowanycert) {
                        logger_1.default.logMessageSync("Ignoring certificate when retrieving the JSAgent!", logger_1.default.WARNING);
                    }
                    return [4, createHTTPRequestWithRetries(3, jsAgentOptionsUrl, createHTTPOptions(configuration), "Retrieving of JS Agent options finished", "Could not retrieve JS Agent options")];
                case 2:
                    jsagentContent = _a.sent();
                    if (jsagentContent !== undefined && jsagentContent.startsWith("<script")) {
                        return [2, jsagentContent.toString()];
                    }
                    else {
                        throw new Error("Content of the JS Agent is invalid! Please check the js url in the dynatrace.config.js file.");
                    }
                    _a.label = 3;
                case 3: return [2, ""];
            }
        });
    });
}
exports.retrieveJSAgentHttp = retrieveJSAgentHttp;
function createHTTPOptions(configuration) {
    return { rejectUnauthorized: !(configuration.allowanycert !== undefined && configuration.allowanycert) };
}
exports.createHTTPOptions = createHTTPOptions;
function isJsAgentUrlValid(jsAgentUrl) {
    if (jsAgentUrl == "") {
        return false;
    }
    for (var i = 0; i < JSAGENT_OPTIONS.length; i++) {
        if (jsAgentUrl.indexOf(JSAGENT_OPTIONS[i]) >= 0) {
            return true;
        }
    }
    return false;
}
exports.isJsAgentUrlValid = isJsAgentUrlValid;
function isModeValid(mode) {
    return typeof (mode) === 'number' && mode >= 0 && mode <= 4;
}
exports.isModeValid = isModeValid;
function createHTTPRequestWithRetries(retries, uri, options, finishMsg, errorMsg) {
    return __awaiter(this, void 0, void 0, function () {
        var amountOfRetries, jsagentContent, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    amountOfRetries = retries || 1;
                    jsagentContent = "";
                    _a.label = 1;
                case 1:
                    amountOfRetries -= 1;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4, exports.createHTTPRequest(uri, options, finishMsg, errorMsg)];
                case 3: return [2, _a.sent()];
                case 4:
                    error_1 = _a.sent();
                    if (amountOfRetries == 0) {
                        throw error_1;
                    }
                    return [3, 5];
                case 5:
                    if (jsagentContent.length === 0 && amountOfRetries > 0) return [3, 1];
                    _a.label = 6;
                case 6: return [2, jsagentContent];
            }
        });
    });
}
exports.createHTTPRequestWithRetries = createHTTPRequestWithRetries;
function createHTTPRequest(uri, options, finishMsg, errorMsg) {
    return __awaiter(this, void 0, void 0, function () {
        var axiosInstance, errorMessage, httpResponse, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    axiosInstance = axios_1.default.create({
                        httpsAgent: new https.Agent(options)
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, axiosInstance.get(uri)];
                case 2:
                    httpResponse = _a.sent();
                    if (httpResponse.status == 200) {
                        logger_1.default.logMessageSync(finishMsg, logger_1.default.INFO);
                        return [2, httpResponse.data];
                    }
                    else {
                        errorMessage = errorMsg + httpResponse.statusText;
                    }
                    return [3, 4];
                case 3:
                    error_2 = _a.sent();
                    errorMessage = errorMsg + error_2.message;
                    return [3, 4];
                case 4:
                    if (errorMessage) {
                        throw new Error(errorMessage);
                    }
                    return [2, ""];
            }
        });
    });
}
exports.createHTTPRequest = createHTTPRequest;
