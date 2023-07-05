import { BlockLayerProps } from '@extensions/BlockLayer';
import { ExtraTab } from '@extensions/EditPanel';
import { isEqual, omit } from 'lodash';
import React, { ReactNode, useContext, useMemo, useRef } from 'react';

export interface ExtensionProps extends BlockLayerProps {
  categories: Array<
    | {
        label: string;
        active?: boolean;
        key?: string;
        blocks: Array<{
          type: string;
          payload?: any;
          title?: string | undefined;
          onClick?: (data: any) => void;
          icon?: ReactNode;
        }>;
        displayType?: 'grid';
      }
    | {
        label: string;
        active?: boolean;
        key?: string;
        blocks: Array<{
          payload?: any;
          title?: string | undefined;
          onClick?: (data: any) => void;
          icon?: ReactNode;
        }>;
        displayType: 'column';
      }
    | {
        label: string;
        active?: boolean;
        key?: string;
        blocks: Array<{
          payload?: any;
          onClick?: (data: any) => void;
          icon?: ReactNode;
        }>;
        displayType: 'widget';
      }
    | {
        label: string;
        key?: string;
        active?: boolean;
        blocks: Array<React.ReactNode>;
        displayType: 'custom';
      }
  >;
  showSourceCode?: boolean;
  compact?: boolean;
  extensionActiveKey?: string[];
  onChangeExtensionActiveKey?: any;
  extraTabs?: ExtraTab[];
}

export const ExtensionContext = React.createContext<ExtensionProps>({
  categories: [],
});

export const ExtensionProvider: React.FC<ExtensionProps> = props => {
  const value = omit(props, 'children');
  const valueRef = useRef(value);

  const cacheValue = useMemo(() => {
    if (!isEqual(value, valueRef)) {
      valueRef.current = value;
    }
    return valueRef.current;
  }, [value, valueRef]);

  return (
    <ExtensionContext.Provider value={cacheValue}>
      {props.children}
    </ExtensionContext.Provider>
  );
};

export function useExtensionProps() {
  return useContext(ExtensionContext);
}
