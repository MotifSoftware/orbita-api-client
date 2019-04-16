export default interface ChatSettings {
    endpoint: string;
    orbitaNodeVersion?: OrbitaNodeVersion;
}
export declare enum OrbitaNodeVersion {
    V1 = 1,
    V2 = 2
}
