import { useFocusIdx } from '@ant066/easy-email-editor';
import React, { useMemo } from 'react';
import { ColorPickerField } from '../../../components/Form';

export function ContainerBackgroundColor({
  title = t('Container background color'),
}: {
  title?: string;
}) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <ColorPickerField
        label={title}
        name={`${focusIdx}.attributes.container-background-color`}
      />
    );
  }, [focusIdx, title]);
}
