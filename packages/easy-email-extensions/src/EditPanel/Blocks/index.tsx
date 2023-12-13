import { AdvancedType, BlockManager, IBlockData } from '@ant066/easy-email-core';
import { BlockAvatarWrapper, IconFont } from '@ant066/easy-email-editor';
import { Collapse, Grid, Space, Typography } from '@arco-design/web-react';
import { IconCaretRight, IconCaretUp } from '@arco-design/web-react/icon';
import { useExtensionProps } from '@extensions/components/Providers/ExtensionProvider';
import { getIconNameByBlockType } from '@extensions/utils/getIconNameByBlockType';
import React, { ReactNode, useMemo, useState } from 'react';
import styles from './index.module.scss';

export function Blocks() {
  const { categories, extensionActiveKey, onChangeExtensionActiveKey } =
    useExtensionProps();

  const defaultActiveKey = useMemo(
    () => [...categories.filter(item => item.active).map(item => item.key || item.label)],
    [categories],
  );

  return (
    <Collapse
      defaultActiveKey={defaultActiveKey}
      {...(extensionActiveKey
        ? {
            activeKey: extensionActiveKey,
            onChange: (key, keys, event) => {
              onChangeExtensionActiveKey(key, keys, event);
            },
          }
        : {})}
      style={{ paddingBottom: 30, minHeight: '100%' }}
    >
      {categories.map((cat, index) => {
        if (cat.displayType === 'column') {
          return (
            <Collapse.Item
              key={index}
              contentStyle={{ padding: '0px 20px' }}
              name={cat?.key || cat?.label}
              header={cat.label}
            >
              <Space direction='vertical'>
                <div />
              </Space>
              {cat.blocks.map(item => (
                <LayoutItem
                  key={item.title}
                  title={item.title || ''}
                  columns={item.payload}
                />
              ))}

              <Space direction='vertical'>
                <div />
              </Space>
            </Collapse.Item>
          );
        }

        if (cat.displayType === 'custom') {
          return (
            <Collapse.Item
              key={index}
              contentStyle={{ padding: 0, paddingBottom: 0, paddingTop: 20 }}
              name={cat?.key || cat?.label}
              header={cat.label}
            >
              <Grid.Row>
                {cat.blocks.map((item, index) => {
                  return <React.Fragment key={index}>{item}</React.Fragment>;
                })}
              </Grid.Row>
            </Collapse.Item>
          );
        }
        return (
          <Collapse.Item
            key={index}
            contentStyle={{ padding: 0, paddingBottom: 0, paddingTop: 20 }}
            name={cat?.key || cat?.label}
            header={cat.label}
          >
            <Grid.Row>
              {cat.blocks.map((item, index) => {
                return (
                  <BlockItem
                    key={index}
                    {...(item as any)}
                    onClick={() => item?.onClick?.(item)}
                  />
                );
              })}
            </Grid.Row>
          </Collapse.Item>
        );
      })}
    </Collapse>
  );
}

function BlockItem({
  type,
  payload,
  title,
  filterType,
  onClick,
  icon,
}: {
  type: string;
  payload?: Partial<IBlockData>;
  title?: string;
  filterType: string | undefined;
  onClick?: () => void;
  icon?: ReactNode;
}) {
  const block = BlockManager.getBlockByType(type);

  return (
    <div
      className={styles.blockItem}
      onClick={onClick}
    >
      <BlockAvatarWrapper
        type={type}
        payload={payload}
      >
        <div className={styles.blockItemContainer}>
          {icon || (
            <IconFont
              style={{ fontSize: 20 }}
              iconName={getIconNameByBlockType(type)}
            />
          )}
          <Typography.Text style={{ marginTop: 10 }}>
            {title || block?.name}
          </Typography.Text>
        </div>
      </BlockAvatarWrapper>
    </div>
  );
}

function LayoutItem({ columns, title }: { columns: string[][]; title: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <p
        onClick={() => setVisible(v => !v)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <span>{title}</span>
        {columns.length > 1 && (
          <span>{!visible ? <IconCaretRight /> : <IconCaretUp />}</span>
        )}
      </p>
      {columns.map((item, index) => {
        const hide = !visible && index !== 0;
        const payload = {
          type: AdvancedType.SECTION,
          attributes: {},
          children: item.map(col => ({
            type: AdvancedType.COLUMN,
            attributes: {
              width: col,
            },
            data: {
              value: {},
            },
            children: [],
          })),
        };

        return (
          <div
            key={index}
            style={{
              height: hide ? 0 : undefined,
              overflow: 'hidden',
              marginBottom: hide ? 0 : 20,
            }}
          >
            <BlockAvatarWrapper
              type={AdvancedType.SECTION}
              payload={payload}
            >
              <div
                style={{
                  border: '1px solid rgb(229, 229, 229)',
                  width: '100%',
                  height: 62,
                  padding: 5,
                }}
              >
                <div
                  style={{
                    height: 52,
                    border: '1px solid rgb(85, 85, 85)',
                    borderRadius: 3,
                    display: 'flex',
                  }}
                >
                  {item.map((column, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          borderRight:
                            index === item.length - 1
                              ? undefined
                              : '1px solid rgb(85, 85, 85)',
                          height: 50,
                          width: column,
                          textAlign: 'center',
                          padding: 10,
                        }}
                      >
                        <img
                          height={30}
                          width={30}
                          src={
                            'https://stg-sg-notification-email-static-objects-bucket.s3.ap-southeast-1.amazonaws.com/images/text.png'
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </BlockAvatarWrapper>
          </div>
        );
      })}
    </div>
  );
}
