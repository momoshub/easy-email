import { Stack, useFocusIdx } from '@momos/easy-email-editor';
import React, { useMemo } from 'react';
import { UseFieldConfig } from 'react-final-form';
import { TextField } from '../../../components/Form';

export function Height({
  inline,
  config,
}: {
  inline?: boolean;
  config?: UseFieldConfig<any>;
}) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack wrap={false}>
        <Stack.Item fill>
          <TextField
            label={t('Height')}
            name={`${focusIdx}.attributes.height`}
            quickchange
            inline={inline}
            config={config}
          />
        </Stack.Item>
      </Stack>
    );
  }, [focusIdx, inline]);
}
