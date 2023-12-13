import { useFocusIdx } from '@truongan106/easy-email-editor';
import React, { useMemo } from 'react';
import { ColorPickerField } from '../../../components/Form';

export function BorderColor() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <ColorPickerField
        label={t('Color')}
        name={`${focusIdx}.attributes.border-color`}
      />
    );
  }, [focusIdx]);
}
