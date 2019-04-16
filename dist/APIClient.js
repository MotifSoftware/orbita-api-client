"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var APIClient = /** @class */ (function () {
    function APIClient(settings) {
        this._settings = settings;
    }
    Object.defineProperty(APIClient.prototype, "settings", {
        get: function () {
            return this._settings;
        },
        enumerable: true,
        configurable: true
    });
    return APIClient;
}());
exports.default = APIClient;
