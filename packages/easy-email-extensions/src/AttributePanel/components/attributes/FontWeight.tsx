import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { SelectField, TextField } from '../../../components/Form';

const options = [
  {
    value: 'normal',
    label: 'Normal',
  },
  {
    value: 'bold',
    label: 'Bold',
  },
];

export function FontWeight({ name }: { name?: string; }) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <SelectField
        label='Font weight'
        name={name || `${focusIdx}.attributes.font-weight`}
        options={options}
      />
    );
  }, [focusIdx, name]);
}
