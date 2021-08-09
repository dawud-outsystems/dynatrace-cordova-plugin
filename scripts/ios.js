#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.searchForPListFile = exports.modifyPListFile = void 0;
var logger_1 = require("./logger");
var fileOperation = require("./fileOperationHelper");
var pathConstants = require("./pathsConstants");
var plist = require("plist");
var nodePath = require("path");
function modifyPListFile(pathToPList, iosConfig, removeOnly) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(pathToPList === undefined)) return [3, 2];
                    return [4, searchForPListFile()];
                case 1:
                    pathToPList = _a.sent();
                    return [3, 3];
                case 2:
                    if (!pathToPList.endsWith(".plist")) {
                        throw new Error("Can't find .plist file. plist path must also include the plist file!");
                    }
                    try {
                        fileOperation.checkIfFileExistsSync(pathToPList);
                    }
                    catch (e) {
                        throw new Error("Could not read plist file: " + pathToPList);
                    }
                    _a.label = 3;
                case 3:
                    removePListConfig(pathToPList);
                    if (!removeOnly) {
                        if (iosConfig === undefined || iosConfig.config === undefined) {
                            logger_1.default.logMessageSync("Can't write configuration of iOS agent because it is missing!", logger_1.default.WARNING);
                        }
                        else {
                            addAgentConfigToPListFile(pathToPList, iosConfig.config);
                        }
                    }
                    return [2];
            }
        });
    });
}
exports.modifyPListFile = modifyPListFile;
function removePListConfig(file) {
    var pListContent = fileOperation.readTextFromFileSync(file);
    var pListObj = plist.parse(pListContent);
    var pListObjCopy = __assign({}, pListObj);
    for (var property in pListObj) {
        if (property.startsWith("DTX")) {
            delete pListObjCopy[property];
        }
    }
    fileOperation.writeTextToFileSync(file, plist.build(pListObjCopy));
    logger_1.default.logMessageSync("Removed old configuration in plist file: " + file, logger_1.default.INFO);
}
function addAgentConfigToPListFile(file, config) {
    var pListContent = fileOperation.readTextFromFileSync(file);
    var newPListContent = "<plist><dict>" + config + "</dict></plist>";
    var flavorType = "<plist><dict><key>DTXFlavor</key><string>cordova</string></dict></plist>";
    fileOperation.writeTextToFileSync(file, plist.build(__assign(__assign(__assign({}, plist.parse(pListContent)), plist.parse(newPListContent)), plist.parse(flavorType))));
    logger_1.default.logMessageSync("Updated configuration in plist file: " + file, logger_1.default.INFO);
}
var DIR_SEARCH_EXCEPTION = ["build", "cordova", "CordovaLib"];
function searchForPListFile() {
    return __awaiter(this, void 0, void 0, function () {
        var foundPListFiles, packageApplicationContent, packageApplicationJSON, e_1, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4, fileOperation.readTextFromFile(pathConstants.getApplicationPackage())];
                case 1:
                    packageApplicationContent = _a.sent();
                    packageApplicationJSON = JSON.parse(packageApplicationContent);
                    return [4, fileOperation.searchFilesInDirectoryRecursive(pathConstants.getIosPath(), packageApplicationJSON.name + "-Info.plist", DIR_SEARCH_EXCEPTION)];
                case 2:
                    foundPListFiles = _a.sent();
                    return [3, 4];
                case 3:
                    e_1 = _a.sent();
                    logger_1.default.logMessageSync("Didn't find package.json and couldn't read name of the application. Will search for other plist files.", logger_1.default.WARNING);
                    return [3, 4];
                case 4:
                    if (!(!foundPListFiles || foundPListFiles.length == 0)) return [3, 8];
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4, fileOperation.searchFilesInDirectoryRecursive(pathConstants.getIosPath(), "-Info.plist", DIR_SEARCH_EXCEPTION)];
                case 6:
                    foundPListFiles = _a.sent();
                    return [3, 8];
                case 7:
                    e_2 = _a.sent();
                    return [3, 8];
                case 8:
                    if (foundPListFiles === undefined || foundPListFiles.length == 0) {
                        throw new Error("Can't find .plist file in iOS Folder! Try to use plist= custom argument. See documentation for help!");
                    }
                    else if (foundPListFiles.length > 1) {
                        logger_1.default.logMessageSync("Found several -Info.plist files, will take the first one: " + nodePath.resolve(foundPListFiles[0]), logger_1.default.WARNING);
                    }
                    return [2, foundPListFiles[0]];
            }
        });
    });
}
exports.searchForPListFile = searchForPListFile;
