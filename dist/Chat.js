"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cross_fetch_1 = __importDefault(require("cross-fetch"));
var Chat = /** @class */ (function () {
    function Chat(settings) {
        this._settings = settings;
    }
    Chat.prototype.send = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var isVersion1, requestBody, fetchResponse, responseJSON, orbitaPayload, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        isVersion1 = this.settings.orbitaNodeVersion && this.settings.orbitaNodeVersion === 1;
                        requestBody = isVersion1 ?
                            {
                                query: request.message,
                                sessionId: request.sessionId,
                                audio: request.audio,
                                customData: request.customData
                            } : {
                            text: request.message,
                            sessionId: request.sessionId,
                            audio: request.audio,
                            customData: request.customData
                        };
                        return [4 /*yield*/, cross_fetch_1.default(this.settings.endpoint, {
                                method: "POST",
                                body: JSON.stringify(requestBody),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })];
                    case 1:
                        fetchResponse = _a.sent();
                        return [4 /*yield*/, fetchResponse.json()];
                    case 2:
                        responseJSON = _a.sent();
                        if ((isVersion1 && !responseJSON.data) || (!isVersion1 && !responseJSON.orbitaPayload.payload)) {
                            return [2 /*return*/, {
                                    text: "I'm sorry, I did not understand.",
                                    reprompt: "Can you say that again?",
                                    type: "failure"
                                }];
                        }
                        else {
                            orbitaPayload = isVersion1 ? responseJSON.data.orbitaPayload.payload : responseJSON.orbitaPayload.payload;
                            response = request.audio && !isVersion1 ?
                                {
                                    voice: orbitaPayload.multiagent.voice,
                                    chat: orbitaPayload.multiagent.chat,
                                    screen: orbitaPayload.multiagent.screen,
                                    buttons: orbitaPayload.multiagent.buttons,
                                    audio: responseJSON.sayTextAudio,
                                    type: "success"
                                } : {
                                voice: orbitaPayload.multiagent.voice,
                                chat: orbitaPayload.multiagent.chat,
                                screen: orbitaPayload.multiagent.screen,
                                buttons: orbitaPayload.multiagent.buttons,
                                type: "success"
                            };
                            return [2 /*return*/, response];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, {
                                text: "I'm sorry, I couldn't process your request. Please try again in a moment.",
                                reprompt: "Can you please try again?",
                                type: "failure"
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Chat.prototype, "settings", {
        get: function () {
            return this._settings;
        },
        enumerable: true,
        configurable: true
    });
    return Chat;
}());
exports.default = Chat;
