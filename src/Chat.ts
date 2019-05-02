import "isomorphic-fetch";
import ChatSettings from "./interfaces/Chat/IChatSettings";
import ChatRequest from "./interfaces/Chat/IChatRequest";
import ChatResponse from "./interfaces/Chat/IChatResponse";
import FailureResponse from "interfaces/Chat/IFailureResponse";

export default class Chat {
  _settings: ChatSettings;

  constructor(settings: ChatSettings) {
    this._settings = settings;
  }

  async send(request: ChatRequest): Promise<ChatResponse | FailureResponse> {
    try {
      const isVersion1 = this.settings.orbitaNodeVersion && this.settings.orbitaNodeVersion === 1;

      const requestBody = isVersion1 ?
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

      const fetchResponse = await fetch(this.settings.endpoint, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const responseJSON = await fetchResponse.json();

      if ((isVersion1 && !responseJSON.data) || (!isVersion1 && !responseJSON.orbitaPayload.payload)) {
        return {
          text: "I'm sorry, I did not understand.",
          reprompt: "Can you say that again?",
          type: "failure"
        };
      } else {

        const orbitaPayload = isVersion1 ? responseJSON.data.orbitaPayload.payload : responseJSON.orbitaPayload.payload;

        const response: ChatResponse = request.audio && !isVersion1 ?
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

        return response;
      }
    } catch (error) {
      return {
        text: "I'm sorry, I couldn't process your request. Please try again in a moment.",
        reprompt: "Can you please try again?",
        type: "failure"
      };
    }
  }

  get settings(): ChatSettings {
    return this._settings;
  }
}