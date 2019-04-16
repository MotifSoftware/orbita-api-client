"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var APIClient_1 = __importDefault(require("./APIClient"));
describe('APIClient', function () {
    it('exposes client settings', function () {
        var settings = 'Hello, World!';
        var client = new APIClient_1.default(settings);
        expect(client.settings).toEqual(settings);
    });
});
