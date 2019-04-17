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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Chat_1 = __importDefault(require("./Chat"));
var exampleOrbitaPayload = {
    payload: {
        multiagent: {
            voice: {
                sayText: "dummy say text",
                rePrompt: "dummy say reprompt"
            },
            chat: {
                chatText: "dummy chat text",
                rePrompt: "dummy chat text reprompt"
            },
            screen: {
                shortTitle: "dummy screen short title",
                longTitle: "dummy screen long title",
                body: "dummy screen body",
                smallImage: "dummy screen small image",
                largeImage: "dummy screen large image"
            },
            buttons: {
                type: "dummy buttons type",
                name: "dummy buttons name",
                choices: [
                    {
                        text: "dummy button choice text 1",
                        value: "dummy button choice value 1"
                    },
                    {
                        text: "dummy button choice text 2",
                        value: "dummy button choice value 2"
                    },
                ],
            }
        }
    }
};
var exampleAudioData = {
    type: "Buffer",
    data: [255, 243, 68, 196]
};
var mockNormalFetchResponse = function () {
    jest.spyOn(global, "fetch").mockImplementation(function () { return Promise.resolve({
        json: function () { return Promise.resolve({
            orbitaPayload: exampleOrbitaPayload,
            data: {
                orbitaPayload: exampleOrbitaPayload
            },
            sayTextAudio: exampleAudioData
        }); }
    }); });
};
var mockBadFetchResponse = function () {
    jest.spyOn(global, "fetch").mockImplementation(function () { return Promise.resolve({
        json: function () { return Promise.resolve({}); }
    }); });
};
beforeAll(function () {
    mockNormalFetchResponse();
});
afterEach(function () {
    global.fetch.mockClear();
});
describe('Chat', function () {
    it('exposes chat settings', function () {
        var chatSettings = {
            endpoint: "some endpoint"
        };
        var chat = new Chat_1.default(chatSettings);
        expect(chat.settings).toEqual(chatSettings);
    });
    describe("send", function () {
        it("POSTs an appropriate request to the configured chat endpoint (V1)", function () { return __awaiter(_this, void 0, void 0, function () {
            var chatSettings, chat, message, sessionId, audio, expectedRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chatSettings = {
                            endpoint: "http://some-environment.orbita.cloud:8443/oeapi/chat",
                            orbitaNodeVersion: 1
                        };
                        chat = new Chat_1.default(chatSettings);
                        message = "some message";
                        sessionId = "aSessionId";
                        audio = false;
                        return [4 /*yield*/, chat.send({
                                message: message,
                                sessionId: sessionId,
                                audio: audio
                            })];
                    case 1:
                        _a.sent();
                        expectedRequest = {
                            method: "POST",
                            body: JSON.stringify({
                                query: message,
                                sessionId: sessionId,
                                audio: audio
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        };
                        expect(global.fetch).toHaveBeenCalledTimes(1);
                        expect(global.fetch).toHaveBeenCalledWith(chatSettings.endpoint, expectedRequest);
                        return [2 /*return*/];
                }
            });
        }); });
        it("POSTs an appropriate request to the configured chat endpoint (V2)", function () { return __awaiter(_this, void 0, void 0, function () {
            var chatSettings, chat, message, sessionId, audio, expectedRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chatSettings = {
                            endpoint: "http://some-environment.orbita.cloud:8443/oeapi/chat",
                            orbitaNodeVersion: 2
                        };
                        chat = new Chat_1.default(chatSettings);
                        message = "some message";
                        sessionId = "aSessionId";
                        audio = false;
                        return [4 /*yield*/, chat.send({
                                message: message,
                                sessionId: sessionId,
                                audio: audio
                            })];
                    case 1:
                        _a.sent();
                        expectedRequest = {
                            method: "POST",
                            body: JSON.stringify({
                                text: message,
                                sessionId: sessionId,
                                audio: audio,
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        };
                        expect(global.fetch).toHaveBeenCalledTimes(1);
                        expect(global.fetch).toHaveBeenCalledWith(chatSettings.endpoint, expectedRequest);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Returns an appropriate response (V1)", function () { return __awaiter(_this, void 0, void 0, function () {
            var chatSettings, chat, message, sessionId, audio, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chatSettings = {
                            endpoint: "http://some-environment.orbita.cloud:8443/oeapi/chat",
                            orbitaNodeVersion: 1
                        };
                        chat = new Chat_1.default(chatSettings);
                        message = "some message";
                        sessionId = "aSessionId";
                        audio = false;
                        return [4 /*yield*/, chat.send({
                                message: message,
                                sessionId: sessionId,
                                audio: audio
                            })];
                    case 1:
                        response = _a.sent();
                        expect(response).toEqual({
                            voice: exampleOrbitaPayload.payload.multiagent.voice,
                            chat: exampleOrbitaPayload.payload.multiagent.chat,
                            screen: exampleOrbitaPayload.payload.multiagent.screen,
                            buttons: exampleOrbitaPayload.payload.multiagent.buttons,
                            type: "success"
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("Returns an appropriate response (V2)", function () { return __awaiter(_this, void 0, void 0, function () {
            var chatSettings, chat, message, sessionId, audio, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chatSettings = {
                            endpoint: "http://some-environment.orbita.cloud:8443/oeapi/chat",
                            orbitaNodeVersion: 2
                        };
                        chat = new Chat_1.default(chatSettings);
                        message = "some message";
                        sessionId = "aSessionId";
                        audio = false;
                        return [4 /*yield*/, chat.send({
                                message: message,
                                sessionId: sessionId,
                                audio: audio
                            })];
                    case 1:
                        response = _a.sent();
                        expect(response).toEqual({
                            voice: exampleOrbitaPayload.payload.multiagent.voice,
                            chat: exampleOrbitaPayload.payload.multiagent.chat,
                            screen: exampleOrbitaPayload.payload.multiagent.screen,
                            buttons: exampleOrbitaPayload.payload.multiagent.buttons,
                            type: "success"
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("Returns audio data when audio is true and using the V2 node", function () { return __awaiter(_this, void 0, void 0, function () {
            var chatSettings, chat, message, sessionId, audio, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chatSettings = {
                            endpoint: "http://some-environment.orbita.cloud:8443/oeapi/chat",
                            orbitaNodeVersion: 2
                        };
                        chat = new Chat_1.default(chatSettings);
                        message = "some message";
                        sessionId = "aSessionId";
                        audio = true;
                        return [4 /*yield*/, chat.send({
                                message: message,
                                sessionId: sessionId,
                                audio: audio
                            })];
                    case 1:
                        response = _a.sent();
                        expect(response).toEqual({
                            voice: exampleOrbitaPayload.payload.multiagent.voice,
                            chat: exampleOrbitaPayload.payload.multiagent.chat,
                            screen: exampleOrbitaPayload.payload.multiagent.screen,
                            buttons: exampleOrbitaPayload.payload.multiagent.buttons,
                            audio: exampleAudioData,
                            type: "success"
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("Returns a failure response when expected response properties are missing (V1)", function () { return __awaiter(_this, void 0, void 0, function () {
            var chatSettings, chat, message, sessionId, audio, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chatSettings = {
                            endpoint: "http://some-environment.orbita.cloud:8443/oeapi/chat",
                            orbitaNodeVersion: 1
                        };
                        mockBadFetchResponse();
                        chat = new Chat_1.default(chatSettings);
                        message = "some message";
                        sessionId = "aSessionId";
                        audio = true;
                        return [4 /*yield*/, chat.send({
                                message: message,
                                sessionId: sessionId,
                                audio: audio
                            })];
                    case 1:
                        response = _a.sent();
                        expect(response.type).toEqual("failure");
                        mockNormalFetchResponse();
                        return [2 /*return*/];
                }
            });
        }); });
        it("Returns a failure response when expected response properties are missing (V2)", function () { return __awaiter(_this, void 0, void 0, function () {
            var chatSettings, chat, message, sessionId, audio, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chatSettings = {
                            endpoint: "http://some-environment.orbita.cloud:8443/oeapi/chat",
                            orbitaNodeVersion: 2
                        };
                        mockBadFetchResponse();
                        chat = new Chat_1.default(chatSettings);
                        message = "some message";
                        sessionId = "aSessionId";
                        audio = true;
                        return [4 /*yield*/, chat.send({
                                message: message,
                                sessionId: sessionId,
                                audio: audio
                            })];
                    case 1:
                        response = _a.sent();
                        expect(response.type).toEqual("failure");
                        mockNormalFetchResponse();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
