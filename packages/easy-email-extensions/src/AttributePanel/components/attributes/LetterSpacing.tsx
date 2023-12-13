import { useFocusIdx } from '@momos/easy-email-editor';
import React from 'react';
import { InputWithUnitField } from '../../../components/Form';

export function LetterSpacing({ name }: { name?: string }) {
  const { focusIdx } = useFocusIdx();

  return (
    <InputWithUnitField
      label={t('Letter spacing')}
      name={name || `${focusIdx}.attributes.letter-spacing`}
    />
  );
}
