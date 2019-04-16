export default interface ChatSettings {
    endpoint: string,
    orbitaNodeVersion?: OrbitaNodeVersion
}

export enum OrbitaNodeVersion {
    V1 = 1,
    V2 = 2
}