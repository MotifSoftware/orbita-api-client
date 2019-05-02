export default interface ChatRequest {
    message: string,
    sessionId: string,
    audio: boolean,
    customData?: any
}