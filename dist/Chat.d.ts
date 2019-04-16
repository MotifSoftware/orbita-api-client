import "isomorphic-fetch";
import ChatSettings from "./interfaces/Chat/IChatSettings";
import ChatRequest from "./interfaces/Chat/IChatRequest";
import ChatResponse from "./interfaces/Chat/IChatResponse";
export default class Chat {
    _settings: ChatSettings;
    constructor(settings: ChatSettings);
    send(request: ChatRequest): Promise<ChatResponse>;
    readonly settings: ChatSettings;
}
