import { BlockLayerProps } from '../../BlockLayer';
import React from 'react';
export interface ExtensionProps extends BlockLayerProps {
    categories: Array<{
        label: string;
        active?: boolean;
        blocks: Array<{
            type: string;
            payload?: any;
            title?: string | undefined;
            onClick?: (data: any) => void;
        }>;
        displayType?: 'grid';
    } | {
        label: string;
        active?: boolean;
        blocks: Array<{
            payload?: any;
            title?: string | undefined;
            onClick?: (data: any) => void;
        }>;
        displayType: 'column';
    } | {
        label: string;
        active?: boolean;
        blocks: Array<{
            payload?: any;
            onClick?: (data: any) => void;
        }>;
        displayType: 'widget';
    } | {
        label: string;
        active?: boolean;
        blocks: Array<React.ReactNode>;
        displayType: 'custom';
    }>;
    showSourceCode?: boolean;
    compact?: boolean;
    extensionActiveKey?: string[];
}
export declare const ExtensionContext: React.Context<ExtensionProps>;
export declare const ExtensionProvider: React.FC<ExtensionProps>;
export declare function useExtensionProps(): ExtensionProps;
