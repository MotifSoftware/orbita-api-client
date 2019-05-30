import Settings from "./interfaces/ISettings";
import Chat from "./Chat";
export default class APIClient {
    private _settings;
    private _chat;
    constructor(settings: Settings);
    readonly settings: Settings;
    readonly Chat: Chat;
}
