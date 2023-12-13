import { useFocusIdx } from '@truongan106/easy-email-editor';
import React from 'react';
import { ColorPickerField } from '../../../components/Form';

export function Color({ title = t('Color') }: { title?: string; inline?: boolean }) {
  const { focusIdx } = useFocusIdx();

  return (
    <ColorPickerField
      label={title}
      name={`${focusIdx}.attributes.color`}
    />
  );
}
