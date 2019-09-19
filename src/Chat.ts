import fetch from "cross-fetch";
import ChatSettings from "./interfaces/Chat/IChatSettings";
import ChatRequest from "./interfaces/Chat/IChatRequest";
import ChatResponse from "./interfaces/Chat/IChatResponse";
import FailureResponse from "./interfaces/Chat/IFailureResponse";

export default class Chat {
  private _settings: ChatSettings;

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

      if (isVersion1) {
        if (!responseJSON.data) {
          return {
            text: "I'm sorry, I did not understand.",
            reprompt: "Can you say that again?",
            type: "failure"
          };
        } else {
          const orbitaPayload = responseJSON.data.orbitaPayload.payload;

          return {
            voice: orbitaPayload.multiagent.voice,
            chat: orbitaPayload.multiagent.chat,
            screen: orbitaPayload.multiagent.screen,
            buttons: orbitaPayload.multiagent.buttons,
            directives: orbitaPayload.directive,
            rawPayload: orbitaPayload.payload,
            type: "success"
          }
        }
      } else {
        if (responseJSON.orbitaPayload.payload && responseJSON.orbitaPayload.payload.multiagent) {
          const orbitaPayload = responseJSON.orbitaPayload.payload;

          return {
            voice: orbitaPayload.multiagent.voice,
            chat: orbitaPayload.multiagent.chat,
            screen: orbitaPayload.multiagent.screen,
            buttons: orbitaPayload.multiagent.buttons,
            audio: request.audio ? responseJSON.sayTextAudio : undefined,
            directives: orbitaPayload.directive,
            rawPayload: orbitaPayload,
            type: "success"
          }

        } else if (responseJSON.text) {
          return {
            voice: {
              sayText: responseJSON.text,
              rePrompt: responseJSON.reprompt
            },
            chat: {
              chatText: responseJSON.text,
              rePrompt: responseJSON.reprompt
            },
            screen: {
              largeImage: "",
              smallImage: "",
              shortTitle: "",
              body: "",
              longTitle: "",
            },
            buttons: {
              name: "",
              type: "",
              choices: []
            },
            rawPayload: responseJSON.orbitaPayload.payload,
            type: "success"
          }
        } else {
          return {
            text: "I'm sorry, I did not understand.",
            reprompt: "Can you say that again?",
            type: "failure"
          };
        }
      }
    } catch (error) {
      console.log(error);
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