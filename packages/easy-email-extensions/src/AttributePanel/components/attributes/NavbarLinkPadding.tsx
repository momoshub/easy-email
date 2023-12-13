/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Stack } from '@truongan106/easy-email-editor';
import React, { useMemo } from 'react';
import { Padding } from './Padding';

export function NavbarLinkPadding({ name }: { name: string }) {
  return useMemo(() => {
    return (
      <Stack
        vertical
        spacing='extraTight'
      >
        <Padding name={name} />
      </Stack>
    );
  }, [name]);
}
