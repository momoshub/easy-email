import { useEditorProps } from '@ant066/easy-email-editor';
import { Layout, Tabs } from '@arco-design/web-react';
import { BlockLayer } from '@extensions/BlockLayer';
import { FullHeightOverlayScrollbars } from '@extensions/components/FullHeightOverlayScrollbars';
import { useExtensionProps } from '@extensions/components/Providers/ExtensionProvider';
import React, { ReactNode } from 'react';
import { Blocks } from './Blocks';
import { ConfigurationDrawer } from './ConfigurationDrawer';
import styles from './index.module.scss';

const TabPane = Tabs.TabPane;

export type ExtraTab = {
  title: string;
  showInPreviewMode?: boolean;
  content: ReactNode;
  key?: string;
};

export function EditPanel({
  showSourceCode,
  extraTabs,
  activeTab,
}: {
  showSourceCode: boolean;
  extraTabs?: ExtraTab[];
  activeTab?: string;
}) {
  const { height } = useEditorProps();
  const { compact = true } = useExtensionProps();
  let key = 0;
  return (
    <Layout.Sider
      className={styles.blocksPanel}
      style={{ paddingRight: 0, minWidth: 360 }}
      // collapsed={collapsed}
      collapsible
      trigger={null}
      breakpoint='xl'
      collapsedWidth={60}
      width={360}
    >
      <Tabs
        defaultActiveTab={`${key}`}
        style={{ width: '100%', padding: 0 }}
        renderTabHeader={(_, DefaultHeader) => (
          <div className={styles.largeTabsHeader}>
            <DefaultHeader />
          </div>
        )}
      >
        {activeTab === 'EDIT' && (
          <TabPane
            key={`${key++}`}
            title={t('Block')}
          >
            <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
              <Blocks />
            </FullHeightOverlayScrollbars>
          </TabPane>
        )}

        {activeTab === 'EDIT' && (
          <TabPane
            key={`${key++}`}
            title={t('Layer')}
          >
            <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
              <div style={{ padding: 20 }}>
                <BlockLayer />
              </div>
            </FullHeightOverlayScrollbars>
          </TabPane>
        )}
        {extraTabs
          ?.filter(
            tab =>
              (activeTab === 'EDIT' && !tab.showInPreviewMode) ||
              (activeTab !== 'EDIT' && !!tab.showInPreviewMode),
          )
          ?.map(tab => {
            return (
              <TabPane
                key={`${key++}`}
                title={tab.title}
              >
                <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
                  <div>{tab.content}</div>
                </FullHeightOverlayScrollbars>
              </TabPane>
            );
          })}
      </Tabs>
      {!compact && (
        <ConfigurationDrawer
          height={height}
          showSourceCode={showSourceCode}
          compact={Boolean(compact)}
        />
      )}
    </Layout.Sider>
  );
}
