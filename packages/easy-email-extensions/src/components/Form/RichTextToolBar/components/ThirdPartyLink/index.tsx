import { Grid, PopoverProps, Space, Tooltip } from '@arco-design/web-react';
import React, { useCallback, useMemo } from 'react';
import { Form } from 'react-final-form';
import { IconFont, TextStyle } from 'easy-email-editor';
import { SearchField, SelectField, SwitchField } from '@extensions/components/Form';
import { ToolItem } from '../ToolItem';
import { EMAIL_BLOCK_CLASS_NAME } from 'easy-email-core';
import { useExtensionProps } from '@extensions/components/Providers/ExtensionProvider';

export interface LinkParams {
  link: string;
  blank: boolean;
  underline: boolean;
  linkNode: HTMLAnchorElement | null;
  linkType?: string;
}

export interface LinkProps extends PopoverProps {
  currentRange: Range | null | undefined;
  onChange: (val: LinkParams) => void;
}

function getAnchorElement(node: Node | null): HTMLAnchorElement | null {
  if (!node) return null;
  if (node instanceof HTMLAnchorElement) {
    return node;
  }
  if (node instanceof Element && node.classList.contains(EMAIL_BLOCK_CLASS_NAME))
    return null;

  return getAnchorElement(node.parentNode);
}

function getLinkNode(currentRange: Range | null | undefined): HTMLAnchorElement | null {
  let linkNode: HTMLAnchorElement | null = null;
  if (!currentRange) return null;
  linkNode = getAnchorElement(currentRange.startContainer);
  return linkNode;
}

export function ThirdPartyLink(props: LinkProps) {
  const { thirdPartyLinks } = useExtensionProps();

  const initialValues = useMemo((): LinkParams => {
    let link = '';
    let blank = true;
    let underline = true;
    let linkNode: HTMLAnchorElement | null = getLinkNode(props.currentRange);
    let linkType = 'custom';
    if (linkNode) {
      link = linkNode.getAttribute('href') || '';
      blank = linkNode.getAttribute('target') === '_blank';
      underline = linkNode.style.textDecoration === 'underline';
    }
    return {
      link,
      blank,
      underline,
      linkNode,
      linkType,
    };
  }, [props.currentRange]);

  const onSubmit = useCallback(
    (values: LinkParams) => {
      props.onChange(values);
    },
    [props],
  );

  return (
    <Form
      key={initialValues.link}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, values }: any) => {
        const options =
          thirdPartyLinks?.find(({ value }) => value === values.linkType)?.options || [];

        return (
          <Tooltip
            {...props}
            trigger='click'
            color='#fff'
            position='tl'
            content={(
              <div style={{ color: '#333' }}>
                {Boolean(thirdPartyLinks?.length && thirdPartyLinks?.length > 0) && (
                  <Grid.Col span={24}>
                    <SelectField
                      label={t('Link Type')}
                      name='linkType'
                      defaultValue='custom'
                      options={[
                        ...(thirdPartyLinks || []),
                        { label: 'Custom URL', value: 'custom' },
                      ]}
                      getPopupContainer={node => node}
                    />
                  </Grid.Col>
                )}

                {Boolean(options && options?.length) ? (
                  <SelectField
                    label={t('Link')}
                    name='link'
                    options={options}
                    getPopupContainer={node => node}
                  />
                ) : (
                  <div style={{ marginTop: '0.5rem' }}>
                    <div>Link</div>
                    <SearchField
                      name='link'
                      label={'URL'}
                      labelHidden
                      searchButton={t('Apply')}
                      placeholder={t('https://www.example.com')}
                    />
                  </div>
                )}

                <Grid.Row>
                  <Grid.Col span={24}>
                    <SelectField
                      style={{ marginTop: '0.5rem' }}
                      label={t('When Link is Clicked')}
                      name='blank'
                      options={[
                        {
                          value: '_self',
                          label: t('Open in Same Tab'),
                        },
                        {
                          value: '_blank',
                          label: t('Open in New Tab'),
                        },
                      ]}
                      getPopupContainer={node => node}
                    />
                  </Grid.Col>
                  <Grid.Col span={24}>
                    <Space
                      align='center'
                      style={{ marginTop: '0.5rem' }}
                    >
                      <TextStyle>{t('Underline')}</TextStyle>
                      <SwitchField
                        label={t('Underline')}
                        labelHidden
                        name='underline'
                        checkedText={t('On')}
                        uncheckedText={t('Off')}
                        inline
                      />
                    </Space>
                  </Grid.Col>
                </Grid.Row>

                <Grid.Row>
                  <button
                    style={{
                      width: '100%',
                      background: 'rgb(var(--primary-6))',
                      border: '1px solid rgb(var(--primary-6))',
                      height: 30,
                      marginTop: '0.5rem',
                      cursor: 'pointer',
                      color: 'white',
                    }}
                    onClick={() => handleSubmit()}
                  >
                    Save
                  </button>
                </Grid.Row>
              </div>
            )}
          >
            <ToolItem
              isActive={Boolean(initialValues.link)}
              title={t('Link')}
              icon={<IconFont iconName='icon-link' />}
            />
          </Tooltip>
        );
      }}
    </Form>
  );
}
