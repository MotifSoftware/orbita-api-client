export default interface ChatResponse {
    voice: VoiceData;
    chat: ChatData;
    screen: ScreenData;
    buttons: ButtonData;
    audio?: AudioData;
    directives?: Array<Directive>;
    rawPayload: any;
    type: "success";
}
export interface VoiceData {
    sayText: string;
    rePrompt: string;
}
export interface ChatData {
    chatText: string;
    rePrompt: string;
}
export interface ScreenData {
    largeImage: string;
    smallImage: string;
    shortTitle: string;
    body: string;
    longTitle: string;
}
export interface ButtonData {
    name: string;
    type: string;
    choices: Array<ButtonChoice>;
}
export interface ButtonChoice {
    text: string;
    value: string;
}
export interface AudioData {
    type: string;
    data: Array<number>;
}
export interface Directive {
    type: string;
    title?: string;
    options?: any;
}
