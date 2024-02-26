import React, { useCallback } from 'react';

import { Popover } from '@arco-design/web-react';
import { FontFamily as MainFontFamily } from '@extensions/AttributePanel/components/attributes/FontFamily';
import { useFontFamily } from '@extensions/hooks/useFontFamily';
import { IconFont } from '@momos/easy-email-editor';
import { ToolItem } from '../ToolItem';

export interface FontFamilyProps {
  execCommand: (cmd: string, value: any) => void;
  getPopupContainer: () => HTMLElement;
}

export function FontFamily(props: FontFamilyProps) {
  const [visible, setVisible] = React.useState(false);

  const onVisibleChange = useCallback((v: boolean) => {
    setVisible(v);
  }, []);

  return (
    <Popover
      trigger='click'
      color='#fff'
      position='left'
      className='easy-email-extensions-Tools-Popover'
      popupVisible={visible}
      onVisibleChange={onVisibleChange}
      content={
        <div style={{ width: 280 }}>
          <MainFontFamily />
          {/* <style>{styleText}</style>
          <div
            style={{
              maxWidth: 150,
              maxHeight: 350,
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            <Menu
              onClickMenuItem={onChange}
              selectedKeys={[]}
              style={{ border: 'none', padding: 0 }}
            >
              {safeFonts.map(item => (
                <Menu.Item
                  style={{ lineHeight: '30px', height: 30 }}
                  key={item.value}
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
          </div> */}
        </div>
      }
      getPopupContainer={props.getPopupContainer}
    >
      <ToolItem
        title={t('Font family')}
        icon={<IconFont iconName='icon-font-family' />}
      />
    </Popover>
  );
}
