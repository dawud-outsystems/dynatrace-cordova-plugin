#!/usr/bin/env node
"use strict";
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
var fileOperation = require("./fileOperationHelper");
var pathConstants = require("./pathsConstants");
var config_1 = require("./config");
var fs = require("fs");
var nodePath = require("path");
var ERROR = 0;
var INFO = 1;
var WARNING = 2;
exports.default = {
    ERROR: ERROR,
    INFO: INFO,
    WARNING: WARNING,
    closeLogFile: closeLogFile,
    logMessageSync: logMessageSync,
    logErrorSync: logErrorSync
};
function closeLogFile() {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (process.env.SILENT == "true") {
                        return [2];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, fileOperation.checkIfFileExists(pathConstants.getCurrentLogPath())];
                case 2:
                    _a.sent();
                    return [2, new Promise(function (resolve, reject) {
                            var logFileName = currentDate().split(":").join("-") + ".txt";
                            if (fs.existsSync(pathConstants.getLogPath() + logFileName)) {
                                fs.rename(pathConstants.getCurrentLogPath(), nodePath.join(pathConstants.getLogPath(), logFileName), function (err) {
                                    if (err) {
                                        reject(err);
                                    }
                                    resolve();
                                });
                            }
                        })];
                case 3:
                    e_1 = _a.sent();
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
}
function logErrorSync(_message) {
    var config = config_1.readConfig(pathConstants.getConfigFilePath());
    if (config.cordova !== undefined && config.cordova.debug) {
        logMessageSync(_message, ERROR, true);
    }
}
function logMessageSync(_message, _logLevel, _onlyConsole) {
    if (_onlyConsole === void 0) { _onlyConsole = false; }
    if (process.env.SILENT == "true") {
        return;
    }
    try {
        fs.mkdirSync(pathConstants.getLogPath());
    }
    catch (e) {
    }
    var logString;
    if (_logLevel == INFO) {
        logString = "#INFO  ";
    }
    else if (_logLevel == WARNING) {
        logString = "#WARN  ";
    }
    else if (_logLevel == ERROR) {
        logString = "#ERROR ";
    }
    else {
        logString = "#NONE  ";
    }
    var outputString = logString + "[" + currentDate() + "]: " + _message;
    console.log(outputString);
    if (!_onlyConsole) {
        fs.appendFileSync(pathConstants.getCurrentLogPath(), outputString + "\r\n");
    }
}
function errorHandling(_message) {
    console.log(_message);
}
function currentDate() {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);
    return localISOTime.replace("T", " ");
}
