import Settings from "./interfaces/ISettings";
import Chat from "./Chat";
export default class APIClient {
    _settings: Settings;
    _chat: Chat;
    constructor(settings: Settings);
    readonly settings: Settings;
    readonly Chat: Chat;
}
