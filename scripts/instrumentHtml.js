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
exports.removeOldDtAgent = exports.checkHTMLFile = exports.loadHTMLFile = exports.isHTMLQualified = exports.addAgentToHTMLDom = exports.removeAgentFromHTMLDom = exports.isAgentInHTMLDom = exports.instrumentHtml = void 0;
var logger_1 = require("./logger");
var files = require("./fileOperationHelper");
var path = require("path");
var pathConstants = require("./pathsConstants");
var jsdom_1 = require("jsdom");
var OLD_AGENT_SRC = "assets/dtAgent.js";
var SWALLOW_API_SRC = "assets/dtrum-swallow-api.js";
var HTML_IDENTIFIER = ["ion-app", "app-root"];
function instrumentHtml(folderHtml, jsagentContent) {
    return __awaiter(this, void 0, void 0, function () {
        var htmlFiles, htmlFilesToInstrument, i, i, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.default.logMessageSync("Searching for HTML files ..", logger_1.default.INFO);
                    return [4, files.searchFileExtInDirectoryNonRecursive(folderHtml, ".html", [])];
                case 1:
                    htmlFiles = _a.sent();
                    htmlFilesToInstrument = [];
                    for (i = 0; i < htmlFiles.length; i++) {
                        if (checkHTMLFile(htmlFiles[i])) {
                            htmlFilesToInstrument.push(htmlFiles[i]);
                        }
                    }
                    if (!(htmlFilesToInstrument.length == 0)) return [3, 2];
                    logger_1.default.logMessageSync("No HTML files to instrument!", logger_1.default.INFO);
                    return [3, 6];
                case 2:
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < htmlFilesToInstrument.length)) return [3, 6];
                    return [4, insertAgentIntoHtml(htmlFilesToInstrument[i], jsagentContent)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i++;
                    return [3, 3];
                case 6:
                    if (!(htmlFilesToInstrument.length > 0)) return [3, 10];
                    logger_1.default.logMessageSync(htmlFilesToInstrument.length + " HTML file(s) are instrumented.", logger_1.default.INFO);
                    i = 0;
                    _a.label = 7;
                case 7:
                    if (!(i < htmlFilesToInstrument.length)) return [3, 10];
                    return [4, copyAgent(path.join(htmlFilesToInstrument[i], ".."))];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    i++;
                    return [3, 7];
                case 10:
                    logger_1.default.logMessageSync("Successfully updated the JSAgent in HTML file!", logger_1.default.INFO);
                    return [2];
            }
        });
    });
}
exports.instrumentHtml = instrumentHtml;
function insertAgentIntoHtml(htmlFile, jsagentContent) {
    return __awaiter(this, void 0, void 0, function () {
        var domTree;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, loadHTMLFile(htmlFile)];
                case 1:
                    domTree = _a.sent();
                    domTree = addAgentToHTMLDom(domTree, jsagentContent);
                    return [4, writeHTMLTreeToFile(domTree, htmlFile)];
                case 2:
                    _a.sent();
                    logger_1.default.logMessageSync("Successfully instrumented: " + path.resolve(htmlFile), logger_1.default.INFO);
                    return [2];
            }
        });
    });
}
function isAgentInHTMLDom(domTree) {
    var scripts = domTree.window.document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        var item = scripts.item(i);
        if (item !== null && item.src === OLD_AGENT_SRC) {
            return i;
        }
    }
    return -1;
}
exports.isAgentInHTMLDom = isAgentInHTMLDom;
function removeAgentFromHTMLDom(domTree) {
    var scripts = domTree.window.document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        var item = scripts.item(i);
        if (item !== null && item.src === OLD_AGENT_SRC && item.parentNode !== null) {
            item.parentNode.removeChild(item);
            return domTree;
        }
    }
    return domTree;
}
exports.removeAgentFromHTMLDom = removeAgentFromHTMLDom;
function addAgentToHTMLDom(domTree, jsagentContent) {
    var scriptTag = domTree.window.document.createElement('template');
    scriptTag.innerHTML = jsagentContent;
    var swallowApiScript = domTree.window.document.createElement("script");
    swallowApiScript.type = "text/javascript";
    swallowApiScript.src = SWALLOW_API_SRC;
    var head = domTree.window.document.getElementsByTagName("head");
    if (head.length == 0) {
        var item = domTree.window.document.createElement("head");
        domTree.window.document.appendChild(item);
        item.prepend(swallowApiScript);
        if (scriptTag.content.firstChild !== null) {
            item.prepend(scriptTag.content.firstChild);
        }
    }
    else {
        var item = head.item(0);
        item === null || item === void 0 ? void 0 : item.prepend(swallowApiScript);
        if (item !== null && scriptTag.content.firstChild !== null) {
            item.prepend(scriptTag.content.firstChild);
        }
    }
    return domTree;
}
exports.addAgentToHTMLDom = addAgentToHTMLDom;
function isHTMLQualified(domTree) {
    for (var i = 0; i < HTML_IDENTIFIER.length; i++) {
        var tags = domTree.window.document.getElementsByTagName(HTML_IDENTIFIER[i]);
        if (tags.length > 0) {
            return true;
        }
    }
    var scripts = domTree.window.document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        var item = scripts.item(i);
        if (item !== null && item.src === "cordova.js") {
            return true;
        }
    }
    return false;
}
exports.isHTMLQualified = isHTMLQualified;
function loadHTMLFile(htmlFile) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, files.readTextFromFile(htmlFile)];
                case 1:
                    data = _a.sent();
                    return [2, new jsdom_1.JSDOM(data)];
            }
        });
    });
}
exports.loadHTMLFile = loadHTMLFile;
function writeHTMLTreeToFile(domTree, htmlFile) {
    return __awaiter(this, void 0, void 0, function () {
        var content;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    content = domTree.serialize();
                    return [4, files.writeTextToFile(htmlFile, content)];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
function checkHTMLFile(htmlFile) {
    return __awaiter(this, void 0, void 0, function () {
        var domTree;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, loadHTMLFile(htmlFile)];
                case 1:
                    domTree = _a.sent();
                    if (isAgentInHTMLDom(domTree) > -1) {
                        removeAgentFromHTMLDom(domTree);
                        logger_1.default.logMessageSync("Updating instrumented HTML file: " + path.resolve(htmlFile), logger_1.default.INFO);
                        return [2, true];
                    }
                    else if (isHTMLQualified(domTree)) {
                        logger_1.default.logMessageSync("Found main HTML file: " + path.resolve(htmlFile), logger_1.default.INFO);
                        return [2, true];
                    }
                    return [2, false];
            }
        });
    });
}
exports.checkHTMLFile = checkHTMLFile;
function copyAgent(destDir) {
    return __awaiter(this, void 0, void 0, function () {
        var destAssets, e_1, swallowApi, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    destAssets = path.join(destDir, pathConstants.FOLDER_ASSETS);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 5]);
                    return [4, files.checkIfFileExists(destAssets)];
                case 2:
                    _a.sent();
                    return [3, 5];
                case 3:
                    e_1 = _a.sent();
                    return [4, files.createDirectory(destAssets)];
                case 4:
                    _a.sent();
                    return [3, 5];
                case 5:
                    _a.trys.push([5, 8, , 9]);
                    return [4, files.readTextFromFile(pathConstants.getSwallowApiPath())];
                case 6:
                    swallowApi = _a.sent();
                    return [4, files.writeTextToFile(path.resolve(destAssets, pathConstants.FILE_SWALLOW_API), swallowApi)];
                case 7:
                    _a.sent();
                    return [3, 9];
                case 8:
                    e_2 = _a.sent();
                    throw Error("Error while copying dtrum swallow api to platforms folder: " + e_2);
                case 9: return [2];
            }
        });
    });
}
function removeOldDtAgent(path) {
    try {
        files.deleteFileSync(path);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.removeOldDtAgent = removeOldDtAgent;
