/* eslint-disable react/jsx-wrap-multilines */
import '@/assets/font/iconfont.css';
import { TabPane, Tabs } from '@/components/UI/Tabs';
import { EASY_EMAIL_EDITOR_ID, FIXED_CONTAINER_ID } from '@/constants';
import { useActiveTab } from '@/hooks/useActiveTab';
import { useEditorProps } from '@/hooks/useEditorProps';
import { EventManager, EventType } from '@/utils/EventManager';
import React, { useCallback, useContext, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { IconFont } from '../IconFont';
import { ActiveTabKeys, BlocksContext } from '../Provider/BlocksProvider';
import { Stack } from '../UI/Stack';
import { DesktopEmailPreview } from './components/DesktopEmailPreview';
import { EditEmailPreview } from './components/EditEmailPreview';
import { MobileEmailPreview } from './components/MobileEmailPreview';
import { ToolsPanel } from './components/ToolsPanel';
import './index.scss';

(window as any).global = window; // react-codemirror

type EmailEditorProps = {
  extraTop?: React.ReactNode;
  toolPanel?: {
    prefix?: React.ReactNode;
    postfix?: React.ReactNode;
  };
  isLoading?: boolean;
  loader?: React.ReactNode;
};

export const EmailEditor = ({
  extraTop,
  toolPanel,
  isLoading = false,
  loader = (
    <div className='loader'>
      <div className='spinner'>
        <div className='bounce1' />
        <div className='bounce2' />
        <div className='bounce3' />
      </div>
    </div>
  ),
}: EmailEditorProps) => {
  const { height: containerHeight } = useEditorProps();
  const { setActiveTab, activeTab } = useActiveTab();
  const { isPreview } = useContext(BlocksContext);

  const fixedContainer = useMemo(() => {
    return createPortal(<div id={FIXED_CONTAINER_ID} />, document.body);
  }, []);

  const onBeforeChangeTab = useCallback((currentTab: any, nextTab: any) => {
    return EventManager.exec(EventType.ACTIVE_TAB_CHANGE, { currentTab, nextTab });
  }, []);

  const onChangeTab = useCallback(
    (nextTab: string) => {
      setActiveTab(nextTab as any);
    },
    [setActiveTab],
  );

  return useMemo(
    () => (
      <div
        id={EASY_EMAIL_EDITOR_ID}
        style={{
          display: 'flex',
          flex: '1',
          overflow: 'hidden',
          justifyContent: 'center',
          minWidth: 640,
          height: containerHeight,
        }}
      >
        <Tabs
          activeTab={activeTab}
          onBeforeChange={onBeforeChangeTab}
          onChange={onChangeTab}
          style={{ height: '100%', width: '100%' }}
          tabBarCenterContent={isPreview ? null : <ToolsPanel />}
          tabBarExtraContent={
            <div className='tool-panel'>
              {toolPanel?.prefix}
              {toolPanel?.postfix}
            </div>
          }
        >
          {!isPreview && (
            <TabPane
              style={{ height: 'calc(100% - 20px)', position: 'relative' }}
              tab={
                <Stack spacing='tight'>
                  <IconFont iconName='icon-editor' />
                </Stack>
              }
              key={ActiveTabKeys.EDIT}
            >
              {extraTop}
              {isLoading ? loader : <EditEmailPreview />}
            </TabPane>
          )}
          <TabPane
            style={{ height: 'calc(100% - 20px)', position: 'relative' }}
            tab={
              <Stack spacing='tight'>
                <IconFont iconName='icon-desktop' />
              </Stack>
            }
            key={ActiveTabKeys.PC}
          >
            {isLoading ? loader : <DesktopEmailPreview />}
          </TabPane>
          <TabPane
            style={{ height: 'calc(100% - 20px)', position: 'relative' }}
            tab={
              <Stack spacing='tight'>
                <IconFont iconName='icon-mobile' />
              </Stack>
            }
            key={ActiveTabKeys.MOBILE}
          >
            {isLoading ? loader : <MobileEmailPreview />}
          </TabPane>
        </Tabs>

        {fixedContainer}
      </div>
    ),
    [
      activeTab,
      containerHeight,
      fixedContainer,
      onBeforeChangeTab,
      onChangeTab,
      extraTop,
      isPreview,
      toolPanel?.prefix,
      toolPanel?.postfix,
      isLoading,
      loader,
    ],
  );
};
