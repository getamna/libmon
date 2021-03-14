interface LibmonOptions {
    crashRandom?: boolean;
    delayStart: boolean;
    worksOffline: boolean;
}
export declare class Libmon {
    static initialize(name: string, options?: LibmonOptions): void;
    static validate(token?: string): Promise<boolean>;
    static disable(): void;
    static crash(): void;
    static setupCounter(name: string, max: number): void;
    static increment(name: string): void;
    static decrement(name: string): void;
    private static doesCounterExist;
    private static validateCounter;
}
export {};
