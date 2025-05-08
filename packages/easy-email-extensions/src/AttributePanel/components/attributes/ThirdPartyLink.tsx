import { Grid } from '@arco-design/web-react';
import { IconLink } from '@arco-design/web-react/icon';
import { useExtensionProps } from '@extensions/components/Providers/ExtensionProvider';
import { useBlock, useFocusIdx } from '@momos/easy-email-editor';
import React, { useMemo } from 'react';
import { useField } from 'react-final-form';
import { SelectField, TextField } from '../../../components/Form';

export type ThirdPartyLink = {
  label: string;
  value: string;
  options?: { label: string; value: string }[];
};

export function ThirdPartyLink() {
  const { thirdPartyLinks } = useExtensionProps();
  const { focusIdx } = useFocusIdx();
  const { focusBlock } = useBlock();
  const { attributes } = focusBlock || {};
  const {
    input: { onChange: resetHref },
  } = useField(`${focusIdx}.attributes.href`);

  const links = useMemo(
    () =>
      thirdPartyLinks?.find(({ value }) => value === attributes.linkType)?.options || [],
    [thirdPartyLinks, attributes.linkType],
  );
  const onLinkTypeChange = (linkType: string) => {
    const options =
      thirdPartyLinks?.find(({ value }) => value === linkType)?.options || [];
    const defaultValue = options?.[0]?.value || (linkType === 'custom' ? '#' : '');
    resetHref(defaultValue);

    return linkType;
  };
  return useMemo(() => {
    const hasThirdPartyLink = thirdPartyLinks?.length && thirdPartyLinks?.length > 0;
    const getField = () => {
      if (attributes?.linkType === 'custom' || !hasThirdPartyLink) {
        return (
          <TextField
            prefix={<IconLink />}
            label={t('Link')}
            name={`${focusIdx}.attributes.href`}
            className='fix-select-zindex'
          />
        );
      }
      return (
        <SelectField
          label={t('Link')}
          name={`${focusIdx}.attributes.href`}
          options={links}
          disabled={links?.length < 2}
          className='fix-select-zindex'
        />
      );
    };

    return (
      <Grid.Row>
        {hasThirdPartyLink && (
          <SelectField
            label={t('Link Type')}
            onChangeAdapter={onLinkTypeChange}
            name={`${focusIdx}.attributes.linkType`}
            options={[
              ...(thirdPartyLinks || []),
              { label: 'Custom URL', value: 'custom' },
            ]}
            className='fix-select-zindex'
          />
        )}

        {getField()}
        <SelectField
          label={t('When Link is Clicked')}
          name={`${focusIdx}.attributes.target`}
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
          style={{
            color: 'red',
          }}
          className='fix-select-zindex'
        />
      </Grid.Row>
    );
  }, [focusIdx, attributes?.linkType, thirdPartyLinks]);
}
