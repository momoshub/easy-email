import React, { useMemo } from 'react';
import { useBlock, useFocusIdx } from 'easy-email-editor';
import { IconLink } from '@arco-design/web-react/icon';
import { SelectField, TextField } from '../../../components/Form';
import { Grid } from '@arco-design/web-react';
import { useExtensionProps } from '@extensions/components/Providers/ExtensionProvider';

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

  const links = useMemo(
    () =>
      thirdPartyLinks?.find(({ value }) => value === attributes.linkType)?.options || [],
    [thirdPartyLinks, attributes.linkType],
  );

  return useMemo(() => {
    const hasThirdPartyLink = thirdPartyLinks?.length && thirdPartyLinks?.length > 0;

    return (
      <Grid.Row>
        {hasThirdPartyLink && (
          <SelectField
            label={t('Link Type')}
            name={`${focusIdx}.attributes.linkType`}
            defaultValue='custom'
            options={[
              ...(thirdPartyLinks || []),
              { label: 'Custom URL', value: 'custom' },
            ]}
          />
        )}

        {attributes?.linkType === 'custom' || !hasThirdPartyLink ? (
          <TextField
            prefix={<IconLink />}
            label={t('Link')}
            name={`${focusIdx}.attributes.href`}
          />
        ) : (
          <SelectField
            label={t('Link')}
            name={`${focusIdx}.attributes.href`}
            options={links}
          />
        )}
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
        />
      </Grid.Row>
    );
  }, [focusIdx, attributes?.linkType, thirdPartyLinks]);
}
