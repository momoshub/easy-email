import { Grid } from '@arco-design/web-react';
import { IconLink } from '@arco-design/web-react/icon';
import { useFocusIdx } from '@momos/easy-email-editor';
import React, { useMemo } from 'react';
import { SelectField, TextField } from '../../../components/Form';

export function Link() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Grid.Row>
        <Grid.Col span={11}>
          <TextField
            prefix={<IconLink />}
            label={<span>Link&nbsp;&nbsp;&nbsp;</span>}
            name={`${focusIdx}.attributes.href`}
          />
        </Grid.Col>
        <Grid.Col
          offset={1}
          span={11}
        >
          <SelectField
            label={t('Target')}
            name={`${focusIdx}.attributes.target`}
            options={[
              {
                value: '',
                label: t('_self'),
              },
              {
                value: '_blank',
                label: t('_blank'),
              },
            ]}
          />
        </Grid.Col>
      </Grid.Row>
    );
  }, [focusIdx]);
}
