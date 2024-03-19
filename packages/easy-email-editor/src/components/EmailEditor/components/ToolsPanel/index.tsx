import { IconFont } from '@/components/IconFont';
import { Button } from '@/components/UI/Button';
import { Stack } from '@/components/UI/Stack';
import { useBlock } from '@/hooks/useBlock';
import React from 'react';

export function ToolsPanel({
  prefix,
  postfix,
}: {
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
}) {
  const { redo, undo, redoable, undoable } = useBlock();

  return (
    <Stack>
      {prefix}
      <Button
        title={t('undo')}
        disabled={!undoable}
        onClick={undo}
      >
        <IconFont
          iconName='icon-undo'
          style={{
            cursor: 'inherit',
            opacity: undoable ? 1 : 0.75,
          }}
        />
      </Button>

      <Button
        title={t('redo')}
        disabled={!redoable}
        onClick={redo}
      >
        <IconFont
          iconName='icon-redo'
          style={{
            cursor: 'inherit',
            opacity: redoable ? 1 : 0.75,
          }}
        />
      </Button>
      <Stack.Item />
      {postfix}
    </Stack>
  );
}
