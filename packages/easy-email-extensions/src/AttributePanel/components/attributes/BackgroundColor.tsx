import { useFocusIdx } from '@momos/easy-email-editor';
import React, { useMemo } from 'react';
import { ColorPickerField } from '../../../components/Form';

export function BackgroundColor({ title = t('Background color') }: { title?: string }) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <ColorPickerField
        label={title}
        name={`${focusIdx}.attributes.background-color`}
      />
    );
  }, [focusIdx, title]);
}
