import { useFocusIdx } from '@truongan106/easy-email-editor';
import React, { useMemo } from 'react';
import { SelectField } from '../../../components/Form';

const options = [
  {
    value: 'normal',
    get label() {
      return t('Normal');
    },
  },
  {
    value: 'bold',
    get label() {
      return t('Bold');
    },
  },
];

export function FontWeight({ name }: { name?: string }) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <SelectField
        label={t('Font weight')}
        name={name || `${focusIdx}.attributes.font-weight`}
        options={options}
      />
    );
  }, [focusIdx, name]);
}
