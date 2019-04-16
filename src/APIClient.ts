import Settings from "./interfaces/ISettings";
import Chat from "./Chat";

export default class APIClient {
  _settings: Settings;
  _chat: Chat;

  constructor(settings: Settings) {
    this._settings = settings;
    this._chat = new Chat(settings.chat);
  }

  get settings(): Settings {
    return this._settings;
  }

  get Chat(): Chat {
    return this._chat;
  }
}
