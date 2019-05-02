
# orbita-api-client

## Currently Available APIs

- `Chat` - Provides the async method `send` for sending chat requests and receiving response from an Orbita chat endpoint.

### Usage example

```
const { APIClient } = require("orbita-api-client"),
    uuid = require("uuid");

// Example API client settings
const settings = {
    chat: {
        // In Orbita, this should be an HTTP endpoint that feeds directly into an NLP connector node without manipulating the data
        endpoint: "https://environment-name.orbita.cloud:8443/oeapi/chat",
        // Switch this to 2 if using version 2 of the NLP connector node
        orbitaNodeVersion: 1
    }
};

// Instantiate the client
const apiClient = new APIClient(settings);

// A session ID is required for all requests
const sessionId = uuid.v4();

// Example chat request
const chatRequest = {
    message: "An example chat message",
    sessionId,
    audio: false, // If true, a byte representation of the response as audio will be returned in the chat response
    customData: { // Additional data to pass through to the Orbita endpoint
        additionalData: "as needed"
    }
};

// Send the chat request
apiClient.Chat.send(chatRequest)
    .then(chatResponse => console.log(chatResponse.chat.chatText)) // Log the response
    .catch(error => console.log(error)); // Or log the error, if one occured
```