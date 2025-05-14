import { classnames } from '@/utils/classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../Button';
import { Stack } from '../Stack';
import './index.scss';

export interface TabsProps {
  tabBarCenterContent?: React.ReactNode;
  tabBarExtraContent?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onChange?: (id: string) => void;
  onBeforeChange?: (current: string, next: string) => boolean;
  defaultActiveTab?: string;
  activeTab?: string;
}
export interface TabPaneProps {
  tab: React.ReactNode;
  key: string;
  style?: React.CSSProperties;
  className?: string;
}

const Tabs: React.FC<TabsProps> = props => {
  const [activeTab, setActiveTab] = useState<string>(props.defaultActiveTab || '');

  const onClick = useCallback(
    (nextTab: string) => {
      if (!props.onBeforeChange) {
        setActiveTab(nextTab);
        props.onChange?.(nextTab);
      }
      if (props.onBeforeChange) {
        const next = props.onBeforeChange(activeTab, nextTab);
        if (next) {
          setActiveTab(nextTab);
          props.onChange?.(nextTab);
        }
      }
    },
    [activeTab, props],
  );

  useEffect(() => {
    if (props.activeTab) {
      setActiveTab(props.activeTab);
    }
  }, [props.activeTab]);

  return (
    <div
      style={props.style}
      className={props.className}
    >
      <div className='easy-email-editor-tabWrapper'>
        <Stack
          distribution='equalSpacing'
          alignment='center'
        >
          <div className='easy-email-editor-tabWrapper-content'>
            {React.Children.map(
              props.children as any,
              (item: { props: { tab: TabPaneProps }; key: string }, index) => {
                if (!item) return null;

                return (
                  <div
                    key={item.key}
                    onClick={() => onClick(item.key)}
                    className={classnames(
                      'easy-email-editor-tabItem',
                      !activeTab && index === 0 && 'easy-email-editor-tabActiveItem',
                      activeTab === item.key && 'easy-email-editor-tabActiveItem',
                    )}
                  >
                    <Button noBorder>{item.props.tab}</Button>
                  </div>
                );
              },
            )}
          </div>
          {props.tabBarCenterContent}
          {props.tabBarExtraContent}
        </Stack>
      </div>
      {React.Children.map(
        props.children as any,
        (item: { props: { tab: TabPaneProps }; key: string }, index) => {
          if (!item) return null;
          const visible = (!activeTab && index === 0) || item.key === activeTab;
          return (
            <div
              style={{
                display: visible ? undefined : 'none',
                height: 'calc(100% - 50px)',
              }}
            >
              {item}
            </div>
          );
        },
      )}
    </div>
  );
};

const TabPane: React.FC<TabPaneProps> = props => {
  return <>{props.children}</>;
};

export { TabPane, Tabs };
