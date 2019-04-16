declare var global: any;

import Chat from "./Chat";

const exampleOrbitaPayload = {
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

const exampleAudioData = {
  type: "Buffer",
  data: [255, 243, 68, 196]
};

const mockNormalFetchResponse = () => {
  jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({
      orbitaPayload: exampleOrbitaPayload,
      data: {
        orbitaPayload: exampleOrbitaPayload
      },
      sayTextAudio: exampleAudioData
    })
  }));
};

const mockBadFetchResponse = () => {
  jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({})
  }));
};

beforeAll(() => {
  mockNormalFetchResponse();
});

afterEach(() => {
  global.fetch.mockClear();
});

describe('Chat', () => {
  it('exposes chat settings', () => {
    const chatSettings = {
      endpoint: "some endpoint"
    };

    const chat = new Chat(chatSettings);

    expect(chat.settings).toEqual(chatSettings);
  });

  describe("send", () => {
    it("POSTs an appropriate request to the configured chat endpoint (V1)", async () => {
      const chatSettings = {
        endpoint: "http://some-environment.orbita.cloud:8443/oeapi/chat",
        orbitaNodeVersion: 1
      };

      const chat = new Chat(chatSettings);

      const message = "some message";
      const sessionId = "aSessionId";
      const audio = false;

      await chat.send({
        message,
        sessionId,
        audio
      });

      const expectedRequest = {
        method: "POST",
        body: JSON.stringify({
          query: message,
          sessionId,
          audio
        }),
        headers: {
          "Content-Type": "application/json"
        }
      };

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(chatSettings.endpoint, expectedRequest);
    });

    it("POSTs an appropriate request to the configured chat endpoint (V2)", async () => {
      const chatSettings = {
        endpoint: "http://some-environment.orbita.cloud:8443/oeapi/chat",
        orbitaNodeVersion: 2
      };

      const chat = new Chat(chatSettings);

      const message = "some message";
      const sessionId = "aSessionId";
      const audio = false;

      await chat.send({
        message,
        sessionId,
        audio
      });

      const expectedRequest = {
        method: "POST",
        body: JSON.stringify({
          text: message,
          sessionId,
          audio,
        }),
        headers: {
          "Content-Type": "application/json"
        }
      };

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(chatSettings.endpoint, expectedRequest);
    });

    it("Returns an appropriate response (V1)", async () => {
      const chatSettings = {
        endpoint: "http://some-environment.orbita.cloud:8443/oeapi/chat",
        orbitaNodeVersion: 1
      };

      const chat = new Chat(chatSettings);

      const message = "some message";
      const sessionId = "aSessionId";
      const audio = false;

      const response = await chat.send({
        message,
        sessionId,
        audio
      });

      expect(response).toEqual({
        voice: exampleOrbitaPayload.payload.multiagent.voice,
        chat: exampleOrbitaPayload.payload.multiagent.chat,
        screen: exampleOrbitaPayload.payload.multiagent.screen,
        buttons: exampleOrbitaPayload.payload.multiagent.buttons,
        type: "success"
      });
    });

    it("Returns an appropriate response (V2)", async () => {
      const chatSettings = {
        endpoint: "http://some-environment.orbita.cloud:8443/oeapi/chat",
        orbitaNodeVersion: 2
      };

      const chat = new Chat(chatSettings);

      const message = "some message";
      const sessionId = "aSessionId";
      const audio = false;

      const response = await chat.send({
        message,
        sessionId,
        audio
      });

      expect(response).toEqual({
        voice: exampleOrbitaPayload.payload.multiagent.voice,
        chat: exampleOrbitaPayload.payload.multiagent.chat,
        screen: exampleOrbitaPayload.payload.multiagent.screen,
        buttons: exampleOrbitaPayload.payload.multiagent.buttons,
        type: "success"
      });
    });

    it("Returns audio data when audio is true and using the V2 node", async () => {
      const chatSettings = {
        endpoint: "http://some-environment.orbita.cloud:8443/oeapi/chat",
        orbitaNodeVersion: 2
      };

      const chat = new Chat(chatSettings);

      const message = "some message";
      const sessionId = "aSessionId";
      const audio = true;

      const response = await chat.send({
        message,
        sessionId,
        audio
      });

      expect(response).toEqual({
        voice: exampleOrbitaPayload.payload.multiagent.voice,
        chat: exampleOrbitaPayload.payload.multiagent.chat,
        screen: exampleOrbitaPayload.payload.multiagent.screen,
        buttons: exampleOrbitaPayload.payload.multiagent.buttons,
        audio: exampleAudioData,
        type: "success"
      });
    });

    it("Returns a failure response when expected response properties are missing (V1)", async () => {
      const chatSettings = {
        endpoint: "http://some-environment.orbita.cloud:8443/oeapi/chat",
        orbitaNodeVersion: 1
      };

      mockBadFetchResponse();

      const chat = new Chat(chatSettings);

      const message = "some message";
      const sessionId = "aSessionId";
      const audio = true;

      const response = await chat.send({
        message,
        sessionId,
        audio
      });

      expect(response.type).toEqual("failure");

      mockNormalFetchResponse();
    });

    it("Returns a failure response when expected response properties are missing (V2)", async () => {
      const chatSettings = {
        endpoint: "http://some-environment.orbita.cloud:8443/oeapi/chat",
        orbitaNodeVersion: 2
      };

      mockBadFetchResponse();

      const chat = new Chat(chatSettings);

      const message = "some message";
      const sessionId = "aSessionId";
      const audio = true;

      const response = await chat.send({
        message,
        sessionId,
        audio
      });

      expect(response.type).toEqual("failure");

      mockNormalFetchResponse();
    });
  });
});
