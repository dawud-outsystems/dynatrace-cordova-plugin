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
exports.instrument = exports.parseCommandLine = exports.showVersionOfPlugin = exports.CONFIG_JSAGENT_FILE = exports.CONFIG_FILE = exports.CONFIG_PLIST_FILE = exports.CONFIG_GRADLE_FILE = void 0;
var logger_1 = require("./logger");
var fileOperation = require("./fileOperationHelper");
var pathConstants = require("./pathsConstants");
var instrumentHelper = require("./instrumentHelper");
var config = require("./config");
var android = require("./android");
var path = require("path");
var ios = require("./ios");
var downloadAgent_1 = require("./downloadAgent");
var instrumentHtml_1 = require("./instrumentHtml");
var installHelper = require("./installHelper");
var updateSecurity_1 = require("./updateSecurity");
var instrumentUtil_1 = require("./utils/instrumentUtil");
exports.CONFIG_GRADLE_FILE = "--gradle";
exports.CONFIG_PLIST_FILE = "--plist";
exports.CONFIG_FILE = "--config";
exports.CONFIG_JSAGENT_FILE = "--jsagent";
function showVersionOfPlugin() {
    try {
        var packageJsonContent = fileOperation.readTextFromFileSync(pathConstants.getPluginPackage());
        var packageJsonContentObj = JSON.parse(packageJsonContent);
        logger_1.default.logMessageSync("Dynatrace Cordova Plugin - Version " + packageJsonContentObj.version, logger_1.default.INFO);
    }
    catch (e) {
        logger_1.default.logMessageSync("Dynatrace Cordova Plugin - Version NOT READABLE", logger_1.default.WARNING);
    }
}
exports.showVersionOfPlugin = showVersionOfPlugin;
function parseCommandLine(inputArgs) {
    var parsedArgs = {};
    inputArgs.forEach(function (entry) {
        var parts = entry.split("=");
        if (parts.length == 2) {
            switch (parts[0]) {
                case exports.CONFIG_GRADLE_FILE:
                    parsedArgs.gradle = parts[1];
                    break;
                case exports.CONFIG_FILE:
                    parsedArgs.config = parts[1];
                    break;
                case exports.CONFIG_PLIST_FILE:
                    parsedArgs.plist = parts[1];
                    break;
                case exports.CONFIG_JSAGENT_FILE:
                    parsedArgs.jsagent = parts[1];
                    break;
            }
        }
    });
    return parsedArgs;
}
exports.parseCommandLine = parseCommandLine;
function instrument(process) {
    return __awaiter(this, void 0, void 0, function () {
        var cliBuildArgs, jsagentContent, configJson, buildProperties, _a, _b, e_1, _c, e_2, e_3;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    logger_1.default.logMessageSync("Starting Configuration of application ..", logger_1.default.INFO);
                    showVersionOfPlugin();
                    cliBuildArgs = instrumentUtil_1.setCliBuildArgs(process);
                    jsagentContent = undefined;
                    buildProperties = instrumentUtil_1.setBuildProperties(instrumentHelper.parseCommandLine(process.argv.slice(2)));
                    if (!(buildProperties.iosAvailable || buildProperties.androidAvailable)) return [3, 33];
                    if (!buildProperties.isCapacitor) {
                        instrumentHtml_1.removeOldDtAgent(pathConstants.getDownloadJSAgentPath());
                    }
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 31, , 32]);
                    logger_1.default.logMessageSync("Trying to read configuration file: " + buildProperties.pathToConfig, logger_1.default.INFO);
                    if (!(buildProperties.pathToConfig !== undefined)) return [3, 30];
                    configJson = config.readConfig(buildProperties.pathToConfig);
                    if (!(buildProperties.pathToJsAgent !== undefined)) return [3, 3];
                    return [4, fileOperation.readTextFromFile(buildProperties.pathToJsAgent)];
                case 2:
                    jsagentContent = _d.sent();
                    return [3, 5];
                case 3: return [4, downloadAgent_1.downloadAgent(configJson)];
                case 4:
                    jsagentContent = _d.sent();
                    _d.label = 5;
                case 5:
                    if (!(buildProperties.androidAvailable && (cliBuildArgs.android || cliBuildArgs.capacitor === "android"))) return [3, 17];
                    _d.label = 6;
                case 6:
                    _d.trys.push([6, 15, 16, 17]);
                    logger_1.default.logMessageSync("Starting Android Configuration with Dynatrace!", logger_1.default.INFO);
                    if (buildProperties.pathToGradle) {
                        android.instrumentAndroidPlatform(buildProperties.pathToGradle, false);
                    }
                    android.writeGradleConfig(configJson.android);
                    _a = buildProperties;
                    if (!buildProperties.isCapacitor) return [3, 8];
                    return [4, pathConstants.getAndroidAssetsPathCapacitor()];
                case 7:
                    _b = _d.sent();
                    return [3, 10];
                case 8: return [4, pathConstants.getAndroidAssetsPath()];
                case 9:
                    _b = _d.sent();
                    _d.label = 10;
                case 10:
                    _a.androidAssetPath = _b;
                    if (!buildProperties.isCapacitor) {
                        instrumentHtml_1.removeOldDtAgent(path.join(buildProperties.androidAssetPath, "assets", "dtAgent.js"));
                    }
                    if (!(jsagentContent == undefined)) return [3, 11];
                    logger_1.default.logMessageSync("Not instrumenting HTML files since there is no available JSAgent to inject!", logger_1.default.WARNING);
                    return [3, 14];
                case 11: return [4, instrumentHtml_1.instrumentHtml(buildProperties.androidAssetPath, jsagentContent)];
                case 12:
                    _d.sent();
                    return [4, updateSecurity_1.updateSecurity(buildProperties.androidAssetPath, configJson)];
                case 13:
                    _d.sent();
                    _d.label = 14;
                case 14: return [3, 17];
                case 15:
                    e_1 = _d.sent();
                    logger_1.default.logMessageSync(e_1.message, logger_1.default.ERROR);
                    return [3, 17];
                case 16:
                    logger_1.default.logMessageSync("Finished Android Configuration with Dynatrace!", logger_1.default.INFO);
                    return [7];
                case 17:
                    if (!(buildProperties.iosAvailable && (cliBuildArgs.ios || cliBuildArgs.capacitor === "ios"))) return [3, 30];
                    _d.label = 18;
                case 18:
                    _d.trys.push([18, 28, 29, 30]);
                    logger_1.default.logMessageSync("Starting iOS Configuration with Dynatrace!", logger_1.default.INFO);
                    return [4, ios.modifyPListFile(buildProperties.pathToPList, configJson.ios, false)];
                case 19:
                    _d.sent();
                    _c = buildProperties;
                    return [4, pathConstants.getIOSAssetsPath()];
                case 20:
                    _c.iosAssetsPath = _d.sent();
                    if (!buildProperties.isCapacitor) return [3, 22];
                    return [4, installHelper.addLinkerFlagToCapConfigFile()];
                case 21:
                    _d.sent();
                    return [3, 23];
                case 22:
                    instrumentHtml_1.removeOldDtAgent(path.join(buildProperties.iosAssetsPath, "assets", "dtAgent.js"));
                    _d.label = 23;
                case 23:
                    if (!(jsagentContent == undefined)) return [3, 24];
                    logger_1.default.logMessageSync("Not instrumenting HTML files since there is no available JSAgent to inject!", logger_1.default.WARNING);
                    return [3, 27];
                case 24: return [4, instrumentHtml_1.instrumentHtml(buildProperties.iosAssetsPath, jsagentContent)];
                case 25:
                    _d.sent();
                    return [4, updateSecurity_1.updateSecurity(buildProperties.iosAssetsPath, configJson)];
                case 26:
                    _d.sent();
                    _d.label = 27;
                case 27: return [3, 30];
                case 28:
                    e_2 = _d.sent();
                    logger_1.default.logMessageSync(e_2.message, logger_1.default.ERROR);
                    return [3, 30];
                case 29:
                    logger_1.default.logMessageSync("Finished iOS Configuration with Dynatrace!", logger_1.default.INFO);
                    return [7];
                case 30: return [3, 32];
                case 31:
                    e_3 = _d.sent();
                    logger_1.default.logMessageSync(e_3, logger_1.default.ERROR);
                    if (e_3 instanceof downloadAgent_1.StopBuildError) {
                        throw e_3;
                    }
                    return [3, 32];
                case 32: return [3, 34];
                case 33:
                    logger_1.default.logMessageSync("Both Android and iOS Folder are not available - Skip Configuration.", logger_1.default.WARNING);
                    _d.label = 34;
                case 34:
                    logger_1.default.logMessageSync("Finished Configuration of Cordova application ..", logger_1.default.INFO);
                    logger_1.default.closeLogFile();
                    return [2];
            }
        });
    });
}
exports.instrument = instrument;
