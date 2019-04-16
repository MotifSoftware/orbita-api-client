"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Chat_1 = __importDefault(require("./Chat"));
var APIClient = /** @class */ (function () {
    function APIClient(settings) {
        this._settings = settings;
        this._chat = new Chat_1.default(settings.chat);
    }
    Object.defineProperty(APIClient.prototype, "settings", {
        get: function () {
            return this._settings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APIClient.prototype, "Chat", {
        get: function () {
            return this._chat;
        },
        enumerable: true,
        configurable: true
    });
    return APIClient;
}());
exports.default = APIClient;
