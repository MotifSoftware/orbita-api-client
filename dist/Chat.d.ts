import "cross-fetch";
import ChatSettings from "./interfaces/Chat/IChatSettings";
import ChatRequest from "./interfaces/Chat/IChatRequest";
import ChatResponse from "./interfaces/Chat/IChatResponse";
import FailureResponse from "./interfaces/Chat/IFailureResponse";
export default class Chat {
    private _settings;
    constructor(settings: ChatSettings);
    send(request: ChatRequest): Promise<ChatResponse | FailureResponse>;
    readonly settings: ChatSettings;
}
