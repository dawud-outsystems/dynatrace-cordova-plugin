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
exports.isCapacitorApp = exports.getCapacitorConfig = exports.getIosAssetsPathCapacitor = exports.getAndroidAssetsPathCapacitor = exports.getIosPlistPathCapacitor = exports.getAndroidPathCapacitor = exports.getIosPathCapacitor = exports.getDynatracePluginGradleFile = exports.getDynatraceGradleFile = exports.getLogPath = exports.getCurrentLogPath = exports.getSwallowApiPath = exports.getDownloadJSAgentPath = exports.getIOSAssetsPath = exports.getAndroidAssetsPath = exports.getConfigFilePath = exports.getDefaultConfig = exports.getAndroidGradleFile = exports.getPluginPath = exports.getPluginPackage = exports.getAndroidPath = exports.getIosPath = exports.getApplicationPackage = exports.getApplicationPath = exports.setRoot = exports.FILE_SWALLOW_API = exports.FILE_JSAGENT = exports.FOLDER_ASSETS = void 0;
var fileOperationHelper_1 = require("./fileOperationHelper");
var path = require("path");
var FOLDER_PLATFORMS = "platforms";
exports.FOLDER_ASSETS = "assets";
var FOLDER_WWW = "www";
var FOLDER_SCRIPTS = "scripts";
var FOLDER_FILES = "files";
var FOLDER_LOGS = "logs";
var FOLDER_ANDROID_APP = "app";
var FILE_PACKAGE = "package.json";
var FILE_CONFIG = "dynatrace.config.js";
var FILE_CURRENT_LOG = "currentLog.txt";
exports.FILE_JSAGENT = "dtAgent.js";
exports.FILE_SWALLOW_API = "dtrum-swallow-api.js";
var isCapacitor = false;
var rootPath = __dirname;
function setRoot(newRoot) {
    rootPath = path.resolve(newRoot);
}
exports.setRoot = setRoot;
function getPluginPath() {
    return path.join(rootPath, "..");
}
exports.getPluginPath = getPluginPath;
function getDefaultConfig() {
    return path.join(getPluginPath(), FOLDER_FILES, "default.config.js");
}
exports.getDefaultConfig = getDefaultConfig;
function getDynatraceGradleFile() {
    return path.join(getPluginPath(), FOLDER_FILES, "dynatrace.gradle");
}
exports.getDynatraceGradleFile = getDynatraceGradleFile;
function getDynatracePluginGradleFile() {
    return path.join(getPluginPath(), FOLDER_FILES, "plugin.gradle");
}
exports.getDynatracePluginGradleFile = getDynatracePluginGradleFile;
function getApplicationPath() {
    isCapacitor = isCapacitorApp();
    return isCapacitor ? path.join(getPluginPath(), "..", "..", "..") : path.join(getPluginPath(), "..", "..");
}
exports.getApplicationPath = getApplicationPath;
function getPluginPackage() {
    return path.join(getPluginPath(), FILE_PACKAGE);
}
exports.getPluginPackage = getPluginPackage;
function getApplicationPackage() {
    return path.join(getApplicationPath(), FILE_PACKAGE);
}
exports.getApplicationPackage = getApplicationPackage;
function getIosPath() {
    return isCapacitor ? getIosPathCapacitor() : path.join(getApplicationPath(), FOLDER_PLATFORMS, "ios");
}
exports.getIosPath = getIosPath;
function getAndroidPath() {
    return path.join(getApplicationPath(), FOLDER_PLATFORMS, "android");
}
exports.getAndroidPath = getAndroidPath;
function getAndroidGradleFile(androidFolder) {
    return path.join(androidFolder, "build.gradle");
}
exports.getAndroidGradleFile = getAndroidGradleFile;
function getConfigFilePath() {
    return path.join(getApplicationPath(), FILE_CONFIG);
}
exports.getConfigFilePath = getConfigFilePath;
function getAndroidAssetsPath() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    if (!isCapacitor) return [3, 2];
                    return [4, fileOperationHelper_1.checkIfFileExists(path.join(getAndroidPathCapacitor(), FOLDER_ANDROID_APP, "src", "main", exports.FOLDER_ASSETS, "public"))];
                case 1:
                    _a = _b.sent();
                    return [3, 4];
                case 2: return [4, fileOperationHelper_1.checkIfFileExists(path.join(getAndroidPath(), exports.FOLDER_ASSETS, FOLDER_WWW))];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4: return [2, _a];
                case 5:
                    e_1 = _b.sent();
                    return [2, isCapacitor ? path.join(getAndroidPathCapacitor(), FOLDER_ANDROID_APP, "src", "main", exports.FOLDER_ASSETS, "public") : path.join(getAndroidPath(), FOLDER_ANDROID_APP, "src", "main", exports.FOLDER_ASSETS, FOLDER_WWW)];
                case 6: return [2];
            }
        });
    });
}
exports.getAndroidAssetsPath = getAndroidAssetsPath;
function getIOSAssetsPath() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    if (!isCapacitor) return [3, 2];
                    return [4, fileOperationHelper_1.checkIfFileExists(path.join(getIosPathCapacitor(), "public"))];
                case 1:
                    _a = _b.sent();
                    return [3, 4];
                case 2: return [4, fileOperationHelper_1.checkIfFileExists(path.join(getIosPath(), FOLDER_WWW))];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4: return [2, _a];
                case 5:
                    e_2 = _b.sent();
                    return [2, isCapacitor ? path.join(getIosPathCapacitor(), "public") : path.join(getIosPath(), FOLDER_WWW)];
                case 6: return [2];
            }
        });
    });
}
exports.getIOSAssetsPath = getIOSAssetsPath;
function getDownloadJSAgentPath() {
    return path.join(getPluginPath(), FOLDER_FILES, exports.FILE_JSAGENT);
}
exports.getDownloadJSAgentPath = getDownloadJSAgentPath;
function getSwallowApiPath() {
    return path.join(getPluginPath(), FOLDER_SCRIPTS, exports.FILE_SWALLOW_API);
}
exports.getSwallowApiPath = getSwallowApiPath;
function getCurrentLogPath() {
    return path.join(getLogPath(), FILE_CURRENT_LOG);
}
exports.getCurrentLogPath = getCurrentLogPath;
function getLogPath() {
    return path.join(getPluginPath(), FOLDER_LOGS);
}
exports.getLogPath = getLogPath;
function getIosPathCapacitor() {
    return path.join(getApplicationPath(), "ios", "App");
}
exports.getIosPathCapacitor = getIosPathCapacitor;
function getAndroidPathCapacitor() {
    return path.join(getApplicationPath(), "android");
}
exports.getAndroidPathCapacitor = getAndroidPathCapacitor;
function getIosPlistPathCapacitor() {
    return path.join(getIosPathCapacitor(), "App", "Info.plist");
}
exports.getIosPlistPathCapacitor = getIosPlistPathCapacitor;
function getAndroidAssetsPathCapacitor() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                return [2, fileOperationHelper_1.checkIfFileExists(path.join(getAndroidPathCapacitor(), FOLDER_ANDROID_APP, "src", "main", exports.FOLDER_ASSETS, "public"))];
            }
            catch (e) {
                return [2, path.join(getAndroidPathCapacitor(), FOLDER_ANDROID_APP, "src", "main", exports.FOLDER_ASSETS, "public")];
            }
            return [2];
        });
    });
}
exports.getAndroidAssetsPathCapacitor = getAndroidAssetsPathCapacitor;
function getIosAssetsPathCapacitor() {
    return path.join(getIosPathCapacitor(), "public");
}
exports.getIosAssetsPathCapacitor = getIosAssetsPathCapacitor;
function getCapacitorConfig() {
    return path.join(__dirname, "..", "..", "..", "..", "capacitor.config.json");
}
exports.getCapacitorConfig = getCapacitorConfig;
function isCapacitorApp(path) {
    var isCapacitor = false;
    try {
        if (path) {
            isCapacitor = fileOperationHelper_1.checkIfFileExistsSync(path) ? true : false;
        }
        else {
            isCapacitor = fileOperationHelper_1.checkIfFileExistsSync(getCapacitorConfig()) ? true : false;
        }
    }
    catch (e) {
    }
    return isCapacitor;
}
exports.isCapacitorApp = isCapacitorApp;
