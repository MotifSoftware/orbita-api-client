import "isomorphic-fetch";
import ChatSettings from "./interfaces/Chat/IChatSettings";
import ChatRequest from "./interfaces/Chat/IChatRequest";
import ChatResponse from "./interfaces/Chat/IChatResponse";

export default class Chat {
  _settings: ChatSettings;

  constructor(settings: ChatSettings) {
    this._settings = settings;
  }

  async send(request: ChatRequest): Promise<ChatResponse> {
    const isVersion1 = this.settings.orbitaNodeVersion && this.settings.orbitaNodeVersion === 1;

    const requestBody = isVersion1 ?
      {
        query: request.message,
        sessionId: request.sessionId,
        audio: request.audio
      } : {
        text: request.message,
        sessionId: request.sessionId,
        audio: request.audio
      };

    const fetchResponse = await fetch(this.settings.endpoint, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const responseJSON = await fetchResponse.json();

    const orbitaPayload = isVersion1 ? responseJSON.data.orbitaPayload.payload : responseJSON.orbitaPayload.payload;

    const response = request.audio && !isVersion1 ?
      {
        voice: orbitaPayload.multiagent.voice,
        chat: orbitaPayload.multiagent.chat,
        screen: orbitaPayload.multiagent.screen,
        buttons: orbitaPayload.multiagent.buttons,
        audio: responseJSON.sayTextAudio
      } : {
        voice: orbitaPayload.multiagent.voice,
        chat: orbitaPayload.multiagent.chat,
        screen: orbitaPayload.multiagent.screen,
        buttons: orbitaPayload.multiagent.buttons,
      };

    return response;
  }

  get settings(): ChatSettings {
    return this._settings;
  }
}