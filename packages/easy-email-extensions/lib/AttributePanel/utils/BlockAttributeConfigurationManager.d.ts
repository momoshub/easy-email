import { ReactNode } from 'react';
declare type ObjectComponent = {
    [key: string]: (...args: any) => ReactNode;
};
export declare class BlockAttributeConfigurationManager {
    private static map;
    static add(componentMap: ObjectComponent): void;
    static get<T extends ObjectComponent>(name: keyof T): () => JSX.Element | null;
    static getMap(): ObjectComponent;
}
export {};
