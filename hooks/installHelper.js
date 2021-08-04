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
exports.removeLinkerFlagToCapConfigFile = exports.addLinkerFlagToCapConfigFile = exports.modifyConfigXmlUninstall = exports.modifyConfigXmlInstall = exports.removePListModification = exports.removeGradleModification = exports.modifyPackageJson = exports.modifyPackageJsonCap = exports.installDependencies = void 0;
var logger_1 = require("./logger");
var fileOp = require("./fileOperationHelper");
var pathConst = require("./pathsConstants");
var android = require("./android");
var ios = require("./ios");
var nodePath = require("path");
var ConfigParser = require('cordova-common').ConfigParser;
function installDependencies() {
    return __awaiter(this, void 0, void 0, function () {
        var e_1, execSync;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, fileOp.checkIfFileExists(nodePath.join(pathConst.getPluginPath(), "node_modules"))];
                case 1:
                    _a.sent();
                    return [3, 3];
                case 2:
                    e_1 = _a.sent();
                    logger_1.default.logMessageSync("Dependencies are not resolved - Will do npm install. Please wait!", logger_1.default.WARNING);
                    execSync = require('child_process').execSync;
                    execSync('npm install', { cwd: pathConst.getPluginPath() });
                    return [3, 3];
                case 3: return [2];
            }
        });
    });
}
exports.installDependencies = installDependencies;
function modifyPackageJsonCap(install, path) {
    return __awaiter(this, void 0, void 0, function () {
        var packageJsonParsed, _a, capHookValue, _b, e_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 9, , 10]);
                    if (!path) return [3, 2];
                    return [4, parsedPackageJson(path)];
                case 1:
                    _a = _c.sent();
                    return [3, 4];
                case 2: return [4, parsedPackageJson()];
                case 3:
                    _a = _c.sent();
                    _c.label = 4;
                case 4:
                    packageJsonParsed = _a;
                    if (install) {
                        capHookValue = "node " + nodePath.relative(nodePath.join((pathConst.getApplicationPath())), nodePath.join(__dirname, "instrument.js"));
                        if (packageJsonParsed.scripts == undefined) {
                            packageJsonParsed.scripts = {};
                        }
                        if (packageJsonParsed.scripts["ionic:capacitor:build:before"] !== capHookValue) {
                            packageJsonParsed.scripts["ionic:capacitor:build:before"] = capHookValue;
                        }
                    }
                    else {
                        if (packageJsonParsed.dependencies !== undefined) {
                            delete packageJsonParsed.dependencies["@dynatrace/cordova-plugin"];
                        }
                        if (packageJsonParsed.devDependencies !== undefined) {
                            delete packageJsonParsed.devDependencies["@dynatrace/cordova-plugin"];
                        }
                        delete packageJsonParsed.scripts["ionic:capacitor:build:before"];
                    }
                    if (!path) return [3, 6];
                    return [4, fileOp.writeTextToFile(path, JSON.stringify(packageJsonParsed, null, "\t"))];
                case 5:
                    _b = _c.sent();
                    return [3, 8];
                case 6: return [4, fileOp.writeTextToFile(pathConst.getApplicationPackage(), JSON.stringify(packageJsonParsed, null, "\t"))];
                case 7:
                    _b = _c.sent();
                    _c.label = 8;
                case 8:
                    _b;
                    return [3, 10];
                case 9:
                    e_2 = _c.sent();
                    console.log(e_2);
                    logger_1.default.logMessageSync("Could not find package.json!", logger_1.default.WARNING, true);
                    return [3, 10];
                case 10: return [2];
            }
        });
    });
}
exports.modifyPackageJsonCap = modifyPackageJsonCap;
function modifyPackageJson(install) {
    return __awaiter(this, void 0, void 0, function () {
        var packageJsonParsed, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4, parsedPackageJson()];
                case 1:
                    packageJsonParsed = _a.sent();
                    if (install) {
                        packageJsonParsed.cordova.plugins["@dynatrace/cordova-plugin"] = {};
                        delete packageJsonParsed.cordova.plugins["dynatrace-cordova-plugin"];
                    }
                    else {
                        if (packageJsonParsed.cordova && packageJsonParsed.cordova.plugins) {
                            delete packageJsonParsed.cordova.plugins["@dynatrace/cordova-plugin"];
                            delete packageJsonParsed.cordova.plugins["dynatrace-cordova-plugin"];
                        }
                        if (packageJsonParsed.dependencies) {
                            delete packageJsonParsed.dependencies["@dynatrace/cordova-plugin"];
                        }
                        if (packageJsonParsed.devDependencies) {
                            delete packageJsonParsed.devDependencies["@dynatrace/cordova-plugin"];
                        }
                    }
                    return [4, fileOp.writeTextToFile(pathConst.getApplicationPackage(), JSON.stringify(packageJsonParsed, null, "\t"))];
                case 2:
                    _a.sent();
                    return [3, 4];
                case 3:
                    e_3 = _a.sent();
                    logger_1.default.logMessageSync("Could not find package.json!", logger_1.default.WARNING);
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
}
exports.modifyPackageJson = modifyPackageJson;
function removeGradleModification() {
    return __awaiter(this, void 0, void 0, function () {
        var path, _a, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    if (!pathConst.isCapacitorApp()) return [3, 2];
                    return [4, fileOp.checkIfFileExists(pathConst.getAndroidGradleFile(pathConst.getAndroidPathCapacitor()))];
                case 1:
                    _a = _b.sent();
                    return [3, 4];
                case 2: return [4, fileOp.checkIfFileExists(pathConst.getAndroidGradleFile(pathConst.getAndroidPath()))];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    path = _a;
                    try {
                        android.instrumentAndroidPlatform(path, true);
                    }
                    catch (e) {
                        logger_1.default.logMessageSync("Removal of Gradle modification didn't work!", logger_1.default.ERROR, true);
                    }
                    return [3, 6];
                case 5:
                    e_4 = _b.sent();
                    return [3, 6];
                case 6: return [2];
            }
        });
    });
}
exports.removeGradleModification = removeGradleModification;
function removePListModification() {
    return __awaiter(this, void 0, void 0, function () {
        var isCapacitor, _a, _b, e_5, e_6;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 12, , 13]);
                    isCapacitor = pathConst.isCapacitorApp();
                    if (!isCapacitor) return [3, 2];
                    return [4, fileOp.checkIfFileExists(pathConst.getIosPlistPathCapacitor())];
                case 1:
                    _a = _c.sent();
                    return [3, 4];
                case 2: return [4, fileOp.checkIfFileExists(pathConst.getIosPath())];
                case 3:
                    _a = _c.sent();
                    _c.label = 4;
                case 4:
                    _a;
                    _c.label = 5;
                case 5:
                    _c.trys.push([5, 10, , 11]);
                    if (!isCapacitor) return [3, 7];
                    return [4, ios.modifyPListFile(pathConst.getIosPlistPathCapacitor(), undefined, true)];
                case 6:
                    _b = _c.sent();
                    return [3, 9];
                case 7: return [4, ios.modifyPListFile(undefined, undefined, true)];
                case 8:
                    _b = _c.sent();
                    _c.label = 9;
                case 9:
                    _b;
                    return [3, 11];
                case 10:
                    e_5 = _c.sent();
                    logger_1.default.logMessageSync("Removal of PList modification didn't work!", logger_1.default.ERROR, true);
                    return [3, 11];
                case 11: return [3, 13];
                case 12:
                    e_6 = _c.sent();
                    return [3, 13];
                case 13: return [2];
            }
        });
    });
}
exports.removePListModification = removePListModification;
function modifyConfigXmlInstall() {
    try {
        var ConfigParser_1 = require('cordova-common').ConfigParser;
        var cfg = new ConfigParser_1(nodePath.join(pathConst.getApplicationPath(), "config.xml"));
        var plugin = cfg.getPlugin("dynatrace-cordova-plugin");
        if (plugin === undefined) {
            return;
        }
        var pluginWithAt = cfg.getPlugin("@dynatrace/cordova-plugin");
        if (pluginWithAt === undefined) {
            cfg.addPlugin({ name: "@dynatrace/cordova-plugin", spec: plugin.spec });
        }
        cfg.removePlugin("dynatrace-cordova-plugin");
        cfg.write();
    }
    catch (e) {
        logger_1.default.logMessageSync("Config.xml is not available - Can not modify Dynatrace dependency", logger_1.default.WARNING);
    }
}
exports.modifyConfigXmlInstall = modifyConfigXmlInstall;
function modifyConfigXmlUninstall() {
    try {
        var cfg = new ConfigParser(nodePath.join(pathConst.getApplicationPath(), "config.xml"));
        cfg.removePlugin("@dynatrace/cordova-plugin");
        cfg.write();
    }
    catch (e) {
        logger_1.default.logMessageSync("Config.xml is not available - Can not modify Dynatrace dependency", logger_1.default.WARNING);
    }
}
exports.modifyConfigXmlUninstall = modifyConfigXmlUninstall;
function addLinkerFlagToCapConfigFile(path) {
    return __awaiter(this, void 0, void 0, function () {
        var capConfigFile, _a, capConfigFileParsed, _b, e_7;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 10, , 11]);
                    if (!path) return [3, 2];
                    return [4, fileOp.readTextFromFile(path)];
                case 1:
                    _a = _c.sent();
                    return [3, 4];
                case 2: return [4, fileOp.readTextFromFile(pathConst.getCapacitorConfig())];
                case 3:
                    _a = _c.sent();
                    _c.label = 4;
                case 4:
                    capConfigFile = _a;
                    capConfigFileParsed = JSON.parse(capConfigFile);
                    if (!capConfigFileParsed.ios) {
                        capConfigFileParsed.ios = {};
                    }
                    if (!capConfigFileParsed.ios) return [3, 9];
                    if (!capConfigFileParsed.ios["cordovaLinkerFlags"]) {
                        capConfigFileParsed.ios["cordovaLinkerFlags"] = ["-ObjC"];
                    }
                    else {
                        if (!capConfigFileParsed.ios["cordovaLinkerFlags"].includes("-ObjC")) {
                            capConfigFileParsed.ios["cordovaLinkerFlags"].push("-ObjC");
                        }
                        else {
                            logger_1.default.logMessageSync("No need to modify the capacitor.config.json as it already includes the proper linker flag!", logger_1.default.INFO);
                        }
                    }
                    if (!path) return [3, 6];
                    return [4, fileOp.writeTextToFile(path, JSON.stringify(capConfigFileParsed, null, "\t"))];
                case 5:
                    _b = _c.sent();
                    return [3, 8];
                case 6: return [4, fileOp.writeTextToFile(pathConst.getCapacitorConfig(), JSON.stringify(capConfigFileParsed, null, "\t"))];
                case 7:
                    _b = _c.sent();
                    _c.label = 8;
                case 8:
                    _b;
                    logger_1.default.logMessageSync("Modified capacitor.config.js to allow proper usage of iOS agent!", logger_1.default.INFO);
                    _c.label = 9;
                case 9: return [3, 11];
                case 10:
                    e_7 = _c.sent();
                    console.log(e_7);
                    logger_1.default.logMessageSync("capacitor.config.json file is not available", logger_1.default.WARNING);
                    return [3, 11];
                case 11: return [2];
            }
        });
    });
}
exports.addLinkerFlagToCapConfigFile = addLinkerFlagToCapConfigFile;
function removeLinkerFlagToCapConfigFile(path) {
    return __awaiter(this, void 0, void 0, function () {
        var capConfigFile, _a, capConfigFileParsed, _b, e_8;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 9, , 10]);
                    if (!path) return [3, 2];
                    return [4, fileOp.readTextFromFile(path)];
                case 1:
                    _a = _c.sent();
                    return [3, 4];
                case 2: return [4, fileOp.readTextFromFile(pathConst.getCapacitorConfig())];
                case 3:
                    _a = _c.sent();
                    _c.label = 4;
                case 4:
                    capConfigFile = _a;
                    capConfigFileParsed = JSON.parse(capConfigFile);
                    if (capConfigFileParsed.ios) {
                        if (capConfigFileParsed.ios["cordovaLinkerFlags"] && capConfigFileParsed.ios["cordovaLinkerFlags"].length > 1) {
                            removeValueFromArray("-ObjC", capConfigFileParsed.ios["cordovaLinkerFlags"]);
                        }
                        else {
                            delete capConfigFileParsed.ios["cordovaLinkerFlags"];
                        }
                    }
                    if (Object.keys(capConfigFileParsed.ios).length === 0) {
                        delete capConfigFileParsed.ios;
                    }
                    if (!path) return [3, 6];
                    return [4, fileOp.writeTextToFile(path, JSON.stringify(capConfigFileParsed, null, "\t"))];
                case 5:
                    _b = _c.sent();
                    return [3, 8];
                case 6: return [4, fileOp.writeTextToFile(pathConst.getCapacitorConfig(), JSON.stringify(capConfigFileParsed, null, "\t"))];
                case 7:
                    _b = _c.sent();
                    _c.label = 8;
                case 8:
                    _b;
                    return [3, 10];
                case 9:
                    e_8 = _c.sent();
                    console.log(e_8);
                    logger_1.default.logMessageSync("capacitor.config.json file is not available - Cannot remove -ObjC linker", logger_1.default.WARNING);
                    return [3, 10];
                case 10: return [2];
            }
        });
    });
}
exports.removeLinkerFlagToCapConfigFile = removeLinkerFlagToCapConfigFile;
function parsedPackageJson(path) {
    return __awaiter(this, void 0, void 0, function () {
        var packageJson, _a, e_9;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    if (!path) return [3, 2];
                    return [4, fileOp.readTextFromFile(path)];
                case 1:
                    _a = _b.sent();
                    return [3, 4];
                case 2: return [4, fileOp.readTextFromFile(pathConst.getApplicationPackage())];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    packageJson = _a;
                    return [2, JSON.parse(packageJson)];
                case 5:
                    e_9 = _b.sent();
                    console.log(e_9);
                    logger_1.default.logMessageSync("Could not find package.json!", logger_1.default.WARNING, true);
                    return [3, 6];
                case 6: return [2];
            }
        });
    });
}
function removeValueFromArray(value, strArray) {
    strArray.indexOf(value) !== -1 &&
        strArray.splice(strArray.indexOf(value), 1);
}
