import { Grid } from '@arco-design/web-react';
import { IconLink } from '@arco-design/web-react/icon';
import { useFocusIdx } from '@momos/easy-email-editor';
import { TextField } from '@momos/easy-email-extensions';
import React, { useMemo } from 'react';

export default function CustomConfig() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Grid.Row>
        <TextField
          prefix={<IconLink />}
          label={t('src')}
          name={`${focusIdx}.attributes.src`}
        />
      </Grid.Row>
    );
  }, [focusIdx]);
}
